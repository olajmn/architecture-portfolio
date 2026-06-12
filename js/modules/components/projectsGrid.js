import { projects } from "../../data.js";

export function initProjectsGrid() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = projects.map(item => {
    const src = typeof item.displayImage === 'string' ? item.displayImage : item.displayImage.src;
    const pos = typeof item.displayImage === 'string' ? '' : item.displayImage.objectPosition;
    return `
    <a class="index-card" href="projectPages/projectPage.html?slug=${item.slug}">
      <img src="images/${item.folder}/${src}" ${pos ? `style="object-position: ${pos}"` : ""} />
      <div class="index-card-text">
        <div class="index-card-text-track">
          <span>${item.title}</span>
          <span>${item.year} - ${item.gridType}</span>
        </div>
      </div>
    </a>
  `;
  }).join("");

  if (window.innerWidth <= 768) return;

  // After layout is calculated, check each card for text overflow
  requestAnimationFrame(() => {
    grid.querySelectorAll('.index-card').forEach(card => {
      const textEl = card.querySelector('.index-card-text');
      const track  = textEl?.querySelector('.index-card-text-track');
      if (!textEl || !track) return;

      const available = textEl.clientWidth - 20; // minus 10px padding each side
      if (track.offsetWidth <= available) return; // text fits — no marquee needed

      // Duplicate the track for a seamless loop
      const clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');

      const scroller = document.createElement('div');
      scroller.className = 'index-card-text-scroller';
      scroller.appendChild(track);
      scroller.appendChild(clone);
      textEl.appendChild(scroller);
      textEl.classList.add('marquee');

      // Gap = full card width — text needs to travel one card-width before looping back
      track.style.paddingRight = `${card.offsetWidth}px`;
      const w        = track.offsetWidth; // re-measured after padding is set
      const duration = (w / 45).toFixed(1); // 45px per second
      scroller.style.setProperty('--marquee-w', `${w}px`);
      scroller.style.setProperty('--marquee-t', `${duration}s`);
    });
  });
}
