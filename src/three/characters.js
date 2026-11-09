import * as THREE from "three";

const TAU = Math.PI * 2;

function mat(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.66,
    metalness: options.metalness ?? 0,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide,
    flatShading: options.flatShading ?? false,
  });
}

function physical(color, options = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: options.roughness ?? 0.48,
    metalness: options.metalness ?? 0.04,
    sheen: options.sheen ?? 0.45,
    sheenRoughness: 0.7,
    sheenColor: new THREE.Color(options.sheenColor ?? "#ffffff"),
    clearcoat: options.clearcoat ?? 0,
    clearcoatRoughness: 0.4,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide,
  });
}

function capsule(radius, length, material, segments = 12) {
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 6, segments), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cylinder(rTop, rBottom, height, material, segments = 16) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, height, segments), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function sphere(radius, material, width = 24, height = 18) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, width, height), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function box(w, h, d, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function limb(radiusTop, radiusBottom, length, material, segments = 10) {
  const g = new THREE.CylinderGeometry(radiusTop, radiusBottom, length, segments);
  g.translate(0, -length / 2, 0);
  const mesh = new THREE.Mesh(g, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeSkirt({ waist, hem, length, color, trim, sheen = 0.3 }) {
  const group = new THREE.Group();
  const points = [];
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = -t * length;
    const flare = waist + (hem - waist) * Math.pow(t, 1.55);
    points.push(new THREE.Vector2(flare, y));
  }
  const geo = new THREE.LatheGeometry(points, 40);
  const material = physical(color, { roughness: 0.64, sheen, sheenColor: trim });
  const skirt = new THREE.Mesh(geo, material);
  skirt.castShadow = true;
  skirt.receiveShadow = true;
  skirt.scale.z = 0.8;
  group.add(skirt);

  // Hem shadow and trim
  const trimRing = new THREE.Mesh(
    new THREE.TorusGeometry(hem - 0.012, 0.009, 6, 50),
    mat(trim, { roughness: 0.42, metalness: 0.35 })
  );
  trimRing.rotation.x = Math.PI / 2;
  trimRing.position.y = -length + 0.01;
  trimRing.scale.z = 0.8;
  group.add(trimRing);

  // apron / over-skirt panel
  const panelShape = new THREE.Shape();
  panelShape.moveTo(-waist * 0.7, 0);
  panelShape.lineTo(waist * 0.7, 0);
  panelShape.lineTo(hem * 0.55, -length * 0.94);
  panelShape.quadraticCurveTo(0, -length * 1.02, -hem * 0.55, -length * 0.94);
  panelShape.closePath();
  const panel = new THREE.Mesh(
    new THREE.ShapeGeometry(panelShape, 20),
    physical(trim, { roughness: 0.62, sheen: 0.45, transparent: true, opacity: 0.24, side: THREE.DoubleSide })
  );
  panel.position.set(0, 0.005, waist * 0.78);
  panel.castShadow = false;
  group.add(panel);
  return group;
}

function makeFace(skin, hairColor, eyeColor, lipColor) {
  const group = new THREE.Group();
  const eyeGroups = [];
  const eyeWhiteMat = mat("#f3e7d4", { roughness: 0.35 });
  const irisMat = mat(eyeColor, { roughness: 0.25, emissive: eyeColor, emissiveIntensity: 0.12 });
  const pupilMat = mat("#120b09", { roughness: 0.2 });
  const browMat = mat(hairColor, { roughness: 0.7 });

  for (const side of [-1, 1]) {
    const eye = new THREE.Group();
    eye.position.set(side * 0.057, 0.032, 0.147);
    const white = sphere(0.033, eyeWhiteMat, 16, 12);
    white.scale.set(1, 1.02, 0.45);
    eye.add(white);
    const iris = sphere(0.0145, irisMat, 14, 12);
    iris.position.set(0, 0, 0.015);
    iris.scale.set(1, 1, 0.5);
    eye.add(iris);
    const pupil = sphere(0.0065, pupilMat, 10, 8);
    pupil.position.set(0, 0, 0.021);
    pupil.scale.set(1, 1, 0.35);
    eye.add(pupil);
    const glint = sphere(0.0032, mat("#fff9ef", { emissive: "#fff6e3", emissiveIntensity: 0.8, roughness: 0.1 }), 8, 6);
    glint.position.set(-0.004, 0.005, 0.026);
    eye.add(glint);
    eye.userData.baseScaleY = 1;
    group.add(eye);
    eyeGroups.push(eye);

    const brow = box(0.06, 0.009, 0.012, browMat);
    brow.position.set(side * 0.058, 0.081, 0.146);
    brow.rotation.z = side * 0.09;
    brow.castShadow = false;
    group.add(brow);

    // lashes
    const lash = box(0.064, 0.004, 0.006, mat("#1d100e", { roughness: 0.4 }));
    lash.position.set(side * 0.057, 0.049, 0.169);
    lash.rotation.z = side * 0.05;
    lash.castShadow = false;
    group.add(lash);

    const blush = new THREE.Mesh(
      new THREE.CircleGeometry(0.026, 20),
      new THREE.MeshBasicMaterial({ color: "#be6558", transparent: true, opacity: 0.13, depthWrite: false })
    );
    blush.position.set(side * 0.087, 0.005, 0.143);
    blush.scale.set(1, 0.55, 1);
    group.add(blush);
  }

  const nose = sphere(0.018, skin, 12, 10);
  nose.scale.set(0.6, 0.85, 0.8);
  nose.position.set(0, -0.006, 0.164);
  group.add(nose);

  const mouth = new THREE.Group();
  mouth.position.set(0, -0.064, 0.151);
  const upperLip = sphere(0.032, mat(lipColor, { roughness: 0.4 }), 16, 10);
  upperLip.scale.set(1, 0.24, 0.22);
  upperLip.position.y = 0.003;
  mouth.add(upperLip);
  const lowerLip = sphere(0.028, mat(lipColor, { roughness: 0.36 }), 16, 10);
  lowerLip.scale.set(1, 0.3, 0.3);
  lowerLip.position.y = -0.009;
  mouth.add(lowerLip);
  group.add(mouth);

  const chin = sphere(0.036, skin, 12, 10);
  chin.scale.set(1, 0.55, 0.7);
  chin.position.set(0, -0.113, 0.128);
  group.add(chin);

  return { group, eyeGroups, browMat, mouth, upperLip, lowerLip };
}

function addHair(character, style, hair, hairDark, hairLight, head) {
  const capMat = physical(hair, { roughness: 0.52, sheen: 0.75, sheenColor: hairLight });
  const darkMat = physical(hairDark, { roughness: 0.6, sheen: 0.5, sheenColor: hair });
  const lightMat = physical(hairLight, { roughness: 0.45, sheen: 0.7, sheenColor: hairLight });

  const back = sphere(0.17, capMat, 26, 22);
  back.scale.set(1.04, 1.12, 1.0);
  back.position.set(0, 0.018, -0.026);
  head.add(back);

  const crown = sphere(0.13, capMat, 20, 18);
  crown.scale.set(1.2, 0.7, 1.1);
  crown.position.set(0, 0.135, -0.01);
  head.add(crown);

  const sideLocks = [];
  for (const side of [-1, 1]) {
    const lock = capsule(0.045, 0.16, capMat, 10);
    lock.scale.set(0.7, 1, 0.62);
    lock.position.set(side * 0.145, -0.01, -0.005);
    lock.rotation.z = side * -0.2;
    head.add(lock);
    sideLocks.push(lock);

    const fringe = sphere(0.07, lightMat, 16, 12);
    fringe.scale.set(0.9, 0.6, 0.5);
    fringe.position.set(side * 0.05, 0.115, 0.122);
    fringe.rotation.z = side * -0.4;
    head.add(fringe);
  }

  if (style === "clem") {
    // Voluminous auburn updo and ringlets
    const bun = sphere(0.105, capMat, 20, 16);
    bun.scale.set(1.1, 0.9, 1.0);
    bun.position.set(0, 0.105, -0.14);
    head.add(bun);
    const bunTop = sphere(0.078, lightMat, 18, 14);
    bunTop.scale.set(1, 0.82, 0.95);
    bunTop.position.set(0.02, 0.17, -0.09);
    head.add(bunTop);

    for (let i = 0; i < 5; i++) {
      const a = -0.8 + i * 0.4;
      const curl = new THREE.Mesh(
        new THREE.TorusGeometry(0.045 + (i % 2) * 0.012, 0.018, 6, 16, Math.PI * 1.25),
        i % 2 ? darkMat : capMat
      );
      curl.position.set(Math.sin(a) * 0.19, 0.04 - i * 0.035, 0.06 + Math.cos(a) * 0.06);
      curl.rotation.set(0.5, a, 0.6);
      curl.castShadow = true;
      head.add(curl);
    }

    const curl = capsule(0.03, 0.2, capMat, 8);
    curl.scale.set(0.7, 1, 0.65);
    curl.position.set(0.165, -0.1, 0.02);
    curl.rotation.z = 0.1;
    head.add(curl);
  }

  if (style === "ada") {
    // Severe low chignon with a silver streak
    const chignon = sphere(0.09, capMat, 20, 16);
    chignon.scale.set(1.0, 1.1, 0.9);
    chignon.position.set(0, -0.07, -0.17);
    head.add(chignon);
    const pin = cylinder(0.005, 0.005, 0.28, mat("#d2a453", { metalness: 0.9, roughness: 0.28 }), 8);
    pin.rotation.z = Math.PI / 2.35;
    pin.position.set(0.02, 0.005, -0.15);
    head.add(pin);

    const streak = capsule(0.024, 0.18, mat("#d8d1c2", { roughness: 0.42 }), 8);
    streak.scale.set(0.65, 1, 0.5);
    streak.position.set(-0.14, 0.0, 0.055);
    streak.rotation.z = -0.16;
    head.add(streak);

    const fringe = sphere(0.075, capMat, 16, 12);
    fringe.scale.set(1.2, 0.34, 0.5);
    fringe.position.set(0.02, 0.13, 0.1);
    fringe.rotation.z = -0.25;
    head.add(fringe);
  }

  if (style === "rosa") {
    // Long loose waves
    const backMass = sphere(0.17, capMat, 24, 20);
    backMass.scale.set(1.12, 1.5, 0.9);
    backMass.position.set(0, -0.16, -0.1);
    head.add(backMass);

    for (let i = 0; i < 9; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const wave = new THREE.Mesh(
        new THREE.TorusGeometry(0.055 + (i % 3) * 0.013, 0.022, 6, 14, Math.PI * 1.4),
        i % 3 === 0 ? lightMat : i % 2 === 0 ? capMat : darkMat
      );
      wave.position.set(side * (0.12 + (i % 3) * 0.022), -0.05 - i * 0.045, -0.1 + (i % 2) * 0.05);
      wave.rotation.set(0.2 + i * 0.1, side * 0.5, 0.7);
      wave.castShadow = true;
      head.add(wave);
    }

    const frontWave = capsule(0.035, 0.25, capMat, 8);
    frontWave.scale.set(0.75, 1, 0.65);
    frontWave.position.set(-0.135, -0.12, 0.11);
    frontWave.rotation.z = -0.1;
    head.add(frontWave);
  }

  return { sideLocks };
}

function addHat(head, style, colors) {
  const group = new THREE.Group();
  const felt = physical(colors.hat, { roughness: 0.72, sheen: 0.35, sheenColor: colors.band });
  const brim = cylinder(0.34, 0.355, 0.018, felt, 32);
  brim.scale.z = 0.88;
  brim.position.y = 0.21;
  brim.rotation.z = style === "rosa" ? 0.05 : 0.02;
  group.add(brim);

  // Slight upturn at the sides
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.345, 0.01, 6, 48), felt);
  rim.rotation.x = Math.PI / 2;
  rim.scale.z = 0.88;
  rim.position.y = 0.218;
  group.add(rim);

  const crown = cylinder(0.145, 0.185, 0.17, felt, 24);
  crown.position.y = 0.295;
  group.add(crown);

  const dent = new THREE.Mesh(new THREE.SphereGeometry(0.11, 18, 12, 0, TAU, 0, Math.PI / 2.1), felt);
  dent.scale.set(1.1, 0.6, 0.9);
  dent.position.set(0, 0.37, 0.02);
  dent.rotation.x = Math.PI;
  group.add(dent);

  const band = cylinder(0.188, 0.19, 0.035, mat(colors.band, { metalness: 0.55, roughness: 0.36 }), 24);
  band.position.y = 0.235;
  group.add(band);

  if (style === "rosa") {
    const concha = cylinder(0.023, 0.023, 0.012, mat("#c7c3b7", { metalness: 0.8, roughness: 0.32 }), 12);
    concha.rotation.x = Math.PI / 2;
    concha.position.set(0, 0.245, 0.19);
    group.add(concha);
  }

  head.add(group);
  return group;
}

