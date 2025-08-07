const supabaseClient = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY
);

async function checkSession() {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) {
    window.location.href = 'dashboard.html';
  }
}

const signupFields = document.querySelectorAll('.signup-only');
const titleEl = document.querySelector('.login-container h1');

function toggleMode() {
  mode = mode === 'signin' ? 'signup' : 'signin';
  submitBtn.textContent = mode === 'signin' ? 'Sign In' : 'Sign Up';
  toggleLink.textContent =
    mode === 'signin' ? 'Need an account? Sign Up' : 'Already have an account? Sign In';
  signupFields.forEach((el) => (el.hidden = mode !== 'signup'));
  if (titleEl) titleEl.textContent = mode === 'signin' ? 'Member Login' : 'Create Account';
  errorEl.textContent = '';
}

let mode = 'signin';
const form = document.getElementById('auth-form');
const submitBtn = document.querySelector('.js-submit');
const toggleLink = document.querySelector('.js-toggle-auth');
const errorEl = document.querySelector('.auth-error');
const forgotLink = document.querySelector('.js-forgot-password');

document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  signupFields.forEach((el) => (el.hidden = true));
  const params = new URLSearchParams(window.location.search);
  if (params.get('type') === 'recovery') {
    mode = 'reset';
    titleEl.textContent = 'Reset Password';
    document.getElementById('email').parentElement.hidden = true;
    toggleLink.hidden = true;
    submitBtn.textContent = 'Update Password';
  }
});
if (toggleLink) toggleLink.addEventListener('click', (e) => { e.preventDefault(); toggleMode(); });
if (forgotLink)
  forgotLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.href,
    });
    errorEl.textContent = error ? error.message : 'Check your email for a reset link.';
  });

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('first-name')?.value;
    const lastName = document.getElementById('last-name')?.value;
    const phone = document.getElementById('phone')?.value;
    const shipping = document.getElementById('shipping-address')?.value;
    if (mode === 'signin') {
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) errorEl.textContent = error.message;
      else window.location.href = 'dashboard.html';
    } else if (mode === 'signup') {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login.html`,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            shipping_address: shipping,
          },
        },
      });
      errorEl.textContent = error
        ? error.message
        : 'Check your email for a confirmation link.';
    } else if (mode === 'reset') {
      const { error } = await supabaseClient.auth.updateUser({ password });
      if (error) errorEl.textContent = error.message;
      else window.location.href = 'dashboard.html';
    }
  });
}
