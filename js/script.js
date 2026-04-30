// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// Smooth Scrolling for anchor links
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

// Contact Form Handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Send email using direct method
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Create email content
    const emailContent = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from MEGA-NAA Ventures Website
Date: ${new Date().toLocaleString()}
    `;

    // Create mailto link
    const mailtoLink = `mailto:naalamiley3@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailContent)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show notification
    setTimeout(() => {
        showNotification('Opening your email client... Please send the message to complete.', 'info');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
});


// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            notification.style.backgroundColor = '#e67e22';
            break;
        case 'info':
            notification.style.backgroundColor = '#3498db';
            break;
        default:
            notification.style.backgroundColor = '#34495e';
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards, service cards, and other elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .product-card, .service-card, .value-card, ' +
        '.stat-card, .industry-item, .product-category, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Add loading state for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease-out';
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.innerHTML = '<i class="fas fa-image"></i>';
            placeholder.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                height: ${this.height || 200}px;
                background: #f8f9fa;
                color: #95a5a6;
                font-size: 2rem;
                border-radius: 5px;
            `;
            this.parentNode.insertBefore(placeholder, this);
        });
    });
});

// Add fade in animation for images
const imageStyle = document.createElement('style');
imageStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(imageStyle);

// Phone number formatting for contact forms
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value.length <= 3) {
            formattedValue = value;
        } else if (value.length <= 6) {
            formattedValue = value.slice(0, 3) + ' ' + value.slice(3);
        } else {
            formattedValue = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
        }
    }
    
    e.target.value = formattedValue;
});

// Add current year to footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
});

// Performance optimization - Debounce scroll events
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

// Debounced scroll handler for performance
const debouncedScroll = debounce(function() {
    // Add any scroll-based animations here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Slideshow Functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.dot');
    const slideshow = document.querySelector('.mobile-slideshow');
    const track = document.querySelector('.slideshow-track');
    let currentIndex = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isTransitioning = false;
    
    // Create infinite carousel by cloning slides
    function createInfiniteCarousel() {
        const slidesArray = Array.from(slides);
        const N = slidesArray.length;
        
        if (N === 0) return slides;
        
        // Clones for the end
        const firstSlideClone1 = slidesArray[0].cloneNode(true);
        const firstSlideClone2 = slidesArray[1 % N].cloneNode(true);
        
        // Clones for the beginning
        const lastSlideClone1 = slidesArray[(N - 1) % N].cloneNode(true);
        const lastSlideClone2 = slidesArray[(N - 2 + N) % N].cloneNode(true);
        
        // Add clones to track
        track.appendChild(firstSlideClone1);
        track.appendChild(firstSlideClone2);
        
        track.insertBefore(lastSlideClone1, slidesArray[0]);
        track.insertBefore(lastSlideClone2, lastSlideClone1);
        
        // Update slides collection
        const allSlides = document.querySelectorAll('.slide-item');
        return allSlides;
    }
    
    const allSlides = createInfiniteCarousel();

    function showSlide(index, instant = false) {
        if (isTransitioning && !instant) return;
        
        const isMobile = window.innerWidth <= 768;
        const originalSlideCount = slides.length;
        
        if (isMobile) {
            // Mobile: Show one slide at a time (vertical)
            currentIndex = index;
            track.style.transform = ''; // Clean up desktop transform
            
            // Handle infinite loop boundaries
            if (currentIndex < 0) {
                currentIndex = originalSlideCount - 1;
            } else if (currentIndex >= originalSlideCount) {
                currentIndex = 0;
            }
            
            // Update active states
            allSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            allSlides[currentIndex + 2].classList.add('active'); // +2 because of 2 clones at start
            dots[currentIndex].classList.add('active');
            
        } else {
            // Desktop: Show 3 slides at a time (horizontal)
            currentIndex = index;
            let physicalIndex = currentIndex + 2; // +2 because of 2 clones at start
            
            // Set transition
            if (!instant) {
                track.style.transition = 'transform 0.5s ease-in-out';
                isTransitioning = true;
            } else {
                track.style.transition = 'none';
            }
            
            // Move the track horizontally
            const slideWidth = slides[0].offsetWidth + 20; // Include gap
            const offset = (physicalIndex - 1) * slideWidth; // -1 to center the physicalIndex item
            track.style.transform = `translateX(-${offset}px)`;
            
            // IMPORTANT: Make the middle slide always active
            const middleSlideIndex = physicalIndex; // Current position is the middle
            allSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === middleSlideIndex);
            });
            
            // Update dots for desktop (map back to original indices)
            let dotIndex = currentIndex;
            if (dotIndex < 0) dotIndex = originalSlideCount - 1;
            if (dotIndex >= originalSlideCount) dotIndex = 0;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === dotIndex);
            });
            
            // Handle infinite loop after transition
            if (!instant) {
                setTimeout(() => {
                    isTransitioning = false;
                    
                    // Check if we need to reset position for infinite loop
                    if (physicalIndex <= 1) {
                        // We're at the clone of the last slide, jump to the real last slide
                        showSlide(originalSlideCount - 1, true);
                    } else if (physicalIndex >= originalSlideCount + 2) {
                        // We're at the clone of the first slide, jump to the real first slide
                        showSlide(0, true);
                    }
                }, 500);
            }
        }
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startSlideshow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Touch event handlers for swipe functionality
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchEndX = touchStartX; // Reset end to start so a simple tap = 0 distance
        touchEndY = touchStartY;
    }

    function handleTouchMove(e) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
    }

    function handleTouchEnd() {
        const swipeThreshold = 50; // Minimum swipe distance
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Only trigger if horizontal swipe is greater than vertical swipe AND exceeds threshold
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            stopSlideshow();
            
            if (diffX > 0) {
                // Swipe right - go to previous slide
                prevSlide();
            } else {
                // Swipe left - go to next slide
                nextSlide();
            }
            
            startSlideshow();
        }
        
        // Reset touch coordinates
        touchStartX = 0;
        touchEndX = 0;
        touchStartY = 0;
        touchEndY = 0;
    }

    // Initialize slideshow for all devices
    if (slides.length > 0 && slideshow) {
        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });

        // Add touch event listeners for swipe (mobile)
        slideshow.addEventListener('touchstart', handleTouchStart, { passive: true });
        slideshow.addEventListener('touchmove', handleTouchMove, { passive: true });
        slideshow.addEventListener('touchend', handleTouchEnd);

        // Pause on hover (desktop only to prevent mobile sticky hover states)
        slideshow.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) stopSlideshow();
        });
        slideshow.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) startSlideshow();
        });

        // Add keyboard navigation (desktop)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                stopSlideshow();
                prevSlide();
                startSlideshow();
            } else if (e.key === 'ArrowRight') {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            showSlide(currentIndex);
        });
        
        // Initialize the carousel at the first real slide (position 1, accounting for clone)
        showSlide(0, true);
        startSlideshow();
    }
}

// Initialize slideshow on page load
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
});
