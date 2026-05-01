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
let currentLogoSize = 160;

function animateLogo() {
    const targetSize = Math.max(32, 160 - window.scrollY * 0.5);
    currentLogoSize += (targetSize - currentLogoSize) * 0.2;
    logo.style.height = currentLogoSize + 'px';
    requestAnimationFrame(animateLogo);
}

animateLogo();
