import * as THREE from "three";
import {
  dirtTexture,
  dustSprite,
  fabricTexture,
  plankTexture,
  posterTexture,
  rockTexture,
  rugTexture,
  signTexture,
  skyTexture,
  starSprite,
  wallpaperTexture,
  windowTexture,
  woodTexture,
} from "./textures.js";

const TAU = Math.PI * 2;

const TEX = {};
function textures() {
  if (TEX.ready) return TEX;
  TEX.wood = woodTexture("#6b4228", "#3a2014", [3, 2]);
  TEX.woodDark = woodTexture("#49301f", "#28150e", [2, 2]);
  TEX.plank = plankTexture("#5b3925", [5, 5]);
  TEX.wallpaper = wallpaperTexture("#4d1b24", "#b58b4c", [2, 1]);
  TEX.wallpaperGreen = wallpaperTexture("#233b35", "#9bb8a1", [2, 1]);
  TEX.dirt = dirtTexture([12, 12]);
  TEX.rock = rockTexture([5, 5]);
  TEX.rug = rugTexture();
  TEX.fabric = fabricTexture("#5a1b26", [2, 2]);
  TEX.dust = dustSprite();
  TEX.star = starSprite();
  TEX.window = windowTexture();
  TEX.skyDusk = skyTexture("#171a38", "#a24f46", "#f0aa5f");
  TEX.skyDawn = skyTexture("#1c2f4c", "#c47d72", "#f6cf95");
  TEX.wanted = posterTexture("wanted");
  TEX.town = posterTexture("town");
  TEX.saloonSign = signTexture("GILDED LILY", "ROOMS · WHISKEY · LUCK", { fontSize: 62 });
  TEX.clinicSign = signTexture("HALE'S CLINIC", "PHYSICIAN & SURGEON", { fontSize: 54, background: "#1d302c", border: "#a9c2b7", color: "#dce8da", subColor: "#93a893" });
  TEX.assaySign = signTexture("ASSAY OFFICE", "CINDER MINING CO.", { fontSize: 48, background: "#2e2319", border: "#b78f4c", color: "#e0c48c", subColor: "#9e8152" });
  TEX.stableSign = signTexture("DELGADO STABLES", "HORSES · FREIGHT · NO QUESTIONS", { fontSize: 45, background: "#3a271b", border: "#b68c4b", color: "#e1c386", subColor: "#9d7c4d" });
  TEX.mineSign = signTexture("CINDER MINE", "NO TRESPASSING · KEEP OUT", { fontSize: 56, background: "#2c2118", border: "#b99154", color: "#d9bd84", subColor: "#9a7a4a" });
  TEX.ready = true;
  return TEX;
}

function std(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.7,
    metalness: options.metalness ?? 0,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    map: options.map ?? null,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide,
    flatShading: options.flatShading ?? false,
  });
}

function basic(color, options = {}) {
  return new THREE.MeshBasicMaterial({
    color,
    map: options.map ?? null,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide,
    blending: options.blending ?? THREE.NormalBlending,
    depthWrite: options.depthWrite ?? true,
    fog: options.fog ?? true,
  });
}

function addBox(group, w, h, d, material, x = 0, y = 0, z = 0, cast = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addCyl(group, rt, rb, h, material, x = 0, y = 0, z = 0, seg = 16, cast = true) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addPlane(group, w, h, material, x = 0, y = 0, z = 0, rotation = 0) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotation;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addLamp(group, x, y, z, color = "#ffb45c", intensity = 12, distance = 8, scale = 1) {
  const fixture = new THREE.Group();
  const bracket = addBox(fixture, 0.04, 0.04, 0.34, std("#3d2b1d", { metalness: 0.55, roughness: 0.4 }), 0, 0.16, -0.13);
  bracket.rotation.x = 0.2;
  const cap = addCyl(fixture, 0.08, 0.11, 0.05, std("#4b3220", { metalness: 0.55, roughness: 0.34 }), 0, 0.25, 0.05, 12);
  const glass = addCyl(fixture, 0.075, 0.095, 0.22, std(color, {
    emissive: color,
    emissiveIntensity: 1.5,
    roughness: 0.22,
    transparent: true,
    opacity: 0.7,
  }), 0, 0.12, 0.05, 14);
  const base = addCyl(fixture, 0.09, 0.07, 0.05, std("#4b3220", { metalness: 0.55, roughness: 0.34 }), 0, 0, 0.05, 12);
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.035 * scale, 10, 8), basic(color));
  flame.position.set(0, 0.1, 0.05);
  flame.scale.y = 1.5;
  fixture.add(flame);

  fixture.position.set(x, y, z);
  fixture.scale.setScalar(scale);
  fixture.rotation.y = x < 0 ? 0.3 : -0.3;
  group.add(fixture);

  const light = new THREE.PointLight(color, intensity, distance, 1.7);
  light.position.set(x, y + 0.1 * scale, z + 0.05);
  light.castShadow = false;
  group.add(light);
  return { light, flame };
}

function addDust(group, count, bounds, color = "#f0c98e", size = 0.035, opacity = 0.5) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * bounds[0];
    positions[i * 3 + 1] = Math.random() * bounds[1];
    positions[i * 3 + 2] = (Math.random() - 0.5) * bounds[2];
    phases[i] = Math.random() * TAU;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
  const material = new THREE.PointsMaterial({
    color,
    size,
    map: textures().dust,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, material);
  points.userData.base = positions.slice();
  points.userData.phases = phases;
  points.userData.animate = true;
  group.add(points);
  return points;
}

function addStars(group, count = 90) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 0.38;
    const radius = 38 + Math.random() * 10;
    positions[i * 3] = Math.cos(theta) * Math.sin(phi) * radius;
    positions[i * 3 + 1] = Math.cos(phi) * radius + 3;
    positions[i * 3 + 2] = Math.sin(theta) * Math.sin(phi) * radius;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: "#f5e7c6",
    size: 0.13,
    map: textures().star,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const stars = new THREE.Points(geo, mat);
  group.add(stars);
  return stars;
}

function addSky(group, texture) {
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(60, 32, 20),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide, fog: false })
  );
  sky.position.y = 4;
  group.add(sky);
  return sky;
}

function addSun(group, x, y, z, color = "#ffd79b", size = 5) {
  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: textures().star,
      color,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    })
  );
  sun.scale.set(size, size, 1);
  sun.position.set(x, y, z);
  group.add(sun);
  return sun;
}

function addMountains(group, color = "#352a27", z = -24, scale = 1) {
  const material = std(color, { roughness: 0.94, flatShading: true });
  for (let i = 0; i < 9; i++) {
    const width = (6 + Math.random() * 10) * scale;
    const height = (4 + Math.random() * 8) * scale;
    const peak = new THREE.Mesh(new THREE.ConeGeometry(width, height, 5), material);
    peak.position.set(-24 + i * 6 + (Math.random() - 0.5) * 3, height / 2 - 1.5, z - Math.random() * 6);
    peak.rotation.y = Math.random() * Math.PI;
    peak.scale.z = 0.6 + Math.random() * 0.5;
    group.add(peak);
  }
}

function addCactus(group, x, z, scale = 1, color = "#3f5338") {
  const mat = std(color, { roughness: 0.86, flatShading: true });
  const cactus = new THREE.Group();
  const trunk = addCyl(cactus, 0.11, 0.15, 2.2, mat, 0, 1.1, 0, 9);
  trunk.rotation.z = -0.02;
  const armGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.85, 8);
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(armGeo, mat);
    arm.position.set(side * 0.28, 1.35 + side * 0.07, 0);
    arm.rotation.z = side * 0.55;
    arm.castShadow = true;
    cactus.add(arm);
    const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 6), mat);
    elbow.position.set(side * 0.17, 1.2, 0);
    elbow.castShadow = true;
    cactus.add(elbow);
    const up = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 0.6, 8), mat);
    up.position.set(side * 0.42, 1.6, 0);
    up.rotation.z = side * 0.03;
    up.castShadow = true;
    cactus.add(up);
  }
  cactus.position.set(x, 0, z);
  cactus.scale.setScalar(scale);
  group.add(cactus);
}

