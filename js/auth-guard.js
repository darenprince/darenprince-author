import { getSupabase } from './supabase-helper.js';
import { getUserRole, isElevatedRole, normalizeRole } from './user-role.js';

const DEFAULT_REDIRECT = 'login.html';
let gateStylesInjected = false;

function domReady() {
  if (document.readyState === 'loading') {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', resolve, { once: true });
    });
  }
  return Promise.resolve();
}

function ensureGateStyles() {
  if (gateStylesInjected) return;
  const style = document.createElement('style');
  style.dataset.source = 'auth-guard';
  style.textContent = `
    .auth-blocker { position: fixed; inset: 0; z-index: 3200; display: flex; align-items: center; justify-content: center; padding: 2rem; background: rgba(5, 7, 9, 0.92); backdrop-filter: blur(4px); }
    .auth-blocker__panel { max-width: 480px; width: 100%; background: rgba(17, 18, 23, 0.95); border: 1px solid rgba(125, 222, 91, 0.25); border-radius: 18px; padding: 2.5rem 2rem; color: #f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif; box-shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.65); text-align: center; }
    .auth-blocker__panel h2 { font-size: clamp(1.5rem, 2.4vw, 2rem); margin-bottom: 1rem; letter-spacing: 0.02em; }
    .auth-blocker__panel p { margin-bottom: 1.75rem; line-height: 1.6; color: #d6d6d6; }
    .auth-blocker__actions { display: flex; flex-direction: column; gap: 0.75rem; }
    .auth-blocker__button { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.5rem; border-radius: 999px; border: 1px solid transparent; font-weight: 600; letter-spacing: 0.02em; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease; text-decoration: none; }
    .auth-blocker__button--primary { background: linear-gradient(135deg, rgba(125, 222, 91, 0.95), rgba(86, 170, 72, 0.95)); color: #041406; box-shadow: 0 14px 35px -20px rgba(125, 222, 91, 0.85); }
    .auth-blocker__button--primary:hover, .auth-blocker__button--primary:focus-visible { transform: translateY(-1px); box-shadow: 0 20px 45px -22px rgba(125, 222, 91, 0.9); }
    .auth-blocker__button--ghost { background: transparent; border-color: rgba(255, 255, 255, 0.25); color: #f5f5f5; }
    .auth-blocker__button--ghost:hover, .auth-blocker__button--ghost:focus-visible { border-color: rgba(125, 222, 91, 0.55); color: #7dde5b; }
    .auth-blocker__meta { margin-top: 1rem; font-size: 0.875rem; color: #9ea2a8; }
    body.auth-blocked { overflow: hidden; }
  `;
  document.head.appendChild(style);
  gateStylesInjected = true;
}

function revealSite(role, folderAccess) {
  const siteWrap = document.querySelector('.site-wrap');
  if (siteWrap && siteWrap.hasAttribute('hidden')) {
    siteWrap.removeAttribute('hidden');
  }
  document.body.classList.remove('auth-blocked');
  document.body.dataset.userRole = role ?? '';
  if (Array.isArray(folderAccess)) {
    document.body.dataset.folderAccess = folderAccess.join(',');
  }
}

function dispatchAuthEvent(name, detail) {
  try {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  } catch (error) {
    console.warn('Auth guard event dispatch failed', error);
  }
}

async function showBlockingMessage({ heading, body, actions = [], meta }) {
  await domReady();
  ensureGateStyles();
  document.body.classList.add('auth-blocked');
  const existing = document.querySelector('.auth-blocker');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'auth-blocker';
  const panel = document.createElement('div');
  panel.className = 'auth-blocker__panel';
  const h2 = document.createElement('h2');
  h2.textContent = heading;
  const p = document.createElement('p');
  p.textContent = body;
  panel.append(h2, p);
  const actionGroup = document.createElement('div');
  actionGroup.className = 'auth-blocker__actions';
  actions.forEach((action) => {
    if (!action) return;
    const isButton = typeof action.onClick === 'function' && !action.href;
    const element = document.createElement(isButton ? 'button' : 'a');
    element.className = `auth-blocker__button ${action.variant === 'ghost' ? 'auth-blocker__button--ghost' : 'auth-blocker__button--primary'}`;
    element.textContent = action.label;
    if (action.href) {
      element.href = action.href;
    }
    if (action.target) {
      element.target = action.target;
      element.rel = action.rel ?? 'noopener noreferrer';
    }
    if (typeof action.onClick === 'function') {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        action.onClick(event);
      });
    }
    actionGroup.appendChild(element);
  });
  if (actionGroup.childElementCount) {
    panel.appendChild(actionGroup);
  }
  if (meta) {
    const metaEl = document.createElement('p');
    metaEl.className = 'auth-blocker__meta';
    metaEl.textContent = meta;
    panel.appendChild(metaEl);
  }
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
}

