// Pure view: Project -> HTML string. No side effects beyond writing to
// #projectContent, no data lookup — the caller (projectPage.js) hands
// it a resolved Project.

import { getGalleryImages, getCoverImage, imageUrl } from "../projects.js";

const EMPHASIS_CLASS = {
  large:  "img-large",
  medium: "img-medium",
  small:  "img-small",
};

function imageClass(image) {
  return EMPHASIS_CLASS[image.emphasis] || EMPHASIS_CLASS.large;
}

export function renderProject(project) {
  const container = document.getElementById("projectContent");
  if (!container) return;

  const hero = getCoverImage(project);
  const gallery = getGalleryImages(project);

  const factsHTML = `
    <dt>Location</dt><dd>${project.location}</dd>
    <dt>Type</dt><dd>${project.type}</dd>
    <dt>Program</dt><dd>${project.program}</dd>
    <dt>Year</dt><dd>${project.year}</dd>
  `;

  const descHTML = project.description.map((paragraph) => `<p>${paragraph}</p>`).join('');

  const galleryHTML = gallery.map((image) => `
    <div class="${imageClass(image)}">
        <img src="${imageUrl(project, image)}" alt="${image.alt}">
        ${image.caption ? `<p class="img-caption">${image.caption}</p>` : ''}
    </div>`).join('');

  container.innerHTML = `
    <div class="project-ticker">
      <button class="project-ticker-btn" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
        ${project.title}
      </button>
    </div>

    <div class="img-large">
      <img src="${imageUrl(project, hero)}" alt="${hero.alt}">
    </div>

    <div class="project-intro-block">
      <h1 class="project-title">${project.title}</h1>
      <div class="project-desc">${descHTML}</div>
      <dl class="project-facts">${factsHTML}</dl>
    </div>

    ${galleryHTML}

    <div class="project-top-btn-wrap">
      <button class="project-top-btn" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
        Top
      </button>
    </div>
  `;
}
