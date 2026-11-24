# src

The JavaScript that runs the site. `main.js` starts the components, and the project page's only when `<body data-page="project">`. `projects.js` is the only file that reads `data/projects.js`. `state.js` is the only module that touches `sessionStorage`. `components/` holds one file per part of the page.

A file here gets project content through `projects.js`. It does not import `data/projects.js`. Nothing here touches `sessionStorage` except `state.js`. The inline script in `index.html` reads the same keys, because it runs before the modules load.

The principle's word for this folder is not settled (`workflow/docs/03-architecture.md` § 1). It is held by the project and holds `main.js`, `projects.js`, `state.js` and `components/`.
