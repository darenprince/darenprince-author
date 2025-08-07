const supabaseClient = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY
);

async function requireSession() {
  const { data } = await supabaseClient.auth.getSession();
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
  const { data, error } = await supabaseClient.storage.from(bucket).list(path);
  if (error) return;
  const ul = document.getElementById(target);
  ul.innerHTML = '';
  for (const item of data) {
    const { data: url } = await supabaseClient.storage.from(bucket).getPublicUrl(`${path}/${item.name}`);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url.publicUrl;
    a.textContent = item.name;
    li.appendChild(a);
    ul.appendChild(li);
  }
}

async function loadSharedFiles(userId) {
  const { data, error } = await supabaseClient.from('folder_access').select('*').eq('user_id', userId);
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
  const metadata = user.user_metadata || {};
  document.getElementById('first-name').value = metadata.first_name || '';
  document.getElementById('last-name').value = metadata.last_name || '';
  document.getElementById('phone').value = metadata.phone || '';
  document.getElementById('birthdate').value = metadata.birthdate || '';
  document.getElementById('shipping-address').value = metadata.shipping_address || '';
  await listFiles('user-data', user.id, 'file-list');
  await loadSharedFiles(user.id);

  const uploadForm = document.getElementById('upload-form');
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = document.getElementById('user-file').files[0];
    if (!file) return;
    await supabaseClient.storage.from('user-data').upload(`${user.id}/${file.name}`, file, { upsert: true });
    await listFiles('user-data', user.id, 'file-list');
  });

  const avatarInput = document.getElementById('avatar');
  avatarInput.addEventListener('change', async () => {
    const file = avatarInput.files[0];
    if (!file) return;
    await supabaseClient.storage.from('avatars').upload(`${user.id}.jpg`, file, { upsert: true, contentType: file.type });
    const { data } = await supabaseClient.storage.from('avatars').getPublicUrl(`${user.id}.jpg`);
    document.getElementById('avatar-preview').src = data.publicUrl;
  });

  const profileForm = document.getElementById('profile-form');
  profileForm.addEventListener('submit', async (e) => {
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
    const { error } = await supabaseClient.auth.updateUser(updates);
    if (error) msg = error.message;
    document.querySelector('.profile-msg').textContent = msg || 'Updated';
  });

  document.querySelector('.js-auth-toggle').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
  });
}

document.addEventListener('DOMContentLoaded', init);
