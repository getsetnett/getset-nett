// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');
const faqItems = document.querySelectorAll('.faq-item');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const contactForm = document.getElementById('contactForm');
const liveChatWidget = document.getElementById('liveChatWidget');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Global Variables
let currentTestimonial = 0;
let testimonialInterval;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeFAQ();
    initializeTestimonials();
    initializeContactForm();
    initializeLazyLoading();
    initializeScrollAnimations();
    initializeLiveChat();
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

// FAQ Functions
function initializeFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other items
            faqItems.forEach(otherItem => {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherAnswer.style.maxHeight = '0px';
            });
            
            // Toggle current item
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}


// Speed Test Functions
function initializeSpeedTest() {
    const speedTestButton = document.getElementById('startSpeedTest');
    if (!speedTestButton) return;
    
    speedTestButton.addEventListener('click', function() {
        startSpeedTest();
    });
}

function startSpeedTest() {
    showNotification('Speed test feature unavailable. For connectivity assistance, please call +1 (866) 882-7480.', 'info');
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
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;