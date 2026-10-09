# Verbatempus - Terminal

A simple terminal style display for the Verbatempus javascript library.

Shows the current date and time as one typed-out sentence, using
[`verbatempus`](https://www.npmjs.com/package/verbatempus) 2.x. It updates on the minute.

Live at <https://terminal.verbatempus.com>. Pick a level with `?level=`:
`verbose` (default), `lengthy`, `short`, `terse`.

## Development

```sh
npm install
npm run dev       # local dev server
npm test          # vitest
npm run lint
npm run build     # production build into dist/
npm run deploy    # build, then publish dist/ to the gh-pages branch
```