function buildLoginRedirect() {
  const redirectPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const encoded = encodeURIComponent(redirectPath);
  return `${DEFAULT_REDIRECT}?redirect=${encoded}`;
}

async function fetchFolderAccess(supabase, userId) {
  try {
    const { data, error } = await supabase
      .from('folder_access')
      .select('file_name')
      .eq('user_id', userId);
    if (error) throw error;
    return (data ?? []).map((row) => row.file_name);
  } catch (error) {
    console.warn('Failed to load folder access', error);
    return [];
  }
}

function evaluateFolderAccess({ userRole, requiredFolders, folderAccess, folderMatch }) {
  if (!requiredFolders?.length) return true;
  if (isElevatedRole(userRole)) return true;
  const accessSet = new Set(folderAccess);
  if (folderMatch === 'any') {
    return requiredFolders.some((name) => accessSet.has(name));
  }
  return requiredFolders.every((name) => accessSet.has(name));
}

function normalizeRolesList(roles) {
  return Array.isArray(roles) ? roles.map(normalizeRole) : [];
}

function isRoleAllowed(role, { allowedRoles, requireElevated }) {
  const normalizedRole = normalizeRole(role);
  if (requireElevated && !isElevatedRole(normalizedRole)) {
    return false;
  }
  const allowedList = normalizeRolesList(allowedRoles);
  if (allowedList.length && !allowedList.includes(normalizedRole)) {
    return false;
  }
  return true;
}

export async function enforceAuthGuard(options = {}) {
  const {
    allowedRoles,
    requireElevated = false,
    requiredFolders = [],
    folderMatch = 'all',
    onAuthorized,
    loadFolderAccess = false,
    deniedMessage,
    deniedHeading,
  } = options;

  const supabase = getSupabase(() => {
    showBlockingMessage({
      heading: 'Supabase is offline',
      body: 'Authentication services are unavailable. Try again later or ping the engineering channel.',
      actions: [
        {
          label: 'Back to homepage',
          href: '/',
          variant: 'ghost',
        },
      ],
      meta: 'Error: missing Supabase client',
    });
  });

  if (!supabase) {
    dispatchAuthEvent('auth:denied', { reason: 'client-missing' });
    return { supabase: null, user: null, role: null, folderAccess: [] };
  }

  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    window.location.href = buildLoginRedirect();
    dispatchAuthEvent('auth:denied', { reason: 'no-session', error });
    return { supabase, user: null, role: null, folderAccess: [] };
  }

  const user = data.session.user;
  const role = await getUserRole(supabase, user);

  if (!isRoleAllowed(role, { allowedRoles, requireElevated })) {
    dispatchAuthEvent('auth:denied', { reason: 'role', role, user });
    await showBlockingMessage({
      heading: deniedHeading ?? 'Access restricted',
      body:
        deniedMessage ??
        'Your account does not have clearance for this control room. Connect with the ops lead to request elevated access.',
      actions: [
        {
          label: 'Back to dashboard',
          href: 'dashboard.html',
        },
        {
          label: 'Contact support',
          href: 'mailto:press@darenprince.com',
          variant: 'ghost',
        },
      ],
      meta: `Signed in as ${user.email || user.id}`,
    });
    return { supabase, user, role, folderAccess: [] };
  }

  const folderAccess = (loadFolderAccess || requiredFolders.length)
    ? await fetchFolderAccess(supabase, user.id)
    : [];

  if (!evaluateFolderAccess({
    userRole: role,
    requiredFolders,
    folderAccess,
    folderMatch,
  })) {
    dispatchAuthEvent('auth:denied', { reason: 'folder', role, user, folderAccess });
    await showBlockingMessage({
      heading: 'Request folder access',
      body:
        'This playbook lives in a restricted folder. Toggle permissions from the upcoming admin console or ping support to unlock it.',
      actions: [
        {
          label: 'Message support',
          href: 'mailto:press@darenprince.com?subject=Folder%20access%20request',
        },
        {
          label: 'Return to dashboard',
          href: 'dashboard.html',
          variant: 'ghost',
        },
      ],
      meta: `Missing: ${requiredFolders.join(', ')}`,
    });
    return { supabase, user, role, folderAccess };
  }

  await domReady();
  revealSite(role, folderAccess);
  const detail = { supabase, user, role, folderAccess };
  dispatchAuthEvent('auth:ready', detail);
  if (typeof onAuthorized === 'function') {
    try {
      await onAuthorized(detail);
    } catch (error) {
      console.warn('auth guard onAuthorized hook failed', error);
    }
  }
  return detail;
}

export default enforceAuthGuard;
