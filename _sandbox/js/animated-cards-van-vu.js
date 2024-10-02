(function (){
  'use strict';

  /* =====================

  To prepare your home page for this recipe, upload square images for each collection homepage thumbnail within the
  Website Configuration Tool (Collection Settings > Page Types > Landing Page).

  To avoid pixelation only upload images 300x300 pixels or larger.

  ===================== */

  const restructure = function(cardArray) {
      //create new div for animated cards & fill it
      let cardsOnly = document.createElement("div");
      cardsOnly.classList.add("cardsOnly");
      cardArray.forEach(function(card) {
          //remove old classes to prevent unwanted css
          card.classList.remove('col-sm-6');
          card.classList.remove('Card-cardcontainer');
          card.classList.remove('cdm-collection-card');
          card.classList.add('cdm-animated-card');
          let anchor = card.childNodes[0];
          let imageHolder = card.childNodes[0].childNodes[0].childNodes[0]
              //imageHolder.firstChild = <img src="link" alt="text">
          let titleDiv = card.childNodes[0].childNodes[0].childNodes[1].childNodes[0]
              //titleDiv.firstChild = <h2>title</h2>
          let descriptionDiv = card.childNodes[0].childNodes[0].childNodes[1].childNodes[1]
              //descriptionDiv.firstChild = <p>description</p>
          //grab domain
          let domain = window.location.origin;
          //remove children to clean the div
          card.removeChild(anchor);
          //clone anchor for its attributes but remove children and classes
          anchor.removeChild(anchor.firstChild);
          anchor.classList.remove("Card-fullcard");
          anchor.classList.remove("shared-box");

          //create title & append to card
          let cardTitle = document.createElement("div");
          cardTitle.classList.add("cardTitle");
          let titleAnchor = anchor.cloneNode(true);
          titleAnchor.innerText = "";
          titleAnchor.classList.add("titleAnchor");
          let h2Title = document.createElement("h2");
          h2Title.innerText = titleDiv.innerText;
          h2Title.classList.add("cardHeader");
          titleAnchor.appendChild(h2Title);
          cardTitle.appendChild(titleAnchor);
          card.appendChild(cardTitle);

          //create img and append to card
          let bgImage = document.createElement("img");
          bgImage.classList.add("cardImage");
          //grab original source and extract the alias
          let ogSource = imageHolder.firstChild.getAttribute("src");
          let endIndex = ogSource.lastIndexOf('/thumbnail');
          let alias = ogSource.slice(15,endIndex);
          //use the alias to grab the collection homepage landing image
          let configSource = domain + "/customizations/collection/" + alias + "/" + alias + "Configs.ini";
          let imgSourceStart = domain + "/customizations/collection/" + alias + "/";

          const request = async () => {
              const response = await fetch(configSource);
              const text = await response.text();
              let index = text.indexOf('uploadCollectionHomepageImage = ');
              //start after first quotation mark
              let startPoint = index + 33;
              //find index of next quotation mark a.k.a. end of collection image string
              let realendIndex = text.indexOf("\"", startPoint);
              //slice our text to remove the collection image string, excluding quotes
              let endString = text.slice(startPoint, realendIndex);
              //append our extracted string to the first half of our to-be image source attribute
              imgSourceStart += endString;
              if(endString.length > 1) {
                  bgImage.setAttribute("src", imgSourceStart);
              } else {
                  bgImage.setAttribute("src", imageHolder.firstChild.getAttribute("src"));
              }
              //set the landing image source equal to the new thumbnail source, keep the alt the same.
              bgImage.setAttribute("alt", imageHolder.firstChild.getAttribute("alt"));

          }
          request();
          card.appendChild(bgImage);

          //create description div
          let cardDescriptionDiv = document.createElement("div");
          cardDescriptionDiv.classList.add("cardDescriptionDiv")
          let cardDescriptionText = document.createElement("div");
          cardDescriptionText.classList.add("cardDescriptionText");

          //create icon
          let icon = document.createElement("i");
          icon.classList.add("fa");
          icon.classList.add("fa-angle-double-right");

          let cardLink = anchor.cloneNode(true);
          cardLink.classList.add("cardLink");
          let cardIconLink = anchor.cloneNode(true);
          cardIconLink.classList.add('cardIconLink');
          cardIconLink.setAttribute("tabindex", "-1");
          cardIconLink.appendChild(icon);

          //set anchor text to original description
          cardLink.innerText = descriptionDiv.firstChild.innerText;
          //append to Text div
          cardDescriptionText.appendChild(cardLink);
          //append Text div to description div
          cardDescriptionDiv.appendChild(cardDescriptionText);
          //append icon as 2nd child to description div
          cardDescriptionDiv.appendChild(cardIconLink);
          //append description div to card
          card.appendChild(cardDescriptionDiv);
          //append the card to cardsOnly div
          cardsOnly.appendChild(card);
      })
      return cardsOnly;
  }

  const finalize = function(oldTopDiv, cardsOnly) {
      //insert before bottom paginator
      oldTopDiv.insertBefore(cardsOnly, oldTopDiv.lastChild);
      //hide all the original cards
      let oldCards = oldTopDiv.querySelectorAll('.cdm-collection-card');
      oldCards.forEach(function(card) {
          card.setAttribute("style", "display: none;");
      });
  }


  document.addEventListener('cdm-home-page:ready', function(){
      //grab the container for everything we need
      let oldTopDiv = document.querySelector('.CardWrapper-cardscontainer').childNodes[0];
      //deep clone it, leaving the original data in-tact
      let topDiv = oldTopDiv.cloneNode(true);
      //grab cloned cards for modification
      let cardArray = topDiv.querySelectorAll('.Card-cardcontainer');

      let cardsOnly = restructure(cardArray);
      finalize(oldTopDiv, cardsOnly);
  });

  document.addEventListener('cdm-home-page:update', function(){
      let oldTopDiv = document.querySelector('.CardWrapper-cardscontainer').childNodes[0];
      //remove old set of animated cards.
      oldTopDiv.removeChild(oldTopDiv.lastChild.previousSibling);
      //deep clone cards leaving the original data in-tact
      let topDiv = oldTopDiv.cloneNode(true);
      //grab cloned cards for modification
      let cardArray = topDiv.querySelectorAll('.Card-cardcontainer');

      let cardsOnly = restructure(cardArray);
      finalize(oldTopDiv, cardsOnly);
      let allNewCards = document.querySelectorAll('.cdm-animated-card');
      allNewCards.forEach(function(card) {
          card.setAttribute("style", "display: inline;");
      });
  });

  document.addEventListener('cdm-home-page:leave', function() {
      let oldTopDiv = document.querySelector('.CardWrapper-cardscontainer').childNodes[0];
      //remove animated cards on leave
      oldTopDiv.removeChild(oldTopDiv.lastChild.previousSibling);
      //remove style attribute from original cards (reset display)
      cardsArray = document.querySelectorAll('.cdm-collection-card');
      cardsArray.forEach(card => {card.removeAttribute("style");});
  });

})();

/* version history

1.1 - 2021 Aug 03 - fix domain handling for new React; wrap entire script as IIFE to improve portability
1.0 - 2020 May - initial implementation

*/
