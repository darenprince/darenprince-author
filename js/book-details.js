// Book details view toggle and accordion

document.querySelectorAll('.accordion-trigger').forEach(function(btn){
  btn.addEventListener('click', function(){
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    var panel = this.nextElementSibling;
    if(panel){ panel.hidden = expanded; }
  });
});

const formatButtons = document.querySelectorAll('.format-btn');
const stepOneEls = document.querySelectorAll('.step-one');
const storeStep = document.querySelector('.store-step');
const storeSelector = document.querySelector('.store-selector');
const buyButton = document.querySelector('.buy-now');
const logoContainer = document.querySelector('.selected-store-logo');
const formatDisplay = document.getElementById('selected-format');
const changeFormat = document.getElementById('change-format');
const storeNameSpan = document.querySelector('.store-name');

const storeData = {
  audio: [
    {
      name: 'Google Play Books',
      url: 'https://play.google.com/store/audiobooks/details/Daren_Prince_Game_On_Master_The_Conversation_Win_H?id=AQAAAEBKO1R7DM',
      logo: 'googleplay.png'
    }
  ],
  ebook: [
    {
      name: 'Apple Books',
      url: 'https://books.apple.com/us/book/game-on-master-the-conversation-win-her-heart/id6745466900',
      logo: 'ibooks.png'
    },
    {
      name: 'Google Play',
      url: 'https://play.google.com/store/books/details?id=BYFbEQAAQBAJ',
      logo: 'googleplay.png'
    },
    {
      name: 'Amazon Kindle',
      url: 'https://www.amazon.com/Game-Master-Conversation-Heart-Relationships-ebook/dp/B0DQHLK4G2',
      logo: 'amazon.png'
    }
  ],
  print: [
    { name: 'Amazon (Paperback)', url: 'https://www.amazon.com/Game-Master-Conversation-Heart-Comprehensive/dp/B0DR5QN7LR', logo: 'amazon.png' },
    { name: 'Amazon (Hardcover)', url: 'https://www.amazon.com/GAME-Master-Conversation-Heart-Comprehensive/dp/B0FCXB2W2F', logo: 'amazon.png' },
    { name: 'Books-A-Million', url: 'https://www.booksamillion.com/p/Game-Master-Conversation-Win-Her/Daren-Prince/9798303844407', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Books-A-Million_logo.svg/1200px-Books-A-Million_logo.svg.png' },
    { name: 'ThriftBooks', url: 'https://www.thriftbooks.com/w/game-on-master-the-conversation–win-her-heart-the-comprehensive-mens-playbook-for-flirting-seduction-dating–amazing-relationships_daren-prince/54448380/', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/ThriftBooks_logo.png' },
    { name: 'Better World Books', url: 'https://www.betterworldbooks.com/product/detail/game-on-master-the-conversation-win-her-heart-the-comprehensive-men-s-playbook-for-flirting-9798303844407' },
    { name: 'eBay – GrandEagleRetail', url: 'https://www.ebay.com/itm/365413682361', logo: 'ebay.svg' },
    { name: 'Walmart', url: 'https://www.walmart.com/ip/Game-On-Master-the-Conversation-Win-Her-Heart-Paperback-9798303844407', logo: 'walmart.svg' },
    { name: 'Target', url: 'https://www.target.com/p/game-on-master-the-conversation-win-her-heart-by-daren-prince-paperback', logo: 'target.svg' },
    { name: 'Alibris', url: 'https://www.alibris.com/Game-On-Master-the-Conversation-Win-Her-Heart-Daren-Prince/book/51827678' },
    { name: 'AbeBooks', url: 'https://www.abebooks.com/servlet/SearchResults?isbn=9798303844407' },
    { name: 'Bookshop.org', url: 'https://bookshop.org/p/books/game-on-master-the-conversation-win-her-heart-daren-prince/20222624', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Bookshop_Logo.svg' },
    { name: 'IndieBound', url: 'https://www.indiebound.org/book/9798303844407' },
    { name: 'Biblio.com', url: 'https://www.biblio.com/book/game-master-conversation-win-heart-comprehensive/daren-prince/9789798303844407' },
    { name: 'Powell’s Books', url: 'https://www.powells.com/' },
    { name: 'The Strand Bookstore', url: 'https://www.strandbooks.com/' },
    { name: 'Tattered Cover', url: 'https://www.tatteredcover.com/' },
    { name: 'Politics & Prose', url: 'https://www.politics-prose.com/' },
    { name: 'Half Price Books', url: 'https://www.hpb.com/' },
    { name: 'Waterstones', url: 'https://www.waterstones.com/book/game-on-master-the-conversation-and-win-her-heart/daren-prince//9798303844407', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Waterstones_logo.svg' },
    { name: 'Bol.com', url: 'https://www.bol.com/nl/nl/p/game-on-master-the-conversation-win-her-heart/9300000221436297/' },
    { name: 'laFeltrinelli / IBS', url: 'https://www.lafeltrinelli.it/game-on-master-conversation-win-libro-inglese-daren-prince/e/9798303844407' },
    { name: 'Atlantic Books', url: 'https://atlanticbooks.com/products/game-on-master-the-conversation-win-her-heart-the-comprehensive-mens-playbook-for-flirting-seduction-dating-amazing-relationships-9798303844407' },
    { name: 'Coupang', url: 'https://m.coupang.com/vm/products/8526437248?itemId=24687293989&vendorItemId=91697196292' },
    { name: 'Coupang TW', url: 'https://www.tw.coupang.com/products/%28%E5%A4%96%E6%96%87%E6%9B%B8%29-Game-On%21-Master-The-Conversation-%26-Win-Her-Heart%3A-The-Comprehensive-Men%27s-Playbo%E2%80%A6%2C-Paperback-21008526437248' },
    { name: 'Amazon.sg', url: 'https://www.amazon.sg/GAME-Master-Conversation-Heart-Comprehensive/dp/B0FCXB2W2F', logo: 'amazon.png' },
    { name: 'Mighty Ape', url: 'https://www.mightyape.co.nz/mn/buy/mighty-ape-game-on-master-the-conversation-win-her-heart-39686081/' }
  ]
};

function populateSelect(format) {
  storeSelector.innerHTML = '';
  const options = storeData[format] || [];
  options.forEach(store => {
    const opt = document.createElement('option');
    opt.value = store.url;
    opt.textContent = store.name;
    if (store.logo) opt.dataset.logo = store.logo;
    storeSelector.appendChild(opt);
  });
  const defaultIndex = options.findIndex(store => store.default);
  storeSelector.selectedIndex = defaultIndex >= 0 ? defaultIndex : 0;
  updateStoreDisplay();
  buyButton?.removeAttribute('disabled');
}

function updateStoreDisplay() {
  const selected = storeSelector.options[storeSelector.selectedIndex];
  const logo = selected?.dataset.logo;
  storeNameSpan.textContent = selected ? selected.textContent : '';
  logoContainer.innerHTML = '';
  if (logo) {
    const img = document.createElement('img');
    img.src = logo.startsWith('http') ? logo : `assets/logos/${logo}`;
    img.alt = `${selected.textContent} logo`;
    img.loading = 'lazy';
    img.style.borderRadius = '8px';
    logoContainer.appendChild(img);
  }
}

formatButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('rotate-360')?.click();
    stepOneEls.forEach(el => {
      el.classList.add('hide');
      setTimeout(() => el.setAttribute('hidden', ''), 300);
    });
    storeStep?.removeAttribute('hidden');
    storeStep?.classList.add('visible');
    formatDisplay.textContent = btn.textContent.trim();
    populateSelect(btn.dataset.format || '');
  });
});

