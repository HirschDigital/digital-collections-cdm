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
            background-color:rgb(255, 212, 184);
            color: white;
            padding: 10px 16px;
            margin-top: 10px;
            border-radius: 8px;
            border: 5px;
            border-color; #767676
            text-decoration: none;
            font-family: Arial, sans-serif;
            font-weight: bold;
            transition: background-color 0.3s;
}

            .insta-badge-link:hover {
                background - color: #ffffff;
}
        </style>
        <a href="https://www.instagram.com/${instagramHandle}" target="_blank" rel="noopener noreferrer" class="insta-badge-link">
<img src="/customizations/global/pages/images/insta.png" alt="Instagram logo">
            <span>Follow us on Instagram</span>
        </a>`;

        // Append to each footer
        Array.from(document.querySelectorAll('.Footer-footerContainer')).forEach(el => {
            el.appendChild(badgeContainer.cloneNode(true));
        });
    }

    const instagramHandle = 'mfah_librariesarchives';

    // Run on specific events
    [
        'cdm-home-page:ready', 'cdm-about-page:ready', 'cdm-login-page:ready',
        'cdm-collection-landing-page:ready', 'cdm-item-page:ready', 'cdm-custom-page:ready',
        'cdm-search-page:ready', 'cdm-collection-search-page', 'cdm-advanced-search-page:ready',
        'cdm-saved-items-page:ready', 'cdm-shared-items-page'
    ].forEach(event => {
        document.addEventListener(event, () => insertInstagramBadge(instagramHandle));
    });


    function insertMailtoBadge (){
        // Avoid inserting multiple times
        if (document.querySelector('.mailto-badge')) return;

        const badge2Container = document.createElement('div');
        badge2Container.className = 'mailto-badge';
        badge2Container.innerHTML = `
        <style>
            .mailto-badge {
                margin - top: 1em;
            text-align: center;
}

            .mailto-badge-link {
                display: inline-flex;
            align-items: center;
            gap: 8px;
            background-color:rgb(255, 212, 184);
            color: white;
            padding: 10px 16px;
            margin-top: 10px;
            border-radius: 8px;
            border: 5px;
            border-color; #767676
            text-decoration: none;
            font-family: Arial, sans-serif;
            font-weight: bold;
            transition: background-color 0.3s;
}

            .insta-badge-link:hover {
                background - color: #ffffff;
}
        </style>
        <a href="mailto:slong@mfah.org" target="_blank" rel="noopener noreferrer" class="mailto-badge-link">
        <img src="/customizations/global/pages/images/mailto.png" alt="contact logo">
        <span>Contact us</span></a> `;

        // Append to each footer
        Array.from(document.querySelectorAll('.Footer-footerContainer')).forEach(el => {
            el.appendChild(badge2Container.cloneNode(true));
        });
    }

    // Run on specific events
    [
        'cdm-home-page:ready', 'cdm-about-page:ready', 'cdm-login-page:ready',
        'cdm-collection-landing-page:ready', 'cdm-item-page:ready', 'cdm-custom-page:ready',
        'cdm-search-page:ready', 'cdm-collection-search-page', 'cdm-advanced-search-page:ready',
        'cdm-saved-items-page:ready', 'cdm-shared-items-page'
    ].forEach(event => {
        document.addEventListener(event, () => insertMailtoBadge);
    });
})();
