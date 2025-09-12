/* ===== NEMESIS ENERGY - OPTIMIZED JAVASCRIPT ===== */
/* Performance-optimized with modern ES6+ features and dark energy theme */

// Use modern DOM loading event
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    // Initialize all modules
    Navigation.init();
    ScrollAnimations.init();
    BackToTop.init();
    ContactForm.init();
    FAQ.init();
    Performance.init();
    Accessibility.init();
    EnergyEffects.init();
    HeroEffects.init(); // Add new hero effects
    CleanURL.init(); // Hide .html extensions from URLs
}

// ===== BACK TO TOP BUTTON =====
const BackToTop = {
    init() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;

        this.setupScrollListener();
        this.setupClickHandler();
    },

    setupScrollListener() {
        let ticking = false;

        const updateButton = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const shouldShow = scrollTop > 300;

            if (shouldShow && !this.button.classList.contains('visible')) {
                this.button.classList.add('visible');
            } else if (!shouldShow && this.button.classList.contains('visible')) {
                this.button.classList.remove('visible');
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateButton);
                ticking = true;
            }
        });
    },

    setupClickHandler() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ===== ENERGY EFFECTS =====
const EnergyEffects = {
    init() {
        this.createEnergyParticles();
        this.setupScrollReveal();
    },

    createEnergyParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create floating energy particles
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'energy-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, #00D4FF, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                opacity: ${Math.random() * 0.5 + 0.3};
                z-index: 1;
            `;
            hero.appendChild(particle);
        }

        // Add CSS animation for particles
        if (!document.querySelector('#energy-particles-style')) {
            const style = document.createElement('style');
            style.id = 'energy-particles-style';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    setupScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
};

// ===== NAVIGATION MODULE =====
const Navigation = {
    init() {
        this.setupMobileMenu();
        this.setupScrollEffect();
        this.highlightActiveLink();
        this.setupSmoothScrolling();
        this.setupKeyboardNavigation();
        this.enhanceNavbarLogo(); // Add logo enhancements
    },

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navToggle || !navMenu) return;

        // Mobile menu toggle with enhanced functionality
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu(navToggle, navMenu);
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu(navToggle, navMenu);
            });
        });

        // Close menu when clicking outside with improved detection
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && 
                !navToggle.contains(e.target) && 
                navMenu.classList.contains('active')) {
                this.closeMobileMenu(navToggle, navMenu);
            }
        });

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                this.closeMobileMenu(navToggle, navMenu);
                navToggle.focus();
            }
        });

        // Prevent body scroll when menu is open
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isActive = navMenu.classList.contains('active');
                    document.body.style.overflow = isActive ? 'hidden' : '';
                }
            });
        });

        observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
    },

    toggleMobileMenu(toggle, menu) {
        const isActive = toggle.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu(toggle, menu);
        } else {
            this.openMobileMenu(toggle, menu);
        }
    },

    openMobileMenu(toggle, menu) {
        toggle.classList.add('active');
        menu.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        
        // Focus management for accessibility
        const firstLink = menu.querySelector('.nav-link');
        if (firstLink) {
            firstLink.focus();
        }
    },

    closeMobileMenu(toggle, menu) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    },

    setupScrollEffect() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let ticking = false;
        let lastScrollY = 0;

        const updateNavbar = () => {
            const scrollY = window.scrollY;
            
            // Enhanced navbar styling based on scroll
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
            }
            
            // Hide/show navbar on scroll for mobile
            if (window.innerWidth <= 768) {
                if (scrollY > lastScrollY && scrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Handle resize events
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navbar.style.transform = 'translateY(0)';
            }
        });
    },

    highlightActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = new URL(link.href).pathname;
            
            // Handle clean URLs (enhanced for better handling)
            if ((currentPath === '/' || currentPath === '/index' || currentPath.endsWith('/index.html') || currentPath === '/index') && 
                (linkPath === '/' || linkPath === '/index.html')) {
                link.classList.add('active');
            } else if (currentPath === linkPath) {
                link.classList.add('active');
            } else if (currentPath === linkPath.replace('.html', '')) {
                // Clean URL matches HTML link
                link.classList.add('active');
            } else if (linkPath === currentPath + '.html') {
                // HTML link matches clean URL
                link.classList.add('active');
            }
        });
    },

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for accessibility
        const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
        
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                const currentIndex = index;
                let targetIndex;
                
                switch(e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault();
                        targetIndex = (currentIndex + 1) % navLinks.length;
                        navLinks[targetIndex].focus();
                        break;
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault();
                        targetIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
                        navLinks[targetIndex].focus();
                        break;
                    case 'Home':
                        e.preventDefault();
                        navLinks[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        navLinks[navLinks.length - 1].focus();
                        break;
                }
            });
        });
    },

    enhanceNavbarLogo() {
        const navLogo = document.querySelector('.nav-logo img');
        if (!navLogo) return;

        // Enhanced logo interactions with vibrant colors
        let colorIndex = 0;
        const colors = [
            'hue-rotate(0deg)',
            'hue-rotate(30deg)',
            'hue-rotate(60deg)',
            'hue-rotate(120deg)',
            'hue-rotate(180deg)',
            'hue-rotate(240deg)',
            'hue-rotate(300deg)'
        ];

        // Color cycling animation
        const cycleColors = () => {
            navLogo.style.filter = `brightness(2.4) contrast(1.6) saturate(1.8) ${colors[colorIndex]} drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))`;
            colorIndex = (colorIndex + 1) % colors.length;
        };

        // Subtle color cycling every 4 seconds
        const colorInterval = setInterval(cycleColors, 4000);

        // Enhanced hover effects
        navLogo.addEventListener('mouseenter', () => {
            clearInterval(colorInterval);
            navLogo.style.filter = 'brightness(2.8) contrast(1.8) saturate(2.5) hue-rotate(180deg) drop-shadow(0 4px 16px rgba(0, 212, 255, 0.6))';
            navLogo.style.animation = 'logoHoverGlow 0.6s ease-in-out';
        });

        navLogo.addEventListener('mouseleave', () => {
            navLogo.style.filter = 'brightness(2.4) contrast(1.6) saturate(1.8) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))';
            navLogo.style.animation = 'logoEnergy 2.5s ease-in-out infinite alternate';
        });

        // Click effects with burst animation
        navLogo.addEventListener('click', (e) => {
            // Don't prevent default - allow navigation to work
            // Only prevent default if we're already on the home page
            const currentPage = window.location.pathname;
            if (currentPage === '/' || currentPage === '/index' || currentPage.endsWith('index.html')) {
                e.preventDefault();
            }
            
            // Create energy burst effect
            this.createEnergyBurst(navLogo);
            
            // Temporary color explosion
            navLogo.style.filter = 'brightness(3.2) contrast(2.0) saturate(3.0) hue-rotate(270deg) drop-shadow(0 6px 20px rgba(255, 0, 128, 0.8))';
            navLogo.style.transform = 'scale(1.15) rotate(5deg)';
            
            setTimeout(() => {
                navLogo.style.filter = 'brightness(2.4) contrast(1.6) saturate(1.8) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))';
                navLogo.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });

        // Scroll-based logo effects
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollPercent = Math.min(window.scrollY / window.innerHeight, 1);
                    const hueValue = Math.floor(scrollPercent * 360);
                    
                    if (!navLogo.matches(':hover')) {
                        navLogo.style.filter = `brightness(${2.2 + scrollPercent * 0.4}) contrast(1.5) saturate(${1.6 + scrollPercent * 0.6}) hue-rotate(${hueValue}deg) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))`;
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    },

    createEnergyBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create multiple energy particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #00D4FF, #FF0080);
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 9999;
                animation: energyBurst 0.8s ease-out forwards;
                transform-origin: center;
            `;
            
            const angle = (i * 45) * Math.PI / 180;
            const distance = 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.style.setProperty('--end-x', `${endX}px`);
            particle.style.setProperty('--end-y', `${endY}px`);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }

        // Add CSS animation if it doesn't exist
        if (!document.querySelector('#energy-burst-style')) {
            const style = document.createElement('style');
            style.id = 'energy-burst-style';
            style.textContent = `
                @keyframes energyBurst {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// ===== SCROLL ANIMATIONS MODULE =====
const ScrollAnimations = {
    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
        this.setupParallaxEffects();
    },

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    },

    setupCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => counterObserver.observe(stat));
    },

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };

        updateCounter();
    },

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }
};

// ===== CONTACT FORM MODULE =====
const ContactForm = {
    init() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Initialize EmailJS
        this.initializeEmailJS();

        this.setupFormValidation(form);
        this.setupFormSubmission(form);
        this.setupFieldEnhancements(form);
    },

    initializeEmailJS() {
        // Initialize EmailJS with configuration from email-config.js
        try {
            if (typeof window.EMAIL_CONFIG === 'undefined') {
                throw new Error('Email configuration not found. Please check email-config.js');
            }
            
            emailjs.init(window.EMAIL_CONFIG.PUBLIC_KEY);
            console.log('EmailJS initialized successfully');
        } catch (error) {
            console.error('EmailJS initialization failed:', error);
            console.error('Please check your email-config.js file and EMAILJS_SETUP_GUIDE.md');
        }
    },

    setupFormValidation(form) {
        const fields = form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    },

    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        let isValid = true;

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            // More flexible phone validation since country code is separate
            const phoneRegex = /^[\d\s\-\(\)]{6,20}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                this.showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        return isValid;
    },

    showFieldError(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.setAttribute('role', 'alert');
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
    },

    clearFieldError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    },

    setupFormSubmission(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            const fields = form.querySelectorAll('input, select, textarea');
            let isFormValid = true;
            
            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                this.showFormMessage('Please correct the errors above', 'error', form);
                return;
            }

            // Show loading state
            const submitButton = form.querySelector('.btn[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            
            // Switch to loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitButton.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await this.submitForm(new FormData(form));
                
                this.showFormMessage('Thank you! Your message has been sent successfully.', 'success', form);
                form.reset();
            } catch (error) {
                this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error', form);
            } finally {
                // Revert button to original state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitButton.disabled = false;
            }
        });
    },

    async submitForm(formData) {
        try {
            // Check if EmailJS configuration is available
            if (typeof window.EMAIL_CONFIG === 'undefined') {
                console.error('EmailJS configuration not found');
                return await this.fallbackSubmission(formData);
            }
            
            const config = window.EMAIL_CONFIG;
            
            // Validate configuration
            if (!config.SERVICE_ID || !config.TEMPLATE_ID || !config.PUBLIC_KEY) {
                console.error('Incomplete EmailJS configuration');
                return await this.fallbackSubmission(formData);
            }
            
            if (config.SERVICE_ID === 'YOUR_SERVICE_ID' || config.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || config.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                console.error('EmailJS configuration contains placeholder values');
                return await this.fallbackSubmission(formData);
            }

            // Check if EmailJS library is loaded
            if (typeof emailjs === 'undefined') {
                console.error('EmailJS library not loaded');
                return await this.fallbackSubmission(formData);
            }
            
            // Convert FormData to object
            const formObject = {};
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            console.log('Attempting to send email with EmailJS...', {
                serviceId: config.SERVICE_ID,
                templateId: config.TEMPLATE_ID,
                customerName: `${formObject.firstName} ${formObject.lastName}`
            });
            
            // Format the data for better email presentation
            const emailData = {
                to_email: config.TO_EMAIL,
                from_name: `${formObject.firstName} ${formObject.lastName}`,
                from_email: formObject.email,
                phone: `${formObject.countryCode || '+27'} ${formObject.phone}`,
                project_type: this.formatProjectType(formObject.projectType),
                property_type: this.formatPropertyType(formObject.propertyType),
                monthly_bill: this.formatMonthlyBill(formObject.monthlyBill),
                message: formObject.message || 'No additional message provided.',
                newsletter: formObject.newsletter ? 'Yes' : 'No',
                submission_date: new Date().toLocaleString(),
                // Email template variables
                customer_name: `${formObject.firstName} ${formObject.lastName}`,
                customer_email: formObject.email,
                customer_phone: `${formObject.countryCode || '+27'} ${formObject.phone}`,
                customer_project: this.formatProjectType(formObject.projectType),
                customer_property: this.formatPropertyType(formObject.propertyType) || 'Not specified',
                customer_bill: this.formatMonthlyBill(formObject.monthlyBill) || 'Not specified',
                customer_message: formObject.message || 'No additional message provided.',
                customer_newsletter: formObject.newsletter ? 'Yes' : 'No',
                formatted_date: new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            // Send email using EmailJS
            const response = await emailjs.send(config.SERVICE_ID, config.TEMPLATE_ID, emailData, config.PUBLIC_KEY);
            
            console.log('EmailJS response:', response);
            
            if (response.status === 200) {
                return {
                    success: true,
                    message: 'Thank you! Your consultation request has been sent successfully. We\'ll get back to you within 24 hours.'
                };
            } else {
                throw new Error(`EmailJS returned status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('EmailJS submission error:', error);
            
            // If EmailJS fails, try fallback method
            return await this.fallbackSubmission(formData);
        }
    },

    // Fallback method using mailto or form submission service
    async fallbackSubmission(formData) {
        try {
            console.log('Using fallback submission method...');
            
            // Convert FormData to object for logging
            const formObject = {};
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            console.log('Form data to be sent:', formObject);
            
            // Try using Formspree as a backup service (free tier available)
            try {
                const formspreeResponse = await fetch('https://formspree.io/f/xpwaaanw', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (formspreeResponse.ok) {
                    console.log('Formspree submission successful');
                    return {
                        success: true,
                        message: 'Thank you! Your consultation request has been received. We\'ll get back to you within 24 hours.'
                    };
                }
            } catch (formspreeError) {
                console.log('Formspree fallback failed:', formspreeError);
            }
            
            // If Formspree fails, use enhanced mailto with better handling
            return await this.handleMailtoFallback(formObject);
            
        } catch (error) {
            console.error('Fallback submission failed:', error);
            // Provide contact information as final fallback
            return {
                success: true,
                message: 'Please contact us directly: Email: info@nemesisenergy.co.za | Phone: +27662648645'
            };
        }
    },

    // Enhanced mailto handling with better browser compatibility and error handling
    async handleMailtoFallback(formObject) {
        try {
            // Create detailed email subject and body
            const emailSubject = `Solar Consultation Request - ${formObject.firstName} ${formObject.lastName}`;
            const emailBody = this.createDetailedEmailBody(formObject);
            
            // Check if mailto is supported/available
            const mailtoSupported = await this.checkMailtoSupport();
            
            if (!mailtoSupported) {
                console.log('Mailto not supported, showing alternative options');
                return this.showAlternativeContactMethods(formObject);
            }
            
            // Create mailto URL with proper encoding
            const mailtoUrl = this.createMailtoUrl('info@nemesisenergy.co.za', emailSubject, emailBody);
            
            // Check URL length - some email clients have limits
            if (mailtoUrl.length > 2000) {
                console.log('Mailto URL too long, using simplified version');
                const shortBody = this.createShortEmailBody(formObject);
                const shortMailtoUrl = this.createMailtoUrl('info@nemesisenergy.co.za', emailSubject, shortBody);
                return this.executeMailto(shortMailtoUrl, formObject);
            }
            
            return this.executeMailto(mailtoUrl, formObject);
            
        } catch (error) {
            console.error('Mailto handling failed:', error);
            return this.showAlternativeContactMethods(formObject);
        }
    },

    // Check if mailto is supported in current environment
    async checkMailtoSupport() {
        try {
            // Check if we're in a browser environment
            if (typeof window === 'undefined' || typeof navigator === 'undefined') {
                return false;
            }
            
            // Check for mobile apps that might not support mailto
            const userAgent = navigator.userAgent.toLowerCase();
            const isInApp = userAgent.includes('instagram') || 
                           userAgent.includes('fban') || 
                           userAgent.includes('fbav') || 
                           userAgent.includes('twitter') ||
                           userAgent.includes('linkedin');
            
            if (isInApp) {
                console.log('Detected in-app browser, mailto may not work');
                return false;
            }
            
            // Check if mailto protocol is registered (modern browsers)
            if ('registerProtocolHandler' in navigator) {
                return true;
            }
            
            return true; // Assume supported for most browsers
            
        } catch (error) {
            console.error('Error checking mailto support:', error);
            return false;
        }
    },

    // Create properly encoded mailto URL
    createMailtoUrl(to, subject, body) {
        try {
            // Encode components separately to avoid double encoding
            const encodedTo = encodeURIComponent(to);
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            
            return `mailto:${encodedTo}?subject=${encodedSubject}&body=${encodedBody}`;
        } catch (error) {
            console.error('Error creating mailto URL:', error);
            // Return basic mailto as fallback
            return `mailto:info@nemesisenergy.co.za?subject=${encodeURIComponent(subject)}`;
        }
    },

    // Execute mailto with proper error handling
    async executeMailto(mailtoUrl, formObject) {
        try {
            // Show user what's happening
            const userChoice = await this.showMailtoDialog(formObject);
            
            if (!userChoice) {
                return this.showAlternativeContactMethods(formObject);
            }
            
            // Try to open mailto
            const mailtoOpened = this.openMailto(mailtoUrl);
            
            if (mailtoOpened) {
                return {
                    success: true,
                    message: 'Your email client has been opened with a pre-filled message. Please review and send the email to complete your consultation request.'
                };
            } else {
                return this.showAlternativeContactMethods(formObject);
            }
            
        } catch (error) {
            console.error('Error executing mailto:', error);
            return this.showAlternativeContactMethods(formObject);
        }
    },

    // Show user-friendly dialog before opening mailto
    async showMailtoDialog(formObject) {
        try {
            // Create a more user-friendly custom dialog
            return new Promise((resolve) => {
                // Create custom modal instead of using confirm() which is often blocked
                const modal = this.createMailtoModal(formObject, resolve);
                document.body.appendChild(modal);
                
                // Auto-resolve to true after 10 seconds if no response
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                        resolve(true);
                    }
                }, 10000);
            });
        } catch (error) {
            console.error('Error showing mailto dialog:', error);
            return true; // Default to trying mailto
        }
    },

    // Create custom modal for mailto confirmation
    createMailtoModal(formObject, resolve) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: Inter, Arial, sans-serif;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 500px;
            margin: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
        modalContent.innerHTML = `
            <h3 style="color: #FF6B35; margin-bottom: 20px;">📧 Open Email Client</h3>
            <p style="margin-bottom: 20px; line-height: 1.6;">
                We'll open your email client with a pre-filled message containing your consultation request for:
            </p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <strong>${formObject.firstName} ${formObject.lastName}</strong><br>
                ${formObject.email}<br>
                ${this.formatProjectType(formObject.projectType)}
            </div>
            <p style="margin-bottom: 25px; color: #666; font-size: 14px;">
                You can review and edit the message before sending it to info@nemesisenergy.co.za
            </p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="openEmailBtn" style="
                    background: linear-gradient(135deg, #FF6B35 0%, #00D4FF 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">📧 Open Email Client</button>
                <button id="showContactBtn" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">📞 Show Contact Info</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        
        // Add event listeners
        const openEmailBtn = modalContent.querySelector('#openEmailBtn');
        const showContactBtn = modalContent.querySelector('#showContactBtn');
        
        openEmailBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(true);
        });
        
        showContactBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(false);
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                resolve(false);
            }
        });
        
        return modal;
    },

    // Open mailto with better error handling
    openMailto(mailtoUrl) {
        try {
            // Try multiple methods to open mailto
            
            // Method 1: window.location (most reliable)
            try {
                window.location.href = mailtoUrl;
                return true;
            } catch (e) {
                console.log('window.location failed, trying window.open');
            }
            
            // Method 2: window.open
            try {
                const newWindow = window.open(mailtoUrl, '_blank');
                if (newWindow) {
                    newWindow.close(); // Close the blank window that might open
                }
                return true;
            } catch (e) {
                console.log('window.open failed, trying link click');
            }
            
            // Method 3: Create and click invisible link
            try {
                const link = document.createElement('a');
                link.href = mailtoUrl;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return true;
            } catch (e) {
                console.log('link click failed');
            }
            
            return false;
            
        } catch (error) {
            console.error('All mailto methods failed:', error);
            return false;
        }
    },

    // Show alternative contact methods when mailto fails
    showAlternativeContactMethods(formObject) {
        const contactInfo = `
            📧 Email: info@nemesisenergy.co.za
            📞 Phone: +27662648645
            
            Your Request Details:
            • Name: ${formObject.firstName} ${formObject.lastName}
            • Email: ${formObject.email}
            • Phone: ${formObject.countryCode || '+27'} ${formObject.phone}
            • Project: ${this.formatProjectType(formObject.projectType)}
            • Property: ${this.formatPropertyType(formObject.propertyType) || 'Not specified'}
            • Monthly Bill: ${this.formatMonthlyBill(formObject.monthlyBill) || 'Not specified'}
            ${formObject.message ? `• Message: ${formObject.message}` : ''}
        `;
        
        // Copy to clipboard if possible
        this.copyToClipboard(contactInfo);
        
        return {
            success: true,
            message: `Please contact us directly using the information below. Your request details have been copied to your clipboard for easy reference.
            