changeFormat?.addEventListener('click', e => {
  e.preventDefault();
  stepOneEls.forEach(el => {
    el.classList.remove('hide');
    el.removeAttribute('hidden');
  });
  storeStep?.classList.remove('visible');
  storeStep?.setAttribute('hidden', '');
  logoContainer.innerHTML = '';
  buyButton?.setAttribute('disabled', 'true');
});

storeSelector?.addEventListener('change', () => {
  updateStoreDisplay();
});

buyButton?.addEventListener('click', () => {
  const url = storeSelector?.value;
  if (url) {
    document.getElementById('rotate-360')?.click();
    window.open(url, '_blank');
  }
});

document.querySelectorAll('.store-logo-link').forEach(link => {
  const img = link.querySelector('img');
  img?.addEventListener('error', () => {
    link.style.display = 'none';
  });

  link.addEventListener('click', e => {
    e.preventDefault();
    const format = link.dataset.format;
    const store = link.dataset.store;
    document.getElementById('book-viewer')?.scrollIntoView({ behavior: 'smooth' });
    const formatBtn = document.querySelector(`.format-btn[data-format="${format}"]`);
    formatBtn?.click();
    setTimeout(() => {
      const options = Array.from(storeSelector.options);
      const idx = options.findIndex(opt => opt.textContent === store);
      if (idx >= 0) {
        storeSelector.selectedIndex = idx;
        updateStoreDisplay();
      }
    }, 300);
  });
});

