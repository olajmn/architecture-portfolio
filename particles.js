
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
// Blue shades — from dark to light, drawn randomly
const colors = [
    'rgba(60,  110, 220, ',   // deep blue
    'rgba(80,  140, 255, ',   // medium blue   (double weight = more common)
    'rgba(80,  140, 255, ',
    'rgba(120, 170, 255, ',   // light blue
    'rgba(130, 175, 255, ',   // pale blue
];


// ── PARTICLES ──
const COUNT = 400;
const particles = [];

for (let i = 0; i < COUNT; i++) {
    particles.push(spawnParticle());
}

function spawnParticle() {
    // 8%  chance of a large "block"
    const large  = Math.random() < 0.08;
    // 25% chance of a medium square — new middle tier
    const medium = !large && Math.random() < 0.25;
    // 4% chance of a bright highlight
    const bright = !large && !medium && Math.random() < 0.04;

    return {
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    0,
        vy:    0,
        life:  Math.random(),
        speed: large  ? 0.4 + Math.random() * 0.8
             : medium ? 0.7 + Math.random() * 1.0
             : bright ? 1.2 + Math.random() * 1.5
             :          0.6 + Math.random() * 1.2,
        // size controls the square dimensions (in pixels)
        size:  large  ? 5 + Math.random() * 5     // 5–10px
             : medium ? 3 + Math.random() * 2      // 3–5px  ← new
             : bright ? 1.5 + Math.random() * 1.5  // 1.5–3px
             :          0.8 + Math.random() * 1.2,  // 0.8–2px (tiny dots)
        color: bright ? 'rgba(100, 160, 255, '
             : large  ? 'rgba(60,  120, 220, '
             :          colors[Math.floor(Math.random() * colors.length)],
        large,
        medium,
        bright,
    };
}


// ── SCROLL SPEED ──
let speedMultiplier = 0.4;

window.addEventListener('wheel', e => {
    if (e.deltaY > 0) {
        // Scrolling DOWN — speed up, max 2.0
        speedMultiplier = Math.min(2.0, speedMultiplier + e.deltaY * 0.005);
    } else {
        // Scrolling UP — slow down, floor at default speed (0.4)
        // e.deltaY is negative here, so adding it subtracts from speedMultiplier
        speedMultiplier = Math.max(0.4, speedMultiplier + e.deltaY * 0.005);
    }
});


// ── FLOW FIELD ──
// Base direction: diagonal top-right (-π/4 = 45° upward-right)
// Noise makes it organic — particles drift and curve instead of going in straight lines
let time = 0;

function getAngle(x, y) {
    const baseAngle = -Math.PI / 4;  // 45° toward top-right
    const s = 0.0010;
    const noise = Math.sin(x * s + time * 0.12) * 0.6
                + Math.cos(y * s + time * 0.10) * 0.4;
    return baseAngle + noise;
}


// ── ANIMATION ──
function animate() {
    // Clear canvas each frame — no tails, just crisp squares each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ── DIAGONAL BAND ──
    // We define a diagonal line across the screen: x + y = bandCenter
    // This line goes from bottom-left to top-right, like in the reference image.
    // For each particle, we measure its distance from this line.
    // Particles close to the line get a brightness boost → creates the glowing river.
    const bandCenter = (canvas.width + canvas.height) * 0.52;
    const bandWidth  = Math.min(canvas.width, canvas.height) * 0.38;

    particles.forEach(p => {
        const angle = getAngle(p.x, p.y);

        // Accelerate the particle in the flow direction
        p.vx += Math.cos(angle) * 0.12 * speedMultiplier;
        p.vy += Math.sin(angle) * 0.12 * speedMultiplier;

        // Cap speed so particles don't fly off too fast
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > p.speed * speedMultiplier) {
            p.vx = (p.vx / spd) * p.speed * speedMultiplier;
            p.vy = (p.vy / spd) * p.speed * speedMultiplier;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Each frame the particle gets a little closer to dying
        p.life -= p.large ? 0.0005 : p.bright ? 0.0015 : 0.0020;

        // Respawn if dead or off screen
        if (p.life <= 0 || p.x < -10 || p.x > canvas.width + 10 ||
                            p.y < -10 || p.y > canvas.height + 10) {
            Object.assign(p, spawnParticle());
            return;
        }

        // ── How close is this particle to the diagonal band? ──
        // The perpendicular distance from point (x,y) to the line x+y=bandCenter
        // is: |x + y - bandCenter| / sqrt(2)
        // Math.SQRT2 is JavaScript's built-in value for √2 (≈ 1.414)
        const bandDist   = Math.abs(p.x + p.y - bandCenter) / Math.SQRT2;
        // bandFactor: 1.0 when right on the band, 0.0 when far away
        const bandFactor = Math.max(0, 1 - bandDist / bandWidth);

        // Base transparency based on how much "life" the particle has left
        const baseAlpha = p.bright ? p.life * 0.85
                        : p.large  ? p.life * 0.65
                        :            p.life * 0.55;

        // Add a boost near the band — this creates the bright river effect
        const alpha = Math.min(1, baseAlpha + bandFactor * 0.55);

        // ── DRAW: filled square instead of a line ──
        // Math.round() snaps to the nearest pixel — makes small squares look crisp
        ctx.fillStyle = p.color + alpha + ')';
        ctx.fillRect(
            Math.round(p.x - p.size / 2),
            Math.round(p.y - p.size / 2),
            Math.round(p.size),
            Math.round(p.size)
        );
    });

    // Slowly return speed to default
    speedMultiplier += (0.4 - speedMultiplier) * 0.02;

    time += 0.003;
    requestAnimationFrame(animate);
}

animate();
