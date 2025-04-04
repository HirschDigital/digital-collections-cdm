(function () {
  'use strict';

  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function insertInstaFollowButton(mfah_librariesarchives){
    const instaBtn = document.getElementsByClassName('insta-follow-button-rendered');
    if (instaBtn == null || instaBtn.length === 0) {
      const linkContainer = document.createElement('div');
      linkContainer.className = 'text-center';
      linkContainer.innerHTML = '<a href="https://www.instagram.com/' + mfah_librariesarchives + '" class="insta-follow-button" data-show-count="false" data-show-screen-name="true" data-size="large">Follow MFAH Libraries and Archives</a>';

      Array.from(document.querySelectorAll('.Footer-footerContainer'))
        .forEach(el => {
          el.appendChild(linkContainer.cloneNode(true));
        });

      loadScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-59f4a28b67531349');
    }
  }

  const instaScreenName = 'mfah_librariesarchives';

  ['cdm-home-page:ready','cdm-about-page:ready','cdm-login-page:ready',
  'cdm-collection-landing-page:ready','cdm-item-page:ready','cdm-custom-page:ready',
  'cdm-search-page:ready','cdm-collection-search-page','cdm-advanced-search-page:ready',
  'cdm-saved-items-page:ready','cdm-shared-items-page'].forEach(function(e) {
    document.addEventListener(e, function(e){
      insertInstaFollowButton(instaScreenName);
    });
  });

})();

/* version history

1_1 - 2021 Sep 17 - corrected list of event classes for listeners and refactored as forEach()
1.0 - 2019 August - initial implementation

*/
