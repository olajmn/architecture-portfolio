/* ============================================================
   particles.js — Flow field animasjon for forsiden

   Konsepter:
   - Canvas: et HTML-element vi kan tegne på piksel for piksel
   - Flow field: hvert punkt i rommet har en "retning" — partikler følger den
   - requestAnimationFrame: ber nettleseren kalle animate() igjen neste frame (60x/sek)
============================================================ */

const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

// Gjør canvas like stor som vinduet
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
});


// ── FARGEPALLETTE ──
const colors = [
    'rgba(255, 255, 255, ',   // ren hvit
    'rgba(255, 255, 255, ',   // ren hvit (dobbel vekt = oftere)
    'rgba(220, 235, 255, ',   // hvit med svak blå-tint
    'rgba(180, 215, 255, ',   // lys blå-hvit
    'rgba(100, 180, 255, ',   // blå aksent — sjelden
];


// ── PARTIKLER ──
const COUNT = 1700;
const particles = [];

for (let i = 0; i < COUNT; i++) {
    particles.push(spawnParticle());
}

function spawnParticle() {
    // 5% gnist — hvit og lys
    const bright = Math.random() < 0.05;
    // 4% gyllen — varm gul/amber, lengre hale og levetid
    const golden = !bright && Math.random() < 0.04;
    return {
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    0,
        vy:    0,
        life:  Math.random(),
        speed: 2.0 + Math.random() * 4.0,
        size:  bright ? 1.2 + Math.random() * 0.8
             : golden ? 0.6 + Math.random() * 0.8
             :          0.2 + Math.random() * 0.9,
        color: bright ? 'rgba(190, 225, 255, '
             : golden ? 'rgba(100, 200, 255, '
             :          colors[Math.floor(Math.random() * colors.length)],
        bright,
        golden
    };
}


// ── MUS-POSISJON ──
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});


// ── FLOW FIELD ──
// Globalt flow field — partikler fyker organisk over skjermen.
// Musen tilfører en subtil "tilt" på hele feltet — endrer vinkel, ikke sentrum.
let time = 0;

function getAngle(x, y) {
    // Normaliser museposisjon til -1 → +1 (0 = ingen påvirkning når musen er i midten)
    const mx = (mouse.x / canvas.width  - 0.5) * 2;
    const my = (mouse.y / canvas.height - 0.5) * 2;

    // Musen vrir hele feltet litt — lineær, ingen hopp
    const tilt = (mx + my) * 0.5;

    // Organisk flow field — lav multiplier gir jevne, kontinuerlige kurver
    const s = 0.0008;
    const flow = Math.sin(x * s + time * 0.2) * Math.PI
               + Math.cos(y * s + time * 0.15) * Math.PI * 0.5;

    return flow + tilt;
}


// ── ANIMASJON ──
function animate() {
    // Gjennomsiktig svart lag — "fader" gamle streker ut sakte (hale-effekt)
    ctx.fillStyle = 'rgba(13, 13, 13, 0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        const angle = getAngle(p.x, p.y);

        // Bare flow field — ingen suging mot musen
        p.vx += Math.cos(angle) * 0.22;
        p.vy += Math.sin(angle) * 0.22;

        // Begrens farten
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > p.speed) {
            p.vx = (p.vx / spd) * p.speed;
            p.vy = (p.vy / spd) * p.speed;
        }

        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;

        p.life -= p.golden ? 0.0008 : p.bright ? 0.0014 : 0.0025;

        // Spawn ny partikkel hvis denne er "død" eller ute av skjermen
        if (p.life <= 0 || p.x < -10 || p.x > canvas.width + 10 ||
                            p.y < -10 || p.y > canvas.height + 10) {
            Object.assign(p, spawnParticle());
            return;
        }

        // Tegn linje fra forrige til ny posisjon — dette er "tråden"
        const pulse = 1 + Math.sin(time * 4 + p.life * 10) * 0.4;

        // Avstand til skjermens sentrum — nær = mer intens
        const cx = p.x - canvas.width  / 2;
        const cy = p.y - canvas.height / 2;
        const centreDist = Math.sqrt(cx * cx + cy * cy);
        const maxDist    = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);
        const intensity  = 1 - (centreDist / maxDist) * 0.6; // 1.0 i midten, 0.4 i hjørnene

        const alpha = p.bright  ? Math.min(1, p.life * 1.4) * intensity
                    : p.golden  ? p.life * 0.9 * intensity
                    :             p.life * 0.75 * intensity;
        ctx.strokeStyle = p.color + alpha + ')';
        ctx.lineWidth   = p.size * pulse;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    });

    time += 0.003;
    requestAnimationFrame(animate);
}

animate();
