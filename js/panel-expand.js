document.addEventListener('cdm-custom-page:ready', function() {
    const buttons = document.querySelectorAll('.panel-title button');
    
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

  document.addEventListener('cdm-custom-page:ready', function() {
    const icon = document.getElementById('icon');
    
    // Function to toggle the icon class
    function toggleIconClass() {
      if (icon.classList.contains('fa-far')) {
        icon.classList.remove('fa-far');
        icon.classList.add('fa-fas');
      } else {
        icon.classList.remove('fa-fas');
        icon.classList.add('fa-far');
      }
    }

    // Example usage: Toggle the icon class on button click
    document.getElementById('toggleIconButton').addEventListener('click', toggleIconClass);
  });



  