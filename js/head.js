(function () {
  var root = document.documentElement, theme = null;
  if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
  function clearHash() {
    if (location.hash) { history.replaceState(null, '', location.pathname + location.search); }
  }
  function toTop() {
    try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, 0); }
  }
  var touched = false;
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (name) {
    window.addEventListener(name, function () { touched = true; }, { capture: true, passive: true });
  });
  function settle() { if (!touched) { toTop(); } }
  clearHash();
  toTop();
  document.addEventListener('DOMContentLoaded', settle);
  window.addEventListener('load', settle);
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) { clearHash(); toTop(); }
  });
  try { theme = localStorage.getItem('theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') { theme = 'dark'; }
  root.setAttribute('data-theme', theme);
  root.classList.add('js');
  var fonts = document.getElementById('fonts');
  if (fonts) {
    var useFonts = function () { fonts.media = 'all'; };
    if (fonts.sheet) { useFonts(); } else { fonts.addEventListener('load', useFonts); }
  }
  var lite = false;
  try { lite = sessionStorage.getItem('lite') === '1'; } catch (e) {}
  if (window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)').matches ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      (navigator.connection && navigator.connection.saveData)) { lite = true; }
  if (lite) { root.classList.add('lite'); }
  try {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('intro')) {
      root.classList.add('intro-on');
      sessionStorage.setItem('intro', '1');
    }
  } catch (e) {}
})();