📧 info@nemesisenergy.co.za
📞 +27662648645

We'll respond within 24 hours!`
        };
    },

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                console.log('Contact info copied to clipboard');
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    console.log('Contact info copied to clipboard (fallback)');
                } catch (err) {
                    console.log('Clipboard copy failed');
                }
                document.body.removeChild(textArea);
            }
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    },

    // Create detailed email body for mailto
    createDetailedEmailBody(formObject) {
        return `Hello Nemesis Energy Team,

I would like to request a free solar consultation. Here are my details:

CUSTOMER INFORMATION:
• Name: ${formObject.firstName} ${formObject.lastName}
• Email: ${formObject.email}
• Phone: ${formObject.countryCode || '+27'} ${formObject.phone}

PROJECT DETAILS:
• Project Type: ${this.formatProjectType(formObject.projectType)}
• Property Type: ${this.formatPropertyType(formObject.propertyType) || 'Not specified'}
• Current Monthly Energy Bill: ${this.formatMonthlyBill(formObject.monthlyBill) || 'Not specified'}
• Newsletter Subscription: ${formObject.newsletter ? 'Yes' : 'No'}

${formObject.message ? `ADDITIONAL MESSAGE:
${formObject.message}

` : ''}Please contact me to schedule a consultation at your earliest convenience.

Best regards,
${formObject.firstName} ${formObject.lastName}

---
This message was generated from the Nemesis Energy website contact form.
Submitted: ${new Date().toLocaleString()}`;
    },

    // Create shorter email body for URL length limitations
    createShortEmailBody(formObject) {
        return `Solar Consultation Request

Name: ${formObject.firstName} ${formObject.lastName}
Email: ${formObject.email}
Phone: ${formObject.countryCode || '+27'} ${formObject.phone}
Project: ${this.formatProjectType(formObject.projectType)}

${formObject.message ? `Message: ${formObject.message}` : 'Please contact me for a consultation.'}

Submitted: ${new Date().toLocaleDateString()}`;
    },

    // Helper functions to format form data
    formatProjectType(projectType) {
        const types = {
            'residential': 'Residential Solar System',
            'commercial': 'Commercial Solar System', 
            'hybrid': 'Hybrid System (Solar + Battery)',
            'maintenance': 'Maintenance & Monitoring',
            'consultation': 'General Consultation'
        };
        return types[projectType] || projectType;
    },

    formatPropertyType(propertyType) {
        const types = {
            'residential': 'Residential',
            'commercial': 'Commercial/Retail',
            'developer': 'Property Developer',
            'business': 'Business Owner'
        };
        return types[propertyType] || propertyType;
    },

    formatMonthlyBill(monthlyBill) {
        const bills = {
            'under-r5000': 'Under R5,000',
            'r5000-r10000': 'R5,000 - R10,000',
            'r10000-r20000': 'R10,000 - R20,000',
            'r20000-r35000': 'R20,000 - R35,000',
            'r35000-r50000': 'R35,000 - R50,000',
            'over-r50000': 'Over R50,000'
        };
        return bills[monthlyBill] || monthlyBill;
    },

    showFormMessage(message, type, form) {
        // Remove any existing message
        const existingMessage = document.getElementById('form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.id = 'form-message';
        messageElement.setAttribute('role', 'alert');
        
        // Position message after the submit button
        const submitButton = form.querySelector('.btn[type="submit"]');
        submitButton.parentNode.insertBefore(messageElement, submitButton.nextSibling);

        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.padding = '1rem';
        messageElement.style.borderRadius = '0.5rem';
        messageElement.style.marginTop = '1rem';
        messageElement.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        messageElement.style.color = type === 'success' ? '#155724' : '#721c24';
        messageElement.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;
        messageElement.style.textAlign = 'center';
        messageElement.style.fontSize = '0.95rem';
        messageElement.style.fontWeight = '500';

        // Smooth fade in
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            messageElement.style.opacity = '1';
        }, 50);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }, 5000);
    },

    setupFieldEnhancements(form) {
        // Auto-format phone numbers
        const phoneField = form.querySelector('input[type="tel"]');
        if (phoneField) {
            phoneField.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
                }
                e.target.value = value;
            });
        }

        // Auto-capitalize name fields
        const nameFields = form.querySelectorAll('input[name*="Name"], input[name*="name"]');
        nameFields.forEach(field => {
            field.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\b\w/g, l => l.toUpperCase());
            });
        });
    }
};

