/* ============================================================
   1. BURGERMENY
============================================================ */

const burger = document.querySelector('.index-burger');
const overlay = document.getElementById('menuOverlay');
const closeBtn = document.getElementById('menuClose');

burger.addEventListener('click', function() {
    overlay.classList.add('open');
});

closeBtn.addEventListener('click', function() {
    overlay.classList.remove('open');
});


/* ============================================================
   2. KARUSELL — bytter slide hvert 4. sekund
============================================================ */

const slides = document.querySelectorAll('.carousel-slide');
let current = 0;

setInterval(function() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}, 4000);


/* ============================================================
   3. LOGO — krymper fra 160px til 32px når man scroller
============================================================ */

const logo = document.querySelector('.index-logo');
const carousel = document.getElementById('carousel');
let currentLogoSize = 160;
let animationId = null;

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

    currentLogoSize += diff * 0.2;
    applyLogoSize(currentLogoSize);
    animationId = requestAnimationFrame(animateLogo);
}

window.addEventListener('scroll', function() {
    if (!animationId) {
        animationId = requestAnimationFrame(animateLogo);
    }
});

animateLogo();
