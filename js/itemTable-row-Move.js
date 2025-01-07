(function () {
    'use strict';

function moveDescriptionToSideColumn() {
    const rowToMove = document.querySelector('.field-relate');
    
    if (rowToMove) {
        const standaloneContainer = document.querySelector('.row.foo .ItemView-sideColumn');
        
        if (standaloneContainer) {
            standaloneContainer.appendChild(rowToMove);
            console.log('Row moved successfully');
        } else {
            console.log("Standalone container not found.");
        }
    } else {
        console.log("Row to move not found.");
    }
    const rowToMoveTwo = document.querySelector('.field-relata');
    
    if (rowToMoveTwo) {
        const standaloneContainer = document.querySelector('.row.foo .ItemView-sideColumn');
        
        if (standaloneContainer) {
            standaloneContainer.appendChild(rowToMoveTwo);
            console.log('Row moved successfully');
        } else {
            console.log("Standalone container not found.");
        }
    } else {
        console.log("Row to move not found.");
    }
}

moveDescriptionToSideColumn();
document.addEventListener('cdm-item-page:ready', moveDescriptionToSideColumn);

document.addEventListener('cdm-item-page:update', moveDescriptionToSideColumn);
})();