(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const can3d = CSS.supports('transform-style', 'preserve-3d');
  if (!reduce) doc.classList.add('motion');
  if (!reduce && can3d) doc.classList.add('d3');
  const isSmall = () => innerWidth < 640;
  const VIBER = 'viber://chat?number=%2B380669077267';
  const TG = 'https://t.me/+380669077267';
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);

  /* ---------- toast + order ---------- */
  const toastEl = $('#toast'); let toastT;
  const toast = (msg) => { toastEl.textContent = msg; toastEl.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 3800); };
  async function order(text, via) {
    let copied = false;
    try { await navigator.clipboard.writeText(text); copied = true; } catch (e) {}
    toast(copied ? 'Текст скопійовано. Вставте його в чат і надішліть.' : 'Відкриваємо чат з магазином…');
    setTimeout(() => {
      if (via === 'telegram') window.open(TG, '_blank', 'noopener');
      else location.href = VIBER;
    }, 450);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-order]');
    if (!a) return;
    e.preventDefault();
    order(a.dataset.order, a.dataset.via);
  });

  /* ---------- open status (Kyiv time) ---------- */
  try {
    const parts = new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Kyiv', hour: 'numeric', hour12: false }).formatToParts(new Date());
    const h = +parts.find((p) => p.type === 'hour').value;
    $('#status').innerHTML = (h >= 10 && h < 22) ? 'Зараз відчинено, до <b>22:00</b>' : 'Зачинено, відчинимо о <b>10:00</b>';
  } catch (e) {}

  /* ---------- nav ---------- */
  const nav = $('#nav');

  /* ---------- data ---------- */
  const SHELVES = [
    ['Футболки з одеськими фразами', 'Фрази, які звучать тільки тут. Носіть Одесу на собі.'],
    ['Шопери', 'Стильні шопери з одеськими принтами на кожен день.'],
    ['Кепки й мерч', 'Кепки та тематичний мерч для прогулянок біля моря.'],
    ['Магніти', 'Класичні й авторські магніти із символами міста.'],
    ['Тарілки з видами Одеси', 'Оперний театр, маяк і сходи на сувенірних тарілках.'],
    ['Картини', 'Море, одеські дворики й маяк, щоб повісити вдома.'],
    ['Фігурки й статуетки', 'Тематичні статуетки й декор з упізнаваними символами міста.'],
    ['Пивні кухлі й посуд', 'Тематичний посуд, з якого приємно пити чай і не тільки.'],
    ['Іграшки', 'Іграшки з морською тематикою для малечі й дорослих.'],
    ['Подарункові набори', 'Готові подарунки для друзів і колег, без зайвих пошуків.']
  ];
  const ITEMS = [
    { id: 'tee', name: 'Футболка з одеською фразою', text: 'Одеса говорить фразами, ми друкуємо їх на футболках. Оберіть свою в магазині або попросіть фото у Viber.' },
    { id: 'bag', name: 'Шопер «Море є»', text: 'Стильний шопер з одеським принтом: на пляж, на Привоз і просто так.' },
    { id: 'plate', name: 'Тарілка з видами Одеси', text: 'Сувенірна тарілка, яку не шкода повісити на стіну. Різні види міста.' },
    { id: 'mug', name: 'Кухоль у тільняшці', text: 'Пивні кухлі й тематичний посуд: подарунок, яким справді користуються.' },
    { id: 'magnet', name: 'Магніт «Одеса»', text: 'Класика й авторські магніти: найпростіший спосіб привезти море на холодильник.' },
    { id: 'art', name: 'Картина з морем', text: 'Картини з видами Одеси: море, маяк, дворики. Для дому й у подарунок.' },
    { id: 'gift', name: 'Подарунковий набір', text: 'Готовий набір сувенірів для друзів і колег. Підберемо під ваш бюджет.' }
  ];
  const lc = (t) => t.charAt(0).toLowerCase() + t.slice(1);
  const ask = (what) => `Добрий день! Цікавить: ${what}. Що є в наявності?`;

  /* shelves list (also the no-3D fallback) */
  const sl = $('#shelvesList');
  SHELVES.forEach(([t, p], i) => {
    const li = el('li');
    li.innerHTML = `<span class="n">${String(i + 1).padStart(2, '0')}</span><b>${t}</b><a href="${VIBER}" data-order="${ask(lc(t))}">Запитати у Viber</a>`;
    sl.append(li);
  });
  /* ring list (no-3D fallback) */
  const rl = $('#ringList');
  ITEMS.forEach((it) => { const li = el('li'); li.innerHTML = `<h3>${it.name}</h3><p>${it.text}</p><a class="btn btn--primary btn--small" href="${VIBER}" data-order="${ask(lc(it.name))}">Замовити у Viber</a>`; rl.append(li); });

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-seen'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12%' });
  document.querySelectorAll('[data-reveal]').forEach((n) => io.observe(n));

  /* ============================================================
     THE SEA — WebGL fragment shader (golden hour → night)
     ============================================================ */
  const canvas = $('#sea');
  const sea = { ok: false };
  (function initSea() {
    let gl;
    try { gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power', preserveDrawingBuffer: false }); } catch (e) {}
    if (!gl) return;
    const vs = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }';
    const fs = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes; uniform float uTime; uniform float uDusk; uniform float uCamH; uniform float uCamZ; uniform float uPitch; uniform vec2 uLook; uniform vec3 uSun; uniform vec3 uLH; uniform vec3 uMoon;

float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }

vec3 waves(vec2 p, float t){
  float h = 0.0; vec2 g = vec2(0.0); vec2 d; float k; float a; float ph;
  d = normalize(vec2(1.0, 0.25));  k = 0.62; a = 0.32;  ph = dot(d,p)*k + t*0.95; h += a*sin(ph); g += a*k*cos(ph)*d;
  d = normalize(vec2(0.6, 0.8));   k = 1.10; a = 0.17;  ph = dot(d,p)*k + t*1.35; h += a*sin(ph); g += a*k*cos(ph)*d;
  d = normalize(vec2(-0.4, 1.0));  k = 2.05; a = 0.085; ph = dot(d,p)*k + t*1.90; h += a*sin(ph); g += a*k*cos(ph)*d;
  d = normalize(vec2(0.9, -0.45)); k = 3.40; a = 0.045; ph = dot(d,p)*k + t*2.50; h += a*sin(ph); g += a*k*cos(ph)*d;
  d = normalize(vec2(-0.85, 0.35));k = 5.60; a = 0.024; ph = dot(d,p)*k + t*3.20; h += a*sin(ph); g += a*k*cos(ph)*d;
  d = normalize(vec2(0.15, -1.0)); k = 9.10; a = 0.013; ph = dot(d,p)*k + t*4.10; h += a*sin(ph); g += a*k*cos(ph)*d;
  return vec3(h, g);
}

vec3 sky(vec3 rd, float dusk){
  float y = clamp(rd.y, 0.0, 1.0);
  vec3 zen = mix(vec3(0.19, 0.31, 0.52), vec3(0.010, 0.018, 0.050), smoothstep(0.15, 0.85, dusk));
  vec3 hor = mix(vec3(1.00, 0.62, 0.38), vec3(0.66, 0.27, 0.30), smoothstep(0.05, 0.5, dusk));
  hor = mix(hor, vec3(0.045, 0.06, 0.13), smoothstep(0.45, 1.0, dusk));
  vec3 col = mix(hor, zen, pow(y, 0.48));
  float s = max(dot(rd, uSun), 0.0);
  vec3 gc = mix(vec3(1.0, 0.6, 0.3), vec3(0.95, 0.3, 0.22), dusk);
  col += gc * (0.32 * pow(s, 5.0) + 0.55 * pow(s, 42.0)) * (1.0 - smoothstep(0.55, 0.95, dusk));
  col += vec3(1.0, 0.93, 0.78) * smoothstep(0.99950, 0.99972, s) * (1.0 - smoothstep(0.3, 0.55, dusk));
  vec2 sp = rd.xz / max(rd.y + 0.08, 0.05) * 42.0;
  vec2 cell = floor(sp); vec2 f = fract(sp) - 0.5;
  float st = hash12(cell);
  float star = step(0.985, st) * smoothstep(0.16, 0.0, length(f)) * smoothstep(0.03, 0.22, rd.y);
  col += vec3(0.88, 0.92, 1.0) * star * smoothstep(0.55, 0.95, dusk) * (0.65 + 0.35 * sin(uTime * 1.7 + st * 90.0));
  float night = smoothstep(0.5, 0.85, dusk);
  float m = max(dot(rd, uMoon), 0.0);
  col += vec3(0.92, 0.94, 1.0) * smoothstep(0.99975, 0.99984, m) * night * 1.4;
  col += vec3(0.45, 0.55, 0.8) * (pow(m, 60.0) * 0.12 + pow(m, 600.0) * 0.35) * night;
  return col;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, uCamH, uCamZ);
  float yaw = uLook.x * 0.06;
  float pitch = uPitch + uLook.y * 0.03;
  vec3 fwd = normalize(vec3(sin(yaw), sin(pitch), -cos(yaw)));
  vec3 rgt = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(rgt, fwd);
  vec3 rd = normalize(fwd * 1.55 + uv.x * rgt + uv.y * up);
  float dusk = uDusk;
  float lamp = 0.35 + 0.65 * smoothstep(0.2, 0.6, dusk);

  float tHit = 1e5; vec3 col = vec3(0.0); int what = 0; vec3 nrm = vec3(0.0, 1.0, 0.0);
  /* lighthouse tower */
  vec2 oc = ro.xz - uLH.xz;
  float a = dot(rd.xz, rd.xz); float b = dot(oc, rd.xz);
  for (int i = 0; i < 2; i++) {
    float r = i == 0 ? 1.15 : 0.82;
    float y0 = i == 0 ? 0.9 : 13.6;
    float y1 = i == 0 ? 13.6 : 15.3;
    float c = dot(oc, oc) - r * r; float disc = b * b - a * c;
    if (disc > 0.0) {
      float t = (-b - sqrt(disc)) / a;
      float yy = ro.y + rd.y * t;
      if (t > 0.0 && t < tHit && yy > y0 && yy < y1) { tHit = t; what = i == 0 ? 1 : 2; vec3 p = ro + rd * t; nrm = normalize(vec3(p.x - uLH.x, 0.0, p.z - uLH.z)); }
    }
  }
  /* cap + breakwater (boxes) */
  for (int i = 0; i < 2; i++) {
    vec3 bmin = i == 0 ? vec3(uLH.x - 1.05, 15.3, uLH.z - 1.05) : vec3(uLH.x - 70.0, 0.0, uLH.z - 2.4);
    vec3 bmax = i == 0 ? vec3(uLH.x + 1.05, 15.9, uLH.z + 1.05) : vec3(uLH.x + 2.4, 0.95, uLH.z + 2.4);
    vec3 inv = 1.0 / rd;
    vec3 t0 = (bmin - ro) * inv; vec3 t1 = (bmax - ro) * inv;
    vec3 tmin = min(t0, t1); vec3 tmax = max(t0, t1);
    float tn = max(max(tmin.x, tmin.y), tmin.z); float tf = min(min(tmax.x, tmax.y), tmax.z);
    if (tn < tf && tn > 0.0 && tn < tHit) { tHit = tn; what = 3 + i; nrm = tn == tmin.y ? vec3(0.0, sign(-rd.y), 0.0) : (tn == tmin.x ? vec3(-sign(rd.x), 0.0, 0.0) : vec3(0.0, 0.0, -sign(rd.z))); }
  }
  /* water */
  float tw = rd.y < 0.0 ? -ro.y / rd.y : 1e5;
  vec3 Lp = vec3(uLH.x, 14.5, uLH.z);
  if (tw < tHit && rd.y < 0.0) {
    vec3 p = ro + rd * tw;
    vec3 w = waves(p.xz, uTime);
    float fade = exp(-tw * 0.018);
    vec3 n = normalize(vec3(-w.y * fade, 1.0, -w.z * fade));
    vec3 rf = reflect(rd, n); rf.y = abs(rf.y);
    float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, -rd), 0.0), 5.0);
    vec3 deep = mix(vec3(0.02, 0.10, 0.15), vec3(0.004, 0.018, 0.035), dusk);
    col = mix(deep, sky(rf, dusk), fres);
    col += vec3(0.04, 0.10, 0.10) * max(w.x, 0.0) * (1.0 - dusk) * 0.8;
    float sp = pow(max(dot(rf, uSun), 0.0), 260.0);
    col += vec3(1.0, 0.78, 0.5) * sp * 3.2 * (1.0 - smoothstep(0.3, 0.7, dusk));
    vec3 toL = normalize(Lp - p);
    col += vec3(1.0, 0.8, 0.45) * pow(max(dot(rf, toL), 0.0), 90.0) * 2.4 * lamp;
    col += vec3(0.75, 0.82, 1.0) * pow(max(dot(rf, uMoon), 0.0), 110.0) * 2.2 * smoothstep(0.5, 0.85, dusk);
    col = mix(col, sky(normalize(vec3(rd.x, 0.002, rd.z)), dusk), 1.0 - exp(-tw * 0.0055));
  } else if (what > 0) {
    vec3 p = ro + rd * tHit;
    vec3 base = what == 1 ? vec3(0.93, 0.91, 0.86) : (what == 2 ? vec3(1.0, 0.86, 0.55) : (what == 3 ? vec3(0.18, 0.16, 0.15) : vec3(0.42, 0.38, 0.33)));
    float dif = max(dot(nrm, normalize(uSun + vec3(0.0, 0.25, 0.0))), 0.0) * (1.0 - smoothstep(0.2, 0.7, dusk));
    vec3 amb = mix(vec3(0.55, 0.42, 0.38), vec3(0.06, 0.08, 0.14), smoothstep(0.1, 0.9, dusk));
    col = base * (amb + dif * vec3(1.0, 0.78, 0.55));
    if (what == 1) col *= 1.0 - 0.55 * step(12.9, p.y);
    if (what == 2) col = mix(col, vec3(1.0, 0.86, 0.55) * 2.2, lamp);
    col = mix(col, sky(normalize(vec3(rd.x, 0.002, rd.z)), dusk), 1.0 - exp(-tHit * 0.0055));
  } else {
    col = sky(rd, dusk);
  }

  /* lantern glow */
  vec3 toLp = Lp - ro; float tl = dot(toLp, rd);
  if (tl > 0.0) {
    float d = length(ro + rd * tl - Lp) / tl;
    col += vec3(1.0, 0.82, 0.5) * (0.00045 / (d * d + 0.00012)) * lamp * 0.35;
  }
  /* rotating beam */
  float ang = uTime * 0.55;
  vec3 bd = normalize(vec3(cos(ang), -0.015, sin(ang)));
  vec3 w0 = ro - Lp; float bb = dot(rd, bd); float dd = dot(rd, w0); float ee = dot(bd, w0);
  float den = max(1.0 - bb * bb, 1e-4);
  float tr = (bb * ee - dd) / den; float sb = (ee - bb * dd) / den;
  if (tr > 0.0 && sb > 0.0 && tr < min(tw, tHit) + 2.0) {
    float dist = length(w0 + rd * tr - bd * sb);
    float wid = 0.35 + sb * 0.075;
    col += vec3(1.0, 0.85, 0.55) * exp(-dist * dist / (wid * wid)) * exp(-sb * 0.010) * 0.32 * smoothstep(0.25, 0.75, dusk);
  }
  /* grade */
  col = col / (1.0 + col * 0.35);
  col = pow(col, vec3(0.92));
  vec2 q = gl_FragCoord.xy / uRes;
  col *= 0.78 + 0.22 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.18);
  gl_FragColor = vec4(col, 1.0);
}`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; };
    const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return;
    const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {}; ['uRes', 'uTime', 'uDusk', 'uCamH', 'uCamZ', 'uPitch', 'uLook', 'uSun', 'uLH', 'uMoon'].forEach((n) => U[n] = gl.getUniformLocation(pr, n));
    sea.ok = true; sea.gl = gl; sea.U = U; sea.q = isSmall() ? 0.5 : 0.62;
    doc.classList.add('webgl');
  })();

  let lastW = 0, lastH = 0;
  function sizeSea(force) {
    if (!sea.ok) return;
    const w = innerWidth, h = Math.max(innerHeight, document.documentElement.clientHeight);
    if (!force && w === lastW && Math.abs(h - lastH) < 120) return;
    lastW = w; lastH = h;
    const q = sea.q;
    canvas.width = Math.max(2, Math.round(Math.min(w * q, 1100)));
    canvas.height = Math.max(2, Math.round(canvas.width * h / w));
    sea.gl.viewport(0, 0, canvas.width, canvas.height);
  }
  sizeSea(true);
  addEventListener('resize', () => sizeSea(false));

  const look = { x: 0, y: 0, tx: 0, ty: 0 };
  if (matchMedia('(pointer: fine)').matches && !reduce) {
    addEventListener('pointermove', (e) => { look.tx = (e.clientX / innerWidth - 0.5) * 2; look.ty = -(e.clientY / innerHeight - 0.5) * 2; }, { passive: true });
  }

  function drawSea(t, P) {
    if (!sea.ok) return;
    const gl = sea.gl, U = sea.U;
    const aspect = canvas.width / canvas.height;
    const dusk = 0.1 + 0.86 * smooth(clamp(P, 0, 1));
    const camH = lerp(24, 2.6, Math.pow(P, 0.85));
    const camZ = -46 * smooth(P);
    const pitch = lerp(-0.075, -0.012, P);
    const lz = -82, lx = (82 + camZ) * 0.18 * Math.min(aspect, 1.8) + 1.2;
    const elev = lerp(0.075, -0.07, smooth(clamp(P * 1.4, 0, 1)));
    const sx = -0.21 * Math.min(aspect, 1.4);
    const sl = Math.hypot(sx, elev, 1);
    look.x += (look.tx - look.x) * 0.05; look.y += (look.ty - look.y) * 0.05;
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uTime, t);
    gl.uniform1f(U.uDusk, dusk);
    gl.uniform1f(U.uCamH, camH);
    gl.uniform1f(U.uCamZ, camZ);
    gl.uniform1f(U.uPitch, pitch);
    gl.uniform2f(U.uLook, look.x, look.y);
    gl.uniform3f(U.uSun, sx / sl, elev / sl, -1 / sl);
    gl.uniform3f(U.uLH, lx, 0, lz);
    const mx = -0.11 * Math.min(aspect, 1.4), my = 0.2, ml = Math.hypot(mx, my, 1);
    gl.uniform3f(U.uMoon, mx / ml, my / ml, -1 / ml);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  /* ============================================================
     THE STAIRS — CSS 3D, ten flights, scroll-driven camera
     ============================================================ */
  const stairs = { ok: false };
  if (doc.classList.contains('d3')) (function buildStairs() {
    const world = $('#world');
    const N = 6, D = 62, H = 31, L = 250, HW = 46;
    const flights = [], stops = [];
    const add = (parent, cls, w, h, tf, html) => { const d = el('div', 'st ' + cls, html); d.style.width = w + 'px'; d.style.height = h + 'px'; d.style.transform = tf; parent.append(d); return d; };
    const floor = (g, cls, W, len, y, zFar, html) => add(g, cls, W, len, `translate3d(${-W / 2}px, ${y}px, ${zFar}px) rotateX(90deg)`, html);
    let z = 0, y = 0;
    const top = el('div', 'flight'); world.append(top);
    floor(top, 'st-top', 760, 300, 0, 0, '<span class="st-paint st-paint--place">Приморський бульвар</span>');
    flights.push({ g: top, zc: 150 });
    for (let f = 0; f < 10; f++) {
      const W = 470 + f * 30;
      const g = el('div', 'flight'); world.append(g);
      const z0 = z, y0 = y;
      for (let r = 0; r < N; r++) {
        add(g, 'st-riser', W, H, `translate3d(${W / 2}px, ${y}px, ${z}px) rotateY(180deg)`);
        y += H;
        if (r < N - 1) { floor(g, 'st-tread', W, D, y, z - D); z -= D; }
      }
      const run = z0 - z, rise = y - y0, alpha = Math.atan2(rise, run) * 180 / Math.PI;
      add(g, 'st-wall', run, HW + 70, `translate3d(${-W / 2}px, ${y0 - HW}px, ${z0}px) rotateY(90deg) skewY(${alpha}deg)`);
      add(g, 'st-wall', run, HW + 70, `translate3d(${W / 2}px, ${y - HW}px, ${z}px) rotateY(-90deg) skewY(${-alpha}deg)`);
      const name = SHELVES[f][0];
      floor(g, 'st-landing', W, L, y, z - L, `<span class="st-paint st-paint--n">${String(f + 1).padStart(2, '0')}</span><span class="st-paint st-paint--t">${name}</span>`);
      add(g, 'st-wall', L, HW + 70, `translate3d(${-W / 2}px, ${y - HW}px, ${z}px) rotateY(90deg)`);
      add(g, 'st-wall', L, HW + 70, `translate3d(${W / 2}px, ${y - HW}px, ${z - L}px) rotateY(-90deg)`);
      for (const sx of [-1, 1]) {
        const px = sx * (W / 2 + 4);
        add(g, 'st-pole', 7, 190, `translate3d(${px - 3.5}px, ${y - 190}px, ${z - L / 2}px)`);
        add(g, 'st-lamp', 64, 64, `translate3d(${px - 32}px, ${y - 222}px, ${z - L / 2}px)`);
      }
      stops.push({ y, z: z - L / 2 });
      flights.push({ g, zc: (z0 + z - L) / 2 });
      z -= L;
    }
    const bottom = el('div', 'flight'); world.append(bottom);
    floor(bottom, 'st-bottom', 980, 820, y, z - 820, '<span class="st-paint st-paint--place">Далі тільки море</span>');
    flights.push({ g: bottom, zc: z - 410 });
    stops.unshift({ y: 0, z: 30 });
    stops.push({ y, z: z - 300 });
    Object.assign(stairs, { ok: true, world, flights, stops, track: $('#stairsTrack'), last: -1, fogs: [] });
  })();

  const shelf = $('#shelf'), shelfN = $('#shelfN'), shelfT = $('#shelfT'), shelfP = $('#shelfP'), shelfBtn = $('#shelfBtn'), flightNo = $('#flightNo'), rail = $('#rail'), turnNote = $('#turnNote');
  let shelfIdx = -1, swapT;
  function setShelf(i) {
    if (i === shelfIdx) return;
    const first = shelfIdx < 0;
    shelfIdx = i;
    if (i < 0) { shelf.classList.add('is-gone'); shelfBtn.tabIndex = -1; return; }
    const apply = () => {
      shelfN.textContent = String(i + 1).padStart(2, '0');
      shelfT.textContent = SHELVES[i][0];
      shelfP.textContent = SHELVES[i][1];
      shelfBtn.dataset.order = ask(lc(SHELVES[i][0]));
      shelf.classList.remove('is-swap', 'is-gone');
      shelfBtn.tabIndex = 0;
    };
    clearTimeout(swapT);
    if (first || shelf.classList.contains('is-gone')) apply();
    else { shelf.classList.add('is-swap'); swapT = setTimeout(apply, 200); }
  }
  const P = () => scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const dwell = (x) => x < 0.3 ? 0 : x > 0.78 ? 1 : smooth((x - 0.3) / 0.48);

  function updateStairs() {
    if (!stairs.ok) return;
    const r = stairs.track.getBoundingClientRect();
    const total = r.height - innerHeight;
    const p = clamp(-r.top / total, 0, 1);
    if (r.bottom < -50 || r.top > innerHeight + 50) return;
    const S = stairs.stops;
    const walk = clamp(p / 0.86, 0, 1) * (S.length - 1);
    const i = Math.min(Math.floor(walk), S.length - 2);
    const t = dwell(walk - i);
    const fy = lerp(S[i].y, S[i + 1].y, t), fz = lerp(S[i].z, S[i + 1].z, t);
    const turn = smooth(clamp((p - 0.88) / 0.1, 0, 1));
    const small = isSmall();
    const pitch = lerp(small ? -37 : -33, 21, turn);
    const yaw = 180 * turn;
    const k = small ? 0.72 : 1;
    const ffy = fy + lerp(0, -300, turn), ffz = fz + lerp(0, 1050, turn);
    stairs.world.style.transform = `scale(${k}) rotateX(${pitch}deg) rotateY(${yaw}deg) translate3d(0px, ${-ffy}px, ${-ffz}px)`;
    const hz = Math.round(clamp(1 - P() * 1.35, 0, 1) * 20) * 5;
    if (hz !== stairs.hz) { stairs.hz = hz; stairs.world.style.setProperty('--haze', `color-mix(in oklch, var(--color-sky-2) ${hz}%, var(--color-paper))`); }
    const dir = Math.cos(yaw * Math.PI / 180);
    stairs.flights.forEach((fl, n) => {
      const ahead = (ffz - fl.zc) * dir;
      const off = ahead < -1100 || ahead > 3300;
      fl.g.classList.toggle('is-off', off);
      const fog = clamp((ahead - 500) / 2600, 0, 0.9);
      if (Math.abs((stairs.fogs[n] || 0) - fog) > 0.015) { fl.g.style.setProperty('--fog', fog.toFixed(3)); stairs.fogs[n] = fog; }
    });
    const pos = i + t;
    const near = Math.round(pos) - 1;
    const onLanding = near >= 0 && near < 10 && Math.abs(pos - Math.round(pos)) < 0.22 && turn < 0.15;
    if (turn > 0.15 || pos < 0.6) setShelf(-1);
    else if (onLanding) setShelf(near);
    flightNo.textContent = String(clamp(Math.round(pos), 1, 10)).padStart(2, '0');
    rail.style.setProperty('--p', p.toFixed(3));
    turnNote.classList.toggle('is-on', turn > 0.7);
  }

  /* ============================================================
     THE SHOWCASE — a turntable of 3D souvenirs
     ============================================================ */
  const ring = { ok: false };
  function face(cls, w, h, tf, html) { const f = el('div', 'face ' + cls, html); f.style.width = w + 'px'; f.style.height = h + 'px'; f.style.marginLeft = -w / 2 + 'px'; f.style.marginTop = -h / 2 + 'px'; f.style.transform = tf; return f; }
  function box(w, h, d, cls, faces = {}, tf = '') {
    const g = el('div', 'g3'); if (tf) g.style.transform = tf;
    g.append(
      face(cls + ' f-front', w, h, `translateZ(${d / 2}px)`, faces.front),
      face(cls + ' f-back', w, h, `rotateY(180deg) translateZ(${d / 2}px)`, faces.back),
      face(cls + ' f-right', d, h, `rotateY(90deg) translateZ(${w / 2}px)`),
      face(cls + ' f-left', d, h, `rotateY(-90deg) translateZ(${w / 2}px)`),
      face(cls + ' f-top', w, d, `rotateX(90deg) translateZ(${h / 2}px)`),
      face(cls + ' f-bottom', w, d, `rotateX(-90deg) translateZ(${h / 2}px)`));
    return g;
  }
  const MAKERS = {
    tee() { const g = el('div', 'g3'); g.append(face('tee tee-mid', 214, 236, 'translateZ(0px)'), face('tee', 214, 236, 'translateZ(3px)', '<span>Тримай<br>фасон</span>'), face('tee tee-back', 214, 236, 'rotateY(180deg) translateZ(3px)', '<span>Дерибасівська, 16</span>')); return g; },
    bag() { const g = el('div', 'g3'); g.append(box(178, 196, 26, 'canvas', { front: '<span>Море є.<br>Решта<br>буде.</span>', back: '<span>Одеса</span>' }, 'translateY(20px)'), face('handle', 92, 84, 'translateY(-108px) translateZ(12px)'), face('handle', 92, 84, 'translateY(-108px) translateZ(-12px)')); return g; },
    plate() { const g = el('div', 'g3'); g.append(face('plate-mid', 206, 206, 'translateZ(0px)'), face('plate-front', 212, 212, 'translateZ(4px)', '<span>Одеса<small>Оперний театр</small></span>'), face('plate-back', 212, 212, 'rotateY(180deg) translateZ(4px)', '<span>Зроблено в Одесі</span>')); return g; },
    mug() {
      const g = el('div', 'g3'); const n = 20, r = 58, h = 128, w = 2 * r * Math.tan(Math.PI / n) + 1.2;
      for (let i = 0; i < n; i++) g.append(face('mug-side', w, h, `rotateY(${i * 360 / n}deg) translateZ(${r}px)`));
      g.append(face('mug-top', 2 * r, 2 * r, `rotateX(90deg) translateZ(${h / 2}px)`), face('mug-bottom', 2 * r, 2 * r, `rotateX(-90deg) translateZ(${h / 2}px)`), face('mug-handle', 64, 92, `translateX(${r + 18}px)`));
      return g;
    },
    magnet() { return box(170, 124, 14, 'magnet', { front: '<span>Одеса</span>' }); },
    art() { return box(228, 172, 16, 'frame', { front: '<div class="paint"></div>' }); },
    gift() { const g = el('div', 'g3'); g.append(box(172, 118, 120, 'gift', {}, 'translateY(18px)'), box(182, 26, 130, 'lid', {}, 'translateY(-52px)'), face('bow', 46, 34, 'translateY(-80px) translateX(-22px) rotateZ(-24deg)'), face('bow', 46, 34, 'translateY(-80px) translateX(22px) rotateZ(24deg)')); return g; }
  };
  const showName = $('#showName'), showText = $('#showText'), showBtn = $('#showBtn'), showSwap = $('#showSwap');
  if (doc.classList.contains('d3')) (function buildRing() {
    const R = isSmall() ? 215 : 400;
    const root = $('#ring'); const n = ITEMS.length; const step = 360 / n;
    ITEMS.forEach((it, i) => {
      const item = el('div', 'ring__item');
      item.style.transform = `rotateY(${i * step}deg) translateZ(${R}px)` + (isSmall() ? ' scale(0.66)' : '');
      const obj = el('div', 'obj'); obj.style.animationDelay = `${-i * 1.7}s`;
      obj.append(MAKERS[it.id]());
      item.append(el('div', 'ring__floor'), obj);
      root.append(item);
    });
    Object.assign(ring, { ok: true, root, n, step, R, angle: 0, target: 0, vel: 0, drag: null, idx: -1 });
    setActive(0, true);
  })();

  function setActive(i, now) {
    if (i === ring.idx) return;
    ring.idx = i;
    const apply = () => { const it = ITEMS[i]; showName.textContent = it.name; showText.textContent = it.text; showBtn.dataset.order = ask(lc(it.name)); showSwap.classList.remove('is-swap'); };
    if (now) return apply();
    showSwap.classList.add('is-swap'); setTimeout(apply, 180);
  }
  function goTo(delta) { ring.target = Math.round((ring.target - delta * ring.step) / ring.step) * ring.step; }
  if (ring.ok) {
    $('#prev').addEventListener('click', () => goTo(-1));
    $('#next').addEventListener('click', () => goTo(1));
    const stage = $('#ringStage');
    stage.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') { goTo(-1); e.preventDefault(); } if (e.key === 'ArrowRight') { goTo(1); e.preventDefault(); } });
    stage.addEventListener('pointerdown', (e) => { ring.drag = { x: e.clientX, y: e.clientY, a: ring.angle, t: performance.now(), on: false, id: e.pointerId, lx: e.clientX, lt: performance.now() }; });
    stage.addEventListener('pointermove', (e) => {
      const d = ring.drag; if (!d) return;
      const dx = e.clientX - d.x, dy = e.clientY - d.y;
      if (!d.on && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) { d.on = true; try { stage.setPointerCapture(d.id); } catch (er) {} }
      if (!d.on) return;
      const now = performance.now();
      ring.vel = (e.clientX - d.lx) / Math.max(now - d.lt, 1) * 0.32 * 16;
      d.lx = e.clientX; d.lt = now;
      ring.angle = d.a + dx * 0.32; ring.target = ring.angle;
    });
    const end = () => { const d = ring.drag; ring.drag = null; if (!d || !d.on) return; const fling = ring.angle + ring.vel * 9; ring.target = Math.round(fling / ring.step) * ring.step; ring.vel = 0; };
    stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  }
  function updateRing(dt) {
    if (!ring.ok) return;
    if (!ring.drag) ring.angle += (ring.target - ring.angle) * (1 - Math.pow(0.0009, dt));
    ring.root.style.transform = `translateZ(${-ring.R}px) rotateY(${ring.angle}deg)`;
    const i = ((Math.round(-ring.angle / ring.step) % ring.n) + ring.n) % ring.n;
    setActive(i, false);
  }

  /* ============================================================
     BULK — crates that drop into a stack
     ============================================================ */
  const crates = { ok: false };
  if (doc.classList.contains('d3')) (function buildCrates() {
    const root = $('#crates'); const s = isSmall() ? 84 : 104; const gap = 4;
    root.append(el('div', 'crates-floor'));
    const spots = [[-1, 0, 0], [0, 0, 0], [1, 0, 0], [-0.5, 1, 0], [0.5, 1, 0], [0, 2, 0], [0.5, 0, -1], [-0.5, 0, -1]];
    spots.forEach(([cx, cy, cz], n) => {
      const c = el('div', 'crate');
      const x = cx * (s + gap), y = -cy * (s + gap) - s / 2, zz = cz * (s + gap);
      c.dataset.to = `translate3d(${x}px, ${y}px, ${zz}px)`;
      c.style.transform = doc.classList.contains('motion') ? `translate3d(${x}px, ${y - 620}px, ${zz}px) rotateY(${(n % 2 ? 1 : -1) * 22}deg)` : c.dataset.to;
      c.style.transitionDelay = `${n * 90}ms`;
      c.append(box(s, s, s, 'kraft', { front: '<span>Одеса</span>' }));
      root.append(c);
    });
    const io2 = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      root.classList.add('is-in');
      root.querySelectorAll('.crate').forEach((c) => { c.style.transform = c.dataset.to; });
      io2.disconnect();
    }), { threshold: 0.35 });
    io2.observe($('#cratesStage'));
    Object.assign(crates, { ok: true, root });
  })();

  /* ============================================================
     ONE LOOP
     ============================================================ */
  let last = performance.now(), start = last, slowFrames = 0, lastScrollY = -1;
  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.1); last = now;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const P = scrollY / max;
    if (scrollY !== lastScrollY) { nav.classList.toggle('is-solid', scrollY > 40); lastScrollY = scrollY; }
    if (sea.ok && !document.hidden && (!reduce || P !== frame.lp)) {
      frame.lp = P;
      drawSea(reduce ? 4 : (now - start) / 1000, P);
      if (dt > 0.034) { slowFrames++; if (slowFrames > 40 && sea.q > 0.34) { sea.q -= 0.08; sizeSea(true); slowFrames = 0; } } else slowFrames = Math.max(0, slowFrames - 1);
    }
    updateStairs();
    updateRing(dt);
    if (crates.ok && matchMedia('(pointer: fine)').matches) crates.root.style.transform = `rotateX(${-16 + look.y * 4}deg) rotateY(${-32 + look.x * 14}deg)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ============================================================
     CURTAIN — the opening transition
     ============================================================ */
  if (!reduce) {
    const c = el('div', 'curtain', '<p class="curtain__mark">Сувеніри з <span>Одеси</span></p>');
    c.setAttribute('aria-hidden', 'true');
    document.body.append(c);
    requestAnimationFrame(() => c.classList.add('is-in'));
    const go = () => { c.classList.add('is-out'); doc.classList.add('is-ready'); setTimeout(() => c.remove(), 1300); };
    setTimeout(go, 900);
  } else {
    doc.classList.add('is-ready');
  }
})();
