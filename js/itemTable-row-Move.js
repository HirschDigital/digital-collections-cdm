(function () {
    'use strict';


function moveDescriptionToSideColumn() {
    // Select the row you want to move
    const rowToMove = document.querySelector('.field-relate');
    
    if (rowToMove) {
        // Select the destination column where you want to append the row
        // In this case, let's say we want to append it to the first row in Column 3
        const standaloneContainer = document.querySelector('.row.foo .ItemView-sideColumn');
        
        if (standaloneContainer) {
            // Move the row by appending it to the target column
            // Here we move the entire row to a different place (if required by your layout)
            standaloneContainer.appendChild(rowToMove);
            console.log('Row moved successfully');
        } else {
            console.log("Standalone container not found.");
        }
    } else {
        console.log("Row to move not found.");
    }
}

// Trigger the move function
moveDescriptionToSideColumn();
document.addEventListener('cdm-item-page:ready', moveDescriptionToSideColumn);

document.addEventListener('cdm-item-page:update', moveDescriptionToSideColumn);
})();