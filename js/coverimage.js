// JavaScript Document// path to where the cover images are uploaded
const PATH_COVERS_FILE_DIRECTORY = '/customizations/global/pages/images/thumbnail/';
// replace thumbnails with better thumbnails
const coverImagesFilenames = [
    'photobooks.jpg',
    'powell.jpg',
    'artistsbooks.jpg',
    'dec-arts.jpg',
    'latamperiodcals.jpg',
    'digitalpubz.png',
    'mfaharchives.jpg',
    'leirner.jpg',
    'digitalpubz.png',
    'ResourceGuides.png',
    'BTS-V-D-1.png',
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
     * This script allows to display more visually appealing versions.
     */
    function updateCollectionCovers() {
        const allCoverImages = coverImagesFilenames.map(coversFilePath);
        const cardImages = document.querySelectorAll('.Card-cardImage');

        // Loop through all cover images
        for (let i = 0; i < allCoverImages.length; i++) {
            if (cardImages[i]) {
                cardImages[i].src = null;
                cardImages[i].src = allCoverImages[i];
            }
        }
    }
    document.addEventListener('cdm-home-page:ready', updateCollectionCovers);

})();