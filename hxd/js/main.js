const EMAIL_TO = 'author@darenprince.com'
const EMAIL_ENDPOINT = window.HXD_EMAIL_ENDPOINT || ''
const EMAIL_TOKEN = window.HXD_EMAIL_TOKEN || ''
let selectionUpdater
let selectionStatus

async function sendEmail(subject, body) {
  if (!EMAIL_ENDPOINT) {
    throw new Error('Email endpoint is not configured. Set window.HXD_EMAIL_ENDPOINT.')
  }

  const headers = { 'Content-Type': 'application/json' }
  if (EMAIL_TOKEN) {
    headers.Authorization = `Bearer ${EMAIL_TOKEN}`
  }

  const payload = { to: EMAIL_TO, subject, text: body }
  const response = await fetch(EMAIL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to send email')
  }

  return response.json()
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
  const status = document.getElementById('selection-status')

  if (!output || !submitBtn) return null

  let latest = ''
  let subject = 'HxD Selection'
  let sending = false

  const setStatus = (text, tone = 'muted') => {
    if (!status) return
    status.textContent = text
    status.dataset.tone = tone
  }

  const update = (text, nextSubject = 'HxD Selection') => {
    latest = text
    subject = nextSubject
    output.textContent = text || 'Waiting for your move.'
    submitBtn.disabled = !text
    if (text) {
      setStatus('Ready to deliver. Add a note or hit submit.', 'info')
    } else {
      setStatus(
        EMAIL_ENDPOINT
          ? 'Queue cleared. Pick something to send.'
          : 'Email routing not set yet. Add HXD_EMAIL_ENDPOINT.',
        'muted'
      )
    }
  }

  submitBtn.addEventListener('click', async () => {
    if (!latest) return
    if (sending) return
    sending = true
    const previousLabel = submitBtn.textContent
    submitBtn.textContent = 'Sending…'
    submitBtn.disabled = true
    const note = noteInput?.value?.trim()
    const body = `${latest}${note ? `\n\nNotes: ${note}` : ''}\n\nSubmitted from HxD Playground.`
    setStatus('Sending to Daren…', 'pending')

    try {
      await sendEmail(subject, body)
      setStatus('Delivered to Daren and archived in the vault.', 'success')
    } catch (error) {
      console.error(error)
      setStatus('Could not send right now. Try again or message directly.', 'error')
    } finally {
      sending = false
      submitBtn.textContent = previousLabel
      submitBtn.disabled = !latest
    }
  })

  clearBtn?.addEventListener('click', () => {
    update('')
    if (noteInput) noteInput.value = ''
  })

  update('')

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

  return { update, setStatus }
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
  const scenarioBtn = document.getElementById('scenario-btn')
  const scenarioOutput = document.getElementById('scenario-output')
  const scenarioChips = document.querySelectorAll('[data-scenario]')
  const heatSlider = document.getElementById('heat-range')
  const heatOutput = document.getElementById('heat-output')
  const heatLock = document.getElementById('heat-lock')

  const dares = [
    'Pick the song. Own the room.',
    'One secret whispered in the dark.',
    'Dealer’s choice kiss.',
    'Text me a memory you shouldn’t forget.',
    'You choose the next indulgence.',
    'Trade phones for 20 minutes. Trust the energy.',
    'No phones, just eye contact for the next track.',
    'Pick a stranger’s favorite drink and we find it.',
    'You call the Uber—destination is a surprise.',
    'You set the safe word. Then we ignore it (mostly).',
  ]

  const compliments = [
    'You’re the spark that ruins my plans—in the best way.',
    'You walk in and the room rearranges itself.',
    'Your confidence is a dare I keep taking.',
    'You taste like decisions I don’t regret.',
    'You make patience feel overrated.',
    'You laugh like you know the secret ending.',
    'You’re the plot twist I never fix.',
    'You don’t enter rooms—you change atmospheres.',
    'Your curiosity keeps burning holes in my rules.',
    'You’re a VIP pass disguised as a person.',
  ]

  const scenarios = {
    overtime: ['late-night rooftop', 'after-hours lounge', 'empty studio'],
    pace: ['slow burn', 'no-rules sprint', 'stepped rhythm—push/pull'],
    twist: ['phones off', 'no yes/no answers allowed', 'every song change = new dare'],
  }

  const describeHeat = (level) => {
    switch (Number(level)) {
      case 1:
        return 'Warm-up stretch. Eye contact and teasing only.'
      case 2:
        return 'Low flame. Soft hands, slower soundtrack.'
      case 3:
        return 'Midnight tempo. Mix of soft and sharp.'
      case 4:
        return 'Sparks up. High energy, your rules get blurry.'
      case 5:
      default:
        return 'White-hot. No safe words. Only signals.'
    }
  }

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

  scenarioBtn?.addEventListener('click', () => {
    const pick = (list) => list[Math.floor(Math.random() * list.length)]
    const setup = `${pick(scenarios.overtime)}, ${pick(scenarios.pace)}, ${pick(scenarios.twist)}.`
    scenarioOutput.textContent = setup
    selectionUpdater?.(`Scenario pull: ${setup}`, 'Scenario dealer')
  })

  scenarioChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const card = chip.dataset.scenario
      scenarioOutput.textContent = card
      selectionUpdater?.(`Scenario pick: ${card}`, 'Scenario dealer')
    })
  })

  const updateHeat = (value) => {
    const label = describeHeat(value)
    if (heatOutput) {
      heatOutput.textContent = label
    }
    selectionUpdater?.(`Heat meter at ${value}: ${label}`, 'Heat meter')
  }

  heatSlider?.addEventListener('input', (event) => {
    updateHeat(event.target.value)
  })

  heatLock?.addEventListener('click', () => {
    const level = heatSlider?.value || 3
    const label = describeHeat(level)
    heatOutput.textContent = `Locked at ${level} — ${label}`
    selectionUpdater?.(`Heat meter locked at ${level}: ${label}`, 'Heat meter')
  })
}

