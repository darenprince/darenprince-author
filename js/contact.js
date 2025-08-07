import GameOnUI from './ui.js';

// handle contact form submission
window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    if (statusEl) statusEl.textContent = 'Sending...';

    const payload = {
      name: form.querySelector('#name')?.value.trim(),
      email: form.querySelector('#email')?.value.trim(),
      message: form.querySelector('#message')?.value.trim(),
    };

    try {
      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      if (statusEl) statusEl.textContent = 'Message sent!';
      GameOnUI.showToast('Message sent!', 'success');
      form.reset();
    } catch (err) {
      console.error('Email send failed', err);
      if (statusEl) statusEl.textContent = 'Failed to send. Please try again later.';
      GameOnUI.showToast('Message failed to send', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
});
