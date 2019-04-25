"use strict";

let divCreated = false;
let resumeShowing = false;

let fullInfo;
let fullInfoShowing = false;
let currentShowingProject;

let displayArrow;
let degree = 90;
let resume;

let slideIndex = [1, 1, 1, 1];
let slideId = ["myImages1", "myImages2", "myImages3", "myImages4"];

// After page has loaded
$(document).ready(function () {
    fullInfo = document.getElementById("fullInfo");
    resume = document.getElementById("resume");
    displayArrow = document.getElementById("arrow");
});

// Displays full info of selected project
function showFullInfo(selectedProject) {
    debugger;
    let projectToShow = document.getElementById("project" + selectedProject);
    let arrowIndex = (selectedProject < 3) ? projectToShow.childElementCount - 1 : 0;

    if (!fullInfoShowing) {
        fullInfo.style.display = "block";
        fullInfoShowing = true;
        projectToShow.children[arrowIndex].style.display = "block";
        slideshowContainers[selectedProject - 1].style.display = "block";
    } else {
        let currentlyShowing = document.getElementById("project" + currentShowingProject);

        if (currentShowingProject == selectedProject) {
            fullInfo.style.display = "none";
            fullInfoShowing = false;
            projectToShow.children[arrowIndex].style.display = "none";
            slideshowContainers[selectedProject - 1].style.display = "none";

            if (selectedProject - 1 == 0) {
                projectToShow.style.margin = "34px 0 0";
            } else {
                projectToShow.style.margin = "20px 0";
            }
            return;
        } else {
            arrowIndex = (currentShowingProject < 3) ? currentlyShowing.childElementCount - 1 : 0;

            if (currentShowingProject - 1 == 0) {
                currentlyShowing.style.margin = "34px 0 0";
            } else {
                currentlyShowing.style.margin = "20px 0";
            }
            currentlyShowing.children[arrowIndex].style.display = "none";
            slideshowContainers[currentShowingProject - 1].style.display = "none";
            slideshowContainers[selectedProject - 1].style.display = "block";
        }
    }
    currentShowingProject = selectedProject;
    updateFullInfo();
}

function updateFullInfo() {
    let selectedProject = document.getElementById("project" + currentShowingProject);
    let index = (currentShowingProject < 3) ? 1 : 2;
    let sumIndex = (index == 1) ? 2 : 3;

    if (currentShowingProject < 3) {
        selectedProject.style.marginBottom = "0";
        selectedProject.lastElementChild.style.display = "block";
    } else {
        selectedProject.style.marginTop = "0";
        selectedProject.firstElementChild.style.display = "block";
    }

    document.getElementById("titleInFull").innerHTML = selectedProject.children[index].innerHTML;
    document.getElementById("projectSummary").firstElementChild.innerHTML = selectedProject.children[sumIndex].innerHTML;
    showSlides(1, currentShowingProject - 1);
}

// Animates resume
function displayResume() {
    let animation = setInterval(rotateArrow, 7)

    if (!resumeShowing) {
        $("#resume").toggle(500);
        resume.style.display = "block";
        resumeShowing = true;
    } else {
        $("#resume").toggle(500);
        resumeShowing = false;
    }

    function rotateArrow() {
        if (!resumeShowing) {
            if (degree == 180) {
                clearInterval(animation);
            } else {
                degree++;
                displayArrow.style.transform = `rotate(${degree}deg)`;
            }
        } else {
            if (degree == 90) {
                clearInterval(animation);
            } else {
                degree--;
                displayArrow.style.transform = `rotate(${degree}deg)`;
            }
        }
    }
}




function nextSlide(n, no) {
    showSlides(slideIndex[no] += n, no);
}

function currentSlide(n, no) {
    showSlides(slideIndex = n);
}

function showSlides(n, no) {
    debugger;
    let slides = document.getElementsByClassName(slideId[no]);

    if (n > slides.length) {
        slideIndex[no] = 1;
    }
    if (n < 1) {
        slideIndex[no] = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex[no] - 1].style.display = "block";
}
