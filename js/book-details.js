// Book details view toggle and accordion

document.querySelectorAll('.accordion-trigger').forEach(function(btn){
  btn.addEventListener('click', function(){
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    var panel = this.nextElementSibling;
    if(panel){ panel.hidden = expanded; }
  });
});

const formatButtons = document.querySelector('.format-buttons');
const storeSelectWrapper = document.querySelector('.store-select');
const storeSelector = document.querySelector('.store-selector');
const buyButton = document.querySelector('.buy-btn');
const storeLogo = document.querySelector('.selected-store-logo');

const storeOptions = {
  audio: [
    {
      name: 'Google Play Books',
      url: 'https://play.google.com/store/audiobooks/details/Daren_Prince_Game_On_Master_The_Conversation_Win_H?id=AQAAAEBKO1R7DM',
      logo: '/assets/logos/google-play.png'
    }
  ],
  ebook: [
    {
      name: 'Apple Books',
      url: 'https://books.apple.com/us/book/game-on-master-the-conversation-win-her-heart/id6745466900',
      logo: '/assets/logos/apple-books.png'
    },
    {
      name: 'Google Play',
      url: 'https://play.google.com/store/books/details?id=BYFbEQAAQBAJ',
      logo: '/assets/logos/google-play.png'
    },
    {
      name: 'Amazon Kindle',
      url: 'https://www.amazon.com/Game-Master-Conversation-Heart-Relationships-ebook/dp/B0DQHLK4G2',
      logo: '/assets/logos/amazon.png'
    }
  ],
  print: [
    {
      name: 'Amazon',
      url: 'https://www.amazon.com/Game-Master-Conversation-Heart-Comprehensive/dp/B0DR5QN7LR',
      logo: '/assets/logos/amazon.png'
    },
    {
      name: 'Books-A-Million',
      url: 'https://www.booksamillion.com/p/Game-Master-Conversation-Win-Her/Daren-Prince/9798303844407',
      logo: '/assets/logos/books-a-million.png'
    },
    {
      name: 'ThriftBooks',
      url: 'https://www.thriftbooks.com/w/game-on-master-the-conversation--win-her-heart-the-comprehensive-mens-playbook-for-flirting-seduction-dating--amazing-relationships_daren-prince/54448380/',
      logo: '/assets/logos/thriftbooks.png'
    },
    {
      name: 'Better World Books',
      url: 'https://www.betterworldbooks.com/product/detail/game-on-master-the-conversation-win-her-heart-the-comprehensive-men-s-playbook-for-flirting-9798303844407'
    },
    {
      name: 'Waterstones',
      url: 'https://www.waterstones.com/book/game-on-master-the-conversation-and-win-her-heart/daren-prince/9798303844407',
      logo: '/assets/logos/waterstones.png'
    }
  ]
};

formatButtons?.querySelectorAll('.format-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const format = btn.dataset.format;
    formatButtons.classList.add('fade-out');
    setTimeout(() => {
      formatButtons.hidden = true;
      populateStores(format);
      storeSelectWrapper.hidden = false;
      requestAnimationFrame(() => storeSelectWrapper.classList.add('visible'));
    }, 300);
  });
});

function populateStores(format) {
  storeSelector.innerHTML = '<option value="">Select Store</option>';
  storeOptions[format]?.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.url;
    option.textContent = opt.name;
    if (opt.logo) option.dataset.logo = opt.logo;
    storeSelector.appendChild(option);
  });
}

storeSelector?.addEventListener('change', () => {
  const selected = storeSelector.selectedOptions[0];
  const logo = selected?.dataset.logo;
  if (logo) {
    storeLogo.innerHTML = `<img src="${logo}" alt="${selected.text} logo">`;
  } else {
    storeLogo.innerHTML = '';
  }
});

buyButton?.addEventListener('click', () => {
  const url = storeSelector?.value;
  if (url) {
    window.open(url, '_blank');
  }
});

