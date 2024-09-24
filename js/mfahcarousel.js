(function (){
    'use strict';

    const carousel = document.getElementById('HeroImages');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.carousel-indicators li');
    const prevButton = carousel.querySelector('.carousel-control-prev');
    const nextButton = carousel.querySelector('.carousel-control-next');
    
    let currentIndex = 0;
    const totalItems = items.length;
    const intervalTime = 5000; // Change slide every 5 seconds
    let interval;
function mfahcarousel (){
    // Function to show a specific slide
    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
            indicators[i].classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    // Function to go to the next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % totalItems;
        showSlide(nextIndex);
    }

    // Function to go to the previous slide
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(prevIndex);
    }

    // Start the carousel auto slide
    function startCarousel() {
        interval = setInterval(nextSlide, intervalTime);
    }

    // Stop the carousel auto slide
    function stopCarousel() {
        clearInterval(interval);
    }

    // Event listeners for next and previous buttons
    nextButton.addEventListener('click', () => {
        stopCarousel();
        nextSlide();
        startCarousel();
    });

    prevButton.addEventListener('click', () => {
        stopCarousel();
        prevSlide();
        startCarousel();
    });

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopCarousel();
            showSlide(index);
            startCarousel();
        });
    });

    // Initialize carousel
    startCarousel();
};
document.addEventListener ('cdm-custom-page:update', mfahcarousel);
document.addEventListener ('cdm-custom-page:ready', mfahcarousel);
})();
