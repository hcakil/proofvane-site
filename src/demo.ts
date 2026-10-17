// Sayfadaki iki küçük canlı gösterim. İkisi de yalnızca tarayıcıda çalışır;
// ağ isteği yapmaz, veri saklamaz. Betik çalışmazsa sahneler statik kalır
// ve düğmeler gizlidir (bkz. styles.css `html:not(.js)`).
//
//   sync      hero: görev tamamlanınca isteğin API → kuyruk → veritabanı /
//             bildirim yolculuğu; çevrimdışıyken cihazdaki kuyrukta bekler.
//   pipeline  vitrin 1: sürüm hattı; "hata ekle" ile widget testinde durur.

interface DemoText {
  app: { synced: string; queued: string; online: string; offline: string; action: string };
  controls: { networkOff: string; networkOn: string; reset: string; hint: string };
  log: Record<
    | 'idle'
    | 'optimistic'
    | 'request'
    | 'accepted'
    | 'stored'
    | 'notified'
    | 'offline'
    | 'reconnect',
    string
  >;
  pipeline: { idle: string; running: string; passed: string; blocked: string };
}

const reduced = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms: number): Promise<void> =>
  new Promise((r) => window.setTimeout(r, reduced() ? 0 : ms));

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? '');
}

function readText(): DemoText | null {
  const el = document.getElementById('demo-text');
  if (!el?.textContent) return null;
  try {
    return JSON.parse(el.textContent) as DemoText;
  } catch {
    return null;
  }
}

function idempotencyKey(): string {
  const b = new Uint8Array(3);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
}

/* ----------------------------------------------------------------- sync */

const LINKS: [string, string][] = [
  ['app', 'api'],
  ['api', 'queue'],
  ['queue', 'db'],
  ['queue', 'push'],
];

function initSync(root: HTMLElement, text: DemoText): void {
  const stage = root.querySelector<HTMLElement>('[data-stage]');
  const wires = root.querySelector<SVGSVGElement>('[data-wires]');
  const log = root.querySelector<HTMLOListElement>('[data-log]');
  const badge = root.querySelector<HTMLElement>('[data-badge]');
  const net = root.querySelector<HTMLElement>('[data-net]');
  const netBtn = root.querySelector<HTMLButtonElement>('[data-network]');
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-reset]');
  if (!stage || !wires || !log || !badge || !net || !netBtn || !resetBtn) return;

  const node = (id: string) => root.querySelector<HTMLElement>(`[data-node="${id}"]`);
  let online = true;
  let queue: { task: HTMLElement; key: string }[] = [];
  let chain: Promise<void> = Promise.resolve();
  let generation = 0;

  const center = (el: HTMLElement) => {
    const s = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
  };

  function drawWires(): void {
    const s = stage!.getBoundingClientRect();
    wires!.setAttribute('viewBox', `0 0 ${s.width} ${s.height}`);
    const ns = 'http://www.w3.org/2000/svg';
    wires!.replaceChildren();
    for (const [a, b] of LINKS) {
      const ea = node(a);
      const eb = node(b);
      if (!ea || !eb) continue;
      const p = center(ea);
      const q = center(eb);
      const mx = (p.x + q.x) / 2;
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', `M${p.x} ${p.y} C ${mx} ${p.y}, ${mx} ${q.y}, ${q.x} ${q.y}`);
      path.setAttribute('class', `wire wire-${a}-${b}`);
      wires!.append(path);
    }
  }

  function write(message: string, kind = ''): void {
    log!.querySelector('.log-idle')?.remove();
    const li = document.createElement('li');
    if (kind) li.className = `log-${kind}`;
    li.textContent = message;
    log!.prepend(li);
    while (log!.children.length > 5) log!.lastElementChild?.remove();
  }

  const hitTimers = new WeakMap<HTMLElement, number>();
  function hit(el: HTMLElement | null): void {
    if (!el) return;
    el.classList.add('is-hit');
    window.clearTimeout(hitTimers.get(el));
    hitTimers.set(
      el,
      window.setTimeout(() => el.classList.remove('is-hit'), 900),
    );
    if (!reduced() && el.dataset.node !== 'app') {
      el.animate(
        [
          { transform: 'none' },
          { transform: 'translateY(-3px) scale(1.03)', offset: 0.4 },
          { transform: 'none' },
        ],
        { duration: 650, easing: 'cubic-bezier(0.2, 0.7, 0.1, 1)' },
      );
    }
  }

  async function fly(from: string, to: string, kind = ''): Promise<void> {
    const a = node(from);
    const b = node(to);
    if (!a || !b) return;
    if (!reduced()) {
      const p = center(a);
      const q = center(b);
      const dot = document.createElement('span');
      dot.className = `packet${kind ? ` packet-${kind}` : ''}`;
      stage!.append(dot);
      const anim = dot.animate(
        [
          { transform: `translate(${p.x}px, ${p.y}px) scale(0.4)`, opacity: 0 },
          { transform: `translate(${p.x}px, ${p.y}px) scale(1)`, opacity: 1, offset: 0.12 },
          { transform: `translate(${q.x}px, ${q.y}px) scale(1)`, opacity: 1 },
        ],
        { duration: 620, easing: 'cubic-bezier(0.55, 0, 0.25, 1)' },
      );
      await anim.finished.catch(() => undefined);
      dot.remove();
    }
    hit(b);
  }

  function updateBadge(): void {
    const n = queue.length;
    badge!.textContent = n ? `${text.app.queued} · ${n}` : text.app.synced;
    badge!.classList.toggle('is-queued', n > 0);
  }

  function send(task: HTMLElement, key: string): Promise<void> {
    const gen = generation;
    const id = task.dataset.task ?? '';
    chain = chain.then(async () => {
      if (gen !== generation) return;
      write(fill(text.log.request, { id, key }), 'req');
      await fly('app', 'api');
      if (gen !== generation) return;
      write(text.log.accepted);
      await fly('api', 'queue');
      await fly('queue', 'db');
      if (gen !== generation) return;
      write(text.log.stored, 'ok');
      await fly('queue', 'push', 'push');
      if (gen !== generation) return;
      write(text.log.notified, 'ok');
      task.classList.remove('is-queued');
      task.classList.add('is-synced');
      setState(task, text.app.synced);
    });
    return chain;
  }

  function setState(task: HTMLElement, label: string): void {
    const s = task.querySelector<HTMLElement>('[data-state]');
    if (s) s.textContent = label;
  }

  function complete(task: HTMLElement, button: HTMLButtonElement): void {
    button.disabled = true;
    task.classList.add('is-done');
    write(fill(text.log.optimistic, { task: task.dataset.title ?? '' }));
    const key = idempotencyKey();
    if (!online) {
      task.classList.add('is-queued');
      setState(task, text.app.queued);
      queue.push({ task, key });
      write(text.log.offline, 'warn');
      updateBadge();
      return;
    }
    setState(task, '…');
    void send(task, key);
  }

  function setOnline(value: boolean): void {
    online = value;
    root.classList.toggle('is-offline', !online);
    netBtn!.setAttribute('aria-pressed', String(!online));
    netBtn!.textContent = online ? text.controls.networkOff : text.controls.networkOn;
    net!.textContent = online ? text.app.online : text.app.offline;
    if (online && queue.length) {
      write(fill(text.log.reconnect, { n: String(queue.length) }), 'req');
      const pending = queue;
      queue = [];
      for (const { task, key } of pending) {
        setState(task, '…');
        void send(task, key).then(updateBadge);
      }
    }
    updateBadge();
  }

  function reset(): void {
    generation++;
    chain = Promise.resolve();
    queue = [];
    for (const task of root.querySelectorAll<HTMLElement>('[data-task]')) {
      task.classList.remove('is-done', 'is-queued', 'is-synced');
      setState(task, '');
      const b = task.querySelector<HTMLButtonElement>('[data-complete]');
      if (b) b.disabled = false;
    }
    stage!.querySelectorAll('.packet').forEach((p) => p.remove());
    log!.replaceChildren();
    const li = document.createElement('li');
    li.className = 'log-idle';
    li.textContent = text.log.idle;
    log!.append(li);
    setOnline(true);
  }

  root.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-complete]');
    const task = button?.closest<HTMLElement>('[data-task]');
    if (button && task && !button.disabled) complete(task, button);
  });
  netBtn.addEventListener('click', () => setOnline(!online));
  resetBtn.addEventListener('click', reset);

  drawWires();
  new ResizeObserver(drawWires).observe(stage);
  root.closest('details')?.addEventListener('toggle', drawWires);
}

