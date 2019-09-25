"use strict";

let project1Images = [];
let project2Images = [];
let project3Images = [];
let project4Images = [];
let projectImages = [project1Images, project2Images, project3Images, project4Images];
let slideshowContainers;

let project1Captions = [];
let project2Captions = [];
let project3Captions = [];
let project4Captions = [];
let projectCaptions = [project1Captions, project2Captions, project3Captions, project4Captions];

for (let i = 1; i <= 4; i++) {
    $.get('txt/project' + i + '.txt', function (data) {
        data.split("\n").forEach(function (imgLink) {
            projectImages[i - 1].push(imgLink);
            console.log(imgLink);
        });
    });

    $.get('/img/project-images/project' + i + '/Captions.txt', function (data) {
        data.split("\n").forEach(function (sentence) {
            projectCaptions[i - 1].push(sentence);
        });
    });
}

$(document).ready(function () {
    slideshowContainers = document.getElementsByClassName("slideshowContainer");
});

function setImages() {
    for (let i = 0; i < projectImages.length; i++) {
        let prevButton = slideshowContainers[i].children[0];
        if (projectImages[i].length == 0) {
            continue;
        }
        projectImages[i].forEach(function (pic, index) {
            let myImages = document.createElement("div");
            myImages.setAttribute("class", "myImages" + (i + 1) + " fade");

            let numberText = document.createElement("div");
            numberText.setAttribute("class", "numberText");
            numberText.innerHTML = (index + 1) + " / " + projectImages[i].length;

            let image = document.createElement("img");
            image.setAttribute("src", projectImages[i][index]);
            image.setAttribute("class", "slideshowImages");

            let caption = document.createElement("div");
            caption.setAttribute("class", "imageCaption");
            caption.innerHTML = projectCaptions[i][index];

            myImages.appendChild(numberText);
            myImages.appendChild(image);
            myImages.appendChild(caption);

            slideshowContainers[i].insertBefore(myImages, prevButton);
        })
    }
}
