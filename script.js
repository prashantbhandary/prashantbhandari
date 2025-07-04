// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Circuit animation
    const circuits = document.querySelectorAll('.circuit-element');
    circuits.forEach(circuit => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        circuit.style.left = `${randomX}%`;
        circuit.style.top = `${randomY}%`;
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // In a real implementation, you would send this data to a server
            // Here we'll just show a success message
            alert(`Thank you for your message, ${name}! I will get back to you at ${email} soon.`);
            contactForm.reset();
        });
    }
    
    // Add animation to elements when they enter the viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .timeline-content, .project-card, .achievement-card, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.skill-category, .timeline-content, .project-card, .achievement-card, .blog-card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
});