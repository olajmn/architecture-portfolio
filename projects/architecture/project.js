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
        <a href="../../index.html" class="back-fixed">Selected works</a>
        <a href="${data.next}" class="next-fixed">›</a>

        <header class="project-top">
            <div class="project-top-nav" id="topNav">
                <a href="#intro" id="topTitle">${data.title}</a>
            </div>
        </header>

        <div class="project-title-block">
            <h1>${data.title}</h1>
        </div>

        <div class="img-wide" id="intro">
            <img src="../../images/${data.folder}/${heroImage.src}" alt="${data.title}">
        </div>

        <div class="project-intro-block">
            <p class="project-intro">${data.description}</p>
            <dl class="project-facts">${factsHTML}</dl>
        </div>

        ${galleryHTML}

        <footer></footer>
    `;

    // Scroll-animasjoner:
    // - Den store tittelen ghostes ut når du begynner å scrolle
    // - Topp-nav ghostes inn samtidig
    history.scrollRestoration = 'manual';

    window.addEventListener('load', () => {
        const bigTitle   = document.querySelector('.project-title-block h1');
        const smallTitle = document.getElementById('topTitle');
        const topNav     = document.getElementById('topNav');
        const fadeOver   = 80;
        let loadDone     = false;

        if (window.scrollY >= fadeOver) {
            bigTitle.style.opacity    = '0';
            bigTitle.style.filter     = 'blur(12px)';
            bigTitle.style.transform  = 'scale(1.04)';
            bigTitle.style.transition = 'none';
            topNav.style.opacity      = '0';
            topNav.style.filter       = 'blur(12px)';
            loadDone = true;

            requestAnimationFrame(() => requestAnimationFrame(() => {
                const t = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1)';
                topNav.style.transition = t;
                topNav.style.opacity    = '1';
                topNav.style.filter     = 'blur(0px)';
            }));
        } else {
            bigTitle.style.opacity   = '0';
            bigTitle.style.filter    = 'blur(12px)';
            bigTitle.style.transform = 'scale(1.04)';
            topNav.style.opacity     = '0';
            topNav.style.filter      = 'blur(12px)';

            requestAnimationFrame(() => requestAnimationFrame(() => {
                const t = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
                bigTitle.style.transition = t;
                topNav.style.transition   = t;
                bigTitle.style.opacity    = '1';
                bigTitle.style.filter     = 'blur(0px)';
                bigTitle.style.transform  = 'scale(1)';
                topNav.style.opacity      = '1';
                topNav.style.filter       = 'blur(0px)';
            }));

            setTimeout(() => {
                bigTitle.style.transition = 'none';
                loadDone = true;
            }, 900);
        }

        window.addEventListener('scroll', () => {
            if (!loadDone) {
                bigTitle.style.transition = 'none';
                loadDone = true;
            }
            const progress = Math.min(window.scrollY / fadeOver, 1);
            const shift = progress * 8;
            bigTitle.style.opacity    = 1 - progress;
            bigTitle.style.filter     = `blur(${progress * 12}px)`;
            bigTitle.style.transform  = `scale(${1 + progress * 0.04})`;
            bigTitle.style.textShadow = `
                ${shift}px 0 rgba(255,40,40,${progress * 0.8}),
                -${shift}px 0 rgba(40,40,255,${progress * 0.8}),
                0 ${shift * 0.4}px rgba(255,210,0,${progress * 0.5})
            `;
        });
    });
}
