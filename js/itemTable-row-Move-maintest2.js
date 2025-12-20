(function () {
    'use strict';

    function moveDescriptionToSideColumn() {
        const rowToMove = document.querySelector('.field-relate');
        const rowToMoveTwo = document.querySelector('.field-relata');
        const sideColumnContainer = document.querySelector('.row.foo .ItemView-sideColumn');
        const mainColumnContainer = document.querySelector('.row.foo .ItemView-mainColumn');

        if (window.innerWidth <= 769) {
            if (rowToMove && mainColumnContainer) {
                mainColumnContainer.appendChild(rowToMove);
                console.log('Row moved to main column successfully');
            } else {
                console.log("Row to move or main column container not found.");
            }

            if (rowToMoveTwo && mainColumnContainer) {
                mainColumnContainer.appendChild(rowToMoveTwo);
                console.log('Row moved to main column successfully');
            } else {
                console.log("Row to move or main column container not found.");
            }
        } else {
            if (rowToMove && sideColumnContainer) {
                sideColumnContainer.appendChild(rowToMove);
                console.log('Row moved to side column successfully');
            } else {
                console.log("Row to move or side column container not found.");
            }

            if (rowToMoveTwo && sideColumnContainer) {
                sideColumnContainer.appendChild(rowToMoveTwo);
                console.log('Row moved to side column successfully');
            } else {
                console.log("Row to move or side column container not found.");
            }
        }
    }

    moveDescriptionToSideColumn();
  window.addEventListener('resize', function(e) {
    if (e.detail.collectionId === 'leirner') {
      moveDescriptionToSideColumn();
    }
  });
  document.addEventListener('cdm-item-page:ready', function(e) {
    if (e.detail.collectionId === 'leirner') {
      moveDescriptionToSideColumn();
    }
  });
    document.addEventListener('cdm-item-page:update', function(e) {
    if (e.detail.collectionId === 'leirner') {
      moveDescriptionToSideColumn();
    }
  });
  })();