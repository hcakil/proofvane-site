// Tema seçici: Sistem / Açık / Koyu.
//   Sistem: <html> üzerinde data-theme yok; CSS prefers-color-scheme ile
//           cihaz tercihini izler ve cihaz değişince anında uyar.
//   Açık / Koyu: data-theme="light|dark"; seçim localStorage'da saklanır.
// İlk boyamadan önceki uygulama public/theme-init.js içindedir.

export type ThemeChoice = 'system' | 'light' | 'dark';
export const THEME_KEY = 'proofvane.theme';

export function isThemeChoice(value: unknown): value is ThemeChoice {
  return value === 'system' || value === 'light' || value === 'dark';
}

function storage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function readTheme(): ThemeChoice {
  try {
    const v = storage()?.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

export function applyTheme(choice: ThemeChoice): void {
  const root = document.documentElement;
  if (choice === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', choice);
  try {
    if (choice === 'system') storage()?.removeItem(THEME_KEY);
    else storage()?.setItem(THEME_KEY, choice);
  } catch {
    /* depolama kapalı: seçim bu sayfada geçerli kalır */
  }
  for (const b of document.querySelectorAll<HTMLButtonElement>('[data-theme-choice]')) {
    b.setAttribute('aria-pressed', String(b.dataset.themeChoice === choice));
  }
}

export function initTheme(): void {
  applyTheme(readTheme());
  document.addEventListener('click', (event) => {
    const b = (event.target as Element | null)?.closest?.<HTMLButtonElement>('[data-theme-choice]');
    const choice = b?.dataset.themeChoice;
    if (isThemeChoice(choice)) applyTheme(choice);
  });
}

/** Mobil menü: düğme paneli açar/kapatır; Escape ve bağlantı tıklaması kapatır. */
export function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;
  const set = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) set(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      set(false);
      toggle.focus();
    }
  });
}
