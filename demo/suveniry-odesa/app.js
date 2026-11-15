(() => {
  const VIBER = 'viber://chat?number=%2B380669077267';
  const TG = 'https://t.me/+380669077267';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s) => document.querySelector(s);

  const toastEl = $('#toast'); let toastT;
  const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 3800); };
  async function order(text, via) {
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch (e) {}
    toast(ok ? 'Текст скопійовано. Вставте його в чат і надішліть.' : 'Відкриваємо чат з магазином…');
    setTimeout(() => { if (via === 'telegram') window.open(TG, '_blank', 'noopener'); else location.href = VIBER; }, 450);
  }
  document.addEventListener('click', (e) => { const a = e.target.closest('[data-order]'); if (!a) return; e.preventDefault(); order(a.dataset.order, a.dataset.via); });

  try {
    const h = +new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Kyiv', hour: 'numeric', hour12: false }).formatToParts(new Date()).find((p) => p.type === 'hour').value;
    $('#status').textContent = (h >= 10 && h < 22) ? 'Зараз відчинено, до 22:00' : 'Зачинено, відчинимо о 10:00';
  } catch (e) {}

  /* phrase sticker */
  const PHRASES = [
    ['Одеса не просто місто.', 'Це настрій.'],
    ['Море є.', 'Решта буде.'],
    ['Шо ви хочете?', 'Тут Одеса!'],
    ['Ой, я вас', 'благаю!'],
    ['Тримай', 'фасон.'],
    ['Будете в Одесі,', 'заходьте.'],
    ['Одеса.', 'Можна без пояснень.']
  ];
  let pi = 0;
  const card = $('#phraseCard'), text = $('#phraseText'), ord = $('#phraseOrder');
  $('#phraseNext').addEventListener('click', () => {
    pi = (pi + 1) % PHRASES.length;
    const [a, b] = PHRASES[pi];
    const apply = () => { text.innerHTML = `${a} <em>${b}</em>`; ord.dataset.order = `Добрий день! Хочу футболку з фразою «${a} ${b}» Які є розміри?`; };
    if (reduce || !card.animate) return apply();
    const tilt = pi % 2 ? 3 : -3;
    card.animate([{ transform: 'none', opacity: 1 }, { transform: `rotate(${-tilt * 2}deg) scale(0.94)`, opacity: 0 }], { duration: 160, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
      apply();
      card.style.rotate = `${tilt}deg`;
      card.animate([{ transform: `rotate(${tilt * 2}deg) scale(1.04)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' });
    };
  });

  /* catalog filter */
  const chips = document.querySelectorAll('.chip');
  const tiles = [...document.querySelectorAll('.tile')];
  chips.forEach((c) => c.addEventListener('click', () => {
    chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
    const f = c.dataset.filter; let n = 0;
    tiles.forEach((t) => {
      const show = f === 'all' || t.dataset.cat === f;
      t.hidden = !show;
      t.classList.remove('is-in');
      if (show && !reduce) { void t.offsetWidth; t.style.setProperty('--n', n++); t.classList.add('is-in'); }
    });
  }));
})();
