/* ============================================================
   1. BURGERMENY
============================================================ */

const burger = document.querySelector('.index-burger');
const overlay = document.getElementById('menuOverlay');
const closeBtn = document.getElementById('menuClose');

burger.addEventListener('click', function() {
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
});

closeBtn.addEventListener('click', function() {
    overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
});

document.addEventListener('click', function(e) {
    if (overlay.classList.contains('open') && !overlay.contains(e.target) && !burger.contains(e.target)) {
        overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
    }
});


/* ============================================================
   2. KARUSELL — bytter slide hvert 4. sekund
============================================================ */

const slides = document.querySelectorAll('.carousel-slide');

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let queue = shuffle([...Array(slides.length).keys()]);
let queueIndex = 0;
let current = queue[0];

slides.forEach(s => s.classList.remove('active'));
slides[current].classList.add('active');

setInterval(function() {
    slides[current].classList.remove('active');
    queueIndex++;
    if (queueIndex >= queue.length) {
        do { shuffle(queue); } while (queue[0] === current);
        queueIndex = 0;
    }
    current = queue[queueIndex];
    slides[current].classList.add('active');
}, 4000);


/* ============================================================
   3. LOGO — krymper fra 160px til 32px når man scroller
============================================================ */

const logo = document.querySelector('.index-logo');
const carousel = document.getElementById('carousel');
const tickerEl = document.querySelector('.ticker');
const navType = performance.getEntriesByType('navigation')[0]?.type;
const isFreshNavigate = navType === 'navigate';
const isBackForward = navType === 'back_forward';
let currentLogoSize = Math.max(32, 160 - window.scrollY * 0.5);
let snapMode = !isFreshNavigate;
let animationId = null;

if (!isBackForward) {
    const contentEls = [carousel, tickerEl, document.querySelector('.index-projects'), document.querySelector('footer')];
    contentEls.forEach(el => { if (el) { el.style.opacity = '0'; el.style.transition = 'opacity 0.7s ease'; } });
    setTimeout(() => { contentEls.forEach(el => { if (el) el.style.opacity = '1'; }); }, 200);
}

function applyLogoSize(size) {
    logo.style.height = size + 'px';
    carousel.style.marginTop = (size + 40) + 'px';
}

function animateLogo() {
    const targetSize = Math.max(32, 160 - window.scrollY * 0.5);
    const diff = targetSize - currentLogoSize;
    if (Math.abs(diff) < 0.5) {
        currentLogoSize = targetSize;
        applyLogoSize(currentLogoSize);
        animationId = null;
        return;
    }
    currentLogoSize += diff * 0.12;
    applyLogoSize(currentLogoSize);
    animationId = requestAnimationFrame(animateLogo);
}

window.addEventListener('scroll', function() {
    tickerEl.style.top = (Math.max(32, 160 - window.scrollY * 0.5) + 40) + 'px';
    if (snapMode) {
        currentLogoSize = Math.max(32, 160 - window.scrollY * 0.5);
        applyLogoSize(currentLogoSize);
        snapMode = false;
        return;
    }
    if (!animationId) animationId = requestAnimationFrame(animateLogo);
});

if (isFreshNavigate) {
    carousel.style.marginTop = (160 + 40) + 'px';
    currentLogoSize = 160;
    logo.style.height = '32px';
    logo.style.transition = 'height 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    requestAnimationFrame(() => requestAnimationFrame(() => { logo.style.height = '160px'; }));
    setTimeout(() => { logo.style.transition = ''; }, 1300);
} else {
    applyLogoSize(currentLogoSize);
}


/* ============================================================
   4. TICKER — seamless loop: span2 enters right as span1 exits left
============================================================ */

const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
    const spans = tickerTrack.querySelectorAll('span');
    const textW = spans[0].offsetWidth;
    // Gap between span1 and span2 = full screen width
    // So when span1 is fully off-screen left (-textW), span2 is exactly at right edge
    spans[0].style.marginRight = window.innerWidth + 'px';

    // Create the keyframe dynamically so we know the exact pixel end point
    const style = document.createElement('style');
    style.textContent = `@keyframes ticker {
        from { transform: translateX(100vw); }
        to   { transform: translateX(-${textW}px); }
    }`;
    document.head.appendChild(style);
}


