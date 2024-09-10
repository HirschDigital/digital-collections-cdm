document.addEventListener('cdm-custom-page:ready', function() {
    const buttons = document.querySelectorAll('.panel-default button');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // Toggle current button state
        const targetId = this.getAttribute('data-target');
        const targetPanel = document.querySelector(targetId);
        
        if (this.classList.contains('collapsed')) {
          // Expand this button's panel
          this.classList.remove('collapsed');
          this.classList.add('expanded');
          targetPanel.classList.add('show');
          this.setAttribute('aria-expanded', 'true');
        } else {
          // Collapse this button's panel
          this.classList.remove('expanded');
          this.classList.add('collapsed');
          targetPanel.classList.remove('show');
          this.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });




  