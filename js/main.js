document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const megaMenu = document.querySelector('.js-mega-menu');
  const menuClose = document.querySelector('.js-close-menu');
  const logoutBtn = document.querySelector('.logout-btn');
  const themeToggle = document.getElementById('themeToggle');
  const searchToggle = document.querySelector('.js-search-toggle');
  const searchBar = document.querySelector('.js-search-bar');

  if (menuToggle && megaMenu) {
    menuToggle.addEventListener('click', function () {
      megaMenu.classList.toggle('visible');
    });
  }

  if (menuClose && megaMenu) {
    menuClose.addEventListener('click', function () {
      megaMenu.classList.remove('visible');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      // Supabase logout logic would go here
      window.location.href = '/';
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      document.body.classList.toggle('theme-dark');
      document.body.classList.toggle('theme-light');
    });
  }

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', function () {
      if (searchBar.hasAttribute('hidden')) {
        searchBar.removeAttribute('hidden');
        const input = searchBar.querySelector('input[type="search"]');
        if (input) input.focus();
      } else {
        searchBar.setAttribute('hidden', '');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !searchBar.hasAttribute('hidden')) {
        searchBar.setAttribute('hidden', '');
        searchToggle.focus();
      }
    });
  }
});
