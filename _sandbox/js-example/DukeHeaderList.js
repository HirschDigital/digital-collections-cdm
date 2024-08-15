/* CONTENTdm Custom Script Global */

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
          $('div.Header-logoNameContainer').hide();

          /* This fires when React.js is done adding elements to the DOM */
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

});
