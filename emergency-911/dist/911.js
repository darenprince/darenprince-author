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
  } else {
    layout.setAttribute('aria-hidden', 'true');
    layout.setAttribute('tabindex', '-1');
    gate.classList.remove('is-hidden');
    gate.setAttribute('aria-hidden', 'false');
    body.classList.add('is-locked');
  }

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

  const copyButtons = document.querySelectorAll('.copy-trigger');
  const copyTimers = new WeakMap();

  const setTooltip = (snippet, message) => {
    const tooltip = snippet.querySelector('.copy-tooltip');
    if (tooltip) {
      tooltip.textContent = message;
    }
  };

  const resetSnippet = (snippet) => {
    snippet.classList.remove('is-copied');
    setTooltip(snippet, 'Copy');
  };

  const copyText = async (text) => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    let succeeded = false;
    try {
      succeeded = document.execCommand('copy');
    } catch (errorCopy) {
      succeeded = false;
    }

    document.body.removeChild(textarea);
    return succeeded;
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const snippet = button.closest('.code-snippet');
      const code = snippet?.querySelector('code');

      if (!snippet || !code) {
        return;
      }

      const text = code.textContent.replace(/\n\s+/g, '\n').trim();

      try {
        const success = await copyText(text);
        if (success) {
          snippet.classList.add('is-copied');
          setTooltip(snippet, 'Copied!');
        } else {
          setTooltip(snippet, 'Copy failed');
        }
      } catch (copyError) {
        setTooltip(snippet, 'Copy failed');
      }

      const existingTimer = copyTimers.get(snippet);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = window.setTimeout(() => {
        resetSnippet(snippet);
        copyTimers.delete(snippet);
      }, 2200);

      copyTimers.set(snippet, timer);
    });
  });
});
