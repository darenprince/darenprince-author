document.addEventListener('DOMContentLoaded', async function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const megaMenu = document.querySelector('.js-mega-menu');
  const menuOverlay = document.querySelector('.js-menu-overlay');
  const menuClose = document.querySelector('.js-menu-close');
  const logoutBtn = document.querySelector('.logout-btn');
  const themeToggle = document.getElementById('themeToggle');
  const searchToggle = document.querySelector('.js-search-toggle');
  const searchBar = document.querySelector('.js-search-bar');

  let supabaseClient;
  if (window.supabase) {
    const SUPABASE_URL = 'https://ogftwcrihcihqahfasmg.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZnR3Y3JpaGNpaHFhaGZhc21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjAxNTcsImV4cCI6MjA2OTQ5NjE1N30.XI6epagbdQZgoxOnB63UYXUjUOZEpS8ezKPWuhToP9A';
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  let session = null;
  if (supabaseClient) {
    const { data } = await supabaseClient.auth.getSession();
    session = data.session;
  }

  if (menuToggle && megaMenu) {
    menuToggle.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
      megaMenu.classList.remove('submenu-active');
      const openSub = megaMenu.querySelector('.submenu.is-visible');
      if (openSub) openSub.classList.remove('is-visible');
      megaMenu.querySelector('.mega-menu-list').classList.remove('moves-out');
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
      megaMenu.classList.remove('submenu-active');
      const openSub = megaMenu.querySelector('.submenu.is-visible');
      if (openSub) openSub.classList.remove('is-visible');
      megaMenu.querySelector('.mega-menu-list').classList.remove('moves-out');
    });
  }

  if (logoutBtn) {
    if (session) {
      logoutBtn.innerHTML = '<i class="ti ti-door-exit"></i> Logout';
      logoutBtn.addEventListener('click', async function () {
        if (supabaseClient) await supabaseClient.auth.signOut();
        window.location.href = '/';
      });
    } else {
      logoutBtn.innerHTML = '<a href="/login.html"><i class="ti ti-key"></i> Log In</a>';
    }
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

  const submenuTriggers = document.querySelectorAll('.js-submenu-trigger');
  submenuTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      submenu.classList.add('is-visible');
      megaMenu.querySelector('.mega-menu-list').classList.add('moves-out');
      megaMenu.classList.add('submenu-active');
    });
  });

  const goBackLinks = document.querySelectorAll('.js-go-back');
  goBackLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const submenu = this.closest('.submenu');
      submenu.classList.remove('is-visible');
      megaMenu.querySelector('.mega-menu-list').classList.remove('moves-out');
      megaMenu.classList.remove('submenu-active');
    });
  });
});
