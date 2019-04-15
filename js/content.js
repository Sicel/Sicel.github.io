"use strict";

let divCreated = false;
let resumeShowing = false;

let fullInfo;
let fullInfoShowing = false;
let currentShowingProject;

let displayArrow;
let degree = 90;
let resume;

let slideIndex = 1;
// After page has loaded
$(document).ready(function () {
    fullInfo = document.getElementById("fullInfo");
    resume = document.getElementById("resume");
    displayArrow = document.getElementById("arrow");
    showSlides(slideIndex);
});

// Displays full info of selected project
function showFullInfo(selectedProject) {
    let arrowIndex = (selectedProject < 3) ? 2 : 0;
    let projectToShow = document.getElementById("project" + selectedProject);

    if (!fullInfoShowing) {
        fullInfo.style.display = "block";
        fullInfoShowing = true;
        projectToShow.children[arrowIndex].style.display = "block";
    } else {
        let currentlyShowing = document.getElementById("project" + currentShowingProject);

        if (currentShowingProject == selectedProject) {
            fullInfo.style.display = "none";
            fullInfoShowing = false;
            projectToShow.children[arrowIndex].style.display = "none";
            projectToShow.style.margin = "20px 0";
            return;
        } else {
            let index = (currentShowingProject < 3) ? 2 : 0;

            currentlyShowing.style.margin = "20px 0";
            currentlyShowing.children[index].style.display = "none";
        }
    }
    currentShowingProject = selectedProject;
    updateFullInfo();
}

function updateFullInfo() {
    let index = (currentShowingProject < 3) ? 1 : 2;
    let arrowIndex = (index == 1) ? 2 : 0;
    let selectedProject = document.getElementById("project" + currentShowingProject);

    if (currentShowingProject < 3) {
        selectedProject.style.marginBottom = "0";
    } else {
        selectedProject.style.marginTop = "0";
    }

    selectedProject.children[arrowIndex].style.display = "block";
    document.getElementById("titleInFull").innerHTML = selectedProject.children[index].innerHTML;
}

// Animates resume
function displayResume() {
    let animation = setInterval(rotateArrow, 7)

    if (!resumeShowing) {
        resume.style.display = "block";
        $("#resume").toggle(500);
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


function nextSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("myImages");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}
