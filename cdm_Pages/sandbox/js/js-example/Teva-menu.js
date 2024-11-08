(function() {
  'use strict';

function hoverbox () {
var data = [
  {
    title: "Grassmere Collection, 1786-1985",
    path: "grassmere",
    description:
      "Documenting five generations of the same family that owned Grassmere Farm in Nashville, Tennessee.",
  },
  {
    title: "Comb Graves of Tennessee",
    path: "combgraves",
    description:
      'Photographs and place coordinates documenting comb (also known as "tent") graves in TN cemeteries.',
  },
  {
    title: "TN Arts Commission Folklife Photos",
    path: "tacfolklife",
    description:
      "A sampling of images that illustrate folkways and unique Tennessee styles, characters, and art.",
  },
  {
    title: "Record of Ex-Soldiers in World War I",
    path: "rg36",
    description:
      "Compiled service records, arranged by county, of Tennesseans who served in World War I.",
  },
  {
    title: "Maps at the Library & Archives",
    path: "maps",
    description:
      "Digitized images of some of the thousands of rare and historical maps held at the Library & Archives.",
  },
  {
    title: "David Brock Korean War Photographs",
    path: "brock",
    description:
      "Photographs and an oral history chronicling Brock's military service as a combat engineer in Korea.",
  },
  {
    title: "Alvin C. York",
    path: "york",
    description:
      "A collection of items related to the life of one of the most decorated soldiers of World War I.",
  },
  {
    title: "Over Here, Over There",
    path: "ohot",
    description:
      "Photographs, documents, and artifacts detailing the experiences of Tennesseans during World War I.",
  },
  {
    title: "Women's Suffrage in Tennessee",
    path: "suffrage",
    description:
      "Documenting anti- and pro-suffrage activity in Tennessee and the passage of the 19th Amendment.",
  },
 
  
   
  
];

// Sort by first letter of collection title
data.sort(function (a, b) {
  var titleA = a.title.toLowerCase(),
      titleB = b.title.toLowerCase();
  if (titleA < titleB) return -1; // sort string ascending
  if (titleA > titleB) return 1;
  return 0; // default return value (no sorting)
});

// Create drop-down menu variable
var menu = "";

// Create drop-down menu items from collection data
for (var key = 0; key < data.length; key++) {
  menu += '<a class="dropdown-item" href="collections/' +
          data[key].path + '/' +
          data[key].path + '.html" target="_blank" rel="noopener">' +
          data[key].title + '</a>';
}

// Append links to correct div
document.getElementById("menuColl").innerHTML += menu;

// Create collections list variable
var collectionData = "";

// Create hvrbox items from collection data
for (var key = 0; key < data.length; key++) {
  collectionData += '<div class="hvrbox">';
  collectionData += '<div class="hvrbox-title" tabindex="0"><h5>' +
                   data[key].title + '</h5></div>';
  collectionData += '<img src="img/thumbnails/' +
                   data[key].path + '.jpg" class="hvrbox-layer_bottom" alt="">';
  collectionData += '<div class="hvrbox-layer_top hvrbox-layer_slideup">' +
                   '<div class="hvrbox-text" tabindex="0"><a href="collections/' +
                   data[key].path + '/' +
                   data[key].path + '.html" target="_blank" rel="noopener">' +
                   data[key].description + '</div><i class="fa fa-angle-double-right"></i>';
  collectionData += '</a></div></div>';
}

// Append hvrbox items to correct div
document.getElementById("collectionWrapper").innerHTML += collectionData;

};
document.addEventListener('cdm-collection-landing-page:ready', hoverbox);

})();
