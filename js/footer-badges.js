(function () {
    'use strict';

    function insertBadges(instagramHandle, mailtoAddress) {
        // Avoid inserting multiple times
        if (document.querySelector('.badge-container')) return;

        const container = document.createElement('div');
        container.className = 'badge-container';
        container.innerHTML = `
        <style>
            .badge-container {
                text-align: center;
            }

            .badge-wrapper {
                display: inline-flex;
                gap: 16px;
                flex-wrap: wrap;
                justify-content: center;
            }

            .badge-link {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background-color: rgb(216, 216, 216);
                color: white;
                padding: 10px 16px;
                border-radius: 8px;
                text-decoration: none;
                font-family: Arial, sans-serif;
                font-weight: bold;
                transition: background-color 0.3s;
            }

            .badge-link:hover {
                background-color: #ffffff;
                color: black;
            }

            .badge-link img {
                height: 24px;
                width: auto;
            }
        </style>
        <div class="badge-wrapper">
            <a href="https://www.instagram.com/${instagramHandle}" target="_blank" rel="noopener noreferrer" class="badge-link">
                <img src="/customizations/global/pages/images/insta.png" alt="Instagram logo">
                <span>Follow us on Instagram</span>
            </a>
            <a href="mailto:${mailtoAddress}" target="_blank" rel="noopener noreferrer" class="badge-link">
                <img src="/customizations/global/pages/images/mailto.png" alt="Contact logo">
                <span>Contact us</span>
            </a>
        </div>`;

        Array.from(document.querySelectorAll('.Footer-footerContainer')).forEach(el => {
            el.appendChild(container.cloneNode(true));
        });
    }

    const instagramHandle = 'mfah_librariesarchives';
    const mailtoAddress = 'slong@mfah.org';

    const events = [
        'cdm-home-page:ready', 'cdm-about-page:ready', 'cdm-login-page:ready',
        'cdm-collection-landing-page:ready', 'cdm-item-page:ready', 'cdm-custom-page:ready',
        'cdm-search-page:ready', 'cdm-collection-search-page', 'cdm-advanced-search-page:ready',
        'cdm-saved-items-page:ready', 'cdm-shared-items-page'
    ];

    events.forEach(event => {
        document.addEventListener(event, () => insertBadges(instagramHandle, mailtoAddress));
    });

})();
