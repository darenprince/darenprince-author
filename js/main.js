document.addEventListener('DOMContentLoaded', async function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const megaMenu = document.querySelector('.js-mega-menu');
  const menuOverlay = document.querySelector('.js-menu-overlay');
  const menuClose = document.querySelector('.js-menu-close');
  const authToggle = document.querySelector('.js-auth-toggle');
  const searchToggle = document.querySelector('.js-search-toggle');
  const searchBar = document.querySelector('.js-search-bar');
  let searchModal;
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
      const openSub = megaMenu.querySelector('.has-submenu.open .submenu');
      if (openSub) {
        openSub.style.display = 'none';
        openSub.parentElement.classList.remove('open');
      }
    });
  }

  if (menuOverlay && megaMenu) {
    menuOverlay.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
      const openSub = megaMenu.querySelector('.has-submenu.open .submenu');
      if (openSub) {
        openSub.style.display = 'none';
        openSub.parentElement.classList.remove('open');
      }
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

  if (searchToggle) {
    searchToggle.addEventListener('click', function () {
      if (window.matchMedia('(min-width: 768px)').matches) {
        openSearchModal();
      } else if (searchBar) {
        if (searchBar.hasAttribute('hidden')) {
          searchBar.removeAttribute('hidden');
          const input = searchBar.querySelector('input[type="search"]');
          if (input) input.focus();
        } else {
          searchBar.setAttribute('hidden', '');
        }
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (searchModal && searchModal.classList.contains('is-visible')) {
          closeSearchModal();
        } else if (searchBar && !searchBar.hasAttribute('hidden')) {
          searchBar.setAttribute('hidden', '');
          searchToggle.focus();
        }
      }
      if (event.key === '/' && document.activeElement === document.body) {
        event.preventDefault();
        if (window.matchMedia('(min-width: 768px)').matches) {
          openSearchModal();
        } else if (searchBar) {
          searchBar.removeAttribute('hidden');
          const input = searchBar.querySelector('input[type="search"]');
          if (input) input.focus();
        }
      }
    });
  }

  const searchForm = searchBar?.querySelector('form');
  searchForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchForm.querySelector('input[type="search"]').value.trim();
    if (query) {
      const url = `https://www.google.com/search?q=site:darenprince.com+${encodeURIComponent(query)}`;
      window.open(url, '_blank');
    }
  });

  function openSearchModal() {
    if (!searchModal) {
      searchModal = createSearchModal();
    }
    searchModal.classList.add('is-visible');
    const input = searchModal.querySelector('input[type="search"]');
    if (input) input.focus();
  }

  function closeSearchModal() {
    if (searchModal) {
      searchModal.classList.remove('is-visible');
      searchToggle.focus();
    }
  }

  function createSearchModal() {
    const overlay = document.createElement('div');
    overlay.className = 'search-modal-overlay';
    overlay.innerHTML = `
      <div class="search-modal">
        <button class="search-close" aria-label="Close search">&times;</button>
        <form class="search-form flex items-center">
          <input type="search" placeholder="search site" />
          <button type="submit" class="search-submit"><i class="ti ti-search"></i></button>
        </form>
      </div>`;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.search-close');
    closeBtn.addEventListener('click', closeSearchModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSearchModal();
    });

    const form = overlay.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = form.querySelector('input[type="search"]').value.trim();
      if (query) {
        const url = `https://www.google.com/search?q=site:darenprince.com+${encodeURIComponent(query)}`;
        window.open(url, '_blank');
      }
    });

    return overlay;
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
      var $parent = $(this).parent('.has-submenu');
      var $submenu = $parent.find('.submenu');
      $submenu.slideToggle(transition);
      $parent.toggleClass('open');
    });
  }
});
