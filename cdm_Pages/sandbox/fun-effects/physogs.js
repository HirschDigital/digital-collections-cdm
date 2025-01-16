(function () {
    "use strict";
    window.onload = function () {
        physogs(); // Call the function when the page is fully loaded
    };
    function physogs() {

        // Step 1: Random Prompt Image
        const promptAnswerMap = {
            "/customizations/collection/myfirst/pages/physogs/prompt1.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes11.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose25.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth29.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution13.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt2.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes7.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose15.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth33.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution2.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt3.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes2.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose20.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth37.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution16.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt4.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes5.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose18.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth36.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution8.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt5.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes12.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose16.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth28.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution14.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt6.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes13.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose22.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth27.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution17.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt7.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes3.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose24.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth39.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution12.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt8.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes9.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose23.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth31.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution1.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt9.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes6.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose14.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth34.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution4.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt10.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes4.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose26.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth38.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution7.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt11.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes1.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose17.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth35.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution9.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt12.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes8.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose19.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth32.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution5.jpg" },
            "/customizations/collection/myfirst/pages/physogs/prompt13.jpg": { eyes: "/customizations/collection/myfirst/pages/physogs/eyes10.jpg", nose: "/customizations/collection/myfirst/pages/physogs/nose21.jpg", mouth: "/customizations/collection/myfirst/pages/physogs/mouth30.jpg", solution: "/customizations/collection/myfirst/pages/physogs/solution11.jpg" },
            // Add more mappings
        };

        const promptImages = Object.keys(promptAnswerMap);
        const randomPromptImage = promptImages[Math.floor(Math.random() * promptImages.length)];
        document.getElementById("prompt-image").src = randomPromptImage;

        const correctAnswer = promptAnswerMap[randomPromptImage];
        // Step 2: Background Selection
        const backgrounds = ["/customizations/collection/myfirst/pages/physogs/face_0001.jpg", "/customizations/collection/myfirst/pages/physogs/face_0002.jpg", "/customizations/collection/myfirst/pages/physogs/face_0003.jpg", "/customizations/collection/myfirst/pages/physogs/face_0004.jpg"];
        const backgroundsContainer = document.getElementById("backgrounds");

        backgrounds.forEach((bg) => {
            const img = document.createElement("img");
            img.src = bg;
            img.classList.add("background-option");
            img.onclick = () => selectBackground(bg);
            backgroundsContainer.appendChild(img);
        });

        function selectBackground(bg) {
            document.getElementById("background-grid").style.backgroundImage = `url(${bg})`;
        }

        // Step 3: Image Groups (eyes, Nose, Mouth)

        const eyes = Array.from({ length: 13 }, (_, i) => `/customizations/collection/myfirst/pages/physogs/eyes${i + 1}.jpg`);
        const noses = Array.from({ length: 13 }, (_, i) => `/customizations/collection/myfirst/pages/physogs/nose${i + 14}.jpg`);
        const mouths = Array.from({ length: 13 }, (_, i) => `/customizations/collection/myfirst/pages/physogs/mouth${i + 27}.jpg`);
        const eyesGroup = document.getElementById("eyes-group");
        const noseGroup = document.getElementById("nose-group");
        const mouthGroup = document.getElementById("mouth-group");

        let selectedImage = null;

        function createImageOptions(group, images) {
            images.forEach((imgSrc) => {
                // Create a container for the image
                const container = document.createElement("div");
                container.classList.add("image-container");

                const img = document.createElement("img");
                img.src = imgSrc;
                img.classList.add("image-option");
                img.onclick = () => selectImage(imgSrc);
                // Append the image to the container
                container.appendChild(img);

                // Append the container to the group
                group.appendChild(container);
            });
        }


        createImageOptions(eyesGroup, eyes);
        createImageOptions(noseGroup, noses);
        createImageOptions(mouthGroup, mouths);

        function selectImage(imgSrc) {
            selectedImage = imgSrc;
        }

        // Step 4 & 5: Place Images in Grid Cells
        const gridCells = document.querySelectorAll(".grid-cell");
        gridCells.forEach((cell) => {
            cell.onclick = () => {
                if (selectedImage) {
                    cell.style.backgroundImage = `url(${selectedImage})`;
                }
            };
        });


        // Step 6: Submit and Reveal Answer

        document.getElementById("submit").onclick = () => {
            const topCell = document.querySelector(".grid-cell[data-cell='top']").style.backgroundImage;
            const middleCell = document.querySelector(".grid-cell[data-cell='middle']").style.backgroundImage;
            const bottomCell = document.querySelector(".grid-cell[data-cell='bottom']").style.backgroundImage;

            const topMatch = topCell.includes(correctAnswer.eyes);
            const middleMatch = middleCell.includes(correctAnswer.nose);
            const bottomMatch = bottomCell.includes(correctAnswer.mouth);

            const answerElement = document.getElementById("answer");
            const correctImageElement = document.getElementById("correct-image");
            const solutionImageElement = document.getElementById("solution-image");

            if (topMatch && middleMatch && bottomMatch) {
                answerElement.innerText = "Correct! You assembled the face correctly!";
                correctImageElement.src = randomPromptImage;
                correctImageElement.style.display = "block";

                // Reveal the solution image
                solutionImageElement.src = correctAnswer.solution;
                solutionImageElement.style.display = "block";
            } else {
                answerElement.innerText = "Incorrect! Try again.";
                correctImageElement.style.display = "none";
                solutionImageElement.style.display = "none";
            }
            answerElement.style.display = "block";
        };
        // Step 7: Reveal Answer Button
        const revealButton = document.createElement("button");
        revealButton.id = "reveal-answer";
        revealButton.innerText = "Reveal Answer";
        document.body.appendChild(revealButton);

        revealButton.onclick = () => {
            const solutionImageElement = document.getElementById("solution-image");
            solutionImageElement.src = correctAnswer.solution;
            solutionImageElement.style.display = "block";
        };

    }

    document.addEventListener('cdm-custom-page:ready', physogs);
    document.addEventListener('cdm-custom-page:update', physogs);
})();