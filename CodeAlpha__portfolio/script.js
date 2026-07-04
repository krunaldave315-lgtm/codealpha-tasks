// =======================
// Sticky Header
// =======================

window.addEventListener("scroll", () => {
    let header = document.querySelector("header");

    header.classList.toggle("sticky", window.scrollY > 100);
});

// =======================
// Active Navbar Links
// =======================

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {

    sections.forEach(sec => {

        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {

            navLinks.forEach(links => {
                links.classList.remove("active");
            });

            document.querySelector("header nav a[href*=" + id + "]").classList.add("active");

        }

    });

};

// =======================
// Typing Effect
// =======================

const text = [
    "BCA Student",
    "Web Developer",
    "Frontend Developer",
    "Tech Enthusiast"
];

let speed = 75;
let textIndex = 0;
let charIndex = 0;

const typingElement = document.querySelector(".typing-text");

function type() {

    if (charIndex < text[textIndex].length) {

        typingElement.textContent += text[textIndex].charAt(charIndex);

        charIndex++;

        setTimeout(type, speed);

    }

    else {

        setTimeout(erase, 1500);

    }

}

function erase() {

    if (charIndex > 0) {

        typingElement.textContent =
            text[textIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(erase, 50);

    }

    else {

        textIndex++;

        if (textIndex >= text.length) {

            textIndex = 0;

        }

        setTimeout(type, 500);

    }

}

document.addEventListener("DOMContentLoaded", () => {

    if (text.length) {

        setTimeout(type, 1000);

    }

});

// =======================
// Scroll To Top Button
// =======================

let topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// =======================
// Fade-In Animation
// =======================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

const hiddenElements = document.querySelectorAll(
    ".glass-card, .timeline-item, .skill-box"
);

hiddenElements.forEach(el => observer.observe(el));

window.addEventListener("load", () => {

    document.getElementById("loader").style.display = "none";

});