'use strict'
import {
    projectMinis,
    projectPages
} from '../js/projectInfo.js';

let nm, hm, pm, ppm, cm;
let body;

/*
const app = Vue.createApp({
    data() {
        return {
            // Header
            scrollCheckPoint: 400,
            currentScroll: 0,
            opacity: 1,
            element: undefined,

            // Projects
            projects: null,
            selectedProject: { },
            scrollPos: 0,

            // Project Page
            //selectedProject: { },
            show: false,
            scrollPos: 0
        }
    },
    mounted() {
        // Header
        this.element = document.querySelector('#headerContent');
        window.addEventListener("scroll", this.slideFade);
    },
    methids: {
        // Header
        slideFade(event) {
            this.currentScroll = window.pageYOffset;
            if (this.currentScroll <= this.scrollCheckPoint) {
                this.opacity = 1 - this.currentScroll / this.scrollCheckPoint;
            } else {
                this.opacity = 0;
            }
            
            this.element.style.opacity = this.opacity;
        }

    }
})
*/

const navBar = Vue.createApp({
    data() {
        return {
            windowOpen: false
        }
    },
    methods: {
        showContact() {
            if (cm.show) {
                return;
            }

            cm.scrollPos = hm.scrollPos;

            if (ppm.show) {
                ppm.close();
            }

            cm.show = true;
            this.windowOpen = true;

            window.scrollTo({
                top: 0, 
                left: 0,
                behavior: 'smooth'
            });

            document.body.classList.add("noScroll");
        },
        closeAllWindows() {
            cm.close();
            ppm.close();
            this.windowOpen = false;
        },
        toMain() {
            this.closeAllWindows();
            hm.scrollToTop();
        },
        toProjects() {
            this.closeAllWindows();
            hm.scrollToProjects();
        }
    }
})

const header = Vue.createApp({
    data() {
        return {
            scrollCheckPoint: 400,
            currentScroll: 0,
            opacity: 1,
            element: undefined
        }
    },
    mounted() {
        this.element = document.querySelector('#headerContent');
        window.addEventListener("scroll", this.slideFade);
    },
    methods: {
        slideFade(event) {
            this.currentScroll = window.pageYOffset;
            if (this.currentScroll <= this.scrollCheckPoint) {
                this.opacity = 1 - this.currentScroll / this.scrollCheckPoint;
            } else {
                this.opacity = 0;
            }
            
            this.element.style.opacity = this.opacity;
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        scrollToProjects() {
            window.scrollTo({
                top: 610,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
})

const projects = Vue.createApp({
    data() {
        return {
            projects: null,
            scrollPos: 0
        }
    },
    methods: {
        projectSelected(index) {
            if (ppm.show) {
                return;
            }
            ppm.scrollPos = hm.currentScroll;

            ppm.show = true;
            nm.windowOpen = true;

            hm.scrollToTop();

            ppm.selectedProject = {
                name: projectMinis[index].name,
                tag: projectMinis[index].tagline,
                page: projectPages[index]
            }
        }
    }
});

const projectPage = Vue.createApp({
    data() {
        return {
            selectedProject: { },
            show: false,
            scrollPos: 0
        }
    },
    mounted() {
    },
    methods: {
        close() {
            window.scrollTo({
                top: this.scrollPos, 
                left: 0,
                behavior: 'smooth'
            });

            this.show = false;
            nm.windowOpen = false;
        }
    }
})

const contactPage = Vue.createApp({
    data() {
        return {
            show: false,
            scrollPos: 0
        }
    },
    methods: {
        close() {
            document.body.classList.remove("noScroll");
            
            window.scrollTo({
                top: this.scrollPos, 
                left: 0,
                behavior: 'smooth'
            });

            this.show = false;
            nm.windowOpen = false;
        }

    }
})

window.onload = _ => {
    nm = navBar.mount('#navBar');
    pm = projects.mount('#projects');
    hm = header.mount('#titleHeader');
    ppm = projectPage.mount('#projectPages');
    cm = contactPage.mount('#contactForm');

    pm.projects = projectMinis;
}

projects.component('project-mini', {
    props: ['project'],
    template: `
    <div class="project" @click="$emit('showPage', project.i)">
        <img :src=project.src class="projectImg">
        <div class="projectText">
            <h5 class="projectTitle"> {{ project.name }} </h5>
            <p class="projectTagline"> {{ project.tagline }} </p>
            <p class="projectYear"> {{ project.year }} </p>
        </div>
    </div>`
});

//projects.component('project-page')