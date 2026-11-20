(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PHONE = '+380662668344';
  const fmt = (n) => Math.round(n).toLocaleString('uk-UA').replace(/\s/g, ' ') + ' грн';
  const plural = (n, one, few, many) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  };
  const icon = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------- toast ---------- */
  const toastEl = $('#toast'); let toastT;
  const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 3000); };

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
    renderBar();
  };
  $$('.demo__seg button').forEach((b) => b.addEventListener('click', () => {
    setMode(b.dataset.mode, true);
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    toast(b.dataset.mode === 'catalog' ? 'Варіант «Каталог»: товари з цінами й відкладання у Viber' : 'Варіант «Візитка»: одна сторінка про магазин');
  }));

  /* ---------- sticky nav border ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-stuck', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- letter blocks ---------- */
  $$('.blk').forEach((b) => b.addEventListener('click', () => {
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
  }));

  /* ---------- products ---------- */
  const CATS = [
    ['all', 'Усі товари'],
    ['baby', 'Малюкам'],
    ['toys', 'Іграшки'],
    ['games', 'Ігри й творчість'],
    ['ride', 'Транспорт'],
    ['care', 'Годування']
  ];
  const AGES = [
    ['all', 'Будь-який вік', 0, 99],
    ['0', 'До року', 0, 0.99],
    ['1', '1–3 роки', 1, 2.99],
    ['3', '3–6 років', 3, 5.99],
    ['6', '6+ років', 6, 99]
  ];
  // [id, name, cat, ageMin, ageMax, ageLabel, price, pictogram, tint]
  const P = [
    ['pyr', 'Пірамідка дерев’яна, 8 кілець', 'baby', 1, 3, 'від 1 року', 245, 'p-pyramid', 't-yellow'],
    ['mat', 'Розвиваючий килимок з дугою й брязкальцями', 'baby', 0, 1, 'з народження', 1190, 'p-mat', 't-green'],
    ['duck', 'Іграшки для ванни «Качечки», 3 шт', 'baby', 0, 3, 'від 6 місяців', 129, 'p-duck', 't-blue'],
    ['abc', 'Кубики з буквами, 12 шт', 'baby', 1, 4, 'від 1 року', 279, 'p-blocks', 't-red'],
    ['bottle', 'Пляшечка антиколікова, 250 мл', 'care', 0, 1, 'з народження', 329, 'p-bottle', 't-blue'],
    ['sippy', 'Поїльник-непроливайка, 200 мл', 'care', 0.5, 2, 'від 6 місяців', 219, 'p-bottle', 't-green'],
    ['bear', 'Мʼякий ведмедик, 35 см', 'toys', 0, 10, 'з народження', 459, 'p-bear', 't-yellow'],
    ['doll', 'Лялька-пупс з одягом і пляшечкою', 'toys', 3, 7, 'від 3 років', 649, 'p-doll', 't-red'],
    ['rc', 'Позашляховик на радіокеруванні, 1:16', 'toys', 6, 14, 'від 6 років', 1349, 'p-car', 't-red'],
    ['cars', 'Набір колекційних машинок, 5 шт', 'toys', 3, 10, 'від 3 років', 389, 'p-car', 't-blue'],
    ['ball', 'Мʼяч надувний, 45 см', 'toys', 1, 10, 'від 1 року', 99, 'p-ball', 't-yellow'],
    ['game', 'Настільна гра «Хто перший до фінішу»', 'games', 5, 12, 'від 5 років', 399, 'p-dice', 't-green'],
    ['puzzle', 'Пазл «Ферма», 60 елементів', 'games', 4, 7, 'від 4 років', 169, 'p-puzzle', 't-green'],
    ['crayons', 'Воскові олівці, 24 кольори', 'games', 3, 10, 'від 3 років', 149, 'p-crayons', 't-yellow'],
    ['clay', 'Пластилін, 10 кольорів зі стеком', 'games', 3, 10, 'від 3 років', 119, 'p-clay', 't-blue'],
    ['ride', 'Толокар з батьківською ручкою', 'ride', 1, 3, 'від 1 року', 1890, 'p-ride', 't-yellow'],
    ['bike', 'Біговел 12″ з регульованим сидінням', 'ride', 2, 5, 'від 2 років', 1650, 'p-bike', 't-green'],
    ['scoot', 'Самокат триколісний, колеса світяться', 'ride', 3, 6, 'від 3 років', 1290, 'p-scooter', 't-blue'],
    ['skate', 'Ролики розсувні, розмір 30–33', 'ride', 6, 12, 'від 6 років', 1150, 'p-skate', 't-red']
  ].map(([id, name, cat, min, max, ageLabel, price, pic, tint]) => ({ id, name, cat, min, max, ageLabel, price, pic, tint }));
  const TAGS = { rc: 'машинка пульт', cars: 'машинки', bike: 'беговел велосипед', ride: 'машинка каталка', scoot: 'самокат', skate: 'роліки', bear: 'мишка плюшева', doll: 'лялька', game: 'настолка', bottle: 'годування', sippy: 'годування чашка', mat: 'килимок', duck: 'купання ванна', abc: 'кубики букви' };
  P.forEach((p) => { p.tags = TAGS[p.id] || ''; });
  const byId = Object.fromEntries(P.map((p) => [p.id, p]));

  /* ---------- gift by age (card mode) ---------- */
  const GIFTS = {
    0: ['mat', 'bear', 'duck'],
    1: ['ride', 'pyr', 'abc'],
    3: ['bike', 'scoot', 'puzzle'],
    6: ['rc', 'skate', 'game']
  };
  const giftsEl = $('#gifts');
  const renderGifts = (age) => {
    giftsEl.innerHTML = GIFTS[age].map((id) => {
      const p = byId[id];
      return `<li><span class="pic ${p.tint}">${icon(p.pic)}</span><div><b>${p.name}</b><span><em>${fmt(p.price)}</em>, ${p.ageLabel}</span></div></li>`;
    }).join('');
  };
  const tabs = $$('#age-tabs [role="tab"]');
  const selectTab = (t, focus) => {
    tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; });
    giftsEl.setAttribute('aria-labelledby', t.id);
    renderGifts(t.dataset.age);
    if (focus) t.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); selectTab(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });
  renderGifts('0');

  /* ---------- catalogue ---------- */
  const state = { cat: 'all', age: 'all', q: '' };
  const reserved = new Map(); // id -> qty
  try {
    const saved = JSON.parse(localStorage.getItem('kids-market-demo') || '[]');
    saved.forEach(([id, q]) => { if (byId[id] && q > 0) reserved.set(id, q); });
  } catch (e) { /* storage unavailable: start empty */ }
  const save = () => { try { localStorage.setItem('kids-market-demo', JSON.stringify([...reserved])); } catch (e) { /* ignore */ } };

  const chip = (list, key, el) => {
    el.innerHTML = list.map(([v, label]) => `<button type="button" data-v="${v}" aria-pressed="${state[key] === v}">${label}</button>`).join('');
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      state[key] = b.dataset.v;
      $$('button', el).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      renderGrid();
    });
  };
  chip(CATS, 'cat', $('#cats'));
  chip(AGES, 'age', $('#agechips'));

  const gridEl = $('#grid');
  const countEl = $('#count');
  const emptyEl = $('#empty');
  const norm = (s) => s.toLowerCase().replace(/[’ʼ']/g, '');
  const matches = (p) => {
    if (state.cat !== 'all' && p.cat !== state.cat) return false;
    if (state.age !== 'all') {
      const [, , lo, hi] = AGES.find((a) => a[0] === state.age);
      if (p.min > hi || p.max < lo) return false;
    }
    if (state.q) {
      const words = norm(state.q).split(/\s+/).filter(Boolean);
      const hay = norm(p.name + ' ' + p.tags + ' ' + CATS.find((c) => c[0] === p.cat)[1]);
      if (!words.every((w) => hay.includes(w.slice(0, Math.max(3, w.length - 2))))) return false;
    }
    return true;
  };
  const btnHtml = (on) => on ? `${icon('i-check')}Відкладено` : `${icon('i-bag')}Відкласти`;
  const renderGrid = () => {
    const list = P.filter(matches);
    gridEl.innerHTML = list.map((p) => {
      const on = reserved.has(p.id);
      return `<li class="card"><div class="card__pic ${p.tint}">${icon(p.pic)}</div><div class="card__body"><h3>${p.name}</h3><span class="card__age">${p.ageLabel}</span><span class="card__price">${fmt(p.price)}</span><button class="card__btn" type="button" data-id="${p.id}" aria-pressed="${on}" aria-label="${on ? 'Прибрати з відкладених' : 'Відкласти'}: ${p.name}">${btnHtml(on)}</button></div></li>`;
    }).join('');
    countEl.textContent = list.length ? `${list.length} ${plural(list.length, 'товар', 'товари', 'товарів')}` : '';
    emptyEl.hidden = list.length > 0;
    if (!list.length) $('#empty-t').textContent = state.q
      ? `За запитом «${state.q}» нічого не знайшли. Спробуйте іншу назву або подзвоніть: можливо, товар уже на полиці.`
      : 'У цій категорії для такого віку товарів поки немає. Спробуйте інший вік.';
  };
  gridEl.addEventListener('click', (e) => {
    const b = e.target.closest('.card__btn'); if (!b) return;
    const id = b.dataset.id, p = byId[id];
    if (reserved.has(id)) { reserved.delete(id); toast('Прибрано зі списку'); }
    else { reserved.set(id, 1); toast('Відкладено'); }
    const on = reserved.has(id);
    b.setAttribute('aria-pressed', String(on));
    b.setAttribute('aria-label', `${on ? 'Прибрати з відкладених' : 'Відкласти'}: ${p.name}`);
    b.innerHTML = btnHtml(on);
    save(); renderBar();
  });
  let qT;
  $('#q').addEventListener('input', (e) => { clearTimeout(qT); qT = setTimeout(() => { state.q = e.target.value.trim(); renderGrid(); }, 120); });
  $('#reset').addEventListener('click', () => {
    state.cat = 'all'; state.age = 'all'; state.q = ''; $('#q').value = '';
    $$('#cats button, #agechips button').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.v === 'all')));
    renderGrid();
  });

  /* ---------- reservation bar + sheet ---------- */
  const rbar = $('#rbar');
  const totals = () => {
    let n = 0, sum = 0;
    reserved.forEach((q, id) => { n += q; sum += q * byId[id].price; });
    return { n, sum };
  };
  function renderBar() {
    const { n, sum } = totals();
    const show = n > 0 && root.dataset.mode === 'catalog';
    rbar.classList.toggle('is-on', show);
    rbar.inert = !show;
    $('#rbar-t').innerHTML = `<b>${fmt(sum)}</b>${n} ${plural(n, 'товар відкладено', 'товари відкладено', 'товарів відкладено')}`;
  }
  const sheet = $('#sheet');
  const renderSheet = () => {
    const rows = [...reserved].map(([id, q]) => {
      const p = byId[id];
      return `<li><span class="pic ${p.tint}">${icon(p.pic)}</span><div><b>${p.name}</b><small>${fmt(p.price)} за шт.</small></div><div class="qty"><button type="button" data-d="-1" data-id="${id}" aria-label="Менше: ${p.name}">${icon('i-minus')}</button><output aria-label="Кількість">${q}</output><button type="button" data-d="1" data-id="${id}" aria-label="Більше: ${p.name}">${icon('i-plus')}</button></div></li>`;
    });
    $('#rlist').innerHTML = rows.join('');
    $('#rtotal').textContent = fmt(totals().sum);
  };
  $('#rlist').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-d]'); if (!b) return;
    const id = b.dataset.id, q = (reserved.get(id) || 0) + Number(b.dataset.d);
    if (q <= 0) reserved.delete(id); else reserved.set(id, Math.min(q, 20));
    save(); renderSheet(); renderBar(); renderGrid();
    if (!reserved.size) { sheet.close(); toast('Список порожній'); }
  });
  $('#rbar-open').addEventListener('click', () => { renderSheet(); sheet.showModal(); });
  $('#sheet-x').addEventListener('click', () => sheet.close());
  sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });

  $('#send').addEventListener('click', async () => {
    const lines = [...reserved].map(([id, q], i) => `${i + 1}. ${byId[id].name}, ${q} шт. × ${fmt(byId[id].price)}`);
    const text = `Добрий день! Хочу відкласти в KIDS Market:\n${lines.join('\n')}\nРазом: ${fmt(totals().sum)}\nЗаберу протягом 2 днів.`;
    let copied = false;
    try { await navigator.clipboard.writeText(text); copied = true; } catch (e) { /* clipboard blocked */ }
    toast(copied ? 'Список скопійовано. Відкриваємо Viber…' : 'Відкриваємо Viber…');
    setTimeout(() => {
      location.href = 'viber://chat?number=' + encodeURIComponent(PHONE) + '&draft=' + encodeURIComponent(text);
    }, 600);
  });

  /* ---------- start ---------- */
  renderGrid();
  setMode(new URLSearchParams(location.search).get('v') === 'catalog' ? 'catalog' : 'card', false);
})();
