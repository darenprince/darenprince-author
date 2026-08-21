const videoId = document.getElementById('heroVideo')?.dataset.videoId
let player

function initHeroVideo() {
  player = new YT.Player('heroVideo', {
    videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      playsinline: 1,
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: videoId,
    },
    events: {
      onReady: (e) => e.target.mute(),
    },
  })
}

function loadYouTubeAPI(cb) {
  if (window.YT && window.YT.Player) {
    cb()
  } else {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = function () {
      if (previous) previous()
      cb()
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  }
}

const heroSection = document.querySelector('.hero')
const muteBtn = document.getElementById('heroMuteBtn')

if (heroSection && muteBtn) {
  loadYouTubeAPI(initHeroVideo)

  heroSection.addEventListener('click', (e) => {
    if (e.target.closest('#heroMuteBtn') || e.target.closest('a')) return
    if (!player) return
    const state = player.getPlayerState()
    if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) {
      player.playVideo()
    } else {
      player.pauseVideo()
    }
  })

  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (!player) return
    const icon = muteBtn.querySelector('i')
    if (player.isMuted()) {
      player.unMute()
      icon.classList.remove('ph-speaker-slash')
      icon.classList.add('ph-speaker-high')
    } else {
      player.mute()
      icon.classList.remove('ph-speaker-high')
      icon.classList.add('ph-speaker-slash')
    }
  })
}
