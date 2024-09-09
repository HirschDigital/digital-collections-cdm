(function() {
    'use strict';
    function panelCollapse(){
  ('.collapse.in').prev('.panel-heading').addClass('active');
  ('#accordion, #bs-collapse')
    .on('show.bs.collapse', function(a) {
      (a.target).prev('.panel-heading').addClass('active');
    })
    .on('hide.bs.collapse', function(a) {
      (a.target).prev('.panel-heading').removeClass('active');
    })};
    document.addEventListener('cdm-collection-page:ready', panelCollapse);
document.addEventListener('cdm-collection-landing-page:ready', panelCollapse);
document.addEventListener('cdm-collection-page:update', panelCollapse);
document.addEventListener('cdm-collection-landing-page:update', panelCollapse);
document.addEventListener('cdm-custom-page:ready', panelCollapse);
document.addEventListener('cdm-custom-page:update', panelCollapse);
})();