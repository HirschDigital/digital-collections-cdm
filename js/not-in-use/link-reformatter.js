(function () {
  'use strict';

  //when particular formatting is found in a metadata field, this script will convert
  //the text to HTML hyperlinks with custom display text without requiring HTML tags

  /**** Overview of supported metadata syntax ****

  "frb": Desired display text, colon, hyperlink url, <br> as delimiter for multiple links.
    ex: Display text 1: https://hyperlink.com<br>Display text 2: https://hyperlink.com<br>

  "pipe": Desired display text, vertical pipe, hyperlink url, ; as delimiter for multiple links.
      ex: Display text 1 | https://hyperlink.com; Display text 2 | https://hyperlink.com

  "markdown": Desired display text in square brackets, url in parentheses, ; as delimiter for multiple links.
    ex: [Display text 1](https://hyperlink.com);[Display text 2](https://hyperlink.com)

  *************************************************/


  function reformatField(nickname, syntax, target) {
    //"nickname" is the nickname of the field to reformat
    //"syntax" is the descriptive formatting option being employed
    let fieldsToChange = document.querySelectorAll('tr.ItemMetadata-metadatarow.field-' + nickname + ' > td.field-value > span');
    //find specified field in the dom
    if (fieldsToChange) {
      fieldsToChange.forEach(function (field) {
        //field can occur twice, once in each Description accordion
        var originalText = field.textContent;
        //grab existing text from the field if it exists
        let displayText = '', linkTarget = '', origTextArray = [];
        //declare variables outside switch statement so they can be used for each case
        switch (syntax) {
          case 'markdown':
            origTextArray = originalText.split(';');
            //separate multiple links into an array
            if (origTextArray) {
              field.innerHTML = '';
              //wipe out existing text in field
              origTextArray.forEach(function (segment) {
                //loop through each link
                let eachLink = document.createElement('a');
                eachLink.target = target;
                displayText = segment.substring(segment.lastIndexOf('[') + 1, segment.lastIndexOf(']')) + '<br/>';
                //use text between square brackets as display text
                linkTarget = segment.substring(segment.lastIndexOf('(') + 1, segment.lastIndexOf(')'));
                //use text between parentheses as url
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

// let globalScope = false;
// let collectionScope = [
//    'p15700coll3'
// ];


  document.addEventListener('cdm-item-page:ready', function (e) {
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      if (collection === 'p15700coll3') {
        //this collection logic is usually needed because field nicknames are specific to collections
        //add multiple stanzas for each collection as the field nicknames vary
        reformatField('markda', 'markdown', '_self');
      }
    }
  });

  document.addEventListener('cdm-item-page:update', function (e) {
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      if (collection === 'p15700coll3') {
        //this collection logic is usually needed because field nicknames are specific to collections
        //add multiple stanzas for each collection as the field nicknames vary
        reformatField('markda', 'markdown', '_self');
      }
    }
  });

  document.addEventListener('cdm-item-page:leave', function (e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      //no clean up needed because metadata fields are always re-rendered
    }
  });

})();

/* version history

1.0 - 2020 Sep 18 - initial implementation

*/
