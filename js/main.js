document.addEventListener('DOMContentLoaded', async function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const megaMenu = document.querySelector('.js-mega-menu');
  const menuOverlay = document.querySelector('.js-menu-overlay');
  const menuClose = document.querySelector('.js-menu-close');
  const authToggle = document.querySelector('.js-auth-toggle');
  const searchToggle = document.querySelector('.js-search-toggle');
  const searchBar = document.querySelector('.js-search-bar');
  const modalOverlay = document.getElementById('demo-modal');
  const componentSelect = document.querySelector('.component-nav__select');

  // ---------------------------
  // menu + search event binding
  // ---------------------------

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

  // default auth toggle -> login
  let loginHandler;
  if (authToggle) {
    loginHandler = function () {
      window.location.href = '/login.html';
    };
    authToggle.innerHTML = '<i class="ti ti-key"></i> Log In';
    authToggle.addEventListener('click', loginHandler);
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

  // ---------------------------
  // Demo modal + component nav
  // ---------------------------

  if (modalOverlay) {
    const openBtn = document.querySelector('.js-open-modal');
    const closeBtn = modalOverlay.querySelector('.js-close-modal');

    if (openBtn) {
      openBtn.addEventListener('click', function () {
        modalOverlay.classList.add('is-visible');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        modalOverlay.classList.remove('is-visible');
      });
    }
  }

  if (componentSelect) {
    componentSelect.addEventListener('change', function () {
      const target = document.querySelector(this.value);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ---------------------------
  // Supabase auth handling
  // ---------------------------

  try {
    const { default: supabase } = await import('../supabase/client.js');
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (authToggle && session) {
      authToggle.removeEventListener('click', loginHandler);
      authToggle.innerHTML = '<i class="ti ti-door-exit"></i> Logout';
      authToggle.addEventListener('click', async function () {
        await supabase.auth.signOut();
        window.location.href = '/';
      });
    }
  } catch (error) {
    console.warn('Supabase unavailable: auth features disabled', error);
    if (authToggle) {
      authToggle.title = 'Authentication service unavailable';
    }
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
