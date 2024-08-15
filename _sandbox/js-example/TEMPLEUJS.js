// JavaScript Document

function searchSubmit (form) {
	var term = form.searchInput.value;
	if(term.length > 1) {
		window.location="http://digital.library.temple.edu/digital/search/searchterm/"+term+"/order/nosort";
	}
	return false;
}
function ywcaSearchSubmit (form) {
	var term = form.csearchInput.value;
	if(term.length > 1) {
		window.location = "http://digital.library.temple.edu/digital/search/collection/p16002coll6!p15037coll19!p15037coll14!p16002coll2/searchterm/"+term+"%20AND%20YWCA%20Philadelphia%20Branches%20Records/order/nosort";
	}
	return false;
}
function stereoSearchSubmit (form) {
	var term = form.csearchInput.value;
	if(term.length > 1) {
		window.location="http://digital.library.temple.edu/digital/search/collection/p15037coll1!p16002coll7/searchterm/"+term+"%20AND%20Stereotypical%20Images%20Teaching%20Collection/order/nosort";
	}
	return false;
}
function ssSearchSubmit (form) {
	var term = form.csearchInput.value;
	if(term.length > 1) {
		window.location="http://digital.library.temple.edu/digital/search/collection/p16002coll16/searchterm/"+term+"/order/nosort";
	}
	return false;
}
function tdSearchSubmit (form) {
	var term = form.csearchInput.value;
	var type = form.searchtype.value;
	if(term.length > 1) {
		window.location="http://digital.library.temple.edu/digital/search/collection/p245801coll10/searchterm/"+term+"/field/"+type+"/mode/any/conn/and/order/creato/ad/asc/cosuppress/1";
	}
	return false;
}
function ohSearchSubmit (form) {
	var term = form.csearchInput.value;
	if(term.length > 1) {
		window.location="http://digital.library.temple.edu/digital/search/collection/p16002coll12/searchterm/"+term+"/order/nosort";
	}
	return false;
}

function handleEventClicks(id,category) {
  ga('send',  {
  	hitType: 'event',
    eventCategory: id,
    eventAction: 'click',
    eventLabel: category
  });
}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) { 
    var tracks = [
        {id: "featured-card", category: "homepage"},
        {id: "collection-card", category: "homepage"},
        {id: "explore-link", category: "homepage"},
        {id: "by-repository", category: "explore"},
        {id: "by-subject", category: "explore"},
        {id: "by-format", category: "explore"},
        {id: "exhibitions", category: "explore"}
    ];

    tracks.forEach(function(track) {
        if (el = document.getElementById(track.id)) {
            el.addEventListener("click", function(){
            handleEventClicks(track.id, track.category) })
            }
        }); 

}

