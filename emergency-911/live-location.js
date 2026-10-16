(() => {
  'use strict';

  const panel = document.querySelector('[data-live-location]');
  if (!panel || !('geolocation' in navigator)) {
    if (panel) {
      const status = panel.querySelector('[data-location-status]');
      if (status) status.textContent = 'This browser does not support GPS location.';
      panel.querySelectorAll('[data-location-refresh], [data-location-start], [data-location-stop], [data-location-copy], [data-location-share]').forEach((button) => { button.disabled = true; });
    }
    return;
  }

  const status = panel.querySelector('[data-location-status]');
  const coordinates = panel.querySelector('[data-location-coordinates]');
  const updated = panel.querySelector('[data-location-updated]');
  const accuracy = panel.querySelector('[data-location-accuracy]');
  const copyButton = panel.querySelector('[data-location-copy]');
  const shareButton = panel.querySelector('[data-location-share]');
  const startButton = panel.querySelector('[data-location-start]');
  const stopButton = panel.querySelector('[data-location-stop]');
  let watchId = null;
  let latestMapUrl = '';
  let latestPoint = '';
  let latestAccuracy = null;
  let latestTimestamp = null;

  const setStatus = (message) => { if (status) status.textContent = message; };
  const renderPosition = (position) => {
    const { latitude, longitude, accuracy: metres } = position.coords;
    const lat = latitude.toFixed(6);
    const lon = longitude.toFixed(6);
    const point = lat + ',' + lon;
    latestPoint = point;
    latestAccuracy = Math.round(metres);
    latestTimestamp = position.timestamp;
    window.dispatchEvent(new CustomEvent('sos:gps-update', { detail: {
      latitude, longitude, accuracy: metres, timestamp: position.timestamp
    } }));
    latestMapUrl = 'https://maps.google.com/?q=' + encodeURIComponent(point);
    if (coordinates) coordinates.textContent = lat + ', ' + lon;
    if (accuracy) accuracy.textContent = '±' + Math.round(metres) + ' metres';
    if (updated) updated.textContent = new Date(position.timestamp).toLocaleString();
    panel.querySelectorAll('[data-location-map]').forEach((link) => {
      link.href = latestMapUrl;
      link.hidden = false;
      link.setAttribute('aria-disabled', 'false');
    });
    panel.closest('.emergency-card')?.querySelectorAll('[data-location-map-frame]').forEach((frame) => {
      const isWaze = frame.hasAttribute('data-location-waze');
      frame.src = isWaze
        ? 'https://embed.waze.com/iframe?zoom=15&q=' + encodeURIComponent(point)
        : 'https://maps.google.com/maps?q=' + encodeURIComponent(point) + '&z=16&output=embed';
      frame.setAttribute('aria-label', 'Map centered on the latest GPS fix');
    });
    if (copyButton) copyButton.disabled = false;
    if (shareButton) shareButton.disabled = false;
    setStatus(watchId === null ? 'Location updated on this device. It has not been sent to anyone.' : 'Live GPS updates are active on this device only.');
  };
  const onError = (error) => {
    const messages = {
      1: 'Location permission was denied. Allow location access in your browser settings and try again.',
      2: 'Your location is unavailable. Move to an area with a clearer GPS signal and retry.',
      3: 'The location request timed out. Try again.'
    };
    setStatus(messages[error.code] || 'Unable to retrieve your location.');
    if (error.code === 1 && watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      if (startButton) startButton.disabled = false;
      if (stopButton) stopButton.disabled = true;
    }
  };
  const getCurrent = () => {
    setStatus('Requesting location permission…');
    navigator.geolocation.getCurrentPosition(renderPosition, onError, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    });
  };

  panel.querySelector('[data-location-refresh]')?.addEventListener('click', getCurrent);
  startButton?.addEventListener('click', () => {
    if (watchId !== null) return;
    setStatus('Requesting permission to start live GPS updates…');
    watchId = navigator.geolocation.watchPosition(renderPosition, onError, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 5000
    });
    if (startButton) startButton.disabled = true;
    if (stopButton) stopButton.disabled = false;
  });
  stopButton?.addEventListener('click', () => {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    watchId = null;
    if (startButton) startButton.disabled = false;
    if (stopButton) stopButton.disabled = true;
    setStatus(latestMapUrl ? 'Live updates stopped. Last fix remains on this device.' : 'Live updates stopped. No location fix received.');
  });
  shareButton?.addEventListener('click', async () => {
    if (!latestMapUrl) return;
    if (navigator.share) {
      try {
        const recordedAt = latestTimestamp ? new Date(latestTimestamp).toLocaleString() : 'time unavailable';
        const detail = 'Latest GPS fix: ' + latestPoint + '; accuracy ±' + latestAccuracy + ' metres; recorded ' + recordedAt + '. This is a one-time fix, not continuous tracking.';
        await navigator.share({ title: 'My current location', text: detail, url: latestMapUrl });
        setStatus('Location link shared using your device share sheet. It is a one-time GPS fix, not continuous tracking.');
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') {
          setStatus('Sharing cancelled. Your location was not shared from this action.');
          return;
        }
      }
    }
    setStatus('Direct sharing is unavailable here. Use Copy Map Link, then choose a trusted contact.');
  });
  copyButton?.addEventListener('click', async () => {
    if (!latestMapUrl) return;
    try {
      await navigator.clipboard.writeText(latestMapUrl);
      setStatus('Map link copied. Share it only with people you trust.');
    } catch {
      setStatus('Copy is unavailable in this browser. Use the map link to open and share your location.');
    }
  });
  window.addEventListener('pagehide', () => {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  });
})();