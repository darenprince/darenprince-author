document.addEventListener('DOMContentLoaded', async function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const megaMenu = document.querySelector('.js-mega-menu');
  const menuOverlay = document.querySelector('.js-menu-overlay');
  const logoutBtn = document.querySelector('.logout-btn');
  const themeToggle = document.getElementById('themeToggle');
  const searchToggle = document.querySelector('.js-search-toggle');
  const searchBar = document.querySelector('.js-search-bar');

  let supabaseClient;
  if (window.supabase) {
    const SUPABASE_URL = 'YOUR_SUPABASE_URL';
    const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
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

  if (menuOverlay) {
    menuOverlay.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
    });
  }

  if (logoutBtn) {
    if (session) {
      logoutBtn.innerHTML = '<i class="ti ti-logout"></i> Logout';
      logoutBtn.addEventListener('click', async function () {
        if (supabaseClient) await supabaseClient.auth.signOut();
        window.location.href = '/';
      });
    } else {
      logoutBtn.innerHTML = '<i class="ti ti-login"></i><a href="/login.html">Log In</a>';
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
});
