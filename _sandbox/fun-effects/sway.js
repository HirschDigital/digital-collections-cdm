
(function () {
    "use strict";
    function hoversway() {
        window.onload = () => {
            function split(str) {
                let array = str.split(",");
                array[0] = parseFloat(array[0]);
                array[1] = parseFloat(array[1]);
                return array;
            }
            function animStart(evt) {
                let elem = evt.target;
                if (elem.classList && elem.classList.contains("active") == false) {
                    elem.classList.add("active");
                    let durations = split(
                        window.getComputedStyle(elem).getPropertyValue("animation-duration")
                    );
                    let delays = split(
                        window.getComputedStyle(elem).getPropertyValue("animation-delay")
                    );

                    let time = (delays[1] + durations[1]) * 1000;
                    setTimeout(() => {
                        animEnd(elem);
                    }, time);
                }
            }
            function animEnd(elem) {
                elem.classList.remove("active");
                elem.offsetWidth;
            }
            function init() {
                const items = document.querySelectorAll("#gallery figure");
                items.forEach((item, index) => {
                    //
                    item.addEventListener("pointerenter", animStart);
                    item.addEventListener("pointerdown", animStart);
                    item.addEventListener("pointermove", animStart);
                    //
                    let img = item.dataset.img;
                    if (img) {
                        var backgroundImage = window
                            .getComputedStyle(item)
                            .getPropertyValue("background-image");
                        item.style.backgroundImage =
                            "url( " + img + " )" + "," + backgroundImage;
                    } else {
                        item.style.backgroundBlendMode = "none";
                        let e = new Event("pointerenter");
                        item.dispatchEvent(e);
                    }
                });
            }
            init();
        }
    };
    document.addEventListener('cdm-custom-page:ready', hoversway);
})();
