import { browseSearchPage } from "./modules/browseSearchPage";
import { special_search } from "./modules/search-collection-header";
import { offensive_content_popup } from "./modules/gsu-offensive-content";
import { insert_iiif_links } from "./modules/field-insert-iiif";
import { pdf_object_multipage } from "./modules/pdf-objects-multipage-1_1";
import { panelExpand } from "./modules/panel-expand";
import { cover_images } from "./modules/coverimage";
import { link_reformat } from "./modules/link-reformatter";
import { search_placeholder } from "./modules/headerSearchInputPlaceholder";
import { pdf_button } from "./modules/button-pdf-inline-1_0";
import { collapse1 } from "./modules/collapse";
import { uv_cp } from "./modules/uv-cp";

// var removeJs = false


// For the home page.
document.addEventListener("cdm-home-page:ready", function() {
   special_search ();
   offensive_content_popup();
});

document.addEventListener("cdm-home-page:update", function() {
   special_search ();
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
});

// For the collection page.
document.addEventListener("cdm-collection-page:ready", function() {
   special_search();
   collapse1 ()
   offensive_content_popup();
});

document.addEventListener("cdm-collection-page:update", function() {
   special_search();
   collapse1 ()
});

// For the advanced search page.
document.addEventListener("cdm-advanced-search-page:ready", function() {
   offensive_content_popup();
});

document.addEventListener("cdm-advanced-search-page:update", function() {
});

// For collection landing pages.
document.addEventListener("cdm-collection-landing-page:ready", function() {
   special_search();
   offensive_content_popup();
   collapse1 ()
});

document.addEventListener("cdm-collection-landing-page:update", function() {
   special_search();
   collapse1 ()
});

// Custom CDM call for an item page ready state.
document.addEventListener('cdm-item-page:ready', function(){
   offensive_content_popup();
});

// For custom pages.
document.addEventListener("cdm-custom-page:ready", function() {
   special_search();
   offensive_content_popup();
   panelExpand();
   collapse1 ()
});

document.addEventListener("cdm-custom-page:update", function() {
   special_search();
   panelExpand();
   collapse1 ()
});

// For the about page.
document.addEventListener("cdm-about-page:ready", function() {
   offensive_content_popup();
});

pdf_button ();
browseSearchPage();
cover_images();
insert_iiif_links();
search_placeholder();
link_reformat();
uv_cp();
pdf_object_multipage ();