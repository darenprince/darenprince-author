async function initGallery() {
  const resp = await fetch('assets/image-manifest.json')
  const images = await resp.json()
  const gallery = document.getElementById('gallery')
  const searchInput = document.getElementById('image-search')
  let current = images
  const assetPrefix = (document.documentElement.dataset.assetPrefix || '').replace(/\/+$/g, '')

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

      img.addEventListener('click', () => openModal(img.src, img.alt))

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

  render(current)
}

initGallery()
