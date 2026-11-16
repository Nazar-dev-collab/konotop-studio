import * as THREE from './three.module.min.js';

const canvas = document.getElementById('scene');
const hero = canvas.parentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (e) {
  document.documentElement.classList.add('no-webgl');
  throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
camera.position.set(0, 0, 18);

scene.add(new THREE.HemisphereLight(0xffffff, 0xcfe3c2, 1.6));
const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(5, 8, 10); scene.add(key);
const rim = new THREE.DirectionalLight(0xfff1c4, 1.2); rim.position.set(-8, -3, 4); scene.add(rim);

const C = { green: 0x5fb336, sun: 0xffcd3c, coral: 0xff6b5e, sky: 0x4a8bff, lilac: 0x9b7bff, mint: 0x2bb3aa, ink: 0x18223a, wood: 0xf1d2a2, pink: 0xff9aa8, white: 0xffffff, steel: 0xc9d0da };
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.38, metalness: 0, ...o });

/* ---------- object factories ---------- */
function paperclip(color) {
  const p = new THREE.Path();
  p.moveTo(0.42, 0.75);
  p.lineTo(0.42, -1.25);
  p.absarc(0, -1.25, 0.42, 0, Math.PI, true);
  p.lineTo(-0.42, 1.3);
  p.absarc(-0.1, 1.3, 0.32, Math.PI, 0, true);
  p.lineTo(0.22, -0.95);
  p.absarc(0.06, -0.95, 0.16, 0, Math.PI, true);
  p.lineTo(-0.1, 0.55);
  const pts = p.getSpacedPoints(220).map(v => new THREE.Vector3(v.x, v.y, 0));
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.075, 12, false);
  return new THREE.Mesh(geo, mat(color, { roughness: 0.25 }));
}
function pencil(color) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.2, 6), mat(color));
  const wood = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 6), mat(C.wood));
  wood.position.y = 1.9;
  const lead = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.2, 12), mat(C.ink));
  lead.position.y = 2.12;
  const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.3, 16), mat(C.steel, { metalness: 0.8, roughness: 0.3 }));
  ferrule.position.y = -1.75;
  const eraser = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.3, 16), mat(C.pink));
  eraser.position.y = -2.05;
  g.add(body, wood, lead, ferrule, eraser);
  return g;
}
function sticky(color) {
  const geo = new THREE.BoxGeometry(1.7, 1.7, 0.05, 10, 10, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < -0.2) pos.setZ(i, pos.getZ(i) + Math.pow((-0.2 - y) / 1.1, 2) * 0.35);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, mat(color, { roughness: 0.7 }));
}
function pin(color) {
  const g = new THREE.Group();
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 16), mat(color, { roughness: 0.2 }));
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.4, 20), mat(color, { roughness: 0.2 }));
  neck.position.y = -0.35;
  const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.01, 0.6, 8), mat(C.steel, { metalness: 0.9, roughness: 0.2 }));
  needle.position.y = -0.85;
  g.add(head, neck, needle);
  return g;
}
function eraser() {
  const g = new THREE.Group();
  const a = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 0.35), mat(C.sky, { roughness: 0.6 }));
  a.position.x = -0.35;
  const b = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.35), mat(C.coral, { roughness: 0.6 }));
  b.position.x = 0.55;
  g.add(a, b);
  return g;
}
function paperStack() {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.9, 0.04), mat(C.white, { roughness: 0.8 }));
    s.position.z = i * 0.06; s.rotation.z = (i - 2) * 0.05;
    g.add(s);
  }
  return g;
}
function ring() { // a binder ring, reads as a coloured accent
  return new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.12, 16, 48), mat(C.lilac, { roughness: 0.3 }));
}

