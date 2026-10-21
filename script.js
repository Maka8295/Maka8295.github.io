document.documentElement.classList.add('js');

// ---- Clock, like the bar's ----
const tEl = document.getElementById('clock-time'), dEl = document.getElementById('clock-date');
function tick() {
  const n = new Date(), p = (x) => String(x).padStart(2, '0');
  tEl.textContent = `${p(n.getHours())}:${p(n.getMinutes())}`;
  dEl.textContent = `${p(n.getMonth() + 1)}/${p(n.getDate())}`;
}
tick(); setInterval(tick, 15000);

// ---- Old English greeting, a random one each visit (fish/greetings.txt) ----
const GREETINGS = [
  ["Wes hāl", "Be well"], ["Hwæt!", "Listen!"], ["Wyrd bið ful āræd", "Fate is wholly fixed"],
  ["Gǣð ā wyrd swā hīo scel", "Fate always goes as it must"], ["Þæs oferēode, þisses swā mæg", "That passed away, so may this"],
  ["Þæt wæs gōd cyning!", "That was a good king!"], ["Ofer hronrāde", "Over the whale-road"],
  ["Hāl wes þū, folde, fīra mōdor", "Hail to you, earth, mother of men"], ["Ēalā Ēarendel, engla beorhtast", "Hail Earendel, brightest of angels"],
  ["Wyrce sē þe mōte dōmes ǣr dēaþe", "Let him who may win glory before death"],
  ["Hige sceal þē heardra, heorte þē cēnre", "The will must be the firmer, the heart the keener"],
  ["Mōd sceal þē māre, þē ūre mægen lȳtlað", "Courage must be the greater as our strength wanes"],
  ["Ūre ǣghwylc sceal ende gebīdan", "Each of us must await the end"], ["Ne sorga, snotor guma", "Do not grieve, wise man"],
  ["Wyrd oft nereð unfǣgne eorl, þonne his ellen dēah", "Fate often spares the undoomed man, when his courage holds"],
  ["Swā sceal mǣg dōn", "So should a kinsman do"], ["Oft him ānhaga āre gebīdeð", "Often the lone one lives to find grace"],
  ["Hwǣr cwōm mearg? Hwǣr cwōm mago?", "Where has the horse gone? Where the young rider?"],
  ["Hēr bið feoh lǣne, hēr bið frēond lǣne", "Here wealth is fleeting, here a friend is fleeting"],
  ["Wita sceal geþyldig", "A wise man must be patient"], ["Dagas sind gewitene", "The days are gone"],
  ["Wyrd biþ swīþre, Meotud meahtigra", "Fate is stronger, the Lord mightier"],
  ["Cyning sceal rīce healdan", "A king must rule a kingdom"], ["Wyrd byð swīðost", "Fate is strongest"],
  ["Draca sceal on hlǣwe, frōd, frætwum wlanc", "The dragon belongs in its barrow, old, proud of its treasures"],
  ["Ellen sceal on eorle", "Courage belongs in a warrior"], ["Sōð bið swutolost", "Truth is clearest"],
  ["Wulf sceal on bearowe", "The wolf belongs in the forest"],
  ["Wrǣtlic is þes wealstān, wyrde gebrǣcon", "Wondrous is this wall-stone; fate shattered it"],
  ["Saga hwæt ic hātte", "Say what I am called"], ["Nū sculon herigean heofonrīces Weard", "Now we must praise the Guardian of heaven's kingdom"],
  ["Feoh byþ frōfur fīra gehwylcum", "Wealth is a comfort to every man"],
];
(function greet() {
  const oe = document.getElementById('oe'), en = document.getElementById('oe-en');
  let last = null; try { last = localStorage.getItem('greet'); } catch (e) {}
  let pick; do { pick = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]; } while (GREETINGS.length > 1 && pick[0] === last);
  // w becomes wynn (ƿ) as the fish greeting does
  oe.textContent = pick[0].replace(/W/g, 'Ƿ').replace(/w/g, 'ƿ'); en.textContent = pick[1];
  try { localStorage.setItem('greet', pick[0]); } catch (e) {}
})();

// ---- Workspace highlight follows the chapter in view ----
const chapters = Array.from(document.querySelectorAll('.chapter'));
const wsLinks = Array.from(document.querySelectorAll('.workspaces a'));
function setActive(ws) { wsLinks.forEach(a => a.classList.toggle('active', a.dataset.ws === ws)); }
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); } }, { rootMargin: '0px 0px -8% 0px' });
  chapters.forEach(c => reveal.observe(c));
  const spy = new IntersectionObserver((es) => {
    const vis = es.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (vis.length) setActive(vis[0].target.dataset.ws);
  }, { threshold: [0.25, 0.5, 0.75], rootMargin: '-10% 0px -40% 0px' });
  chapters.forEach(c => spy.observe(c));
} else {
  chapters.forEach(c => c.classList.add('in'));
}

// ---- Lightbox: a viewer window with the potion loader ----
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img'), lbCap = document.getElementById('lb-cap');
const lbName = document.getElementById('lb-name'), lbCount = document.getElementById('lb-count');
const stage = lb.querySelector('.lb-stage');
const zoomables = Array.from(document.querySelectorAll('.zoomable'));
let current = -1;

function captionFor(img) {
  const fig = img.closest('figure'); const cap = fig && fig.querySelector('figcaption');
  return cap ? cap.textContent : img.alt;
}
function show(i) {
  current = (i + zoomables.length) % zoomables.length;
  const src = zoomables[current];
  stage.classList.add('loading');
  lbImg.onload = () => stage.classList.remove('loading');
  lbImg.src = src.currentSrc || src.src;
  lbImg.alt = src.alt;
  lbName.textContent = (src.getAttribute('src') || '').split('/').pop();
  lbCap.textContent = captionFor(src);
  lbCount.textContent = `${current + 1}/${zoomables.length}`;
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
}
function hide() { lb.hidden = true; lbImg.src = ''; document.body.style.overflow = ''; }

zoomables.forEach((img, i) => img.addEventListener('click', () => show(i)));
lb.querySelector('.lb-close').addEventListener('click', hide);
lb.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
lb.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
lb.addEventListener('click', (e) => { if (e.target === lb || e.target === lbImg) hide(); });
document.addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') hide();
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

document.getElementById('year').textContent = new Date().getFullYear();
