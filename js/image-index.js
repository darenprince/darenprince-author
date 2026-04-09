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
    min: zoomInput ? Number(zoomInput.min) || 84 : 84,
    max: zoomInput ? Number(zoomInput.max) || 360 : 360,
    defaultValue: zoomInput ? Number(zoomInput.dataset.default || zoomInput.value || 220) : 220,
  }
  const baseZoomMin = zoomConfig.min

  function getMobileMinColumnWidth() {
    const viewportWidth = Math.max(window.innerWidth || 0, 320)
    const gridGap = 16
    const mobileColumns = 4
    const calculated = Math.floor((viewportWidth - gridGap * (mobileColumns - 1)) / mobileColumns)
    return Math.max(84, Math.min(120, calculated))
  }

  function setZoom(value) {
    const clamped = Math.min(zoomConfig.max, Math.max(zoomConfig.min, value))
    gallery.style.setProperty('--image-grid-size', `${clamped}px`)

    if (zoomInput) zoomInput.value = String(clamped)

    if (zoomValue) {
      const percent = Math.round((clamped / zoomConfig.defaultValue) * 100)
      zoomValue.textContent = `${percent}%`
    }

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
      <button type="button" class="close" aria-label="Close image preview">
        <span aria-hidden="true">&times;</span>
      </button>
      <img src="${src}" alt="${alt}">
    `

    const remove = () => {
      modal.remove()
      document.removeEventListener('keydown', onKey)
    }

    const onKey = (event) => {
      if (event.key === 'Escape') remove()
    }

    document.addEventListener('keydown', onKey)
    modal.querySelector('.close').addEventListener('click', remove)
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
    const syncZoomBoundsForViewport = () => {
      const mobileMin = getMobileMinColumnWidth()
      if (window.matchMedia('(max-width: 768px)').matches) {
        zoomConfig.min = mobileMin
      } else {
        zoomConfig.min = baseZoomMin
      }

      zoomInput.min = String(Math.round(zoomConfig.min))
      setZoom(Number(zoomInput.value) || zoomConfig.defaultValue)
    }

    syncZoomBoundsForViewport()
    zoomInput.addEventListener('input', (event) => setZoom(Number(event.target.value)))
    window.addEventListener('resize', syncZoomBoundsForViewport, { passive: true })
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

  render(current)
}

initGallery()
