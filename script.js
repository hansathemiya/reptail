// WhatsApp Integration
function openWhatsApp() {
    const phone = '94758244216';
    const defaultMessage = 'Hello! I need sewing machine repair service in Colombo area.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
    
    // Track WhatsApp click
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'event_category': 'conversion',
            'event_label': 'whatsapp_contact'
        });
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        const icon = this.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuToggle.querySelector('i').classList.remove('fa-times');
            mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });
}

// FAQ Toggle Functionality
function toggleFAQ(id) {
    const answer = document.getElementById(`faq-answer-${id}`);
    const question = answer.parentElement;
    const icon = question.querySelector('.faq-question i');
    
    // Toggle active class
    answer.classList.toggle('active');
    question.classList.toggle('active');
    
    // Rotate icon
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
    
    // Close other FAQs
    const allFaqs = document.querySelectorAll('.faq-item');
    allFaqs.forEach(faq => {
        if (faq !== question && faq.classList.contains('active')) {
            const otherAnswer = faq.querySelector('.faq-answer');
            const otherIcon = faq.querySelector('.faq-question i');
            otherAnswer.classList.remove('active');
            faq.classList.remove('active');
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
}

// Form Submission Handler
function submitBookingForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('repairBookingForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        brand: document.getElementById('brand').value,
        issue: document.getElementById('issue').value,
        emergency: document.getElementById('emergency').checked,
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.location || !formData.issue) {
        alert('Please fill in all required fields marked with *');
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // In a real implementation, you would send this data to your server
    // For now, we'll simulate an API call and redirect to WhatsApp
    setTimeout(() => {
        // Prepare WhatsApp message
        const message = `*New Repair Booking Request*
        
Name: ${formData.name}
Phone: ${formData.phone}
Location: ${formData.location}
Brand: ${formData.brand || 'Not specified'}
Issue: ${formData.issue}
Emergency: ${formData.emergency ? 'Yes' : 'No'}`;
        
        // Open WhatsApp with the form data
        const phone = '94758244216';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        
        // Reset form
        form.reset();
        
        // Restore button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // Show success message
        alert('Thank you! Your repair request has been sent. We will contact you within 30 minutes.');
        
        // Track form submission
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'conversion',
                'event_label': 'repair_booking'
            });
        }
    }, 1500);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll event for header
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as Sri Lankan phone number
            if (value.length > 0) {
                if (value.startsWith('94')) {
                    value = value.substring(2);
                }
                
                if (value.length > 9) {
                    value = value.substring(0, 9);
                }
                
                if (value.length > 0) {
                    value = '+94 ' + value;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Form validation
    const bookingForm = document.getElementById('repairBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', submitBookingForm);
    }
    
    // Initialize FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.setAttribute('data-faq-id', index + 1);
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.id = `faq-answer-${index + 1}`;
        }
        
        // Add click event if not already added via onclick attribute
        if (!item.getAttribute('onclick')) {
            item.addEventListener('click', () => toggleFAQ(index + 1));
        }
    });
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Google Analytics (if you add the tracking code)
// This is a placeholder - you would replace with your actual GA4 code
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR-GA4-MEASUREMENT-ID');
*/
