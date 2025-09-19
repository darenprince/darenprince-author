(() => {
  const initHeroVideo = () => {
    const hero = document.querySelector('#autoZoomHero.hero--video');
    if (!hero) return;
    if (typeof window.Vimeo === 'undefined' || !window.Vimeo.Player) return;

    const videoId = parseInt(hero.dataset.videoId || '', 10);
    if (!videoId) return;

    const frame = hero.querySelector('.hero-video-layer__frame');
    if (!frame) return;

    const videoLayer = hero.querySelector('.js-hero-video');
    const playOverlay = hero.querySelector('.js-hero-play');
    const muteButton = hero.querySelector('.js-hero-mute');
    const pauseOverlay = hero.querySelector('.js-hero-pause-overlay');
    const resumeBtn = hero.querySelector('.js-hero-resume');
    const restartBtn = hero.querySelector('.js-hero-restart');
    const closeBtn = hero.querySelector('.js-hero-close');
    const fullscreenBtn = hero.querySelector('.js-hero-fullscreen');
    const airplayBtn = hero.querySelector('.js-hero-airplay');

    const player = new window.Vimeo.Player(frame, {
      id: videoId,
      autopause: false,
      autoplay: true,
      background: false,
      controls: false,
      muted: true,
      loop: false,
      responsive: true,
      portrait: false,
      title: false,
      byline: false,
      playsinline: true
    });

    let pauseReason = null;
    let muteAttentionTimer;

    const setLoading = (isLoading) => {
      hero.classList.toggle('is-loading', Boolean(isLoading));
    };

    const showPlayOverlay = () => {
      if (playOverlay) {
        playOverlay.classList.remove('is-hidden');
      }
    };

    const hidePlayOverlay = () => {
      if (playOverlay) {
        playOverlay.classList.add('is-hidden');
      }
    };

    const showPauseOverlay = () => {
      if (!pauseOverlay) return;
      pauseOverlay.hidden = false;
      requestAnimationFrame(() => {
        pauseOverlay.classList.add('is-visible');
      });
      hero.classList.add('is-paused-overlay');
    };

    const hidePauseOverlay = () => {
      if (!pauseOverlay) return;
      pauseOverlay.classList.remove('is-visible');
      pauseOverlay.hidden = true;
      hero.classList.remove('is-paused-overlay');
    };

    const updateMuteState = () => {
      if (!muteButton) return;
      player
        .getMuted()
        .then((muted) => {
          hero.classList.toggle('is-muted', muted);
          if (muted) {
            muteButton.classList.add('is-attention');
            clearTimeout(muteAttentionTimer);
            muteAttentionTimer = window.setTimeout(() => {
              muteButton.classList.remove('is-attention');
            }, 6000);
          } else {
            muteButton.classList.remove('is-attention');
          }
        })
        .catch(() => {});
    };

    player
      .ready()
      .then(() => {
        hero.classList.add('is-video-ready');
        return player.play();
      })
      .catch(() => {
        setLoading(false);
        showPlayOverlay();
      });

    player.on('loaded', () => {
      hero.classList.add('is-video-ready');
    });

    player.on('bufferstart', () => setLoading(true));
    player.on('bufferend', () => setLoading(false));

    player.on('play', () => {
      hidePauseOverlay();
      hero.classList.add('is-video-active', 'is-video-playing');
      hero.classList.remove('is-video-paused', 'is-image-active');
      setLoading(false);
      hidePlayOverlay();
      updateMuteState();
    });

    player.on('pause', () => {
      hero.classList.remove('is-video-playing');
      hero.classList.add('is-video-paused');
      if (pauseReason === 'overlay') {
        showPauseOverlay();
      } else if (pauseReason === 'close') {
        hero.classList.remove('is-video-active');
        hero.classList.add('is-image-active');
        showPlayOverlay();
      }
      pauseReason = null;
    });

    player.on('ended', () => {
      pauseReason = null;
      hidePauseOverlay();
      hero.classList.remove('is-video-active', 'is-video-playing', 'is-video-paused');
      hero.classList.add('is-image-active');
      showPlayOverlay();
      player.setCurrentTime(0).catch(() => {});
    });

    player.on('volumechange', updateMuteState);

    if (videoLayer) {
      videoLayer.addEventListener('click', (event) => {
        if (!hero.classList.contains('is-video-active')) return;
        if (hero.classList.contains('is-video-paused')) return;
        if (pauseOverlay && pauseOverlay.contains(event.target)) return;
        pauseReason = 'overlay';
        player.pause();
      });
    }

    if (playOverlay) {
      playOverlay.addEventListener('click', () => {
        hero.classList.remove('is-image-active');
        pauseReason = null;
        setLoading(true);
        hidePlayOverlay();
        player.play().catch(() => {
          setLoading(false);
          showPlayOverlay();
        });
      });
    }

    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        hidePauseOverlay();
        pauseReason = null;
        player.play();
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        player
          .setCurrentTime(0)
          .then(() => player.play())
          .catch(() => {});
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        hidePauseOverlay();
        pauseReason = 'close';
        player
          .pause()
          .then(() => player.setCurrentTime(0))
          .catch(() => {});
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (typeof player.requestFullscreen === 'function') {
          player.requestFullscreen().catch(() => {});
        }
      });
    }

    if (airplayBtn) {
      airplayBtn.addEventListener('click', () => {
        if (typeof player.requestAirplay === 'function') {
          player.requestAirplay().catch(() => {});
        } else if (typeof player.requestPictureInPicture === 'function') {
          player.requestPictureInPicture().catch(() => {});
        }
      });
    }

    if (muteButton) {
      muteButton.addEventListener('click', () => {
        player
          .setMuted(false)
          .then(() => player.setVolume(1))
          .then(() => {
            hero.classList.remove('is-muted');
            muteButton.classList.remove('is-attention');
            muteButton.setAttribute('aria-pressed', 'true');
            setTimeout(() => {
              if (muteButton) {
                muteButton.blur();
              }
            }, 200);
          })
          .catch(() => {});
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroVideo, { once: true });
  } else {
    initHeroVideo();
  }
})();
