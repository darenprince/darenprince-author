const EMAIL_TO = 'daren.prince@gmail.com'
let selectionUpdater

function buildMailto(subject, body) {
  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function sendEmail(subject, body) {
  window.location.href = buildMailto(subject, body)
}

function summarizeForm(form) {
  const data = new FormData(form)
  const summary = []
  data.forEach((value, key) => {
    if (value) summary.push(`${key}: ${value}`)
  })
  return summary.join('\n') || 'No details provided yet.'
}

function initSelectionConsole() {
  const output = document.getElementById('selection-output')
  const noteInput = document.getElementById('selection-note')
  const submitBtn = document.getElementById('selection-submit')
  const clearBtn = document.getElementById('selection-clear')

  if (!output || !submitBtn) return null

  let latest = ''
  let subject = 'HxD Selection'

  const update = (text, nextSubject = 'HxD Selection') => {
    latest = text
    subject = nextSubject
    output.textContent = text || 'Waiting for your move.'
    submitBtn.disabled = !text
  }

  submitBtn.addEventListener('click', () => {
    if (!latest) return
    const note = noteInput?.value?.trim()
    const body = `${latest}${note ? `\n\nNotes: ${note}` : ''}\n\nSubmitted from HxD Playground.`
    sendEmail(subject, body)
  })

  clearBtn?.addEventListener('click', () => {
    update('')
    if (noteInput) noteInput.value = ''
  })

  document.querySelectorAll('[data-selection-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.selectionTarget
      const target = document.getElementById(targetId)
      if (!target) return
      const nextSubject = btn.dataset.selectionSubject || 'HxD Selection'
      let text = ''
      if (target.tagName === 'FORM') {
        text = summarizeForm(target)
      } else {
        text = target.textContent.trim()
      }
      update(text, nextSubject)
    })
  })

  return update
}

function initMenu() {
  const menuButton = document.querySelector('.menu-button')
  const overlay = document.querySelector('.overlay-menu')

  if (!menuButton || !overlay) return

  const toggle = () => overlay.classList.toggle('active')
  menuButton.addEventListener('click', toggle)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active')
  })
}

function cycleStatus() {
  const statusText = document.getElementById('status-text')
  if (!statusText) return

  const statuses = ['Open', 'Locked', 'Temptation Pending']
  let index = 0

  statusText.textContent = statuses[index]
  setInterval(() => {
    index = (index + 1) % statuses.length
    statusText.textContent = statuses[index]
  }, 2800)
}

function rotateLines(selector, lines, interval = 3200) {
  const target = document.querySelector(selector)
  if (!target || !lines?.length) return
  let index = 0
  target.textContent = lines[index]
  setInterval(() => {
    index = (index + 1) % lines.length
    target.textContent = lines[index]
  }, interval)
}

function initMoodGenerator() {
  const btn = document.getElementById('mood-btn')
  const output = document.getElementById('mood-output')
  if (!btn || !output) return

  const moods = [
    'Velvet lighting. No interruptions.',
    'Minimal rules. Maximum spark.',
    'Playful chaos. You set the scene.',
    'Quiet. Slow. Wicked.',
    'Tonight is ours. Assume nothing.',
  ]

  btn.addEventListener('click', () => {
    const choice = moods[Math.floor(Math.random() * moods.length)]
    output.textContent = choice
    selectionUpdater?.(`Tonight's vibe: ${choice}`, 'HxD Vibe')
  })
}

function initCalendarIdeas() {
  const btn = document.getElementById('idea-btn')
  const output = document.getElementById('idea-output')
  if (!btn || !output) return

  const ideas = [
    'Drinks. Music. Trouble.',
    'No plans. Just vibes.',
    'You decide. I’ll handle the rest.',
    'Sushi, skyline views, then chaos.',
    'Late checkout on reality.',
  ]

  btn.addEventListener('click', () => {
    const idea = ideas[Math.floor(Math.random() * ideas.length)]
    output.textContent = idea
    selectionUpdater?.(`Schedule idea: ${idea}`, 'Schedule idea')
  })
}

function initGames() {
  const dareBtn = document.getElementById('dare-btn')
  const dareOutput = document.getElementById('dare-output')
  const coinBtn = document.getElementById('coin-btn')
  const coinOutput = document.getElementById('coin-output')
  const vibeButtons = document.querySelectorAll('[data-vibe]')
  const complimentBtn = document.getElementById('compliment-btn')
  const complimentOutput = document.getElementById('compliment-output')

  const dares = [
    'Pick the song. Own the room.',
    'One secret whispered in the dark.',
    'Dealer’s choice kiss.',
    'Text me a memory you shouldn’t forget.',
    'You choose the next indulgence.',
  ]

  const compliments = [
    'You’re the spark that ruins my plans—in the best way.',
    'You walk in and the room rearranges itself.',
    'Your confidence is a dare I keep taking.',
    'You taste like decisions I don’t regret.',
    'You make patience feel overrated.',
  ]

  dareBtn?.addEventListener('click', () => {
    dareOutput.textContent = dares[Math.floor(Math.random() * dares.length)]
    selectionUpdater?.(`Dare: ${dareOutput.textContent}`, 'Dare pick')
  })

  coinBtn?.addEventListener('click', () => {
    const result = Math.random() > 0.5 ? 'Haley calls it.' : 'Daren decides.'
    coinOutput.textContent = result
    selectionUpdater?.(`Coin flip result: ${result}`, 'Coin flip')
  })

  vibeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const vibe = btn.dataset.vibe
      coinOutput.textContent = `Tonight’s vibe: ${vibe}.`
      selectionUpdater?.(`Vibe locked: ${vibe}`, 'Vibe choice')
    })
  })

  complimentBtn?.addEventListener('click', () => {
    complimentOutput.textContent = compliments[Math.floor(Math.random() * compliments.length)]
    selectionUpdater?.(`Compliment to send: ${complimentOutput.textContent}`, 'Compliment')
  })
}

function initCalendarForm() {
  const form = document.getElementById('calendar-form')
  if (!form) return

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const summary = summarizeForm(form)
    selectionUpdater?.(summary, 'Calendar pick')
    sendEmail('Calendar pick — HxD', `${summary}\n\nSubmitted from HxD Playground.`)
  })
}

function initBackstageForm() {
  const form = document.getElementById('backstage-form')
  if (!form) return

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const summary = summarizeForm(form)
    selectionUpdater?.(summary, 'Backstage note')
    sendEmail('Backstage note — HxD', `${summary}\n\nSubmitted from HxD Playground.`)
  })
}

function initSpotifyStatus() {
  const frame = document.querySelector('iframe[data-testid="embed-iframe"]')
  const status = document.querySelector('[data-spotify-status]')
  if (!frame || !status) return

  const fallback = () => {
    if (status.textContent?.includes('live')) return
    status.textContent =
      'If the embed stalls, tap “Open in Spotify” and keep the soundtrack moving.'
  }

  frame.addEventListener('load', () => {
    status.textContent = 'Spotify is live. If you don’t hear it, open in the app and keep it loud.'
  })

  setTimeout(fallback, 3500)
}

function init() {
  selectionUpdater = initSelectionConsole()
  initMenu()
  cycleStatus()
  initMoodGenerator()
  initCalendarIdeas()
  initGames()
  initCalendarForm()
  initBackstageForm()
  initSpotifyStatus()
  rotateLines('#playlist-lines', [
    'You know what this playlist leads to.',
    'Press play. Don’t overthink it.',
    'This usually ends badly. In a good way.',
  ])
}

document.addEventListener('DOMContentLoaded', init)
