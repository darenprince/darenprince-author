// UI utility functions for Game On!
// Provides toast notifications and simple progress bar controls.

export const UI = (() => {
  let toastContainer;

  function ensureToastContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      toastContainer.style.position = 'fixed';
      toastContainer.style.top = '1rem';
      toastContainer.style.right = '1rem';
      toastContainer.style.zIndex = '9999';
      document.body.appendChild(toastContainer);
    }
  }

  function toast(message, type = 'info', delay = 3000) {
    ensureToastContainer();
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = message;
    toastContainer.appendChild(t);
    setTimeout(() => {
      t.classList.add('hide');
      setTimeout(() => t.remove(), 300);
    }, delay);
  }

  // Public alias for toast()
  function showToast(message, type = 'info', delay = 3000) {
    toast(message, type, delay);
  }

  function showProgress(container) {
    let bar = container.querySelector('.bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'bar';
      container.appendChild(bar);
    }
    bar.style.width = '0%';
  }

  function setProgress(container, value) {
    const bar = container.querySelector('.bar');
    if (bar) bar.style.width = `${value}%`;
  }

  function hideProgress(container) {
    const bar = container.querySelector('.bar');
    if (bar) bar.style.width = '0%';
  }

  return { toast, showToast, showProgress, setProgress, hideProgress };
})();

window.GameOnUI = UI;
export default UI;
