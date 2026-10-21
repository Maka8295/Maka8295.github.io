# Boards by Maka

Static site for GitHub Pages in the dungeonOS palette from `~/Dotfiles` (stone, bronze,
brass, moss, rust), with Cloister Black headings and Fantasque Sans Mono text.
No build step: plain HTML, CSS and JS plus WebP images.

## Layout

```
index.html         one <article class="project"> per project
styles.css         palette and layout
script.js          scroll reveal and lightbox
assets/            WebP images (KiCad renders, photos, schematics)
assets/fonts/      CloisterBlack.ttf, Fantasque.woff2 (subset)
.nojekyll          tells GitHub Pages to serve files as-is
```

## Deploy

Push to `master`. Pages is set to deploy from that branch at the root, so every push redeploys.

## Add a project

Copy one `<article class="project">` block and add a line to the list in the intro.
For a closed-source project add `sealed` to the article's class and use the
`<p class="source closed">` line.

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
