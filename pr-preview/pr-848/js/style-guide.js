const openBtn = document.querySelector('.js-open-modal');
const modal = document.getElementById('demo-modal');
const closeBtn = modal?.querySelector('.js-close-modal');

openBtn?.addEventListener('click', () => {
  modal?.removeAttribute('hidden');
});

closeBtn?.addEventListener('click', () => {
  modal?.setAttribute('hidden', '');
});
