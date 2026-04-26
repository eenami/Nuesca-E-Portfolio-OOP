// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.02
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select all elements to animate
document.querySelectorAll('.section-title, .glass-panel').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    // Force reflow before applying transition to prevent it from animating to 0
    void el.offsetWidth;
    
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// 3D Mouse tracking effect for the hero glass card
const container = document.getElementById('parallax-container');
const card = document.querySelector('.main-card');

if (container && card) {
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on mouse position relative to center
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset transform when leaving the container
    container.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        card.style.transition = 'transform 0.5s ease-out';
    });
    
    // Remove transition when hovering for instantaneous tracking
    container.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
}

// Accordion behavior for details elements
// When one dropdown is opened, all other open dropdowns will close
// and the page will scroll to the top of the opened activity
document.querySelectorAll('details').forEach((details) => {
    details.addEventListener('toggle', (e) => {
        if (details.open) {
            // Close other open details
            document.querySelectorAll('details').forEach((otherDetails) => {
                if (otherDetails !== details && otherDetails.open) {
                    otherDetails.open = false;
                }
            });
            
            // Scroll to the opened activity with a slight delay to account for content shift
            setTimeout(() => {
                details.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    });
});

