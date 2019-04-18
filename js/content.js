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
    let projectToShow = document.getElementById("project" + selectedProject);
    let arrowIndex = (selectedProject < 3) ? projectToShow.childElementCount - 1 : 0;

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
            arrowIndex = (currentShowingProject < 3) ? currentlyShowing.childElementCount - 1 : 0;

            currentlyShowing.style.margin = "20px 0";
            currentlyShowing.children[arrowIndex].style.display = "none";
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

    //slides[slideIndex - 1].style.display = "block";
}