// ===== FAQ MODULE =====
const FAQ = {
    init() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length === 0) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (question && answer) {
                question.addEventListener('click', () => {
                    this.toggleFAQ(question, answer);
                });

                // Keyboard accessibility
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleFAQ(question, answer);
                    }
                });
            }
        });
    },

    toggleFAQ(question, answer) {
        const isActive = question.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-question.active').forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('active');
            }
        });

        // Toggle current FAQ
        if (isActive) {
            question.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
            answer.classList.remove('active');
        } else {
            question.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            answer.classList.add('active');
        }
    }
};

// ===== PERFORMANCE MODULE =====
const Performance = {
    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupServiceWorker();
    },

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
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
    },

    setupImageOptimization() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        });
    },

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
};

// ===== ACCESSIBILITY MODULE =====
const Accessibility = {
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    },

    setupKeyboardNavigation() {
        // Skip links for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    },

    setupFocusManagement() {
        // Trap focus in mobile menu when open
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && navMenu.classList.contains('active')) {
                    const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    },

    setupAriaLabels() {
        // Add aria labels to interactive elements
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            navToggle.setAttribute('aria-label', 'Toggle navigation menu');
            navToggle.setAttribute('aria-expanded', 'false');
        }

        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.setAttribute('aria-hidden', 'true');
        }

        // Add role and aria-label to forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.getAttribute('role')) {
                form.setAttribute('role', 'form');
            }
        });
    }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    },

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
};

