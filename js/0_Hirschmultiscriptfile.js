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
	'field-insert-iiif.js',
	'uv-cp.js',
	'button-pdf-inline-1_0.js',
	'pdf-objects-multipage-1_1.js',
	'GA4.js',
	'headerSearchInputPlaceholder.js',
  'collapse.js',
  'panel-expand.js',
];

(function() {
  const allScripts = scriptFilesToLoad.map(filePath);
  allScripts.forEach(loadScript);

})();

/*version history
1.1 - 2019 Aug 14 - remove extraneous JS; add example script names
1.0 - 2018 April - initial implementation
*/

/* CONTENTdm Custom Script Global */
/******
function include(filename, onload) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = filename;
  script.type = 'text/javascript';
  script.onload = script.onreadystatechange = function() {
      if (script.readyState) {
          if (script.readyState === 'complete' || script.readyState === 'loaded') {
              script.onreadystatechange = null;
              onload();
          }
      }
      else {
          onload();
      }
  };
  head.appendChild(script);
}

include('//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', function() {
  $(document).ready(function() {
    include('//cdm17480.contentdm.oclc.org/customizations/global/pages/js/DukeHeaderList_script.js', function() {
        window.dispatchEvent(new Event('load'));
        $('div.Header-logoNameContainer').hide();***/

        /* This fires when React.js is done adding elements to the DOM */
        /******
        $("#root").bind("DOMNodeInserted",function(){

            if($('.ocr-warning').length === 0) {
              $("<div class='ocr-warning'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> This text is computer-generated and will not be 100% accurate.</div>").insertBefore($('.ItemText-container'));
            }

            if($('.harmful-language-statement').length === 0) {
              $("<p class='harmful-language-statement' style='margin-top: 10px;'><i class='fa fa-info-circle'></i> Some materials and descriptions may include offensive content. <a href='https://library.duke.edu/about/statement-potentially-harmful-language-library-descriptions' aria-label='Statement on Potentially Harmful Language in Library Descriptions'>More info</a></p><hr />").insertBefore($('.ItemView-itemMetadata').first());
            }

        });
    });
  });

});****/