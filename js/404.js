(function () {
  var root = document.documentElement, theme = null;
  try { theme = localStorage.getItem('theme'); } catch (e) {}
  if (theme === 'light' || theme === 'dark') { root.setAttribute('data-theme', theme); }
  if (/^\/en(\/|$)/.test(location.pathname)) { root.lang = 'en'; }
  if (root.getAttribute('data-theme') === 'light') {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#FAFAFA');
  }
  var fonts = document.getElementById('fonts');
  if (fonts) {
    var useFonts = function () { fonts.media = 'all'; };
    if (fonts.sheet) { useFonts(); } else { fonts.addEventListener('load', useFonts); }
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (root.lang === 'en') {
      document.title = 'Page not found | KONOTOP STUDIO';
      document.getElementById('logo').setAttribute('href', '/en/');
    }
  });
})();
