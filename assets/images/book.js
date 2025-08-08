document.getElementById('btn-front').addEventListener('click', () => {
  document.getElementById('book').style.transform = 'rotateY(0deg)';
});

document.getElementById('btn-back').addEventListener('click', () => {
  document.getElementById('book').style.transform = 'rotateY(180deg)';
});

document.getElementById('btn-zoom').addEventListener('click', () => {
  document.getElementById('zoomModal').classList.remove('hidden');
});

document.getElementById('closeZoom').addEventListener('click', () => {
  document.getElementById('zoomModal').classList.add('hidden');
});