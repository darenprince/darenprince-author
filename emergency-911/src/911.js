const CODE = '64235548';

const setSystemFonts = () => {
  const root = document.documentElement;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
  const isApple = /iPad|iPhone|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && 'ontouchend' in document);
  const isAndroid = /Android/.test(userAgent);

  if (isApple) {
    root.style.setProperty(
      '--font-system-body',
      `'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif`
    );
    root.style.setProperty(
      '--font-system-heading',
      `'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif`
    );
  } else if (isAndroid) {
    root.style.setProperty(
      '--font-system-body',
      `'Roboto', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`
    );
    root.style.setProperty(
      '--font-system-heading',
      `'Roboto', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`
    );
  } else {
    root.style.setProperty('--font-system-body', `'Helvetica Neue', Helvetica, Arial, sans-serif`);
    root.style.setProperty('--font-system-heading', `'Helvetica Neue', Helvetica, Arial, sans-serif`);
  }
};

const smoothScrollTo = (hash) => {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setSystemFonts();

  const body = document.body;
  const gate = document.querySelector('#passwordGate');
  const main = document.querySelector('.emergency-main');
  const cards = document.querySelectorAll('[data-card]');
  const inputs = gate?.querySelectorAll('.code-input');
  const form = gate?.querySelector('form');
  const error = gate?.querySelector('[data-error]');
  const gateContent = gate?.querySelector('[data-gate-content]');
  const gateAuth = gate?.querySelector('[data-gate-auth]');
  const preloader = document.querySelector('[data-preloader]');
  const nav = document.querySelector('.command-nav');
  const menuToggle = document.querySelector('.command-menu-toggle');
  const backToTop = document.querySelector('.back-to-top');
  const modal = document.querySelector('[data-alert-modal]');
  const modalCloseTriggers = modal?.querySelectorAll('[data-modal-close]') ?? [];
  const copyButtons = document.querySelectorAll('.copy-button');
  const AUTH_DURATION = 2500;
  const EXIT_DURATION = 420;

  const revealCards = () => {
    cards.forEach((card) => {
      card.setAttribute('data-loading', 'false');
    });
  };

  const hidePreloader = () => {
    if (preloader) {
      preloader.setAttribute('aria-hidden', 'true');
    }
  };

  const openModal = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    const acknowledge = modal.querySelector('.alert-modal__acknowledge');
    window.setTimeout(() => {
      acknowledge?.focus();
    }, 80);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
  };

  modalCloseTriggers.forEach((trigger) => {
    trigger.addEventListener('click', closeModal);
  });

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  const unlockPortal = () => {
    if (!gate || !main) return;

    sessionStorage.setItem('emergencyAccess', 'granted');
    gate.classList.add('is-hidden');
    gate.classList.remove('is-authenticating', 'is-exiting');
    gate.setAttribute('aria-hidden', 'true');
    gateContent?.setAttribute('aria-hidden', 'false');
    gateAuth?.setAttribute('aria-hidden', 'true');
    form?.removeAttribute('aria-busy');
    inputs?.forEach((input) => {
      input.blur();
      input.removeAttribute('disabled');
    });
    main.setAttribute('aria-hidden', 'false');
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
    window.setTimeout(() => {
      main.removeAttribute('tabindex');
    }, 200);
    body.classList.remove('is-locked');
    revealCards();
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 60);
    window.setTimeout(() => {
      openModal();
    }, 260);
  };

  const startAuthentication = () => {
    if (!gate || !main) return;
    if (gate.classList.contains('is-authenticating')) return;

    gate.classList.remove('has-error');
    gate.classList.add('is-authenticating');
    form?.setAttribute('aria-busy', 'true');
    gateContent?.setAttribute('aria-hidden', 'true');
    gateAuth?.setAttribute('aria-hidden', 'false');
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    inputs?.forEach((input) => {
      input.setAttribute('disabled', 'true');
    });

    window.setTimeout(() => {
      gate.classList.add('is-exiting');
      window.setTimeout(() => {
        unlockPortal();
      }, EXIT_DURATION);
    }, AUTH_DURATION);
  };

  const stored = sessionStorage.getItem('emergencyAccess');

  if (stored === 'granted') {
    body.classList.remove('is-locked');
    if (gate) {
      gate.classList.add('is-hidden');
      gate.classList.remove('is-authenticating', 'is-exiting');
      gate.setAttribute('aria-hidden', 'true');
    }
    if (main) {
      main.setAttribute('aria-hidden', 'false');
    }
    gateAuth?.setAttribute('aria-hidden', 'true');
    gateContent?.setAttribute('aria-hidden', 'false');
    form?.removeAttribute('aria-busy');
    revealCards();
    window.setTimeout(() => {
      closeModal();
    }, 0);
  } else {
    if (gate) {
      gate.classList.remove('is-hidden');
      gate.setAttribute('aria-hidden', 'false');
      body.classList.add('is-locked');
    }
    gateAuth?.setAttribute('aria-hidden', 'true');
    gateContent?.setAttribute('aria-hidden', 'false');
    if (inputs && inputs.length > 0) {
      window.setTimeout(() => {
        inputs[0].focus();
      }, 150);
    }
  }

  const collectCode = () => {
    if (!inputs) return '';
    return Array.from(inputs)
      .map((input) => input.value.trim())
      .join('');
  };

  inputs?.forEach((input, index) => {
    input.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) {
        return;
      }
      const value = target.value.replace(/[^0-9]/g, '');
      target.value = value.slice(0, 1);
      if (value && inputs[index + 1]) {
        inputs[index + 1].focus();
      }
      if (gate?.classList.contains('has-error')) {
        gate.classList.remove('has-error');
        if (error) error.textContent = '';
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !input.value && inputs[index - 1]) {
        inputs[index - 1].focus();
      }
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const entered = collectCode();
    if (entered === CODE) {
      if (error) error.textContent = '';
      gate?.classList.remove('has-error');
      startAuthentication();
    } else {
      gate?.classList.add('has-error');
      if (error) error.textContent = 'Invalid code. Access denied.';
      inputs?.forEach((input) => {
        input.value = '';
      });
      inputs?.[0]?.focus();
    }
  });

  form?.addEventListener('paste', (event) => {
    const clipboard = event.clipboardData?.getData('text') ?? '';
    if (!clipboard) return;
    const digits = clipboard.replace(/\D/g, '').slice(0, inputs?.length ?? 0);
    if (digits.length) {
      event.preventDefault();
      inputs?.forEach((input, index) => {
        input.value = digits[index] ?? '';
      });
      const entered = collectCode();
      if (entered.length === CODE.length) {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  });

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy');
      const tooltip = button.querySelector('.copy-button__tooltip');
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        button.setAttribute('data-state', 'copied');
        if (tooltip) {
          tooltip.textContent = 'Copied to clipboard';
        }
        window.setTimeout(() => {
          button.removeAttribute('data-state');
          if (tooltip) tooltip.textContent = '';
        }, 1600);
      } catch (errorCopy) {
        console.error('Copy failed', errorCopy);
        if (tooltip) {
          tooltip.textContent = 'Unable to copy';
        }
        window.setTimeout(() => {
          if (tooltip) tooltip.textContent = '';
        }, 1600);
      }
    });
  });

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', (!expanded).toString());
    nav?.classList.toggle('is-open', !expanded);
  });

  nav?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!hash) return;
      event.preventDefault();
      smoothScrollTo(hash);
      menuToggle?.setAttribute('aria-expanded', 'false');
      nav?.classList.remove('is-open');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      event.preventDefault();
      smoothScrollTo(hash);
    });
  });

  backToTop?.addEventListener('click', () => {
    smoothScrollTo('#top');
  });

  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 320) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  window.addEventListener('load', () => {
    hidePreloader();
    if (stored === 'granted') {
      revealCards();
    }
  });
});