function initCalendarForm() {
  const form = document.getElementById('calendar-form')
  if (!form) return

  const submitButton = form.querySelector('button[type="submit"]')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const summary = summarizeForm(form)
    selectionUpdater?.(summary, 'Calendar pick')
    if (submitButton) {
      submitButton.disabled = true
      submitButton.dataset.label = submitButton.textContent
      submitButton.textContent = 'Sending…'
    }
    selectionStatus?.('Sending schedule to Daren…', 'pending')
    try {
      await sendEmail('Calendar pick — HxD', `${summary}\n\nSubmitted from HxD Playground.`)
      selectionStatus?.('Schedule delivered to Daren.', 'success')
      form.reset()
    } catch (error) {
      console.error(error)
      selectionStatus?.('Schedule could not be sent. Try again.', 'error')
    } finally {
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = submitButton.dataset.label || 'Submit this schedule'
      }
    }
  })
}

function initBackstageForm() {
  const form = document.getElementById('backstage-form')
  if (!form) return

  const submitButton = form.querySelector('button[type="submit"]')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const summary = summarizeForm(form)
    selectionUpdater?.(summary, 'Backstage note')
    if (submitButton) {
      submitButton.disabled = true
      submitButton.dataset.label = submitButton.textContent
      submitButton.textContent = 'Sending…'
    }
    selectionStatus?.('Sending backstage note…', 'pending')
    try {
      await sendEmail('Backstage note — HxD', `${summary}\n\nSubmitted from HxD Playground.`)
      selectionStatus?.('Backstage note delivered.', 'success')
      form.reset()
    } catch (error) {
      console.error(error)
      selectionStatus?.('Backstage note failed. Try again.', 'error')
    } finally {
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = submitButton.dataset.label || 'Seal it'
      }
    }
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
  const selectionConsole = initSelectionConsole()
  selectionUpdater = selectionConsole?.update
  selectionStatus = selectionConsole?.setStatus
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
