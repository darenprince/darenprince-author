// Handles scroll-triggered video demo

document.addEventListener('DOMContentLoaded', () => {
  const videoHero = document.getElementById('scrollVideoHero');
  const video = document.getElementById('videoBg');

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

  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});
