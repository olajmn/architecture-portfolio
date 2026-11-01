// Entry point for both pages: starts the components, and the project page's only on project.html.

import { markIntroSeen }    from "./state.js";
import { initHeader }       from "./components/header.js";
import { initTicker }       from "./components/ticker.js";
import { initProjectGrid }  from "./components/projectGrid.js";
import { initIndexScroll }  from "./components/indexScroll.js";
import { initProjectPage }  from "./components/projectPage.js";

markIntroSeen();
initHeader();
initTicker();
initProjectGrid();
initIndexScroll();

if (document.body.dataset.page === "project") {
  initProjectPage();
}
