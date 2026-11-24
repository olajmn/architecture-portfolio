# components

One file per part of the page.

- `header.js` — the logo.
- `ticker.js` — the scrolling "Selected Works" line.
- `projectGrid.js` — the homepage grid.
- `indexScroll.js` — restores the homepage scroll position.
- `projectPage.js` — the project page's controller.
- `render.js` — turns a project into HTML. It looks nothing up.
- `projectNav.js` — the move from one project page to the next.

A file gets projects through `../projects.js`. `render.js` is handed a project and its neighbours by `projectPage.js`.

The principle's word for this folder is not settled (`workflow/docs/03-architecture.md` § 1). It is held by `src/` and holds the seven files above.
