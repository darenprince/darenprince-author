document.addEventListener('DOMContentLoaded', function () {
  var navWrapper = document.querySelector('.main-nav-wrapper');
  var toggle = document.querySelector('.nav-toggle');
  var submenuToggles = document.querySelectorAll('.submenu-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navWrapper.classList.toggle('menu-open');
    });
  }

  submenuToggles.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var parent = btn.closest('.nav-item--has-submenu');
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      parent.classList.toggle('menu-open');
    });
  });

  var modalOverlay = document.getElementById('demo-modal');
  if (modalOverlay) {
    var openBtn = document.querySelector('.js-open-modal');
    var closeBtn = modalOverlay.querySelector('.js-close-modal');

    openBtn.addEventListener('click', function () {
      modalOverlay.classList.add('is-visible');
    });

    closeBtn.addEventListener('click', function () {
      modalOverlay.classList.remove('is-visible');
    });
  }

  var componentSelect = document.querySelector('.component-nav__select');
  if (componentSelect) {
    componentSelect.addEventListener('change', function () {
      var target = document.querySelector(this.value);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
