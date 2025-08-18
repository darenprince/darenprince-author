export function initCopyClass() {
  document.querySelectorAll('[data-copy]').forEach((el) => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        showTooltip(el);
      });
    });
  });
}

function showTooltip(el) {
  const tip = document.createElement('span');
  tip.className = 'tooltip';
  tip.textContent = 'Copied!';
  el.style.position = 'relative';
  el.appendChild(tip);
  setTimeout(() => {
    tip.remove();
  }, 1200);
}

document.addEventListener('DOMContentLoaded', initCopyClass);
