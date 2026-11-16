(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- data ---------- */
  const ART = {
    write: `<svg viewBox="0 0 140 140"><g transform="rotate(-35 70 70)"><rect x="30" y="34" width="70" height="14" rx="3" fill="#ffcd3c"/><path d="M100 34l18 7-18 7z" fill="#f3d6a8"/><path d="M112 39l6 2-6 2z" fill="#18223a"/><rect x="22" y="34" width="9" height="14" fill="#ff8fa0"/><rect x="30" y="62" width="70" height="14" rx="3" fill="#4a8bff"/><path d="M100 62l18 7-18 7z" fill="#f3d6a8"/><path d="M112 67l6 2-6 2z" fill="#18223a"/><rect x="22" y="62" width="9" height="14" fill="#ff8fa0"/><rect x="30" y="90" width="70" height="14" rx="3" fill="#5fb336"/><path d="M100 90l18 7-18 7z" fill="#f3d6a8"/><path d="M112 95l6 2-6 2z" fill="#18223a"/><rect x="22" y="90" width="9" height="14" fill="#ff8fa0"/></g></svg>`,
    paper: `<svg viewBox="0 0 140 140"><rect x="30" y="40" width="70" height="80" rx="4" fill="#fff" stroke="#d6dbe6" stroke-width="2" transform="rotate(-6 65 80)"/><rect x="36" y="32" width="70" height="80" rx="4" fill="#fff" stroke="#d6dbe6" stroke-width="2"/><g stroke="#cfd7e6" stroke-width="3" stroke-linecap="round"><path d="M48 54h46M48 66h46M48 78h30"/></g><rect x="78" y="78" width="40" height="40" rx="3" fill="#ffcd3c" transform="rotate(8 98 98)"/></svg>`,
    archive: `<svg viewBox="0 0 140 140"><rect x="40" y="22" width="56" height="98" rx="6" fill="#ff6b5e"/><rect x="40" y="22" width="14" height="98" rx="4" fill="#d9483c"/><circle cx="74" cy="96" r="9" fill="#fff"/><rect x="62" y="36" width="26" height="30" rx="3" fill="#fff"/><path d="M66 44h18M66 50h18M66 56h12" stroke="#ff6b5e" stroke-width="2.5" stroke-linecap="round"/><rect x="92" y="34" width="24" height="86" rx="5" fill="#4a8bff"/></svg>`,
    desk: `<svg viewBox="0 0 140 140"><path d="M20 92h80a6 6 0 0 1 6 6v6H20z" fill="#18223a"/><path d="M24 90c0-14 10-24 30-24h46c8 0 12 6 12 12v6H30z" fill="#9b7bff"/><rect x="96" y="70" width="18" height="8" rx="3" fill="#7b5ce0"/><g fill="none" stroke-width="4" stroke-linecap="round"><path d="M100 30v26a6 6 0 0 1-12 0V22a5 5 0 0 1 10 0v30" stroke="#5fb336"/><path d="M120 34v26a6 6 0 0 1-12 0V26a5 5 0 0 1 10 0v30" stroke="#ffcd3c"/></g></svg>`,
    school: `<svg viewBox="0 0 140 140"><rect x="28" y="26" width="64" height="88" rx="6" fill="#4a8bff"/><rect x="36" y="26" width="56" height="88" rx="4" fill="#fff" stroke="#d6dbe6" stroke-width="2"/><g stroke="#dce8ff" stroke-width="1.5"><path d="M36 40h56M36 52h56M36 64h56M36 76h56M36 88h56M36 100h56M48 26v88M60 26v88M72 26v88M84 26v88"/></g><path d="M40 40l3 3" /><rect x="96" y="20" width="16" height="100" rx="3" fill="#ffcd3c" transform="rotate(10 104 70)"/><g stroke="#18223a" stroke-width="2" transform="rotate(10 104 70)"><path d="M96 32h6M96 44h4M96 56h6M96 68h4M96 80h6M96 92h4M96 104h6"/></g></svg>`,
    home: `<svg viewBox="0 0 140 140"><rect x="30" y="56" width="40" height="64" rx="10" fill="#4a8bff"/><rect x="40" y="40" width="20" height="18" rx="3" fill="#18223a"/><path d="M60 44h18v8H60z" fill="#18223a"/><rect x="38" y="74" width="24" height="24" rx="4" fill="#fff" opacity=".85"/><rect x="80" y="44" width="40" height="76" rx="8" fill="#fff" stroke="#d6dbe6" stroke-width="2"/><ellipse cx="100" cy="44" rx="20" ry="7" fill="#eef1f6" stroke="#d6dbe6" stroke-width="2"/><ellipse cx="100" cy="44" rx="6" ry="2.5" fill="#cfd7e6"/><path d="M80 84h40" stroke="#5fb336" stroke-width="4"/></svg>`,
    bags: `<svg viewBox="0 0 140 140"><path d="M50 40a20 20 0 0 1 40 0" fill="none" stroke="#18223a" stroke-width="6"/><rect x="34" y="40" width="72" height="84" rx="20" fill="#5fb336"/><rect x="46" y="78" width="48" height="34" rx="10" fill="#2f7d1c"/><rect x="62" y="74" width="16" height="8" rx="3" fill="#ffcd3c"/><rect x="50" y="52" width="40" height="6" rx="3" fill="#8fd062"/></svg>`,
    gift: `<svg viewBox="0 0 140 140"><rect x="28" y="62" width="84" height="58" rx="6" fill="#ff6b5e"/><rect x="22" y="48" width="96" height="20" rx="5" fill="#ff8a7f"/><rect x="62" y="48" width="16" height="72" fill="#ffcd3c"/><path d="M70 48c-10-22-34-18-26-4 4 6 26 4 26 4zM70 48c10-22 34-18 26-4-4 6-26 4-26 4z" fill="#ffcd3c"/></svg>`
  };

  const CATS = [
    { id: 'paper', name: 'Папір і стікери', tint: '#fff3c4', accent: '#b78a00', tags: ['А4 і А3', 'Стікери', 'Блоки для нотаток', 'Бланки'],
      goods: [['Папір офісний А4', 'пачка 500 арк.', 'пач.'], ['Папір А3', 'пачка 500 арк.', 'пач.'], ['Стікери 76×76', 'блок 100 арк.', 'бл.'], ['Блок для нотаток', 'куб 9×9 см', 'шт.']] },
    { id: 'write', name: 'Письмове приладдя', tint: '#e3f4d6', accent: '#2f7d1c', tags: ['Ручки', 'Олівці', 'Маркери', 'Коректори'],
      goods: [['Ручки кулькові сині', 'упаковка 50 шт.', 'уп.'], ['Олівці графітні НВ', 'упаковка 12 шт.', 'уп.'], ['Маркери текстові', 'набір 4 кольори', 'наб.'], ['Коректор-ручка', '8 мл', 'шт.']] },
    { id: 'archive', name: 'Папки та архів', tint: '#ffe1dc', accent: '#c93b2f', tags: ['Реєстратори', 'Файли', 'Швидкозшивачі', 'Короби'],
      goods: [['Файли А4', 'упаковка 100 шт.', 'уп.'], ['Папка-реєстратор', 'корінець 75 мм', 'шт.'], ['Швидкозшивач', 'картон, А4', 'шт.'], ['Короб архівний', '100 мм', 'шт.']] },
    { id: 'desk', name: 'Настільне приладдя', tint: '#ece5ff', accent: '#6a4bd6', tags: ['Степлери', 'Скоби', 'Скріпки', 'Лотки'],
      goods: [['Скріпки 28 мм', 'упаковка 100 шт.', 'уп.'], ['Степлер №24', 'до 20 арк.', 'шт.'], ['Скоби №24/6', '1000 шт.', 'уп.'], ['Діркопробивач', 'до 20 арк.', 'шт.']] },
    { id: 'school', name: 'Шкільне', tint: '#dde9ff', accent: '#2c64d6', tags: ['Зошити', 'Щоденники', 'Фарби', 'Пенали'],
      goods: [['Зошит 12 арк.', 'клітинка', 'шт.'], ['Зошит 48 арк.', 'клітинка', 'шт.'], ['Фарби акварельні', '12 кольорів', 'наб.'], ['Обкладинки для зошитів', 'упаковка 10 шт.', 'уп.']] },
    { id: 'home', name: 'Побутові товари', tint: '#d9f1f0', accent: '#1d7f7a', tags: ['Миючі засоби', 'Паперові рушники', 'Пакети'],
      goods: [['Рушники паперові', 'рулон', 'рул.'], ['Туалетний папір', 'упаковка 8 рул.', 'уп.'], ['Пакети для сміття 60 л', 'рулон 20 шт.', 'рул.'], ['Засіб для миття посуду', '500 мл', 'шт.']] },
    { id: 'bags', name: 'Рюкзаки й сумки', tint: '#e8f6dc', accent: '#2f7d1c', tags: ['Шкільні рюкзаки', 'Портфелі', 'Пенали'], goods: null },
    { id: 'gift', name: 'Подарункові сертифікати', tint: '#ffe8cf', accent: '#c25a00', tags: ['Колегам', 'Вчителям', 'Першокласникам'], goods: null }
  ];
  const SW = { paper: '#ffcd3c', write: '#5fb336', archive: '#ff6b5e', desk: '#9b7bff', school: '#4a8bff', home: '#2bb3aa' };

  /* ---------- toast ---------- */
  const toastEl = $('#toast'); let toastT;
  const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2600); };

  /* ---------- 3D catalogue carousel ---------- */
  const flow = $('#flow'), stage = $('#stage'), dots = $('#dots');
  const n = CATS.length;
  const cards = CATS.map((c, i) => {
    const el = document.createElement('article');
    el.className = 'card';
    el.style.setProperty('--tint', c.tint);
    el.style.setProperty('--accent', c.accent);
    el.setAttribute('aria-roledescription', 'картка');
    el.setAttribute('aria-label', `${i + 1} з ${n}: ${c.name}`);
    const cta = c.goods ? `<a class="btn btn--ink" href="#order" data-tab="${c.id}">Додати в заявку</a>` : `<a class="btn btn--ink" href="#visit">Запитати в магазині</a>`;
    el.innerHTML = `<div class="card__art"><span class="card__num">${String(i + 1).padStart(2, '0')}/${String(n).padStart(2, '0')}</span>${ART[c.id]}</div><h3>${c.name}</h3><ul>${c.tags.map(t => `<li>${t}</li>`).join('')}</ul>${cta}`;
    stage.appendChild(el);
    const d = document.createElement('button');
    d.type = 'button'; d.setAttribute('aria-label', c.name);
    d.addEventListener('click', () => go(i));
    dots.appendChild(d);
    return el;
  });

  let pos = 0, target = 0, raf = 0, dragging = false, moved = false;
  const spacing = () => (innerWidth < 640 ? 190 : 260);
  const wrapOff = (o) => ((o % n) + n + n / 2) % n - n / 2;
  const active = () => ((Math.round(target) % n) + n) % n;

  function layout() {
    const W = spacing();
    cards.forEach((el, i) => {
      const off = wrapOff(i - pos), a = Math.abs(off);
      const rot = Math.max(-1.4, Math.min(1.4, off)) * -34;
      el.style.transform = `translateX(${off * W}px) translateZ(${-a * 170}px) rotateY(${rot}deg) ${el._tilt || ''}`;
      el.style.zIndex = String(100 - Math.round(a * 10));
      el.style.opacity = a > 3.3 ? '0' : String(1 - Math.max(0, a - 2.3) * .8);
      el.style.filter = a > .5 ? `saturate(${1 - Math.min(a, 2) * .15})` : '';
    });
  }
  function syncA11y() {
    const k = active();
    cards.forEach((el, i) => {
      const on = i === k;
      el.setAttribute('aria-hidden', String(!on));
      el.querySelectorAll('a,button').forEach(b => b.tabIndex = on ? 0 : -1);
    });
    [...dots.children].forEach((d, i) => d.setAttribute('aria-current', String(i === k)));
  }
  function tick() {
    pos += (target - pos) * (reduce ? 1 : .14);
    if (Math.abs(target - pos) < .0005) pos = target;
    layout();
    raf = pos !== target || dragging ? requestAnimationFrame(tick) : 0;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  function go(i) {
    const cur = active();
    let d = i - cur; if (d > n / 2) d -= n; if (d < -n / 2) d += n;
    target = Math.round(target) + d; syncA11y(); kick();
  }
  $('#prev').addEventListener('click', () => { target = Math.round(target) - 1; syncA11y(); kick(); });
  $('#next').addEventListener('click', () => { target = Math.round(target) + 1; syncA11y(); kick(); });
  flow.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { target = Math.round(target) + 1; syncA11y(); kick(); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { target = Math.round(target) - 1; syncA11y(); kick(); e.preventDefault(); }
  });

  let x0 = 0, p0 = 0, lastX = 0, lastT = 0, vel = 0, pid = null;
  flow.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true; moved = false; pid = e.pointerId;
    x0 = lastX = e.clientX; p0 = pos; lastT = performance.now(); vel = 0;
    kick();
  });
  addEventListener('pointermove', (e) => {
    if (!dragging || e.pointerId !== pid) return;
    const dx = e.clientX - x0;
    if (!moved && Math.abs(dx) > 6) { moved = true; flow.classList.add('is-drag'); try { flow.setPointerCapture(pid); } catch (_) {} }
    if (!moved) return;
    const now = performance.now();
    vel = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
    target = pos = p0 - dx / spacing();
  });
  const end = () => {
    if (!dragging) return;
    dragging = false; flow.classList.remove('is-drag');
    if (moved) { target = Math.round(pos - Math.max(-1.5, Math.min(1.5, vel * 0.9))); syncA11y(); }
    kick();
  };
  addEventListener('pointerup', end); addEventListener('pointercancel', end);
  flow.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; }
    const card = e.target.closest('.card'); if (!card) return;
    const i = cards.indexOf(card);
    if (i !== active()) { e.preventDefault(); go(i); return; }
    const a = e.target.closest('[data-tab]');
    if (a) selectTab(a.dataset.tab);
  }, true);

  // tilt the front card toward the pointer
  if (!reduce && matchMedia('(hover: hover)').matches) {
    flow.addEventListener('pointermove', (e) => {
      if (dragging) return;
      const el = cards[active()], r = el.getBoundingClientRect();
      const inside = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
      cards.forEach(c => { c._tilt = ''; c.style.setProperty('--shine', 0); });
      if (inside) {
        const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        el._tilt = `rotateY(${px * 14}deg) rotateX(${-py * 12}deg) translateZ(20px)`;
        el.style.setProperty('--shine', 1);
      }
      layout();
    });
    flow.addEventListener('pointerleave', () => { cards.forEach(c => { c._tilt = ''; c.style.setProperty('--shine', 0); }); layout(); });
  }
  addEventListener('resize', layout);
  layout(); syncA11y();

  /* ---------- order builder ---------- */
  const cart = new Map();
  const tabs = $('.tabs'), goods = $('#goods'), picked = $('#picked'), empty = $('#empty');
  let current = 'paper';
  CATS.filter(c => c.goods).forEach(c => {
    const b = document.createElement('button');
    b.className = 'tab'; b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.tab = c.id; b.textContent = c.name;
    b.addEventListener('click', () => selectTab(c.id));
    tabs.appendChild(b);
  });
  function selectTab(id) {
    current = id;
    tabs.querySelectorAll('.tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
    renderGoods();
  }
  function renderGoods() {
    const c = CATS.find(x => x.id === current);
    const pal = ['#5fb336', '#ffcd3c', '#ff6b5e', '#4a8bff', '#9b7bff', '#2bb3aa'];
    const base = pal.indexOf(SW[current]);
    goods.innerHTML = c.goods.map(([name, pack, unit], j) => {
      const q = cart.get(name)?.n || 0;
      return `<li class="good${q ? ' is-in' : ''}"><span class="good__sw" style="--sw:${pal[(base + j) % pal.length]}"></span><div><b>${name}</b><span>${pack}</span></div>
        <div class="qty" role="group" aria-label="${name}, кількість">
          <button type="button" data-d="-1" data-name="${name}" data-unit="${unit}" aria-label="Менше: ${name}">−</button>
          <output>${q}</output>
          <button type="button" data-d="1" data-name="${name}" data-unit="${unit}" aria-label="Більше: ${name}">+</button>
        </div></li>`;
    }).join('');
  }
  function renderNote() {
    picked.innerHTML = [...cart].map(([name, { n, unit }]) => `<li><span>${name}</span><span>${n} ${unit}</span></li>`).join('');
    empty.hidden = cart.size > 0;
  }
  goods.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-d]'); if (!b) return;
    const { name, unit } = b.dataset;
    const q = Math.max(0, (cart.get(name)?.n || 0) + Number(b.dataset.d));
    q ? cart.set(name, { n: q, unit }) : cart.delete(name);
    b.parentElement.querySelector('output').textContent = q;
    b.closest('.good').classList.toggle('is-in', q > 0);
    renderNote();
  });
  const text = () => {
    const who = $('#company').value.trim();
    return `Заявка з сайту Скрєпка${who ? ' від ' + who : ''}:\n` + [...cart].map(([name, { n, unit }]) => `• ${name}: ${n} ${unit}`).join('\n');
  };
  $('#send').addEventListener('click', (e) => {
    if (!cart.size) { e.preventDefault(); toast('Додайте хоча б один товар'); return; }
    $('#send').href = 'viber://forward?text=' + encodeURIComponent(text());
  });
  $('#copy').addEventListener('click', async () => {
    if (!cart.size) { toast('Додайте хоча б один товар'); return; }
    try { await navigator.clipboard.writeText(text()); toast('Заявку скопійовано'); }
    catch (_) { toast('Не вдалося скопіювати, надішліть у Viber'); }
  });
  selectTab('paper'); renderNote();

  /* ---------- open now (Kyiv time) ---------- */
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Kyiv' }));
  const open = now.getDay() >= 1 && now.getDay() <= 5 && now.getHours() >= 9 && now.getHours() < 18;
  $('#dot').classList.toggle('is-open', open);
  $('#status').textContent = open ? 'Відчинено до 18:00' : 'Зараз зачинено, працюємо Пн–Пт 9:00–18:00';
})();
