import { projects } from "../../data.js";

export function initCarousel() {
  const container = document.getElementById("carousel");
  if (!container) return;

  const slideData = projects.flatMap(item =>
    item.carouselImages.map(img => ({
      folder: item.folder,
      src: typeof img === 'string' ? img : img.src,
      objectPosition: typeof img === 'string' ? item.objectPosition : img.objectPosition
    }))
  );

  container.innerHTML = slideData.map((slide, i) => `
    <a class="carousel-slide ${i === 0 ? "active" : ""}">
      <img src="images/${slide.folder}/${slide.src}" ${slide.objectPosition ? `style="object-position: ${slide.objectPosition}"` : ""} />
    </a>
  `).join("");

  const slides = document.querySelectorAll(".carousel-slide");

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  let queue = shuffle([...Array(slides.length).keys()]);
  let queueIndex = 0;
  let current = queue[0];

  slides.forEach(s => s.classList.remove("active"));
  slides[current].classList.add("active");

  function advance() {
    slides[current].classList.remove("active");
    queueIndex++;
    if (queueIndex >= queue.length) {
      do { shuffle(queue); } while (queue[0] === current);
      queueIndex = 0;
    }
    current = queue[queueIndex];
    slides[current].classList.add("active");
  }

  let timer = setInterval(advance, 4000);

  container.addEventListener('click', () => {
    advance();
    clearInterval(timer);
    timer = setInterval(advance, 4000);
  });
}

