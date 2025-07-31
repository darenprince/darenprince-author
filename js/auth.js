const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    window.location.href = 'dashboard.html';
  }
}

function toggleMode() {
  mode = mode === 'signin' ? 'signup' : 'signin';
  submitBtn.textContent = mode === 'signin' ? 'Sign In' : 'Sign Up';
  toggleLink.textContent = mode === 'signin' ? 'Need an account? Sign Up' : 'Already have an account? Sign In';
  errorEl.textContent = '';
}

let mode = 'signin';
const form = document.getElementById('auth-form');
const submitBtn = document.querySelector('.js-submit');
const toggleLink = document.querySelector('.js-toggle-auth');
const errorEl = document.querySelector('.auth-error');

document.addEventListener('DOMContentLoaded', checkSession);
if (toggleLink) toggleLink.addEventListener('click', (e) => { e.preventDefault(); toggleMode(); });

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let result;
    if (mode === 'signin') {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) {
      errorEl.textContent = result.error.message;
    } else {
      window.location.href = 'dashboard.html';
    }
  });
}
