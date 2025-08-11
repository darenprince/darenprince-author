const book = document.getElementById('book');
const rotateLeft = document.getElementById('rotate-left');
const rotateRight = document.getElementById('rotate-right');
const rotate360 = document.getElementById('rotate-360');

const SNAP_FRONT = -14;
const SNAP_BACK = 194;
const PAUSE_BEFORE_RESUME_MS = 4000;
const QUICK_TRANSITION = 'transform 0.3s ease';
const DEFAULT_TRANSITION = 'transform 0.6s ease';
const FULL_SPIN_TRANSITION = 'transform 1s linear';

let rotation = SNAP_FRONT;
let isDragging = false;
let startX = 0;
let autoInterval;
let pauseTimeout;

function applyRotation(angle) {
  book.style.transform = `rotateY(${angle}deg)`;
  book.style.setProperty('--light-angle', `${angle}deg`);
}

function startAutoRotate() {
  return setInterval(() => {
    rotation += 0.4;
    applyRotation(rotation);
  }, 50);
}

function resetAutoRotate() {
  clearInterval(autoInterval);
  clearTimeout(pauseTimeout);
  autoInterval = startAutoRotate();
}

function snapTo(angle) {
  clearInterval(autoInterval);
  clearTimeout(pauseTimeout);
  book.style.transition = 'transform 0.3s ease';
  rotation = angle;
  applyRotation(rotation);
  pauseTimeout = setTimeout(() => {
    book.style.transition = 'transform 0.6s ease';
    resetAutoRotate();
  }, 4000);
}

function initialSpin() {
  book.style.transition = 'transform 1s linear';
  rotation += 360;
  applyRotation(rotation);
  book.addEventListener(
    'transitionend',
    () => {
      book.style.transition = 'transform 0.6s ease';
      autoInterval = startAutoRotate();
    },
    { once: true }
  );
}

applyRotation(rotation);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      initialSpin();
    }
  });
  observer.observe(book);
} else {
  initialSpin();
}

book.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  book.style.transition = 'none';
  clearInterval(autoInterval);
  clearTimeout(pauseTimeout);
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const delta = e.clientX - startX;
  rotation += delta * 0.5;
  applyRotation(rotation);
  startX = e.clientX;
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  book.style.transition = 'transform 0.6s ease';
  resetAutoRotate();
});

book.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].clientX;
  book.style.transition = 'none';
  clearInterval(autoInterval);
  clearTimeout(pauseTimeout);
});

book.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const delta = e.touches[0].clientX - startX;
  rotation += delta * 0.5;
  applyRotation(rotation);
  startX = e.touches[0].clientX;
});

book.addEventListener('touchend', () => {
  isDragging = false;
  book.style.transition = 'transform 0.6s ease';
  resetAutoRotate();
});

rotateLeft?.addEventListener('click', () => {
  snapTo(SNAP_FRONT);
});

rotateRight?.addEventListener('click', () => {
  snapTo(SNAP_BACK);
});

rotate360?.addEventListener('click', () => {
  clearInterval(autoInterval);
  clearTimeout(pauseTimeout);
  book.style.transition = 'transform 1s linear';
  rotation += 360;
  applyRotation(rotation);
  book.addEventListener(
    'transitionend',
    () => {
      book.style.transition = 'transform 0.6s ease';
      resetAutoRotate();
    },
    { once: true }
  );
});

const zoomBtn = document.getElementById('zoom-cover');
const zoomModal = document.getElementById('cover-zoom');
const closeZoom = document.getElementById('close-cover-zoom');
const zoomFull = document.getElementById('zoom-full');
const zoomThumbs = document.querySelectorAll('.thumbnails img');

zoomBtn?.addEventListener('click', () => {
  zoomModal?.removeAttribute('hidden');
});

closeZoom?.addEventListener('click', () => {
  zoomModal?.setAttribute('hidden', '');
});

zoomThumbs.forEach(img => {
  img.addEventListener('click', () => {
    zoomThumbs.forEach(t => t.classList.remove('active'));
    img.classList.add('active');
    if (zoomFull) {
      zoomFull.src = img.dataset.full;
    }
  });
});
