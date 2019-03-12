"use strict";

let divCreated = false;
let resumeShowing = false;
let displayArrow;
let degree = 90;
let resume;

$(document).ready(function () {
    $(".project").click(function (event) {
        //createDiv(event.target);
    })
    resume = document.getElementById("resume");
    displayArrow = document.getElementById("arrow");
    displayResume();
});

function createDiv(element) {
    let projectInfo = document.createElement("div");
    let currentRow = $(element).parent();
    projectInfo.setAttribute("class", "container");
    projectInfo.style.height = "400px";
    currentRow.after(projectInfo);
}

function displayResume() {
    $("#resumetitle").click(function () {
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
    })
}
