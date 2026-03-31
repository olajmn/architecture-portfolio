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
    'rgba(200, 220, 255, ',   // blue-white
    'rgba(180, 210, 255, ',   // blue-white (double weight = more frequent)
    'rgba(160, 200, 255, ',   // soft blue
    'rgba(140, 185, 255, ',   // medium blue-white
    'rgba(100, 160, 255, ',   // blue accent — rare
];


// ── PARTICLES ──
const COUNT = 1700;
const particles = [];

for (let i = 0; i < COUNT; i++) {
    particles.push(spawnParticle());
}

function spawnParticle() {
    // 5% chance of becoming a bright star — blue-white and intense
    const bright = Math.random() < 0.01;
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
        color: bright ? 'rgba(80, 150, 255, '    // vivid electric blue
             : golden ? 'rgba(60, 120, 255, '    // deep blue
             : flare  ? 'rgba(180, 210, 255, '   // bright blue-white
             :          colors[Math.floor(Math.random() * colors.length)],
        bright,
        golden,
        flare
    };
}


// ── SCROLL ROTATION + SPEED ──
// scrollAngle rotates the flow field.
// speedMultiplier controls how fast particles move — slow by default, boosts on scroll.
let scrollAngle     = 0;
let speedMultiplier = 0.05; // 0.05 = slow base speed

window.addEventListener('wheel', e => {
    // e.deltaY is signed — down = positive (speed up), up = negative (slow/reverse)
    speedMultiplier = Math.max(0.05, Math.min(2.0, speedMultiplier + e.deltaY * 0.005));
});


// ── FLOW FIELD ──
// Global flow field — particles move organically across the screen.
// The mouse adds a subtle tilt to the whole field — changes angle, not centre.
let time = 0;

function getAngle(x, y) {
    // Organic flow field — low multiplier produces smooth, continuous curves
    const s = 0.0008;
    const flow = Math.sin(x * s + time * 0.2) * Math.PI
               + Math.cos(y * s + time * 0.15) * Math.PI * 0.5;

    return flow + scrollAngle;
}


// ── ANIMATION ──
function animate() {
    // Fade opacity scales with speed — no tail at rest, long tail when fast
    // normalizedSpeed: 0 at base (0.25), 1 at max (2.0)
    const normalizedSpeed = Math.min(1, (speedMultiplier - 0.25) / 1.75);
    const fadeOpacity = 1.0 - normalizedSpeed * 0.75;
    ctx.fillStyle = `rgba(1, 2, 8, ${fadeOpacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Computed once per frame, not once per particle
    const maxDist = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);

    particles.forEach(p => {
        const angle = getAngle(p.x, p.y);

        // Pure flow field — acceleration scaled by speedMultiplier
        p.vx += Math.cos(angle) * 0.22 * speedMultiplier;
        p.vy += Math.sin(angle) * 0.22 * speedMultiplier;

        // Cap speed — use Math.abs so cap is always a positive number
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const cap = p.speed * Math.abs(speedMultiplier);
        if (spd > cap) {
            p.vx = (p.vx / spd) * cap;
            p.vy = (p.vy / spd) * cap;
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
        const intensity  = 1 - (centreDist / maxDist) * 0.6; // 1.0 at centre, 0.4 at corners

        // Glow factor: 1 at centre, falls to 0 at ~45% of screen radius
        const glowFactor = Math.max(0, 1 - centreDist / (maxDist * 0.45));

        const alpha = p.flare   ? Math.min(1, p.life * 1.8) * intensity
                    : p.bright  ? Math.min(1, p.life * 1.4) * intensity
                    : p.golden  ? p.life * 0.9 * intensity
                    :             p.life * 0.75 * intensity;
        const radius = p.size;
        ctx.fillStyle = p.color + alpha + ')';

        // shadowBlur only on rare particles — too expensive for all 1700
        if (p.flare || p.bright) {
            ctx.shadowBlur  = glowFactor * 16 * p.size;
            ctx.shadowColor = p.color + Math.min(1, alpha * 2) + ')';
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // Slowly drift scroll rotation and speed back to base values
    scrollAngle     *= 0.97;
    speedMultiplier += (0.05 - speedMultiplier) * 0.02;

    time += 0.003;
    requestAnimationFrame(animate);
}

animate();
