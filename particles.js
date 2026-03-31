/* ============================================================
   particles.js — Flow field animation for the front page

   Concepts:
   - Canvas: an HTML element we can draw on pixel by pixel
   - Flow field: every point in space has a "direction" — particles follow it
   - requestAnimationFrame: asks the browser to call animate() again next frame (60x/sec)
============================================================ */

const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

// Match canvas size to window
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
});


// ── COLOUR PALETTE ──
const colors = [
    'rgba(255, 255, 255, ',   // pure white
    'rgba(255, 255, 255, ',   // pure white (double weight = more frequent)
    'rgba(220, 235, 255, ',   // white with faint blue tint
    'rgba(180, 215, 255, ',   // light blue-white
    'rgba(100, 180, 255, ',   // blue accent — rare
];


// ── PARTICLES ──
const COUNT = 1700;
const particles = [];

for (let i = 0; i < COUNT; i++) {
    particles.push(spawnParticle());
}

function spawnParticle() {
    // 5% chance of becoming a bright star — blue-white and intense
    const bright = Math.random() < 0.05;
    // 4% chance of becoming an ice-blue particle — longer tail and lifespan
    const golden = !bright && Math.random() < 0.04;
    // 0.3% chance of becoming a rare flare — blazing white, very long lifespan
    const flare  = !bright && !golden && Math.random() < 0.001;
    return {
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    0,
        vy:    0,
        life:  Math.random(),
        speed: flare  ? 4.0 + Math.random() * 4.0
             : bright ? 3.5 + Math.random() * 4.0
             :          2.0 + Math.random() * 4.0,
        size:  bright ? 1.2 + Math.random() * 0.8
             : golden ? 0.6 + Math.random() * 0.8
             : flare  ? 2.0 + Math.random() * 1.5
             :          0.2 + Math.random() * 0.9,
        color: bright ? 'rgba(190, 225, 255, '
             : golden ? 'rgba(100, 200, 255, '
             : flare  ? 'rgba(255, 255, 255, '
             :          colors[Math.floor(Math.random() * colors.length)],
        bright,
        golden,
        flare
    };
}


// ── MOUSE POSITION ──
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});


// ── FLOW FIELD ──
// Global flow field — particles move organically across the screen.
// The mouse adds a subtle tilt to the whole field — changes angle, not centre.
let time = 0;

function getAngle(x, y) {
    // Normalise mouse position to -1 → +1 (0 = no effect when mouse is centred)
    const mx = (mouse.x / canvas.width  - 0.5) * 2;
    const my = (mouse.y / canvas.height - 0.5) * 2;

    // Mouse tilts the whole field slightly — linear, no discontinuities
    const tilt = (mx + my) * 0.5;

    // Organic flow field — low multiplier produces smooth, continuous curves
    const s = 0.0008;
    const flow = Math.sin(x * s + time * 0.2) * Math.PI
               + Math.cos(y * s + time * 0.15) * Math.PI * 0.5;

    return flow + tilt;
}


// ── ANIMATION ──
function animate() {
    // Semi-transparent black layer — fades old strokes out slowly (tail effect)
    ctx.fillStyle = 'rgba(13, 13, 13, 0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        const angle = getAngle(p.x, p.y);

        // Pure flow field — no mouse attraction
        p.vx += Math.cos(angle) * 0.22;
        p.vy += Math.sin(angle) * 0.22;

        // Cap speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > p.speed) {
            p.vx = (p.vx / spd) * p.speed;
            p.vy = (p.vy / spd) * p.speed;
        }

        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;

        p.life -= p.flare ? 0.0003 : p.golden ? 0.0008 : p.bright ? 0.0014 : 0.0025;

        // Respawn if dead or off screen
        if (p.life <= 0 || p.x < -10 || p.x > canvas.width + 10 ||
                            p.y < -10 || p.y > canvas.height + 10) {
            Object.assign(p, spawnParticle());
            return;
        }

        // Draw line from previous to new position — this is the "strand"
        const pulse = 1 + Math.sin(time * 4 + p.life * 10) * 0.4;

        // Distance to screen centre — closer = more intense
        const cx = p.x - canvas.width  / 2;
        const cy = p.y - canvas.height / 2;
        const centreDist = Math.sqrt(cx * cx + cy * cy);
        const maxDist    = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);
        const intensity  = 1 - (centreDist / maxDist) * 0.6; // 1.0 at centre, 0.4 at corners

        const alpha = p.flare   ? Math.min(1, p.life * 1.8) * intensity
                    : p.bright  ? Math.min(1, p.life * 1.4) * intensity
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
