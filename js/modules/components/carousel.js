import { displayImages } from "../../data.js";

export function initCarousel() {
  const container = document.getElementById("carousel");
  if (!container) return;

  container.innerHTML = displayImages.map((item, i) => `
    <a class="carousel-slide ${i === 0 ? "active" : ""}">
      <img src="${item.image}" />
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

  setInterval(() => {
    slides[current].classList.remove("active");
    queueIndex++;
    if (queueIndex >= queue.length) {
      do { shuffle(queue); } while (queue[0] === current);
      queueIndex = 0;
    }

    current = queue[queueIndex];
    slides[current].classList.add("active");
  }, 4000);
}

