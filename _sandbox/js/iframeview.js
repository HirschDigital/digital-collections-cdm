// JavaScript Document
// Modified from code created by UWMilwaukee

// This script pulls a URL for a video and presents it in an iFrame
(function () {
  function unsupported() {
      // grabs the URL associated with the image or audio file
      // will only grab a URL if an URL item type exists
      var link = document.querySelector('[class*="itemUrlLink"]>a');
      var wrapper = document.createElement('div');
      wrapper.style.width = '100%';
      // if URL exists, create an iFrame and replace on page
      if (link && link.href) {
          wrapper.innerHTML = '<iframe width="100%" scrolling="auto" height="550px" frameborder="0" src="' + link.href + '"></iframe>';
      }

      const originalUrlLink = document.querySelector('[class="ItemUrl-itemUrl"]');
      if (originalUrlLink) {
        originalUrlLink.className += ' hide';
      }
      // find the parent container where we want to add the iframe
      var container = document.querySelector('[class*="itemUrl"]');
      if (container && container.parentElement) {
          container.parentElement.insertBefore(wrapper, container);
      }
      // function for disposing of the iframe
      return function () {
          wrapper.parentElement && wrapper.parentElement.removeChild(wrapper);
      };
  }

  var dispose;
  // calls when a user enters to the item page
  document.addEventListener('cdm-item-page:ready', function () {
      dispose = unsupported();
  });
  // calls when a user navigates to the next item page
  document.addEventListener('cdm-item-page:update', function () {
      dispose && dispose();
      dispose = unsupported();
  });
  // calls when a user leaves the item page
  document.addEventListener('cdm-item-page:leave', function () {
      dispose && dispose();
  });

})();

// TODO: recurively inject this script if needed

setTimeout(
    () => {
      let frames = document.querySelectorAll('iframe')
      frames.forEach(x => {
        try {
          let url = new URL(x.src)
          browser.runtime.sendMessage({ type: 'found-iframe', payload: url })
        } catch (err) {
          // do nothing (likely src is missing or 'about')
        }
      })
    },
    // TODO: make this configurable + potentially listen to iframe creation
    1000,
  )
  