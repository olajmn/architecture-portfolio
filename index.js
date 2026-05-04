/* ============================================================
   1. BURGERMENY
============================================================ */

const burger = document.querySelector('.index-burger');
const overlay = document.getElementById('menuOverlay');
const closeBtn = document.getElementById('menuClose');

burger.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
});

closeBtn.addEventListener('click', () => {
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
   3. LOGO — skalerer fra 160px (topp) til 32px (ved tickeren)

   tickerScrollY beregnes etter layout og brukes som referansepunkt
   slik at logoen beveger seg jevnt gjennom hele karusellområdet.
============================================================ */

const logo = document.querySelector('.index-logo');
const carousel = document.getElementById('carousel');
const tickerEl = document.querySelector('.ticker');
const navType = performance.getEntriesByType('navigation')[0]?.type;
const isFreshNavigate = navType === 'navigate';
const isBackForward = navType === 'back_forward';
const isReload = navType === 'reload';
const fromProject = isFreshNavigate && sessionStorage.getItem('fromProject') === '1';
if (fromProject) sessionStorage.removeItem('fromProject');
let tickerScrollY = 0;

if (!isBackForward) {
    const contentEls = [logo, carousel, tickerEl, document.querySelector('.index-projects'), document.querySelector('footer')];
    contentEls.forEach(el => { if (el) { el.style.opacity = '0'; el.style.transition = 'opacity 0.7s ease'; } });
    setTimeout(() => { contentEls.forEach(el => { if (el) el.style.opacity = '1'; }); }, 200);
}

let tickerFixed = false;
let tickerSpacer = null;

function applyLogoSize(size) {
    logo.style.height = size + 'px';
    carousel.style.marginTop = (size + 40) + 'px';
    if (tickerFixed) tickerEl.style.top = (size + 40) + 'px';
}

function updateTickerState() {
    const headerH = logo.offsetHeight + 40;
    if (!tickerFixed && tickerEl.getBoundingClientRect().top <= headerH) {
        tickerSpacer = document.createElement('div');
        tickerSpacer.style.height = tickerEl.offsetHeight + 'px';
        tickerEl.insertAdjacentElement('afterend', tickerSpacer);
        tickerEl.style.position = 'fixed';
        tickerEl.style.top = headerH + 'px';
        tickerFixed = true;
    } else if (tickerFixed && tickerSpacer && tickerSpacer.getBoundingClientRect().top > headerH + 1) {
        tickerEl.style.position = '';
        tickerEl.style.top = '';
        tickerSpacer.remove();
        tickerSpacer = null;
        tickerFixed = false;
    }
}

window.addEventListener('scroll', function() {
    const size = tickerScrollY > 0
        ? Math.max(32, 160 - (window.scrollY / tickerScrollY) * 128)
        : Math.max(32, 160 - window.scrollY * 0.5);
    applyLogoSize(size);
    requestAnimationFrame(updateTickerState);
});

if (isFreshNavigate) {
    if (fromProject) {
        applyLogoSize(32);
        setTimeout(() => {
            tickerEl.scrollIntoView({ behavior: 'instant' });
            applyLogoSize(32);
        }, 0);
    } else {
        applyLogoSize(160);
    }
} else if (isReload) {
    applyLogoSize(160);
} else {
    applyLogoSize(32);
    setTimeout(() => {
        tickerEl.scrollIntoView({ behavior: 'instant' });
    }, 0);
}

setTimeout(() => {
    tickerScrollY = tickerEl.offsetTop - (logo.offsetHeight - 32);
}, 0);


/* ============================================================
   4. LOGO-KNAPP — scroll til toppen
============================================================ */

document.querySelector('.index-logo-btn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   5. TICKER — seamless loop
============================================================ */

const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
    const spans = tickerTrack.querySelectorAll('span');
    const textW = spans[0].offsetWidth;
    spans[0].style.marginRight = window.innerWidth + 'px';
    const style = document.createElement('style');
    style.textContent = `@keyframes ticker { from { transform: translateX(100vw); } to { transform: translateX(-${textW}px); } }`;
    document.head.appendChild(style);
}
