// Homepage project grid. Each card shows a project's thumbnail image
// (via getThumbnailImage — the optional `thumbnail`, else images[0]).

import { getAllProjects, getThumbnailImage, imageUrl } from "../projects.js";

export function initProjectGrid() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = getAllProjects().map((project) => {
    const thumbnail = getThumbnailImage(project);
    return `
    <a class="index-card" href="project.html?slug=${project.slug}">
      <img src="${imageUrl(project, thumbnail)}" alt="${thumbnail.alt}"
           ${thumbnail.focalPoint ? `style="object-position: ${thumbnail.focalPoint}"` : ""} />
      <div class="index-card-text">
        <div class="index-card-text-track">
          <span>${project.title}</span>
          <span>${project.year} - ${project.type}</span>
        </div>
      </div>
    </a>
  `;
  }).join("");

  // The marquee only plays on hover, so skip it on touch devices
  if (!window.matchMedia("(hover: hover)").matches) return;

  // After layout is calculated, check each card for text overflow.
  // Card widths change with the window, so re-check on resize.
  requestAnimationFrame(() => updateMarquees(grid));

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => updateMarquees(grid), 150);
  });
}

function updateMarquees(grid) {
  grid.querySelectorAll(".index-card").forEach((card) => {
    const textEl = card.querySelector(".index-card-text");
    if (!textEl) return;

    removeMarquee(textEl);
    const track = textEl.querySelector(".index-card-text-track");

    const style     = getComputedStyle(textEl);
    const available = textEl.clientWidth
      - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    if (track.offsetWidth <= available) return; // text fits — no marquee needed

    // Duplicate the track for a seamless loop
    const clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");

    const scroller = document.createElement("div");
    scroller.className = "index-card-text-scroller";
    scroller.appendChild(track);
    scroller.appendChild(clone);
    textEl.appendChild(scroller);
    textEl.classList.add("marquee");

    // Gap = full card width — text needs to travel one card-width before looping back
    track.style.paddingRight = `${card.offsetWidth}px`;
    const w        = track.offsetWidth; // re-measured after padding is set
    const duration = (w / 45).toFixed(1); // 45px per second
    scroller.style.setProperty("--marquee-w", `${w}px`);
    scroller.style.setProperty("--marquee-t", `${duration}s`);
  });
}

// Undo a previous marquee setup, leaving the card with its single track
function removeMarquee(textEl) {
  const scroller = textEl.querySelector(".index-card-text-scroller");
  if (!scroller) return;

  const track = scroller.firstElementChild;
  track.style.paddingRight = "";
  textEl.appendChild(track);
  scroller.remove();
  textEl.classList.remove("marquee");
}
