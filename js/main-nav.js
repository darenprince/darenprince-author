document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('main-nav');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      toggle.classList.toggle('menu-open');
      menu.classList.toggle('menu-open');
    });
  }

  var submenuToggle = document.querySelector('.submenu-toggle');
  if (submenuToggle) {
    submenuToggle.addEventListener('click', function (e) {
      var expanded = submenuToggle.getAttribute('aria-expanded') === 'true';
      submenuToggle.setAttribute('aria-expanded', !expanded);
      submenuToggle.nextElementSibling.classList.toggle('menu-open');
    });
  }
});

