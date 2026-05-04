export function renderProject(data) {
  const container = document.getElementById("projectContent");
  if (!container) return;

  const factsHTML = Object.entries(data.facts).map(([key, val]) =>
    `<dt>${key}</dt><dd>${val}</dd>`
  ).join('');

  const heroImage = data.images[0];
  const galleryImages = data.images.slice(1);

  const galleryHTML = galleryImages.map(img =>
    `<div class="img-${img.size || 'wide'}">
        <img src="images/${data.folder}/${img.src}">
        ${img.caption ? `<p class="img-caption">${img.caption}</p>` : ''}
    </div>`
  ).join('');

  container.innerHTML = `
    <div class="project-ticker">
      <button onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
        ${data.title}
      </button>
    </div>

    <div class="img-wide">
      <img src="images/${data.folder}/${heroImage.src}">
    </div>

    <div class="project-intro-block">
      <p>${data.desc}</p>
      <dl>${factsHTML}</dl>
    </div>

    ${galleryHTML}
  `;
}