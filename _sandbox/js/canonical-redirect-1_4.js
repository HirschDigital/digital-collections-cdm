(function() {
'use strict';

  function urlRedirector() {
    const targetPath = window.location.pathname;
    const baseUrl = window.location.origin
      ? window.location.origin + '/'
      : window.location.protocol + '//' + window.location.host + '/';
    if (baseUrl == badUrl) {
      window.location = goodUrl + targetPath;
    }
  }

  const badUrl = 'https://cdm15700.contentdm.oclc.org/';
  const goodUrl = 'https://cdmdemo.contentdm.oclc.org';

  document.addEventListener('cdm-app:ready', function() {
    // executes the first time a user arrives at the site
    urlRedirector();
  });

  ['cdm-home-page:enter', 'cdm-home-page:update','cdm-about-page:enter','cdm-about-page:update',
  'cdm-search-page:enter','cdm-search-page:update','cdm-collection-search-page:enter','cdm-collection-search-page:update',
  'cdm-advanced-search-page:enter','cdm-advanced-search-page:update','cdm-login-page:enter','cdm-login-page:update',
  'cdm-collection-landing-page:enter','cdm-collection-landing-page:update','cdm-custom-page:enter','cdm-custom-page:update',
  'cdm-item-page:enter','cdm-item-page:update','cdm-notfound-page:enter','cdm-notfound-page:update',
  'cdm-saved-items-page:enter','cdm-saved-items-page:update','cdm-shared-items-page:enter','cdm-shared-items-page:update'
  ].forEach(function(e) {
      document.addEventListener(e,urlRedirector);
  });

})();

/* version history

1_4 - 2021 Sep 17 - corrected and expanded list of event classes
1.3 - 2020 March 1 - add listeners for many more page classes
1.2 - 2020 February 14 - added full path preservation in redirect target
1.1 - 2019 August 9 - variable-ized the redirect URLs
1.0 - 2018 June - initial implementation

*/