/* ---------- layout: objects cluster on the right on wide screens ---------- */
const defs = [
  [paperStack(),        [ 4.4,  0.2, -2.5], [0.3, -0.5, 0.2], 1.15],
  [sticky(C.sun),       [ 3.2,  1.9,  0.2], [0.2, 0.3, -0.25], 1.1],
  [sticky(C.green),     [ 6.6, -1.6, -0.8], [-0.2, -0.4, 0.3], 0.95],
  [sticky(C.coral),     [ 3.0, -2.6, -1.4], [0.3, 0.2, 0.5], 0.8],
  [paperclip(C.green),  [ 5.2,  2.5,  1.4], [0.2, 0.3, -0.5], 1.1],
  [paperclip(C.coral),  [ 3.3,  0.2,  2.2], [0.1, -0.2, 0.9], 0.9],
  [paperclip(C.sky),    [ 7.1,  0.6,  0.6], [0, 0.4, 0.2], 0.85],
  [paperclip(C.sun),    [ 4.2, -2.9,  1.0], [0.4, 0, -1.1], 0.8],
  [pencil(C.sun),       [ 5.6,  -0.3,  2.0], [0.2, 0.3, 1.0], 0.95],
  [pencil(C.sky),       [ 3.6,  3.1, -1.6], [0.1, 0.2, -1.2], 0.9],
  [pencil(C.green),     [ 7.6,  2.9, -2.0], [0.4, 0, 0.5], 0.85],
  [pin(C.coral),        [ 3.4, -1.0,  3.0], [0.4, 0, 0.6], 0.9],
  [pin(C.sky),          [ 6.1,  1.4,  2.6], [-0.3, 0, -0.4], 0.8],
  [pin(C.sun),          [ 2.6,  2.6,  0.5], [0.2, 0, 0.3], 0.7],
  [eraser(),            [ 6.4, -3.1,  0.8], [0.4, 0.5, 0.2], 1.0],
  [ring(),              [ 2.8, -0.8, -2.5], [0.6, 0.4, 0], 0.9],
  [ring(),              [ 8.2, -0.8, -3.0], [0.2, 0.9, 0], 0.7],
];
const items = defs.map(([obj, p, r, s], i) => {
  obj.position.set(...p);
  obj.rotation.set(...r);
  obj.scale.setScalar(reduce ? s : 0.001);
  scene.add(obj);
  return {
    obj, base: new THREE.Vector3(...p), rot: new THREE.Euler(...r), s,
    push: new THREE.Vector3(), spin: new THREE.Vector3((Math.random() - .5) * .25, (Math.random() - .5) * .35, (Math.random() - .5) * .2),
    phase: Math.random() * Math.PI * 2, delay: 0.15 + i * 0.05
  };
});

/* ---------- sizing: on narrow screens the desk sits under the copy ---------- */
let narrow = false, shiftX = 0;
function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  narrow = innerWidth < 992;
  camera.fov = narrow ? 44 : 32;
  camera.updateProjectionMatrix();
  shiftX = narrow ? -4.4 : (w / h > 1.75 ? 0.4 : -0.5);
}
addEventListener('resize', resize);
resize();

/* ---------- interaction: the cursor scatters what is near it ---------- */
const mouse = new THREE.Vector2(9, 9), look = new THREE.Vector2();
const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
let hasPointer = false;
hero.addEventListener('pointermove', (e) => {
  const r = canvas.getBoundingClientRect();
  mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  hasPointer = true;
});
hero.addEventListener('pointerleave', () => { hasPointer = false; });

let scrollY = 0;
addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

let visible = true;
new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); }).observe(hero);

const clock = new THREE.Clock();
let t0 = null, running = false;
const easeOutBack = (x) => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };

function frame() {
  const t = clock.getElapsedTime();
  if (t0 === null) t0 = t;
  const k = t - t0;

  look.x += ((hasPointer ? mouse.x : 0) - look.x) * 0.05;
  look.y += ((hasPointer ? mouse.y : 0) - look.y) * 0.05;
  camera.position.x = look.x * 0.8;
  camera.position.y = look.y * 0.6 - scrollY * 0.004;
  camera.lookAt(0, -scrollY * 0.004, 0);

  if (hasPointer) { ray.setFromCamera(mouse, camera); ray.ray.intersectPlane(plane, hit); }

  for (const it of items) {
    const { obj, base, rot, s } = it;
    const local = new THREE.Vector3(base.x + shiftX, base.y, base.z);
    if (hasPointer) {
      const d = new THREE.Vector3(local.x - hit.x, local.y - hit.y, 0);
      const dist = d.length();
      const f = Math.max(0, 2.6 - dist) * 0.9;
      it.push.lerp(d.normalize().multiplyScalar(f), 0.08);
    } else it.push.lerp(new THREE.Vector3(), 0.05);

    obj.position.set(
      local.x + it.push.x,
      local.y + Math.sin(t * 0.8 + it.phase) * 0.18 + it.push.y,
      local.z + it.push.z
    );
    obj.rotation.set(
      rot.x + Math.sin(t * 0.5 + it.phase) * 0.15 + it.spin.x * t * 0.3 + it.push.y * 0.3,
      rot.y + it.spin.y * t + it.push.x * 0.3,
      rot.z + Math.cos(t * 0.4 + it.phase) * 0.1
    );
    if (!reduce) {
      const p = Math.min(1, Math.max(0, (k - it.delay) / 0.9));
      obj.scale.setScalar(Math.max(0.001, s * easeOutBack(p)));
    }
  }
  renderer.render(scene, camera);
}

function loop() {
  if (running) return;
  running = true;
  const step = () => {
    if (!visible || reduce) { running = false; return; }
    frame();
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
frame();
if (!reduce) loop();
else addEventListener('resize', frame);
