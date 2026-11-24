# components

One stylesheet per part of the page. `main.css` imports each of them.

- `header.css` — the fixed header.
- `ticker.css` — the scrolling line.
- `cards.css` — the homepage grid.
- `project-nav.css` — the move from one project to the next.

A rule that only this part uses stays in its file. A value shared with other parts lives in `../shared/variables.css`.

The principle's word for this folder is not settled (`workflow/docs/03-architecture.md` § 1). It is held by `css/` and holds the four files above.
