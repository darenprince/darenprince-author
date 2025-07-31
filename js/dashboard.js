const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function requireSession() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = 'login.html';
    return null;
  }
  return data.session;
}

function updateGreeting(email) {
  const greeting = document.querySelector('.greeting');
  if (greeting) greeting.textContent = `Hi ${email}`;
}

async function listFiles(bucket, path, target) {
  const { data, error } = await supabase.storage.from(bucket).list(path);
  if (error) return;
  const ul = document.getElementById(target);
  ul.innerHTML = '';
  for (const item of data) {
    const { data: url } = await supabase.storage.from(bucket).getPublicUrl(`${path}/${item.name}`);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url.publicUrl;
    a.textContent = item.name;
    li.appendChild(a);
    ul.appendChild(li);
  }
}

async function loadSharedFiles(userId) {
  const { data, error } = await supabase.from('folder_access').select('*').eq('user_id', userId);
  if (error) return;
  const ul = document.getElementById('shared-list');
  ul.innerHTML = '';
  data.forEach((row) => {
    const li = document.createElement('li');
    li.textContent = row.file_name || row.id;
    ul.appendChild(li);
  });
}

async function init() {
  const session = await requireSession();
  if (!session) return;
  const user = session.user;
  updateGreeting(user.email);
  await listFiles('user-data', user.id, 'file-list');
  await loadSharedFiles(user.id);

  const uploadForm = document.getElementById('upload-form');
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = document.getElementById('user-file').files[0];
    if (!file) return;
    await supabase.storage.from('user-data').upload(`${user.id}/${file.name}`, file, { upsert: true });
    await listFiles('user-data', user.id, 'file-list');
  });

  const avatarInput = document.getElementById('avatar');
  avatarInput.addEventListener('change', async () => {
    const file = avatarInput.files[0];
    if (!file) return;
    await supabase.storage.from('avatars').upload(`${user.id}.jpg`, file, { upsert: true, contentType: file.type });
    const { data } = await supabase.storage.from('avatars').getPublicUrl(`${user.id}.jpg`);
    document.getElementById('avatar-preview').src = data.publicUrl;
  });

  const profileForm = document.getElementById('profile-form');
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    let msg = '';
    if (email) {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) msg += error.message + ' ';
    }
    if (password) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) msg += error.message;
    }
    document.querySelector('.profile-msg').textContent = msg || 'Updated';
  });

  document.querySelector('.js-logout').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
  });
}

document.addEventListener('DOMContentLoaded', init);
