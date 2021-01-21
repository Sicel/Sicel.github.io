'use strict'
import {
    projectMinis,
    projectPages
} from '../js/projectInfo.js';

let hm, pm, ppm;

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
        }
    }
})

const projects = Vue.createApp({
    data() {
        return {
            projects: null,
            selectedProject: { },
            scrollPos: 0
        }
    },
    methods: {
        projectSelected(index) {
            if (!ppm.show) {
                ppm.show = true;
            }

            ppm.scrollPos = hm.currentScroll;

            window.scrollTo({
                top: 0, 
                left: 0,
                behavior: 'smooth'
            });

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
    methods: {
        close() {
            window.scrollTo({
                top: this.scrollPos, 
                left: 0,
                behavior: 'smooth'
            });

            this.show = false;
        }
    }
})

window.onload = _ => {
    pm = projects.mount('#projects');
    hm = header.mount('#titleHeader');
    ppm = projectPage.mount('#projectPages');

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