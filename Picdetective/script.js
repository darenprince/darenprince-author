const defaultUser = {username: 'admin', password: 'Im@g355uck'};
let loggedIn = false;

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('loginOverlay').style.display = 'flex';
  }, 2000);

  buildSectionMenu();
});

function login(){
  const user = localStorage.getItem('pdUser') ? JSON.parse(localStorage.getItem('pdUser')) : defaultUser;
  const u = document.getElementById('loginUser').value;
  const p = document.getElementById('loginPass').value;
  if(u === user.username && p === user.password){
    document.getElementById('loginOverlay').style.display = 'none';
    document.querySelector('.sidebar').classList.add('open');
    document.querySelector('.logo').innerHTML = '<img src="deticon.png" alt="logo">';
    buildSectionMenu();
    loggedIn = true;
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
document.getElementById('logoutBtn').addEventListener('click', e=>{
  e.preventDefault();
  loggedIn = false;
  document.getElementById('loginOverlay').style.display='flex';
  document.querySelector('.sidebar').classList.remove('open');
});

// font slider
const slider = document.getElementById('fontSlider');
if(slider){
  slider.addEventListener('input', ()=>{
    document.querySelector('.content').style.fontSize = slider.value + 'px';
  });
}

function buildSectionMenu(){
  const menu = document.getElementById('sectionMenu');
  if(!menu) return;
  menu.innerHTML = '';
  document.querySelectorAll('#reportContent > section').forEach(sec=>{
    const h2 = sec.querySelector('h2');
    if(h2 && sec.id){
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${sec.id}">${h2.textContent}</a>`;
      menu.appendChild(li);
    }
  });
}
