(function () {
  'use strict';
  function reformatField(nickname, syntax, target) {
    let fieldsToChange = document.querySelectorAll('tr.ItemMetadata-metadatarow.field-' + nickname + ' > td.field-value > span');
    if (fieldsToChange) {
      fieldsToChange.forEach(function (field) {
        var originalText = field.textContent;
        let displayText = '', linkTarget = '', linkThumb = '', origTextArray = [];
        switch (syntax) {
          case 'markdown':
            origTextArray = originalText.split(';');
            if (origTextArray) {
              field.innerHTML = '';
              origTextArray.forEach(function (segment) {
                let eachLink = document.createElement('a');
                eachLink.target = target;
                let imgBox = document.createElement('div');
                let imgElement = document.createElement('img');
                let capText = document.createElement('h3');
                displayText = segment.substring(segment.lastIndexOf('[') + 1, segment.lastIndexOf(']')) + '<br/>';
                linkTarget = segment.substring(segment.lastIndexOf('(') + 1, segment.lastIndexOf(')'));
                linkThumb = segment.substring(segment.lastIndexOf('{') + 1, segment.lastIndexOf('}'));
                eachLink.href = linkTarget;
                imgElement.src = linkThumb;
                eachLink.appendChild(imgBox);
                imgBox.appendChild(imgElement);
                eachLink.appendChild(capText);
                capText.innerHTML = displayText;
                field.appendChild(eachLink);
              });
            }
            break;
          default:
            console.log('link-reformatter-thumb.js: No fields found to reformat.');
        }
      })
    }
  }

  let globalScope = true;
  let collectionScope = [
    ''
  ];


  document.addEventListener('cdm-item-page:ready', function (e) {
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      if (collection === '') {
        reformatField('relate', 'markdown', '_self');
        reformatField('relata', 'markdown', '_self');
      }
    }
  });

  document.addEventListener('cdm-item-page:update', function (e) {
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      reformatField('relate', 'markdown', '_self');
      reformatField('relata', 'markdown', '_self');
    }
  });

  document.addEventListener('cdm-item-page:leave', function (e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      //no clean up needed because metadata fields are always re-rendered
    }
  });

})();

