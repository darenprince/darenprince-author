const modal = document.getElementById('trailer-modal');
if (modal) {
  const openButton = document.querySelector('.js-open-trailer-btn');
  const heroSection = document.querySelector('.js-open-trailer-section');
  const closeButton = modal.querySelector('.js-close-trailer');
  const iframe = modal.querySelector('iframe');
  const videoId = 'I1W7JdHC33A';
  let player;

  function openModal() {
    modal.classList.add('is-visible');
    if (player) {
      player.playVideo();
    } else {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player(iframe, {
          videoId,
          playerVars: { autoplay: 1, controls: 1, modestbranding: 1, rel: 0 },
          events: {
            onStateChange: function (e) {
              if (e.data === YT.PlayerState.ENDED) closeModal();
            }
          }
        });
      };
    }
  }

  function closeModal() {
    modal.classList.remove('is-visible');
    if (player) player.stopVideo();
  }

  if (openButton) {
    openButton.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  }

  if (heroSection) {
    heroSection.addEventListener('click', function (e) {
      if (e.target.closest('.cta-btn')) return;
      openModal();
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
}
