(function() {
  'use strict';

  function changeLogoLink() {
    const headerLogo = document.querySelector('div.Header-logoHolder>div>a');
    const newUrl = 'https://www.hrc.utexas.edu/';
    if (headerLogo) {
      headerLogo.href = newUrl;
      headerLogo.addEventListener('click', function(e) {
        this.href = newUrl;
        e.stopPropagation();
      });
    }
  }

  document.addEventListener('cdm-about-page:ready', changeLogoLink);
  document.addEventListener('cdm-advanced-search-page:ready', changeLogoLink);
  document.addEventListener('cdm-collection-landing-page:ready', changeLogoLink);
  document.addEventListener('cdm-collection-search-page:ready', changeLogoLink);
  document.addEventListener('cdm-collection-page:ready', changeLogoLink);
  document.addEventListener('cdm-custom-page:ready', changeLogoLink);
  document.addEventListener('cdm-home-page:ready', changeLogoLink);
  document.addEventListener('cdm-item-page:ready', changeLogoLink);
  document.addEventListener('cdm-login-page:ready', changeLogoLink);
  document.addEventListener('cdm-notfound-page:ready', changeLogoLink);
  document.addEventListener('cdm-search-page:ready', changeLogoLink);

})();

var globalPath,
	gpSet = false,
  globalFile,
	gfSet = false,
	apiFetch = new XMLHttpRequest(),
  fileCheck = new XMLHttpRequest(),
  folderCheck = new XMLHttpRequest(),
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
	observer, 
	pathArr, 
	collid, 
	itemid, 
	apiBroke = function(a,b,c){
		console.log(a);
		console.log(b);
		console.log(c);
		if (document.getElementById('hiQb')){
			document.getElementById('hiQb').remove();
		}
	},
	checkForParts = function(){
		if ((document.querySelector("#print-dropdown-compound-item-side-bar") || document.querySelector("#downloadsizemenu-side-bar") || document.querySelector(".ItemOptions-itemOptions")) && document.querySelector(".cdm-item-page")){
			setTimeout(function(){waitForButton();},500);
		}
	},
	checkForever = window.setInterval(checkForParts,500);
	waitForButton = function(){
		var buttonHolder = document.querySelector("#print-dropdown-compound-item-side-bar"),
			curImg = document.querySelector(".cdm-item-page"),
			mirA = document.createElement('a'),
			mirImg = document.createElement('img'),
            cIC,cN;
		pathArr = window.location.pathname.split('/');
		collid = pathArr[3];
		itemid = pathArr[5];
		if (buttonHolder == null){
            buttonHolder = document.querySelector("#downloadsizemenu-side-bar");
        }
		if (buttonHolder == null){
			buttonHolder = document.querySelector(".ItemView-itemSearchContainer");
        }
		if (curImg !== null && typeof curImg !== 'undefined' && curImg.classList.length > 0 && buttonHolder !== null && typeof buttonHolder !== 'undefined' && typeof buttonHolder.children !== 'undefined' && buttonHolder.children.length > 0){
			for (cIC = 0; cIC < curImg.classList.length; cIC++){
				cN = curImg.classList[cIC];
				if (!isNaN(Number(cN.split('-')[cN.split('-').length - 1]))){
					if (itemid === null || typeof itemid === 'undefined' || isNaN(Number(itemid))){
						itemid = cN.split('-')[cN.split('-').length - 1];
					}
					if (document.querySelector("#link2Mirador") === null || document.querySelector("#link2Mirador").href !== 'https://norman.hrc.utexas.edu/mirador/' + collid + '/' + itemid){
						apiFetch.open('GET','https://norman.hrc.utexas.edu/includes/corsMirror.cfc?method=consumeREST&dest=' + collid + '/' + itemid + '&req=' + location.hostname,true);
						apiFetch.send(null);
					}
				}
			}
			if (document.querySelector("#link2Mirador") !== null && document.querySelector("#link2Mirador").href !== 'https://norman.hrc.utexas.edu/mirador/' + collid + '/' + itemid){
				document.querySelector("#link2Mirador").remove();
			}
			if (document.querySelector("#link2Mirador") === null){
				mirA.id = 'link2Mirador';
				mirA.innerHTML = 'Mirador Viewer';
				mirA.className = 'cdm-btn btn btn-primary iiif-button';
				mirA.href = 'https://norman.hrc.utexas.edu/mirador/' + collid + '/' + itemid;
				mirA.target = '_blank';
				mirA.style.margin = '0px 5px';
				mirImg.src = '';
				mirA.appendChild(mirImg);
				if (buttonHolder.parentElement.parentElement){
					buttonHolder.parentElement.parentElement.insertBefore(mirA,buttonHolder.parentElement);
				}
			} 
		} else {
			setTimeout(function(){waitForButton();},500);
		}
		setTimeout(function(){waitForGP();},500);
	},
	waitForGP = function(){
		var metaField = document.querySelector(".ItemTitle-secondaryTitle");
		if (gpSet === false || (metaField === null && gfSet === false)){
      setTimeout(function(){waitForGP();},500);
		} else {
			makeButton();
		}
	},
	getHiQTarget = function(){
		var metaField = document.querySelector(".ItemTitle-secondaryTitle"),
      w = window.open("https://norman.hrc.utexas.edu/includes/downloadFile.cfm?userid=0&addAttr=true&dir=http://hudson.hrc.utexas.edu" + globalPath.replace(/\\/g, "/") + "/&file=" +(gfSet === true && globalFile !== 'index.cpd' ? globalFile : metaField.innerHTML + ".jpg"),"DLWindow","width=40,height=60"); 
	},
	makeButton = function(){
		var HQli = document.createElement('li'),
			HQa = document.createElement('a'),
			DLul = document.querySelector("#downloadsizemenu-side-bar");
		if (!document.getElementById('hiQb')){
			HQli.id = 'hiQb';
			HQli.role = 'presentation';
			DLul.appendChild(HQli);
			HQa.role = 'menuitem';
			HQa.tabIndex = -1;
			HQa.innerHTML = 'High-Quality';
			HQa.href = 'javascript:getHiQTarget();';
			HQli.appendChild(HQa);
		}
	};
	
