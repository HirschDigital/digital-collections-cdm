(function () {
  'use strict';

  document.addEventListener('cdm-custom-page:ready', function () {

    // Set the alias here to change the collection

    const alias = "mfahdocs";

    // Function to fetch data from the given URL and return the JSON response
    async function fetchData(url) {
      const response = await fetch(url);
      return response.json();
    }

    // Function to construct the image URL
    function getImageUrl(alias, id, pointer) {
      return `https://cdm17480.contentdm.oclc.org/utils/getthumbnail/collection/${alias}/id/${pointer}`;
    }

    // Function to construct the item record URL
    function getItemRecordUrl(alias, id) {
      return `https://cdm17480.contentdm.oclc.org/digital/collection/${alias}/id/${id}/`;
    }

    // Function to construct the collection URL
    function getCollectionUrl(alias) {
      return `https://cdm17480.contentdm.oclc.org/digital/collection/${alias}`;
    }

    // Function to truncate the title at 30 characters
    function truncateTitle(title, maxLength) {
      return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
    }

    // Function to create the horizontal list of images
    function createImageList(images) {
      const imageListContainer = document.getElementById('imageList');
      let imageListHTML = '';

      images.forEach(image => {
        const imageUrl = getImageUrl(alias, image.pointer);
        const itemRecordUrl = getItemRecordUrl(alias, image.pointer);
        const truncatedTitle = truncateTitle(image.title, 40);

        imageListHTML += `
          <li class="list-group-item">
            <a href="${itemRecordUrl}" style="color: #242424">
              <img src="${imageUrl}" alt="${image.title}" class="img-thumbnail">
              <p style="font-weight: 600">${truncatedTitle}</p>
            </a>
          </li>`;
      });

      imageListContainer.innerHTML = imageListHTML;
    }

    // Function to update the collection title
    function updateCollectionTitle(title) {
      const collectionTitleContainer = document.getElementById('collectionTitle');
      const collectionUrl = getCollectionUrl(alias);

      collectionTitleContainer.innerHTML = `
      <h3 style="font-size: 18px; font-weight: 500; color: #242424;">Recently Added: <a style="color: #242424; font-size: 18px;" href="${collectionUrl}">${title}</a></h3>`;

    }

    // Fetch JSON data for "pointer" and "collec" --  number after "collec": 0=most recent, 2=random
  fetchData(`https://cdm17480.contentdm.oclc.org/digital/bl/dmwebservices/index.php?q=dmGetRecent/${alias}/6/title!collec/2/0/json`)
      .then(data => {
        const images = data.records;
        createImageList(images);

        const collectionTitle = images[0].collec;
        updateCollectionTitle(collectionTitle);
      })
      .catch(error => console.error(error));

  });


})();
