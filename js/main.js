document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const megaMenu = document.querySelector('.js-mega-menu');
  const logoutBtn = document.querySelector('.logout-btn');
  const themeToggle = document.getElementById('themeToggle');

  if (menuToggle && megaMenu) {
    menuToggle.addEventListener('click', function () {
      megaMenu.classList.toggle('visible');
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
      document.body.classList.toggle('dark-mode');
      document.body.classList.toggle('light-mode');
    });
  }
});
