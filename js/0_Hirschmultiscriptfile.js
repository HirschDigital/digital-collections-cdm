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
  'button-pdf-inline-1_0.js',
  'collapse.js',
  'coverimage.js',
  'field-insert-iiif.js',
  'headerSearchInputPlaceholder.js',
  'link-reformatter.js',
  'offensive-content.js',
  'panel-expand.js',
  'pdf-objects-multipage-1_1.js',
	'uv-cp.js',
  'sway.js',
  'slider.js',
];

(function() {
  const allScripts = scriptFilesToLoad.map(filePath);
  allScripts.forEach(loadScript);

})();

/*version history
1.1 - 2019 Aug 14 - remove extraneous JS; add example script names
1.0 - 2018 April - initial implementation
*/
