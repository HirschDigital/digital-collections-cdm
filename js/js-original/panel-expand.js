
  document.addEventListener('cdm-custom-page:ready', function() {
    // Get all buttons with the toggle functionality
    const buttons = document.querySelectorAll('[data-target]');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the target panel-collapse element
            const targetId = this.getAttribute('data-target');
            const panelCollapse = document.querySelector(targetId);

            

            // Toggle the 'collapse' class on the panel-collapse element
            panelCollapse.classList.toggle('collapse');

            // Determine if the panel is collapsed or expanded
            const isCollapsed = panelCollapse.classList.contains('collapse');

            // Update appearance of the associated panel-panel
            const panelPanel = this.closest('.Panel-panel');
            if (isCollapsed) {
                panelPanel.classList.add('collapsed-panel');
                panelPanel.classList.remove('expanded-panel');
            } else {
                panelPanel.classList.add('expanded-panel');
                panelPanel.classList.remove('collapsed-panel');

            }
        });
    });

    // Initialize panel appearances based on their default state
    document.querySelectorAll('.panel-collapse').forEach(panelCollapse => {
        const isCollapsed = panelCollapse.classList.contains('collapse');
        const panelPanel = panelCollapse.closest('.Panel-panel');
        if (isCollapsed) {
            panelPanel.classList.add('collapsed-panel');
            panelPanel.classList.remove('expanded-panel');
        } else {
            panelPanel.classList.add('expanded-panel');
            panelPanel.classList.remove('collapsed-panel');
        }
    });
});
  