/* ------------------------------------------------------------- pipeline */

function initPipeline(root: HTMLElement, text: DemoText): void {
  const status = root.querySelector<HTMLElement>('[data-pipe-status]');
  const failure = root.querySelector<HTMLElement>('[data-pipe-failure]');
  const gate = root.querySelector<HTMLElement>('[data-gate]');
  const run = root.querySelector<HTMLButtonElement>('[data-run]');
  const regress = root.querySelector<HTMLButtonElement>('[data-regress]');
  if (!status || !failure || !gate || !run || !regress) return;
  const stages = [...root.querySelectorAll<HTMLElement>('[data-pstage]')];
  const rolls = [...root.querySelectorAll<HTMLElement>('[data-roll]')];
  const failAt = root.dataset.failAt;

  async function go(withRegression: boolean): Promise<void> {
    run!.disabled = true;
    regress!.disabled = true;
    root.classList.remove('is-passed', 'is-blocked');
    for (const s of stages) s.className = 'pstage';
    for (const r of rolls) r.className = '';
    failure!.hidden = true;
    gate!.hidden = true;
    status!.textContent = text.pipeline.running;
    for (const s of stages) {
      s.classList.add('is-running');
      await wait(560);
      s.classList.remove('is-running');
      if (withRegression && s.dataset.pstage === failAt) {
        s.classList.add('is-failed');
        for (const rest of stages.slice(stages.indexOf(s) + 1)) rest.classList.add('is-skipped');
        failure!.hidden = false;
        status!.textContent = text.pipeline.blocked;
        root.classList.add('is-blocked');
        run!.disabled = false;
        regress!.disabled = false;
        return;
      }
      s.classList.add('is-passed');
    }
    for (const [i, r] of rolls.entries()) {
      if (i === rolls.length - 1) {
        gate!.hidden = false;
        await wait(500);
      }
      r.classList.add('is-live');
      await wait(420);
    }
    status!.textContent = text.pipeline.passed;
    root.classList.add('is-passed');
    run!.disabled = false;
    regress!.disabled = false;
  }

  run.addEventListener('click', () => void go(false));
  regress.addEventListener('click', () => void go(true));
}

export function initDemos(): void {
  const text = readText();
  if (!text) return;
  const sync = document.querySelector<HTMLElement>('[data-demo="sync"]');
  if (sync) initSync(sync, text);
  const pipe = document.querySelector<HTMLElement>('[data-demo="pipeline"]');
  if (pipe) initPipeline(pipe, text);
}