function addBarrel(group, x, z, scale = 1, rotation = 0) {
  const mat = std("#5d3921", { roughness: 0.82, map: textures().wood });
  const barrel = addCyl(group, 0.28, 0.34, 0.78, mat, x, 0.39 * scale, z, 14);
  barrel.scale.setScalar(scale);
  barrel.rotation.y = rotation;
  const hoopMat = std("#2e231b", { metalness: 0.55, roughness: 0.5 });
  for (const y of [0.12, 0.66]) {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.31 * scale, 0.012 * scale, 5, 24), hoopMat);
    hoop.rotation.x = Math.PI / 2;
    hoop.position.set(x, y * scale, z);
    hoop.scale.z = scale;
    group.add(hoop);
  }
  return barrel;
}

function addCrate(group, x, y, z, size = 0.5, rotation = 0) {
  const crate = addBox(group, size, size, size, std("#695035", { roughness: 0.85, map: textures().woodDark }), x, y, z);
  crate.rotation.y = rotation;
  const trim = std("#3b2a1a", { roughness: 0.8 });
  for (const d of [-1, 1]) {
    addBox(group, size + 0.01, 0.035, 0.035, trim, x, y + d * size * 0.38, z + size / 2 + 0.01);
  }
  return crate;
}

function addWagonWheel(group, x, y, z, scale = 1) {
  const wheel = new THREE.Group();
  const wood = std("#5d4028", { roughness: 0.86, map: textures().wood });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.06, 6, 22), wood);
  wheel.add(rim);
  const hub = addCyl(wheel, 0.1, 0.1, 0.24, std("#3b2717", { roughness: 0.8 }), 0, 0, 0, 10);
  hub.rotation.z = Math.PI / 2;
  for (let i = 0; i < 10; i++) {
    const spoke = addBox(wheel, 0.035, 1.06, 0.035, wood, 0, 0, 0);
    spoke.rotation.z = (i / 10) * Math.PI;
  }
  wheel.position.set(x, y, z);
  wheel.scale.setScalar(scale);
  wheel.rotation.y = 0.15;
  group.add(wheel);
  return wheel;
}

function addChair(group, x, z, rotation = 0, material = null) {
  const wood = material ?? std("#4a2d1b", { roughness: 0.82, map: textures().wood });
  const chair = new THREE.Group();
  addBox(chair, 0.44, 0.055, 0.44, wood, 0, 0.47, 0);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      addBox(chair, 0.045, 0.46, 0.045, wood, sx * 0.18, 0.23, sz * 0.18);
    }
  }
  for (const sx of [-1, 1]) addBox(chair, 0.045, 0.48, 0.045, wood, sx * 0.18, 0.71, -0.19);
  addBox(chair, 0.42, 0.06, 0.04, wood, 0, 0.92, -0.19);
  chair.position.set(x, 0, z);
  chair.rotation.y = rotation;
  group.add(chair);
  return chair;
}

function addTable(group, x, z, scale = 1) {
  const wood = std("#51321e", { roughness: 0.8, map: textures().wood });
  const table = new THREE.Group();
  addBox(table, 1.0, 0.07, 0.85, wood, 0, 0.77, 0);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) addBox(table, 0.06, 0.74, 0.06, wood, sx * 0.4, 0.37, sz * 0.33);
  }
  table.position.set(x, 0, z);
  table.scale.setScalar(scale);
  group.add(table);
  return table;
}

function addBottle(group, x, y, z, color = "#6f3d18", scale = 1) {
  const glass = std(color, {
    roughness: 0.22,
    metalness: 0.05,
    transparent: true,
    opacity: 0.72,
    emissive: color,
    emissiveIntensity: 0.12,
  });
  const bottle = new THREE.Group();
  addCyl(bottle, 0.045, 0.06, 0.22, glass, 0, 0.11, 0, 10);
  addCyl(bottle, 0.02, 0.035, 0.1, glass, 0, 0.27, 0, 8);
  addCyl(bottle, 0.022, 0.022, 0.035, std("#3a2418", { roughness: 0.5 }), 0, 0.34, 0, 8);
  bottle.position.set(x, y, z);
  bottle.scale.setScalar(scale);
  group.add(bottle);
  return bottle;
}

function addHorse(group, x, z, color = "#6a4630", rotation = 0) {
  const horse = new THREE.Group();
  const hide = std(color, { roughness: 0.82 });
  const dark = std("#2d1d16", { roughness: 0.9 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.85, 8, 14), hide);
  body.rotation.z = Math.PI / 2;
  body.position.set(0, 1.18, 0);
  body.castShadow = true;
  horse.add(body);
  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), hide);
  chest.scale.set(1, 1.15, 0.85);
  chest.position.set(0.55, 1.2, 0);
  horse.add(chest);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.25, 0.85, 12), hide);
  neck.position.set(0.78, 1.55, 0);
  neck.rotation.z = -0.55;
  horse.add(neck);
  const head = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.33, 6, 10), hide);
  head.rotation.z = Math.PI / 2.5;
  head.position.set(1.02, 1.82, 0);
  horse.add(head);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.18, 7), hide);
    ear.position.set(0.94, 2.02, s * 0.1);
    ear.rotation.z = -0.2;
    horse.add(ear);
  }
  const mane = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.62, 0.05), dark);
  mane.position.set(0.65, 1.72, 0);
  mane.rotation.z = -0.55;
  horse.add(mane);
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.7, 8), dark);
  tail.position.set(-0.82, 1.05, 0);
  tail.rotation.z = 0.25;
  horse.add(tail);
  for (const sx of [-0.5, 0.5]) {
    for (const sz of [-0.22, 0.22]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.055, 1.05, 8), hide);
      leg.position.set(sx, 0.53, sz);
      leg.castShadow = true;
      horse.add(leg);
      const hoof = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.08, 0.12, 8), dark);
      hoof.position.set(sx, 0.06, sz);
      horse.add(hoof);
    }
  }
  const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.48), std("#5f3821", { roughness: 0.78 }));
  saddle.position.set(0, 1.55, 0);
  horse.add(saddle);
  horse.position.set(x, 0, z);
  horse.rotation.y = rotation;
  group.add(horse);
  return horse;
}

function addPiano(group, x, z, rotation = 0) {
  const piano = new THREE.Group();
  const wood = std("#3c2217", { roughness: 0.62, map: textures().wood });
  addBox(piano, 1.65, 1.05, 0.72, wood, 0, 0.6, 0);
  addBox(piano, 1.72, 0.08, 0.82, wood, 0, 1.16, 0);
  addBox(piano, 1.5, 0.06, 0.2, std("#e5dcc5", { roughness: 0.3 }), 0, 0.94, 0.37);
  for (let i = 0; i < 20; i++) {
    const key = addBox(piano, 0.055, 0.025, 0.15, std(i % 7 === 0 ? "#21130f" : "#e9dfc7", { roughness: 0.35 }), -0.64 + i * 0.067, 0.975, 0.29);
    key.castShadow = false;
  }
  addBox(piano, 1.25, 0.08, 0.12, wood, 0, 0.7, 0.63);
  for (const sx of [-1, 1]) addBox(piano, 0.1, 0.6, 0.1, wood, sx * 0.58, 0.3, 0.32);
  piano.position.set(x, 0, z);
  piano.rotation.y = rotation;
  group.add(piano);
  return piano;
}

