// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });

            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Smooth mouse wheel scrolling
let isScrolling = false;
let targetScroll = window.pageYOffset;

window.addEventListener('wheel', (e) => {
    e.preventDefault();

    targetScroll += e.deltaY * 1.0; // Normal scroll speed
    targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

    if (!isScrolling) {
        isScrolling = true;
        smoothScroll();
    }
}, { passive: false });

function smoothScroll() {
    const currentScroll = window.pageYOffset;
    const diff = targetScroll - currentScroll;

    if (Math.abs(diff) > 0.5) {
        window.scrollTo(0, currentScroll + diff * 0.65); // Smoother easing
        requestAnimationFrame(smoothScroll);
    } else {
        window.scrollTo(0, targetScroll);
        isScrolling = false;
    }
}

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.padding = '12px 0';
    } else {
        navbar.style.padding = '16px 0';
    }

    lastScroll = currentScroll;
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formSuccess = document.querySelector('.form-success');

        // Show loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            await fetch('https://formsubmit.co/ajax/rahul@bazazlab.com', {
                method: 'POST',
                body: formData
            });

            // Small delay to show loading
            await new Promise(resolve => setTimeout(resolve, 500));

            // Show success
            btnLoading.style.display = 'none';
            formSuccess.style.display = 'flex';
            contactForm.reset();

        } catch (error) {
            // Reset on error
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            alert('Something went wrong. Please try again.');
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-links.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: var(--bg-card);
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
        gap: 16px;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(style);

// Services Accordion Hover
const servicePanels = document.querySelectorAll('.service-panel');

servicePanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        servicePanels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');
    });
});

// Process Accordion Hover
const processPanels = document.querySelectorAll('.process-panel');

processPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        processPanels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');
    });
});

// Scroll-based gear rotation
function initGearRotation() {
    const heroIllustration = document.getElementById('heroIllustration');
    const brandIcon = document.getElementById('brandIcon');

    // Brand icon rotation
    if (brandIcon) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const rotation = scrollY * 0.3;
            brandIcon.style.transform = `rotate(${rotation}deg)`;
        });
    }

    // Hero illustration gears
    if (heroIllustration) {
        heroIllustration.addEventListener('load', () => {
            const svgDoc = heroIllustration.contentDocument;
            if (!svgDoc) return;

            const gear1 = svgDoc.getElementById('gear1');
            const gear2 = svgDoc.getElementById('gear2');
            const gear3 = svgDoc.getElementById('gear3');

            if (!gear1 || !gear2 || !gear3) return;

            window.addEventListener('scroll', () => {
                const scrollY = window.pageYOffset;
                const rotation1 = scrollY * 0.3;
                const rotation2 = scrollY * -0.25;
                const rotation3 = scrollY * 0.35;

                gear1.style.transform = `rotate(${rotation1}deg)`;
                gear2.style.transform = `rotate(${rotation2}deg)`;
                gear3.style.transform = `rotate(${rotation3}deg)`;
            });
        });
    }
}

initGearRotation();

// Console branding
console.log('%cBazazLab', 'font-size: 32px; font-weight: bold; color: #ffffff; background: #000000; padding: 10px 20px;');
console.log('%cBuilding Apps That Stand Out', 'font-size: 14px; color: #888888;');
