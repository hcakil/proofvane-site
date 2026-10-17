// Dil sayfaları (/tr/, /en/). İçerik derlemede statik üretilir (vite.config.ts);
// bu betik yazı tiplerini/stilleri yükler, dil seçimini hatırlar ve iki küçük
// canlı gösterimi (src/demo.ts) başlatır.
// Bu sayfalarda otomatik dil yönlendirmesi YOKTUR: /en/ ya da /tr/ adresine
// doğrudan gelen ziyaretçi o sayfada kalır.
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './styles.css';
import { initDemos } from './demo';
import { initMenu, initTheme } from './theme';
import { isLocale, writeStored } from './locale';

function safeStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest?.('a[data-locale]');
  const locale = link?.getAttribute('data-locale');
  if (isLocale(locale)) writeStored(safeStorage(), locale);
});

document.documentElement.classList.add('js');
initTheme();
initMenu();
initDemos();