// ===== HERO EFFECTS =====
const HeroEffects = {
    init() {
        this.heroSection = document.getElementById('hero-section');
        this.heroLogo = document.getElementById('hero-logo');
        this.spotlight = document.querySelector('.hero-spotlight');
        
        if (!this.heroSection) return;

        this.setupSpotlightEffect();
        this.setupLogoHover();
        this.setupMouseEvents();
    },

    setupSpotlightEffect() {
        let mouseX = 0;
        let mouseY = 0;
        let isMouseInHero = false;

        // Throttle mouse movement for performance
        const throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        };

        const updateMousePosition = throttle((e) => {
            if (!isMouseInHero) return;
            
            const rect = this.heroSection.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 100;
            mouseY = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.heroSection.style.setProperty('--mouse-x', `${mouseX}%`);
            this.heroSection.style.setProperty('--mouse-y', `${mouseY}%`);
        }, 16); // ~60fps

        // Mouse enter hero section
        this.heroSection.addEventListener('mouseenter', () => {
            isMouseInHero = true;
            this.heroSection.classList.add('active');
        });

        // Mouse leave hero section
        this.heroSection.addEventListener('mouseleave', () => {
            isMouseInHero = false;
            this.heroSection.classList.remove('active');
        });

        // Track mouse movement
        this.heroSection.addEventListener('mousemove', updateMousePosition);
    },

    setupLogoHover() {
        if (!this.heroLogo) return;

        // Logo hover effect
        this.heroLogo.addEventListener('mouseenter', () => {
            this.heroSection.classList.add('active');
        });

        // Click effect for mobile
        this.heroLogo.addEventListener('click', (e) => {
            e.preventDefault();
            this.heroSection.classList.toggle('active');
            
            // Auto-deactivate after 3 seconds on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.heroSection.classList.remove('active');
                }, 3000);
            }
        });
    },

    setupMouseEvents() {
        // Add touch support for mobile devices - but only for spotlight effects, not neon glow
        if ('ontouchstart' in window) {
            let touchTimer;
            
            this.heroSection.addEventListener('touchstart', (e) => {
                this.heroSection.classList.add('active');
                
                // Clear any existing timer
                if (touchTimer) {
                    clearTimeout(touchTimer);
                }
                
                // Deactivate after 2 seconds of no touch
                touchTimer = setTimeout(() => {
                    this.heroSection.classList.remove('active');
                }, 2000);
            });
            
            this.heroSection.addEventListener('touchmove', (e) => {
                // Get touch position for spotlight effect
                if (e.touches[0]) {
                    const touch = e.touches[0];
                    const rect = this.heroSection.getBoundingClientRect();
                    const touchX = ((touch.clientX - rect.left) / rect.width) * 100;
                    const touchY = ((touch.clientY - rect.top) / rect.height) * 100;
                    
                    this.heroSection.style.setProperty('--mouse-x', `${touchX}%`);
                    this.heroSection.style.setProperty('--mouse-y', `${touchY}%`);
                }
                
                // Reset timer
                if (touchTimer) {
                    clearTimeout(touchTimer);
                }
                touchTimer = setTimeout(() => {
                    this.heroSection.classList.remove('active');
                }, 2000);
            });
        }
    }
};