function addChandelier(group, x, y, z) {
  const metal = std("#7d5d2c", { metalness: 0.75, roughness: 0.38 });
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), metal);
  hub.position.set(x, y, z);
  group.add(hub);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.025, 6, 30), metal);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(x, y - 0.1, z);
  group.add(ring);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    const cx = x + Math.cos(a) * 0.72;
    const cz = z + Math.sin(a) * 0.72;
    const spoke = addBox(group, 0.02, 0.02, 0.38, metal, x + Math.cos(a) * 0.38, y - 0.04, z + Math.sin(a) * 0.38);
    spoke.rotation.y = -a + Math.PI / 2;
    const candle = addCyl(group, 0.028, 0.028, 0.24, std("#e8dcc0", { roughness: 0.7 }), cx, y + 0.06, cz, 8);
    const flame = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), basic("#ffd18b"));
    flame.scale.y = 1.7;
    flame.position.set(cx, y + 0.2, cz);
    group.add(flame);
    const light = new THREE.PointLight("#ffb15d", 5, 5, 1.8);
    light.position.set(cx, y + 0.2, cz);
    group.add(light);
  }
  const chain = addCyl(group, 0.012, 0.012, 1.1, metal, x, y + 0.6, z, 6);
  chain.castShadow = false;
}

function addWindowGlow(group, x, y, z, w, h, rotation = 0) {
  const frame = addBox(group, w + 0.16, h + 0.16, 0.08, std("#2a1a12", { roughness: 0.65 }), x, y, z - 0.03);
  const plane = addPlane(group, w, h, basic("#ffd08c", { map: textures().window, transparent: false }), x, y, z + 0.025);
  plane.rotation.y = rotation;
  if (rotation) frame.rotation.y = rotation;
  return plane;
}

function addDustAnimators(group) {
  const dusts = [];
  group.traverse((obj) => {
    if (obj.isPoints && obj.userData.animate) dusts.push(obj);
  });
  group.userData.dusts = dusts;
  group.userData.flames = [];
  group.traverse((obj) => {
    if (obj.material && obj.material.isMeshBasicMaterial && obj.material.color) {
      const c = obj.material.color;
      if (c.r > 0.8 && c.g > 0.6 && c.b < 0.65) group.userData.flames.push(obj);
    }
  });
}

function finalizeEnvironment(group, options = {}) {
  addDustAnimators(group);
  return {
    group,
    bg: options.bg ?? "#1a1210",
    fog: options.fog ?? { color: 0x1a1210, near: 10, far: 34 },
    camera: options.camera ?? { pos: new THREE.Vector3(0, 1.75, 5.2), target: new THREE.Vector3(0, 1.1, 0) },
    key: options.key ?? null,
    fill: options.fill ?? null,
    practicals: options.practicals ?? [],
    exposure: options.exposure ?? 1.05,
    titleCamera: options.titleCamera ?? null,
    fogDensity: options.fogDensity ?? null,
  };
}

// ————————————————————————————————————————————————
// STREET
// ————————————————————————————————————————————————

export function createStreet(variant = "dusk") {
  const t = textures();
  const group = new THREE.Group();
  const dawn = variant === "dawn";
  const bg = dawn ? "#2b2a3f" : "#2b1d2c";
  group.background = new THREE.Color(bg);

  addSky(group, dawn ? t.skyDawn : t.skyDusk);
  addStars(group, dawn ? 20 : 80);
  addSun(group, dawn ? 12 : -10, dawn ? 7 : 5.5, -32, dawn ? "#ffe0ab" : "#ffb56b", dawn ? 7 : 4.6);
  addMountains(group, dawn ? "#4a3e39" : "#332a2c", -27, dawn ? 1.15 : 1);

  const hemi = new THREE.HemisphereLight(dawn ? "#e0c9ae" : "#8b7a9c", "#3b2619", dawn ? 1.0 : 0.58);
  group.add(hemi);

  const sunLight = new THREE.DirectionalLight(dawn ? "#ffd7a2" : "#ff9a59", dawn ? 2.4 : 1.7);
  sunLight.position.set(dawn ? 9 : -8, 9, 5);
  sunLight.target.position.set(0, 1, -3);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.left = -10;
  sunLight.shadow.camera.right = 10;
  sunLight.shadow.camera.top = 10;
  sunLight.shadow.camera.bottom = -5;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 30;
  sunLight.shadow.bias = -0.0007;
  sunLight.shadow.normalBias = 0.03;
  group.add(sunLight, sunLight.target);

  const fill = new THREE.DirectionalLight(dawn ? "#abc8df" : "#6f86ba", dawn ? 0.55 : 0.32);
  fill.position.set(4, 6, 6);
  group.add(fill);

  // Ground / road
  const ground = addPlane(group, 70, 46, std("#8d6648", { roughness: 0.97, map: t.dirt }), 0, 0, -9);
  ground.rotation.x = -Math.PI / 2;
  const road = addPlane(group, 10, 48, std("#a37a55", { roughness: 0.95, map: t.dirt }), 0, 0.012, -9);
  road.rotation.x = -Math.PI / 2;
  road.material.map.repeat.set(2, 12);

  // Ruts in the road
  const rutMat = std("#694a32", { roughness: 0.98, transparent: true, opacity: 0.45 });
  for (const sx of [-1.6, 1.6]) {
    const rut = addPlane(group, 0.15, 34, rutMat, sx, 0.016, -8);
    rut.rotation.x = -Math.PI / 2;
  }

  // Boardwalk and facades
  const buildings = new THREE.Group();
  buildings.position.z = -5.1;
  group.add(buildings);

  const facade = (x, width, height, color, sign, options = {}) => {
    const build = new THREE.Group();
    const wallMat = std(color, { roughness: 0.9, map: t.wood });
    addBox(build, width, height, 0.55, wallMat, 0, height / 2, 0);
    // false front
    addBox(build, width + 0.2, 0.75, 0.7, std(options.trimColor ?? "#3b2418", { roughness: 0.82 }), 0, height + 0.2, 0);
    addBox(build, width + 0.35, 0.14, 0.85, std(options.trimColor ?? "#3b2418", { roughness: 0.82 }), 0, height + 0.58, 0);
    // porch roof
    if (options.porch !== false) {
      addBox(build, width + 0.8, 0.14, 2.2, std("#40281a", { roughness: 0.86, map: t.plank }), 0, 3.1, 1.12);
      for (const px of [-width / 2 + 0.15, 0, width / 2 - 0.15]) {
        addCyl(build, 0.075, 0.09, 3.0, std("#4b2e1c", { roughness: 0.8 }), px, 1.5, 2.05, 9);
      }
      addBox(build, width + 0.3, 0.22, 2.1, std("#553a25", { roughness: 0.86, map: t.plank }), 0, 0.12, 1.0);
    }
    // door
    addBox(build, 1.05, 2.15, 0.08, std(options.doorColor ?? "#332016", { roughness: 0.65 }), options.doorX ?? 0, 1.1, 0.31);
    addBox(build, 0.9, 0.06, 0.04, std("#bf9552", { metalness: 0.4, roughness: 0.45 }), options.doorX ?? 0, 1.05, 0.36);
    // windows
    for (const wx of options.windows ?? [-width / 2 + 0.8, width / 2 - 0.8]) {
      addWindowGlow(build, wx, 1.9, 0.3, 1.0, 1.25);
    }
    // sign
    if (sign) {
      const signMesh = addBox(build, Math.min(width * 0.72, 3.8), 0.68, 0.08, std("#ffffff", { map: sign }), 0, height - 0.35, 0.37);
      signMesh.material.emissive = new THREE.Color("#c68b3d");
      signMesh.material.emissiveIntensity = 0.14;
    }
    // roof shade
    addBox(build, width + 0.3, 0.12, 1.4, std("#2a1a12", { roughness: 0.9 }), 0, height + 0.72, 0);
    build.position.x = x;
    buildings.add(build);
    return build;
  };

  facade(-2.3, 5.2, 4.7, "#6c4930", t.saloonSign);
  facade(3.2, 3.7, 4.05, "#5c4630", t.assaySign, { doorX: 0.2, windows: [-1.1, 1.1], trimColor: "#38261b" });
  facade(-7.3, 4.1, 4.2, "#59412d", t.clinicSign, { doorColor: "#263a36", trimColor: "#31423a", windows: [-1.2, 1.2] });
  facade(7.6, 4.4, 3.9, "#5c3926", t.town, { windows: [-1.3, 1.3] });
  facade(12.0, 3.6, 3.6, "#4e3828", null, { windows: [-0.9, 0.9] });

  // Balcony on saloon
  const balcony = new THREE.Group();
  addBox(balcony, 4.1, 0.13, 1.0, std("#4b2e1e", { roughness: 0.85 }), 0, 3.3, -3.5);
  for (let i = 0; i < 9; i++) addCyl(balcony, 0.025, 0.025, 0.8, std("#3a2517", { roughness: 0.8 }), -1.9 + i * 0.48, 3.72, -3.0, 6);
  addBox(balcony, 4.1, 0.06, 0.06, std("#3a2517", { roughness: 0.8 }), 0, 4.12, -3.0);
  group.add(balcony);

  // Water tower silhouette
  const tower = new THREE.Group();
  const towerMat = std("#3b2c24", { roughness: 0.9 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) addCyl(tower, 0.08, 0.11, 7.2, towerMat, sx * 0.75, 3.6, sz * 0.75, 6);
  addCyl(tower, 1.1, 1.1, 2.2, std("#57402c", { roughness: 0.85, map: t.wood }), 0, 7.7, 0, 16);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(1.25, 0.8, 16), std("#3a2b22", { roughness: 0.9 }));
  cone.position.y = 9.2;
  tower.add(cone);
  tower.position.set(-10.5, 0, -12);
  group.add(tower);

  // Details
  addBarrel(group, -5.0, 1.6, 0.9, 0.3);
  addBarrel(group, -4.5, 1.35, 0.8, -0.2);
  addCrate(group, 5.6, 0.28, 1.2, 0.55, 0.2);
  addCrate(group, 5.4, 0.82, 1.2, 0.48, -0.1);
  addWagonWheel(group, 4.8, 0.6, 2.4, 0.9);
  addCactus(group, -6.8, 4.0, 1.05, "#37462f");
  addCactus(group, 7.3, 5.0, 0.75, "#3b4b34");

  // Hitching post
  const hitch = new THREE.Group();
  for (const sx of [-1, 1]) addCyl(hitch, 0.07, 0.09, 1.1, std("#4a2d1b", { roughness: 0.82 }), sx * 1.2, 0.55, 0, 8);
  addBox(hitch, 2.8, 0.08, 0.08, std("#4a2d1b", { roughness: 0.82 }), 0, 0.95, 0);
  hitch.position.set(0.3, 0, 2.6);
  group.add(hitch);

  // Lanterns on porches
  const practicals = [];
  practicals.push(addLamp(group, -4.0, 3.0, -2.6, "#ffb35e", 11, 7, 0.9).light);
  practicals.push(addLamp(group, 3.0, 2.9, -2.7, "#ffb35e", 9, 6, 0.85).light);

  // Tumbleweed
  const tumble = new THREE.Group();
  const twMat = std("#8b6b46", { roughness: 0.95, wireframe: true, transparent: true, opacity: 0.6 });
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28 + i * 0.03, 0.012, 4, 14), twMat);
    ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    tumble.add(ring);
  }
  tumble.position.set(-2.2, 0.32, 3.2);
  group.add(tumble);
  group.userData.tumble = tumble;

  addDust(group, 130, [16, 7, 12], "#f2c385", 0.045, 0.45);
  const dust = group.children.find((c) => c.isPoints && c.userData.animate);

  const env = finalizeEnvironment(group, {
    bg,
    fog: { color: new THREE.Color(bg), near: 14, far: 44 },
    camera: { pos: new THREE.Vector3(0, 1.82, 5.6), target: new THREE.Vector3(0, 1.25, -1.0) },
    key: sunLight,
    fill,
    practicals,
    exposure: dawn ? 1.12 : 1.02,
  });
  env.tumble = tumble;
  env.dust = dust;
  env.hemi = hemi;
  return env;
}

