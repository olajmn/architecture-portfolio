/* ============================================================
   app.js — Interaksjoner for Ola Jin Myhre Nymoen sitt portfolio

   Denne filen håndterer fire ting:
     1. Navigasjonens lyseffekt (muspeking)
     2. Skrivemaskin-effekten i hero-seksjonen
     3. Språkbytte (NO / EN)
     4. Krymping av tittelen på prosjektsider ved scrolling

   Konseptet "document.querySelector()" er som å si:
   "Finn dette HTML-elementet på siden for meg."
============================================================ */


/* ============================================================
   1. NAVIGASJON — LYSEFFEKT VED MUSPEKING
   ============================================================
   Navigasjonsboksen har en CSS-variabel --mouse-x og --mouse-y.
   CSS bruker disse til å lage en liten "lyskjegle" der musen er.

   Her oppdaterer vi disse variablene i sanntid mens musen beveger seg.

   Konsepter:
   - addEventListener: "Lytt etter denne hendelsen og kjør denne funksjonen"
   - getBoundingClientRect(): "Gi meg koordinatene til dette elementet"
   - style.setProperty(): "Endre en CSS-variabel via JavaScript"
============================================================ */

const nav = document.querySelector('nav');

if (nav) {
    // 'mousemove' hendelsen skjer hundrevis av ganger per sekund
    // mens musen beveger seg over navigasjonsboksen
    nav.addEventListener('mousemove', function(e) {
        // getBoundingClientRect() returnerer et objekt med
        // top, left, right, bottom til elementet i piksler fra hjørnet av skjermen
        const rect = nav.getBoundingClientRect();

        // Beregn musens posisjon RELATIVT til nav-boksen
        // (ikke fra hele skjermen)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Oppdater CSS-variablene som styrer lyseffekten
        nav.style.setProperty('--mouse-x', x + 'px');
        nav.style.setProperty('--mouse-y', y + 'px');
    });
}


/* ============================================================
   2. SKRIVEMASKIN-EFFEKT
   ============================================================
   Denne funksjonen skriver tekst ett tegn om gangen.

   Konsepter:
   - Funksjon med parametere: typeText(element, tekst, hastighet)
   - setTimeout(): "Vent X millisekunder, kjør så denne funksjonen"
   - Rekursjon: funksjonen kaller seg selv — slik "looper" den
   - textContent: egenskapen som holder teksten inne i et element

   Slik ser dataflyten ut:
   Start → skriv 'A' → vent 80ms → skriv 'R' → vent 80ms → ... → ferdig
============================================================ */

function typeText(element, text, speed) {
    // i holder styr på HVOR LANGT vi har kommet i teksten
    // Vi starter på 0 (første tegn)
    let i = 0;

    // En lokal hjelpefunksjon som skriver neste tegn
    function writeNextCharacter() {
        // Har vi nådd slutten av teksten?
        if (i < text.length) {
            // Legg til neste tegn
            // text[i] henter tegnet på posisjon i — som array-indeks
            element.textContent += text[i];

            // Flytt til neste tegn
            i++;

            // Planlegg å kalle denne funksjonen igjen etter 'speed' ms
            // Dette er rekursjon — funksjonen kaller seg selv!
            setTimeout(writeNextCharacter, speed);
        }
        // Hvis i >= text.length, stopper vi bare — ingen flere kall
    }

    // Start skrivingen
    writeNextCharacter();
}

// Finn span-elementet med id="typewriter-text" i HTML
const typewriterEl = document.getElementById('typewriter-text');

// Kjør kun hvis elementet faktisk finnes
// (det er bare på index.html, ikke på prosjektsidene)
if (typewriterEl) {
    // Vent 400ms før vi starter — gir siden tid til å laste inn
    // Hvert tegn tar 90ms — prøv å endre dette tallet og se hva som skjer!
    setTimeout(function() {
        // Sjekk gjeldende språk og skriv riktig tittel
        const lang = document.documentElement.lang;
        const text = lang === 'en' ? 'ARCHITECT' : 'ARKITEKT';
        typeText(typewriterEl, text, 90);
    }, 400);
}


