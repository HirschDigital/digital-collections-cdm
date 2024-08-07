// collection data goes here
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

  
   
  
];

// sort by first letter of collection title
data.sort(function (a, b) {
  var titleA = a.title.toLowerCase(),
    titleB = b.title.toLowerCase();
  if (titleA < titleB)
    // sort string ascending
    return -1;
  if (titleA > titleB) return 1;
  return 0; // default return value (no sorting)
});

//create drop-down menu variable
var menu = "";

//create drop down menu item from collection data
for (var key in data) {
  menu += '<a class="dropdown-item" href="collections/';
  menu +=
    data[key].path +
    "/" +
    data[key].path +
    '.html" target="_blank" rel="noopener">' +
    data[key].title +
    "</a>";
}
//append links to correct div
$("#menuColl").append(menu);

//create collections list variable
var collectionData = "";

// create hvrbox items from collection data
for (var key in data) {
  collectionData += '<div class="hvrbox">';
  collectionData +=
    '<div class="hvrbox-title" tabindex="0"><h5>' +
    data[key].title +
    "</h5></div>";
  collectionData +=
    '<img src="img/thumbnails/' +
    data[key].path +
    '.jpg" class="hvrbox-layer_bottom" alt="">';
  collectionData +=
    '<div class="hvrbox-layer_top hvrbox-layer_slideup"><div class="hvrbox-text" tabindex="0"><a href="collections/' +
    data[key].path +
    "/" +
    data[key].path +
    '.html" target="_blank" rel="noopener">';
  collectionData +=
    data[key].description + '</div><i class="fa fa-angle-double-right"></i>';
  collectionData += "</a>";
  collectionData += "</div></div>";
}

//append hvrbox items to correct div
$("#collectionWrapper").append(collectionData);






var btn = $('#topButton');

$(window).scroll(function() {
  if ($(window).scrollTop() > 600) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.click(function() {
  $('html, body').animate({scrollTop:0}, "slow");
});



