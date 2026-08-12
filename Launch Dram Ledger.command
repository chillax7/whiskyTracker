#!/bin/bash
# Double-click (or drag onto the Dock and click) to start The Dram Ledger
# and open it in your browser. Safe to run from anywhere — it locates the
# project by its own location, following symlinks/aliases if needed.
set -e

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
cd "$DIR"

# Dock launches use a non-interactive shell, so make sure Homebrew/nvm
# installs of Node are on PATH even if .zshrc/.bash_profile weren't sourced.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"

echo "The Dram Ledger"
echo "================"
echo "Project: $DIR"
echo

if ! command -v npm >/dev/null 2>&1; then
  echo "npm was not found. Install Node.js from https://nodejs.org and try again."
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies (first run only)..."
  npm install
fi

echo "Starting the dev server and opening your browser..."
npm run dev -- --open
