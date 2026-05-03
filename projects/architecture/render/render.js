if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

/* ============================================================
   render.js — bygger alle prosjektsider automatisk

   Kall render(data) fra HTML-filen med disse feltene:
     title       — prosjektnavn
     folder      — mappenavn under images/
     description — introtekst
     facts       — { Location, Status, Program, Year }
     images      — [{ src, size: "wide/narrow/small", width?, caption?, padding? }]
     carouselHeight — valgfri høyde på karusellen (standard: "70vh")
     carouselFit    — valgfri object-fit på karusellbilder
============================================================ */

function render(data) {

    const factsHTML = Object.entries(data.facts).map(([key, val]) =>
        `<dt>${key}</dt><dd>${val}</dd>`
    ).join('');

    const heroImage = data.images[0];
    const galleryImages = data.images.slice(1);

    const slidesHTML = data.images.map((img, i) =>
        `<div class="proj-slide${i === 0 ? ' active' : ''}">
            <img src="../../images/${data.folder}/${img.src}" alt="">
        </div>`
    ).join('');

    const thumbsHTML = data.images.map((img, i) =>
        `<button class="proj-thumb${i === 0 ? ' active' : ''}" data-index="${i}">
            <img src="../../images/${data.folder}/${img.src}" alt="">
        </button>`
    ).join('');

    const galleryHTML = galleryImages.map(img =>
        `<div class="img-${img.size || 'wide'}" ${img.paddingTop || img.paddingBottom ? `style=" ${img.paddingTop ? `padding-top:${img.paddingTop};` : ''} ${img.paddingBottom ? `padding-bottom:${img.paddingBottom};` : ''} "` : ''}>

            <img src="../../images/${data.folder}/${img.src}" alt="" ${img.width ? `style="width:${img.width}"` : ''}>
            ${img.caption ? `<p class="img-caption">${img.caption}</p>` : ''}
        </div>`
    ).join('');

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

    document.body.style.opacity = '0';

    /* ---- Karusell-innstillinger ---- */
    const projCarousel = document.querySelector('.proj-carousel');
    projCarousel.style.height = data.carouselHeight || '70vh';
    if (data.carouselFit) {
        document.querySelectorAll('.proj-slide img').forEach(img => {
            img.style.objectFit = data.carouselFit;
        });
    }

    /* ---- Logo-klikk: fade ut og naviger ---- */
    document.querySelector('.site-header a').addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.href;
        sessionStorage.setItem('fromProject', '1');
        document.querySelectorAll('body > *:not(.site-header):not(.menu-overlay)').forEach(el => {
            el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            el.style.opacity = '0';
            el.style.transform = 'translateY(-40px)';
        });
        setTimeout(() => { window.location.href = href; }, 370);
    });

    /* ---- Burgermeny ---- */
    const burger = document.querySelector('.site-burger');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('menuClose');

    burger.addEventListener('click', () => { menuOverlay.classList.add('open'); document.body.classList.add('menu-open'); });
    closeBtn.addEventListener('click', () => { menuOverlay.classList.remove('open'); document.body.classList.remove('menu-open'); });
    document.addEventListener('click', function(e) {
        if (menuOverlay.classList.contains('open') && !menuOverlay.contains(e.target) && !burger.contains(e.target)) {
            menuOverlay.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    });

    /* ---- Bildekarusell ---- */
    const slides = document.querySelectorAll('.proj-slide');
    const thumbBtns = document.querySelectorAll('.proj-thumb');
    let current = 0;

    function goTo(n, dir) {
        slides[current].classList.remove('active');
        thumbBtns[current].classList.remove('active');
        current = (n + slides.length) % slides.length;
        thumbBtns[current].classList.add('active');

        const incoming = slides[current];
        const wipeEl = document.createElement('div');
        wipeEl.style.cssText = `position:absolute;inset:0;pointer-events:none;background:linear-gradient(to ${dir},white 0%,transparent 50%);transition:opacity 0.5s ease`;
        incoming.appendChild(wipeEl);
        incoming.classList.add('active');
        requestAnimationFrame(() => requestAnimationFrame(() => { wipeEl.style.opacity = '0'; }));
        setTimeout(() => wipeEl.remove(), 600);
    }

    projCarousel.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const goLeft = e.clientX < rect.left + rect.width / 2;
        goTo(goLeft ? current - 1 : current + 1, goLeft ? 'left' : 'right');
    });

    thumbBtns.forEach((btn, i) => btn.addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(i, i < current ? 'left' : 'right');
    }));

    /* ---- Ticker-tittel: ghoster ut ved scroll ned, inn ved scroll opp ---- */
    const ticker = document.getElementById('projectTicker');
    let lastScrollY = window.scrollY;
    let projTickerFixed = false;
    let projTickerSpacer = null;

    window.addEventListener('scroll', function() {
        if (window.scrollY === 0) {
            ticker.classList.remove('scrolled');
        } else if (window.scrollY > lastScrollY) {
            ticker.classList.add('scrolled');
        } else {
            ticker.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;

        requestAnimationFrame(() => {
            if (!projTickerFixed && ticker.getBoundingClientRect().top <= 72) {
                projTickerSpacer = document.createElement('div');
                projTickerSpacer.style.height = ticker.offsetHeight + 'px';
                ticker.insertAdjacentElement('afterend', projTickerSpacer);
                ticker.style.position = 'fixed';
                ticker.style.top = '72px';
                projTickerFixed = true;
            } else if (projTickerFixed && projTickerSpacer && projTickerSpacer.getBoundingClientRect().top > 73) {
                ticker.style.position = '';
                ticker.style.top = '';
                projTickerSpacer.remove();
                projTickerSpacer = null;
                projTickerFixed = false;
            }
        });
    });

    /* ---- Scroll-gjenoppretting ved refresh ---- */
    const scrollKey = 'scroll:' + window.location.pathname;
    window.addEventListener('pagehide', () => {
        sessionStorage.setItem(scrollKey, window.scrollY);
    });
    const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
    const saved = parseInt(sessionStorage.getItem(scrollKey) || '0');

    if (isReload && saved > 0) {
        window.addEventListener('load', () => {
            window.scrollTo(0, saved);
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.7s ease';
                document.body.style.opacity = '1';
            }, 50);
        });
    } else {
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.7s ease';
            document.body.style.opacity = '1';
        }, 50);
    }
}
