document.documentElement.classList.add('js');

// ---- Reveal projects as they scroll into view ----
const projects = document.querySelectorAll('.project');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  projects.forEach(p => io.observe(p));
} else {
  projects.forEach(p => p.classList.add('in'));
}

// ---- Gentle 3D tilt on the hero image ----
const tilt = document.querySelector('[data-tilt]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (tilt && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
  tilt.addEventListener('mousemove', (ev) => {
    const r = tilt.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5;
    const y = (ev.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  tilt.addEventListener('mouseleave', () => { tilt.style.transform = ''; });
}

// ---- Lightbox ----
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
const zoomables = Array.from(document.querySelectorAll('.zoomable'));
let current = -1;

function show(i) {
  current = (i + zoomables.length) % zoomables.length;
  const src = zoomables[current];
  lbImg.src = src.currentSrc || src.src;
  lbImg.alt = src.alt;
  lbCap.textContent = src.alt;
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

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();
