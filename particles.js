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


// ── COLOUR PALETTE — three shades of blue ──
const colors = [
    'rgba(40,  70, 160, ',    // shade 1 — dim deep blue (most common)
    'rgba(40,  70, 160, ',    // shade 1 — dim deep blue (extra weight)
    'rgba(40,  70, 160, ',    // shade 1 — dim deep blue (extra weight)
    'rgba(70, 120, 220, ',    // shade 2 — medium blue
    'rgba(100,160, 255, ',    // shade 3 — bright blue (rare)
];


// ── PARTICLES ──
const BASE_COUNT = 800;   // partikler ved lav hastighet
const MAX_COUNT  = 2500;  // partikler ved maks hastighet
const particles  = [];

for (let i = 0; i < BASE_COUNT; i++) {
    particles.push(spawnParticle());
}

function spawnParticle() {
    // 5% chance of becoming a bright star — blue-white and intense
    const bright = Math.random() < 0.01;
    // 4% chance of becoming an ice-blue particle — longer tail and lifespan
    const golden = !bright && Math.random() < 0.04;
    // 0.3% chance of becoming a rare flare — blazing white, very long lifespan
    const flare  = !bright && !golden && Math.random() < 0.001;
    // 3% chance of becoming an elder — same look as normal, but lives much longer
    const elder  = !bright && !golden && !flare && Math.random() < 0.12;
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
        color: bright ? 'rgba(100, 160, 255, '   // bright blue
             : golden ? 'rgba(70,  120, 220, '   // medium blue
             : flare  ? 'rgba(140, 190, 255, '   // pale blue-white
             :          colors[Math.floor(Math.random() * colors.length)],
        bright,
        golden,
        flare,
        elder
    };
}


// ── SCROLL ROTATION + SPEED ──
// scrollAngle rotates the flow field.
// speedMultiplier controls how fast particles move — slow by default, boosts on scroll.
let scrollAngle     = 0;
let speedMultiplier = 0.05; // 0.05 = slow base speed
let prevSpeed       = 0.05;
let speedRising     = false;

window.addEventListener('wheel', e => {
    // e.deltaY is signed — down = positive (speed up), up = negative (slow/reverse)
    speedMultiplier = Math.max(0.05, Math.min(2.0, speedMultiplier + e.deltaY * 0.005));
});


// ── FLOW FIELD ──
// Global flow field — particles move organically across the screen.
let time = 0;

function getAngle(x, y) {
    // Low s = large smooth curves = river-like streams
    const s = 0.001;
    const flow = Math.sin(x * s + y * s * 0.5  + time * 0.07) * Math.PI * 1.2
               + Math.cos(x * s * 0.4 - y * s  + time * 0.05) * Math.PI * 0.4;

    return flow + scrollAngle;
}


// ── ANIMATION ──
function animate() {
    // Fade opacity scales with speed — no tail at rest, long tail when fast
    // normalizedSpeed: 0 at base (0.25), 1 at max (2.0)
    const normalizedSpeed = Math.min(1, (speedMultiplier - 0.25) / 1.75);
    const fadeOpacity = 0.78 - normalizedSpeed * 0.48; // subtle trail at rest, long at speed
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

        // bright particles die when they leave the screen
        if (p.bright && (p.x < -10 || p.x > canvas.width + 10 ||
                         p.y < -10 || p.y > canvas.height + 10)) {
            Object.assign(p, spawnParticle());
            return;
        }

        // all other particles wrap around screen edges instead of dying
        if (p.x < -10)               p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10) p.x = -10;
        if (p.y < -10)               p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

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

        // bright/flare always glow — normal particles only glow when accelerating
        const glowStrength = Math.min(1, (speedMultiplier - 0.05) / 1.0);
        if (p.bright || p.flare || (glowStrength > 0.15 && Math.random() < 0.25)) {
            const baseGlow  = p.bright || p.flare ? 8 : 0;
            ctx.shadowBlur  = (baseGlow + glowFactor * 12 * glowStrength) * p.size;
            ctx.shadowColor = p.color + Math.min(1, alpha * 2) + ')';
        }

        // Core — small light hint, mostly blue
        ctx.shadowBlur = 0;
        ctx.fillStyle  = 'rgba(180, 210, 255, ' + alpha * 0.5 + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Diffraction spikes — 4-pointed diamond, only on larger/special particles
        if (p.bright || p.golden || p.flare || radius > 0.7) {
            const spike = radius * 5;
            const w     = radius * 0.3; // width of the spike at centre
            ctx.fillStyle = p.color + alpha * 0.85 + ')';

            // Vertical spike (top + bottom)
            ctx.beginPath();
            ctx.moveTo(p.x,     p.y - spike);
            ctx.lineTo(p.x + w, p.y);
            ctx.lineTo(p.x,     p.y + spike);
            ctx.lineTo(p.x - w, p.y);
            ctx.closePath();
            ctx.fill();

            // Horizontal spike (left + right)
            ctx.beginPath();
            ctx.moveTo(p.x - spike, p.y);
            ctx.lineTo(p.x,         p.y - w);
            ctx.lineTo(p.x + spike, p.y);
            ctx.lineTo(p.x,         p.y + w);
            ctx.closePath();
            ctx.fill();
        }
    });

    // Slowly drift scroll rotation and speed back to base values
    scrollAngle     *= 0.97;
    speedRising      = speedMultiplier > prevSpeed + 0.001;
    prevSpeed        = speedMultiplier;
    speedMultiplier += (0.05 - speedMultiplier) * 0.02;

    time += 0.003;
    requestAnimationFrame(animate);
}

animate();
