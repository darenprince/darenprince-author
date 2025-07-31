// Main site functionality: hamburger menu and theme toggle
// Handles responsive navigation and dark/light theme switching

// Hamburger menu toggle
const navToggle = document.querySelector('.js-toggle-nav');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', function () {
    nav.classList.toggle('is-visible');
    navToggle.classList.toggle('is-open');
  });
}

// Theme toggle logic (defaults to dark mode)
(function() {
  const btn = document.querySelector('[data-toggle-theme]');
  if (!btn) return;
  const body = document.body;
  const sun = btn.querySelector('.icon-sun');
  const moon = btn.querySelector('.icon-moon');

  function apply(theme) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add('theme-' + theme, 'theme-fade');
    setTimeout(() => body.classList.remove('theme-fade'), 300);
    if (sun && moon) {
      if (theme === 'dark') {
        sun.style.display = 'none';
        moon.style.display = '';
      } else {
        sun.style.display = '';
        moon.style.display = 'none';
      }
    }
  }

  let saved = localStorage.getItem('theme');
  if (!saved) saved = 'dark';
  apply(saved);

  btn.addEventListener('click', function () {
    const newTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    apply(newTheme);
  });
})();
