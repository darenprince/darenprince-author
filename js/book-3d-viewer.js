const book = document.getElementById('book');
const rotateLeft = document.getElementById('rotate-left');
const rotateRight = document.getElementById('rotate-right');
const rotate360 = document.getElementById('rotate-360');

let rotation = 360;
let isDragging = false;
let startX = 0;
let autoInterval;

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
  autoInterval = startAutoRotate();
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
  rotation -= 180;
  applyRotation(rotation);
  resetAutoRotate();
});

rotateRight?.addEventListener('click', () => {
  rotation += 180;
  applyRotation(rotation);
  resetAutoRotate();
});

rotate360?.addEventListener('click', () => {
  clearInterval(autoInterval);
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
