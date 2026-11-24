# shared

Styles both pages use.

- `reset.css` — clears the browser defaults.
- `typography.css` — loads Inter from Google Fonts.
- `variables.css` — the colors, the font stack, the header offset and the frosted header.
- `base.css` — the page-wide defaults.

A value used by more than one component lives in `variables.css`. A component's own rules stay in `../components/`.

The principle's word for this folder is not settled (`workflow/docs/03-architecture.md` § 1). It is held by `css/` and holds the four files above.
