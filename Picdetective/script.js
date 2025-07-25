const defaultUser = {username: 'admin', password: 'Im@g355uck'};
let loggedIn = false;

window.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('#loadingScreen .bar');
  const loadingScreen = document.getElementById('loadingScreen');
  let w = 0;
  const loadDuration = 3500;
  const iv = setInterval(() => {
    if (w < 100) {
      bar.style.width = (++w) + '%';
    } else {
      clearInterval(iv);
    }
  }, loadDuration / 100);
  setTimeout(() => {
    clearInterval(iv);
    bar.style.width = '100%';
    loadingScreen.classList.add('hide');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      if (localStorage.getItem('pdLoggedIn') === 'true') {
        document.querySelector('.sidebar').classList.add('open');
      } else {
        const login = document.getElementById('loginOverlay');
        login.style.display = 'flex';
        requestAnimationFrame(()=> login.classList.add('show'));
      }
      buildSectionMenu();
    }, 500);
  }, loadDuration);
});

function login(){
  const user = localStorage.getItem('pdUser') ? JSON.parse(localStorage.getItem('pdUser')) : defaultUser;
  const u = document.getElementById('loginUser').value;
  const p = document.getElementById('loginPass').value;
  if(u === user.username && p === user.password){
    const loginBox = document.getElementById('loginOverlay');
    loginBox.classList.remove('show');
    setTimeout(()=>loginBox.style.display='none',500);
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
  const reg = document.getElementById('registerOverlay');
  reg.style.display='flex';
  requestAnimationFrame(()=>reg.classList.add('show'));
});

document.getElementById('closeRegister').addEventListener('click', e=>{
  e.preventDefault();
  const reg = document.getElementById('registerOverlay');
  reg.classList.remove('show');
  setTimeout(()=>reg.style.display='none',500);
});

const forgotLink = document.getElementById('forgotLink');
if(forgotLink){
  forgotLink.addEventListener('click',e=>{
    e.preventDefault();
    document.getElementById('loginOverlay').style.display='none';
    const f = document.getElementById('forgotOverlay');
    f.style.display='flex';
    requestAnimationFrame(()=>f.classList.add('show'));
  });
}

const backLogin = document.getElementById('backLogin');
if(backLogin){
  backLogin.addEventListener('click',e=>{
    e.preventDefault();
    const f = document.getElementById('forgotOverlay');
    f.classList.remove('show');
    setTimeout(()=>{
      f.style.display='none';
      const l=document.getElementById('loginOverlay');
      l.style.display='flex';
      requestAnimationFrame(()=>l.classList.add('show'));
    },500);
  });
}

const sendReset = document.getElementById('sendReset');
if(sendReset){
  sendReset.addEventListener('click',()=>{
    const email=document.getElementById('resetEmail').value.trim();
    const user=localStorage.getItem('pdUser')?JSON.parse(localStorage.getItem('pdUser')):defaultUser;
    if(email===user.username){
      alert('Password reset link sent to '+email);
      window.location.href='reset.html';
    }else{
      alert('Email not found');
    }
  });
}
const passInput = document.getElementById("regPass");
if(passInput){
  passInput.addEventListener("input", ()=>{
    const ok = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(passInput.value);
    document.getElementById("passStatus").classList.toggle("valid", ok);
  });
}


function registerUser(){
  const first = document.getElementById('regFirst').value.trim();
  const last = document.getElementById('regLast').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  const agree = document.getElementById('agree').checked;
  const passOk = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(pass);
  if(first && last && email && passOk && pass === pass2 && agree){
    localStorage.setItem('pdUser', JSON.stringify({username:email,password:pass,first,last}));
    alert('Registration successful');
    document.getElementById('registerOverlay').style.display='none';
    document.getElementById('loginUser').value = email;
    document.getElementById('loginPass').value = pass;
  }else{
    alert('Please complete the form correctly');
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
  const login = document.getElementById('loginOverlay');
  login.style.display='flex';
  requestAnimationFrame(()=>login.classList.add('show'));
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