// ————————————————————————————————————————————————
// SALOON
// ————————————————————————————————————————————————

export function createSaloon(variant = "night") {
  const t = textures();
  const group = new THREE.Group();
  const dawn = variant === "dawn";
  const bg = dawn ? "#3b2c25" : "#140d0b";
  const practicals = [];

  const hemi = new THREE.HemisphereLight(dawn ? "#e4cdb2" : "#a77c5c", "#2a1711", dawn ? 0.95 : 0.38);
  group.add(hemi);

  const key = new THREE.SpotLight(dawn ? "#ffe5c2" : "#ffc58a", dawn ? 115 : 85, 16, 0.72, 0.62, 1.4);
  key.position.set(-2.2, 4.4, 4.0);
  key.target.position.set(0, 1.0, -0.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.03;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 18;
  group.add(key, key.target);

  const rim = new THREE.SpotLight(dawn ? "#bfd7d1" : "#b25e43", dawn ? 45 : 55, 18, 0.8, 0.75, 1.4);
  rim.position.set(3.6, 3.8, -1.8);
  rim.target.position.set(0, 1.2, 0.4);
  group.add(rim, rim.target);

  const fill = new THREE.PointLight(dawn ? "#d8d7ca" : "#8b5b41", dawn ? 20 : 12, 11, 1.6);
  fill.position.set(0, 2.8, 2.8);
  group.add(fill);

  // Floor
  const floor = addPlane(group, 16, 13, std("#5b3a25", { roughness: 0.78, map: t.plank }), 0, 0, -0.5);
  floor.rotation.x = -Math.PI / 2;
  floor.material.map.repeat.set(5, 4);

  // Walls
  const back = addBox(group, 16, 5.3, 0.3, std("#4b1b24", { roughness: 0.86, map: t.wallpaper }), 0, 2.65, -4.6);
  const left = addBox(group, 0.3, 5.3, 13, std("#451821", { roughness: 0.88, map: t.wallpaper }), -7.6, 2.65, -0.5);
  const right = addBox(group, 0.3, 5.3, 13, std("#451821", { roughness: 0.88, map: t.wallpaper }), 7.6, 2.65, -0.5);
  const wainscot = std("#4d2f1d", { roughness: 0.82, map: t.wood });
  addBox(group, 16, 1.25, 0.12, wainscot, 0, 0.62, -4.41);
  addBox(group, 0.12, 1.25, 13, wainscot, -7.41, 0.62, -0.5);
  addBox(group, 0.12, 1.25, 13, wainscot, 7.41, 0.62, -0.5);
  addBox(group, 16, 0.22, 13, std("#26150f", { roughness: 0.9 }), 0, 5.2, -0.5);

  // Ceiling beams
  const beamMat = std("#2c1c13", { roughness: 0.86, map: t.woodDark });
  for (let i = 0; i < 6; i++) addBox(group, 16, 0.2, 0.28, beamMat, 0, 4.95, -4.9 + i * 1.85);
  addBox(group, 0.3, 0.35, 13, beamMat, -4.8, 4.8, -0.5);
  addBox(group, 0.3, 0.35, 13, beamMat, 4.8, 4.8, -0.5);

  // Bar
  const bar = new THREE.Group();
  bar.position.set(0, 0, -2.85);
  const barWood = std("#4d2c1a", { roughness: 0.62, map: t.wood });
  addBox(bar, 8.4, 1.25, 0.85, barWood, 0, 0.62, 0);
  addBox(bar, 8.7, 0.12, 1.05, std("#7c5330", { roughness: 0.5, map: t.wood }), 0, 1.3, 0.03);
  addBox(bar, 8.4, 0.1, 0.1, std("#b08b46", { metalness: 0.78, roughness: 0.3 }), 0, 0.2, 0.58);
  // bar front panels
  for (let i = 0; i < 5; i++) {
    addBox(bar, 1.15, 0.6, 0.04, std("#3b2114", { roughness: 0.72, map: t.wood }), -3.2 + i * 1.6, 0.63, 0.44);
    addBox(bar, 1.0, 0.45, 0.05, std("#6d4728", { roughness: 0.68 }), -3.2 + i * 1.6, 0.63, 0.47);
  }
  group.add(bar);

  // Back bar & shelves
  const backBar = new THREE.Group();
  backBar.position.set(0, 0, -4.28);
  addBox(backBar, 7.2, 1.0, 0.5, std("#3b2215", { roughness: 0.68, map: t.wood }), 0, 0.5, 0);
  addBox(backBar, 7.3, 0.06, 0.55, std("#6d492b", { roughness: 0.6 }), 0, 1.02, 0.02);
  const mirror = addPlane(backBar, 6.3, 2.0, std("#8b7e6e", { metalness: 0.95, roughness: 0.16 }), 0, 2.2, 0.27);
  mirror.material.envMapIntensity = 0.6;
  // shelf unit
  for (const shelfY of [1.65, 2.15, 2.65, 3.15]) {
    addBox(backBar, 5.8, 0.06, 0.24, std("#4a2e1c", { roughness: 0.72 }), 0, shelfY, 0.34);
    for (let i = 0; i < 13; i++) {
      const bx = -2.65 + i * 0.44;
      const colors = ["#6f3d18", "#3e5a35", "#75331f", "#7a5f2a", "#49341e", "#5d2340"];
      addBottle(backBar, bx, shelfY + 0.03, 0.35, colors[i % colors.length], 0.72 + ((i * 7) % 4) * 0.08);
    }
  }
  // mirror frame
  addBox(backBar, 6.5, 0.1, 0.12, std("#b58a48", { metalness: 0.45, roughness: 0.42 }), 0, 3.25, 0.3);
  for (const sx of [-1, 1]) addBox(backBar, 0.1, 2.2, 0.12, std("#b58a48", { metalness: 0.45, roughness: 0.42 }), sx * 3.18, 2.2, 0.3);
  group.add(backBar);

  // Sign above mirror
  const sign = addBox(group, 6.2, 1.05, 0.12, std("#ffffff", { map: t.saloonSign }), 0, 4.15, -4.33);
  sign.material.emissive = new THREE.Color("#d9a052");
  sign.material.emissiveIntensity = 0.18;

  // Staircase left
  const stairs = new THREE.Group();
  stairs.position.set(-6.2, 0, -3.5);
  for (let i = 0; i < 9; i++) {
    addBox(stairs, 1.55, 0.14, 0.42, std("#4d2f1d", { roughness: 0.78, map: t.wood }), 0, 0.12 + i * 0.19, -i * 0.36);
  }
  for (const sx of [-1, 1]) {
    const railing = addBox(stairs, 0.07, 0.07, 3.8, std("#58371f", { roughness: 0.75 }), sx * 0.72, 1.15, -1.55);
    railing.rotation.x = -0.52;
    for (let i = 0; i < 6; i++) addCyl(stairs, 0.022, 0.026, 0.72, std("#4a2d1b", { roughness: 0.76 }), sx * 0.72, 0.6 + i * 0.17, -i * 0.42, 6);
  }
  stairs.rotation.y = 0.0;
  group.add(stairs);

  // Piano
  addPiano(group, 4.9, -2.3, -0.55);

  // Tables and chairs
  addTable(group, -3.9, 0.1, 1.0);
  addChair(group, -4.6, 0.14, 0.7);
  addChair(group, -3.2, 0.14, -2.4);
  addTable(group, 4.2, 0.8, 0.9);
  addChair(group, 4.85, 0.78, 0.4);
  addChair(group, 3.7, 0.5, -2.1);

  // rug in front of bar
  const rug = addPlane(group, 4.6, 2.7, std("#5b1f1d", { roughness: 0.88, map: t.rug }), 0, 0.02, 1.2);
  rug.rotation.x = -Math.PI / 2;

  // chandelier
  addChandelier(group, 0, 3.75, 0.3);
  const chandLight = new THREE.PointLight("#ffb45c", dawn ? 25 : 35, 10, 1.6);
  chandLight.position.set(0, 3.8, 0.3);
  group.add(chandLight);
  practicals.push(chandLight);

  practicals.push(addLamp(group, -6.9, 2.8, -1.2, "#ffac54", 13, 6, 0.9).light);
  practicals.push(addLamp(group, 6.9, 2.8, -1.2, "#ffac54", 13, 6, 0.9).light);
  practicals.push(addLamp(group, 0, 2.9, -4.0, "#ffb15a", 10, 5, 0.8).light);

  // Posters
  addPlane(group, 0.75, 1.1, basic("#d8c7a1", { map: t.wanted }), -5.7, 2.4, -4.4);
  addPlane(group, 0.7, 1.0, basic("#d8c7a1", { map: t.town }), 5.7, 2.2, -4.4);

  // Windows (dawn glow)
  if (dawn) {
    addWindowGlow(group, 5.9, 2.9, -4.3, 1.15, 1.6);
    addWindowGlow(group, -5.9, 2.9, -4.3, 1.15, 1.6);
    const windowSpot = new THREE.SpotLight("#ffe4bd", 38, 12, 0.55, 0.8, 1.5);
    windowSpot.position.set(4.5, 3.2, -3.8);
    windowSpot.target.position.set(-1.2, 0.8, 0.8);
    group.add(windowSpot, windowSpot.target);
  }

  // Dust and haze
  addDust(group, dawn ? 80 : 100, [13, 4.8, 9], dawn ? "#e9d5b8" : "#f4c98e", 0.032, 0.38);
  const dust = group.children.find((c) => c.isPoints && c.userData.animate);

  const env = finalizeEnvironment(group, {
    bg,
    fog: { color: new THREE.Color(bg), near: 12, far: 30 },
    camera: { pos: new THREE.Vector3(0, 1.72, 5.0), target: new THREE.Vector3(0, 1.16, 0.15) },
    key,
    fill,
    practicals,
    exposure: dawn ? 1.06 : 1.08,
  });
  env.dust = dust;
  env.hemi = hemi;
  return env;
}

// ————————————————————————————————————————————————
// CLINIC
// ————————————————————————————————————————————————

export function createClinic(variant = "night") {
  const t = textures();
  const group = new THREE.Group();
  const dawn = variant === "dawn";
  const practicals = [];

  const hemi = new THREE.HemisphereLight(dawn ? "#e9dbc5" : "#b7b6a2", "#2b2018", dawn ? 1.1 : 0.48);
  group.add(hemi);

  const key = new THREE.SpotLight(dawn ? "#ffe8c2" : "#f4d29f", dawn ? 105 : 80, 15, 0.7, 0.6, 1.4);
  key.position.set(-2.6, 4.0, 3.4);
  key.target.position.set(0.4, 1.0, -0.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.03;
  group.add(key, key.target);

  const fill = new THREE.PointLight(dawn ? "#d9e7e0" : "#8ba49a", dawn ? 22 : 14, 12, 1.7);
  fill.position.set(2.8, 2.8, 2.0);
  group.add(fill);

  // Floor
  const floor = addPlane(group, 13, 12, std("#6b4d36", { roughness: 0.82, map: t.plank }), 0, 0, -0.3);
  floor.rotation.x = -Math.PI / 2;

  // Walls
  const wallColor = "#42564e";
  addBox(group, 13, 5.0, 0.25, std(wallColor, { roughness: 0.9, map: t.wallpaperGreen }), 0, 2.5, -4.4);
  addBox(group, 0.25, 5.0, 12, std(wallColor, { roughness: 0.9, map: t.wallpaperGreen }), -6.3, 2.5, -0.3);
  addBox(group, 0.25, 5.0, 12, std(wallColor, { roughness: 0.9, map: t.wallpaperGreen }), 6.3, 2.5, -0.3);
  addBox(group, 13, 0.18, 12, std("#2a2118", { roughness: 0.9 }), 0, 4.9, -0.3);

  // wainscot
  const wainscot = std("#6b523a", { roughness: 0.82, map: t.wood });
  addBox(group, 13, 1.35, 0.12, wainscot, 0, 0.67, -4.26);
  addBox(group, 0.12, 1.35, 12, wainscot, -6.16, 0.67, -0.3);
  addBox(group, 0.12, 1.35, 12, wainscot, 6.16, 0.67, -0.3);
  addBox(group, 13, 0.07, 0.1, std("#a98a5b", { roughness: 0.5 }), 0, 1.36, -4.17);

  // Window with light
  addWindowGlow(group, 4.7, 2.75, -4.25, 1.55, 2.15);
  const windowSpot = new THREE.SpotLight(dawn ? "#ffd9a7" : "#b9d0c7", dawn ? 65 : 28, 14, 0.5, 0.8, 1.5);
  windowSpot.position.set(4.6, 3.5, -3.7);
  windowSpot.target.position.set(-1.2, 0.8, 1.4);
  group.add(windowSpot, windowSpot.target);

  // Exam table
  const table = new THREE.Group();
  table.position.set(-3.8, 0, 0.3);
  const tableWood = std("#4b3120", { roughness: 0.68, map: t.wood });
  addBox(table, 1.0, 0.12, 2.1, tableWood, 0, 0.82, 0);
  addBox(table, 0.94, 0.1, 2.0, std("#e3d9c2", { roughness: 0.8 }), 0, 0.92, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) addBox(table, 0.07, 0.8, 0.07, tableWood, sx * 0.4, 0.4, sz * 0.9);
  const pillow = addBox(table, 0.65, 0.12, 0.4, std("#e8dfca", { roughness: 0.86 }), 0, 1.03, -0.72);
  pillow.rotation.x = 0.12;
  group.add(table);

  // Desk
  const desk = new THREE.Group();
  desk.position.set(3.4, 0, -1.2);
  addBox(desk, 1.9, 0.1, 0.95, std("#4f3522", { roughness: 0.62, map: t.wood }), 0, 0.82, 0);
  for (const sx of [-1, 1]) {
    addBox(desk, 0.1, 0.8, 0.8, std("#3d2818", { roughness: 0.72 }), sx * 0.82, 0.41, 0);
    addBox(desk, 0.55, 0.16, 0.72, std("#3d2818", { roughness: 0.72 }), sx * 0.5, 0.65, 0);
  }
  addBox(desk, 0.75, 0.03, 0.55, std("#d5c8a9", { roughness: 0.85 }), 0.2, 0.88, 0.05);
  addBox(desk, 0.38, 0.05, 0.28, std("#3e2b1d", { roughness: 0.42 }), -0.35, 0.9, 0.16);
  const ledger = addBox(desk, 0.3, 0.05, 0.4, std("#5f1d20", { roughness: 0.6 }), 0.45, 0.9, -0.1);
  ledger.rotation.y = 0.2;
  addCyl(desk, 0.05, 0.06, 0.14, std("#c9b06d", { metalness: 0.65, roughness: 0.3 }), -0.2, 0.96, -0.05, 10);
  group.add(desk);

  // Bookshelf
  const shelf = new THREE.Group();
  shelf.position.set(-5.8, 0, -2.6);
  addBox(shelf, 1.35, 2.9, 0.45, std("#3c2a1b", { roughness: 0.8, map: t.wood }), 0, 1.45, 0);
  for (const y of [0.55, 1.15, 1.75, 2.35]) {
    addBox(shelf, 1.25, 0.05, 0.4, std("#5d3f26", { roughness: 0.7 }), 0, y, 0.03);
    for (let i = 0; i < 7; i++) {
      const colors = ["#5a1d20", "#254b42", "#7b5c33", "#3b2f4f", "#6b3b26"];
      addBox(shelf, 0.1 + Math.random() * 0.05, 0.3 + Math.random() * 0.16, 0.22, std(colors[i % 5], { roughness: 0.7 }), -0.5 + i * 0.16, y + 0.2, 0.06);
    }
  }
  group.add(shelf);

  // Shelf jars on right wall
  const shelf2 = new THREE.Group();
  shelf2.position.set(5.9, 2.25, -2.8);
  addBox(shelf2, 0.25, 0.06, 2.0, std("#5a3b24", { roughness: 0.72 }), 0, 0, 0);
  for (let i = 0; i < 8; i++) {
    const jar = addCyl(shelf2, 0.055, 0.055, 0.18 + (i % 3) * 0.04, std(i % 2 ? "#97b5a5" : "#c9a76e", {
      roughness: 0.18,
      transparent: true,
      opacity: 0.68,
      emissive: i % 2 ? "#7cae9b" : "#b68a4b",
      emissiveIntensity: 0.12,
    }), 0, 0.13, -0.8 + i * 0.23, 10);
    const lid = addCyl(shelf2, 0.06, 0.06, 0.025, std("#34251a", { roughness: 0.46 }), 0, 0.25 + (i % 3) * 0.04, -0.8 + i * 0.23, 10);
  }
  group.add(shelf2);

  // Anatomy chart
  const chart = new THREE.Group();
  addBox(chart, 1.05, 1.5, 0.035, std("#d9cbaa", { roughness: 0.9 }), 0, 0, 0);
  for (let i = 0; i < 4; i++) addBox(chart, 0.55, 0.02, 0.01, std("#3d2a20", { roughness: 0.5 }), 0, 0.4 - i * 0.25, 0.025);
  addCyl(chart, 0.21, 0.15, 0.55, std("#b68d64", { roughness: 0.8, transparent: true, opacity: 0.35 }), 0, -0.1, 0.02, 12);
  chart.position.set(-4.9, 2.8, -4.22);
  group.add(chart);

  // Privacy screen
  const screen = new THREE.Group();
  screen.position.set(-5.7, 0, 1.9);
  for (let i = 0; i < 3; i++) {
    const panel = addBox(screen, 0.9, 2.2, 0.04, std("#b8c0ad", { roughness: 0.9, transparent: true, opacity: 0.9 }), -0.9 + i * 0.9, 1.1, 0);
    panel.rotation.y = (i - 1) * 0.35;
  }
  group.add(screen);

  // Desk lamp + clinic lamps
  practicals.push(addLamp(group, -2.4, 2.9, -4.0, "#ffc478", 12, 6, 0.8).light);
  practicals.push(addLamp(group, 5.9, 2.9, -0.8, "#ffc478", 10, 5, 0.75).light);

  const deskLamp = new THREE.PointLight("#ffc07a", 14, 5, 1.7);
  deskLamp.position.set(3.9, 1.45, -1.2);
  group.add(deskLamp);
  practicals.push(deskLamp);
  const deskLampBody = addCyl(group, 0.06, 0.08, 0.28, std("#5e482b", { metalness: 0.55, roughness: 0.38 }), 3.9, 1.04, -1.2, 10);
  const shade = addCyl(group, 0.16, 0.22, 0.2, std("#d9b878", { roughness: 0.55, emissive: "#3d2a10", emissiveIntensity: 0.3 }), 3.9, 1.32, -1.2, 14);

  // rug
  const rug = addPlane(group, 4.6, 3.0, std("#63302c", { roughness: 0.9, map: t.rug }), 0, 0.02, 0.7);
  rug.rotation.x = -Math.PI / 2;

  addDust(group, 85, [12, 4.5, 9], dawn ? "#e9dcc2" : "#d6d9c4", 0.03, 0.35);
  const dust = group.children.find((c) => c.isPoints && c.userData.animate);

  const env = finalizeEnvironment(group, {
    bg,
    fog: { color: new THREE.Color(dawn ? "#3a3029" : "#171413"), near: 12, far: 30 },
    camera: { pos: new THREE.Vector3(0, 1.7, 4.85), target: new THREE.Vector3(0, 1.14, 0.1) },
    key,
    fill,
    practicals,
    exposure: dawn ? 1.08 : 1.02,
  });
  env.dust = dust;
  env.hemi = hemi;
  return env;
}

// ————————————————————————————————————————————————
// STABLE
// ————————————————————————————————————————————————

export function createStable() {
  const t = textures();
  const group = new THREE.Group();
  const practicals = [];

  const hemi = new THREE.HemisphereLight("#c6a47e", "#241a13", 0.62);
  group.add(hemi);

  const key = new THREE.SpotLight("#ffc183", 95, 18, 0.74, 0.65, 1.4);
  key.position.set(-2.6, 5.0, 4.4);
  key.target.position.set(0, 1.0, -0.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.03;
  group.add(key, key.target);

  // Dusk door light from back
  const doorLight = new THREE.SpotLight("#ffb26d", 85, 20, 0.65, 0.8, 1.4);
  doorLight.position.set(1.5, 4.4, -6.2);
  doorLight.target.position.set(0, 1.1, 0.6);
  group.add(doorLight, doorLight.target);

  const fill = new THREE.PointLight("#9e8063", 15, 10, 1.6);
  fill.position.set(3.5, 2.8, 2.2);
  group.add(fill);

  // Ground
  const ground = addPlane(group, 16, 14, std("#6c4c31", { roughness: 0.98, map: t.dirt }), 0, 0, -0.2);
  ground.rotation.x = -Math.PI / 2;

  // Back wall with big open door
  const wallMat = std("#4a3020", { roughness: 0.9, map: t.plank });
  addBox(group, 4.8, 5.4, 0.35, wallMat, -5.2, 2.7, -5.1);
  addBox(group, 4.8, 5.4, 0.35, wallMat, 5.2, 2.7, -5.1);
  addBox(group, 5.8, 1.4, 0.35, wallMat, 0, 4.6, -5.1);
  addBox(group, 0.25, 5.4, 12, wallMat, -7.1, 2.7, -0.3);
  addBox(group, 0.25, 5.4, 12, wallMat, 7.1, 2.7, -0.3);
  addBox(group, 0.25, 5.4, 12, std("#3f291b", { roughness: 0.9, map: t.plank }), 1.7, 2.7, -5.05);

  // Door opening glow — the desert beyond
  const outside = addPlane(group, 4.9, 4.2, basic("#ffffff", { map: t.skyDusk }), 0, 2.1, -5.28);
  outside.material.fog = false;
  addMountains(group, "#4a342b", -8.0, 0.35);

  // Beams
  const beamMat = std("#392317", { roughness: 0.88, map: t.woodDark });
  for (let i = 0; i < 5; i++) addBox(group, 15, 0.25, 0.3, beamMat, 0, 5.0, -4.6 + i * 2.2);
  addBox(group, 0.3, 0.35, 13, beamMat, -4.9, 4.8, -0.3);
  addBox(group, 0.3, 0.35, 13, beamMat, 4.9, 4.8, -0.3);

  // Stall dividers
  for (const sx of [-1, 1]) {
    const stall = new THREE.Group();
    stall.position.set(sx * 5.1, 0, -2.1);
    addBox(stall, 0.15, 2.6, 5.4, std("#4c3120", { roughness: 0.86, map: t.plank }), 0, 1.3, 0);
    addBox(stall, 2.2, 0.15, 0.15, std("#4c3120", { roughness: 0.86 }), -sx * 1.0, 2.45, 1.8);
    addBox(stall, 0.15, 1.1, 0.15, std("#4c3120", { roughness: 0.86 }), -sx * 1.9, 2.0, 1.8);
    group.add(stall);
  }

  // Hay bales
  const hayMat = std("#b58c45", { roughness: 0.96 });
  for (let i = 0; i < 5; i++) {
    const bale = addBox(group, 1.2, 0.62, 0.75, hayMat, -5.6 + (i % 3) * 1.1, 0.32 + Math.floor(i / 3) * 0.64, 2.4 + (i % 2) * 0.4);
    bale.rotation.y = (i - 2) * 0.1;
  }
  for (let i = 0; i < 12; i++) {
    const straw = addBox(group, 0.02, 0.02, 0.28, hayMat, -4 + Math.random() * 8, 0.03, -1 + Math.random() * 6);
    straw.rotation.set(Math.random(), Math.random() * Math.PI, Math.random());
  }

  // Horse
  addHorse(group, 4.5, -2.0, "#6b4530", -0.3);

  // Saddle stand
  const saddleStand = new THREE.Group();
  saddleStand.position.set(-2.8, 0, 0.8);
  for (const sx of [-1, 1]) addBox(saddleStand, 0.08, 0.95, 0.08, std("#46301f", { roughness: 0.8 }), sx * 0.35, 0.47, 0);
  addBox(saddleStand, 0.85, 0.08, 0.14, std("#46301f", { roughness: 0.8 }), 0, 0.92, 0);
  const saddle = addBox(saddleStand, 0.7, 0.22, 0.42, std("#5e3a23", { roughness: 0.72 }), 0, 1.05, 0);
  saddle.rotation.z = 0.05;
  group.add(saddleStand);

  // Ropes and buckets
  const rope = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.02, 5, 20), std("#a8804b", { roughness: 0.95 }));
  rope.rotation.x = Math.PI / 2;
  rope.position.set(-1.4, 0.9, 2.6);
  group.add(rope);
  addBarrel(group, 6.0, 2.0, 0.8);

  // Lanterns
  practicals.push(addLamp(group, -4.2, 3.1, -4.3, "#ffb35e", 18, 7, 1).light);
  practicals.push(addLamp(group, 4.6, 3.0, -4.3, "#ffb35e", 15, 7, 0.95).light);
  practicals.push(addLamp(group, -6.5, 2.8, 0.8, "#ffad55", 10, 5, 0.8).light);

  // Dust motes
  addDust(group, 120, [13, 4.5, 10], "#e9c58e", 0.032, 0.42);
  const dust = group.children.find((c) => c.isPoints && c.userData.animate);

  const env = finalizeEnvironment(group, {
    bg: "#1a120e",
    fog: { color: new THREE.Color("#1a120e"), near: 12, far: 32 },
    camera: { pos: new THREE.Vector3(0, 1.7, 5.0), target: new THREE.Vector3(0, 1.15, -0.2) },
    key,
    fill,
    practicals,
    exposure: 1.05,
  });
  env.dust = dust;
  env.hemi = hemi;
  return env;
}

// ————————————————————————————————————————————————
// MINE
// ————————————————————————————————————————————————

export function createMine() {
  const t = textures();
  const group = new THREE.Group();
  const practicals = [];

  addSky(group, t.skyDawn);
  addSun(group, -11, 8.5, -34, "#ffe1ad", 6.2);
  addMountains(group, "#4a3730", -26, 1.2);
  addStars(group, 20);

  const hemi = new THREE.HemisphereLight("#e4c8ae", "#3b2419", 0.9);
  group.add(hemi);

  const sunLight = new THREE.DirectionalLight("#ffd2a0", 2.1);
  sunLight.position.set(-7, 10, 6);
  sunLight.target.position.set(0, 1, -2);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.left = -10;
  sunLight.shadow.camera.right = 10;
  sunLight.shadow.camera.top = 8;
  sunLight.shadow.camera.bottom = -4;
  sunLight.shadow.camera.far = 28;
  sunLight.shadow.bias = -0.0008;
  group.add(sunLight, sunLight.target);

  const fill = new THREE.DirectionalLight("#7d92a2", 0.34);
  fill.position.set(6, 6, 8);
  group.add(fill);

  // Ground
  const ground = addPlane(group, 36, 26, std("#75513a", { roughness: 0.98, map: t.dirt }), 0, 0, -4);
  ground.rotation.x = -Math.PI / 2;

  // Mine entrance
  const mine = new THREE.Group();
  mine.position.set(0, 0, -4.6);
  const rockMat = std("#5a4436", { roughness: 0.95, map: t.rock, flatShading: true });
  const rockL = addBox(mine, 4.1, 5.8, 3.5, rockMat, -3.2, 2.9, 0);
  rockL.rotation.z = 0.08;
  const rockR = addBox(mine, 4.1, 5.8, 3.5, rockMat, 3.2, 2.9, 0);
  rockR.rotation.z = -0.08;
  const rockTop = addBox(mine, 5.4, 2.6, 3.5, rockMat, 0, 6.2, 0);
  rockTop.rotation.z = 0.02;

  // dark entrance
  const dark = addPlane(mine, 3.6, 3.8, basic("#070504"), 0, 2.0, 1.76);
  // timber frame
  const timber = std("#4a301e", { roughness: 0.82, map: t.wood });
  for (const sx of [-1, 1]) addBox(mine, 0.26, 4.5, 0.3, timber, sx * 2.05, 2.25, 1.84);
  addBox(mine, 4.6, 0.3, 0.3, timber, 0, 4.45, 1.84);
  addBox(mine, 4.2, 0.22, 0.22, timber, 0, 3.85, 1.9);
  addBox(mine, 0.18, 3.0, 0.18, timber, -0.9, 1.5, 1.92);
  addBox(mine, 0.18, 3.0, 0.18, timber, 0.9, 1.5, 1.92);
  const mineSign = addBox(mine, 3.6, 0.78, 0.08, std("#ffffff", { map: t.mineSign }), 0, 4.95, 1.94);
  mineSign.material.emissive = new THREE.Color("#a4793f");
  mineSign.material.emissiveIntensity = 0.11;
  group.add(mine);

  // Rocks around
  for (let i = 0; i < 14; i++) {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5 + Math.random() * 1.0, 0), rockMat);
    rock.position.set(-10 + Math.random() * 20, 0.2 + Math.random() * 0.3, -2 + Math.random() * 8);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.scale.y = 0.5 + Math.random() * 0.6;
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
  }

  // Mine cart and tracks
  const tracks = new THREE.Group();
  const railMat = std("#5a4a3c", { metalness: 0.75, roughness: 0.45 });
  for (const sx of [-0.65, 0.65]) {
    addBox(tracks, 0.08, 0.06, 10, railMat, sx, 0.07, 0);
    for (let i = 0; i < 9; i++) addBox(tracks, 0.12, 0.08, 0.12, std("#3a2b20", { roughness: 0.8 }), sx, 0.03, -4.4 + i * 1.1);
  }
  for (let i = 0; i < 18; i++) addBox(tracks, 1.65, 0.05, 0.16, std("#4a3424", { roughness: 0.8 }), 0, 0.04, -4.5 + i * 0.55);
  tracks.position.set(0, 0, 3.0);
  group.add(tracks);

  const cart = new THREE.Group();
  cart.position.set(1.4, 0.4, 2.9);
  addBox(cart, 1.4, 0.75, 1.0, std("#4b3323", { roughness: 0.78, map: t.wood }), 0, 0.38, 0);
  addBox(cart, 1.25, 0.08, 0.85, std("#2a1d15", { roughness: 0.8 }), 0, 0.71, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.08, 12), std("#2c211a", { metalness: 0.6, roughness: 0.5 }));
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(sx * 0.55, -0.2, sz * 0.38);
    cart.add(wheel);
  }
  const ore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), std("#8f7d64", { roughness: 0.9, metalness: 0.25 }));
  ore.position.set(0, 0.82, 0);
  ore.scale.y = 0.6;
  cart.add(ore);
  group.add(cart);

  // Crates / powder
  addCrate(group, -3.6, 0.3, 2.3, 0.6, 0.2);
  addCrate(group, -3.2, 0.88, 2.3, 0.5, -0.1);
  const powder = addBox(group, 0.65, 0.55, 0.55, std("#6f4a25", { roughness: 0.86 }), 3.7, 0.3, 2.0);
  addBox(group, 0.52, 0.06, 0.52, std("#c6a35f", { roughness: 0.8 }), 3.7, 0.56, 2.0);
  addBox(group, 0.65, 0.05, 0.06, std("#2c1c11", { roughness: 0.8 }), 3.7, 0.3, 2.28);

  // Lanterns
  practicals.push(addLamp(group, -2.8, 3.2, 1.9, "#ffb45c", 20, 8, 1).light);
  practicals.push(addLamp(group, 2.8, 3.1, 1.7, "#ffb45c", 16, 8, 0.95).light);

  // warm glow inside mine
  const glow = new THREE.PointLight("#ff8f43", 22, 8, 1.6);
  glow.position.set(0, 2.1, -3.0);
  group.add(glow);
  practicals.push(glow);

  // cacti and scrub
  addCactus(group, -8.5, 3.0, 1.0, "#3b4a32");
  addCactus(group, 8.0, 4.0, 0.8, "#3a4830");

  addDust(group, 120, [18, 7, 12], "#f0c88d", 0.04, 0.42);
  const dust = group.children.find((c) => c.isPoints && c.userData.animate);

  const env = finalizeEnvironment(group, {
    bg: "#35272b",
    fog: { color: new THREE.Color("#5d4032"), near: 14, far: 38 },
    camera: { pos: new THREE.Vector3(0, 1.78, 5.5), target: new THREE.Vector3(0, 1.3, -0.8) },
    key: sunLight,
    fill,
    practicals,
    exposure: 1.08,
  });
  env.dust = dust;
  env.hemi = hemi;
  return env;
}

