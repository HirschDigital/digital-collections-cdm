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
  {
    title: "Christopher D. Ammons",
    path: "ammons",
    description:
      "Photographs, letters, and papers regarding Ammons' military service during two tours in Vietnam.",
  },
  {
    title: "Beautiful Jim Key Collection",
    path: "jimkey",
    description:
      "Items showcasing the notable career of Dr. William Key and his exceptional horse, Beautiful Jim Key.",
  },
  {
    title: "Oliver & Katherine King Papers",
    path: "king",
    description:
      "Records of a couple's courtship, marriage, and social lives before, during and after the Civil War.",
  },
  {
    title: "Gene A. Stone Korean War Collection",
    path: "stone",
    description:
      "Photographs documenting Lieutenant Stone's service in the Army Counter Intelligence Corps in Korea.",
  },
  {
    title: "John Sales Vietnam War Collection",
    path: "sales",
    description:
      "Correspondence and photographs illustrating Sales' wartime service in the United States Marine Corps.",
  },
  {
    title: "World War I Gold Star Records",
    path: "goldstar",
    description:
      "A memorial collection honoring Tennesseans who made the supreme sacrifice during World War I.",
  },
  {
    title: "James K. Polk Collection",
    path: "polk",
    description:
      "Letters, political cartoons, photographs, and other items relating to the 11th President of the U.S.",
  },
  {
    title: "Stereograph Collection",
    path: "stereographs",
    description:
      "Stereograph cards dated 1866 to 1917 with views from Tennessee and other locations around the world.",
  },
  {
    title: "Old Hickory DuPont Gunpowder Plant",
    path: "dupont",
    description:
      "Panoramic photographs depicting various aspects of the World War One-era Old Hickory Gunpowder plant.",
  },
  {
    title: "Robert H. Cartmell Diaries",
    path: "cartmell",
    description:
      "Written between 1853 and 1915, the diaries chronicle social, political, and economic issues of the era.",
  },
  {
    title: "Andrew Jackson Collection",
    path: "jackson",
    description:
      "Images, broadsides, manuscripts, and letters that help to define the life of the 7th President.",
  },
  {
    title: "Calvert Brothers Studio Collection",
    path: "calvert",
    description:
      "A collection of glass plate negatives from one of Nashville's prominent photography studios.",
  },
  {
    title: "Southern School News Collection",
    path: "southernschool",
    description:
      "Reports on impacts of school desegregation published by the Southern Education Reporting Service.",
  },
  {
    title: "Tennessee State Parks Folklife Project",
    path: "parksfolklife",
    description:
      "A sampling from hundreds of hours of audio and thousands of images documenting Tennessee folkways.",
  },
  {
    title: "Puryear Family Photograph Albums",
    path: "puryear",
    description:
      "Documenting two brothers' careers in the United States Army Air Service during and after World War I.",
  },
  {
    title: "Revolutionary War Collection",
    path: "revwar",
    description:
      "Maps and documents illustrating the legacy of the American Revolution and the impact on Tennessee.",
  },
  {
    title: "Tennessee Founding & Landmark Documents",
    path: "founding",
    description:
      "Records documenting significant milestones in the formation and early history of Tennessee.",
  },
  {
    title: "Women in the Civil War",
    path: "cwwomen",
    description:
      "Diary excerpts and photographs that portray the diverse experiences of women during the Civil War.",
  },
  {
    title: "Ryman Auditorium",
    path: "ryman",
    description:
      'Documents and images illustrating the history of Nashville\'s iconic "Mother Church of Country Music."',
  },
  {
    title: "Tennessee School for the Deaf",
    path: "schooldeaf",
    description:
      "Photographs of the Tennessee School for the Deaf, which has operated since 1845 in Knoxville.",
  },
  {
    title: "Civil War Military Records",
    path: "cwmilitary",
    description:
      "A sampling of the wide variety of Civil War records held in collections at the Library & Archives.",
  },
  {
    title: "Quilts Collection",
    path: "quilts",
    description:
      "Images of quilts and oral histories by quiltmakers celebrating the tradition of quilting in Tennessee.",
  },
  {
    title: "Civilian Conservation Corps",
    path: "ccc",
    description:
      "Photographs and interviews documenting the history of the Civilian Conservation Corps in Tennessee.",
  },
  {
    title: "Civil War Soldier Photographs",
    path: "cwsoldier",
    description:
      "A sampling of tintypes, cartes de visite, and positive photographic prints of Civil War soldiers.",
  },
  {
    title: "The Lost Cause in Southern Memory",
    path: "lostcause",
    description:
      "Records and ephemera from multiple collections illustrating the myth of the Confederate Lost Cause.",
  },
  {
    title: "Civil War Visual Culture",
    path: "cwvisual",
    description:
      "Images, sheet music, and other items depicting the experience and interpretation of the Civil War.",
  },
  {
    title: "Civilian Life in the Civil War",
    path: "cwcivilian",
    description:
      "Personal accounts and related documents detailing the lives of non-combatants during the Civil War.",
  },
  {
    title: "Broadsides in American Culture",
    path: "broadsides",
    description:
      "A sampling of some of the many broadsides found in various collections at the Library and Archives.",
  },
  {
    title: "Reconstruction in Tennessee",
    path: "reconstruction",
    description:
      "Photographs and broadsides focusing on Reconstruction and the African American legacy in Tennessee.",
  },
  {
    title: "Andrew Johnson Collection",
    path: "johnson",
    description:
      "Photographs, letters, broadsides, and ephemera relating to the 17th President of the United States.",
  },
  {
    title: "19th Century Agricultural Resources",
    path: "agriculture",
    description:
      "A selection of items depicting the lives of farmers and the development of agriculture in Tennessee.",
  },
  {
    title: "19th Century Native American Prints",
    path: "mckenneyhall",
    description:
      "Selections from a three-volume set of Native American portraits, assembled between 1836 and 1844.",
  },
  {
    title: 'The Scopes "Monkey" Trial',
    path: "scopes",
    description:
      "Interviews, photographs, and records related to the landmark case State of TN v. John Scopes.",
  },
  {
    title: "Bernhardt Wall Etchings",
    path: "bwall",
    description:
      'Etchings from "Following Andrew Jackson," a pictorial biography showing scenes from Jacksonâ€™s life.',
  },
  {
    title: "Tennessee State Guard",
    path: "stateguard",
    description:
      "Items related to the Tennessee State Guard showing contributions to the war effort during World War II.",
  },
  {
    title: "Tennessee Centennial Exposition",
    path: "centennial",
    description:
      "Photographs and ephemera relating to the Tennessee Centennial Exposition, held in Nashville in 1897.",
  },
  {
    title: "Tennessee in World War I",
    path: "wwitn",
    description:
      "Images from the Frierson-Warfield and Karl Kleeman collections, providing a look at the Western Front.",
  },
  {
    title: "Fisk University Scrapbook",
    path: "fisk",
    description:
      "Providing a glimpse into campus life at the renowned historically black university from 1926 to 1930.",
  },
  {
    title: "Tennessee Postcard Collection",
    path: "postcards",
    description:
      "A sampling from TSLA's collection of postcards, showing the state's diverse history and geography.",
  },
  {
    title: "Rose Music Collection",
    path: "rosemusic",
    description:
      "Selections of first editions and imprints from the Kenneth D. Rose Sheet Music Collection.",
  },
  {
    title: "Miers River Photo Collection",
    path: "miersriver",
    description:
      "Photographs showing steamboats, people and scenes along the Mississippi and Tennessee Rivers.",
  },
  {
    title: "Early 20th Century Schoolhouses",
    path: "schoolhouses",
    description:
      "Photographs of schoolhouses showing the economic disparity of Tennessee's segregated education system.",
  },
  {
    title: "Dr. Harry Mustard Photo Album",
    path: "mustard",
    description:
      "Images from the Commonwealth Fund Child Health Demonstration's study of Rutherford County, 1924 to 1928.",
  },
  {
    title: "Strickland Sketches",
    path: "strickland",
    description:
      "Drawings and watercolor sketches by architect William Strickland and his son, Francis W. Strickland.",
  },
  {
    title: "Library Photograph Collection",
    path: "libraryphoto",
    description:
      "Photographs and lithographs from various collections, representing a wide variety of topics.",
  },
 
  {
    title: "Hardy A. Mitchener, Jr. Journal",
    path: "mitchener",
    description:
      "Drawings, poems, songs, and notes detailing Mitchener's experience as a German prisoner of war.",
  },
  {
    title: "Education Outreach",
    path: "edoutreach",
    description:
      "Primary sources for students & educators based on Tennessee Social Studies curriculum standards.",
  },
  {
    title: "Looking Back: The Civil War in TN",
    path: "lbatcw",
    description:
      "Photographs, documents, and artifacts recounting the rich Civil War heritage of Tennessee families.",
  },
  {
    title: "Frank Hodge World War I Papers",
    path: "hodge",
    description:
      "World War I photographs, journals, and documents following an American ambulance driver in France.",
  },
  {
    title: "Tennessee General Assembly Portraits",
    path: "legcomp",
    description:
      "Composite portraits of members of the TN General Assembly, ranging in date from 1870 to 2016.",
  },
  {
    title: "Dept. of Conservation Photographs",
    path: "rg82",
    description:
      "Thousands of images from the photographic archive of the Tennessee Dept. of Conservation, 1937-1976.",
  },
  {
    title: "Tennessee Military Muster Rolls",
    path: "musterrolls",
    description:
      "Collection highlighting muster rolls of Tennessee units during the Civil War and Reconstruction.",
  },
  {
    title: "Mount Olivet Cemetery Records",
    path: "olivet",
    description:
      "Interment books from 1855-1906, listing people and their burial locations in Mount Olivet Cemetery.",
  },
  {
    title: "Lt. Col. J.Y. Kinsall Collection",
    path: "kinsall",
    description:
      "Images documenting the life and service of an Air Force Lieutenant Colonel during the Korean War.",
  },
  {
    title: "Highlander Folk School",
    path: "highlander",
    description:
      "Documents, photographs, and audio excerpts detailing the work of a leader in labor and civil rights.",
  },
  {
    title: "Small Photograph Collections",
    path: "familyphoto",
    description:
      "Images from various small photograph collections housed at the Library & Archives.",
  },
  {
    title: "Looking Back at Tennessee Photographs",
    path: "lbat",
    description:
      "Photographs of people, places and events collected from communities across the state.",
  },
  {
    title: "Lyndon Johnson's 1967 Tennessee Visit",
    path: "lbj",
    description:
      "Photographs documenting the Johnsons' visit to Middle Tennessee in March 1967.",
  },
 {
    title: "Cherokee Claims and Related Records",
    path: "cherokee",
    description:
      "Spoliation claims and other documents related to the Cherokee Nation and the Indian Removal Act.",
  },
  {
    title: "Diaries & Letters",
    path: "diaries",
    description:
      "A selection of diaries and correspondence from the collection.",
  },
    {
    title: "Early Governors' Papers",
    path: "earlygovernors",
    description:
      "A selection of documents and correspondence from early Tennessee Governors.",
  },
    {
    title: "Tennessee Birth Records",
    path: "birth",
    description:
      "Birth records issued by the State of Tennessee.",
  },
    {
    title: "Tennessee Death Records",
    path: "death",
    description:
      "Death records issued by the State of Tennessee.",
  },
  
  
  {
    title: "Tennessee Delayed Birth Records",
    path: "delayed",
    description:
      "Delayed birth records issued by the State of Tennessee.",
  },
  
  {
    title: "Tennessee Divorce Records",
    path: "divorce",
    description:
      "Divorce records issued by the State of Tennessee.",
  },
  {
    title: "Tennessee Marriage Records",
    path: "marriage",
    description:
      "Marriage records issued by the State of Tennessee.",
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