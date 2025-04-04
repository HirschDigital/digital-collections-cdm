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

  function insertTwitterFollowButton(screenName){
    const twitBtn = document.getElementsByClassName('twitter-follow-button-rendered');
    if (twitBtn == null || twitBtn.length === 0) {
      const linkContainer = document.createElement('div');
      linkContainer.className = 'text-center';
      linkContainer.innerHTML = '<a href="https://twitter.com/' + screenName + '" class="twitter-follow-button" data-show-count="false" data-show-screen-name="true" data-size="large">Follow OCLC</a>';

      Array.from(document.querySelectorAll('.Footer-footerContainer'))
        .forEach(el => {
          el.appendChild(linkContainer.cloneNode(true));
        });

      loadScript('https://platform.twitter.com/widgets.js');
    }
  }

  const twitterScreenName = 'OCLC';

  ['cdm-home-page:ready','cdm-about-page:ready','cdm-login-page:ready',
  'cdm-collection-landing-page:ready','cdm-item-page:ready','cdm-custom-page:ready',
  'cdm-search-page:ready','cdm-collection-search-page','cdm-advanced-search-page:ready',
  'cdm-saved-items-page:ready','cdm-shared-items-page'].forEach(function(e) {
    document.addEventListener(e, function(e){
      insertTwitterFollowButton(twitterScreenName);
    });
  });

})();

/* version history

1_1 - 2021 Sep 17 - corrected list of event classes for listeners and refactored as forEach()
1.0 - 2019 August - initial implementation

*/
