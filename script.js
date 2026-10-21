document.documentElement.classList.add('js');

// ---- Reveal projects as they scroll into view ----
const projects = document.querySelectorAll('.project');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  projects.forEach(p => io.observe(p));
} else {
  projects.forEach(p => p.classList.add('in'));
}

// ---- Lightbox ----
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img'), lbCap = document.getElementById('lb-cap'), lbCount = document.getElementById('lb-count');
const zoomables = Array.from(document.querySelectorAll('.zoomable'));
let current = -1;

function captionFor(img) {
  const fig = img.closest('figure'); const cap = fig && fig.querySelector('figcaption');
  return cap ? cap.textContent : img.alt;
}
function show(i) {
  current = (i + zoomables.length) % zoomables.length;
  const src = zoomables[current];
  lbImg.src = src.currentSrc || src.src;
  lbImg.alt = src.alt;
  lbCap.textContent = captionFor(src);
  lbCount.textContent = `${current + 1} / ${zoomables.length}`;
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
