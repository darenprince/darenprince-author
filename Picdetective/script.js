const defaultUser = {username: 'admin', password: 'Im@g355uck'};

function login(){
  const user = localStorage.getItem('pdUser') ? JSON.parse(localStorage.getItem('pdUser')) : defaultUser;
  const u = document.getElementById('loginUser').value;
  const p = document.getElementById('loginPass').value;
  if(u === user.username && p === user.password){
    document.getElementById('loginOverlay').style.display = 'none';
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
