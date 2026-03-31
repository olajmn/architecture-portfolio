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
    'rgba(0,   200, 255, ',   // cyan neon
    'rgba(30,  120, 255, ',   // elektrisk blå
    'rgba(100, 180, 255, ',   // lys himmelblå
    'rgba(0,   80,  200, ',   // dyp blå
    'rgba(180, 240, 255, ',   // nesten hvit-blå
];


// ── PARTIKLER ──
const COUNT = 1200;
const particles = [];

for (let i = 0; i < COUNT; i++) {
    particles.push(spawnParticle());
}

function spawnParticle() {
    return {
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    0,
        vy:    0,
        life:  Math.random(),           // starter på tilfeldig punkt i livet
        speed: 1.0 + Math.random() * 2.5,
        size:  0.2 + Math.random() * 0.9,
        color: colors[Math.floor(Math.random() * colors.length)]
    };
}


// ── MUS-POSISJON ──
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});


// ── FLOW FIELD ──
// getAngle() returnerer en retning (vinkel i radianer) for et punkt (x, y).
// Sinus og cosinus av posisjon + tid skaper organiske, flytende kurver.
let time = 0;

function getAngle(x, y) {
    const s = 0.0012;
    return (
        Math.sin(x * s       + time * 0.25) *
        Math.cos(y * s * 0.9 + time * 0.18) *
        Math.PI * 3.5
    );
}


// ── ANIMASJON ──
function animate() {
    // Gjennomsiktig svart lag — "fader" gamle streker ut sakte (hale-effekt)
    ctx.fillStyle = 'rgba(13, 13, 13, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        const angle = getAngle(p.x, p.y);

        // Regn ut retning og avstand mot musen
        const dx   = mouse.x - p.x;
        const dy   = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Tiltrekning avtar med avstand — maks innenfor 350px
        const pull = Math.max(0, 1 - dist / 350) * 0.06;

        // Bland flow field med svak tiltrekning mot mus
        p.vx += Math.cos(angle) * 0.22 + (dx / dist || 0) * pull;
        p.vy += Math.sin(angle) * 0.22 + (dy / dist || 0) * pull;

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

        p.life -= 0.0025;

        // Spawn ny partikkel hvis denne er "død" eller ute av skjermen
        if (p.life <= 0 || p.x < -10 || p.x > canvas.width + 10 ||
                            p.y < -10 || p.y > canvas.height + 10) {
            Object.assign(p, spawnParticle());
            return;
        }

        // Tegn linje fra forrige til ny posisjon — dette er "tråden"
        const alpha = p.life * 0.65;
        ctx.strokeStyle = p.color + alpha + ')';
        ctx.lineWidth   = p.size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    });

    time += 0.003;
    requestAnimationFrame(animate);
}

animate();
