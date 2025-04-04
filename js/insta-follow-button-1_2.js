        (function () {
            'use strict';

        function insertInstagramBadge(instagramHandle) {
    // Avoid inserting multiple times
    if (document.querySelector('.insta-badge')) return;

        const badgeContainer = document.createElement('div');
        badgeContainer.className = 'insta-badge';
        badgeContainer.innerHTML = `
        <style>
            .insta-badge {
                margin - top: 1em;
            text-align: center;
}

            .insta-badge-link {
                display: inline-flex;
            align-items: center;
            gap: 8px;
            background-color: #E1306C;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            text-decoration: none;
            font-family: Arial, sans-serif;
            font-weight: bold;
            transition: background-color 0.3s;
}

            .insta-badge-link:hover {
                background - color: #C72C5D;
}
        </style>
        <a href="https://www.instagram.com/${instagramHandle}" target="_blank" rel="noopener noreferrer" class="insta-badge-link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.305.975.975 1.243 2.242 1.305 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.33 2.633-1.305 3.608-.975.975-2.242 1.243-3.608 1.305-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.33-3.608-1.305-.975-.975-1.243-2.242-1.305-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.062-1.366.33-2.633 1.305-3.608C4.513 2.563 5.78 2.295 7.146 2.233 8.412 2.175 8.792 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.62.354 3.635 1.34c-.985.985-1.209 2.136-1.268 3.417C2.013 6.04 2 6.45 2 9.709v4.582c0 3.259.013 3.669.072 4.949.059 1.281.283 2.432 1.268 3.417.985.985 2.136 1.209 3.417 1.268 1.28.059 1.689.072 4.949.072s3.669-.013 4.949-.072c1.281-.059 2.432-.283 3.417-1.268.985-.985 1.209-2.136 1.268-3.417.059-1.28.072-1.689.072-4.949V9.709c0-3.259-.013-3.669-.072-4.949-.059-1.281-.283-2.432-1.268-3.417C20.38.354 19.229.131 17.948.072 16.668.013 16.259 0 12 0z" />
                <path d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.167 6.167 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 16 12a3.999 3.999 0 0 1-4 4z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
            </svg>
            <span>Follow us on Instagram</span>
        </a>
        `;

    // Append to each footer
    Array.from(document.querySelectorAll('.Footer-footerContainer')).forEach(el => {
            el.appendChild(badgeContainer.cloneNode(true));
    });
  }

        const instagramHandle = 'mfah_librariesarchives';

        // Run on specific events
        [
        'cdm-home-page:ready','cdm-about-page:ready','cdm-login-page:ready',
        'cdm-collection-landing-page:ready','cdm-item-page:ready','cdm-custom-page:ready',
        'cdm-search-page:ready','cdm-collection-search-page','cdm-advanced-search-page:ready',
        'cdm-saved-items-page:ready','cdm-shared-items-page'
  ].forEach(event => {
            document.addEventListener(event, () => insertInstagramBadge(instagramHandle));
  });
})();