// ===== CLEAN URL MODULE =====
const CleanURL = {
    init() {
        this.updateCurrentURL();
        this.setupCleanURLs();
    },

    updateCurrentURL() {
        // Clean up current URL if it has .html extension
        const currentPath = window.location.pathname;
        if (currentPath.endsWith('.html') && !currentPath.endsWith('index.html')) {
            const cleanPath = currentPath.replace('.html', '');
            window.history.replaceState(null, '', cleanPath);
        } else if (currentPath.endsWith('/index.html')) {
            const cleanPath = currentPath.replace('/index.html', '/');
            window.history.replaceState(null, '', cleanPath);
        }
    },

    setupCleanURLs() {
        // Intercept all internal links
        document.addEventListener('click', (e) => {
            // Find closest anchor tag
            let target = e.target;
            while (target && target.tagName !== 'A') {
                target = target.parentElement;
            }
            
            if (!target) return;
            
            const href = target.getAttribute('href');
            
            // Skip non-internal links, anchors, and external links
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('http') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') || 
                href.startsWith('javascript:')) {
                return;
            }
            
            // For clean URLs (without .html), add .html extension for actual navigation
            if (!href.includes('.') && !href.endsWith('/')) {
                e.preventDefault();
                const actualHref = href + '.html';
                
                // Update URL to clean version
                window.history.pushState(null, '', href);
                
                // Navigate to actual file
                setTimeout(() => {
                    window.location.href = actualHref;
                }, 0);
                
                return;
            }
            
            // For .html links, update URL to clean version
            if (href.endsWith('.html')) {
                e.preventDefault();
                const cleanUrl = href.replace('.html', '');
                
                // For index.html, redirect to root
                if (href === 'index.html' || href === './index.html') {
                    window.history.pushState(null, '', '/');
                    window.location.href = href;
                } else {
                    // Update URL to clean version and navigate
                    window.history.pushState(null, '', cleanUrl);
                    window.location.href = href;
                }
                
                return;
            }
        });
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Navigation, ScrollAnimations, ContactForm, FAQ, Performance, Accessibility, Utils, HeroEffects, CleanURL };
}
