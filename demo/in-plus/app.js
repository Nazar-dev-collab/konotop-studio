(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PHONE = '+380663770943';
  const fmt = (n) => Math.round(n).toLocaleString('uk-UA').replace(/,/g, ' ') + ' грн';

  /* ---------- toast ---------- */
  const toastEl = $('#toast'); let toastT;
  const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 3200); };

  /* ---------- mode switch (Візитка / Каталог) ---------- */
  const root = document.documentElement;
  const setMode = (m, push) => {
    root.dataset.mode = m;
    $$('.demo__seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
    if (push) {
      const u = new URL(location.href);
      u.searchParams.set('v', m === 'catalog' ? 'catalog' : 'card');
      u.hash = '';
      history.replaceState(null, '', u);
    }
  };
  setMode(new URLSearchParams(location.search).get('v') === 'catalog' ? 'catalog' : 'card', false);
  $$('.demo__seg button').forEach((b) => b.addEventListener('click', () => {
    setMode(b.dataset.mode, true);
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    toast(b.dataset.mode === 'catalog' ? 'Варіант «Каталог»: каталог документів і калькулятор' : 'Варіант «Візитка»: одна сторінка з послугами й цінами');
  }));

  /* ---------- sticky nav border ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-stuck', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- split-flap board ---------- */
  const WORDS = [
    ['English', 'TRANSLATION'],
    ['Polski', 'TŁUMACZENIE'],
    ['Deutsch', 'ÜBERSETZUNG'],
    ['Français', 'TRADUCTION'],
    ['Español', 'TRADUCCIÓN'],
    ['Čeština', 'PŘEKLAD'],
    ['Italiano', 'TRADUZIONE'],
    ['Українська', 'ПЕРЕКЛАД']
  ];
  const N = Math.max(...WORDS.map((w) => [...w[1]].length));
  const tilesEl = $('#tiles');
  const tiles = Array.from({ length: N }, () => {
    const t = document.createElement('span');
    t.className = 'tile is-blank';
    t.setAttribute('aria-hidden', 'true');
    t.innerHTML = '<span class="tile__face"></span>';
    tilesEl.appendChild(t);
    return t;
  });
  const chipsEl = $('#board-chips');
  const chips = WORDS.map(([lang], i) => {
    const c = document.createElement('button');
    c.type = 'button'; c.className = 'lang-chip'; c.textContent = lang;
    c.addEventListener('click', () => { show(i); stop(); });
    chipsEl.appendChild(c);
    return c;
  });
  const langEl = $('#board-lang'), srEl = $('#board-sr');
  let idx = -1, timer = null, paused = false;

  function show(i) {
    idx = i;
    const [lang, word] = WORDS[i];
    const letters = [...word];
    const pad = Math.floor((N - letters.length) / 2);
    tiles.forEach((t, k) => {
      const ch = letters[k - pad] || '';
      const face = t.firstChild;
      const apply = () => { face.textContent = ch; t.classList.toggle('is-blank', !ch); };
      if (reduce) { apply(); return; }
      setTimeout(() => {
        t.classList.remove('is-flip'); void t.offsetWidth; t.classList.add('is-flip');
        setTimeout(apply, 220);
      }, k * 55);
    });
    langEl.textContent = lang;
    srEl.textContent = `${lang}: ${word.toLowerCase()}`;
    chips.forEach((c, k) => c.setAttribute('aria-pressed', String(k === i)));
  }
  const pauseBtn = $('#board-pause');
  function start() { if (reduce) return; clearInterval(timer); timer = setInterval(() => show((idx + 1) % WORDS.length), 2800); paused = false; pauseBtn.textContent = 'Пауза'; pauseBtn.setAttribute('aria-pressed', 'false'); }
  function stop() { clearInterval(timer); timer = null; paused = true; pauseBtn.textContent = 'Далі'; pauseBtn.setAttribute('aria-pressed', 'true'); }
  pauseBtn.addEventListener('click', () => (paused ? (show((idx + 1) % WORDS.length), start()) : stop()));
  if (reduce) pauseBtn.hidden = true;
  show(WORDS.length - 1);
  setTimeout(() => { if (!paused) { show(0); start(); } }, 1400);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearInterval(timer); else if (!paused) start(); });

  /* ---------- catalogue data ---------- */
  const CATS = [['all', 'Усі'], ['personal', 'Особисті'], ['edu', 'Освіта'], ['med', 'Медицина'], ['biz', 'Бізнес']];
  const CAT_NAME = Object.fromEntries(CATS);
  const DOCS = [
    ['passport', 'personal', 'Паспорт громадянина України', 'книжечка або ID-картка', 300, 1],
    ['zagran', 'personal', 'Закордонний паспорт', 'сторінка з фото', 250, 1],
    ['birth', 'personal', 'Свідоцтво про народження', 'зокрема старого зразка', 300, 1],
    ['marriage', 'personal', 'Свідоцтво про шлюб чи розлучення', '', 300, 1],
    ['nocrime', 'personal', 'Довідка про несудимість', 'з МВС або Дії', 300, 1],
    ['license', 'personal', 'Водійське посвідчення', 'для обміну за кордоном', 300, 1],
    ['ipn', 'personal', 'Ідентифікаційний код', '', 250, 1],
    ['school', 'edu', 'Атестат з додатком', 'шкільний або про базову освіту', 650, 2],
    ['diploma', 'edu', 'Диплом бакалавра чи магістра', 'разом з додатком з оцінками', 900, 2],
    ['acad', 'edu', 'Академічна довідка', 'для переведення чи вступу', 600, 2],
    ['med-cert', 'med', 'Медична довідка або виписка', 'до 2 сторінок', 450, 1],
    ['vacc', 'med', 'Карта щеплень', 'для школи чи садочка', 350, 1],
    ['epicrisis', 'med', 'Епікриз, результати аналізів', 'ціна за сторінку', 380, 2],
    ['charter', 'biz', 'Статут підприємства', 'ціна за сторінку', 280, 3],
    ['contract', 'biz', 'Договір, контракт', 'ціна за сторінку', 280, 2],
    ['extract', 'biz', 'Витяг з ЄДР', 'для банку чи контрагента', 400, 1],
    ['power', 'biz', 'Довіреність', '', 350, 1]
  ];
  const LANGS = [
    ['Англійська', 1], ['Польська', 1], ['Німецька', 1],
    ['Французька', 1.28], ['Іспанська', 1.28], ['Італійська', 1.28], ['Чеська', 1.28],
    ['Литовська', 1.52], ['Румунська', 1.52], ['Турецька', 1.52], ['Португальська', 1.52], ['Словацька', 1.52],
    ['Китайська', 2.2], ['Арабська', 2.2], ['Японська', 2.2], ['Іврит', 2.2], ['Корейська', 2.2]
  ];
  const PAGE = 250;

  const picked = new Set();
  let cat = 'all', query = '', pages = 0;

  const chipsWrap = $('#cat-chips');
  CATS.forEach(([id, name]) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = name; b.dataset.c = id;
    b.setAttribute('aria-pressed', String(id === cat));
    b.addEventListener('click', () => { cat = id; $$('.chip', chipsWrap).forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.c === id))); renderDocs(); });
    chipsWrap.appendChild(b);
  });
  $('#cat-search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); renderDocs(); });

  const docsEl = $('#docs');
  function renderDocs() {
    const list = DOCS.filter((d) => (cat === 'all' || d[1] === cat) && (!query || (d[2] + ' ' + d[3]).toLowerCase().includes(query)));
    if (!list.length) {
      docsEl.innerHTML = '<p class="empty">Такого документа немає в каталозі, але ми його перекладемо. Надішліть фото у Viber або <button type="button" id="reset">покажіть усі документи</button>.</p>';
      $('#reset').addEventListener('click', () => { query = ''; $('#cat-search').value = ''; cat = 'all'; $$('.chip', chipsWrap).forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.c === 'all'))); renderDocs(); });
      return;
    }
    docsEl.innerHTML = list.map(([id, c, name, sub, price, days]) => `
      <article class="doc">
        <div class="doc__top"><h3>${name}</h3><span class="doc__tag" data-c="${c}">${CAT_NAME[c]}</span></div>
        ${sub ? `<p>${sub}</p>` : ''}
        <p>Термін: ${days === 1 ? '1 день' : days + ' дні'}</p>
        <div class="doc__bot"><span class="doc__price">${fmt(price)}</span>
        <button class="doc__add" type="button" data-id="${id}" aria-pressed="${picked.has(id)}">${picked.has(id) ? 'Додано' : 'Додати'}</button></div>
      </article>`).join('');
  }
  docsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.doc__add'); if (!b) return;
    const id = b.dataset.id;
    if (picked.has(id)) picked.delete(id); else { picked.add(id); toast('Додано в калькулятор'); }
    b.setAttribute('aria-pressed', String(picked.has(id)));
    b.textContent = picked.has(id) ? 'Додано' : 'Додати';
    calc();
  });

  /* ---------- languages list ---------- */
  $('#langs').innerHTML = LANGS.map(([n, k]) => `<li>${n}<span>від ${fmt(PAGE * k)}</span></li>`).join('');
  const sel = $('#c-lang');
  sel.innerHTML = LANGS.map(([n, k], i) => `<option value="${i}">${n}${k > 1 ? ` (×${k.toString().replace('.', ',')})` : ''}</option>`).join('');

  /* ---------- calculator ---------- */
  const pgOut = $('#pg-out');
  $('#pg-minus').addEventListener('click', () => { pages = Math.max(0, pages - 1); pgOut.textContent = pages; calc(); });
  $('#pg-plus').addEventListener('click', () => { pages = Math.min(200, pages + 1); pgOut.textContent = pages; calc(); });
  $('#calc-form').addEventListener('submit', (e) => e.preventDefault());
  $('#calc-form').addEventListener('change', calc);
  $('#picked').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    picked.delete(b.dataset.id); renderDocs(); calc();
  });

  let orderText = '';
  function calc() {
    const [langName, k] = LANGS[+sel.value];
    const urg = +($('input[name="urg"]:checked').value);
    const urgName = { 1: 'звичайний', 1.5: 'терміново', 2: 'сьогодні' }[urg];
    const docs = DOCS.filter((d) => picked.has(d[0]));
    $('#picked').innerHTML = docs.map((d) => `<button type="button" data-id="${d[0]}" aria-label="Прибрати: ${d[2]}">${d[2]}</button>`).join('');

    const docSum = docs.reduce((s, d) => s + d[4], 0) * k;
    const pageSum = pages * PAGE * k;
    const tr = (docSum + pageSum) * urg;
    const units = docs.length + (pages ? 1 : 0);
    const not = $('#c-not').checked ? 350 * units : 0;
    const apo = $('#c-apo').checked ? 900 * units : 0;
    const total = tr + not + apo;

    const rows = [];
    if (docs.length) rows.push([`Документи (${docs.length})`, docSum * urg]);
    if (pages) rows.push([`Текст, ${pages} стор.`, pageSum * urg]);
    if (not) rows.push(['Нотаріальне засвідчення', not]);
    if (apo) rows.push(['Апостиль', apo]);
    $('#t-rows').innerHTML = rows.map(([a, b]) => `<li>${a}<b>${fmt(b)}</b></li>`).join('');
    $('#t-sum').textContent = fmt(total);

    let days = Math.max(0, ...docs.map((d) => d[5]), pages ? Math.ceil(pages / 8) : 0);
    if (urg === 2 && days) days = 0; else if (urg === 1.5 && days) days = Math.max(1, Math.ceil(days / 2));
    $('#t-term').textContent = !units ? 'Додайте документ, щоб побачити термін'
      : apo ? 'Переклад ' + (days ? `за ${days} дн.` : 'сьогодні') + ', з апостилем 5–10 робочих днів'
      : days ? `Готово за ${days} ${days === 1 ? 'день' : 'дні'}` : 'Готово сьогодні';

    orderText = [
      'Вітаю! Хочу замовити переклад.',
      docs.length ? 'Документи: ' + docs.map((d) => d[2]).join('; ') : '',
      pages ? `Інший текст: ${pages} стор.` : '',
      `Мова: ${langName}. Термін: ${urgName}.`,
      [not && 'нотаріальне засвідчення', apo && 'апостиль', $('#c-del').checked && 'доставка Новою поштою'].filter(Boolean).join(', '),
      units ? `Попередня вартість з сайту: ${fmt(total)}.` : ''
    ].filter(Boolean).join('\n');
  }
  renderDocs(); calc();

  $('#t-send').addEventListener('click', async (e) => {
    e.preventDefault();
    if (!picked.size && !pages) { toast('Додайте хоча б один документ або сторінку тексту'); return; }
    try { await navigator.clipboard.writeText(orderText); toast('Текст замовлення скопійовано. Вставте його в чат Viber'); }
    catch { toast('Відкриваємо Viber'); }
    setTimeout(() => { location.href = 'viber://chat?number=' + encodeURIComponent(PHONE); }, 700);
  });
})();
