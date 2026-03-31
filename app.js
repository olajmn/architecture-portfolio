/* ============================================================
   app.js — Interactions for Ola Jin Myhre Nymoen's portfolio

   This file handles four things:
     1. Navigation light effect (mouse hover)
     2. Typewriter effect in the hero section
     3. Language switching (NO / EN)
     4. Title shrinking on project pages when scrolling

   "document.querySelector()" means:
   "Find this HTML element on the page for me."
============================================================ */


/* ============================================================
   1. NAVIGATION — LIGHT EFFECT ON HOVER
   ============================================================
   The nav box has CSS variables --mouse-x and --mouse-y.
   CSS uses these to create a small "light cone" where the mouse is.

   Here we update these variables in real time as the mouse moves.

   Concepts:
   - addEventListener: "Listen for this event and run this function"
   - getBoundingClientRect(): "Give me the coordinates of this element"
   - style.setProperty(): "Change a CSS variable via JavaScript"
============================================================ */

const nav = document.querySelector('nav');

if (nav) {
    // The 'mousemove' event fires hundreds of times per second
    // while the mouse moves over the nav box
    nav.addEventListener('mousemove', function(e) {
        // getBoundingClientRect() returns an object with
        // top, left, right, bottom of the element in pixels from the screen edge
        const rect = nav.getBoundingClientRect();

        // Calculate mouse position RELATIVE to the nav box
        // (not from the entire screen)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update the CSS variables that control the light effect
        nav.style.setProperty('--mouse-x', x + 'px');
        nav.style.setProperty('--mouse-y', y + 'px');
    });
}


/* ============================================================
   2. TYPEWRITER EFFECT
   ============================================================
   This function writes text one character at a time.

   Concepts:
   - Function with parameters: typeText(element, text, speed)
   - setTimeout(): "Wait X milliseconds, then run this function"
   - Recursion: the function calls itself — this is how it "loops"
   - textContent: the property that holds the text inside an element

   Data flow:
   Start → write 'A' → wait 80ms → write 'R' → wait 80ms → ... → done
============================================================ */

function typeText(element, text, speed) {
    // i keeps track of HOW FAR we are in the text
    // We start at 0 (first character)
    let i = 0;

    // A local helper function that writes the next character
    function writeNextCharacter() {
        // Have we reached the end of the text?
        if (i < text.length) {
            // Add the next character
            // text[i] gets the character at position i — like an array index
            element.textContent += text[i];

            // Move to the next character
            i++;

            // Schedule this function to be called again after 'speed' ms
            // This is recursion — the function calls itself!
            setTimeout(writeNextCharacter, speed);
        }
        // If i >= text.length, we simply stop — no more calls
    }

    // Start writing
    writeNextCharacter();
}

// Find the span element with id="typewriter-text" in the HTML
const typewriterEl = document.getElementById('typewriter-text');

// Only run if the element actually exists
// (it's only on index.html, not on project pages)
if (typewriterEl) {
    // Wait 400ms before starting — gives the page time to load
    // Each character takes 90ms — try changing this number and see what happens!
    setTimeout(function() {
        // Check current language and write the correct title
        const lang = document.documentElement.lang;
        const text = lang === 'en' ? 'ARCHITECT' : 'ARKITEKT';
        typeText(typewriterEl, text, 90);
    }, 400);
}


/* ============================================================
   3. LANGUAGE SWITCHING — NO / EN
   ============================================================
   When the user clicks the "NO" or "EN" buttons, we:
     a) Mark the correct button as active (CSS class 'active')
     b) Switch all text on the page to the correct language

   Text is fetched from the data-no and data-en attributes in HTML.
   Example: <a data-no="Prosjekter" data-en="Work">Prosjekter</a>

   Concepts:
   - querySelectorAll(): finds ALL matching elements (returns a list)
   - forEach(): "Do this for each element in the list"
   - classList.toggle(): adds/removes a CSS class
   - dataset: an object with all data-* attributes of an element
   - innerHTML: like textContent, but interprets HTML tags like <br>
============================================================ */

// querySelectorAll('.lang-btn') finds BOTH language buttons
const langBtns = document.querySelectorAll('.lang-btn');

langBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Which language did the user click?
        // btn.dataset.lang reads data-lang="no" or data-lang="en" from HTML
        const chosenLang = btn.dataset.lang;

        // --- a) Update button appearance ---
        langBtns.forEach(function(b) {
            // classList.toggle(class, booleanValue):
            // Add the class if booleanValue is true, remove it if false
            b.classList.toggle('active', b.dataset.lang === chosenLang);
        });

        // --- b) Switch all text on the page ---
        // Find all elements that have BOTH data-no and data-en attributes
        const translatableElements = document.querySelectorAll('[data-no][data-en]');

        translatableElements.forEach(function(el) {
            // el.dataset is an object: { no: "Prosjekter", en: "Work" }
            // el.dataset[chosenLang] dynamically fetches the right translation
            el.textContent = el.dataset[chosenLang];
        });

        // --- c) Update <html lang="..."> ---
        // Tells the browser and assistive technology what language the page is in
        document.documentElement.lang = chosenLang;

        // --- d) Update typewriter text ---
        // Since .textContent overwrote it, reset and rewrite
        if (typewriterEl) {
            typewriterEl.textContent = '';
            const text = chosenLang === 'en' ? 'ARCHITECT' : 'ARKITEKT';
            typeText(typewriterEl, text, 90);
        }
    });
});


/* ============================================================
   4. PROJECT PAGE — TITLE SHRINKING ON SCROLL
   ============================================================
   On individual project pages (e.g. in-the-quarry.html) the
   title is sticky at the top. As you scroll down, the title
   gradually shrinks from 72px to 32px.

   Concepts:
   - window.scrollY: pixels scrolled down
   - Math.max(a, b): returns the LARGEST of two numbers (used as a floor)
   - Math.min(a, b): returns the SMALLEST of two numbers (used as a ceiling)

   Formula: size = 72 - (scrollY * 0.1)
   Example: at 400px scroll → 72 - 40 = 32px (minimum)
============================================================ */

const stickyTitle = document.querySelector('.project-header-sticky h1');

if (stickyTitle) {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;

        // Calculate new font size
        // Math.max ensures we never go below 32px
        const newSize = Math.max(32, 72 - scrolled * 0.1);

        // Set new font-size directly on the element
        stickyTitle.style.fontSize = newSize + 'px';
    });
}
