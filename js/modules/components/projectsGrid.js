import { projects } from "../../data.js";

export function initProjectsGrid() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = projects.map(item => `
    <a class="index-card" href="projectPages/projectPage.html?slug=${item.slug}">
      <img src="images/${item.folder}/${item.displayImage}" ${item.objectPosition ? `style="object-position: ${item.objectPosition}"` : ""} />
      <div class="index-card-text">
        <span>${item.title}</span>
        <span>${item.year} - ${item.gridType}</span>
      </div>
    </a>
  `).join("");
}