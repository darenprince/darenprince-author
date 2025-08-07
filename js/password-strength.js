// Password strength indicator

document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.querySelector('#new-password, #password');
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
