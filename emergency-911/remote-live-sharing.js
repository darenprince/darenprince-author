(() => {
  'use strict';
  const API = 'https://911-live-sharing.crownlabs.workers.dev';
  const panel = document.querySelector('[data-live-location]');
  if (!panel) return;
  const start = panel.querySelector('[data-remote-start]');
  const stop = panel.querySelector('[data-remote-stop]');
  const copy = panel.querySelector('[data-remote-copy]');
  const output = panel.querySelector('[data-remote-link]');
  const status = panel.querySelector('[data-remote-status]');
  let latest = null;
  let session = null;
  let ownerToken = '';
  let viewerUrl = '';

  const setStatus = (message) => { if (status) status.textContent = message; };
  const randomToken = () => {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  };
  const request = async (path, options = {}) => {
    const response = await fetch(API + path, {
      ...options,
      cache: 'no-store',
      headers: { 'content-type': 'application/json', ...(options.headers || {}) }
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || 'Live sharing request failed.');
    return body;
  };
  const auth = () => ({ authorization: 'Bearer ' + ownerToken });
  const pushLocation = async () => {
    if (!session || !latest) return;
    await request('/api/sessions/' + session.id + '/location', {
      method: 'PUT', headers: auth(), body: JSON.stringify(latest)
    });
  };

  window.addEventListener('sos:gps-update', async (event) => {
    latest = event.detail;
    if (start) start.disabled = false;
    if (!session) return;
    try {
      await pushLocation();
      setStatus('Live sharing is active. The private viewer link updates with each GPS fix.');
    } catch (error) {
      setStatus(error.message || 'Unable to update shared location.');
    }
  });

  start?.addEventListener('click', async () => {
    if (!latest || session) return;
    start.disabled = true;
    setStatus('Starting a private location share…');
    try {
      const id = crypto.randomUUID();
      ownerToken = randomToken();
      const viewerToken = randomToken();
      const created = await request('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({ id, ownerToken, viewerToken })
      });
      session = { id, expiresAt: created.expiresAt };
      const share = new URL('/911-share.html', window.location.origin);
      share.hash = new URLSearchParams({ id, token: viewerToken }).toString();
      viewerUrl = share.toString();
      if (output) {
        output.value = viewerUrl;
        output.hidden = false;
      }
      if (copy) copy.disabled = false;
      if (stop) stop.disabled = false;
      await pushLocation();
      setStatus('Live sharing is on for up to two hours. Share the private link only with a trusted person.');
    } catch (error) {
      session = null;
      ownerToken = '';
      if (output) { output.value = ''; output.hidden = true; }
      if (copy) copy.disabled = true;
      if (stop) stop.disabled = true;
      if (start) start.disabled = !latest;
      setStatus(error.message || 'Unable to start live sharing.');
    }
  });

  stop?.addEventListener('click', async () => {
    if (!session) return;
    stop.disabled = true;
    setStatus('Stopping and revoking the share…');
    try {
      await request('/api/sessions/' + session.id, { method: 'DELETE', headers: auth() });
      setStatus('Live sharing stopped. The viewer link has been revoked.');
    } catch (error) {
      setStatus((error.message || 'Unable to confirm revocation.') + ' The link expires automatically after two hours.');
    } finally {
      session = null;
      ownerToken = '';
      viewerUrl = '';
      if (output) { output.value = ''; output.hidden = true; }
      if (copy) copy.disabled = true;
      if (start) start.disabled = !latest;
    }
  });

  copy?.addEventListener('click', async () => {
    if (!viewerUrl) return;
    try {
      await navigator.clipboard.writeText(viewerUrl);
      setStatus('Private viewer link copied. Send it only to the person who should see your location.');
    } catch {
      setStatus('Copy is unavailable. Select and copy the private link from the field.');
      output?.focus();
      output?.select();
    }
  });

  window.addEventListener('pagehide', () => {
    if (!session || !ownerToken) return;
    fetch(API + '/api/sessions/' + session.id, {
      method: 'DELETE', keepalive: true,
      headers: { authorization: 'Bearer ' + ownerToken, 'content-type': 'application/json' }
    }).catch(() => {});
  });
})();