export function createEnvironment(name) {
  switch (name) {
    case "streetDusk":
      return createStreet("dusk");
    case "streetDawn":
      return createStreet("dawn");
    case "saloon":
      return createSaloon("night");
    case "saloonNight":
      return createSaloon("night");
    case "saloonDawn":
      return createSaloon("dawn");
    case "clinic":
      return createClinic("night");
    case "clinicDawn":
      return createClinic("dawn");
    case "stable":
      return createStable();
    case "mine":
      return createMine();
    default:
      return createSaloon("night");
  }
}

export function animateEnvironment(env, time) {
  if (!env) return;
  if (env.dust) {
    const pos = env.dust.geometry.attributes.position;
    const base = env.dust.userData.base;
    const phases = env.dust.userData.phases;
    for (let i = 0; i < pos.count; i++) {
      const phase = phases[i];
      pos.array[i * 3] = base[i * 3] + Math.sin(time * 0.13 + phase) * 0.45;
      pos.array[i * 3 + 1] = base[i * 3 + 1] + Math.sin(time * 0.22 + phase * 1.7) * 0.28;
      pos.array[i * 3 + 2] = base[i * 3 + 2] + Math.cos(time * 0.11 + phase) * 0.35;
    }
    pos.needsUpdate = true;
  }
  if (env.tumble) {
    env.tumble.rotation.x = time * 0.22;
    env.tumble.rotation.z = time * 0.17;
    env.tumble.position.x = -2.2 + Math.sin(time * 0.06) * 3.4;
    env.tumble.position.z = 3.2 + Math.cos(time * 0.05) * 0.8;
    env.tumble.position.y = 0.32 + Math.abs(Math.sin(time * 0.9)) * 0.08;
  }
  if (env.group.userData.flames) {
    env.group.userData.flames.forEach((flame, i) => {
      const flicker = 0.85 + Math.sin(time * 11 + i * 2.3) * 0.15 + Math.sin(time * 17 + i) * 0.08;
      flame.scale.set(flicker, 1.5 + flicker * 0.3, flicker);
      if (flame.material) flame.material.opacity = 0.8 + flicker * 0.2;
    });
  }
  if (env.practicals) {
    env.practicals.forEach((light, i) => {
      if (!light.isLight) return;
      const base = light.userData.baseIntensity ?? (light.userData.baseIntensity = light.intensity);
      light.intensity = base * (0.94 + Math.sin(time * 8.4 + i * 1.9) * 0.035 + Math.sin(time * 13.7 + i) * 0.025);
    });
  }
}
