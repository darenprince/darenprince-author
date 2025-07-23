// Book details view toggle and accordion

document.querySelectorAll('.accordion-trigger').forEach(function(btn){
  btn.addEventListener('click', function(){
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    var panel = this.nextElementSibling;
    if(panel){ panel.hidden = expanded; }
  });
});

var viewButtons = document.querySelectorAll('.view-toggle button');
var book3d = document.querySelector('.book-3d');

if(book3d){
  viewButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      viewButtons.forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      var view = this.dataset.view;
      book3d.classList.remove('view-front','view-back');
      if(view === 'front') book3d.classList.add('view-front');
      if(view === 'back') book3d.classList.add('view-back');
    });
  });
}

