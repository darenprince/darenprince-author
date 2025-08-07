import { initPasswordStrength, passwordsValid, resetPasswordStrength } from './password-strength.js';
import { supabaseClient } from './supabaseClient.js';

async function checkSession() {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) {
    window.location.href = 'dashboard.html';
  }
}

const signupFields = document.querySelectorAll('.signup-only');
const signinFields = document.querySelectorAll('.signin-only');
const titleEl = document.querySelector('.login-container h1');

function toggleMode() {
  mode = mode === 'signin' ? 'signup' : 'signin';
  submitBtn.textContent = mode === 'signin' ? 'Sign In' : 'Sign Up';
  toggleLink.textContent =
    mode === 'signin' ? 'Need an account? Sign Up' : 'Already have an account? Sign In';
  signupFields.forEach((el) => (el.hidden = mode !== 'signup'));
  signinFields.forEach((el) => (el.hidden = mode !== 'signin'));
  if (mode === 'signup') {
    resetPasswordStrength(submitBtn);
  } else {
    submitBtn.disabled = false;
  }
  if (titleEl) titleEl.textContent = mode === 'signin' ? 'Member Login' : 'Create Account';
  errorEl.textContent = '';
}

let mode = 'signin';
const form = document.getElementById('auth-form');
const submitBtn = document.querySelector('.js-submit');
const toggleLink = document.querySelector('.js-toggle-auth');
const errorEl = document.querySelector('.auth-error');
const resetLink = document.querySelector('.js-reset-password');

document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  signupFields.forEach((el) => (el.hidden = true));
  signinFields.forEach((el) => (el.hidden = false));
  initPasswordStrength(submitBtn);
  if (window.location.hash.includes('type=recovery')) {
    mode = 'reset';
    submitBtn.textContent = 'Reset Password';
    signinFields.forEach((el) => (el.hidden = true));
    document.getElementById('password').parentElement.hidden = false;
    document.getElementById('confirm-password').parentElement.hidden = false;
  }
});
if (toggleLink) toggleLink.addEventListener('click', (e) => { e.preventDefault(); toggleMode(); });
if (resetLink)
  resetLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/login.html`,
    });
    errorEl.textContent = error ? error.message : 'Check your email for a password reset link.';
  });

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const loginPassword = document.getElementById('signin-password')?.value;
    const password = document.getElementById('password')?.value;
    const firstName = document.getElementById('first-name')?.value;
    const lastName = document.getElementById('last-name')?.value;
    const phone = document.getElementById('phone')?.value;
    const shipping = document.getElementById('shipping-address')?.value;
    let result;
    if (mode === 'signin') {
      result = await supabaseClient.auth.signInWithPassword({ email, password: loginPassword });
      if (result.error) {
        errorEl.textContent = result.error.message;
      } else {
        window.location.href = 'dashboard.html';
      }
      return;
    }

    if (!passwordsValid()) {
      errorEl.textContent = 'Please meet password requirements.';
      return;
    }

    if (mode === 'reset') {
      result = await supabaseClient.auth.updateUser({ password });
      errorEl.textContent = result.error ? result.error.message : 'Password updated. Please sign in.';
      return;
    }

    result = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/login.html`,
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
          shipping_address: shipping,
        },
      },
    });
    errorEl.textContent = result.error ? result.error.message : 'Check your email to verify your account.';
  });
}
