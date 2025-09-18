import { getSupabase, SUPABASE_SETUP_MESSAGE } from './supabase-helper.js';
import { logSupabaseError, logSupabaseWarning } from './supabase-logger.js';

async function requireSession(sb) {
  try {
    const { data, error } = await sb.auth.getSession();
    if (error) throw error;
    if (!data.session) {
      logSupabaseWarning('dashboard.session', 'No active Supabase session');
      window.location.href = 'login.html';
      return null;
    }
    return data.session;
  } catch (error) {
    logSupabaseError('dashboard.session', error);
    window.location.href = 'login.html';
    return null;
  }
}

function updateGreeting(email) {
  const greeting = document.querySelector('.greeting');
  if (greeting) greeting.textContent = `Hi ${email}`;
}

async function listFiles(sb, bucket, path, target) {
  const { data, error } = await sb.storage.from(bucket).list(path);
  if (error) {
    logSupabaseError('dashboard.listFiles', error, { bucket, path });
    return;
  }
  const ul = document.getElementById(target);
  if (!ul) {
    logSupabaseWarning('dashboard.listFiles', 'Missing list target element', { target });
    return;
  }
  ul.innerHTML = '';
  for (const item of data) {
    const { data: url } = await sb.storage.from(bucket).getPublicUrl(`${path}/${item.name}`);
    if (!url?.publicUrl) {
      logSupabaseWarning('dashboard.publicUrl', 'Missing public URL for file', { bucket, path, file: item.name });
      continue;
    }
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url.publicUrl;
    a.textContent = item.name;
    li.appendChild(a);
    ul.appendChild(li);
  }
}

async function loadSharedFiles(sb, userId) {
  const { data, error } = await sb.from('folder_access').select('*').eq('user_id', userId);
  if (error) {
    logSupabaseError('dashboard.sharedFiles', error, { userId });
    return;
  }
  const ul = document.getElementById('shared-list');
  if (!ul) {
    logSupabaseWarning('dashboard.sharedFiles', 'Missing shared list element');
    return;
  }
  ul.innerHTML = '';
  data.forEach((row) => {
    const li = document.createElement('li');
    li.textContent = row.file_name || row.id;
    ul.appendChild(li);
  });
}

async function init() {
  const sb = getSupabase((message) => {
    alert(message || SUPABASE_SETUP_MESSAGE);
  });
  if (!sb) return;
  const session = await requireSession(sb);
  if (!session) return;
  const user = session.user;
  updateGreeting(user.email);
  const metadata = user.user_metadata || {};
  document.getElementById('first-name').value = metadata.first_name || '';
  document.getElementById('last-name').value = metadata.last_name || '';
  document.getElementById('phone').value = metadata.phone || '';
  document.getElementById('birthdate').value = metadata.birthdate || '';
  document.getElementById('shipping-address').value = metadata.shipping_address || '';
  await listFiles(sb, 'user-data', user.id, 'file-list');
  await loadSharedFiles(sb, user.id);

  const uploadForm = document.getElementById('upload-form');
  uploadForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = document.getElementById('user-file').files[0];
    if (!file) return;
    const { error } = await sb.storage.from('user-data').upload(`${user.id}/${file.name}`, file, {
      upsert: true,
    });
    if (error) {
      logSupabaseError('dashboard.upload', error, { file: file.name });
      return;
    }
    await listFiles(sb, 'user-data', user.id, 'file-list');
  });

  const avatarInput = document.getElementById('avatar');
  avatarInput?.addEventListener('change', async () => {
    const file = avatarInput.files[0];
    if (!file) return;
    const { error: uploadError } = await sb.storage
      .from('avatars')
      .upload(`${user.id}.jpg`, file, { upsert: true, contentType: file.type });
    if (uploadError) {
      logSupabaseError('dashboard.avatarUpload', uploadError);
      return;
    }
    const { data, error: publicError } = await sb.storage
      .from('avatars')
      .getPublicUrl(`${user.id}.jpg`);
    if (publicError) {
      logSupabaseError('dashboard.avatarUrl', publicError);
      return;
    }
    const preview = document.getElementById('avatar-preview');
    if (preview) {
      preview.src = data.publicUrl;
    }
  });

  const profileForm = document.getElementById('profile-form');
  profileForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const birthdate = document.getElementById('birthdate').value;
    const shipping = document.getElementById('shipping-address').value;
    let msg = '';
    const updates = {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone,
        birthdate,
        shipping_address: shipping,
      },
    };
    if (email) updates.email = email;
    if (password) updates.password = password;
    const { error } = await sb.auth.updateUser(updates);
    if (error) {
      msg = error.message;
      logSupabaseError('dashboard.updateProfile', error, { updates });
    }
    const msgTarget = document.querySelector('.profile-msg');
    if (msgTarget) msgTarget.textContent = msg || 'Updated';
  });

  document.querySelector('.js-auth-toggle')?.addEventListener('click', async () => {
    const { error } = await sb.auth.signOut();
    if (error) {
      logSupabaseError('dashboard.signOut', error);
      return;
    }
    window.location.href = 'login.html';
  });
}

document.addEventListener('DOMContentLoaded', init);
