// "Nasıl çalışır" anlatımı: dört sahne kendiliğinden ilerler (sahne başı
// 5,5 sn, toplam 22 sn) ve son sahnede durur. Sahne görünür olunca başlar. Önceki/sonraki, durdur/oynat
// ve adım düğmeleri; sol/sağ ok tuşları. Hareket azaltma tercihinde otomatik
// oynatma kapalı başlar. Betik yoksa dört sahne alt alta görünür.

const SCENE_MS = 5500;

export function initWalkthrough(): void {
  const root = document.querySelector<HTMLElement>('[data-walkthrough]');
  if (!root) return;
  const scenes = [...root.querySelectorAll<HTMLElement>('[data-scene]')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-wt-go]')];
  const toggle = root.querySelector<HTMLButtonElement>('[data-wt-toggle]');
  const bar = root.querySelector<HTMLElement>('[data-wt-bar]');
  if (!scenes.length || !toggle || !bar) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  // Otomatik oynatma, sahne ekranda görünür olunca başlar (yoksa ilk adım
  // kullanıcı kaydırmadan geçip gider). Kullanıcı bir düğmeye bastıysa başlamaz.
  let playing = false;
  let touched = false;
  let timer = 0;
  let barAnim: Animation | null = null;

  root.classList.add('is-live');

  function countUp(scene: HTMLElement): void {
    for (const el of scene.querySelectorAll<HTMLElement>('[data-count]')) {
      const target = Number(el.dataset.count);
      if (reduced || !Number.isFinite(target)) {
        el.textContent = String(target);
        continue;
      }
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / 900);
        el.textContent = String(Math.round(target * (1 - (1 - p) ** 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }

  function render(): void {
    scenes.forEach((s, i) => {
      const active = i === index;
      s.classList.toggle('is-active', active);
      s.setAttribute('aria-hidden', String(!active));
      s.inert = !active;
    });
    dots.forEach((d, i) => {
      if (i === index) d.setAttribute('aria-current', 'step');
      else d.removeAttribute('aria-current');
    });
    countUp(scenes[index]!);
    toggle!.textContent = playing ? (toggle!.dataset.pause ?? '') : (toggle!.dataset.play ?? '');
    toggle!.setAttribute('aria-pressed', String(playing));
    schedule();
  }

  function schedule(): void {
    window.clearTimeout(timer);
    barAnim?.cancel();
    const progress = (index + 1) / scenes.length;
    if (!playing) {
      bar!.style.transform = `scaleX(${progress})`;
      return;
    }
    const from = index / scenes.length;
    barAnim = bar!.animate(
      [{ transform: `scaleX(${from})` }, { transform: `scaleX(${progress})` }],
      {
        duration: SCENE_MS,
        easing: 'linear',
        fill: 'forwards',
      },
    );
    timer = window.setTimeout(() => {
      if (index < scenes.length - 1) {
        index++;
      } else {
        playing = false;
      }
      render();
    }, SCENE_MS);
  }

  function go(i: number): void {
    index = (i + scenes.length) % scenes.length;
    render();
  }

  root.addEventListener('click', (e) => {
    if ((e.target as Element).closest('button')) touched = true;
  });
  const stage = root.querySelector<HTMLElement>('.wt-stage');
  if (!reduced && stage && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting) && !touched) {
          io.disconnect();
          index = 0;
          playing = true;
          render();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(stage);
  }

  root.querySelector('[data-wt-prev]')?.addEventListener('click', () => go(index - 1));
  root.querySelector('[data-wt-next]')?.addEventListener('click', () => go(index + 1));
  dots.forEach((d) => d.addEventListener('click', () => go(Number(d.dataset.wtGo))));
  toggle.addEventListener('click', () => {
    if (!playing && index === scenes.length - 1) index = 0;
    playing = !playing;
    render();
  });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  });
  // Sekme arka plandayken zamanlayıcı ilerlemesin.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && playing) {
      playing = false;
      render();
    }
  });

  render();
}
