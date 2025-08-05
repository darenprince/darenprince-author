document.addEventListener('DOMContentLoaded', async function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const megaMenu = document.querySelector('.js-mega-menu');
  const menuOverlay = document.querySelector('.js-menu-overlay');
  const menuClose = document.querySelector('.js-menu-close');
  const authToggle = document.querySelector('.js-auth-toggle');
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

  if (menuClose && megaMenu) {
    menuClose.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
      megaMenu.classList.remove('submenu-active');
      const openSub = megaMenu.querySelector('.submenu.is-visible');
      if (openSub) openSub.classList.remove('is-visible');
      const list = megaMenu.querySelector('.mega-menu-list');
      if (list) list.classList.remove('moves-out');
    });
  }

  if (menuOverlay && megaMenu) {
    menuOverlay.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
      megaMenu.classList.remove('submenu-active');
      const openSub = megaMenu.querySelector('.submenu.is-visible');
      if (openSub) openSub.classList.remove('is-visible');
      const list = megaMenu.querySelector('.mega-menu-list');
      if (list) list.classList.remove('moves-out');
    });
  }

  if (authToggle) {
    if (session) {
      authToggle.innerHTML = '<i class="ti ti-door-exit"></i> Logout';
      authToggle.addEventListener('click', async function () {
        if (supabaseClient) await supabaseClient.auth.signOut();
        window.location.href = '/';
      });
    } else {
      authToggle.innerHTML = '<i class="ti ti-key"></i> Log In';
      authToggle.addEventListener('click', function () {
        window.location.href = '/login.html';
      });
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

  if (window.jQuery) {
    var $megaMenu = $('.js-mega-menu');
    var transition = 250;

    $megaMenu.find('.js-submenu-trigger').on('click', function (e) {
      e.preventDefault();
      var $trigger = $(this);
      var $submenu = $trigger.next('.submenu');
      var $parentList = $trigger.closest('.mega-menu-list');
      $parentList.addClass('moves-out');
      $megaMenu.addClass('submenu-active');
      setTimeout(function () {
        $submenu.removeClass('is-hidden').addClass('is-visible');
      }, transition);
    });

    $megaMenu.find('.js-go-back').on('click', function (e) {
      e.preventDefault();
      var $submenu = $(this).closest('.submenu');
      var $parentList = $submenu.closest('.mega-menu-list');
      $submenu.removeClass('is-visible');

      setTimeout(function () {
        $submenu.addClass('is-hidden');
        $parentList.removeClass('moves-out');
        $megaMenu.removeClass('submenu-active');
      }, transition);
    });
  }
});
