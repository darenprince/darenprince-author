document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('autoZoomHero');
  if (!hero) return;
  const maxScale = 1.05;
  const minScale = 1;
  const updateScale = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
    const scale = maxScale - (maxScale - minScale) * progress;
    hero.style.setProperty('--hero-scale', scale);
  };
  hero.style.setProperty('--hero-scale', maxScale);
  window.addEventListener('scroll', updateScale);
  updateScale();

  const cta = hero.querySelector('.hero-cta');
  const targetSelector = cta ? cta.getAttribute('href') : null;
  const targetEl = targetSelector ? document.querySelector(targetSelector) : null;
  if (targetEl) {
    hero.addEventListener('click', (e) => {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
