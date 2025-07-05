// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');
const availabilityForm = document.getElementById('availabilityForm');
const zipCodeInput = document.getElementById('zipCode');
const zipError = document.getElementById('zipError');
const coverageAreas = document.querySelectorAll('.coverage-area');
const mapTooltip = document.getElementById('mapTooltip');
const plansGrid = document.getElementById('plansGrid');
const faqItems = document.querySelectorAll('.faq-item');
const speedTestButton = document.getElementById('startSpeedTest');
const speedValue = document.getElementById('speedValue');
const speedNeedle = document.getElementById('speedNeedle');
const downloadSpeed = document.getElementById('downloadSpeed');
const uploadSpeed = document.getElementById('uploadSpeed');
const pingSpeed = document.getElementById('pingSpeed');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const contactForm = document.getElementById('contactForm');
const liveChatWidget = document.getElementById('liveChatWidget');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Global Variables
let currentTestimonial = 0;
let testimonialInterval;
let isSpeedTesting = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeAvailabilityChecker();
    initializeCoverageMap();
    initializePlanComparison();
    initializeFAQ();
    initializeSpeedTest();
    initializeTestimonials();
    initializeContactForm();
    initializeLazyLoading();
    initializeScrollAnimations();
    initializeLiveChat();
    initializePartnersSlider();
    initializeAOS();
});

// Header Functions
function initializeHeader() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        this.classList.toggle('open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('open');
            mobileMenuToggle.classList.remove('open');
        });
    });
}

// Availability Checker Functions
function initializeAvailabilityChecker() {
    availabilityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const zipCode = zipCodeInput.value.trim();
        
        if (!validateZipCode(zipCode)) {
            showZipError('Please enter a valid 5-digit ZIP code');
            return;
        }
        
        clearZipError();
        checkAvailability(zipCode);
    });

    zipCodeInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 5);
        clearZipError();
    });
}

function validateZipCode(zipCode) {
    return /^\d{5}$/.test(zipCode);
}

function showZipError(message) {
    zipError.textContent = message;
    zipError.style.display = 'block';
    zipCodeInput.style.borderColor = '#EF4444';
}

function clearZipError() {
    zipError.style.display = 'none';
    zipCodeInput.style.borderColor = '#E2E8F0';
}

function checkAvailability(zipCode) {
    // Simulate API call
    const button = availabilityForm.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Checking...';
    button.disabled = true;
    
    setTimeout(function() {
        button.textContent = originalText;
        button.disabled = false;
        
        // Show plans section
        scrollToSection('plans');
        
        // Show success message
        showNotification('Great news! High-speed internet is available in your area. Call +1 (866) 882-7480 to get started!', 'success');
    }, 2000);
}

// Coverage Map Functions
function initializeCoverageMap() {
    coverageAreas.forEach(area => {
        area.addEventListener('mouseenter', function(e) {
            const state = this.dataset.state;
            showMapTooltip(e, state);
        });
        
        area.addEventListener('mouseleave', function() {
            hideMapTooltip();
        });
        
        area.addEventListener('click', function() {
            const state = this.dataset.state;
            showStateInfo(state);
        });
    });
}

function showMapTooltip(e, state) {
    mapTooltip.textContent = `${state} - High-speed internet available`;
    mapTooltip.style.left = e.pageX + 10 + 'px';
    mapTooltip.style.top = e.pageY - 30 + 'px';
    mapTooltip.classList.add('show');
}

function hideMapTooltip() {
    mapTooltip.classList.remove('show');
}

function showStateInfo(state) {
    showNotification(`${state} has excellent coverage with speeds up to 1 Gbps available! Call +1 (866) 882-7480 for details.`, 'info');
}

// Plan Comparison Functions
function initializePlanComparison() {
    // Plan type toggle functionality is handled by the onclick attribute in HTML
}

function togglePlanType(type) {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Update plans based on type
    updatePlansDisplay(type);
}

