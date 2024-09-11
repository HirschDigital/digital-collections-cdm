document.addEventListener('cdm-custom-page:ready', function () {
  // Add 'active' class to the panel-heading of currently shown collapse elements
  document.querySelectorAll('.collapse.in').forEach(function (collapse) {
    var panelHeading = collapse.previousElementSibling;
    if (panelHeading && panelHeading.classList.contains('panel-heading')) {
      panelHeading.classList.add('active');
    }
  });

  // Get the accordion and bs-collapse elements
  var bsCollapse = document.getElementById('bs-collapse');

  // Function to handle showing collapse
  function handleShowCollapse(event) {
    var target = event.target;
    var panelHeading = target.previousElementSibling;
    if (panelHeading && panelHeading.classList.contains('panel-heading')) {
      panelHeading.classList.add('active');
    }
  }

  // Function to handle hiding collapse
  function handleHideCollapse(event) {
    var target = event.target;
    var panelHeading = target.previousElementSibling;
    if (panelHeading && panelHeading.classList.contains('panel-heading')) {
      panelHeading.classList.remove('active');
    }
  }

  // Attach event listeners for 'show.bs.collapse' and 'hide.bs.collapse' events

  if (bsCollapse) {
    bsCollapse.addEventListener('show.bs.collapse', handleShowCollapse);
    bsCollapse.addEventListener('hide.bs.collapse', handleHideCollapse);
  }
});