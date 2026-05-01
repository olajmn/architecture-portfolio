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
