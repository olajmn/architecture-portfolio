export function renderProject(data) {
  const container = document.getElementById("projectContent");
  if (!container) return;

  const factsHTML = Object.entries(data.facts).map(([key, val]) =>
    `<dt>${key}</dt><dd>${val}</dd>`
  ).join('');

  const heroImage = data.images[0];
  
  const galleryImages = data.images.slice(1);

  const galleryHTML = galleryImages.map(img => {
    const style = [
      img.paddingTop    ? `padding-top: ${img.paddingTop}`       : '',
      img.paddingBottom ? `padding-bottom: ${img.paddingBottom}` : '',
    ].filter(Boolean).join('; ');

    return `<div class="img-${img.size || 'wide'}"${style ? ` style="${style}"` : ''}>
        <img src="../images/${data.folder}/${img.src}">
        ${img.caption ? `<p class="img-caption">${img.caption}</p>` : ''}
    </div>`;
  }).join('');

  container.innerHTML = `
    <div class="project-ticker">
      <button class="project-ticker-btn" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
        ${data.title}
      </button>
    </div>

    <div class="img-wide">
      <img src="../images/${data.folder}/${heroImage.src}">
    </div>

    <div class="project-intro-block">
      <h1 class="project-title">${data.title}</h1>
      <p class="project-intro">${data.desc}</p>
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