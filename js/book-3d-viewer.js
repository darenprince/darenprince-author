const book = document.getElementById('book');
const rotateLeft = document.getElementById('rotate-left');
const rotateRight = document.getElementById('rotate-right');

let rotation = 0;
let isDragging = false;
let startX = 0;

function applyRotation(angle) {
  book.style.transform = `rotateY(${angle}deg)`;
  book.style.setProperty('--light-angle', `${angle}deg`);
}

book.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  book.style.transition = 'none';
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
});

book.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].clientX;
  book.style.transition = 'none';
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
});

rotateLeft?.addEventListener('click', () => {
  rotation -= 180;
  applyRotation(rotation);
});

rotateRight?.addEventListener('click', () => {
  rotation += 180;
  applyRotation(rotation);
});
