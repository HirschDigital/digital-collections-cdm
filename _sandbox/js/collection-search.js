// JavaScript Document
// modified from Temple University

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