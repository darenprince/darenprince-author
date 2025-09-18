import { enforceAuthGuard } from './auth-guard.js';
import { FOLDER_CATALOG } from './folder-catalog.js';
import {
  logSupabaseError,
  logSupabaseInfo,
  logSupabaseWarning,
} from './supabase-logger.js';

const ROLE_OPTIONS = [
  { value: 'member', label: 'Member' },
  { value: 'developer', label: 'Developer' },
  { value: 'admin', label: 'Admin' },
];

const state = {
  supabase: null,
  user: null,
  users: [],
  filter: '',
};

const dom = {
  app: document.querySelector('[data-console-root]'),
  list: document.querySelector('[data-user-list]'),
  summary: document.querySelector('[data-user-summary]'),
  toast: document.querySelector('[data-console-toast]'),
  loading: document.querySelector('[data-console-loading]'),
  search: document.querySelector('[data-user-search]'),
  emptyState: document.querySelector('[data-empty-state]'),
};

function setToast(message, variant = 'info') {
  if (!dom.toast) return;
  dom.toast.textContent = message;
  dom.toast.dataset.variant = variant;
  dom.toast.hidden = false;
}

function clearToast() {
  if (!dom.toast) return;
  dom.toast.textContent = '';
  dom.toast.hidden = true;
  delete dom.toast.dataset.variant;
}

function setLoading(loading) {
  if (!dom.loading) return;
  dom.loading.hidden = !loading;
}

function formatTimestamp(iso) {
  if (!iso) return 'Never';
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch (error) {
    logSupabaseWarning('adminConsole.formatTimestamp', 'Failed to format timestamp', {
      message: error?.message,
      value: iso,
    });
    return iso;
  }
}

function toggleCardDisabled(card, disabled) {
  card.classList.toggle('is-busy', Boolean(disabled));
  card.querySelectorAll('button, input, select').forEach((el) => {
    el.disabled = Boolean(disabled);
  });
}

function updateSummary(count) {
  if (!dom.summary) return;
  const descriptor = count === 1 ? 'user' : 'users';
  dom.summary.textContent = `${count} ${descriptor} visible`;
}

function syncEmptyState(hasRows) {
  if (!dom.emptyState) return;
  dom.emptyState.hidden = hasRows;
}

function renderUsers() {
  if (!dom.list) return;
  dom.list.replaceChildren();
  const filter = state.filter.trim().toLowerCase();
  const filtered = filter
    ? state.users.filter((user) => {
        const target = [
          user.email,
          user.first_name,
          user.last_name,
          user.role,
          ...(user.folder_access || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return target.includes(filter);
      })
    : state.users;

  filtered.forEach((user) => {
    const card = buildUserCard(user);
    dom.list.appendChild(card);
  });

  updateSummary(filtered.length);
  syncEmptyState(filtered.length > 0);
}

function buildUserCard(user) {
  const card = document.createElement('article');
  card.className = 'user-card';
  card.dataset.userId = user.id;

  const heading = document.createElement('header');
  heading.className = 'user-card__heading';

  const identity = document.createElement('div');
  identity.className = 'user-card__identity';

  const emailEl = document.createElement('h3');
  emailEl.className = 'user-card__email';
  emailEl.textContent = user.email ?? 'Unknown email';

  const nameEl = document.createElement('p');
  nameEl.className = 'user-card__name';
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
  nameEl.textContent = fullName || 'Profile pending sync';

  identity.append(emailEl, nameEl);

  const roleControl = document.createElement('label');
  roleControl.className = 'user-card__role';
  roleControl.innerHTML = '<span>Role</span>';

  const roleSelect = document.createElement('select');
  ROLE_OPTIONS.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    if (option.value === user.role) {
      opt.selected = true;
    }
    roleSelect.appendChild(opt);
  });
  roleSelect.addEventListener('change', () => {
    handleRoleChange(user.id, roleSelect.value, card);
  });
  roleControl.appendChild(roleSelect);

  heading.append(identity, roleControl);

  const metaList = document.createElement('dl');
  metaList.className = 'user-card__meta';

  const createdLabel = document.createElement('dt');
  createdLabel.textContent = 'Created';
  const createdValue = document.createElement('dd');
  createdValue.textContent = formatTimestamp(user.created_at);

  const seenLabel = document.createElement('dt');
  seenLabel.textContent = 'Last seen';
  const seenValue = document.createElement('dd');
  seenValue.textContent = formatTimestamp(user.last_sign_in_at);

  metaList.append(createdLabel, createdValue, seenLabel, seenValue);

  const folderSection = document.createElement('section');
  folderSection.className = 'user-card__folders';
  const folderHeading = document.createElement('h4');
  folderHeading.textContent = 'Folder access';
  folderSection.appendChild(folderHeading);

  const folderGrid = document.createElement('div');
  folderGrid.className = 'folder-grid';
  const assigned = new Set(user.folder_access || []);

  FOLDER_CATALOG.forEach((folder) => {
    const checkboxId = `${user.id}-${folder.id}`;
    const wrapper = document.createElement('label');
    wrapper.className = 'folder-pill';
    if (folder.description) {
      wrapper.title = folder.description;
    }

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = folder.id;
    input.checked = assigned.has(folder.id);
    input.dataset.folderCheckbox = 'true';
    input.id = checkboxId;
    input.addEventListener('change', () => {
      handleFolderToggle(user.id, card);
    });

    const text = document.createElement('span');
    text.className = 'folder-pill__label';
    text.textContent = folder.label;

    wrapper.append(input, text);
    folderGrid.appendChild(wrapper);
  });

  folderSection.appendChild(folderGrid);

  const actions = document.createElement('div');
  actions.className = 'user-card__actions';

  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.className = 'btn btn--ghost';
  resetButton.textContent = 'Reset password';
  resetButton.addEventListener('click', () => {
    handlePasswordReset(user, card);
  });

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'btn btn--danger';
  deleteButton.textContent = 'Delete user';
  deleteButton.addEventListener('click', () => {
    handleDeleteUser(user, card);
  });

  if (user.id === state.user?.id) {
    deleteButton.disabled = true;
    deleteButton.title = 'You cannot delete the active admin session.';
  }

  actions.append(resetButton, deleteButton);

  card.append(heading, metaList, folderSection, actions);
  return card;
}

