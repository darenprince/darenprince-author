
// Password strength indicator

document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.querySelector('.js-password-strength-input');
  const requirements = document.querySelectorAll('[data-requirement]');

  if (!passwordInput || requirements.length === 0) return;

  const checks = {
    length: value => value.length >= 8,
    number: value => /\d/.test(value),
    lower: value => /[a-z]/.test(value),
    upper: value => /[A-Z]/.test(value),
    special: value => /[^A-Za-z0-9]/.test(value)
  };

  const validate = () => {
    const value = passwordInput.value;
    requirements.forEach(req => {
      const type = req.dataset.requirement;
      const passed = checks[type] ? checks[type](value) : false;
      req.classList.toggle('is-valid', passed);
      req.classList.toggle('is-invalid', !passed);
    });
  };

  passwordInput.addEventListener('input', validate);
  validate();
});

const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const reqEls = {
  length: document.querySelector('[data-req="length"]'),
  upper: document.querySelector('[data-req="upper"]'),
  lower: document.querySelector('[data-req="lower"]'),
  number: document.querySelector('[data-req="number"]'),
  symbol: document.querySelector('[data-req="symbol"]'),
  match: document.querySelector('[data-req="match"]')
};
let submitBtn;

function setReqState(name, valid) {
  const el = reqEls[name];
  if (!el) return;
  el.classList.toggle('valid', valid);
  el.classList.toggle('invalid', !valid);
  const icon = el.querySelector('i');
  if (icon) {
    icon.className = valid ? 'ti ti-check' : 'ti ti-circle';
  }
}

function evaluate() {
  if (!passwordInput || !confirmInput) return false;
  const val = passwordInput.value;
  const checks = {
    length: val.length >= 8,
    upper: /[A-Z]/.test(val),
    lower: /[a-z]/.test(val),
    number: /\d/.test(val),
    symbol: /[^A-Za-z0-9]/.test(val)
  };
  const match = val && val === confirmInput.value;

  setReqState('length', checks.length);
  setReqState('upper', checks.upper);
  setReqState('lower', checks.lower);
  setReqState('number', checks.number);
  setReqState('symbol', checks.symbol);
  setReqState('match', match);

  confirmInput.classList.toggle('valid', match);
  confirmInput.classList.toggle('invalid', !match && confirmInput.value.length > 0);
  passwordInput.classList.toggle('valid', Object.values(checks).every(Boolean));
  passwordInput.classList.toggle('invalid', !Object.values(checks).every(Boolean) && val.length > 0);

  const allValid = Object.values(checks).every(Boolean) && match;
  if (submitBtn) submitBtn.disabled = !allValid;
  return allValid;
}

export function initPasswordStrength(btn) {
  submitBtn = btn;
  if (!passwordInput || !confirmInput) return;
  passwordInput.addEventListener('input', evaluate);
  confirmInput.addEventListener('input', evaluate);
}

export function passwordsValid() {
  return evaluate();
}

export function resetPasswordStrength(btn) {
  submitBtn = btn || submitBtn;
  if (submitBtn) submitBtn.disabled = true;
  evaluate();
}

export { evaluate };
