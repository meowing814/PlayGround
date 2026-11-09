import * as THREE from "three";

function canvasTexture(width, height, draw, repeat = [1, 1]) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.anisotropy = 4;
  return texture;
}

function noise(ctx, width, height, amount, opacity = 0.05) {
  for (let i = 0; i < amount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const s = Math.random() * 2 + 0.4;
    ctx.fillStyle = `rgba(${Math.random() > 0.45 ? "255,235,200" : "0,0,0"},${Math.random() * opacity})`;
    ctx.fillRect(x, y, s, s);
  }
}

export function woodTexture(base = "#6b4228", grain = "#3e2518", repeat = [2, 2]) {
  return canvasTexture(
    512,
    512,
    (ctx, w, h) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 80; i++) {
        const y = Math.random() * h;
        ctx.strokeStyle = `rgba(${parseInt(grain.slice(1, 3), 16)},${parseInt(grain.slice(3, 5), 16)},${parseInt(grain.slice(5, 7), 16)},${0.08 + Math.random() * 0.24})`;
        ctx.lineWidth = 0.5 + Math.random() * 2.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= w; x += 22) {
          ctx.lineTo(x, y + Math.sin(x * 0.025 + i) * 2.6 + (Math.random() - 0.5) * 1.5);
        }
        ctx.stroke();
      }
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        ctx.strokeStyle = "rgba(40,20,10,.35)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(x, y, 8 + Math.random() * 10, 3 + Math.random() * 4, Math.random(), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(20,10,5,.1)";
      for (let i = 0; i < 7; i++) ctx.fillRect(0, 0, w, 1);
      noise(ctx, w, h, 2600, 0.09);
    },
    repeat
  );
}

export function plankTexture(base = "#5f3b26", repeat = [3, 3]) {
  return canvasTexture(
    512,
    512,
    (ctx, w, h) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
      const plank = 64;
      for (let y = 0; y < h; y += plank) {
        ctx.fillStyle = `rgba(255,235,200,${Math.random() * 0.035})`;
        ctx.fillRect(0, y, w, plank);
        ctx.strokeStyle = "rgba(25,12,8,.55)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
        for (let i = 0; i < 4; i++) {
          const gy = y + 8 + Math.random() * (plank - 16);
          ctx.strokeStyle = "rgba(40,22,12,.13)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.bezierCurveTo(w * 0.3, gy + 3, w * 0.6, gy - 3, w, gy + 1);
          ctx.stroke();
        }
        const joint = Math.random() * w;
        ctx.strokeStyle = "rgba(24,12,7,.45)";
        ctx.beginPath();
        ctx.moveTo(joint, y);
        ctx.lineTo(joint, y + plank);
        ctx.stroke();
      }
      noise(ctx, w, h, 2400, 0.08);
    },
    repeat
  );
}

export function wallpaperTexture(base = "#4b1b24", gold = "#b58b4c", repeat = [2, 1]) {
  return canvasTexture(
    512,
    512,
    (ctx, w, h) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(0,0,0,.08)");
      gradient.addColorStop(0.5, "rgba(255,190,120,.02)");
      gradient.addColorStop(1, "rgba(0,0,0,.12)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const step = 64;
      ctx.strokeStyle = gold;
      ctx.globalAlpha = 0.09;
      ctx.lineWidth = 1.2;
      for (let y = 0; y < h + step; y += step) {
        for (let x = 0; x < w + step; x += step) {
          const ox = (Math.floor(y / step) % 2) * (step / 2);
          ctx.beginPath();
          ctx.moveTo(x + ox, y);
          ctx.quadraticCurveTo(x + ox + step / 2, y + step / 2, x + ox, y + step);
          ctx.quadraticCurveTo(x + ox - step / 2, y + step / 2, x + ox, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + ox + step / 2, y + step / 2, 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      noise(ctx, w, h, 1800, 0.06);
    },
    repeat
  );
}

export function dirtTexture(repeat = [10, 10]) {
  return canvasTexture(
    512,
    512,
    (ctx, w, h) => {
      ctx.fillStyle = "#9a7250";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 2200; i++) {
        const shade = Math.random();
        ctx.fillStyle = shade > 0.6 ? "rgba(219,184,137,.18)" : shade > 0.3 ? "rgba(88,53,32,.18)" : "rgba(149,111,70,.26)";
        const r = Math.random() * 3.5 + 0.5;
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < 14; i++) {
        ctx.strokeStyle = "rgba(70,44,29,.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const y = Math.random() * h;
        ctx.moveTo(0, y);
        for (let x = 0; x < w; x += 24) ctx.lineTo(x, y + Math.sin(x * 0.03 + i) * 4);
        ctx.stroke();
      }
    },
    repeat
  );
}

export function rockTexture(repeat = [4, 4]) {
  return canvasTexture(
    512,
    512,
    (ctx, w, h) => {
      ctx.fillStyle = "#5b4435";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 700; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const s = Math.random() * 24 + 4;
        ctx.fillStyle = `rgba(${Math.random() > 0.5 ? "120,92,70" : "48,34,27"},${Math.random() * 0.28})`;
        ctx.beginPath();
        ctx.ellipse(x, y, s, s * (0.3 + Math.random() * 0.5), Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < 20; i++) {
        ctx.strokeStyle = "rgba(24,16,13,.3)";
        ctx.lineWidth = 1 + Math.random();
        ctx.beginPath();
        let x = Math.random() * w;
        let y = Math.random() * h;
        ctx.moveTo(x, y);
        for (let j = 0; j < 5; j++) {
          x += (Math.random() - 0.5) * 90;
          y += Math.random() * 50;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    },
    repeat
  );
}

export function fabricTexture(base = "#5a1b26", repeat = [2, 2]) {
  return canvasTexture(
    256,
    256,
    (ctx, w, h) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 0.12;
      for (let i = 0; i < w; i += 3) {
        ctx.strokeStyle = i % 6 === 0 ? "#fff4dc" : "#1b0708";
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let j = 0; j < h; j += 3) {
        ctx.strokeStyle = j % 6 === 0 ? "#fff4dc" : "#1b0708";
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(w, j);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      noise(ctx, w, h, 700, 0.06);
    },
    repeat
  );
}

export function skyTexture(top = "#1c2140", middle = "#a55545", bottom = "#e8a35e") {
  return canvasTexture(
    16,
    512,
    (ctx, w, h) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, top);
      gradient.addColorStop(0.5, middle);
      gradient.addColorStop(0.78, bottom);
      gradient.addColorStop(1, "#78543c");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    },
    [1, 1]
  );
}

export function rugTexture() {
  return canvasTexture(
    512,
    256,
    (ctx, w, h) => {
      ctx.fillStyle = "#5a1d1b";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#c19a50";
      ctx.lineWidth = 8;
      ctx.strokeRect(14, 14, w - 28, h - 28);
      ctx.strokeStyle = "#28100e";
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 30, w - 60, h - 60);
      for (let i = 0; i < 8; i++) {
        const cx = 64 + i * 55;
        ctx.save();
        ctx.translate(cx, h / 2);
        ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = i % 2 ? "#c19a50" : "#8d5f2d";
        ctx.lineWidth = 3;
        ctx.strokeRect(-19, -19, 38, 38);
        ctx.restore();
      }
      noise(ctx, w, h, 900, 0.08);
    },
    [1, 1]
  );
}

export function signTexture(title, subtitle = "", options = {}) {
  const w = 512;
  const h = options.tall ? 280 : 160;
  return canvasTexture(
    w,
    h,
    (ctx) => {
      ctx.fillStyle = options.background ?? "#241610";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = options.border ?? "#c49a50";
      ctx.lineWidth = 6;
      ctx.strokeRect(12, 12, w - 24, h - 24);
      ctx.strokeStyle = "rgba(196,154,80,.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(24, 24, w - 48, h - 48);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = options.color ?? "#e7c985";
      ctx.font = `bold ${options.fontSize ?? 70}px Georgia, serif`;
      ctx.fillText(title, w / 2, subtitle ? h / 2 - 22 : h / 2);
      if (subtitle) {
        ctx.fillStyle = options.subColor ?? "#a98c5b";
        ctx.font = "22px Georgia, serif";
        ctx.fillText(subtitle, w / 2, h / 2 + 44);
      }
      // grain
      for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.13})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
      }
    },
    [1, 1]
  );
}

