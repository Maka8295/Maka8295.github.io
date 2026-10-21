# Boards by Maka — dungeonOS edition

Static site for GitHub Pages, themed after the dungeonOS desktop in `~/Dotfiles`:
the stone-and-bronze palette, the 1px bronze / 3px band double-rule frame with its
drop shadow, Cloister Black for UI text, a left-hand bar with roman-numeral
workspaces, the King's College Chapel wallpaper, and the Final Fantasy Tactics
item sprites as cursors. No build step: plain HTML, CSS and JS plus WebP images.

## Layout

```
index.html         one <article class="window chapter"> per project, plus two terminal windows
styles.css         palette, frame, bar, windows, lightbox, cursors
script.js          clock, random Old English greeting, workspace scroll-spy, lightbox
assets/            WebP images (KiCad renders, photos, schematics), wallpaper
assets/fonts/      CloisterBlack.ttf, Fantasque.woff2 (subset), azukiB-numerals.woff2 (subset),
                   DejaVuSymbols.woff2 (♰ and icons)
assets/cursors/    FFT sprites at 2× for CSS cursors, and the potions strip for the loader
.nojekyll          tells GitHub Pages to serve files as-is
```

## Deploy

Push to `master`. Pages is set to deploy from that branch at the root, so every push redeploys.

## Add a project

Copy one `<article class="window chapter">` block, give it the next numeral in its tab bar,
set `data-ws` to the same number, and add matching entries to the bar's workspace list and
the `ls` listing in the greeting window. For a closed-source project add `sealed` to the
article's class, keep the `♰ sealed` tab, and use the `<p class="source closed">` line.

## Regenerate things

Board renders (KiCad 8 or newer):

```bash
kicad-cli pcb render -o out.png -w 2000 -h 1250 --quality high --background transparent \
  --perspective --rotate "-30,0,25" --zoom 0.9 path/to/board.kicad_pcb    # isometric
kicad-cli pcb render -o out.png -w 2000 -h 1250 --quality high --background transparent \
  --zoom 1.0 path/to/board.kicad_pcb                                        # top view
magick out.png -trim +repage -resize 1800x1800\> -quality 82 assets/name.webp
```

Photos: `magick photo.jpg -auto-orient -strip -resize 1800x1800\> -quality 84 assets/name.webp`

Cursors, after editing `~/Dotfiles/cursor/dungeonOS-cursor-src/fft/`: scale each 24px sprite
2× with nearest-neighbour into `assets/cursors/`; hotspots in `styles.css` follow `build.py`.

Greetings: the list in `script.js` mirrors `~/Dotfiles/fish/greetings.txt`.
