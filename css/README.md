# css

The styles. `main.css` imports `shared/` and `components/`, and both pages load it. `pages/project.css` is linked only by `project.html`.

A value used by more than one part lives in `shared/variables.css`. A component's styles are one file in `components/`. Styles used on one page only go in `pages/`. `pages/` holds a single file, so it has no readme of its own.

The principle's word for this folder is not settled (`workflow/docs/03-architecture.md` § 1). It is held by the project and holds `main.css`, `shared/`, `components/` and `pages/`.
