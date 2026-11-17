/* pick theme + language before first paint */
(function(){
  var d=document.documentElement, s=null, l=null;
  try{ s=localStorage.getItem('verba-theme'); l=localStorage.getItem('verba-lang'); }catch(e){}
  if(!s){ var h=d.getAttribute('data-theme'); s = h==='light'||h==='dark' ? h : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); }
  d.setAttribute('data-site', s);
  d.setAttribute('data-lang', l==='en' ? 'en' : 'uk');
})();
