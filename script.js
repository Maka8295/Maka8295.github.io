document.documentElement.classList.add('js');

// ---- Reveal chapters as they scroll into view ----
const chapters = document.querySelectorAll('.chapter');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  chapters.forEach(c => io.observe(c));
} else {
  chapters.forEach(c => c.classList.add('in'));
}

// ---- Lightbox ----
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
const zoomables = Array.from(document.querySelectorAll('.zoomable'));
let current = -1;

function captionFor(img) {
  const fig = img.closest('figure');
  const cap = fig && fig.querySelector('figcaption');
  return cap ? cap.textContent : img.alt;
}
function show(i) {
  current = (i + zoomables.length) % zoomables.length;
  const src = zoomables[current];
  lbImg.src = src.currentSrc || src.src;
  lbImg.alt = src.alt;
  lbCap.textContent = captionFor(src);
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
}
function hide() {
  lb.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
}

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

// ---- Year in the colophon ----
document.getElementById('year').textContent = new Date().getFullYear();
