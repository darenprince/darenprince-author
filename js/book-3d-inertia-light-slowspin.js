const book = document.getElementById('book');
const btnFront = document.getElementById('btn-front');
const btnBack = document.getElementById('btn-back');
const btnZoom = document.getElementById('btn-zoom');
const zoomModal = document.getElementById('zoomModal');
const closeZoom = document.getElementById('closeZoom');

let isDragging = false;
let startX = 0;
let currentRotation = 0;
let velocity = 0;
let animationFrame;
let idleSpinFrame;
let spinning = false;

function applyRotation(angle) {
  book.style.transform = `rotateY(${angle}deg)`;
  book.style.setProperty('--light-angle', `${angle}deg`);
}

// === Manual Drag Rotation with Inertia ===
book.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  book.style.transition = 'none';
  cancelAnimationFrame(animationFrame);
  cancelAnimationFrame(idleSpinFrame);
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  velocity = (deltaX - velocity) * 0.3;
  currentRotation += deltaX * 0.5;
  applyRotation(currentRotation);
  startX = e.clientX;
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  book.style.transition = 'transform 0.1s ease-out';
  animateInertia();
});

// === Touch Support ===
book.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  book.style.transition = 'none';
  cancelAnimationFrame(animationFrame);
  cancelAnimationFrame(idleSpinFrame);
});

book.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - startX;
  velocity = (deltaX - velocity) * 0.3;
  currentRotation += deltaX * 0.5;
  applyRotation(currentRotation);
  startX = e.touches[0].clientX;
});

book.addEventListener('touchend', () => {
  isDragging = false;
  animateInertia();
});

// === Inertia Loop ===
function animateInertia() {
  if (Math.abs(velocity) < 0.1) {
    velocity = 0;
    idleSpinFrame = requestAnimationFrame(startIdleSpin);
    return;
  }
  currentRotation += velocity;
  applyRotation(currentRotation);
  velocity *= 0.93;
  animationFrame = requestAnimationFrame(animateInertia);
}

// === Idle Auto-Spin Loop ===
function startIdleSpin() {
  spinning = true;
  function spin() {
    if (!spinning) return;
    currentRotation += 0.05;
    applyRotation(currentRotation);
    idleSpinFrame = requestAnimationFrame(spin);
  }
  spin();
}

// === Buttons ===
btnFront?.addEventListener('click', () => {
  currentRotation = 0;
  velocity = 0;
  spinning = false;
  applyRotation(currentRotation);
});

btnBack?.addEventListener('click', () => {
  currentRotation = 180;
  velocity = 0;
  spinning = false;
  applyRotation(currentRotation);
});

// === Zoom Modal ===
btnZoom?.addEventListener('click', () => {
  zoomModal.classList.remove('hidden');
});

closeZoom?.addEventListener('click', () => {
  zoomModal.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') zoomModal.classList.add('hidden');
});

// Start auto-spin after initial load
setTimeout(() => {
  if (!isDragging) startIdleSpin();
}, 3000);
