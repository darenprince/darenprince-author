import { useEffect } from 'react'

const NOTICE_TEXT = 'a pause, pitch change, hesitation or stress response is an observation. no individual vocal signal proves deception.'

function removeNotice() {
  const matches = []
  document.querySelectorAll('header, main').forEach((root) => {
    root.querySelectorAll('*').forEach((element) => {
      const text = element.textContent?.trim().replace(/\s+/g, ' ').toLowerCase()
      if (text === NOTICE_TEXT) matches.push(element)
    })
  })

  matches.forEach((element) => {
    const parent = element.parentElement
    const target = parent && parent.children.length <= 3 && parent.textContent?.trim().replace(/\s+/g, ' ').toLowerCase() === NOTICE_TEXT
      ? parent
      : element
    target.style.display = 'none'
    target.dataset.vvHeaderNoticeRemoved = 'true'
  })
}

export default function HeaderNoticeCleanup() {
  useEffect(() => {
    removeNotice()
    const observer = new MutationObserver(removeNotice)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  return null
}