export function createCharacter(id) {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const palettes = {
    clem: {
      skin: "#e8b89d",
      skinShade: "#cf957c",
      hair: "#8e3a23",
      hairDark: "#5c2114",
      hairLight: "#c66a42",
      dress: "#6d202b",
      dressDark: "#451018",
      trim: "#c49a50",
      hat: "#2a1d19",
      band: "#b8893f",
      lips: "#9d3f3d",
      eye: "#6b3b24",
      metal: "#d2a453",
      accent: "#d2644c",
    },
    ada: {
      skin: "#efcbb1",
      skinShade: "#d8ab90",
      hair: "#2b201f",
      hairDark: "#170f0f",
      hairLight: "#6b5550",
      dress: "#1d4446",
      dressDark: "#10292b",
      trim: "#b8cec4",
      hat: "#1a2b2c",
      band: "#9ebbb2",
      lips: "#8b4a4e",
      eye: "#467a70",
      metal: "#c9b06d",
      accent: "#70a9a0",
    },
    rosa: {
      skin: "#c98763",
      skinShade: "#a96b4c",
      hair: "#2a1714",
      hairDark: "#160b09",
      hairLight: "#6d3c2c",
      dress: "#9c3c2f",
      dressDark: "#632118",
      trim: "#c9a052",
      hat: "#4a3326",
      band: "#3aa99d",
      lips: "#8e3435",
      eye: "#4a2b1c",
      metal: "#d4a64c",
      accent: "#d8a14d",
    },
  };
  const p = palettes[id];

  const skin = physical(p.skin, { roughness: 0.54, sheen: 0.22 });
  const skinShade = mat(p.skinShade, { roughness: 0.58 });
  const hairMat = physical(p.hair, { roughness: 0.52, sheen: 0.6 });
  const dressMat = physical(p.dress, { roughness: 0.64, sheen: 0.5, sheenColor: p.trim });
  const dressDarkMat = physical(p.dressDark, { roughness: 0.7, sheen: 0.35 });
  const trimMat = mat(p.trim, { roughness: 0.4, metalness: 0.3 });
  const leather = mat("#3a2419", { roughness: 0.74 });
  const bootMat = mat("#21140f", { roughness: 0.62 });
  const metal = mat(p.metal, { metalness: 0.78, roughness: 0.3 });

  // Lower body
  const legs = new THREE.Group();
  legs.position.y = 0.92;
  body.add(legs);

  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(side * 0.095, 0, 0);
    const upper = limb(0.068, 0.055, 0.42, id === "rosa" ? mat("#31343a", { roughness: 0.8 }) : mat(p.skinShade, { roughness: 0.6 }));
    upper.rotation.z = side * -0.025;
    leg.add(upper);
    const knee = new THREE.Group();
    knee.position.y = -0.42;
    leg.add(knee);
    const lower = limb(0.052, 0.042, 0.39, id === "rosa" ? mat("#31343a", { roughness: 0.8 }) : mat(p.skinShade, { roughness: 0.6 }));
    knee.add(lower);
    const boot = new THREE.Group();
    boot.position.y = -0.37;
    const shaft = cylinder(0.058, 0.052, 0.18, bootMat, 12);
    shaft.position.y = 0.07;
    boot.add(shaft);
    const foot = box(0.095, 0.06, 0.17, bootMat);
    foot.position.set(0, -0.015, 0.04);
    boot.add(foot);
    const toe = sphere(0.047, bootMat, 12, 8);
    toe.scale.set(1, 0.6, 1.3);
    toe.position.set(0, -0.02, 0.12);
    boot.add(toe);
    const heel = box(0.05, 0.045, 0.045, bootMat);
    heel.position.set(0, -0.04, -0.035);
    boot.add(heel);
    knee.add(boot);
    legs.add(leg);
  }

  if (id === "rosa") {
    const pantsWaist = cylinder(0.185, 0.165, 0.09, mat("#31343a", { roughness: 0.8 }), 20);
    pantsWaist.position.y = 0.96;
    body.add(pantsWaist);
  } else {
    const skirtLength = id === "clem" ? 0.93 : 0.9;
    const skirt = makeSkirt({
      waist: 0.175,
      hem: id === "clem" ? 0.43 : 0.35,
      length: skirtLength,
      color: p.dress,
      trim: p.trim,
      sheen: 0.55,
    });
    skirt.position.y = 0.94;
    body.add(skirt);

    if (id === "clem") {
      const bustle = sphere(0.2, dressDarkMat, 20, 16);
      bustle.scale.set(1.1, 0.7, 0.8);
      bustle.position.set(0, 0.82, -0.17);
      body.add(bustle);
      const sash = new THREE.Mesh(new THREE.TorusGeometry(0.205, 0.018, 6, 36), trimMat);
      sash.rotation.x = Math.PI / 2;
      sash.position.y = 0.96;
      sash.scale.z = 0.8;
      body.add(sash);
    } else {
      const apron = new THREE.Mesh(
        new THREE.CylinderGeometry(0.23, 0.31, 0.78, 24, 1, true, -1.15, 2.3),
        physical("#e3d8bd", { roughness: 0.78, sheen: 0.25, transparent: true, opacity: 0.94, side: THREE.DoubleSide })
      );
      apron.position.set(0, 0.54, 0.065);
      apron.scale.z = 0.82;
      body.add(apron);
    }
  }

  // Torso
  const torso = new THREE.Group();
  torso.position.y = 0.92;
  body.add(torso);

  const torsoPoints = [
    new THREE.Vector2(0.155, 0.0),
    new THREE.Vector2(0.145, 0.11),
    new THREE.Vector2(0.165, 0.27),
    new THREE.Vector2(0.205, 0.39),
    new THREE.Vector2(0.235, 0.46),
    new THREE.Vector2(0.215, 0.5),
    new THREE.Vector2(0.14, 0.53),
  ];
  const torsoGeo = new THREE.LatheGeometry(torsoPoints, 32);
  const torsoMesh = new THREE.Mesh(torsoGeo, id === "rosa" ? mat(p.dress, { roughness: 0.78 }) : dressMat);
  torsoMesh.scale.z = 0.68;
  torsoMesh.castShadow = true;
  torsoMesh.receiveShadow = true;
  torso.add(torsoMesh);

  // neckline / blouse details
  if (id === "clem") {
    const corset = new THREE.Mesh(
      new THREE.CylinderGeometry(0.162, 0.185, 0.32, 24, 1, true),
      physical("#3a1018", { roughness: 0.58, sheen: 0.55, sheenColor: p.trim })
    );
    corset.scale.z = 0.72;
    corset.position.y = 0.2;
    torso.add(corset);

    for (let i = -2; i <= 2; i++) {
      const bone = box(0.012, 0.3, 0.03, mat(p.trim, { metalness: 0.45, roughness: 0.44 }));
      bone.position.set(i * 0.052, 0.2, 0.13);
      torso.add(bone);
    }

    const neckline = new THREE.Mesh(
      new THREE.TorusGeometry(0.115, 0.013, 8, 28, Math.PI),
      trimMat
    );
    neckline.rotation.set(Math.PI / 2, 0, Math.PI);
    neckline.position.set(0, 0.49, 0.036);
    neckline.scale.z = 0.7;
    torso.add(neckline);
  }

  if (id === "ada") {
    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.095, 0.11, 0.045, 20),
      physical("#e5dbc5", { roughness: 0.75, sheen: 0.3 })
    );
    collar.position.y = 0.515;
    torso.add(collar);
    const cameo = new THREE.Mesh(new THREE.CircleGeometry(0.035, 22), mat("#c9b06d", { metalness: 0.5, roughness: 0.32 }));
    cameo.position.set(0, 0.435, 0.152);
    torso.add(cameo);
    const cameoInner = new THREE.Mesh(new THREE.CircleGeometry(0.025, 22), mat("#d8cfbb", { roughness: 0.4 }));
    cameoInner.position.set(0, 0.435, 0.154);
    torso.add(cameoInner);
    const buttons = [];
    for (let i = 0; i < 5; i++) {
      const button = sphere(0.009, trimMat, 8, 6);
      button.position.set(0, 0.38 - i * 0.07, 0.145 - i * 0.007);
      torso.add(button);
      buttons.push(button);
    }
  }

  if (id === "rosa") {
    const shirt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.19, 0.18, 0.35, 24, 1, true),
      physical(p.dress, { roughness: 0.72, sheen: 0.4 })
    );
    shirt.scale.z = 0.68;
    shirt.position.y = 0.3;
    torso.add(shirt);

    const vest = new THREE.Mesh(
      new THREE.CylinderGeometry(0.203, 0.19, 0.38, 24, 1, true),
      physical("#4a2d20", { roughness: 0.7, sheen: 0.3 })
    );
    vest.scale.z = 0.71;
    vest.position.y = 0.28;
    torso.add(vest);

    const vShape = new THREE.Shape();
    vShape.moveTo(-0.12, 0.48);
    vShape.lineTo(0.12, 0.48);
    vShape.lineTo(0.06, 0.23);
    vShape.lineTo(0, 0.12);
    vShape.lineTo(-0.06, 0.23);
    vShape.closePath();
    const vPanel = new THREE.Mesh(
      new THREE.ShapeGeometry(vShape),
      mat(p.dress, { side: THREE.DoubleSide })
    );
    vPanel.position.set(0, 0.02, 0.148);
    torso.add(vPanel);

    const necklace = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.007, 6, 20, Math.PI), mat("#3aa99d", { metalness: 0.4, roughness: 0.4 }));
    necklace.rotation.set(Math.PI / 2, 0, Math.PI);
    necklace.position.set(0, 0.47, 0.055);
    necklace.scale.z = 0.7;
    torso.add(necklace);
    const pendant = sphere(0.016, mat("#3aa99d", { roughness: 0.38, metalness: 0.25 }), 12, 10);
    pendant.position.set(0, 0.39, 0.145);
    torso.add(pendant);
  }

  // Arms
  const armGroups = [];
  const hands = [];
  for (const side of [-1, 1]) {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.225, 0.445, 0);
    torso.add(shoulder);
    const shoulderCap = sphere(0.067, id === "rosa" ? mat(p.dress, { roughness: 0.75 }) : dressMat, 14, 12);
    shoulderCap.scale.set(1, 0.9, 0.9);
    shoulder.add(shoulderCap);

    const upper = limb(0.054, 0.045, 0.27, id === "rosa" ? mat(p.dress, { roughness: 0.75 }) : dressMat);
    upper.rotation.z = side * 0.04;
    shoulder.add(upper);

    const elbow = new THREE.Group();
    elbow.position.y = -0.27;
    shoulder.add(elbow);

    const lower = limb(0.043, 0.033, 0.25, id === "clem" ? mat(p.skin, { roughness: 0.58 }) : id === "ada" ? mat("#d9d0bd", { roughness: 0.7 }) : mat(p.skin, { roughness: 0.58 }));
    elbow.add(lower);

    if (id === "clem") {
      const bangle = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.008, 6, 14), metal);
      bangle.rotation.x = Math.PI / 2;
      bangle.position.y = -0.2;
      elbow.add(bangle);
    }

    const hand = new THREE.Group();
    hand.position.y = -0.255;
    const palm = sphere(0.045, skin, 14, 12);
    palm.scale.set(0.8, 1.1, 0.55);
    hand.add(palm);
    for (let f = 0; f < 4; f++) {
      const finger = capsule(0.0095, 0.035, skin, 6);
      finger.position.set((f - 1.5) * 0.017, -0.035, 0.005);
      finger.rotation.x = 0.1;
      hand.add(finger);
    }
    const thumb = capsule(0.011, 0.027, skin, 6);
    thumb.position.set(side * 0.037, -0.012, 0.008);
    thumb.rotation.z = side * 0.65;
    hand.add(thumb);
    elbow.add(hand);
    armGroups.push({ side, shoulder, elbow, hand });
    hands.push(hand);
  }

  // Poses
  const [leftArm, rightArm] = armGroups; // side -1 then +1
  if (id === "clem") {
    leftArm.shoulder.rotation.set(0.1, 0, -0.38);
    leftArm.elbow.rotation.set(0.05, 0.2, -1.28);
    leftArm.hand.rotation.z = -0.3;
    rightArm.shoulder.rotation.set(-0.12, 0, 0.22);
    rightArm.elbow.rotation.set(-0.35, 0, 0.16);
    rightArm.hand.rotation.x = -0.2;
  } else if (id === "ada") {
    leftArm.shoulder.rotation.set(-0.24, 0.05, -0.18);
    leftArm.elbow.rotation.set(-0.78, 0.2, -0.28);
    leftArm.hand.rotation.set(-0.2, 0, -0.2);
    rightArm.shoulder.rotation.set(-0.24, -0.05, 0.18);
    rightArm.elbow.rotation.set(-0.78, -0.2, 0.28);
    rightArm.hand.rotation.set(-0.2, 0, 0.2);
  } else {
    leftArm.shoulder.rotation.set(-0.06, 0, -0.14);
    leftArm.elbow.rotation.set(-0.18, 0, -0.1);
    rightArm.shoulder.rotation.set(0.1, 0, 0.36);
    rightArm.elbow.rotation.set(-0.5, 0, 0.9);
    rightArm.hand.rotation.z = 0.2;
  }

  // Head
  const neck = cylinder(0.052, 0.06, 0.12, skin, 14);
  neck.position.y = 1.46;
  body.add(neck);

  const head = new THREE.Group();
  head.position.y = 1.62;
  body.add(head);

  const skull = sphere(0.158, skin, 32, 26);
  skull.scale.set(0.98, 1.13, 0.94);
  head.add(skull);

  const jaw = sphere(0.115, skin, 20, 16);
  jaw.scale.set(0.9, 0.68, 0.82);
  jaw.position.set(0, -0.095, 0.018);
  head.add(jaw);

  for (const side of [-1, 1]) {
    const ear = sphere(0.036, skin, 12, 10);
    ear.scale.set(0.45, 1, 0.6);
    ear.position.set(side * 0.155, 0.005, 0);
    head.add(ear);
    const earring = sphere(0.011, metal, 10, 8);
    earring.position.set(side * 0.162, -0.05, 0.005);
    earring.scale.set(1, 1.5, 0.7);
    head.add(earring);
  }

  const face = makeFace(skin, p.hair, p.eye, p.lips);
  face.group.position.set(0, -0.005, 0);
  head.add(face.group);

  const hair = addHair(body, id, p.hair, p.hairDark, p.hairLight, head);

  if (id !== "ada") addHat(head, id, p);
  else {
    // Ada gets a small silver comb instead of a hat
    const comb = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const tine = box(0.007, 0.075, 0.01, metal);
      tine.position.set((i - 2) * 0.013, 0.1, 0.02);
      tine.rotation.z = (i - 2) * 0.04;
      comb.add(tine);
    }
    comb.position.set(0.11, 0.1, 0.02);
    comb.rotation.z = -0.42;
    head.add(comb);
  }

  // Accessories
  if (id === "clem") {
    const choker = new THREE.Mesh(new THREE.TorusGeometry(0.064, 0.009, 6, 20), mat("#291018", { roughness: 0.5 }));
    choker.rotation.x = Math.PI / 2;
    choker.position.y = 1.505;
    choker.scale.z = 0.7;
    body.add(choker);
    const gem = sphere(0.012, mat("#b52d3f", { emissive: "#6d0d1b", emissiveIntensity: 0.3, roughness: 0.25 }), 10, 8);
    gem.position.set(0, 1.49, 0.062);
    body.add(gem);
  }

  if (id === "ada") {
    // spectacles
    const glasses = new THREE.Group();
    for (const side of [-1, 1]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.0045, 5, 24), mat("#c9b06d", { metalness: 0.75, roughness: 0.32 }));
      ring.position.set(side * 0.058, 0.028, 0.176);
      ring.scale.set(1, 0.9, 1);
      glasses.add(ring);
    }
    const bridge = cylinder(0.003, 0.003, 0.03, mat("#c9b06d", { metalness: 0.8, roughness: 0.3 }), 6);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.03, 0.176);
    glasses.add(bridge);
    const chain = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.003, 4, 18, Math.PI * 0.85), mat("#c9b06d", { metalness: 0.8, roughness: 0.3 }));
    chain.position.set(0.12, -0.02, 0.12);
    chain.rotation.z = -0.65;
    glasses.add(chain);
    head.add(glasses);
  }

  if (id === "rosa") {
    // Gun belt and holster
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.21, 0.06, 24, 1, true), leather);
    belt.scale.z = 0.78;
    belt.position.y = 0.93;
    body.add(belt);
    const buckle = box(0.055, 0.04, 0.012, metal);
    buckle.position.set(0, 0.93, 0.166);
    body.add(buckle);

    for (let i = 0; i < 6; i++) {
      const bullet = cylinder(0.007, 0.007, 0.025, mat("#c99a46", { metalness: 0.8, roughness: 0.28 }), 8);
      bullet.position.set(-0.13 + i * 0.045, 0.945, 0.162);
      bullet.rotation.z = Math.PI / 2;
      body.add(bullet);
    }

    const holster = box(0.065, 0.17, 0.05, leather);
    holster.position.set(0.205, 0.82, -0.01);
    holster.rotation.z = -0.12;
    body.add(holster);

    const gunGrip = box(0.035, 0.085, 0.025, mat("#4a2c1f", { roughness: 0.6 }));
    gunGrip.position.set(0.218, 0.92, 0.005);
    gunGrip.rotation.z = -0.2;
    body.add(gunGrip);
  }

  root.userData.parts = {
    body,
    torso,
    head,
    face,
    leftArm,
    rightArm,
    hands,
    hair,
  };
  root.userData.id = id;
  root.userData.time = 0;
  root.userData.blinkAt = 2 + Math.random() * 3;
  root.userData.blinkUntil = 0;
  root.userData.mood = "neutral";
  root.userData.speaking = false;
  root.userData.phase = Math.random() * TAU;

  root.userData.setMood = (mood = "neutral") => {
    root.userData.mood = mood;
    const m = mood.toLowerCase();
    const brows = [face.eyeGroups[0], face.eyeGroups[1]];
    // Reset
    face.group.children.forEach((child) => {
      if (child.geometry?.type === "BoxGeometry" && child.position.y > 0.07 && Math.abs(child.position.x) < 0.1) {
        child.rotation.z = Math.sign(child.position.x) * 0.09;
        child.position.y = 0.081;
      }
    });
    face.mouth.rotation.z = 0;
    face.upperLip.scale.set(1, 0.24, 0.22);
    face.lowerLip.scale.set(1, 0.3, 0.3);
    face.mouth.position.y = -0.064;
    face.eyeGroups.forEach((eye) => {
      eye.scale.set(1, 1, 1);
    });

    const browBoxes = face.group.children.filter(
      (child) => child.geometry?.type === "BoxGeometry" && child.position.y > 0.07 && Math.abs(child.position.x) < 0.1
    );

    if (/(soft|tender|warm|love|intimat|smitten|relieved|hopeful|sad|hurt|frightened|afraid|grieving|quiet)/.test(m)) {
      browBoxes.forEach((brow) => {
        brow.rotation.z = Math.sign(brow.position.x) * -0.06;
        brow.position.y = 0.086;
      });
      face.upperLip.scale.set(1.14, 0.3, 0.24);
      face.lowerLip.scale.set(1.08, 0.38, 0.32);
      face.eyeGroups.forEach((eye) => {
        eye.scale.y = 0.9;
      });
    }

    if (/(smil|sly|grin|delight|amuse|confident|hostess|fierce|danger|playful|teasing|predator)/.test(m)) {
      face.mouth.rotation.z = 0.055;
      face.upperLip.scale.set(1.2, 0.28, 0.23);
      face.lowerLip.scale.set(1.06, 0.4, 0.32);
      face.mouth.position.y = -0.061;
      browBoxes.forEach((brow, i) => {
        if (i === 1) {
          brow.rotation.z = -0.14;
          brow.position.y = 0.089;
        }
      });
    }

    if (/(angry|furious|possessive|stern|determined|hard|cold|clinical|professional)/.test(m)) {
      browBoxes.forEach((brow) => {
        brow.rotation.z = Math.sign(brow.position.x) * 0.2;
        brow.position.y = 0.076;
      });
      face.upperLip.scale.set(0.92, 0.22, 0.22);
      face.lowerLip.scale.set(0.88, 0.26, 0.28);
      face.eyeGroups.forEach((eye) => {
        eye.scale.y = 0.94;
      });
    }

    if (/(hurt|sad|grieving|frightened|afraid|wound|sorry)/.test(m)) {
      browBoxes.forEach((brow) => {
        brow.rotation.z = Math.sign(brow.position.x) * -0.21;
        brow.position.y = 0.083;
      });
      face.upperLip.scale.set(0.95, 0.25, 0.22);
      face.lowerLip.scale.set(0.92, 0.26, 0.26);
      face.mouth.position.y = -0.067;
    }
  };

  root.userData.setSpeaking = (speaking) => {
    root.userData.speaking = speaking;
  };

  root.userData.update = (time, dt) => {
    const parts = root.userData.parts;
    const phase = root.userData.phase;
    const breathing = Math.sin(time * 1.4 + phase) * 0.006;
    parts.torso.position.y = 0.92 + breathing;
    parts.torso.scale.y = 1 + breathing * 1.5;
    parts.body.rotation.z = Math.sin(time * 0.48 + phase) * 0.006;
    parts.body.position.y = Math.sin(time * 0.65 + phase) * 0.004;
    parts.head.rotation.y = Math.sin(time * 0.33 + phase) * 0.035;
    parts.head.rotation.x = Math.sin(time * 0.47 + phase * 1.3) * 0.012;

    if (root.userData.speaking) {
      parts.head.rotation.y += Math.sin(time * 4.2 + phase) * 0.018;
      parts.head.rotation.x += Math.sin(time * 5.5 + phase) * 0.008;
      const jaw = 0.55 + Math.sin(time * 15 + phase) * 0.45;
      parts.face.mouth.scale.y = 0.85 + jaw * 0.35;
      parts.face.lowerLip.position.y = -0.009 - jaw * 0.008;
      parts.face.eyeGroups.forEach((eye) => {
        eye.scale.y *= 0.99 + Math.sin(time * 8) * 0.01;
      });
    } else {
      parts.face.mouth.scale.y += (1 - parts.face.mouth.scale.y) * 0.2;
      parts.face.lowerLip.position.y += (-0.009 - parts.face.lowerLip.position.y) * 0.2;
    }

    if (time > root.userData.blinkAt) {
      root.userData.blinkUntil = time + 0.13;
      root.userData.blinkAt = time + 3.2 + Math.random() * 4.6;
    }
    if (time < root.userData.blinkUntil) {
      parts.face.eyeGroups.forEach((eye) => {
        eye.scale.y = 0.08;
      });
    }

    // subtle arm life
    const gesture = root.userData.speaking ? Math.sin(time * 3.2 + phase) * 0.04 : 0;
    parts.rightArm.shoulder.rotation.x += (gesture - parts.rightArm.shoulder.rotation.x * 0.02) * 0.04;
  };

  return root;
}
