const book = document.getElementById('book');
const btnFlip = document.getElementById('btn-flip');

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

// === Flip Button ===
let flipped = false;
btnFlip?.addEventListener('click', () => {
  flipped = !flipped;
  currentRotation = flipped ? 180 : 0;
  velocity = 0;
  spinning = false;
  applyRotation(currentRotation);
});

// Start auto-spin after initial load
setTimeout(() => {
  if (!isDragging) startIdleSpin();
}, 3000);
