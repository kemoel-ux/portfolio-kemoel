document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.hidden = false;
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.project, .about > div, .service').forEach(element => observer.observe(element));
}
document.querySelectorAll('.project-image img').forEach(img => {
  const fallback = () => {
    img.hidden = true; img.style.display = 'none';
    const label = document.createElement('span');
    label.className = 'image-fallback'; label.textContent = 'Ver capa e projeto no Behance ↗';
    img.parentElement.append(label);
  };
  img.addEventListener('error', fallback, { once: true });
  if (img.complete && img.naturalWidth === 0) fallback();
});

const filmList = document.querySelector('.film-list');
const player = document.querySelector('#film-player');
const filmTitle = document.querySelector('#film-title');
filmList.addEventListener('click', event => {
  const film = event.target.closest('a');
  if (!film || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const title = film.textContent.trim();
  if (!film.hasAttribute('aria-current')) {
    filmList.querySelector('[aria-current]')?.removeAttribute('aria-current');
    film.setAttribute('aria-current', 'true');
    player.poster = film.dataset.poster;
    player.src = film.href;
    player.setAttribute('aria-label', title);
    filmTitle.textContent = title;
  }
  player.play().catch(() => player.focus());
});
