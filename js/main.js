import { initIntro }        from "./modules/components/intro.js";
import { initCarousel }     from "./modules/components/carousel.js";
import { initLogo }         from "./modules/components/logo.js";
import { initBurgerMenu }   from "./modules/components/menu.js";
import { initIndexScroll }  from "./modules/components/indexScroll.js";
import { initTicker }       from "./modules/components/ticker.js";
import { initProjectsGrid } from "./modules/components/projectsGrid.js";
initIntro();
initBurgerMenu();
initCarousel();
initLogo();
initTicker();
initProjectsGrid();
initIndexScroll();


// PROJECT PAGE // 
import { initProjectPage } from "../projectPages/projectPage.js";

const page = document.body.dataset.page;

if (page === "project") {
  initProjectPage();
}