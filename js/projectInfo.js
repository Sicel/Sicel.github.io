'use strict';

export let projectMinis = [
    {
        i: 0,
        src: "img/project-images/project1/SquareUp_1.png",
        name: "Square Up",
        tagline: "Small rhythm game made for PennApps XXI hackathon.",
        year: 2020
    },
    {
        i: 1,
        src: "img/project-images/project2/TEIN_1.png",
        name: "The End Is Near!",
        tagline: "It's a lovely day for an apocalypse.",
        year: 2019
    },
    {
        i: 2,
        src: "img/project-images/project3/Procastination_1.png",
        name: "Procrastination",
        tagline: "Working? Imagine that.",
        year: 2018
    },
    {
        i: 3,
        src: "img/project-images/project4/AudioRun_1.png",
        name: "AudioRun",
        tagline: "Music's going, and you should too.",
        year: 2018
    }
]

export let projectPages = [
    {
        download: true,
        downloadLink: "https://drive.google.com/uc?export=download&id=1CyL31CeCQRC6WiG72YmGi1hdm_OE9VlI",
        embed: true,
        embedInfo: {
            html: `<iframe width="768" height="543" src="https://www.youtube.com/embed/zvmQK31jiic" frameborder="0" allowfullscreen></iframe>`,
            text: "Short Gameplay Video\nBe warned there are rapid flashing colors"
        },
        description: "Small rhythm game made for PennApps XXI hackathon. As the theme was music, I went with a little more obvious but, for, ambitious as beat detection was something that I had never worked with before.",
        responsibilities: [{
                main: "Beat Detection",
                details: [
                    "Implementation and customization of some sort of beat detection system",
                    "Connecting system with interface to allow color switching and object spawning"
                ]
            }, {
                main: "Local Storage",
                details: [
                    "Keeping track of score between sessions"
                ]
            }
        ],
        techUsed: [{
            main: "Unity",
            details: null
        }],
        images: [{
            src: "img/project-images/project1/SquareUp_1.png",
            subtitle: "Main Menu\nThe checkbox disables color switching on the beat determines when the background color should change."
        },{
            src: "img/project-images/project1/SquareUp_2.png",
            subtitle: "Result Screen\nYour high score is saved between runs"
        },{
            src: "img/project-images/project1/SquareUp_3.png",
            subtitle: "In Game\nScore is determined by the size of the square when clicked"
        },{
            src: "img/project-images/project1/SquareUp_4.png",
            subtitle: "Instructions"
        }]
    },
    {
        download: false,
        downloadLink: "",
        embed: false,
        embedInfo: {
            html: ``,
            text: ""
        },
        description: "This game started with a group friends where your goal is to start an apocalypse by doing various tasks around your town. I was in charge of creating the system that streamlined the implementation process for the various tasks. Unfortunately this project has been abandoned.",
        responsibilities: [{
            main: "Event System",
            details: [
                "Customizable progression system built with events",
                "Created visual editor for faster and easier editing and use"
            ]
        },{
            main: "Menu UI",
            details: ["Scalable and dynamic menus"]
        }],
        techUsed: [{
            main: "Unity",
            details: [
                "Custom Editor Windows",
                "Scriptable Objects"
            ]
        }],
        images: [{
            src: "img/project-images/project2/TEIN_1.png",
            subtitle: "Main Menu"
        },{
            src: "img/project-images/project2/TEIN_2.png",
            subtitle: "Plaza\nControls shown so the player learns in the moment"
        },{
            src: "img/project-images/project2/TEIN_3.png",
            subtitle: "In Front of the Clinic\nThe town has many fun locals to visit."
        },{
            src: "img/project-images/project2/TEIN_4.png",
            subtitle: "Town Progress Screen\nShows all the currently available tasks the player can do as well as the ones completed."
        },{
            src: "img/project-images/project2/TEIN_5.png",
            subtitle: "Location Event\nEach building has a set of events that effect the player's stats"
        }]
    },
    {
        download: false,
        downloadLink: "",
        embed: true,
        embedInfo: {
            html: `<iframe width="768" height="543" src="https://www.youtube.com/embed/ZfL3Q50-KPk" frameborder="0" allowfullscreen></iframe>`,
            text: "Short gameplay video courtesy of my teammate, Kayleigh East."
        },
        description: "Game made for a Game Jam hosted by the RIT Game Dev Club where the theme was \"Everyday Tasks.\" My team decided to make a game where you avoid doing everyday tasks and procrastinate instead. As this was my first none academic game that I liked, I decided continue working on it in my spare time. The node editor is something that was made after the game jam to make things easier for the future.",
        responsibilities: [{
            main: "Dialogue System",
            details: [
                "Allows player to talk to different objects",
                "Allow the player to make choices",
                "Branching dialogue paths"
            ]
        },{
            main: "Dialogue Node Editor",
            details: ["Visual tool that used for dialogue implementation"]
        }],
        techUsed: [{
            main: "Unity",
            details: [
                "Custom Editors",
                "Custom Editor Window",
                "Manual Serialization",
                "Scriptable Objects"
            ]
        }],
        images: [{
            src: "img/project-images/project3/Procastination_1.png",
            subtitle: ""
        },{
            src: "img/project-images/project3/Procastination_2.png",
            subtitle: ""
        },{
            src: "img/project-images/project3/Procastination_3.png",
            subtitle: ""
        },{
            src: "img/project-images/project3/Procastination_4.png",
            subtitle: ""
        },]
    },
    {
        download: true,
        downloadLink: "https://sicel.github.io/audiorun.html",
        embed: true,
        embedInfo: {
            html: ``,
            text: "",
            src: "img/project-images/project4/AudioRun_Demo.mp4"
        },
        description: "Endless runner game made using JavaScript for web dev class. The game was made using the 2D library PixiJS for the visuals and SoundJS for audio. Aside from the parallax backgrounds, all of the assets were done by me. ",
        responsibilities: [{
            main: "Entire Game",
            details: [
                "Creating and importing art and music assets",
                "Implementing game mechanics such as gravity and ground collision"
            ]
        }],
        techUsed: [{
            main: "JavaScript",
            details: [
                "PixiJS",
                "SoundJS"
            ]
        },{
            main: "Piskel",
            details: []
        }],
        images: [{
            src: "img/project-images/project4/AudioRun_1.png",
            subtitle: "Title/Main Menu"
        },{
            src: "img/project-images/project4/AudioRun_2.png",
            subtitle: "Game Over\nDisplays the time lasted and gives the option to play again or return to main menu"
        },{
            src: "img/project-images/project4/AudioRun_3.png",
            subtitle: "In-game screen cap"
        }]
    }
]