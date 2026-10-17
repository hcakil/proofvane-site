// Sayfa çizilmeden önce elle seçilmiş temayı uygular. "Sistem" seçiliyse
// dokunmaz; o durumda CSS prefers-color-scheme ile cihaza uyar (src/theme.ts).
(() => {
  try {
    const t = localStorage.getItem('proofvane.theme');
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  } catch {
    /* depolama kapalı: sistem teması */
  }
})();
