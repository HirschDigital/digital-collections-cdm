(function () {
    'use strict';

    function dropdown() {
        document.getElementById("dropdown").classList.toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-toggle')) {
            var dropdowns = document.getElementsById("dropdown");
            if (dropdowns.classList.contains('show')) {
                dropdowns.classList.remove('show');
            }
        }
    }

    document.addEventListener('cdm-collection-landing-page:ready', dropdown);
})();
