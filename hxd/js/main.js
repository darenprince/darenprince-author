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
  })

  coinBtn?.addEventListener('click', () => {
    const result = Math.random() > 0.5 ? 'Haley calls it.' : 'Daren decides.'
    coinOutput.textContent = result
  })

  vibeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const vibe = btn.dataset.vibe
      coinOutput.textContent = `Tonight’s vibe: ${vibe}.`
    })
  })

  complimentBtn?.addEventListener('click', () => {
    complimentOutput.textContent = compliments[Math.floor(Math.random() * compliments.length)]
  })
}

function init() {
  initMenu()
  cycleStatus()
  initMoodGenerator()
  initCalendarIdeas()
  initGames()
  rotateLines('#playlist-lines', [
    'You know what this playlist leads to.',
    'Press play. Don’t overthink it.',
    'This usually ends badly. In a good way.',
  ])
}

document.addEventListener('DOMContentLoaded', init)
