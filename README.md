# The Dram Ledger

A private, browser-based whisky journal for the discerning collector — a dark,
old-school gentlemen's-club aesthetic wrapped around a modern React app. Every
entry is kept locally in your browser via `localStorage`; nothing is sent
anywhere.

## Features

- **Log a New Dram** — record a bottle's name, distillery, region, age, ABV,
  barcode, personal rating, tasting notes, and a five-axis flavor profile.
- **Webcam Barcode Scanner** — point your Mac's webcam at a bottle and its
  barcode auto-fills the "Barcode Number" field, powered by `html5-qrcode`.
- **Flavor Fingerprint** — a `recharts` radar chart across Peat & Smoke,
  Sweetness, Oak & Wood, Spice, and Fruit, styled with brassy grid lines and a
  translucent amber "liquid" fill.
- **The Cellar Book** — a scrollable list of every dram you've logged; select
  one to inspect its flavor profile.

## Stack

React 19 + Vite + Tailwind CSS v4, `recharts` for the radar chart, and
`html5-qrcode` for the live camera barcode scanner.

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL in a Mac browser (Chrome or Safari) and grant
camera access to use the bottle scanner.

### One-click launch on macOS

Two options, both at the project root:

- **`Dram Ledger.app`** — has a custom whisky-glass Dock icon. Drag it onto
  the Dock and click it there anytime; it opens Terminal, installs
  dependencies on first run, starts the dev server, and opens the app in
  your browser. Must stay next to `package.json` (i.e. inside the cloned
  project) — it locates the project relative to its own bundle.
- **`Launch Dram Ledger.command`** — the plain-script equivalent, in case you
  prefer not to run an unsigned `.app`. Double-click, or drag it onto the
  Dock instead.

Since neither is code-signed, the first time you open one macOS will warn
it's from an unidentified developer — right-click (or Control-click) it and
choose **Open** once to approve it. If Gatekeeper instead says the app "is
damaged" (this can happen if it reached your Mac via a browser/chat download
rather than `git clone`/`git pull`), clear the quarantine flag in Terminal:
`xattr -cr "Dram Ledger.app"`.

```bash
npm run build   # production build
npm run lint    # oxlint
```
