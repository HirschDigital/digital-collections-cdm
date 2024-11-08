(function () {
	'use strict';
	function executeScript(collectionName,recordNumber) {
		var cdmStr = "/digital/bl/dmwebservices/index.php?q=dmQuery/p16614coll32/identi^" + collectionName + "^all^and/citati!identi/citati/1/1/0/0/0/0/json";
		const request = new XMLHttpRequest();
		request.open('GET', cdmStr);
		request.responseType = 'json';
		request.send();			
		request.onload = function() {
			var obj = request.response;
			generateDiv(obj, recordNumber); 			
		}
	}

	function generateDiv(obj, recordNumber) {
			
		var apiRecord = obj['records'];
		var citation = apiRecord[0]['citati'];
		var collectionID = apiRecord[0]['identi'];	

		if (citation) {										
			var recordData = citation.split("|");
			var creatorLabel = recordData[0];
			var titleLabel = recordData[1];
			var dateLabel = recordData[2];
			var typeLabel = recordData[3];
			var collectionLabel = recordData[4];
			var institutionLabel = recordData[5];
			var descriptionLabel = recordData[6];		
						
			var mainRecordStr = "/digital/bl/dmwebservices/index.php?q=dmGetItemInfo/" + collectionID + "/" + recordNumber + "/json";		

			const objectDescriptionTable = document.querySelector('div#compoundObjectDescription>div>table>tbody');
			const itemDescriptionTable = document.querySelector('div#compoundItemDescription>div>table>tbody');
			const singleItemDescriptionTable = document.querySelector('div#singleItemDescription>div>table>tbody');		
			
			const citationContainer = document.createElement('div');
			citationContainer.id = 'citation';
						
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
						var myObj = JSON.parse(this.responseText);
									
						var author = myObj[creatorLabel];
						if (author.length === undefined) {
							author = "n.a.";
						}
						
						var title = myObj[titleLabel];
						var dateOriginal = myObj[dateLabel];
						
						if (dateOriginal.length === undefined) {
							dateOriginal = "n.d.";
						}
				
						var type = myObj[typeLabel];
						if (type.length === undefined) {
							type = "n.a.";
						}
										
						
						var collectionName = myObj[collectionLabel];
						var institution = myObj[institutionLabel];
						var description = myObj[descriptionLabel];

						var dateToday = new Date().toISOString().slice(0, 10);
						var url = "http://www.idaillinois.org/digital/collection/" + collectionID + "/id/" + recordNumber;
			
						var MLA = "<hr />\n<h3 style=\"color:#aa0000;\">Cite this image:</h3>\n<p><strong>MLA (v.8)</strong>: " + author +  ". \"" + title + ".\" " + institution + ": " + collectionName + " (Illinois Digital Archives)," + dateOriginal + ", " + url + ". " + dateToday + ".</p>";
						MLA = MLA + "<p><strong>Chicago/Turabian</strong>:  " + author + ", <em>" + title + "</em>, " + collectionName + " (Illinois Digital Archives), " + dateToday + ", " + url + ".</p>";
						MLA = MLA + "<p><strong>APA (v.6)</strong>: " + author + ". (" + dateOriginal + "). " + title + " [" + description + "]. Retrieved " + dateToday + ", from " + url + "</p>";	
						MLA = MLA + "<p><strong>IEEE</strong>: [X] " + author + ", \""  + title + "\", " + institution + ": " + collectionName + " (Illinois Digital Archives)," + dateOriginal + ". [Online]. Available: " + url + ". [Accessed: " + dateToday + "].</p>";
						
						citationContainer.innerHTML = MLA;
						
						document.querySelector('.ItemView-itemViewContainer').appendChild(citationContainer);		
					}
				};
				xmlhttp.open("GET", mainRecordStr, true);
				xmlhttp.send();
			}
		}

  document.addEventListener('cdm-item-page:ready', async function (e) {
		executeScript(e.detail.collectionId,e.detail.itemId);
  });

  document.addEventListener('cdm-item-page:update', async function (e) {
		document.getElementById('citation').remove();
		executeScript(e.detail.collectionId,e.detail.itemId);
  });
})();