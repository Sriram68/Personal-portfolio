document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in-load, .fade-in');

    // Create an intersection observer for scrolling animations
    const appearOptions = {
        threshold: 0.2,  // Trigger the animation when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px"  // Adjusts the viewport margin to trigger slightly earlier
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');  // Adds 'visible' class when element is in view
                appearOnScroll.unobserve(entry.target);  // Stop observing once it becomes visible
            }
        });
    }, appearOptions);

    // Apply observer to each .fade-in element for scrolling
    fadeInElements.forEach(fader => {
        if (fader.classList.contains('fade-in-load')) {
            // Slight delay to show the .fade-in-load elements on initial page load
            setTimeout(() => fader.classList.add('visible'), 100);
        } else {
            appearOnScroll.observe(fader);  // Observe elements with .fade-in class
        }
    });
});


// Dropdown Button Toggle
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

dropdownBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
});

window.addEventListener('click', (event) => {
    if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});

// Smooth Scroll for hero button
document.getElementById('hero-button').addEventListener('click', function() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

// Dark Mode Toggle
const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Carousel Slide Logic
const projectItems = document.querySelectorAll('.project-item');
const totalItems = projectItems.length;

const carousel = document.querySelector('.carousel');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Log to check if carousel elements are selected properly
console.log(carousel, leftArrow, rightArrow);

let currentIndex = 0;

function updateCarousel() {
    const translateXValue = -currentIndex * 100; // Move by 100% for each project
    carousel.style.transform = `translateX(${translateXValue}%)`; 
}

// Event listener for the right arrow
rightArrow.addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to first project
    }
    updateCarousel();
});

leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1; // Loop back to last project
    }
    updateCarousel();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
