const navToggle = document.querySelector('.js-toggle-nav');
const navMenu = document.getElementById('primary-navigation');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.classList.toggle('menu-open');
    navMenu.classList.toggle('menu-open');
  });
}

const submenuToggles = document.querySelectorAll('.submenu-toggle');
submenuToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const submenu = btn.nextElementSibling;
    if (submenu) submenu.classList.toggle('menu-open');
    btn.classList.toggle('menu-open');
  });
});
