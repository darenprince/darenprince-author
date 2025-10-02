document.addEventListener('DOMContentLoaded', () => {
  const PASSWORD = '3m3rg3ncy505';
  const gate = document.querySelector('#passwordGate');
  const form = gate?.querySelector('form');
  const input = gate?.querySelector('input[type="password"]');
  const error = gate?.querySelector('[data-error]');
  const layout = document.querySelector('.emergency-layout');
  const body = document.body;

  if (!gate || !form || !input || !layout) {
    return;
  }

  const unlock = () => {
    gate.classList.add('is-hidden');
    gate.setAttribute('aria-hidden', 'true');
    layout.classList.add('is-unlocked');
    layout.removeAttribute('aria-hidden');
    layout.setAttribute('tabindex', '-1');
    layout.focus({ preventScroll: false });
    window.setTimeout(() => {
      layout.removeAttribute('tabindex');
    }, 200);
  };

  const stored = sessionStorage.getItem('emergencyAccess');
  if (stored === 'granted') {
    unlock();
    return;
  }

  layout.setAttribute('aria-hidden', 'true');
  layout.setAttribute('tabindex', '-1');
  gate.classList.remove('is-hidden');
  gate.setAttribute('aria-hidden', 'false');
  body.classList.add('is-locked');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (value === PASSWORD) {
      sessionStorage.setItem('emergencyAccess', 'granted');
      gate.classList.remove('has-error');
      error.textContent = '';
      unlock();
      body.classList.remove('is-locked');
    } else {
      gate.classList.add('has-error');
      error.textContent = 'Invalid code. Access denied.';
      input.value = '';
      input.focus();
    }
  });

  input.addEventListener('input', () => {
    if (gate.classList.contains('has-error')) {
      gate.classList.remove('has-error');
      error.textContent = '';
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && gate.getAttribute('aria-hidden') === 'false') {
      event.preventDefault();
    }
  });

  setTimeout(() => {
    input.focus();
  }, 180);
});
