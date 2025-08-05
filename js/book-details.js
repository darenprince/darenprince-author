// Book details view toggle and accordion

document.querySelectorAll('.accordion-trigger').forEach(function(btn){
  btn.addEventListener('click', function(){
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    var panel = this.nextElementSibling;
    if(panel){ panel.hidden = expanded; }
  });
});

