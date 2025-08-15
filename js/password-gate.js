export default function initPasswordGate(expected) {
  const gate = document.createElement('div');
  gate.className = 'auth-gate';
  gate.innerHTML = `
    <form class="auth-gate__form">
      <input id="gate-pass" type="password" class="auth-gate__input" placeholder="Password" required />
      <p class="auth-gate__error" hidden>Incorrect password</p>
      <button class="btn btn--primary" type="submit">Enter</button>
    </form>
  `;
  document.body.appendChild(gate);
  const input = gate.querySelector('input');
  const error = gate.querySelector('.auth-gate__error');
  gate.querySelector('form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === expected) {
      gate.remove();
      document.querySelector('.site-wrap')?.removeAttribute('hidden');
    } else {
      error.hidden = false;
      input.value = '';
      input.focus();
    }
  });
}
