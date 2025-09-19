;(() => {
  const initHeroVideo = () => {
    const hero = document.querySelector('#autoZoomHero.hero--video')
    if (!hero) return
    if (typeof window.Vimeo === 'undefined' || !window.Vimeo.Player) return

    const videoId = parseInt(hero.dataset.videoId || '', 10)
    if (!videoId) return

    const frame = hero.querySelector('.hero-video-layer__player')
    if (!frame) return

    const videoLayer = hero.querySelector('.js-hero-video')
    const playOverlay = hero.querySelector('.js-hero-play')
    const muteButton = hero.querySelector('.js-hero-mute')
    const pauseOverlay = hero.querySelector('.js-hero-pause-overlay')
    const resumeBtn = hero.querySelector('.js-hero-resume')
    const restartBtn = hero.querySelector('.js-hero-restart')
    const closeBtn = hero.querySelector('.js-hero-close')
    const hideBtn = hero.querySelector('.js-hero-hide')
    const fullscreenButtons = hero.querySelectorAll('.js-hero-fullscreen')
    const airplayBtn = hero.querySelector('.js-hero-airplay')
    const progressFill = hero.querySelector('.js-hero-progress-fill')

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
      playsinline: true,
    })

    let pauseReason = null
    let videoDuration = null
    let hasAutoScrolled = false
    let hasRequestedEndTransition = false
    let wasPlayingBeforeFullscreen = false
    let muteAutoHideTimer = null

    const clearMuteAutoHide = () => {
      if (muteAutoHideTimer) {
        window.clearTimeout(muteAutoHideTimer)
        muteAutoHideTimer = null
      }
    }

    const hideMutePrompt = () => {
      hero.classList.add('is-mute-hidden')
      clearMuteAutoHide()
    }

    const scheduleMuteAutoHide = () => {
      if (!hero.classList.contains('is-muted')) {
        return
      }
      hero.classList.remove('is-mute-hidden')
      clearMuteAutoHide()
      muteAutoHideTimer = window.setTimeout(() => {
        if (hero.classList.contains('is-muted')) {
          hero.classList.add('is-mute-hidden')
        }
      }, 10000)
    }

    const setPlaybackProgress = (value) => {
      const numeric = typeof value === 'number' ? value : 0
      const percent = Math.min(Math.max(numeric, 0), 100)
      hero.style.setProperty('--hero-playback-progress', `${percent}%`)
      if (progressFill) {
        progressFill.style.width = `${percent}%`
      }
    }

    const resetEndTransition = () => {
      hasRequestedEndTransition = false
      hero.classList.remove('is-video-ending')
    }

    const autoScrollAfterEnd = () => {
      const scrollAmount = Math.min(window.innerHeight * 0.25, 240)
      window.requestAnimationFrame(() => {
        window.scrollBy({ top: scrollAmount, left: 0, behavior: 'smooth' })
      })
    }

    const setBufferProgress = (value) => {
      const percent = Math.min(Math.max(typeof value === 'number' ? value : 0, 0), 1)
      hero.style.setProperty('--hero-buffer-progress', `${Math.round(percent * 100)}%`)
    }

    const setLoading = (isLoading) => {
      hero.classList.toggle('is-loading', Boolean(isLoading))
      if (isLoading) {
        hero.classList.remove('has-video-error')
        if (playOverlay) {
          playOverlay.disabled = false
        }
        if (muteButton) {
          muteButton.hidden = false
        }
      }
      if (playOverlay) {
        playOverlay.setAttribute('data-loading', isLoading ? 'true' : 'false')
      }
    }

    const handleVideoError = () => {
      setLoading(false)
      hidePauseOverlay()
      resetEndTransition()
      hasAutoScrolled = false
      pauseReason = null
      hero.classList.add('has-video-error', 'is-image-active')
      hero.classList.remove('is-video-active', 'is-video-playing', 'is-video-paused')
      setBufferProgress(0)
      setPlaybackProgress(0)
      if (playOverlay) {
        playOverlay.classList.add('is-hidden')
        playOverlay.disabled = true
      }
      if (muteButton) {
        muteButton.classList.remove('is-attention')
        muteButton.hidden = true
      }
      hideMutePrompt()
    }

    const showPlayOverlay = () => {
      if (playOverlay) {
        if (hero.classList.contains('has-video-error')) return
        playOverlay.classList.remove('is-hidden')
        playOverlay.disabled = false
      }
    }

    const hidePlayOverlay = () => {
      if (playOverlay) {
        playOverlay.classList.add('is-hidden')
      }
    }

    const showPauseOverlay = () => {
      if (!pauseOverlay) return
      pauseOverlay.hidden = false
      requestAnimationFrame(() => {
        pauseOverlay.classList.add('is-visible')
      })
      hero.classList.add('is-paused-overlay')
    }

    const hidePauseOverlay = () => {
      if (!pauseOverlay) return
      pauseOverlay.classList.remove('is-visible')
      pauseOverlay.hidden = true
      hero.classList.remove('is-paused-overlay')
    }

    const showPosterFromVideo = () => {
      hero.classList.remove('is-video-active', 'is-video-playing', 'is-video-paused')
      hero.classList.add('is-image-active')
      if (!hero.classList.contains('has-video-error')) {
        showPlayOverlay()
      }
    }

    const returnToPoster = () => {
      const wasPaused = hero.classList.contains('is-video-paused')
      hidePauseOverlay()
      pauseReason = 'close'
      resetEndTransition()
      hasAutoScrolled = false
      setPlaybackProgress(0)
      setBufferProgress(0)
      setLoading(false)
      player
        .pause()
        .then(() => player.setCurrentTime(0))
        .then(() => {
          if (wasPaused) {
            showPosterFromVideo()
            pauseReason = null
          }
        })
        .catch(() => {
          if (wasPaused) {
            showPosterFromVideo()
            pauseReason = null
          }
        })
    }

    const updateMuteState = () => {
      if (!muteButton) return
      player
        .getMuted()
        .then((muted) => {
          hero.classList.toggle('is-muted', muted)
          muteButton.classList.toggle('is-attention', muted)
          if (muted) {
            scheduleMuteAutoHide()
          } else {
            hideMutePrompt()
          }
        })
        .catch((error) => console.error('Vimeo player error:', error))
    }

    setBufferProgress(0)
    setPlaybackProgress(0)

    player
      .ready()
      .then(() => {
        hero.classList.add('is-video-ready')
        player
          .getDuration()
          .then((duration) => {
            if (typeof duration === 'number' && !Number.isNaN(duration)) {
              videoDuration = duration
            }
          })
          .catch(() => {})
        return player.play().catch((error) => {
          setLoading(false)
          showPlayOverlay()
          console.warn('Vimeo autoplay prevented:', error)
        })
      })
      .catch((error) => {
        console.error('Vimeo player ready error:', error)
        handleVideoError()
      })

    player.on('loaded', () => {
      hero.classList.add('is-video-ready')
      setBufferProgress(1)
      setLoading(false)
      hero.classList.remove('has-video-error')
      if (playOverlay) {
        playOverlay.disabled = false
      }
      if (muteButton) {
        muteButton.hidden = false
      }
      if (!videoDuration) {
        player
          .getDuration()
          .then((duration) => {
            if (typeof duration === 'number' && !Number.isNaN(duration)) {
              videoDuration = duration
            }
          })
          .catch(() => {})
      }
    })

    player.on('bufferstart', () => setLoading(true))
    player.on('bufferend', () => setLoading(false))

    player.on('progress', (data) => {
      if (data && typeof data.percent === 'number') {
        setBufferProgress(data.percent)
      }
    })

    player.on('timeupdate', (data) => {
      if (!data || typeof data.seconds !== 'number') {
        return
      }
      if (!videoDuration && typeof data.duration === 'number' && !Number.isNaN(data.duration)) {
        videoDuration = data.duration
      }
      if (hasRequestedEndTransition) {
        return
      }
      const duration = videoDuration || data.duration
      if (!duration || duration <= 0) {
        return
      }
      const percent = (data.seconds / duration) * 100
      setPlaybackProgress(percent)
      if (!hero.classList.contains('is-video-active')) {
        return
      }
      if (duration - data.seconds <= 3) {
        hasRequestedEndTransition = true
        hero.classList.add('is-video-ending', 'is-image-active')
        hero.classList.remove('is-video-playing')
      }
    })

    player.on('seeked', () => {
      resetEndTransition()
      if (hero.classList.contains('is-video-active')) {
        hero.classList.remove('is-image-active')
      }
    })

    player.on('play', () => {
      resetEndTransition()
      hidePauseOverlay()
      hasAutoScrolled = false
      hero.classList.remove('has-video-error')
      hero.classList.add('is-video-active', 'is-video-playing')
      hero.classList.remove('is-video-paused', 'is-image-active')
      setLoading(false)
      setBufferProgress(1)
      hidePlayOverlay()
      updateMuteState()
      if (muteButton) {
        muteButton.hidden = false
      }
    })

    player.on('pause', () => {
      hero.classList.remove('is-video-playing')
      hero.classList.add('is-video-paused')
      if (pauseReason === 'overlay') {
        showPauseOverlay()
      } else if (pauseReason === 'close') {
        showPosterFromVideo()
      }
      if (pauseReason === 'overlay' || pauseReason === 'close') {
        wasPlayingBeforeFullscreen = false
      }
      pauseReason = null
      resetEndTransition()
    })

    player.on('ended', () => {
      pauseReason = null
      hidePauseOverlay()
      resetEndTransition()
      showPosterFromVideo()
      setBufferProgress(0)
      setPlaybackProgress(0)
      player.setCurrentTime(0).catch(() => {})
      if (!hasAutoScrolled) {
        autoScrollAfterEnd()
        hasAutoScrolled = true
      }
    })

    player.on('volumechange', updateMuteState)
    player.on('error', (error) => {
      console.error('Vimeo playback error:', error)
      handleVideoError()
    })

    if (videoLayer) {
      videoLayer.addEventListener('click', (event) => {
        if (!hero.classList.contains('is-video-active')) return
        if (hero.classList.contains('is-video-paused')) return
        if (hero.classList.contains('is-video-ending')) return
        if (hero.classList.contains('has-video-error')) return
        if (pauseOverlay && pauseOverlay.contains(event.target)) return
        pauseReason = 'overlay'
        player.pause()
      })
    }

    if (playOverlay) {
      playOverlay.addEventListener('click', () => {
        hero.classList.remove('has-video-error')
        resetEndTransition()
        hasAutoScrolled = false
        hero.classList.add('is-video-active')
        hero.classList.remove('is-image-active')
        pauseReason = null
        setLoading(true)
        setBufferProgress(0)
        hidePlayOverlay()
        player.play().catch((error) => {
          setLoading(false)
          showPlayOverlay()
          console.warn('Vimeo play error:', error)
        })
      })
    }

    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        hidePauseOverlay()
        pauseReason = null
        resetEndTransition()
        hasAutoScrolled = false
        hero.classList.remove('is-image-active')
        player.play()
      })
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        resetEndTransition()
        hasAutoScrolled = false
        hero.classList.remove('is-image-active')
        player
          .setCurrentTime(0)
          .then(() => player.play())
          .catch(() => {})
      })
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', returnToPoster)
    }

    if (hideBtn) {
      hideBtn.addEventListener('click', returnToPoster)
    }

    if (fullscreenButtons.length) {
      const requestPlayerFullscreen = () => {
        if (typeof player.requestFullscreen === 'function') {
          player.requestFullscreen().catch(() => {})
        }
      }
      fullscreenButtons.forEach((button) => {
        button.addEventListener('click', () => {
          player
            .getPaused()
            .then((paused) => {
              wasPlayingBeforeFullscreen = !paused
              requestPlayerFullscreen()
            })
            .catch(() => {
              wasPlayingBeforeFullscreen = hero.classList.contains('is-video-playing')
              requestPlayerFullscreen()
            })
        })
      })
    }

    player.on('fullscreenchange', (data) => {
      const isFullscreen = Boolean(data && data.fullscreen)
      if (isFullscreen) {
        if (hero.classList.contains('is-video-playing')) {
          wasPlayingBeforeFullscreen = true
        }
        return
      }
      if (!wasPlayingBeforeFullscreen) {
        return
      }
      wasPlayingBeforeFullscreen = false
      player
        .getPaused()
        .then((paused) => {
          if (paused && hero.classList.contains('is-video-active')) {
            pauseReason = null
            hidePauseOverlay()
            player.play().catch(() => {})
          }
        })
        .catch(() => {
          if (hero.classList.contains('is-video-active')) {
            pauseReason = null
            hidePauseOverlay()
            player.play().catch(() => {})
          }
        })
    })

    if (airplayBtn) {
      airplayBtn.addEventListener('click', () => {
        if (typeof player.requestAirplay === 'function') {
          player.requestAirplay().catch(() => {})
        } else if (typeof player.requestPictureInPicture === 'function') {
          player.requestPictureInPicture().catch(() => {})
        }
      })
    }

    if (muteButton) {
      hero.classList.add('is-mute-hidden')

      const revealMutePrompt = () => {
        if (!hero.classList.contains('is-muted')) {
          return
        }
        scheduleMuteAutoHide()
      }

      const pointerReveal = () => {
        if (!hero.classList.contains('is-muted')) {
          return
        }
        scheduleMuteAutoHide()
      }

      muteButton.addEventListener('mouseenter', clearMuteAutoHide)
      muteButton.addEventListener('focus', clearMuteAutoHide)
      muteButton.addEventListener('mouseleave', () => {
        if (hero.classList.contains('is-muted')) {
          scheduleMuteAutoHide()
        }
      })
      muteButton.addEventListener('blur', () => {
        if (hero.classList.contains('is-muted')) {
          scheduleMuteAutoHide()
        }
      })

      hero.addEventListener('pointermove', pointerReveal, { passive: true })
      hero.addEventListener('pointerdown', pointerReveal, { passive: true })
      hero.addEventListener('focusin', revealMutePrompt)

      muteButton.addEventListener('click', () => {
        player
          .setMuted(false)
          .then(() => player.setVolume(1))
          .then(() => {
            hero.classList.remove('is-muted')
            muteButton.classList.remove('is-attention')
            muteButton.setAttribute('aria-pressed', 'true')
            hideMutePrompt()
            setTimeout(() => {
              if (muteButton) {
                muteButton.blur()
              }
            }, 200)
          })
          .catch(() => {})
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroVideo, { once: true })
  } else {
    initHeroVideo()
  }
})()
