document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const notifyBtn = document.getElementById('notifyBtn');
    const closeModalBtn = document.querySelector('.modal__close');

    function openModal() {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        closeModalBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Return focus to the trigger button
        notifyBtn.focus();
    }

    notifyBtn.addEventListener('click', function() {
        openModal();
    });

    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Newsletter form functionality
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Store email in localStorage (in a real app, this would go to a server)
            let subscribers = JSON.parse(localStorage.getItem('maisiesClosetSubscribers') || '[]');
            
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('maisiesClosetSubscribers', JSON.stringify(subscribers));
                
                showNotification('Thank you for subscribing! 💜', 'success');
                emailInput.value = '';
            } else {
                showNotification('You\'re already subscribed! 😊', 'info');
            }
        } else {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
        }
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1001',
            transform: 'translateX(100%)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '350px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            info: '#2196f3'
        };
        notification.style.backgroundColor = colors[type] || colors.success;

        document.body.appendChild(notification);

        // Trigger animation
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // Add some sparkle effects on scroll
    let sparkleTimer;
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'page-sparkle';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        Object.assign(sparkle.style, {
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            width: '4px',
            height: '4px',
            background: '#ff9800',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '999',
            animation: 'sparkle 1.5s ease-out forwards'
        });
        
        document.body.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 1500);
    }

    // Add sparkles on scroll (throttled)
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                // Add sparkle occasionally while scrolling
                if (Math.random() < 0.1) {
                    createSparkle();
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll('.feature, .about__text p');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Add some interactivity to vintage items
    const vintageItems = document.querySelectorAll('.item');
    vintageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Tab trap in modal
        if (modal.classList.contains('show') && e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add a subtle entrance animation
        const heroContent = document.querySelector('.hero__content');
        const heroVisual = document.querySelector('.hero__visual');
        
        if (heroContent) {
            heroContent.style.animation = 'slideInLeft 0.8s ease-out';
        }
        
        if (heroVisual) {
            heroVisual.style.animation = 'slideInRight 0.8s ease-out';
        }
    });

    // Simple analytics tracking (console log for demo)
    function trackEvent(eventName, data = {}) {
        console.log('Event tracked:', eventName, data);
        // In a real application, this would send data to your analytics service
    }

    // Track key user interactions
    notifyBtn.addEventListener('click', () => trackEvent('notify_button_clicked'));
    newsletterForm.addEventListener('submit', () => trackEvent('newsletter_signup_attempted'));
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            trackEvent('navigation_clicked', { target: e.target.getAttribute('href') });
        });
    });

    console.log('🌟 Maisie\'s Closet is ready! Welcome to the magical world of vintage treasures!');
});