import {
  initPasswordStrength,
  passwordsValid,
  resetPasswordStrength,
} from './password-strength.js';
import { getSupabase, SUPABASE_SETUP_MESSAGE } from './supabase-helper.js';
import { getUserRole, isElevatedRole } from './user-role.js';

function resolveRedirectTarget(role) {
  try {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get('redirect');
    if (!redirectParam) return null;
    const target = new URL(redirectParam, window.location.origin);
    if (target.origin !== window.location.origin) return null;
    if (/login\.html?$/.test(target.pathname)) return null;
    if (target.pathname.includes('admin-dashboard') && !isElevatedRole(role)) {
      return null;
    }
    return `${target.pathname}${target.search}${target.hash}` || target.pathname;
  } catch (error) {
    console.warn('Invalid redirect parameter, ignoring', error);
    return null;
  }
}

async function redirectToDashboard(sb, user) {
  if (!user) return;
  try {
    const role = await getUserRole(sb, user);
    const redirectTarget = resolveRedirectTarget(role);
    if (redirectTarget) {
      window.location.href = redirectTarget;
      return;
    }
    const destination = isElevatedRole(role) ? 'admin-dashboard.html' : 'dashboard.html';
    window.location.href = destination;
  } catch (error) {
    console.warn('Role-based redirect failed, sending to member dashboard', error);
    window.location.href = 'dashboard.html';
  }
}

async function checkSession(sb) {
  const { data } = await sb.auth.getSession();
  if (data.session?.user) {
    await redirectToDashboard(sb, data.session.user);
  }
}

let mode = 'signin';
const form = document.getElementById('auth-form');
const submitBtn = document.querySelector('.js-submit');
const toggleLink = document.querySelector('.js-toggle-auth');
const errorEl = document.querySelector('.auth-error');
const resetLink = document.querySelector('.js-reset-password');
const signupFields = document.querySelectorAll('.signup-only');
const signinFields = document.querySelectorAll('.signin-only');
const titleEl = document.querySelector('.login-container h1');
const signinPasswordInput = document.getElementById('signin-password');
const signupPasswordInput = document.getElementById('password');
const signupConfirmInput = document.getElementById('confirm-password');

function handleMissingSupabase(message) {
  const notice = message || SUPABASE_SETUP_MESSAGE;
  if (submitBtn) submitBtn.disabled = true;
  if (errorEl) errorEl.textContent = notice;
}

function setRequired(field, isRequired) {
  if (!field) return;
  field.required = Boolean(isRequired);
  if (isRequired) {
    field.setAttribute('aria-required', 'true');
  } else {
    field.removeAttribute('aria-required');
  }
}

function updateSubmitLabel() {
  if (!submitBtn) return;
  const isSignin = mode === 'signin';
  const label = isSignin ? 'Sign In' : 'Create Account';
  const icon = isSignin ? 'ti ti-key' : 'ti ti-user-plus';
  submitBtn.innerHTML = `<i class="${icon}"></i> ${label}`;
}

function applyMode(nextMode) {
  mode = nextMode;
  const isSignin = mode === 'signin';
  signupFields.forEach((el) => {
    el.hidden = isSignin;
    el.setAttribute('aria-hidden', String(isSignin));
  });
  signinFields.forEach((el) => {
    el.hidden = !isSignin;
    el.setAttribute('aria-hidden', String(!isSignin));
  });
  setRequired(signinPasswordInput, isSignin);
  setRequired(signupPasswordInput, !isSignin);
  setRequired(signupConfirmInput, !isSignin);
  if (!isSignin) {
    if (signinPasswordInput) {
      signinPasswordInput.value = '';
    }
    resetPasswordStrength(submitBtn);
    signupPasswordInput?.focus({ preventScroll: true });
  } else {
    if (submitBtn) submitBtn.disabled = false;
    if (signupPasswordInput) signupPasswordInput.value = '';
    if (signupConfirmInput) signupConfirmInput.value = '';
  }
  updateSubmitLabel();
  if (toggleLink) {
    toggleLink.textContent = isSignin
      ? 'Need an account? Sign Up'
      : 'Already have an account? Sign In';
  }
  if (titleEl) titleEl.textContent = isSignin ? 'Member Login' : 'Create Account';
  if (errorEl) errorEl.textContent = '';
}

function toggleMode() {
  applyMode(mode === 'signin' ? 'signup' : 'signin');
}

document.addEventListener('DOMContentLoaded', () => {
  applyMode(mode);
  initPasswordStrength(submitBtn);

  const sb = getSupabase(handleMissingSupabase);
  if (!sb) return;
  checkSession(sb).catch((error) => {
    console.warn('Session check failed', error);
  });
  // applyMode already ran above to ensure UI defaults
});
if (toggleLink) toggleLink.addEventListener('click', (e) => { e.preventDefault(); toggleMode(); });
if (resetLink)
  resetLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const sb = getSupabase(handleMissingSupabase);
    if (!sb) return;
    const email = document.getElementById('email').value;
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password.html`,
    });
    if (error) {
      if (errorEl) errorEl.textContent = error.message;
    } else {
      window.location.href = `verify-email.html?mode=reset`;
    }
  });

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const sb = getSupabase(handleMissingSupabase);
    if (!sb) return;
    const email = document.getElementById('email').value;
    const loginPassword = signinPasswordInput?.value;
    const password = signupPasswordInput?.value;
    const firstName = document.getElementById('first-name')?.value;
    const lastName = document.getElementById('last-name')?.value;
    const phone = document.getElementById('phone')?.value;
    const shipping = document.getElementById('shipping-address')?.value;
    let result;
    if (mode === 'signin') {
      result = await sb.auth.signInWithPassword({ email, password: loginPassword });
      if (result.error) {
        if (errorEl) errorEl.textContent = result.error.message;
      } else if (result.data?.user) {
        await redirectToDashboard(sb, result.data.user);
      }
      return;
    }

    if (!passwordsValid()) {
      if (errorEl) errorEl.textContent = 'Please meet password requirements.';
      return;
    }

    result = await sb.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/verify-email.html`,
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
          shipping_address: shipping,
        },
      },
    });
    if (result.error) {
      if (errorEl) errorEl.textContent = result.error.message;
    } else {
      window.location.href = `verify-email.html?mode=signup`;
    }
  });
}
