// Handles scroll-triggered video demo

document.addEventListener('DOMContentLoaded', () => {
  const videoHero = document.getElementById('scrollVideoHero')
  const video = document.getElementById('videoBg')

  if (!videoHero) return

  videoHero.classList.add('loaded')
  if (video && video.paused) {
    const playPromise = video.play()
    if (playPromise?.catch) {
      playPromise.catch(() => {})
    }
    videoHero.classList.add('playing')
  }
})
