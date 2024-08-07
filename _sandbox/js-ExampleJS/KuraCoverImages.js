// path to where the cover images are uploaded
const PATH_COVERS_FILE_DIRECTORY = '/customizations/global/pages/images/covers/';
// replace thumbnails with better thumbnails
const coverImagesFilenames = [
    'Photographs.jpg', 'Maps.jpg', 'Manuscripts.jpg', // row 1 - top
    'Auckland-People-and-Events.jpg', 'Index-Cards.jpg', 'Rare-Books.jpg', // row 2
    'Passengers-and-Vessels.jpg', 'Cemetery-Records.jpg', 'Journals.jpg', // row 3
    'Iwidex.jpg', 'Local-History.jpg', 'Oral-History.jpg', // row 4 - bottom
    'Manukaus-Journey.jpg' // invisible row: Manukaus Journey and Ephemera-no image provided yet
];

// helper function to assemble full URL of each JS file
function coversFilePath(file) {
    return PATH_COVERS_FILE_DIRECTORY + file;
}

(function () {
    'use strict';

    /** 
     * ContentDM converts required images as smaller thumbnails. 
     * However, the converted versions appear to be too compressed.
     * This script allows Kura to display more visually appealing versions.
     */
    function updateCollectionCovers() {
        const allCoverImages = coverImagesFilenames.map(coversFilePath);
        let cardImages = document.querySelectorAll('.Card-cardImage');
        for (let i = 0; i < allCoverImages.length; i++) {
            cardImages[i].src = null;
            cardImages[i].src = allCoverImages[i];
        }
    }

    document.addEventListener('cdm-home-page:ready', updateCollectionCovers);

})();// JavaScript Document