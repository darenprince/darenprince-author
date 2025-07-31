document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.querySelector('.js-profile-toggle');
  const dropdown = document.querySelector('.js-profile-dropdown');
  if (!toggle || !dropdown) return;

  const avatarImg = dropdown.querySelector('.profile-avatar');
  const nameEl = dropdown.querySelector('.profile-name');
  let client;
  if (window.supabase) {
    const SUPABASE_URL = 'YOUR_SUPABASE_URL';
    const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data } = await client.auth.getSession();
    if (data.session) {
      const user = data.session.user;
      nameEl.textContent = user.user_metadata?.full_name || user.email;
      const { data: avatarData } = await client.storage
        .from('avatars')
        .getPublicUrl(`${user.id}.jpg`);
      if (avatarData?.publicUrl) {
        avatarImg.src = avatarData.publicUrl;
      }
    }
  }

  toggle.addEventListener('click', () => {
    dropdown.hidden = !dropdown.hidden;
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
      dropdown.hidden = true;
    }
  });

  const logoutEl = dropdown.querySelector('.js-logout');
  if (logoutEl) {
    logoutEl.addEventListener('click', async () => {
      if (client) await client.auth.signOut();
      window.location.href = '/';
    });
  }
});
