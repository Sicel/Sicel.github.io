"use strict";

let project1Images = [];
let project2Images = [];
let project3Images = [];
let project4Images = [];
let projectImages = [project1Images, project2Images, project3Images, project4Images];

//for (int i = 1; i == 4; i++) {
//$.get('../img/project-images/project'+i, function (data) {
$.get('../txt/', function (data) {
    console.log(data);
    $(data).find("a:contains('.txt'), a:contains('.jk')").each(function () {
        console.log($(this).attr("href"));
    });
});
//}

function setImages() {
    let slideshowContainers = document.getElementsByClassName("slideshowContainer");
    for (let i = 0; i < projectImages.length; i++) {
        let prevButton = slideshowContainers[i].children[0];
        projectImages[i].forEach(function (image, index) {
            let myImages = document.createElement("div");
            myImages.setAttribute("class", "myImages" + i + " fade");

            let numberText = document.createElement("div");
            numberText.setAttribute("class", "numberText");
            numberText.innerHTML = index + " / " + projectImages[i].length;

            let image = document.createElement("img");
            image.setAttribute("src", projectImages[i][index]);
            image.setAttribute("class", "slideshowImages");

            let caption = document.createElement("div");
            caption.setAttribute("class", "imageCaption");

            myImages.appendChild(numberText);
            myImages.appendChild(image);
            myImages.appendChild(caption);

            slideshowContainers[i].insertBefore(myImages, prevButton);
        })
    }
}
