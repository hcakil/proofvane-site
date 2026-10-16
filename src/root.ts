// Kök sayfa (/): kayıtlı tercih, yoksa tarayıcının dil listesindeki ilk dil.
// Türkçe ise /tr/, diğer tüm dillerde /en/. Betik çalışmazsa sayfadaki iki
// bağlantı elle seçim sunar.
import '@fontsource-variable/geist';
import './styles.css';
import { isLocale, pickLocale, readStored, writeStored } from './locale';

function safeStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

const storage = safeStorage();
const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
const target = pickLocale(readStored(storage), languages);
window.location.replace(`./${target}/${window.location.search}${window.location.hash}`);

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest?.('a[data-locale]');
  const locale = link?.getAttribute('data-locale');
  if (isLocale(locale)) writeStored(storage, locale);
});