function updatePlansDisplay(type) {
    const plans = plansGrid.querySelectorAll('.plan-card');
    
    plans.forEach(plan => {
        plan.style.opacity = '0';
        plan.style.transform = 'translateY(20px)';
    });
    
    setTimeout(function() {
        if (type === 'business') {
            updateBusinessPlans();
        } else {
            updateResidentialPlans();
        }
        
        plans.forEach((plan, index) => {
            setTimeout(function() {
                plan.style.opacity = '1';
                plan.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 200);
}

function updateBusinessPlans() {
    const planCards = plansGrid.querySelectorAll('.plan-card');
    
    // Update plan 1
    planCards[0].querySelector('h3').textContent = 'Business Basic';
    planCards[0].querySelector('.price').textContent = '$79.99';
    planCards[0].querySelector('.plan-features ul').innerHTML = `
        <li>Up to 200 Mbps</li>
        <li>Static IP included</li>
        <li>Business support</li>
        <li>No data caps</li>
        <li>99.9% uptime SLA</li>
    `;
    
    // Update plan 2
    planCards[1].querySelector('h3').textContent = 'Business Pro';
    planCards[1].querySelector('.price').textContent = '$129.99';
    planCards[1].querySelector('.plan-features ul').innerHTML = `
        <li>Up to 500 Mbps</li>
        <li>5 Static IPs</li>
        <li>Priority support</li>
        <li>No data caps</li>
        <li>99.9% uptime SLA</li>
        <li>Free installation</li>
    `;
    
    // Update plan 3
    planCards[2].querySelector('h3').textContent = 'Business Elite';
    planCards[2].querySelector('.price').textContent = '$199.99';
    planCards[2].querySelector('.plan-features ul').innerHTML = `
        <li>Up to 1 Gbps</li>
        <li>10 Static IPs</li>
        <li>Dedicated support</li>
        <li>No data caps</li>
        <li>99.99% uptime SLA</li>
        <li>Free installation</li>
        <li>Security suite</li>
    `;
}

function updateResidentialPlans() {
    const planCards = plansGrid.querySelectorAll('.plan-card');
    
    // Update plan 1
    planCards[0].querySelector('h3').textContent = 'Essential';
    planCards[0].querySelector('.price').textContent = '$39.99';
    planCards[0].querySelector('.plan-features ul').innerHTML = `
        <li>Up to 100 Mbps</li>
        <li>WiFi included</li>
        <li>Basic support</li>
        <li>No data caps</li>
    `;
    
    // Update plan 2
    planCards[1].querySelector('h3').textContent = 'Premium';
    planCards[1].querySelector('.price').textContent = '$59.99';
    planCards[1].querySelector('.plan-features ul').innerHTML = `
        <li>Up to 500 Mbps</li>
        <li>WiFi 6 included</li>
        <li>Priority support</li>
        <li>No data caps</li>
        <li>Free installation</li>
    `;
    
    // Update plan 3
    planCards[2].querySelector('h3').textContent = 'Ultimate';
    planCards[2].querySelector('.price').textContent = '$79.99';
    planCards[2].querySelector('.plan-features ul').innerHTML = `
        <li>Up to 1 Gbps</li>
        <li>WiFi 6E included</li>
        <li>24/7 premium support</li>
        <li>No data caps</li>
        <li>Free installation</li>
        <li>Security suite</li>
    `;
}

// FAQ Functions
function initializeFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-answer').classList.remove('open');
                }
            });
            
            // Toggle current item
            this.setAttribute('aria-expanded', !isOpen);
            answer.classList.toggle('open');
        });
    });
}

// Speed Test Functions
function initializeSpeedTest() {
    speedTestButton.addEventListener('click', function() {
        if (!isSpeedTesting) {
            startSpeedTest();
        }
    });
}

function startSpeedTest() {
    if (isSpeedTesting) return;
    
    isSpeedTesting = true;
    speedTestButton.textContent = 'Testing...';
    speedTestButton.disabled = true;
    
    // Reset values
    speedValue.textContent = '0';
    downloadSpeed.textContent = '--';
    uploadSpeed.textContent = '--';
    pingSpeed.textContent = '--';
    
    // Simulate speed test
    let progress = 0;
    const testInterval = setInterval(function() {
        progress += Math.random() * 20;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(testInterval);
            completeSpeedTest();
        }
        
        const speed = Math.floor(progress * 2.5); // Max 250 Mbps
        speedValue.textContent = speed;
        updateSpeedGauge(speed);
    }, 100);
}

