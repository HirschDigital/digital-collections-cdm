(function () {
  'use strict';

  function reformatField(nickname, syntax, target) {
    let fieldsToChange = document.querySelectorAll(
      'tr.ItemMetadata-metadatarow.field-' + nickname + ' > td.field-value > span'
    );
    if (fieldsToChange.length > 0) {
      fieldsToChange.forEach(function (field) {
        const originalText = field.textContent.trim();
        let displayText = '',
          linkTarget = '',
          linkThumb = '',
          origTextArray = [];

        if (!originalText.includes('[') || !originalText.includes('(')) return;

        switch (syntax) {
          case 'markdown':
            origTextArray = originalText.split(';');
            field.innerHTML = ''; // Clear original text

            origTextArray.forEach(function (segment) {
              const displayArtist = segment.substring(segment.lastIndexOf('<') + 1, segment.lastIndexOf('>'));
              displayText = segment.substring(segment.lastIndexOf('[') + 1, segment.lastIndexOf(']')) + '<br/>';
              linkTarget = segment.substring(segment.lastIndexOf('(') + 1, segment.lastIndexOf(')'));
              linkThumb = segment.substring(segment.lastIndexOf('{') + 1, segment.lastIndexOf('}'));

              // Build elements
              const eachLink = document.createElement('a');
              const imgBox = document.createElement('div');
              const imgElement = document.createElement('img');
              const capArtist = document.createElement('h3');
              const capText = document.createElement('h3');
              const textContainer = document.createElement('div');

              imgBox.className = 'related-img';
              capArtist.className = 'related-artist';
              capText.className = 'related-title';
              textContainer.className = 'item-related-container';

              eachLink.href = linkTarget;
              eachLink.target = target;
              imgElement.src = linkThumb;
              imgBox.appendChild(imgElement);
              eachLink.appendChild(imgBox);

              capArtist.innerHTML = displayArtist;
              capText.innerHTML = `<em>${displayText}</em>`;
              textContainer.appendChild(capArtist);
              textContainer.appendChild(capText);
              eachLink.appendChild(textContainer);

              field.appendChild(eachLink);
            });
            break;
        }
      });
    }
  }

  function applyAllReformats() {
    reformatField('relate', 'markdown', '_self');
    reformatField('relata', 'markdown', '_self');
    reformatField('exhibd', 'markdown', '_self');
  }

  function waitForFieldAndApply(nickname, tries = 30) {
    const interval = setInterval(() => {
      const target = document.querySelector('tr.ItemMetadata-metadatarow.field-' + nickname + ' > td.field-value > span');
      if (target || tries <= 0) {
        clearInterval(interval);
        applyAllReformats();
      }
      tries--;
    }, 200); // Try every 200ms
  }

  document.addEventListener('cdm-item-page:ready', function (e) {
    if (e.detail.collectionId === 'leirner') {
      waitForFieldAndApply('relate');
    }
  });

  document.addEventListener('cdm-item-page:update', function (e) {
    if (e.detail.collectionId === 'leirner') {
      waitForFieldAndApply('relate');
    }
  });

})();
