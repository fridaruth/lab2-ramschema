"use strict";

let allcourses = [];
let filteredCourses = [];

document.addEventListener("DOMContentLoaded", async () => {
    await getCourses();

    // händelselyssnare för sökning
    document.querySelector("#search").addEventListener("input", (e) => {
        const text = e.target.value.toLowerCase();

        // filtrera kurser som matchar sök
        filteredCourses = allcourses.filter(course => {
            return course.code.toLowerCase().includes(text) ||
            course.coursename.toLowerCase().includes(text);
        });

        displayCourses(filteredCourses);
    })
})

async function getCourses() {
    const url = "https://webbutveckling.miun.se/files/ramschema.json";

    // Anropa och läs ut data
    try {
        const response = await fetch(url);
        const courses = await response.json();

        allcourses = courses;

        displayCourses(courses);

    } catch (error) {
        console.error("Fel: " + error);
    }
}

function displayCourses(data) {
    const tableEl = document.querySelector("#tableBody");
    tableEl.innerHTML = "";
    
    data.forEach(course => {
        tableEl.innerHTML += `
        <tr>
        <td class="coursecode">${course.code.toUpperCase()}</td>
        <td class="coursename">${course.coursename}</td>
        <td class="progression">${course.progression}</td>
        <td class="syllabus"><a href="${course.syllabus}">Kursplan för ${course.coursename}</a></td>
        </tr>
        `
    })
}