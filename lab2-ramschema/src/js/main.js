"use strict";

let allcourses = [];

document.addEventListener("DOMContentLoaded", async () => {
    await getCourses();
})

async function getCourses() {
    const url = "https://webbutveckling.miun.se/files/ramschema.json";

    // Anropa och läs ut data
    try {
        const response = await fetch(url);
        const courses = await response.json();

        allcourses = courses;
        console.log(allcourses);
    } catch (error) {
        console.error("Fel: " + error);
    }
}