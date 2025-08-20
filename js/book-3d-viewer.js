import { setActiveTool } from './book-rail.js';

const book = document.getElementById('book');
const rotate360 = document.getElementById('rotate-360');
const snapFrontBtn = document.getElementById('snap-front');
const snapBackBtn = document.getElementById('snap-back');
const bookViewer = document.querySelector('.book-3d-viewer');
const bookContainer = document.querySelector('.book-3d-container');
const rotateHint = document.querySelector('.rotate-hint');
const addToCartBtn = document.getElementById('add-to-cart');
const bookToolbar = document.querySelector('.book-toolbar');
const purchaseOptions = document.getElementById('purchase-options');
const closeBtn = document.getElementById('book-close');
let rotateHintTimeout;

const SNAP_FRONT = 18;
const SNAP_BACK = 199;
const ORIENTATION_TOLERANCE = 20;
const PAUSE_BEFORE_RESUME_MS = 4000;
const QUICK_TRANSITION = 'transform 0.3s ease';
const DEFAULT_TRANSITION = 'transform 0.6s ease';
const FULL_SPIN_TRANSITION = 'transform 1s linear';

let rotation = SNAP_FRONT;
let isDragging = false;
let startX = 0;
let autoInterval;
let pauseTimeout;
let scrollLocked = false;

function lockPageScroll() {
  if (scrollLocked) return;
  scrollLocked = true;
  document.body.classList.add('no-scroll');
}

function unlockPageScroll() {
  if (!scrollLocked) return;
  scrollLocked = false;
  document.body.classList.remove('no-scroll');
}

function hideRotateHint() {
  rotateHint?.classList.add('hide');
  rotateHint?.classList.remove('show');
}

export function showRotateHint() {
  if (!rotateHint) return;
  rotateHint.classList.remove('hide');
  rotateHint.classList.add('show');
  clearTimeout(rotateHintTimeout);
  const hide = () => {
    hideRotateHint();
    clearTimeout(rotateHintTimeout);
  };
  bookViewer?.addEventListener('pointerdown', hide, { once: true });
  rotateHintTimeout = setTimeout(hide, 4000);
}

window.showRotateHint = showRotateHint;

window.addEventListener('load', () => {
  bookViewer?.classList.add('loaded');
  if (rotateHint && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const sr = document.createElement('span');
    sr.className = 'visually-hidden';
    sr.textContent = 'Drag left or right to rotate.';
    rotateHint.appendChild(sr);
  }
});

function updateActiveTool(angle) {
  const normalized = ((angle % 360) + 360) % 360;
  const frontDiff = Math.abs(normalized - SNAP_FRONT);
  const backDiff = Math.abs(normalized - SNAP_BACK);
  if (frontDiff <= ORIENTATION_TOLERANCE) {
    setActiveTool('front');
  } else if (backDiff <= ORIENTATION_TOLERANCE) {
    setActiveTool('back');
  } else {
    setActiveTool(null);
  }
}

function applyRotation(angle) {
  book.style.transform = `rotateY(${angle}deg)`;
  book.style.setProperty('--light-angle', `${angle}deg`);
  updateActiveTool(angle);
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

if (book) {
  applyRotation(rotation);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        initialSpin();
        if (rotateHint) {
          showRotateHint();
        }
      }
    });
    observer.observe(book);
  } else {
    initialSpin();
    if (rotateHint) {
      showRotateHint();
    }
  }

  if (bookContainer && 'IntersectionObserver' in window) {
    const centerObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.intersectionRatio === 1) {
        centerObserver.disconnect();
        requestAnimationFrame(() => {
          entry.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }
    }, { threshold: 1 });
    centerObserver.observe(bookContainer);
  }

  bookViewer?.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    book.style.transition = 'none';
    clearInterval(autoInterval);
    clearTimeout(pauseTimeout);
    lockPageScroll();
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
    unlockPageScroll();
  });

  bookViewer?.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    book.style.transition = 'none';
    clearInterval(autoInterval);
    clearTimeout(pauseTimeout);
    lockPageScroll();
  });

  bookViewer?.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    rotation += delta * 0.5;
    applyRotation(rotation);
    startX = e.touches[0].clientX;
    e.preventDefault();
  });

  bookViewer?.addEventListener('touchend', () => {
    isDragging = false;
    book.style.transition = 'transform 0.6s ease';
    resetAutoRotate();
    unlockPageScroll();
  });

  bookViewer?.addEventListener('touchcancel', () => {
    if (!isDragging) return;
    isDragging = false;
    book.style.transition = 'transform 0.6s ease';
    resetAutoRotate();
    unlockPageScroll();
  });

  snapFrontBtn?.addEventListener('click', () => {
    snapTo(SNAP_FRONT);
    setTimeout(() => {
      clearTimeout(pauseTimeout);
      bookContainer?.classList.add('fullscreen');
      closeBtn?.removeAttribute('hidden');
      bookToolbar?.setAttribute('hidden', '');
    }, 300);
  });

  snapBackBtn?.addEventListener('click', () => {
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

  addToCartBtn?.addEventListener('click', () => {
    purchaseOptions?.scrollIntoView({ behavior: 'smooth' });
  });

  if (bookToolbar && bookViewer && 'IntersectionObserver' in window) {
    const toolbarObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        bookToolbar.classList.add('visible');
      } else {
        bookToolbar.classList.remove('visible');
      }
    }, { threshold: 0.5 });
    toolbarObserver.observe(bookViewer);
  } else {
    bookToolbar?.classList.add('visible');
  }

  ['pointerenter', 'pointerdown', 'focusin'].forEach(evt => {
    purchaseOptions?.addEventListener(evt, () => bookToolbar?.classList.remove('visible'));
  });

  ['pointerenter', 'pointerdown', 'focusin'].forEach(evt => {
    bookViewer?.addEventListener(evt, () => bookToolbar?.classList.add('visible'));
  });

  closeBtn?.addEventListener('click', () => {
    bookContainer?.classList.remove('fullscreen');
    closeBtn.setAttribute('hidden', '');
    bookToolbar?.removeAttribute('hidden');
    bookToolbar?.classList.add('visible');
    resetAutoRotate();
  });

  if (bookToolbar) {
    const stopGlow = () => {
      bookToolbar.dataset.interacted = 'true';
      bookToolbar.classList.remove('glow');
    };

    const addStopGlowListeners = () => {
      ['click', 'pointerdown', 'focusin'].forEach(evt => {
        bookToolbar.addEventListener(evt, stopGlow, { once: true });
      });
    };

    const glowObserver = new MutationObserver(() => {
      const isVisible = bookToolbar.classList.contains('visible');
      if (isVisible && !bookToolbar.dataset.interacted) {
        bookToolbar.classList.add('glow');
        addStopGlowListeners();
      } else if (!isVisible) {
        delete bookToolbar.dataset.interacted;
        bookToolbar.classList.remove('glow');
      }
    });

    glowObserver.observe(bookToolbar, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}
