(function () {
    'use strict';

    function mfahcarousel() {
        const carouselItems = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.carousel-indicators li');
        let currentIndex = 0;
        const totalItems = carouselItems.length;
        const intervalTime = 6000; // time in milliseconds

        // Function to show the current item
        function showItem(index) {
            // Hide all items and remove active class
            carouselItems.forEach((item, i) => {
                item.classList.remove('active');
                // Allow for the transition
                setTimeout(() => 600); // Match the duration of the fade
            });

            // Show the current item
            carouselItems[index].classList.add('active');// Make it visible
            setTimeout(() => 10); // A slight delay to allow the display to update

            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');
        }

        // Function to go to the next item
        function nextItem() {
            currentIndex = (currentIndex + 1) % totalItems;
            showItem(currentIndex);
        }

        // Function to go to the previous item
        function prevItem() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            showItem(currentIndex);
        }

        // Set interval for automatic sliding
        let carouselInterval = setInterval(nextItem, intervalTime);

        // Add event listeners for controls
        document.querySelector('.carousel-control-prev').addEventListener('click', function () {
            clearInterval(carouselInterval);
            prevItem();
            carouselInterval = setInterval(nextItem, intervalTime);
        });

        document.querySelector('.carousel-control-next').addEventListener('click', function () {
            clearInterval(carouselInterval);
            nextItem();
            carouselInterval = setInterval(nextItem, intervalTime);
        });

        // Add event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function () {
                clearInterval(carouselInterval);
                currentIndex = index;
                showItem(currentIndex);
                carouselInterval = setInterval(nextItem, intervalTime);
            });
        });
        showItem(currentIndex);
    }
    document.addEventListener('cdm-custom-page:update', mfahcarousel);
    document.addEventListener('cdm-custom-page:ready', mfahcarousel);
    document.addEventListener('cdm-collection-landing-page:update', mfahcarousel);
    document.addEventListener('cdm-collection-landing-page:ready', mfahcarousel);
})();