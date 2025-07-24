const defaultUser = {username: 'admin', password: 'Im@g355uck'};
let loggedIn = false;

window.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('#loadingScreen .bar');
  let w = 0;
  const iv = setInterval(()=>{ bar.style.width = (++w) + '%'; },20);
  setTimeout(() => {
    clearInterval(iv);
    document.getElementById('loadingScreen').style.display = 'none';
    if(localStorage.getItem('pdLoggedIn') === 'true'){
      document.querySelector('.sidebar').classList.add('open');
    }else{
      document.getElementById('loginOverlay').style.display = 'flex';
    }
    buildSectionMenu();
  }, 2000);
});

function login(){
  const user = localStorage.getItem('pdUser') ? JSON.parse(localStorage.getItem('pdUser')) : defaultUser;
  const u = document.getElementById('loginUser').value;
  const p = document.getElementById('loginPass').value;
  if(u === user.username && p === user.password){
    document.getElementById('loginOverlay').style.display = 'none';
    document.querySelector('.sidebar').classList.add('open');
    buildSectionMenu();
    loggedIn = true;
    localStorage.setItem('pdLoggedIn','true');
  }else{
    document.getElementById('loginError').style.display = 'block';
  }
}

document.getElementById('showRegister').addEventListener('click', e=>{
  e.preventDefault();
  document.getElementById('registerOverlay').style.display='flex';
});

document.getElementById('closeRegister').addEventListener('click', e=>{
  e.preventDefault();
  document.getElementById('registerOverlay').style.display='none';
});

function registerUser(){
  const u = document.getElementById('regUser').value;
  const p = document.getElementById('regPass').value;
  if(u && p){
    localStorage.setItem('pdUser', JSON.stringify({username:u,password:p}));
    alert('Registration successful');
    document.getElementById('registerOverlay').style.display='none';
    document.getElementById('loginUser').value = u;
    document.getElementById('loginPass').value = p;
  }
}

function filterContent(){
  const query = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('#reportContent section, #fullInventory li').forEach(el=>{
    if(el.innerText.toLowerCase().includes(query)){
      el.style.display='';
    }else{
      el.style.display='none';
    }
  });
}

document.getElementById('toggleBtn').addEventListener('click', ()=>{
  document.querySelector('.sidebar').classList.toggle('open');
});
const sidebarClose = document.getElementById('sidebarClose');
if(sidebarClose){
  sidebarClose.addEventListener('click', ()=>{
    document.querySelector('.sidebar').classList.remove('open');
  });
}

document.querySelectorAll('.menu-item > a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const item = link.parentElement;
    item.classList.toggle('open');
  });
});

// search toggle
document.getElementById('searchToggle').addEventListener('click', ()=>{
  document.getElementById('topbar').classList.toggle('search-open');
  if(document.getElementById('topbar').classList.contains('search-open')){
    document.getElementById('searchInput').focus();
  }
});

// password visibility
document.querySelectorAll('.toggle-pass').forEach(t=>{
  t.addEventListener('click', ()=>{
    const target = document.getElementById(t.dataset.target);
    if(target.type === 'password'){
      target.type = 'text';
      t.innerHTML = '<i class="fa fa-eye-slash"></i>';
    }else{
      target.type = 'password';
      t.innerHTML = '<i class="fa fa-eye"></i>';
    }
  });
});

// logout
function doLogout(){
  loggedIn = false;
  localStorage.removeItem('pdLoggedIn');
  document.getElementById('loginOverlay').style.display='flex';
  document.querySelector('.sidebar').classList.remove('open');
}
document.getElementById('logoutBtn').addEventListener('click', e=>{
  e.preventDefault();
  doLogout();
});
document.getElementById('logoutIcon').addEventListener('click', doLogout);

// font slider
const slider = document.getElementById('fontSlider');
if(slider){
  slider.addEventListener('input', ()=>{
    document.querySelector('.content').style.fontSize = slider.value + 'px';
  });
}

const copyBtn = document.getElementById('copyBtn');
if(copyBtn){
  const tip = document.createElement('span');
  tip.className = 'tooltip';
  tip.textContent = 'Text copied to clipboard';
  copyBtn.appendChild(tip);
  copyBtn.addEventListener('click', ()=>{
    const text = document.getElementById('reportContent').innerText;
    navigator.clipboard.writeText(text);
    tip.style.display = 'block';
    setTimeout(()=> tip.style.display = 'none', 2000);
  });
}

document.getElementById('printBtn').addEventListener('click', ()=>window.print());
document.getElementById('settingsBtn').addEventListener('click', ()=>{});

function buildSectionMenu(){
  const menu = document.getElementById('sectionMenu');
  if(!menu) return;
  menu.innerHTML = '';
  document.querySelectorAll('#reportContent > section').forEach(sec=>{
    const h2 = sec.querySelector('h2');
    if(h2 && sec.id && !h2.textContent.includes('Checkpoint Summary')){
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${sec.id}">${h2.textContent}</a>`;
      menu.appendChild(li);
    }
  });
}
