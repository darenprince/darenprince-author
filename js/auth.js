import { initPasswordStrength, passwordsValid, resetPasswordStrength } from './password-strength.js';

const SUPABASE_URL = 'https://ogftwcrihcihqahfasmg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZnR3Y3JpaGNpaHFhaGZhc21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjAxNTcsImV4cCI6MjA2OTQ5NjE1N30.XI6epagbdQZgoxOnB63UYXUjUOZEpS8ezKPWuhToP9A';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  signupFields.forEach((el) => (el.hidden = true));
  signinFields.forEach((el) => (el.hidden = false));
  initPasswordStrength(submitBtn);
});
if (toggleLink) toggleLink.addEventListener('click', (e) => { e.preventDefault(); toggleMode(); });

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
    } else {
      if (!passwordsValid()) {
        errorEl.textContent = 'Please meet password requirements.';
        return;
      }
      result = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            shipping_address: shipping,
          },
        },
      });
    }
    if (result.error) {
      errorEl.textContent = result.error.message;
    } else {
      window.location.href = 'dashboard.html';
    }
  });
}
