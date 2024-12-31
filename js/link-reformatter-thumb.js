(function () {
  'use strict';
function reformatField(nickname,syntax) {
  let fieldsToChange = document.querySelectorAll('tr.ItemMetadata-metadatarow.field-' + nickname + ' > td.field-value > span');
  if (fieldsToChange) {
    fieldsToChange.forEach(function(field){
      var originalText = field.textContent;
      let displayText = '', linkTarget = '', linkThumb = '', origTextArray = [];
      switch (syntax) {
        case 'markdown':
          origTextArray = originalText.split(';');
          if (origTextArray) {
            field.innerHTML = '';
            origTextArray.forEach(function(segment){
              let eachLink = document.createElement('a');
              displayText = segment.substring(segment.lastIndexOf('[') + 1, segment.lastIndexOf(']')) + '<br/>';
              linkTarget = segment.substring(segment.lastIndexOf('(') + 1, segment.lastIndexOf(')'));
              linkThumb = segment.substring(segment.lastIndexOf('{') + 1, segment.lastIndexOf('}'));
              eachLink.href = linkTarget;
              let imgElement = document.createElement('img');
              imgElement.src = linkThumb;
              eachLink.appendChild(imgElement);
              eachLink.innerHTML += displayText;
              field.appendChild(eachLink);
            });
          }
          break;
        default:
          console.log('link-reformatter-md.js: No fields found to reformat.');
      }
    })
  }
}

let globalScope = true;
let collectionScope = [
    ''
];


document.addEventListener('cdm-item-page:ready', function(e){
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      reformatField('relate','markdown');
    }
});

document.addEventListener('cdm-item-page:update', function(e){
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      reformatField('relate','markdown');
    }
});

document.addEventListener('cdm-item-page:leave', function(e){
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      //no clean up needed because metadata fields are always re-rendered
    }
});

})();

/* version history

1.0 - 2020 Sep 18 - initial implementation

*/
