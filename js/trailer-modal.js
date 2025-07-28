const modal = document.getElementById('trailer-modal');
if (modal) {
  const openButton = document.querySelector('.js-open-trailer-btn');
  const heroSection = document.querySelector('.js-open-trailer-section');
  const closeButton = modal.querySelector('.js-close-trailer');
  const iframe = modal.querySelector('iframe');
  const videoUrl = 'https://www.youtube.com/embed/I1W7JdHC33A?controls=1&modestbranding=1&fs=1&rel=0';

  function openModal() {
    iframe.src = videoUrl;
    modal.classList.add('is-visible');
  }

  function closeModal() {
    modal.classList.remove('is-visible');
    iframe.src = '';
  }

  if (openButton) {
    openButton.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  }

  if (heroSection) {
    heroSection.addEventListener('click', function (e) {
      if (e.target.closest('.btn')) return;
      openModal();
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
}
