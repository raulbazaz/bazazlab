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

// Services Split Layout — hover to switch detail panel
const serviceData = [
    {
        icon: '<i class="fab fa-apple"></i>',
        title: 'iOS Development',
        desc: 'We craft stunning native iOS applications using Swift and SwiftUI, delivering seamless experiences optimized for the Apple ecosystem with full App Store deployment support.',
        tags: ['Swift', 'SwiftUI', 'Xcode', 'App Store']
    },
    {
        icon: '<i class="fab fa-android"></i>',
        title: 'Android Development',
        desc: 'Native Android apps built with Kotlin and Jetpack Compose, ensuring top-tier performance and smooth Play Store integration for millions of users.',
        tags: ['Kotlin', 'Jetpack Compose', 'Android Studio', 'Play Store']
    },
    {
        icon: '<i class="fab fa-react"></i>',
        title: 'Cross-Platform',
        desc: 'React Native and Flutter applications that run beautifully on both iOS and Android from a single codebase — cutting your time-to-market in half.',
        tags: ['React Native', 'Flutter', 'Dart', 'Expo']
    },
    {
        icon: '<i class="fas fa-server"></i>',
        title: 'Backend & APIs',
        desc: 'Scalable, secure backend solutions with Node.js, Firebase, and AWS that power your mobile apps with robust REST/GraphQL APIs and cloud infrastructure.',
        tags: ['Node.js', 'Firebase', 'AWS', 'GraphQL']
    },
    {
        icon: '<i class="fas fa-palette"></i>',
        title: 'UI/UX Design',
        desc: 'User-centered design that creates intuitive, beautiful interfaces — from early wireframes to high-fidelity prototypes that genuinely delight your users.',
        tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems']
    }
];

const serviceItems = document.querySelectorAll('.service-item');
const svcDetailIcon  = document.getElementById('svcDetailIcon');
const svcDetailTitle = document.getElementById('svcDetailTitle');
const svcDetailDesc  = document.getElementById('svcDetailDesc');
const svcDetailTags  = document.getElementById('svcDetailTags');
const svcDetailInner = document.querySelector('.svc-detail-inner');

function activateService(index) {
    serviceItems.forEach(i => i.classList.remove('active'));
    serviceItems[index].classList.add('active');

    const data = serviceData[index];
    // Trigger re-animation
    if (svcDetailInner) {
        svcDetailInner.style.animation = 'none';
        svcDetailInner.offsetHeight; // reflow
        svcDetailInner.style.animation = '';
    }
    if (svcDetailIcon)  svcDetailIcon.innerHTML  = data.icon;
    if (svcDetailTitle) svcDetailTitle.textContent = data.title;
    if (svcDetailDesc)  svcDetailDesc.textContent  = data.desc;
    if (svcDetailTags)  svcDetailTags.innerHTML    = data.tags.map(t => `<span>${t}</span>`).join('');
}

serviceItems.forEach((item, idx) => {
    item.addEventListener('mouseenter', () => activateService(idx));
    item.addEventListener('click', () => activateService(idx));
});

// Process Split Layout — hover to switch detail panel
const processData = [
    {
        icon: '<i class="fas fa-search"></i>',
        title: 'Discovery',
        desc: 'We dive deep into your vision, goals, and target audience — understanding your business needs and user expectations to create a rock-solid foundation for your app.',
        tags: ['Stakeholder Interviews', 'Market Research', 'UX Audit']
    },
    {
        icon: '<i class="fas fa-pen-nib"></i>',
        title: 'Design',
        desc: 'Creating stunning UI/UX designs that are both beautiful and intuitive — from wireframes to pixel-perfect, high-fidelity prototypes that bring your vision to life.',
        tags: ['Wireframing', 'UI Design', 'Figma', 'Prototyping']
    },
    {
        icon: '<i class="fas fa-code"></i>',
        title: 'Development',
        desc: 'Building your app with clean, scalable code using the latest technologies. Agile sprints with regular demos keep you fully in the loop throughout the build.',
        tags: ['Agile Sprints', 'Code Reviews', 'CI/CD', 'Testing']
    },
    {
        icon: '<i class="fas fa-rocket"></i>',
        title: 'Launch',
        desc: 'Deploying to the App Store and Play Store with full optimization. We handle submissions, ensure compliance, and provide ongoing support post-launch.',
        tags: ['App Store', 'Play Store', 'ASO', 'Post-launch Support']
    }
];

const processItems   = document.querySelectorAll('.process-item');
const procDetailIcon  = document.getElementById('procDetailIcon');
const procDetailTitle = document.getElementById('procDetailTitle');
const procDetailDesc  = document.getElementById('procDetailDesc');
const procDetailTags  = document.getElementById('procDetailTags');
const procDetailInner = document.getElementById('procDetailInner');

function activateProcess(index) {
    processItems.forEach(i => i.classList.remove('active'));
    processItems[index].classList.add('active');

    const data = processData[index];
    if (procDetailInner) {
        procDetailInner.style.animation = 'none';
        procDetailInner.offsetHeight;
        procDetailInner.style.animation = '';
    }
    if (procDetailIcon)  procDetailIcon.innerHTML   = data.icon;
    if (procDetailTitle) procDetailTitle.textContent = data.title;
    if (procDetailDesc)  procDetailDesc.textContent  = data.desc;
    if (procDetailTags)  procDetailTags.innerHTML    = data.tags.map(t => `<span>${t}</span>`).join('');
}

processItems.forEach((item, idx) => {
    item.addEventListener('mouseenter', () => activateProcess(idx));
    item.addEventListener('click', () => activateProcess(idx));
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
