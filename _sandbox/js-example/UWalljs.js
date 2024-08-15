// JavaScript Document
'use strict';

// helper function to load js file and insert into DOM
// @param {string} src link to a js file
// @returns Promise

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script');
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
    'uwCustom.js',
    'field-insert-iiif-1-0.js',
    'iFrameview.js',
    'button-pdf-print-1.0.js',
    'mirador3-cp.js',
    'libalerts.js'
  ];

(function() {
  const allScripts = scriptFilesToLoad.map(filePath);
  allScripts.forEach(loadScript);

})();

/* version history
1.2 - 2021 November 9 - Upgraded to mirador 3 
1.1 - 2019 Aug 14 - remove extraneous JS; add example script names
1.0 - 2018 April - initial implementation to add alert banner append libalerts.js when needed

*/// JavaScript Document