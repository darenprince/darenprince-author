async function initGallery() {
  const resp = await fetch('assets/image-manifest.json')
  const manifest = await resp.json()
  const images = manifest.map((entry) => {
    if (typeof entry === 'string') {
      return { path: entry, description: entry.split('/').pop() }
    }
    return entry
  })

  const gallery = document.getElementById('gallery')
  const searchInput = document.getElementById('image-search')
  const zoomInput = document.getElementById('image-zoom')
  const zoomValue = document.getElementById('image-zoom-value')
  const resultCount = document.getElementById('image-result-count')
  const assetPrefix = (document.documentElement.dataset.assetPrefix || '').replace(/\/+$/g, '')

  let current = images

  const zoomConfig = {
    min: zoomInput ? Number(zoomInput.min) || 80 : 80,
    max: zoomInput ? Number(zoomInput.max) || 360 : 360,
    defaultValue: zoomInput ? Number(zoomInput.dataset.default || zoomInput.value || 220) : 220,
  }

  function setMobileColumns(zoom) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      const columns = zoom <= 95 ? 4 : zoom <= 125 ? 3 : 2
      gallery.style.setProperty('--image-grid-columns-mobile', String(columns))
      return
    }
    gallery.style.removeProperty('--image-grid-columns-mobile')
  }

  function setZoom(value) {
    const clamped = Math.min(zoomConfig.max, Math.max(zoomConfig.min, value))
    gallery.style.setProperty('--image-grid-size', `${clamped}px`)

    if (zoomInput) zoomInput.value = String(clamped)

    if (zoomValue) {
      const percent = Math.round((clamped / zoomConfig.defaultValue) * 100)
      zoomValue.textContent = `${percent}%`
    }

    setMobileColumns(clamped)

    return clamped
  }

  function updateCount(total) {
    if (!resultCount) return
    const suffix = total === 1 ? 'image' : 'images'
    resultCount.textContent = `${total} ${suffix}`
  }

  function buildUrl(assetPath) {
    const normalizedPrefix = assetPrefix.replace(/^\/+/g, '')
    const normalizedPath = assetPath.replace(/^\/+/g, '')
    const combined = `/${[normalizedPrefix, normalizedPath].filter(Boolean).join('/')}`
    return new URL(combined, window.location.origin).href
  }

  function render(list) {
    gallery.innerHTML = ''
    let visibleCount = list.length

    list.forEach(({ path, description, tags = [] }) => {
      const fullUrl = buildUrl(path)
      const wrapper = document.createElement('article')
      wrapper.className = 'img-item'

      const img = document.createElement('img')
      img.src = fullUrl
      img.alt = description
      img.loading = 'lazy'
      img.addEventListener('error', () => {
        wrapper.remove()
        visibleCount = Math.max(0, visibleCount - 1)
        updateCount(visibleCount)
      })
      wrapper.appendChild(img)

      img.addEventListener('click', () => {
        gallery
          .querySelectorAll('.img-item.is-active')
          .forEach((item) => item.classList.remove('is-active'))
        wrapper.classList.add('is-active')
        openModal(img.src, description)
      })

      const meta = document.createElement('div')
      meta.className = 'img-meta'
      const descriptionEl = document.createElement('p')
      descriptionEl.className = 'img-description'
      descriptionEl.textContent = description
      const pathEl = document.createElement('p')
      pathEl.className = 'img-path'
      pathEl.textContent = path
      const tagsEl = document.createElement('p')
      tagsEl.className = 'img-path'
      tagsEl.textContent = tags.length ? `Tags: ${tags.join(', ')}` : ''
      meta.append(descriptionEl, pathEl, tagsEl)

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
          setTimeout(() => {
            btn.textContent = 'Copy URL'
          }, 1800)
        })
      })

      codeBox.append(code, btn)
      wrapper.append(meta, codeBox)
      gallery.appendChild(wrapper)
    })

    updateCount(visibleCount)
  }

  function openModal(src, alt) {
    const modal = document.createElement('div')
    modal.className = 'img-modal'
    modal.tabIndex = -1
    modal.innerHTML = `
      <div class="img-modal__dialog" role="dialog" aria-modal="true" aria-label="Image preview">
        <button type="button" class="img-modal__close" aria-label="Close image preview">
          <i class="ph ph-x" aria-hidden="true"></i>
          <span>Close</span>
        </button>
        <img src="${src}" alt="${alt}">
      </div>
    `

    const remove = () => {
      modal.remove()
      document.removeEventListener('keydown', onKey)
    }

    const onKey = (event) => {
      if (event.key === 'Escape') remove()
    }

    document.addEventListener('keydown', onKey)
    modal.querySelector('.img-modal__close').addEventListener('click', remove)
    modal.addEventListener('click', (event) => {
      if (event.target === modal) remove()
    })

    document.body.appendChild(modal)
    modal.focus()
  }

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase()
    if (!term) {
      current = images
    } else {
      current = images.filter(({ path, description, tags = [] }) => {
        const haystack = `${path} ${description} ${tags.join(' ')}`.toLowerCase()
        return haystack.includes(term)
      })
    }

    render(current)
  })

  if (zoomInput) {
    setZoom(Number(zoomInput.value) || zoomConfig.defaultValue)
    zoomInput.addEventListener('input', (event) => setZoom(Number(event.target.value)))
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
    pinchStartDistance = null
    pinchStartZoom = null
  }

  gallery.addEventListener('touchstart', onTouchStart, { passive: true })
  gallery.addEventListener('touchmove', onTouchMove, { passive: false })
  gallery.addEventListener('touchend', onTouchEnd)
  gallery.addEventListener('touchcancel', onTouchEnd)
  window.addEventListener('resize', () => {
    setMobileColumns(zoomInput ? Number(zoomInput.value) : zoomConfig.defaultValue)
  })

  render(current)
}

initGallery()
