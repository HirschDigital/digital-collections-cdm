document.addEventListener('cdm-collection-landing-page:ready', function(e) {
	console.log(e);
	var stamp = document.querySelector('.Header-logoHolder a');
	stamp.href = 'https://www.uark.edu/';
	var srch = document.querySelector('.Header-header .SimpleSearch-searchInputControl');
	srch.placeholder = 'Search all collections';
	var collectionID = e.detail.collectionId;
	document.querySelector('.CollectionLanding-pageTitle').innerHTML = '<span>' + document.querySelector('.CollectionLanding-pageTitle').innerHTML + '</span>';
	document.querySelector('.CollectionLanding-mainLandingImage').insertBefore( document.querySelector('.CollectionLanding-pageTitle'), document.querySelector('.CollectionLanding-mainLandingImage').firstChild);
	document.querySelector('.CollectionLanding-mainLandingImage').appendChild( document.querySelector('.CollectionLanding-landingBrowseButton').cloneNode(true) );
	document.querySelector('.Header-logoNameContainer').appendChild( document.querySelector('.SimpleSearch-searchBox') );

	if ( document.getElementById("samples") ) {
		var itemIDs = document.querySelector('#samples').className.split(' ');
		for (let i = itemIDs.length - 1; i > 0; i--) { //shuffle array
        const j = Math.floor(Math.random() * (i + 1));
        [itemIDs[i], itemIDs[j]] = [itemIDs[j], itemIDs[i]];
    	}
    	itemIDs = itemIDs.slice(0, 5); // limit to 5 items
			itemIDs.forEach(function(id) {
				getItemTitle(collectionID,id).then(function(item) {
  			var imageTitle = JSON.parse(item.response).imageinfo.title[0];
  			document.querySelector('#samples').insertAdjacentHTML( 'beforeend', '<li><a href="/digital/collection/' + collectionID + '/id/' + id + '/rec/1"><img src="//digitalcollections.uark.edu/utils/getthumbnail/collection/' + collectionID + '/id/' + id + '" alt =""></a><p><a href="/digital/collection/' + collectionID + '/id/' + id + '/rec/1">' + imageTitle + '</a></p></li>' );
  		});
		});
	}
	var headlineLength = document.querySelector('.CollectionLanding-pageTitle').innerHTML.length;
	if (headlineLength > 90) {
		document.querySelector('.CollectionLanding-pageTitle').style.fontSize = "2em";
	} else if (headlineLength > 60) {
		document.querySelector('.CollectionLanding-pageTitle').style.fontSize = "3em";
	} else {
		document.querySelector('.CollectionLanding-pageTitle').style.fontSize = "3.5em";
	}

});



document.addEventListener('cdm-item-page:ready', function(e) {
    if (e.detail.collectionId == 'OzarkFolkSong') {
		ozarkfolksongs('ready');
    }
});
document.addEventListener('cdm-item-page:update', function(e) {
    if (e.detail.collectionId == 'OzarkFolkSong') {
		ozarkfolksongs('update');
    }
});
function details(id) {
	return new Promise(function (resolve, reject) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState !== 4) return;
			if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
				resolve(xmlhttp);
			} else {
				reject({
					status: xmlhttp.status,
					statusText: xmlhttp.statusText
				});
			}
		};
		xmlhttp.open("GET", "//digitalcollections.uark.edu/digital/api/collections/" + id);
		xmlhttp.send();
	});
};
function ozarkfolksongs(event) {
	if(event == 'ready') {
		var identifier = document.querySelector('.ItemMetadata-metadatarow.field-identi .field-value').innerText;
    	var header = document.querySelector('.ItemView-itemTitle');
    	var player = document.createElement('div');
    	player.setAttribute('id', 'player');
    	player.innerHTML = '<audio controls><source src="//libraries.uark.edu/digitalcollections/OzarkFolkSong/Audio/' + identifier + '.mp3" type="audio/mpeg"></audio><p><a href="//libraries.uark.edu/digitalcollections/OzarkFolkSong/Audio/' + identifier + '.mp3">right click to download the audio</a></p>';
    	header.insertBefore(player, null);
    } else if (event == 'update') {
    	var player = document.querySelector('#player');
    	var identifier = document.querySelector('.ItemMetadata-metadatarow.field-identi .field-value').innerText;
    	player.innerHTML = '<audio controls><source src="//libraries.uark.edu/digitalcollections/OzarkFolkSong/Audio/' + identifier + '.mp3" type="audio/mpeg"></audio><p><a href="//libraries.uark.edu/digitalcollections/OzarkFolkSong/Audio/' + identifier + '.mp3">right click to download the audio</a></p>';
    }
}
function getItemTitle(coll,id) {
	return new Promise(function (resolve, reject) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState !== 4) return;
			if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
				resolve(xmlhttp);
			} else {
				reject({
					status: xmlhttp.status,
					statusText: xmlhttp.statusText
				});
			}
		};
		xmlhttp.open('GET', '//digitalcollections.uark.edu/utils/ajaxhelper/?CISOROOT=' + coll + '&CISOPTR=' + id);
		xmlhttp.send();
	});
};


function loadScript(src) {
return new Promise(function (resolve, reject) {
var script = document.createElement('script');
script.crossOrigin = 'anonymous';
script.src = src;
script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

var ts = Math.floor(Date.now() / 1000);

//loadScript('https://www.googletagmanager.com/gtag/js?id=UA-3687364-2');
//loadScript('https://libraries.uark.edu/js/digitalcollections-gtag.js');

//loadScript('//libraries.uark.edu/js/cdm/ia-book-reader-embed-1.1.js?v=' + ts);



(function() {
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'libraries.uark.edu/js/digitalcollections-gtag.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();

(function() {
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.googletagmanager.com/gtag/js?id=UA-3687364-2';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();