apiFetch.onreadystatechange = function(){
	if (apiFetch.readyState === XMLHttpRequest.DONE || this.readyState === 4) {
		var rObj = JSON.parse(apiFetch.responseText);
		if (rObj.path && typeof rObj.path.replace === "function"){
            globalPath = rObj.path;
            folderCheck.open('HEAD','https://hudson.hrc.utexas.edu' + globalPath.replace(/\\/g,'/'),true);
            folderCheck.send(null);
            if ((rObj.file && typeof rObj.file.replace === "function" && rObj.file !== 'index.cpd') || gfSet === true){
                globalFile = rObj.file;
                if (gfSet === false){
                    gfSet = true;
                }
            } else {
                var MDK = document.getElementsByClassName('ItemMetadata-key');
                for (var m in MDK){
                    if (MDK[m].innerHTML === 'File Name' && MDK[m].nextElementSibling.firstChild.innerHTML !== 'index.cpd'){
                        globalFile = MDK[m].nextElementSibling.firstChild.innerHTML;
                        gfSet = true;
                    }
                }
            }
            fileCheck.open('HEAD','https://hudson.hrc.utexas.edu' + globalPath.replace(/\\/g,'/') + (globalPath.replace(/\\/g,'/')[globalPath.length - 1] === '/' ? '' : '/') + globalFile,true);
            fileCheck.send(null);
			if (gpSet === false){
				gpSet = true;
			}
		} else if (typeof window.__INITIAL_STATE__.item !== 'undefined' && window.__INITIAL_STATE__.item.item.parentId){
      apiFetch.open('GET','https://norman.hrc.utexas.edu/includes/corsMirror.cfc?method=consumeREST&dest=' + collid + '/' + window.__INITIAL_STATE__.item.item.parentId + '&req=' + location.hostname,true);
      apiFetch.send(null);
      return;
    } else {
      apiBroke(apiFetch.response,apiFetch.status,apiFetch.readyState)
		}
	}
}
fileCheck.onreadystatechange = function(){
  if (this.readyState == this.DONE || this.readyState === 4) {
      if (this.status === 200){
        makeButton();
      } else {
        console.log(this.responseURL);
        setTimeout(function(){waitForGP();},500);
      }
  }
}
folderCheck.onreadystatechange = function(){
  if (this.readyState == this.DONE || this.readyState === 4) {
    if (this.status !== 200){
      var tempPathArr = globalPath.replace(/\\/g,'/').split('/');
      tempPathArr.pop();
      globalPath = tempPathArr.join('\\');
      folderCheck.open('HEAD','https://hudson.hrc.utexas.edu' + globalPath.replace(/\\/g,'/'),true);
      folderCheck.send(null);
    }
  }
}
// JavaScript Document