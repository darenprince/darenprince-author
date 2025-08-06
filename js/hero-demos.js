// Handles scroll-triggered video and auto-scaling hero demos

document.addEventListener('DOMContentLoaded', () => {
  const videoHero = document.getElementById('scrollVideoHero');
  const video = document.getElementById('videoBg');
  const autoHero = document.getElementById('autoScaleHero');

  function handleScroll() {
    // Fade in and play background video
    if (videoHero) {
      const trigger = window.innerHeight / 3;
      if (window.scrollY > trigger) {
        videoHero.classList.add('loaded');
        if (video && video.paused) {
          video.play();
          videoHero.classList.add('playing');
        }
      }
    }

    // Shrink auto-scaling hero
    if (autoHero) {
      const max = window.innerHeight;
      const scrollTop = window.scrollY;
      const offsetTop = autoHero.offsetTop;
      const newHeight = Math.max(max - (scrollTop - offsetTop), 200);
      autoHero.style.height = `${newHeight}px`;
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});
