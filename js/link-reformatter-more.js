(function () {
  'use strict';
  function reformatField(nickname,syntax,target) {
    let fieldsToChange = document.querySelectorAll('tr.ItemMetadata-metadatarow.field-' + nickname + ' > td.field-value > span');
    if (fieldsToChange) {
      fieldsToChange.forEach(function(field){
        var originalText = field.textContent;
        let displayText = '', linkTarget = '', origTextArray = [];
        switch (syntax) {
          case 'markdown':
            origTextArray = originalText.split(';');
            if (origTextArray) {
              field.innerHTML = '';
              origTextArray.forEach(function(segment){
                let eachLink = document.createElement('a');
                eachLink.target = target;
                displayText = segment.substring(segment.lastIndexOf('[') + 1, segment.lastIndexOf(']')) + '<br/>';
                linkTarget = segment.substring(segment.lastIndexOf('(') + 1, segment.lastIndexOf(')'));
                eachLink.href = linkTarget;
                eachLink.innerHTML = displayText;
                field.appendChild(eachLink);
              });
            }
            break;
          default:
            console.log('link-reformatter.js: No fields found to reformat.');
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
          reformatField('more','markdown','_self');
        }
    });

    document.addEventListener('cdm-item-page:update', function(e){
        let item = e.detail.itemId;
        let collection = e.detail.collectionId;
        if (globalScope || collectionScope.includes(collection)) {
          reformatField('more','markdown','_self');
        }
    });

    document.addEventListener('cdm-item-page:leave', function(e){
        let collection = e.detail.collectionId;
        if (globalScope || collectionScope.includes(collection)) {
        }
    });

})();
