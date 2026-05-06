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
        <span>${item.title}</span>
        <span>${item.year} - ${item.gridType}</span>
      </div>
    </a>
  `;
  }).join("");
}