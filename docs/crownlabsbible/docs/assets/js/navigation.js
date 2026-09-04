;(function () {
  const root=document.documentElement,key='theme',app=document.getElementById('app')
  const applyTheme=theme=>{root.dataset.theme=theme;document.querySelectorAll('[data-dark-logo]').forEach(img=>img.src=theme==='light'?img.dataset.lightLogo:img.dataset.darkLogo)}
  applyTheme(localStorage.getItem(key)||'dark')

  document.getElementById('themeToggle')?.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem(key,next);applyTheme(next)})
  const navToggle=document.getElementById('navToggle'),toolbar=document.querySelector('.cl-toolbar'),toolbarToggle=document.getElementById('toolbarToggle'),mobileMenu=document.getElementById('mobileMenu'),scrim=document.getElementById('scrim')
  if(app&&localStorage.getItem('navCollapsed')==='true')app.classList.add('nav-collapsed')
  navToggle?.addEventListener('click',()=>{if(innerWidth<981)document.body.classList.toggle('nav-open');else if(app){app.classList.toggle('nav-collapsed');localStorage.setItem('navCollapsed',String(app.classList.contains('nav-collapsed')))}})
  mobileMenu?.addEventListener('click',()=>document.body.classList.add('nav-open'))
  scrim?.addEventListener('click',()=>document.body.classList.remove('nav-open'))
  if(toolbar&&toolbarToggle){toolbar.classList.toggle('toolbar-collapsed',localStorage.getItem('toolbarCollapsed')==='true');toolbarToggle.addEventListener('click',()=>{toolbar.classList.toggle('toolbar-collapsed');localStorage.setItem('toolbarCollapsed',String(toolbar.classList.contains('toolbar-collapsed')))})}

  document.querySelectorAll('.cl-quicklinks a').forEach(link=>{const target=(link.getAttribute('href')||'').split('#')[0],current=location.pathname.split('/').pop()||'index.html';link.classList.toggle('is-active',target===current)})

  const assets={
    crownPsychologyLogo:'../../../../assets/images/Crown-Psychology-Wordmark.png',
    crownPsychologyHero:'../../../../assets/images/369614C7-0374-4409-AD16-E5CCB5CDBDEE.png',
    crownPsychologyArchitecture:'../../../../assets/images/EA6882C5-BB64-412B-9F58-395D1208F112.png',
    crownPsychologyIcon:'../../../../assets/images/Untitled%20design.png',
    crownCodeLogo:'../../../../assets/images/NavLogo.PNG',
    crownCodeHero:'../../../../desktopui-Nobg.PNG',
    crownCodeIcon:'../../../../assets/images/Updated%20icon.PNG',
    sentinelLogo:'../../../../assets/images/28D4FFEB-D071-419E-A5C9-8CCE7D9F3734.png',
    sentinelHero:'../../../../assets/images/B93001C0-650C-4E55-AF4D-04A402D582FF.png',
    sentinelIcon:'../../../../assets/images/893D3E8C-43EC-4D55-B640-795BFCBFCCF8.png',
    voxLogo:'../../../../VoxVector/Assets/VoxVector-Full-logo-black-bg.png',
    voxIcon:'../../../../VoxVector/Assets/voxvector-icon-final-color.png.PNG',
    picLogo:'../../../../Picdetective/detlogo2.PNG',
    picIcon:'../../../../Picdetective/deticon.png',
    phoenixIcon:'../../../../assets/images/05320CFA-0D08-4630-B4D0-40FF84B542D3.png',
    vibeIcon:'../../../../assets/images/09B332D7-924A-4FE6-A9C0-3380DCD5C861.png',
    createIcon:'../../../../assets/images/create-vector-app-icon.png'
  }
  const path=()=>decodeURIComponent(new URLSearchParams(location.search).get('doc')||'').toLowerCase()
  const profile=p=>{
    const summary=/executive[_ -]?summary|overview/.test(p)
    if(p.includes('crown-psychology'))return{alt:'Crown Psychology',logo:assets.crownPsychologyLogo,icon:assets.crownPsychologyIcon,hero:p.includes('architecture')?assets.crownPsychologyArchitecture:(summary?assets.crownPsychologyHero:'')}
    if(p.includes('sentinel-vault'))return{alt:'Sentinel Vault',logo:assets.sentinelLogo,icon:assets.sentinelIcon,hero:summary?assets.sentinelHero:''}
    if(p.includes('crowncode-ai'))return{alt:'CrownCode.ai',logo:assets.crownCodeLogo,icon:assets.crownCodeIcon,hero:summary?assets.crownCodeHero:''}
    if(p.includes('voxvector'))return{alt:'VoxVector',logo:assets.voxLogo,icon:assets.voxIcon,hero:''}
    if(p.includes('picdetective'))return{alt:'PicDetective',logo:assets.picLogo,icon:assets.picIcon,hero:''}
    if(p.includes('operation-phoenix'))return{alt:'Operation Phoenix',icon:assets.phoenixIcon}
    if(p.includes('vibe-prism'))return{alt:'Vibe Prism',icon:assets.vibeIcon}
    if(p.includes('create-vector'))return{alt:'Create Vector',icon:assets.createIcon}
    return null
  }
  function brandDocument(){
    const content=document.querySelector('.cl-content'),p=path(),data=profile(p)
    if(!content||!data||content.dataset.brandPath===p)return
    content.querySelectorAll('[data-doc-brand]').forEach(el=>el.remove())
    const heading=content.querySelector('h1');if(!heading)return
    const insert=(src,cls,alt)=>{if(!src)return;const img=document.createElement('img');img.src=src;img.className=cls;img.alt=alt;img.dataset.docBrand='true';heading.before(img)}
    insert(data.logo,'cl-doc-brand-logo',data.alt+' logo')
    insert(data.hero,'cl-doc-brand-hero',data.alt+' hero')
    insert(data.icon,'cl-doc-brand-icon',data.alt+' app icon')
    content.dataset.brandPath=p
  }
  brandDocument()
  new MutationObserver(brandDocument).observe(document.querySelector('.cl-content')||document.body,{childList:true,subtree:true})
})()