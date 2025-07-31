document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.querySelector('.js-profile-toggle');
  const dropdown = document.querySelector('.js-profile-dropdown');
  if (!toggle || !dropdown) return;

  const avatarImg = dropdown.querySelector('.profile-avatar');
  const nameEl = dropdown.querySelector('.profile-name');
  let client;
  if (window.supabase) {
    const SUPABASE_URL = 'https://ogftwcrihcihqahfasmg.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZnR3Y3JpaGNpaHFhaGZhc21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjAxNTcsImV4cCI6MjA2OTQ5NjE1N30.XI6epagbdQZgoxOnB63UYXUjUOZEpS8ezKPWuhToP9A';
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