export function posterTexture(kind = "wanted") {
  return canvasTexture(
    256,
    384,
    (ctx, w, h) => {
      ctx.fillStyle = "#d8c7a1";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(91,64,36,.12)";
      for (let i = 0; i < 300; i++) ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
      ctx.strokeStyle = "#4a2d1c";
      ctx.lineWidth = 4;
      ctx.strokeRect(12, 12, w - 24, h - 24);
      ctx.textAlign = "center";
      ctx.fillStyle = "#3a2114";
      ctx.font = "bold 38px Georgia, serif";
      ctx.fillText(kind === "wanted" ? "WANTED" : "CINDER", w / 2, 60);
      if (kind === "wanted") {
        ctx.fillStyle = "#563a24";
        ctx.beginPath();
        ctx.arc(w / 2, 160, 53, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d8c7a1";
        ctx.beginPath();
        ctx.arc(w / 2, 158, 39, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#4a2d1c";
        ctx.font = "bold 27px Georgia, serif";
        ctx.fillText("J. CALLOWAY", w / 2, 250);
        ctx.font = "18px Georgia, serif";
        ctx.fillText("$500 REWARD", w / 2, 290);
        ctx.fillText("ALIVE OR ANSWERED FOR", w / 2, 320);
      } else {
        ctx.font = "bold 72px Georgia, serif";
        ctx.fillText("GULCH", w / 2, 180);
        ctx.font = "21px Georgia, serif";
        ctx.fillText("POP. 412", w / 2, 235);
        ctx.fillText("ELEV. 6,204 FT", w / 2, 270);
        ctx.fillText("EST. 1871", w / 2, 305);
      }
    },
    [1, 1]
  );
}

export function windowTexture(glow = "#ffd18a") {
  return canvasTexture(
    256,
    384,
    (ctx, w, h) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, glow);
      gradient.addColorStop(0.65, "#c96b3d");
      gradient.addColorStop(1, "#68362c");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#2a1a12";
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.moveTo(0, h * 0.45);
      ctx.lineTo(w, h * 0.45);
      ctx.stroke();
      ctx.strokeStyle = "rgba(60,30,18,.5)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * w, 0);
        ctx.lineTo(Math.random() * w, h);
        ctx.stroke();
      }
      ctx.strokeStyle = "#2a1a12";
      ctx.lineWidth = 15;
      ctx.strokeRect(5, 5, w - 10, h - 10);
    },
    [1, 1]
  );
}

export function starSprite() {
  return canvasTexture(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,238,190,1)");
    g.addColorStop(0.25, "rgba(255,204,120,.75)");
    g.addColorStop(0.6, "rgba(255,160,60,.18)");
    g.addColorStop(1, "rgba(255,140,40,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}

export function dustSprite() {
  return canvasTexture(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,232,190,.9)");
    g.addColorStop(0.45, "rgba(241,209,156,.35)");
    g.addColorStop(1, "rgba(241,209,156,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}
