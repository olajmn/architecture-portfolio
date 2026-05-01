/* ============================================================
   BURGERMENY
============================================================ */

const burger = document.querySelector('.site-burger');
const overlay = document.getElementById('menuOverlay');
const closeBtn = document.getElementById('menuClose');

if (burger && overlay && closeBtn) {
    burger.addEventListener('click', function() {
        overlay.classList.add('open');
    });

    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('open');
    });
}


/* ============================================================
   SPRÅKBYTTE — NO / EN
============================================================ */

const langBtns = document.querySelectorAll('.lang-btn');

langBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const chosenLang = btn.dataset.lang;

        langBtns.forEach(function(b) {
            b.classList.toggle('active', b.dataset.lang === chosenLang);
        });

        const translatableElements = document.querySelectorAll('[data-no][data-en]');
        translatableElements.forEach(function(el) {
            el.textContent = el.dataset[chosenLang];
        });

        document.documentElement.lang = chosenLang;
    });
});
