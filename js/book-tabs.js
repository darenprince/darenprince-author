/**
 * Book Tabs JS
 * Handles tab switching, active state toggles, and accessibility
 */

document.querySelectorAll('[role="tab"]').forEach(function(tab){
  tab.addEventListener('click', function(){
    var tablist = this.parentElement;
    var container = tablist.parentElement;
    tablist.querySelectorAll('[role="tab"]').forEach(function(t){
      t.setAttribute('aria-selected', 'false');
    });
    this.setAttribute('aria-selected', 'true');
    container.querySelectorAll('[role="tabpanel"]').forEach(function(p){
      p.hidden = true;
    });
    var target = container.querySelector('#' + this.getAttribute('aria-controls'));
    if(target) target.hidden = false;
  });
});

// Preview toggle inside book tabs
var previewWrapper = document.querySelector('.preview-toggle');
if(previewWrapper){
  var buttons = previewWrapper.querySelectorAll('button');
  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      buttons.forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
    });
  });
}