(function() {
  'use strict';
  
    let currentInstance = null;
  
    function PanoptoAPI(url) {
      return new Promise(function(resolve) {
        console.log("in panopto function: "+ url);
        if (!url) {
          return resolve(false);
        }
        // create iframe for panopto
        // test_id: 0ce19f9e-24c4-4af4-81b4-ad8e0130a948

        let vars = url.split('=', 2);
        let long_id = vars[1];
        let format = vars[2];
        console.log("Panopto: " + long_id + " | " + format);
        let html = '<iframe src="https://temple.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=' + long_id + '&autoplay=false&offerviewer=false&showtitle=false&showbrand=false&captions=false&interactivity=none" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>';
        resolve(html);
      });
    }
    
    function EnsembleAPI(url) {
      return new Promise(function(resolve) {
        console.log("in ensemble function: "+ url);
        if (!url) {
          return resolve(false);
        }
        // create iframe for ensemble
        let vars = url.split('&', 3);
        let short_id = vars[0].substring(28, vars[0].length);
        let long_id = vars[1];
        let format = vars[2];
        console.log(short_id + " | " + long_id + " | " + format);
  
        if (format == "video") {
          let html = '<iframe id="ensembleEmbeddedContent_' + short_id + '" src="https://ensemble.temple.edu/hapi/v1/contents/' + long_id + '/plugin?embedAsThumbnail=false&displayTitle=false&startTime=0&autoPlay=false&hideControls=true&showCaptions=false&displaySharing=false&displayAnnotations=false&displayAttachments=false&displayLinks=false&displayEmbedCode=false&displayDownloadIcon=false&displayMetaData=false&displayCredits=false&displayCaptionSearch=false&audioPreviewImage=false&displayViewersReport=false&displayAxdxs=false" frameborder="0" scrolling="no"" class="embed-responsive-item" allowfullscreen ></iframe>';
          resolve(html);
        }
        else if (format == "audio") {        
          let html = '<style type="text/css"><!-- .embed-responsive-16by9 {position: relative;padding-bottom: 16.25%;text-align: center;} --></style><iframe class="audio" id="ensembleEmbeddedContent_' + short_id + '" src="https://ensemble.temple.edu/hapi/v1/contents/' + long_id + '/plugin?embedAsThumbnail=false&amp;displayTitle=false&amp;startTime=0&amp;autoPlay=false&amp;hideControls=true&amp;showCaptions=false&amp;displaySharing=false&amp;displayAnnotations=false&amp;displayAttachments=false&amp;displayLinks=false&amp;displayEmbedCode=false&amp;displayDownloadIcon=false&amp;displayMetaData=false&amp;displayCredits=false&amp;audioPreviewImage=false&amp;displayAxdxs=false" frameborder="0" style="width: 85%; height: 56px;" scrolling="no" allowfullscreen=""></iframe>';
          resolve(html);
        }
        else return resolve(false);
      });
    }
  
    const APIS = {
      'temple.hosted.panopto.com': PanoptoAPI,
      'ensemble.temple.edu': EnsembleAPI
    };
  
    function loadFrame(link) {
      return Promise.resolve(link).then(function(link) {
        let url = new URL(link);
        // find proper api from api list
        const loader = APIS[url.hostname];
        return loader && loader(link);
      }).catch(console.warn);
    }
  
    function CustomVideoView(container) {
      if (!container) {
        return false;
      }
      const anchor = container.querySelector('a');
      if (!anchor) {
        return false;
      }
  
      let links = [anchor.href];
      // parse metadata
      const rows = document.querySelectorAll('tr[class*=metadatarow]');
      Array.from(rows).forEach(function(row) {
        // find a description field
        if (row.firstChild.textContent === 'Description') {
          links = links.concat(row.lastChild.textContent.split(','));
        }
      });
  
      // create container for iFrames
      const frameContainer = document.createElement('div');
      frameContainer.classList.add('embed-responsive', 'embed-responsive-16by9');
  
      const mount = function() {
        const reqs = links.map(function(link) {
          return loadFrame(link);
        });
  
        Promise.all(reqs).then(function(reps) {
          // hide original viewer
          container.className += ' hide';
          document.querySelector('div.preview').style.display = 'block';
          // add each frames to one root
          reps.forEach(function(embeddedHTML) {
            embeddedHTML && (frameContainer.innerHTML += embeddedHTML);
          });
          // insert it
          container.parentNode.insertBefore(frameContainer, container);
        });
      };
  
      const unmount = function() {
        frameContainer.parentNode && frameContainer.parentNode.removeChild(frameContainer);
      };
  
      mount();
  
      return {unmount: unmount};
  
    }
  
    let globalScope = true;
    let collectionScope = [
      'p16002coll10'
    ];
  
    document.addEventListener('cdm-item-page:ready', function(e) {
      const collection = e.detail.collectionId;
      if (globalScope || collectionScope.includes(collection)) {
        // unmount or remove current video player from DOM if it is exists
        currentInstance && currentInstance.unmount();
        // creates a new instance if it is url item and it is from vimeo.com
        currentInstance = CustomVideoView(document.querySelector('div[class*=itemUrl]'));
      }
    });
  
    document.addEventListener('cdm-item-page:update', function(e) {
      const collection = e.detail.collectionId;
      if (globalScope || collectionScope.includes(collection)) {
        currentInstance && currentInstance.unmount();
        // updates an instance if it is url item and it is from vimeo.com
        currentInstance = CustomVideoView(document.querySelector('div[class*=itemUrl]'));
      }
    });
  
    document.addEventListener('cdm-item-page:leave', function(e) {
      const collection = e.detail.collectionId;
      if (globalScope || collectionScope.includes(collection)) {
        // unmount or remove current video player from DOM if it is exists
        currentInstance && currentInstance.unmount();
      }
    });
  
})();