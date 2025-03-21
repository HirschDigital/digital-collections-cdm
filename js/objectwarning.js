(function () {
  'use strict';

  function addWarning() {
    // Get the field-restri element
    const fieldRestri = document.querySelector('tr.field-restri > td.field-value > span');
    // Check if the warning message already exists
    if (document.querySelector('.warning-message')) {
      return; // Exit function if warning already exists
    }
    // Check if the field-restri element exists and has the specific value of "CW"
    if (fieldRestri && fieldRestri.textContent.trim() === 'CW') {
      // Create element
      const el = document.createElement('div');

      // Add classes to element
      el.classList.add('warning-message');

      // Set the innerHTML of the element
      el.innerHTML = `<p style="background: #ffdc7a; margin: 0px; padding: 3px 6px 6px; text-align: center; font-size: 16px">
    Warning: Object contains graphic images of violence</p>`;

      // Add element to DOM
      const box = document.querySelector('.ItemView-mainColumn');
      if (box) {
        box.prepend(el);
      }
    }

    // Check if the field-restri element exists and has the specific value of "CW"
    if (fieldRestri && fieldRestri.textContent.trim() === 'NW') {
      // Create element
      const el = document.createElement('div');

      // Add classes to element
      el.classList.add('warning-message');

      // Set the innerHTML of the element
      el.innerHTML = `<p style="background: #ffdc7a; margin: 0px; padding: 3px 6px 6px; text-align: center; font-size: 16px">
      Warning: Object may contain nudity</p>`;

      // Add element to DOM
      const box = document.querySelector('.ItemView-mainColumn');
      if (box) {
        box.prepend(el);
      }
    }
  }

  function removeWarning() {
    const warningMessage = document.querySelector('.warning-message');
    if (warningMessage) {
      warningMessage.remove();
    }
  }

  let globalScope = true;
  let collectionScope = [
    ''
  ];
  document.addEventListener('cdm-item-page:ready', function (e) {
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      removeWarning(); // Remove any existing warning
      addWarning();
    }

  }, { once: true });

  document.addEventListener('cdm-item-page:update', function (e) {
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      removeWarning(); // Remove any existing warning
      addWarning();
    }
  });

  document.addEventListener('cdm-item-page:leave', function (e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      removeWarning();
    }
  }, { once: true });

})();