// JavaScript Document
'use strict';

// helper function to load js file and insert into DOM
// @param {string} src link to a js file
// @returns Promise

function loadScript(src) {
  return new Promise(function(resolve, reject) {const script = document.createElement('script');
/*    script.crossOrigin = 'anonymous'; */
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// helper function to assemble full URL of each JS file
function filePath(file) {
  return fileDirectory + file;
}

// path corresponding to directory where JS scripts are uploaded
const fileDirectory = '/customizations/global/pages/js/';

// array containing file names of each JS file
const scriptFilesToLoad = [
  'browseSearchPage.js',
  'blur-effect.js',
  'blur-effect-click.js',
  'button-pdf-inline-1_0.js',
  'debug-events-all-1_5.js',
  'footer-badges.js',
  'headerSearchInputPlaceholder.js',
  'itemTable-row-Move-maintest.js',
  'link-reformatter-more.js',
  'link-reformatter-thumb+artist.js',
  'objectwarning.js',
  'panel-expand.js',
  'pdf-objects-multipage-1_1.js',
  'physogs.js',
  'scrollbar.js',
	'uv-cp.js',
];

(function() {
  const allScripts = scriptFilesToLoad.map(filePath);
  allScripts.forEach(loadScript);

  /*document.addEventListener('cdm-custom-page:ready', function(e) {
    if (e.detail.filename === 'field-insert-iiif') {
        loadScript('/customizations/global/js/field-insert-iiif.js');
        }   
    else if (e.detail.filename === 'citation') {
        loadScript('/customizations/global/js/citationGenerator.js');
        }       
    });*/

})();

/*version history
1.1 - 2019 Aug 14 - remove extraneous JS; add example script names
1.0 - 2018 April - initial implementation
*/