function completeSpeedTest() {
    const finalDownload = Math.floor(Math.random() * 200) + 50; // 50-250 Mbps
    const finalUpload = Math.floor(Math.random() * 50) + 10; // 10-60 Mbps
    const finalPing = Math.floor(Math.random() * 30) + 5; // 5-35 ms
    
    downloadSpeed.textContent = finalDownload + ' Mbps';
    uploadSpeed.textContent = finalUpload + ' Mbps';
    pingSpeed.textContent = finalPing + ' ms';
    
    speedTestButton.textContent = 'Test Again';
    speedTestButton.disabled = false;
    isSpeedTesting = false;
    
    // Show recommendation
    let recommendation = '';
    if (finalDownload >= 100) {
        recommendation = 'Excellent! Your speed is great for streaming, gaming, and working from home.';
    } else if (finalDownload >= 50) {
        recommendation = 'Good speed for most activities. Consider upgrading for better performance. Call +1 (866) 882-7480!';
    } else {
        recommendation = 'Your speed could be improved. Check our high-speed plans! Call +1 (866) 882-7480 now!';
    }
    
    showNotification(recommendation, 'info');
}

function updateSpeedGauge(speed) {
    const percentage = Math.min(speed / 250, 1);
    const degrees = percentage * 180;
    
    const gauge = document.querySelector('.speed-gauge');
    gauge.style.background = `conic-gradient(from 0deg, #6366F1 ${degrees}deg, #F1F5F9 ${degrees}deg)`;
}

// Testimonials Functions
function initializeTestimonials() {
    if (testimonialCards.length === 0) return;
    
    testimonialInterval = setInterval(function() {
        nextTestimonial();
    }, 5000);
}

function nextTestimonial() {
    testimonialCards[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    testimonialCards[currentTestimonial].classList.add('active');
}

// Contact Form Functions
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateContactForm(data)) {
            return;
        }
        
        // Submit form
        submitContactForm(data);
    });
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!data.email.trim() || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
    }
    
    if (!data.zip.trim() || !validateZipCode(data.zip)) {
        errors.push('Valid ZIP code is required');
    }
    
    if (!data.message.trim()) {
        errors.push('Message is required');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('. '), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitContactForm(data) {
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(function() {
        button.textContent = originalText;
        button.disabled = false;
        
        showNotification('Thank you for your message! We\'ll get back to you soon. For immediate assistance, call +1 (866) 882-7480.', 'success');
        contactForm.reset();
    }, 2000);
}

// Live Chat Functions
function initializeLiveChat() {
    const chatButton = document.querySelector('.live-chat-btn');
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            toggleChat();
        });
    }
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function toggleChat() {
    chatWindow.classList.toggle('open');
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(function() {
        const responses = [
            'Thanks for your message! For immediate assistance, please call +1 (866) 882-7480.',
            'I\'d be happy to help you find the perfect internet plan. Call +1 (866) 882-7480 to speak with a specialist.',
            'Let me connect you with our team at +1 (866) 882-7480 for personalized service.',
            'Would you like to check availability in your area? Call +1 (866) 882-7480 now!'
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(response, 'bot');
    }, 1000);
}

function addChatMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Partners Slider Functions
function initializePartnersSlider() {
    const partnersSlider = document.querySelector('.partners-slider');
    if (!partnersSlider) return;
    
    // Add hover pause effect
    partnersSlider.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    partnersSlider.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Lazy Loading Functions
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Scroll Animations Functions
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .plan-card, .blog-card, .deal-card');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });
    }
}

// AOS (Animate On Scroll) Functions
function initializeAOS() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    if ('IntersectionObserver' in window) {
        const aosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        aosElements.forEach(element => {
            aosObserver.observe(element);
        });
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = header.offsetHeight;
        const top = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#6366F1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 350px;
        font-size: 0.9rem;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 6 seconds
    setTimeout(function() {
        notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(function() {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 6000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOutRight {
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

// Cleanup function
window.addEventListener('beforeunload', function() {
    if (testimonialInterval) clearInterval(testimonialInterval);
});

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.togglePlanType = togglePlanType;
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;