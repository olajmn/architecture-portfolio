import { displayImages } from "../../data.js";

export function initProjectsGrid() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = displayImages.map(item => `
    <a class="index-card" href="${item.link}">
      <img src="${item.image}" />
      <div class="index-card-text">
        <span>${item.title}</span>
      </div>
    </a>
  `).join("");
}