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
const fileDirectory = '/customizations/global/pages/JS/';

// array containing file names of each JS file
const scriptFilesToLoad =
  ['topTenSubjectsKDL.js',
   'myTest.js',
   'topTenSubjectsKenton.js',
   'subjects test.js',
   'institutions-test.js',
   'institutions-test-2.js',
   'landingPage_subjects.js',
   'landingPage_institutions.js',
   'test-collectionsList.js',
   'test-collectionsList2.js',
   'ead-embed-2021-03-29.js',
   'reactEvent.js'
   ];

(function() {
  const allScripts = scriptFilesToLoad.map(filePath);
  allScripts.forEach(loadScript);
})();



// JavaScript Document