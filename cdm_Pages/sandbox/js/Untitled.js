(function () {
  'use strict';

  document.addEventListener('cdm-custom-page:ready', function () {

    // CONTENTdm base URL
    const baseUrl = 'https://cdm17480.contentdm.oclc.org';

    // Collections to include
    const aliases = [
      'mfahdocs',
      'americanart',
      'latam-art',
      'artistsbooks',
      'photobooks',
      'decarts',
      'manuscripts'
      // 'another-collection'
    ];

    // DOM elements
    const imageListContainer =
      document.getElementById('imageList');
    const collectionTitleContainer =
      document.getElementById('collectionTitle');
    // Verify required elements exist
    if (!imageListContainer) {
      console.error('Missing #imageList element');
      return;
    }
    if (!collectionTitleContainer) {
      console.error('Missing #collectionTitle element');
      return;
    }

    // Fetch JSON safely
    async function fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(
          'fetchData error:',
          err
        );
        return null;
      }
    }

    // Thumbnail URL
    function getImageUrl(alias, pointer) {
      return `${baseUrl}/digital/api/singleitem/collection/${alias}/id/${pointer}/thumbnail`;
    }

    // Item page URL
    function getItemRecordUrl(alias, id) {
      return `${baseUrl}/digital/collection/${alias}/id/${id}/`;
    }

    // Collection page URL
    function getCollectionUrl(alias) {
      return `${baseUrl}/digital/collection/${alias}`;
    }

    // Truncate long titles
    function truncateTitle(title, maxLength = 40) {
      if (!title) {
        return 'Untitled';
      }
      return title.length > maxLength
        ? title.substring(0, maxLength) + '...'
        : title;
    }

    // Build image grid
    function createImageList(images) {
      let imageListHTML = '';
      images.forEach(image => {
        const imageUrl =
          getImageUrl(
            image.alias,
            image.pointer
          );
        const itemRecordUrl =
          getItemRecordUrl(
            image.alias,
            image.pointer
          );
        const truncatedTitle =
          truncateTitle(image.title);
        imageListHTML += `
          <li class="list-group-item">
            <a href="${itemRecordUrl}"
              style="color:#242424">
              <img src="${imageUrl}"
                alt="${image.title || ''}"
                class="img-thumbnail">
              <p style="font-weight:600;">
                ${truncatedTitle}
              </p>
            </a>
          </li>
        `;
      });
      imageListContainer.innerHTML = imageListHTML;
    }

    // Build collection heading
    function updateCollectionTitle() {
      const links = aliases.map(alias => {
        const url =
          getCollectionUrl(alias);
        return `<a href="${url}"style="color:#242424; margin-right:12px;">
            ${alias}
          </a>`;
      }).join('');

      collectionTitleContainer.innerHTML = `
        <h3 style="font-size:18px; font-weight:500; color:#242424;">
          Recently Added:
          ${links}
        </h3>
      `;
    }
    // Number of items to display total
    const totalItems = 12;
    // Fetch one collection
    async function fetchCollection(alias) {

      const url =
        `${baseUrl}/digital/bl/dmwebservices/index.php?q=dmGetRecent/${alias}/20/title!find!date!dmcreated/0/0/json`;
      console.log(
        'Fetching:',
        url
      );
      const data =
        await fetchData(url);
      if (
        !data ||
        !data.records
      ) {
        console.warn(
          `No records for ${alias}`
        );
        return [];
      }

      // Attach alias to each record
      return data.records.map(record => ({
        ...record,
        alias
      }));
    }

    // Fetch all collections
    Promise.all(
      aliases.map(fetchCollection)
    )
      .then(results => {

        // Merge all collections
        const allImages =
          results.flat();
        console.log('Merged images:', allImages);

        // Sort newest first
        allImages.sort((a, b) => {
          const dateA =
            new Date(
              a.dmcreated || a.date || 0
            );
          const dateB =
            new Date(
              b.dmcreated || b.date || 0
            );
          return dateB - dateA;
        });

        // Keep newest 12 only
        const newestImages =
          allImages.slice(0, totalItems);
        console.log(
          'Newest images:',
          newestImages
        );
        createImageList(newestImages);
        updateCollectionTitle();
      })
      .catch(error => {
        console.error(
          'Promise.all error:',
          error
        );
      });
  });
})();