# The Codex of Boards — project portfolio

Static site for GitHub Pages styled as an illuminated manuscript. No build step: plain HTML, CSS and JS plus WebP images.

Headings use Cloister Black, bundled in `assets/fonts/`. Body text is EB Garamond from Google Fonts.

## Layout

```
index.html      page content (one <article class="project"> per project)
styles.css      theme and layout
script.js       lightbox, scroll reveal, hero tilt
assets/         WebP images (KiCad renders, photos, schematics)
assets/fonts/   Cloister Black (blackletter) for headings
.nojekyll       tells GitHub Pages to serve files as-is, skipping Jekyll
```

## Deploy to GitHub Pages

1. Create an empty public repo on GitHub named `Maka8295.github.io`
   (that name gives you the root URL `https://maka8295.github.io/`).
   Any other repo name works too and will be served at `https://maka8295.github.io/<repo>/`.
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:Maka8295/Maka8295.github.io.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**.
   Source: **Deploy from a branch**. Branch: `main`, folder `/ (root)`. Save.
4. Wait a minute or two. The live URL appears at the top of the Pages settings.

Every later `git push` to `main` redeploys automatically.

## Add a project

Copy one `<article class="chapter">` block in `index.html`, change the chapter
numeral, text, images and link, and add an entry to the table of contents.
For a closed-source project add `class="chapter sealed"` and use the
`<p class="source closed">` line instead of the open-source one.

## Regenerate board renders

Renders come straight from the KiCad board files (KiCad 8 or newer):

```bash
# isometric
kicad-cli pcb render -o out.png -w 2000 -h 1250 --quality high --background transparent \
  --perspective --rotate "-30,0,25" --zoom 0.9 path/to/board.kicad_pcb
# top view
kicad-cli pcb render -o out.png -w 2000 -h 1250 --quality high --background transparent \
  --zoom 1.0 path/to/board.kicad_pcb
# to web size
magick out.png -trim +repage -resize 1800x1800\> -quality 82 assets/name.webp
```

Photos: `magick photo.jpg -auto-orient -strip -resize 1800x1800\> -quality 84 assets/name.webp`
