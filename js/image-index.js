async function initGallery() {
  const resp = await fetch('assets/image-manifest.json')
  const images = await resp.json()
  const gallery = document.getElementById('gallery')
  const searchInput = document.getElementById('image-search')
  const zoomInput = document.getElementById('image-zoom')
  const zoomValue = document.getElementById('image-zoom-value')
  let current = images
  const assetPrefix = (document.documentElement.dataset.assetPrefix || '').replace(/\/+$/g, '')
  const zoomConfig = {
    min: zoomInput ? Number(zoomInput.min) || 140 : 140,
    max: zoomInput ? Number(zoomInput.max) || 360 : 360,
    defaultValue: zoomInput ? Number(zoomInput.dataset.default || zoomInput.value || 220) : 220,
  }

  function setZoom(value) {
    const clamped = Math.min(zoomConfig.max, Math.max(zoomConfig.min, value))
    gallery.style.setProperty('--image-grid-size', `${clamped}px`)
    if (zoomInput) {
      zoomInput.value = String(clamped)
    }
    if (zoomValue) {
      const percent = Math.round((clamped / zoomConfig.defaultValue) * 100)
      zoomValue.textContent = `${percent}%`
    }
    return clamped
  }

  function buildUrl(assetPath) {
    const normalizedPrefix = assetPrefix.replace(/^\/+/g, '')
    const normalizedPath = assetPath.replace(/^\/+/g, '')
    const combined = `/${[normalizedPrefix, normalizedPath].filter(Boolean).join('/')}`
    return new URL(combined, window.location.origin).href
  }

  function render(list) {
    gallery.innerHTML = ''
    list.forEach((path) => {
      const fullUrl = buildUrl(path)
      const wrapper = document.createElement('div')
      wrapper.className = 'img-item'

      const img = document.createElement('img')
      img.src = fullUrl
      img.alt = path.split('/').pop()
      img.loading = 'lazy'
      wrapper.appendChild(img)

      img.addEventListener('click', () => {
        gallery.querySelectorAll('.img-item.is-active').forEach((item) => {
          item.classList.remove('is-active')
        })
        wrapper.classList.add('is-active')
        openModal(img.src, img.alt)
      })

      const codeBox = document.createElement('div')
      codeBox.className = 'code-box'
      const code = document.createElement('code')
      code.textContent = fullUrl
      const btn = document.createElement('button')
      btn.className = 'btn btn-sm btn--primary'
      btn.textContent = 'Copy URL'
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(fullUrl).then(() => {
          btn.textContent = 'Copied!'
          setTimeout(() => (btn.textContent = 'Copy URL'), 2000)
        })
      })
      codeBox.appendChild(code)
      codeBox.appendChild(btn)
      wrapper.appendChild(codeBox)

      gallery.appendChild(wrapper)
    })
  }

  function openModal(src, alt) {
    const modal = document.createElement('div')
    modal.className = 'img-modal'
    modal.tabIndex = -1
    modal.innerHTML = `<span class="close">&times;</span><img src="${src}" alt="${alt}">`
    const remove = () => {
      modal.remove()
      document.removeEventListener('keydown', onKey)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') remove()
    }
    document.addEventListener('keydown', onKey)
    modal.querySelector('.close').addEventListener('click', remove)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) remove()
    })
    document.body.appendChild(modal)
    modal.focus()
  }

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase()
    current = images.filter((p) => p.toLowerCase().includes(term))
    render(current)
  })

  if (zoomInput) {
    setZoom(Number(zoomInput.value) || zoomConfig.defaultValue)
    zoomInput.addEventListener('input', (event) => {
      setZoom(Number(event.target.value))
    })
  } else {
    setZoom(zoomConfig.defaultValue)
  }

  let pinchStartDistance = null
  let pinchStartZoom = null
  const getDistance = (touches) => {
    const [first, second] = touches
    return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY)
  }
  const onTouchStart = (event) => {
    if (event.touches.length !== 2) return
    pinchStartDistance = getDistance(event.touches)
    pinchStartZoom = zoomInput ? Number(zoomInput.value) : zoomConfig.defaultValue
  }
  const onTouchMove = (event) => {
    if (event.touches.length !== 2 || pinchStartDistance === null) return
    const nextDistance = getDistance(event.touches)
    if (!nextDistance) return
    event.preventDefault()
    const scale = nextDistance / pinchStartDistance
    const nextValue = (pinchStartZoom || zoomConfig.defaultValue) * scale
    setZoom(nextValue)
  }
  const onTouchEnd = () => {
    if (pinchStartDistance === null) return
    pinchStartDistance = null
    pinchStartZoom = null
  }
  gallery.addEventListener('touchstart', onTouchStart, { passive: true })
  gallery.addEventListener('touchmove', onTouchMove, { passive: false })
  gallery.addEventListener('touchend', onTouchEnd)
  gallery.addEventListener('touchcancel', onTouchEnd)

  render(current)
}

initGallery()
