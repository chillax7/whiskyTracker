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

```bash
npm run build   # production build
npm run lint    # oxlint
```
