// JavaScript Document
// Modified from code created by Karen Schwentner at Penn State

// This script changes the default CDM footer to a custom UW one
(function () {
  'use strict';
function uwFooter(){
  const footerContainer = document.getElementsByClassName('Footer-footerWrapper');
  const uwFooterHTML = '<footer class="footer"><ul><li><a href="http://www.lib.washington.edu/about/contact">Contact Us</a></li><li><a href="https://content.lib.washington.edu/search-tips.html">How to Search</a></li><li><a href="https://online.gifts.washington.edu/secure/makeagift/givingopps.aspx?page=funds&amp;source_typ=3&amp;source=LIBDIG">Make a Gift</a></li><li><a href="http://www.washington.edu/online/privacy/">Privacy</a></li><li><a href="http://uw.edu/online/terms">Terms of Use</a></li></ul><p><a href="http://www.lib.washington.edu/">Â© University of Washington Libraries</a></p></footer>';
  footerContainer[0].innerHTML = uwFooterHTML;
}

document.addEventListener('cdm-home-page:ready', uwFooter);
document.addEventListener('cdm-about-page:ready', uwFooter);
document.addEventListener('cdm-login-page:ready', uwFooter);
document.addEventListener('cdm-search-page:ready', uwFooter);
document.addEventListener('cdm-collection-landing-page:ready', uwFooter);
document.addEventListener('cdm-collection-search-page:ready', uwFooter);
document.addEventListener('cdm-advanced-search-page:ready', uwFooter);
document.addEventListener('cdm-item-page:ready', uwFooter);
document.addEventListener('cdm-custom-page:ready', uwFooter);
})();// JavaScript Document