import supabase from '../supabase/client.js';

document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.querySelector('.js-profile-toggle');
  const dropdown = document.querySelector('.js-profile-dropdown');
  if (!toggle || !dropdown) return;

  const avatarImg = dropdown.querySelector('.profile-avatar');
  const nameEl = dropdown.querySelector('.profile-name');
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    const user = data.session.user;
    nameEl.textContent = user.user_metadata?.full_name || user.email;
    const { data: avatarData } = await supabase.storage
      .from('avatars')
      .getPublicUrl(`${user.id}.jpg`);
    if (avatarData?.publicUrl) {
      avatarImg.src = avatarData.publicUrl;
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

  const logoutEl = dropdown.querySelector('.js-auth-toggle');
  if (logoutEl) {
    logoutEl.addEventListener('click', async () => {
      await supabase.auth.signOut();
      window.location.href = '/';
    });
  }
});
