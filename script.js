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
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});