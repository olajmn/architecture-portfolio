/* ============================================================
   project.js — mal-systemet for alle prosjektsider

   Denne filen inneholder én funksjon: render(data)
   Den kalles fra den minimale HTML-filen med prosjektdata.
   render() bygger hele siden automatisk i nettleseren.

   Hva du kan sende inn (i HTML-filen):
     title       — prosjektnavn (tekst)
     next        — filnavn på neste prosjektside
     folder      — mappenavn under images/
     description — introtekst (tekst)
     facts       — objekt med Location, Status, Program, Year
     images      — liste med bilder:
                   { src: "filnavn.jpg", size: "wide/narrow/small" }
                   Legg til padding: "160px" for ekstra luft under ett bilde
   ============================================================ */

function render(data) {

    // Gjør om facts-objektet til HTML-rader (dt + dd per par)
    const factsHTML = Object.entries(data.facts).map(([key, val]) =>
        `<dt>${key}</dt><dd>${val}</dd>`
    ).join('');

    // Første bilde i listen brukes som hero-bilde øverst
    // Resten vises som galleri nedover siden
    const heroImage = data.images[0];
    const galleryImages = data.images.slice(1);

    // Bygg karusell-slides (alle bilder)
    const slidesHTML = data.images.map((img, i) =>
        `<div class="proj-slide${i === 0 ? ' active' : ''}">
            <img src="../../images/${data.folder}/${img.src}" alt="">
        </div>`
    ).join('');

    // Bygg miniatyrbilder (alle bilder)
    const thumbsHTML = data.images.map((img, i) =>
        `<button class="proj-thumb${i === 0 ? ' active' : ''}" data-index="${i}">
            <img src="../../images/${data.folder}/${img.src}" alt="">
        </button>`
    ).join('');

    // Bygg en HTML-div per galleri-bilde
    // img.size bestemmer klassen (wide/narrow/small)
    // img.padding gir ekstra luft under ett spesifikt bilde
    const galleryHTML = galleryImages.map(img =>
        `<div class="img-${img.size || 'wide'}" ${img.padding ? `style="padding-bottom:${img.padding}"` : ''}>
            <img src="../../images/${data.folder}/${img.src}" alt="" ${img.width ? `style="width:${img.width}"` : ''}>
            ${img.caption ? `<p class="img-caption">${img.caption}</p>` : ''}
        </div>`
    ).join('');

    // Sett inn hele siden i <body>
    document.body.innerHTML = `
        <div class="menu-overlay" id="menuOverlay">
            <button class="menu-close" id="menuClose">×</button>
            <a href="in-the-quarry.html">In the Quarry</a>
            <a href="lean-to.html">Lean-to</a>
            <a href="sagvag-senior-garden.html">Sagvåg Senior Garden</a>
            <a href="shifted.html">Shifted</a>
            <a href="womens-house.html">Women's House</a>
        </div>

        <header class="site-header">
            <span></span>
            <a href="../../index.html">
                <img src="../../architecture-portfolio.svg" alt="Ola Jin Myhre Nymoen" class="site-logo">
            </a>
            <button class="site-burger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>

        <div class="project-ticker" id="projectTicker">
            <button class="project-ticker-btn" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">${data.title}</button>
        </div>

        <div class="img-wide" id="intro">
            <img src="../../images/${data.folder}/${heroImage.src}" alt="${data.title}">
        </div>

        <div class="project-intro-block">
            <p class="project-intro">${data.description}</p>
            <dl class="project-facts">${factsHTML}</dl>
        </div>

        <div class="proj-carousel">
            ${slidesHTML}
        </div>

        <div class="proj-thumbs">
            ${thumbsHTML}
        </div>

        ${galleryHTML}

        <footer>
            <button class="top-btn" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">Top</button>
        </footer>
    `;

    // Karusell-innstillinger per prosjekt
    const carousel = document.querySelector('.proj-carousel');
    carousel.style.height = data.carouselHeight || '70vh';
    if (data.carouselFit) {
        document.querySelectorAll('.proj-slide img').forEach(img => {
            img.style.objectFit = data.carouselFit;
        });
    }

    // Logo-klikk — liten skyv oppover + fade ut, så naviger
    document.querySelector('.site-header a').addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.href;
        document.querySelectorAll('body > *:not(.site-header):not(.menu-overlay)').forEach(el => {
            el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            el.style.opacity = '0';
            el.style.transform = 'translateY(-40px)';
        });
        setTimeout(() => { window.location.href = href; }, 370);
    });

    // Burgermeny
    const burger = document.querySelector('.site-burger');
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

    // Karusell
    const slides = document.querySelectorAll('.proj-slide');
    const thumbBtns = document.querySelectorAll('.proj-thumb');
    let current = 0;
    function goTo(n, dir) {
        slides[current].classList.remove('active');
        thumbBtns[current].classList.remove('active');
        current = (n + slides.length) % slides.length;
        thumbBtns[current].classList.add('active');

        const incoming = slides[current];
        const overlay = document.createElement('div');
        overlay.style.cssText = `position:absolute;inset:0;pointer-events:none;background:linear-gradient(to ${dir},white 0%,transparent 50%);transition:opacity 0.5s ease`;
        incoming.appendChild(overlay);
        incoming.classList.add('active');
        requestAnimationFrame(() => requestAnimationFrame(() => { overlay.style.opacity = '0'; }));
        setTimeout(() => overlay.remove(), 600);
    }

    document.querySelector('.proj-carousel').addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const goLeft = e.clientX < rect.left + rect.width / 2;
        goTo(goLeft ? current - 1 : current + 1, goLeft ? 'left' : 'right');
    });

    thumbBtns.forEach((btn, i) => btn.addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(i, i < current ? 'left' : 'right');
    }));

    const ticker = document.getElementById('projectTicker');
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        if (window.scrollY === 0) {
            ticker.classList.remove('scrolled');
        } else if (window.scrollY > lastScrollY) {
            ticker.classList.add('scrolled');
        } else if (window.scrollY < lastScrollY) {
            ticker.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    });

    const navType = performance.getEntriesByType('navigation')[0]?.type;
    if (navType === 'reload') {
        const saved = sessionStorage.getItem('projectScrollY');
        if (saved) window.scrollTo(0, parseInt(saved));
    }
    window.addEventListener('pagehide', function() {
        sessionStorage.setItem('projectScrollY', window.scrollY);
    });
}
