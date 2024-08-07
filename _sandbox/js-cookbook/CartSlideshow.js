// JavaScript Document

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

document.addEventListener('cdm-collection-landing-page:ready', plusSlides);
  document.addEventListener('cdm-collection-page:ready', plusSlides);
    document.addEventListener('cdm-custom-page:ready', plusSlides);
    document.addEventListener('cdm-custom-page:update', plusSlides);

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

 document.addEventListener('cdm-collection-landing-page:ready', currentSlide);
  document.addEventListener('cdm-collection-page:ready', currentSlide);
    document.addEventListener('cdm-custom-page:ready', currentSlide);
    document.addEventListener('cdm-custom-page:update', currentSlide);

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

  document.addEventListener('cdm-collection-landing-page:ready', showSlides);
  document.addEventListener('cdm-collection-page:ready', showSlides);
    document.addEventListener('cdm-custom-page:ready', showSlides);
    document.addEventListener('cdm-custom-page:update', showSlides);