/* ============================================================
   3. SPRÅKBYTTE — NO / EN
   ============================================================
   Når brukeren trykker "NO" eller "EN"-knappene, skal vi:
     a) Markere riktig knapp som aktiv (CSS-klassen 'active')
     b) Bytte all tekst på siden til riktig språk

   Teksten hentes fra data-no og data-en attributtene i HTML.
   Eksempel: <a data-no="Prosjekter" data-en="Work">Prosjekter</a>

   Konsepter:
   - querySelectorAll(): finner ALLE elementer som matcher (returnerer en liste)
   - forEach(): "Gjør dette for hvert element i listen"
   - classList.toggle(): legger til/fjerner en CSS-klasse
   - dataset: et objekt med alle data-* attributtene til et element
   - innerHTML: som textContent, men tolker HTML-koder som <br>
============================================================ */

// querySelectorAll('.lang-btn') finner BEGGE språkknappene
const langBtns = document.querySelectorAll('.lang-btn');

langBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Hvilket språk klikket brukeren på?
        // btn.dataset.lang leser data-lang="no" eller data-lang="en" fra HTML
        const chosenLang = btn.dataset.lang;

        // --- a) Oppdater knappenes utseende ---
        langBtns.forEach(function(b) {
            // classList.toggle(klasse, sannVerdi):
            // Legg til klassen hvis sannVerdi er true, fjern den hvis false
            b.classList.toggle('active', b.dataset.lang === chosenLang);
        });

        // --- b) Bytt all tekst på siden ---
        // Finn alle elementer som har BEGGE data-no og data-en attributter
        const translatableElements = document.querySelectorAll('[data-no][data-en]');

        translatableElements.forEach(function(el) {
            // el.dataset er et objekt: { no: "Prosjekter", en: "Work" }
            // el.dataset[chosenLang] henter riktig oversettelse dynamisk
            el.textContent = el.dataset[chosenLang];
        });

        // --- c) Oppdater <html lang="..."> ---
        // Forteller nettleser og hjelpemiddelteknologi hvilket språk siden er på
        document.documentElement.lang = chosenLang;

        // --- d) Oppdater typewriter-teksten ---
        // Siden .textContent overskrev den, nullstill og skriv på nytt
        if (typewriterEl) {
            typewriterEl.textContent = '';
            const text = chosenLang === 'en' ? 'ARCHITECT' : 'ARKITEKT';
            typeText(typewriterEl, text, 90);
        }
    });
});


/* ============================================================
   4. PROSJEKTSIDE — KRYMPING AV TITTEL VED SCROLLING
   ============================================================
   På individuelle prosjektsider (f.eks. in-the-quarry.html) er
   tittelen sticky øverst. Mens man scroller ned, krymper tittelen
   gradvis fra 72px til 32px.

   Konseptet:
   - window.scrollY: pikslene man har scrollet ned
   - Math.max(a, b): returnerer det STØRSTE av to tall (brukes som gulv)
   - Math.min(a, b): returnerer det MINSTE av to tall (brukes som tak)

   Formelen: størrelse = 72 - (scrollY * 0.1)
   Eksempel: ved 400px scroll → 72 - 40 = 32px (minimum)
============================================================ */

const stickyTitle = document.querySelector('.project-header-sticky h1');

if (stickyTitle) {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;

        // Regn ut ny skriftstørrelse
        // Math.max sikrer at vi aldri går under 32px
        const newSize = Math.max(32, 72 - scrolled * 0.1);

        // Sett ny font-size direkte på elementet
        stickyTitle.style.fontSize = newSize + 'px';
    });
}


/* ============================================================
   BONUSFORKLARING: Forskjellen på de tre typene kode

   HTML (index.html):
     Strukturen — "hva er på siden?"
     <h1>Ola Jin</h1>

   CSS (style.css):
     Utseendet — "hvordan ser det ut?"
     h1 { font-size: 96px; font-weight: 300; }

   JavaScript (app.js):
     Oppførselen — "hva skjer når brukeren interagerer?"
     h1.style.fontSize = '32px';   ← endrer CSS via JS

   Alle tre snakker med hverandre gjennom CSS-klasser og
   HTML-elementer som bindeledd.
============================================================ */
