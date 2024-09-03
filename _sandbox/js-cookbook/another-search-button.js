$(document).ready(function () {


  function newsearch() {
    //  window.location.href = "https://teva.contentdm.oclc.org/cdm/search/searchterm/"+$('#srchTerm').val();
    window.open('https://cdm17480.contentdm.oclc.org/digital/collection/tpc/search/searchterm/' + $('#srchTerm').val(), '_blank');
  }
  $("#search_collection").click(function () {
    newsearch();
  });


  $('#srchTerm').keypress(function (event) {
    if (event.keyCode == 13) {
      $('#search_collection').click();
    }
  });


});


function goToPage() {
  var page = document.getElementById('SearchTerm').value
  NodeTitle = "Manuscripts and Albums";
  NodeTitle = NodeTitle.replace(/&#039;/g, "'");
  window.location = "https://cdm17480.contentdm.oclc.org/digital/collection/americanart/search/searchterm/" + NodeTitle + "!" + SearchTerm.value;
}
function searchKeyPress(e) {
  e = e || window.event;
  if (e.keyCode == 13) {
    document.getElementById('btnSearch').click();
    return false;
  }
  return true;
}