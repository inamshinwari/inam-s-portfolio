// Strict mode helps catch common coding errors and "unsafe" actions.
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling Implementation
    const navLinks = document.querySelectorAll('a[href^="#"]');

    function handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' 
            });
        }
    }

    navLinks.forEach(link => {
        if (link.hostname === window.location.hostname || link.hostname === "") {
            link.addEventListener('click', handleSmoothScroll);
        }
    });

    // 2. Scroll Animation Implementation (Intersection Observer)
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Options for the observer: target element is 10% visible to trigger animation
    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'scrolled' class when the element comes into view
                entry.target.classList.add('scrolled');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply the observer to all elements with the 'animate-on-scroll' class
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});