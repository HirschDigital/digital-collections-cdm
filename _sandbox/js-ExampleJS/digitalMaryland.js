// Digital Maryland custom Javascript
var digitalMarylandItem = {
	ready: function() {
		var path = window.location.pathname;
		if ( path.indexOf('/id/') > -1) { // change to '/id/'
			var field, cntrl, pview, exist, fetch, found;
			var media = document.createElement('div'); media.setAttribute('id','digitalMarylandMediaPlayer');
			var layer = document.querySelector('div.ItemPreview-container');
			var mdata = document.querySelector('table.item-description');
			if ( layer && mdata ) {
				pview = layer.querySelector('div.preview');
				found = digitalMarylandItem.sense(mdata, layer);
				if ( found['field'] ) {
					digitalMarylandItem.check(found['field'], found['media']);
					pview.setAttribute('style', 'display:none;');
					found['field'].setAttribute('style', 'display:none;');
					exist = layer.querySelector('div#digitalMarylandMediaPlayer')
					if ( exist ) {
						exist.innerHTML = found['cntrl'];
					} else {
						media.innerHTML = found['cntrl'];
						layer.appendChild(media);
					}
				} else {
					pview.removeAttribute('style');
					media = layer.querySelector('#digitalMarylandMediaPlayer');
					if (media) { media.parentNode.removeChild(media); }
				}
			}
		}
		digitalMarylandItem.crumb();
	},
	sense : function(mdata, layer) {
		var label, found = new Array();
		var table = mdata.querySelectorAll('tr.ItemMetadata-metadatarow');
		table.forEach(function(row) {
			label = row.querySelector('td.field-label');
			if (label) {
				if (label.innerText == 'Embed Video') { found['field'] = row; found['cntrl'] = digitalMarylandItem.video(row, layer); found['media'] = 'video'; }
				if (label.innerText == 'Embed Audio') { found['field'] = row; found['cntrl'] = digitalMarylandItem.audio(row, layer); found['media'] = 'audio'; }
			}
		});
		return found;
	},
	check : function(field, media) {
		var xhttp = new XMLHttpRequest();
		xhttp.field = field;
		xhttp.media = media;
		xhttp.open('GET', 'https://script.google.com/macros/s/AKfycbw9VgV231e0bQpaWloeGiIuaHrRGiX3VvaNlouQ-qYE8bU3eQC8c4FT8UJcR26g5xeO/exec?id=1JJnlSoq_s2gg8HqqvUyLtKX4lSRnBvk55WeLSqAphew&sh=Collections', true);
		xhttp.send();
		xhttp.addEventListener('load', digitalMarylandItem.fetch);
	},
	fetch : function(e) {
		var xhttp = e.currentTarget;
		var field = xhttp.field;
		var media = xhttp.media;
		var mdata = digitalMarylandItem.mdata(field, media);
		var split = (media == 'audio') ? 3 : 0;
		var batch = mdata.split('/')[split + 0];
		var value = mdata.split('/')[split + 1];
		var allow = false;
		JSON.parse(xhttp.responseText).forEach( function(row) { if (row.collection == batch) { allow = true; }});

		if (allow) {
			var addr = 'https://' + media + '.digitalmaryland.org/down/load/' + batch + '/' + value;
			var html = '<button title="Download" aria-label="Download" role="button" aria-haspopup="true" aria-expanded="true" type="button" class="digitalMarylandDownloadButton cdm-btn dropdown-toggle btn btn-primary"><span aria-hidden="true" class="fa fa-download fa-2x"></span> <span class="caret"></span></button><ul role="menu" class="digitalMarylandDownloadOptions dropdown-menu" aria-labelledby="download-dropdown-5">';
			if (media == 'audio') {
				html += '<li role="presentation"><a href="' + addr + '" role="menuitem" tabindex="-1">MP3 audio</a></li>';
			}
			if (media == 'video') {
				html += '<li role="presentation"><a href="' + addr + '.mp4"  role="menuitem" tabindex="-1">MP4 video</a></li>';
				html += '<li role="presentation"><a href="' + addr + '.webm" role="menuitem" tabindex="-1">WEBM video</a></li>';
			}
			html += '</ul>';

			var style = document.createElement('style');
			style.innerHTML = '<style>.digitalMarylandDownload{float:right;}.digitalMarylandDownloadButton{padding:0.25rem 0.5rem !important;}.digitalMarylandDownloadOptions{margin-right:15px; padding: 0;}.digitalMarylandDownloadOptions a {padding:1ex;}.ItemView-mainColumn .digitalMarylandDownloadOptions{top:6.8rem!important;}.ItemView-sideColumn .digitalMarylandDownloadOptions{top:2.5rem!important;}</style>';
			document.querySelector('body').append(style);
			document.documentElement.addEventListener('click', function () { digitalMarylandItem.dload();}, false);

			// put the download button in two places
			var cntrl, panel, buttn;

			cntrl = document.createElement('div'); cntrl.setAttribute('class','digitalMarylandDownload'); cntrl.innerHTML = html;
			panel = document.querySelector('div.ItemView-sideColumn div.btn-toolbar'); panel.append(cntrl);
			buttn = panel.querySelector('button.digitalMarylandDownloadButton');
			buttn.addEventListener('click', digitalMarylandItem.dload, false);

			cntrl = document.createElement('div'); cntrl.setAttribute('class','digitalMarylandDownload'); cntrl.innerHTML = html;
			panel = document.querySelector('div.ItemView-mainColumn div.ItemView-options div.btn-toolbar'); panel.append(cntrl);
			buttn = panel.querySelector('button.digitalMarylandDownloadButton');
			buttn.addEventListener('click', digitalMarylandItem.dload, false);
		}
	},
	dload : function(e) {
		var state = 'none';
		if (e) { e.stopPropagation(); state = 'block'; }
		var option = document.querySelectorAll('ul.digitalMarylandDownloadOptions');
		option.forEach(function(drop) { drop.style.display = state; });
	},
	mdata : function(field, media) {
		var select = ( media == 'video' ) ? 'td.field-value span' : 'td.field-value a';
	 	return  field.querySelector(select).innerHTML.replace('http://', 'https://');
	},
	audio : function(field, layer) {
		var img = layer.querySelector('div.itemThumbnail img').getAttribute("src");
		var src = digitalMarylandItem.mdata(field, 'audio');
		var htm = '<div id="digitalMarylandAudioPlayer">';
		htm += '<img alt="item icon" src="' + img + '" style="float:left; margin: 1em 2em 0;"/>';
		htm += '<div style="float: left;"><audio controls="controls" preload="true" style="margin: 1em 0 0;">';
		htm += '<source type="audio/mpeg" src="' + src + '"/></audio></div>';
		htm += '<div id="downloadThisAudio"><a href="' + src + '" class="action_link_10">Download this audio.</a></div>';
		htm += '</div>';
		return htm;
	},
	video : function(field, layer) {
		var url = 'https://video.digitalmaryland.org/';
		var src = digitalMarylandItem.mdata(field, 'video');
		var htm = '<video controls="controls">';
		htm += '<source type="video/mp4"  src="' + url + src + '.mp4">';
		htm += '<source type="video/webm" src="' + url + src + '.webm">';
		htm += '</video>';
		return htm;
	},
	crumb: function() {
		var home = document.querySelector('div.Breadcrumbs-breadcrumb:first-child>a');
		if (home) { home.innerHTML = 'Collections'; }
	}
}
var digitalMarylandHome = {
	ready: function() {
		var page = document.querySelector('div.CoreLayout-mainwrapper');
		var area = document.querySelector('div.ContentHeader-maincontainer');
		var head = document.createElement('h1');  head.innerHTML = 'Collections';  head.setAttribute('class', 'digitalMarylandCollectionsHeadLine');
		var html = document.createElement('div'); html.innerHTML = area.innerHTML; html.setAttribute('class', 'digitalMarylandCollections shared-box');
		area.parentNode.appendChild(head);
		page.appendChild(html);
	},
	leave: function() {
		var html = document.querySelector('div.digitalMarylandCollections');
		html.parentNode.removeChild(html);
	}
}
var digitalMarylandMend = {
	ready: function() {
		digitalMarylandMend.brand();
	},
	brand: function() {
		var href = '//www.digitalmaryland.org/';
		var logo = document.querySelector('div#headerNameDiv>a');
		logo.setAttribute('href', href);
		logo.addEventListener('click', function(e) { this.href = href; e.stopPropagation(); });
	}
}

document.addEventListener('cdm-item-page:ready',            digitalMarylandItem.ready);
document.addEventListener('cdm-item-page:update',           digitalMarylandItem.ready);
document.addEventListener('cdm-home-page:ready',            digitalMarylandHome.ready);
document.addEventListener('cdm-home-page:leave',            digitalMarylandHome.leave);
document.addEventListener('cdm-home-page:ready',            digitalMarylandMend.ready);
document.addEventListener('cdm-about-page:ready',           digitalMarylandMend.ready);
document.addEventListener('cdm-login-page:ready',           digitalMarylandMend.ready);
document.addEventListener('cdm-search-page:ready',          digitalMarylandMend.ready);
document.addEventListener('cdm-collection-page:ready',      digitalMarylandMend.ready);
document.addEventListener('cdm-advanced-search-page:ready', digitalMarylandMend.ready);
document.addEventListener('cdm-item-page:ready',            digitalMarylandMend.ready);
document.addEventListener('cdm-custom-page:ready',          digitalMarylandMend.ready);// JavaScript Document