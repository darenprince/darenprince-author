document
  .querySelector('.js-toggle-nav')
  .addEventListener('click', function () {
    const nav = document.getElementById('nav');
    nav.classList.toggle('is-visible');
  });

const modalOverlay = document.getElementById('demo-modal');
if (modalOverlay) {
  const openBtn = document.querySelector('.js-open-modal');
  const closeBtn = modalOverlay.querySelector('.js-close-modal');

  openBtn.addEventListener('click', function () {
    modalOverlay.classList.add('is-visible');
  });

  closeBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('is-visible');
  });
}

const componentSelect = document.querySelector('.component-nav__select');
if (componentSelect) {
  componentSelect.addEventListener('change', function () {
    const target = document.querySelector(this.value);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}
