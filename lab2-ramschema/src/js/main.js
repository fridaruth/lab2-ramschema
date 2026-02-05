"use strict";

let allcourses = [];
let filteredCourses = [];
let lastSortedProperty = "";


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

    // funktion för sortering
    function sortData(property) {
        if (lastSortedProperty === property) {
            filteredCourses.reverse()
        } else {
            filteredCourses.sort((a, b) => {
                return a[property].localeCompare(b[property])
            });

            lastSortedProperty = property;
        }

        displayCourses(filteredCourses);
    }

    // händelselyssnare för sortering
    document.querySelector("#sortCode").addEventListener("click", () => sortData("code"));
    document.querySelector("#sortName").addEventListener("click", () => sortData("coursename"));
    document.querySelector("#sortProg").addEventListener("click", () => sortData("progression"));
    document.querySelector("#sortSyll").addEventListener("click", () => sortData("syllabus"));
})

// hämta JSON-data
async function getCourses() {
    const url = "https://webbutveckling.miun.se/files/ramschema.json";

    // Anropa och läs ut data
    try {
        const response = await fetch(url);
        const courses = await response.json();

        // lagra globalt, original och filtrerat
        allcourses = courses;
        filteredCourses = [...courses];

        displayCourses(courses);

    } catch (error) {
        console.error("Fel: " + error);
    }
}

// skriver ut till DOM
function displayCourses(data) {
    const tableEl = document.querySelector("#tableBody");
    tableEl.innerHTML = "";
    
    data.forEach(course => {
        tableEl.innerHTML += `
        <tr>
        <td class="coursecode">${course.code.toUpperCase()}</td>
        <td class="coursename">${course.coursename}</td>
        <td class="progression">${course.progression}</td>
        <td class="syllabus"><a href="${course.syllabus}" target="_blank">Kursplan för ${course.coursename}</a></td>
        </tr>
        `
    })
}