async function handleRoleChange(userId, newRole, card) {
  if (!state.supabase) return;
  toggleCardDisabled(card, true);
  clearToast();
  try {
    const { data, error } = await state.supabase.functions.invoke('admin-users', {
      body: { action: 'update-role', userId, role: newRole },
    });
    if (error) throw error;
    const role = data?.role ?? newRole;
    setToast('Role updated successfully.', 'success');
    const index = state.users.findIndex((user) => user.id === userId);
    if (index >= 0) {
      state.users[index] = { ...state.users[index], role };
    }
  } catch (error) {
    logSupabaseError('adminConsole.roleUpdate', error, { userId, newRole });
    setToast('Role update failed. Please retry.', 'error');
    renderUsers();
  } finally {
    toggleCardDisabled(card, false);
  }
}

async function handleFolderToggle(userId, card) {
  if (!state.supabase) return;
  toggleCardDisabled(card, true);
  clearToast();
  try {
    const folders = Array.from(
      card.querySelectorAll('input[data-folder-checkbox="true"]'),
    )
      .filter((input) => input.checked)
      .map((input) => input.value)
      .filter((value, index, arr) => arr.indexOf(value) === index);
    const { data, error } = await state.supabase.functions.invoke('admin-users', {
      body: { action: 'set-folder-access', userId, folders },
    });
    if (error) throw error;
    const nextFolders = data?.folders ?? folders;
    const index = state.users.findIndex((user) => user.id === userId);
    if (index >= 0) {
      state.users[index] = { ...state.users[index], folder_access: nextFolders };
    }
    setToast('Folder access updated.', 'success');
  } catch (error) {
    logSupabaseError('adminConsole.folderAccess', error, { userId });
    setToast('Unable to update folder access right now.', 'error');
    renderUsers();
  } finally {
    toggleCardDisabled(card, false);
  }
}

async function handlePasswordReset(user, card) {
  if (!state.supabase) return;
  toggleCardDisabled(card, true);
  clearToast();
  try {
    const redirectTo = `${window.location.origin}/reset-password.html`;
    const { data, error } = await state.supabase.functions.invoke('admin-users', {
      body: {
        action: 'send-password-reset',
        userId: user.id,
        redirectTo,
      },
    });
    if (error) throw error;
    const link = data?.actionLink;
    if (link && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(link);
      setToast('Password reset link copied to clipboard.', 'success');
    } else if (link) {
      setToast('Password reset link ready. Copy from console log.', 'success');
      logSupabaseInfo('adminConsole.passwordResetLink', 'Password reset link generated', {
        link,
      });
    } else {
      setToast('Password reset email triggered.', 'success');
    }
  } catch (error) {
    logSupabaseError('adminConsole.passwordReset', error, { userId: user.id });
    setToast('Could not generate password reset link.', 'error');
  } finally {
    toggleCardDisabled(card, false);
  }
}

async function handleDeleteUser(user, card) {
  if (!state.supabase) return;
  if (user.id === state.user?.id) {
    setToast('You cannot delete your active session.', 'warning');
    return;
  }
  const confirmation = window.confirm(
    `Delete ${user.email}? This removes folders, storage, and the auth record.`,
  );
  if (!confirmation) return;
  toggleCardDisabled(card, true);
  clearToast();
  try {
    const { error } = await state.supabase.functions.invoke('admin-users', {
      body: { action: 'delete-user', userId: user.id },
    });
    if (error) throw error;
    state.users = state.users.filter((item) => item.id !== user.id);
    renderUsers();
    setToast('User deleted.', 'success');
  } catch (error) {
    logSupabaseError('adminConsole.deleteUser', error, { userId: user.id });
    setToast('Failed to delete user. Check logs for details.', 'error');
    toggleCardDisabled(card, false);
  }
}

async function loadUsers() {
  if (!state.supabase) return;
  setLoading(true);
  clearToast();
  try {
    const { data, error } = await state.supabase.functions.invoke('admin-users', {
      method: 'GET',
    });
    if (error) throw error;
    const payload = data ?? {};
    state.users = Array.isArray(payload.users) ? payload.users : [];
    renderUsers();
  } catch (error) {
    logSupabaseError('adminConsole.loadUsers', error);
    setToast('Unable to load users. Refresh or check Supabase logs.', 'error');
    state.users = [];
    renderUsers();
  } finally {
    setLoading(false);
  }
}

function bindSearch() {
  if (!dom.search) return;
  dom.search.addEventListener('input', () => {
    state.filter = dom.search.value;
    renderUsers();
  });
}

function initConsole() {
  if (!dom.app) return;
  bindSearch();
  enforceAuthGuard({
    requireElevated: true,
    allowedRoles: ['admin'],
    loadFolderAccess: true,
    onAuthorized: async ({ supabase, user }) => {
      state.supabase = supabase;
      state.user = user;
      clearToast();
      await loadUsers();
    },
    deniedHeading: 'Admins only',
    deniedMessage:
      'This console is restricted to system administrators. Request elevated access before returning.',
  });
}

document.addEventListener('DOMContentLoaded', initConsole);
