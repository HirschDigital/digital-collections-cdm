import { browseSearchPage } from "./modules/browseSearchPage";
import { newsearch } from "./modules/search-collection-header";
import { offensive_content_popup } from "./modules/gsu-offensive-content";
import { insert_iiif_links } from "./modules/field-insert-iiif";
import { pdf_object_multipage } from "./modules/pdf-objects-multipage-1_1";
import { panelExpand } from "./modules/panel-expand";

// var removeJs = false


// For the home page.
document.addEventListener("cdm-home-page:ready", function() {
   newsearch ();
   offensive_content_popup();
});

document.addEventListener("cdm-home-page:update", function() {
   newsearch ();
});

// For the browse/search page.
document.addEventListener("cdm-search-page:ready", function() {
   offensive_content_popup();
   
});

document.addEventListener("cdm-search-page:update", function() {
;
});

// For the collection search page.
document.addEventListener("cdm-collection-search-page:ready", function() {
   offensive_content_popup();
});

document.addEventListener("cdm-collection-search-page:update", function() {
   all_pages_tweaks();
});

// For the collection page.
document.addEventListener("cdm-collection-page:ready", function() {
   newsearch();
   offensive_content_popup();
});

document.addEventListener("cdm-collection-page:update", function() {
   newsearch();
   offensive_content_popup();
});

// For the advanced search page.
document.addEventListener("cdm-advanced-search-page:ready", function() {
   all_pages_tweaks();
   offensive_content_popup();
});

document.addEventListener("cdm-advanced-search-page:update", function() {
   all_pages_tweaks();
   offensive_content_popup();
});

// For collection landing pages.
document.addEventListener("cdm-collection-landing-page:ready", function() {
   newsearch();
   offensive_content_popup();
});

document.addEventListener("cdm-collection-landing-page:update", function() {
   newsearch();
   offensive_content_popup();
});

// Custom CDM call for an item page ready state.
document.addEventListener('cdm-item-page:ready', function(){
   offensive_content_popup();
});

document.addEventListener('cdm-item-page:update', function(){
});

document.addEventListener('cdm-item-page:leave', function() {
 });

// For custom pages.
document.addEventListener("cdm-custom-page:ready", function() {
   newsearch();
   offensive_content_popup();
   panelExpand();
});

document.addEventListener("cdm-custom-page:update", function() {
   newsearch();
   panelExpand();
});

// For the about page.
document.addEventListener("cdm-about-page:ready", function() {
   offensive_content_popup();
});

document.addEventListener("cdm-about-page:update", function() {
});



/**
 * Insert IIIF Links
 */
insert_iiif_links();

pdf_object_multipage();

browseSearchPage();
