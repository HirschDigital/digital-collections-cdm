(function () {
    'use strict';

    function scrollbar() {
        const scrollElements = document.querySelectorAll(".scroll"); // Select all elements with the class "scroll"

        scrollElements.forEach((scroll) => {
            let isDown = false;
            let scrollX;
            let scrollLeft;

            // Mouse Up Function
            scroll.addEventListener("mouseup", () => {
                isDown = false;
                scroll.classList.remove("active");
            });

            // Mouse Leave Function
            scroll.addEventListener("mouseleave", () => {
                isDown = false;
                scroll.classList.remove("active");
            });

            // Mouse Down Function
            scroll.addEventListener("mousedown", (e) => {
                e.preventDefault();
                isDown = true;
                scroll.classList.add("active");
                scrollX = e.pageX - scroll.offsetLeft;
                scrollLeft = scroll.scrollLeft;
            });

            // Mouse Move Function
            scroll.addEventListener("mousemove", (e) => {
                if (!isDown) return;
                e.preventDefault();
                const element = e.pageX - scroll.offsetLeft;
                const scrolling = (element - scrollX) * 2;
                scroll.scrollLeft = scrollLeft - scrolling;
            });
        });
    }

    document.addEventListener('cdm-custom-page:ready', scrollbar);
    document.addEventListener('cdm-custom-page:update', scrollbar);

})();
