"use strict";

let divCreated = false;
let resumeShowing = false;

let fullInfo;
let fullInfoShowing = false;
let currentShowingProject;

let arrows = ["#arrow1", "#arrow2", "#arrow3", "#arrow4"];

let resumeArrow;
let resume;

let slideIndex = [1, 1, 1, 1];
let slideId = ["myImages1", "myImages2", "myImages3", "myImages4"];

// After page has loaded
window.onload = init;

function init() {
    setImages();
    let currentProject;
    fullInfo = document.querySelector("#fullInfo");
    resume = document.querySelector("#resume");
    resumeArrow = document.querySelector("#resumeArrow");

    for (let i = 1; i <= 4; i++) {
        currentProject = document.querySelector("#project" + i);
        currentProject.onclick = _ => showFullInfo(i);
    }

    document.querySelector("#resumeTitle").onclick = displayResume;
}

// Displays full info of selected project
function showFullInfo(selectedProject) {
    let projectToShow = document.querySelector("#project" + selectedProject);

    if (!fullInfoShowing) {
        fullInfo.style.display = "block";
        fullInfoShowing = true;
        document.querySelector(arrows[selectedProject - 1]).style.visibility = "visible";
        slideshowContainers[selectedProject - 1].style.display = "block";
    } else {
        let currentlyShowing = document.querySelector("#project" + currentShowingProject);

        if (currentShowingProject == selectedProject) {
            fullInfo.style.display = "none";
            fullInfoShowing = false;
            document.querySelector(arrows[selectedProject - 1]).style.visibility = "hidden";
            slideshowContainers[selectedProject - 1].style.display = "none";

            projectToShow.style.margin = "20px 0";

            return;
        } else {
            currentlyShowing.style.margin = "20px 0";
            document.querySelector(arrows[currentShowingProject - 1]).style.visibility = "hidden";
            slideshowContainers[currentShowingProject - 1].style.display = "none";
            slideshowContainers[selectedProject - 1].style.display = "block";
        }
    }
    currentShowingProject = selectedProject;
    updateFullInfo();
}

function updateFullInfo() {
    let selectedProject = document.querySelector("#project" + currentShowingProject);
    let responsibilities = document.querySelector("#fullText").getElementsByClassName("myResponsibilities")[0];
    let tech = document.querySelector("#fullText").getElementsByClassName("techUsed")[0];

    if (currentShowingProject < 3) {
        selectedProject.style.marginBottom = "0";
    } else {
        selectedProject.style.marginTop = "0";
    }

    document.querySelector(arrows[currentShowingProject - 1]).style.visibility = "visible";
    responsibilities.innerHTML = "Responsibilities:";
    tech.innerHTML = "Tech Used:"
    document.querySelector("#titleInFull").innerHTML = selectedProject.children[1].innerHTML;
    document.querySelector("#projectSummary").firstElementChild.innerHTML = selectedProject.children[2].innerHTML;
    responsibilities.innerHTML += selectedProject.getElementsByClassName("myResponsibilities")[0].innerHTML;
    tech.innerHTML += selectedProject.getElementsByClassName("techUsed")[0].innerHTML;
    showSlides(1, currentShowingProject - 1);

}

// Animates resume
function displayResume() {
    let degree;
    resumeShowing = !resumeShowing;
    $("#resume").toggle(500);

    if (!resumeShowing) {
        degree = 90;
    } else {
        degree = 180;
    }

    resumeArrow.style.transform = `rotate(${degree}deg)`;
}

function nextSlide(n, no) {
    showSlides(slideIndex[no] += n, no);
}

function currentSlide(n, no) {
    showSlides(slideIndex = n);
}

function showSlides(n, no) {
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
