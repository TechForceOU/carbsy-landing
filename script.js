// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .step, .benefits-text, .benefits-image');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Download button tracking (for analytics)
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const platform = btn.classList.contains('ios') ? 'iOS' : 'Android';

        // Track download attempt (replace with your analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download_attempt', {
                'platform': platform,
                'event_category': 'app_download'
            });
        }

        // For demo purposes, prevent actual navigation
        e.preventDefault();

        // Show a message (you can replace this with actual app store links)
        showDownloadMessage(platform);
    });
});

// Show download message
function showDownloadMessage(platform) {
    const message = document.createElement('div');
    message.className = 'download-message';
    message.innerHTML = `
        <div class="message-content">
            <h3>🎉 Thanks for your interest!</h3>
            <p>Carbsy for ${platform} will be available soon. We'll notify you when it's ready!</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;

    message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const messageContent = message.querySelector('.message-content');
    messageContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
        animation: slideUp 0.3s ease;
    `;

    const button = message.querySelector('button');
    button.style.cssText = `
        background: #4F46E5;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        cursor: pointer;
        margin-top: 1rem;
        font-weight: 500;
    `;

    document.body.appendChild(message);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu a {
            padding: 1rem;
            display: block;
            margin: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Form validation (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top button
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4F46E5;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    `;

    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
};

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images
const preloadImages = [
    'images/app-screenshot-main.png',
    'images/samoyed-mascot.svg',
    'images/carbsy-logo.svg'
];

preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Add loading states for download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});

// Analytics helper functions
const trackEvent = (eventName, parameters = {}) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }

    // Console log for debugging
    console.log('Event tracked:', eventName, parameters);
};

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.id || entry.target.className.split(' ')[0];
            trackEvent('section_view', {
                section_name: sectionName
            });
        }
    });
}, { threshold: 0.5 });

// Observe main sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id], .hero');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function () {
            // Replace with placeholder or hide
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

console.log('Carbsy landing page loaded successfully! 🐕'); 