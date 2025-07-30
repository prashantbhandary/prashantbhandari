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
    
    // Mobile menu elements
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }
    
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
    
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
                closeMobileMenu();
            }
        });
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on nav links
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking on overlay
    navOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle touch events for better mobile experience
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Close menu on swipe right when menu is open
    document.addEventListener('touchstart', function(e) {
        if (navLinks.classList.contains('active')) {
            touchStartX = e.changedTouches[0].screenX;
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (navLinks.classList.contains('active')) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        // Close menu on swipe right
        if (swipeDistance > swipeThreshold) {
            closeMobileMenu();
        }
    }
    
    // Form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // EmailJS configuration
            const serviceID = "service_vqzpcsn"; // Replace with your EmailJS service ID
            const templateID = "template_pmdilpp"; // Replace with your EmailJS template ID
            const userID = "90R1DZh0HH_ycIDrs"; // Replace with your EmailJS user ID
            
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'info@bhandari-prashant.com.np'
            };
            
            // Check if EmailJS is available (fallback for local testing)
            if (typeof emailjs !== 'undefined') {
                emailjs.send(serviceID, templateID, templateParams, userID)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        alert(`Thank you for your message, ${name}! I will get back to you at ${email} soon.`);
                        contactForm.reset();
                    }, function(error) {
                        console.log('FAILED...', error);
                        alert('Sorry, there was an error sending your message. Please try again or contact me directly at info@bhandari-prashant.com.np');
                    })
                    .finally(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback when EmailJS is not loaded or for testing
                console.log('EmailJS not loaded. Form data:', templateParams);
                
                // Create mailto link as fallback
                const mailtoLink = `mailto:info@bhandari-prashant.com.np?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                if (confirm(`EmailJS service is not configured. Would you like to open your default email client to send the message?`)) {
                    window.location.href = mailtoLink;
                    contactForm.reset();
                } else {
                    alert('Please contact me directly at info@bhandari-prashant.com.np');
                }
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
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