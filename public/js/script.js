// Jethalal Clothing Website - Client-side JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeProductInteractions();
    initializeFormValidation();
    initializeCartFunctionality();
    initializeSearchAndFilter();
    initializeTrustElements();
    initializeAccessibility();
    initializePerformanceOptimizations();
});

// Trust and Psychology Elements
function initializeTrustElements() {
    // Social proof notifications
    showSocialProofNotifications();
    
    // Urgency timers
    initializeUrgencyElements();
    
    // Trust badges animation
    animateTrustBadges();
    
    // Customer testimonials rotation
    initializeTestimonialRotation();
}

function showSocialProofNotifications() {
    const notifications = [
        { name: "Priya from Mumbai", action: "just ordered a Premium Cotton T-Shirt", time: "2 minutes ago" },
        { name: "Rajesh from Delhi", action: "bought 3 Formal Shirts", time: "5 minutes ago" },
        { name: "Sunita from Pune", action: "ordered Classic Denim Jeans", time: "8 minutes ago" },
        { name: "Amit from Bangalore", action: "purchased a Winter Hoodie", time: "12 minutes ago" },
        { name: "Kavita from Chennai", action: "bought Cotton Trousers", time: "15 minutes ago" }
    ];
    
    let currentIndex = 0;
    
    function showNextNotification() {
        if (document.querySelector('.social-proof-popup')) {
            return; // Don't show if one is already visible
        }
        
        const notification = notifications[currentIndex];
        const popup = document.createElement('div');
        popup.className = 'social-proof-popup position-fixed';
        popup.style.cssText = `
            bottom: 20px;
            left: 20px;
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
            animation: slideInLeft 0.5s ease;
        `;
        
        popup.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                    <i class="fas fa-shopping-bag text-white"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="fw-bold text-success">${notification.name}</div>
                    <div class="small text-muted">${notification.action}</div>
                    <div class="small text-muted">${notification.time}</div>
                </div>
                <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.style.animation = 'slideOutLeft 0.5s ease';
                setTimeout(() => popup.remove(), 500);
            }
        }, 5000);
        
        currentIndex = (currentIndex + 1) % notifications.length;
    }
    
    // Show first notification after 3 seconds
    setTimeout(showNextNotification, 3000);
    
    // Show subsequent notifications every 15 seconds
    setInterval(showNextNotification, 15000);
}

function initializeUrgencyElements() {
    // Stock countdown for low stock items
    const stockElements = document.querySelectorAll('[data-stock]');
    stockElements.forEach(element => {
        const stock = parseInt(element.dataset.stock);
        if (stock <= 5 && stock > 0) {
            element.classList.add('urgency-pulse');
        }
    });
    
    // Limited time offers countdown
    const offerElements = document.querySelectorAll('.limited-offer');
    offerElements.forEach(element => {
        startCountdown(element);
    });
}

function animateTrustBadges() {
    const trustBadges = document.querySelectorAll('.trust-badge, .trust-feature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                entry.target.classList.add('animate-trust-badge');
            }
        });
    }, { threshold: 0.1 });
    
    trustBadges.forEach(badge => observer.observe(badge));
}

function initializeTestimonialRotation() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;
    
    let currentTestimonial = 0;
    
    function highlightTestimonial() {
        testimonialCards.forEach((card, index) => {
            card.classList.remove('featured-testimonial');
            if (index === currentTestimonial) {
                card.classList.add('featured-testimonial');
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
    
    // Highlight testimonials every 8 seconds
    setInterval(highlightTestimonial, 8000);
}

// Product Interactions
function initializeProductInteractions() {
    // Product image gallery (for product detail page)
    const thumbnailImages = document.querySelectorAll('.thumbnail-img');
    thumbnailImages.forEach(img => {
        img.addEventListener('click', function() {
            changeMainImage(this.src, this);
        });
    });

    // Quantity controls
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateQuantity(this);
        });
    });
    
    // Buy Now button tracking
    const buyNowButtons = document.querySelectorAll('[href*="buy-now"], .buy-now-overlay');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track buy now clicks for analytics
            console.log('Buy Now clicked:', this.href || this.textContent);
            
            // Add urgency messaging
            if (!document.querySelector('.urgency-message')) {
                showUrgencyMessage();
            }
        });
    });
}

function showUrgencyMessage() {
    const message = document.createElement('div');
    message.className = 'urgency-message alert alert-warning position-fixed';
    message.style.cssText = `
        top: 80px;
        right: 20px;
        z-index: 1050;
        max-width: 300px;
        animation: slideInRight 0.5s ease;
    `;
    message.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-fire text-warning me-2"></i>
            <div>
                <strong>Great choice!</strong><br>
                <small>2 others are viewing this item</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }
    }, 4000);
}

// Change main product image
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail-img').forEach(img => {
            img.classList.remove('active');
        });
        thumbnail.classList.add('active');
        
        // Add zoom effect
        mainImage.style.transform = 'scale(1.05)';
        setTimeout(() => {
            mainImage.style.transform = 'scale(1)';
        }, 200);
    }
}

// Quantity validation and controls
function validateQuantity(input) {
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || 100;
    let value = parseInt(input.value) || 1;

    if (value < min) {
        input.value = min;
    } else if (value > max) {
        input.value = max;
        showNotification(`Maximum quantity allowed is ${max}`, 'warning');
    }
    
    // Update pricing if on product page
    updateProductPricing();
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value) || 1;
        const maxValue = parseInt(quantityInput.max) || 100;
        const minValue = parseInt(quantityInput.min) || 1;
        
        const newValue = currentValue + change;
        
        if (newValue >= minValue && newValue <= maxValue) {
            quantityInput.value = newValue;
            updateProductPricing();
        } else if (newValue > maxValue) {
            showNotification(`Maximum quantity available is ${maxValue}`, 'warning');
        }
    }
}

function updateProductPricing() {
    const quantityInput = document.getElementById('quantity');
    const priceElement = document.querySelector('.product-price');
    
    if (quantityInput && priceElement) {
        const quantity = parseInt(quantityInput.value) || 1;
        const basePrice = parseInt(priceElement.dataset.basePrice) || 0;
        const totalPrice = basePrice * quantity;
        
        // Update display price
        const displayPrice = priceElement.querySelector('.price-amount');
        if (displayPrice) {
            displayPrice.textContent = totalPrice.toLocaleString('en-IN');
        }
        
        // Show savings for bulk orders
        if (quantity >= 3) {
            showBulkSavingsMessage(quantity);
        }
    }
}

function showBulkSavingsMessage(quantity) {
    if (document.querySelector('.bulk-savings')) return;
    
    const savings = Math.floor(quantity * 0.05 * 100); // 5% savings simulation
    const message = document.createElement('div');
    message.className = 'bulk-savings alert alert-success mt-2';
    message.innerHTML = `
        <i class="fas fa-gift me-2"></i>
        <strong>Bulk Order Bonus!</strong> You're saving ₹${savings} on this order!
    `;
    
    const quantitySection = document.querySelector('.quantity-input').parentNode;
    quantitySection.appendChild(message);
    
    setTimeout(() => message.remove(), 8000);
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form[data-validate="true"], #checkoutForm, #addToCartForm, #buyNowForm');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(this)) {
                event.preventDefault();
                event.stopPropagation();
                
                // Show specific error guidance
                showFormErrorGuidance(this);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
                
                // Show positive reinforcement for correct inputs
                if (this.value.trim() && validateField(this, true)) {
                    showFieldPositiveReinforcement(this);
                }
            });
        });
    });
}

function showFormErrorGuidance(form) {
    const invalidFields = form.querySelectorAll('.is-invalid');
    if (invalidFields.length > 0) {
        const guidance = document.createElement('div');
        guidance.className = 'form-guidance alert alert-info mt-3';
        guidance.innerHTML = `
            <h6><i class="fas fa-lightbulb me-2"></i>Quick Help:</h6>
            <ul class="mb-0">
                <li>Name: Use your full name as it appears on ID</li>
                <li>Mobile: Enter 10-digit number without country code</li>
                <li>Email: Only Gmail addresses (@gmail.com) accepted</li>
                <li>Address: Include house number, street, area, city, PIN</li>
            </ul>
        `;
        
        form.appendChild(guidance);
        setTimeout(() => guidance.remove(), 10000);
    }
}

function showFieldPositiveReinforcement(field) {
    if (field.dataset.reinforced) return;
    
    field.dataset.reinforced = 'true';
    const checkmark = document.createElement('i');
    checkmark.className = 'fas fa-check-circle text-success position-absolute';
    checkmark.style.cssText = `
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
    `;
    
    field.parentNode.style.position = 'relative';
    field.parentNode.appendChild(checkmark);
    
    setTimeout(() => {
        checkmark.remove();
        delete field.dataset.reinforced;
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field, silent = false) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Clear previous validation state
    if (!silent) clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(field)} is required.`;
        isValid = false;
    }

    // Specific field validations
    if (value && field.type === 'email') {
        if (field.name === 'email' && !value.toLowerCase().endsWith('@gmail.com')) {
            errorMessage = 'Only Gmail addresses are accepted (must end with @gmail.com).';
            isValid = false;
        } else if (!isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
    }

    if (value && field.type === 'tel') {
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(value.replace(/\s+/g, ''))) {
            errorMessage = 'Please enter a valid 10-digit mobile number.';
            isValid = false;
        }
    }

    if (value && field.name === 'name' && value.length < 2) {
        errorMessage = 'Name must be at least 2 characters long.';
        isValid = false;
    }

    if (value && field.name === 'address' && value.length < 10) {
        errorMessage = 'Please provide a complete address (minimum 10 characters).';
        isValid = false;
    }

    // Show validation result
    if (!isValid && !silent) {
        showFieldError(field, errorMessage);
    } else if (value && !silent) {
        showFieldSuccess(field);
    }

    return isValid;
}

function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    if (label) {
        return label.textContent.replace('*', '').trim();
    }
    return field.name.charAt(0).toUpperCase() + field.name.slice(1);
}

function showFieldError(field, message) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    
    let feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
    }
}

function showFieldSuccess(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

function clearFieldError(field) {
    field.classList.remove('is-invalid', 'is-valid');
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Cart Functionality
function initializeCartFunctionality() {
    // Add to cart form
    const addToCartForm = document.getElementById('addToCartForm');
    if (addToCartForm) {
        addToCartForm.addEventListener('submit', handleAddToCart);
    }

    // Update cart count display
    updateCartDisplay();
    
    // Cart abandonment prevention
    initializeCartAbandonmentPrevention();
}

function initializeCartAbandonmentPrevention() {
    let cartInteractionTime = Date.now();
    
    // Track cart interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card, .btn[href*="cart"], .btn[href*="buy-now"]')) {
            cartInteractionTime = Date.now();
        }
    });
    
    // Show retention message if user is about to leave
}

async function handleAddToCart(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validate required fields
    if (!validateForm(form)) {
        showNotification('Please select all required options', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Adding...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const response = await fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            updateCartCount(result.cartCount);
            showAddToCartSuccess(data);
            
            // Reset form if needed
            const sizeInputs = form.querySelectorAll('input[name="size"]');
            const colorInputs = form.querySelectorAll('input[name="color"]');
            sizeInputs.forEach(input => input.checked = false);
            colorInputs.forEach(input => input.checked = false);
            form.querySelector('input[name="quantity"]').value = 1;
        } else {
            showNotification(result.error || 'Error adding product to cart', 'error');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error adding product to cart. Please try again.', 'error');
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showAddToCartSuccess(productData) {
    const successModal = document.createElement('div');
    successModal.className = 'cart-success-modal position-fixed';
    successModal.style.cssText = `
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 1060;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    successModal.innerHTML = `
        <div class="bg-white rounded p-4 text-center" style="max-width: 400px;">
            <i class="fas fa-check-circle text-success fs-1 mb-3"></i>
            <h4 class="fw-bold mb-3">Added to Cart!</h4>
            <p class="text-muted mb-4">Your item has been added successfully</p>
            <div class="d-flex gap-2">
                <a href="/cart" class="btn btn-primary flex-fill">View Cart</a>
                <a href="/products" class="btn btn-outline-secondary flex-fill">Continue Shopping</a>
            </div>
            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (successModal.parentNode) {
            successModal.remove();
        }
    }, 5000);
    
    // Close on background click
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.remove();
        }
    });
}

function updateCartCount(count) {
    const cartCountElement = document.querySelector('.badge');
    const cartLink = document.querySelector('a[href="/cart"]');
    
    if (count > 0) {
        if (cartCountElement) {
            cartCountElement.textContent = count;
            cartCountElement.classList.add('cart-bounce');
            setTimeout(() => cartCountElement.classList.remove('cart-bounce'), 600);
        } else if (cartLink) {
            cartLink.innerHTML += `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${count}</span>`;
        }
    } else if (cartCountElement) {
        cartCountElement.remove();
    }
}

function updateCartDisplay() {
    // Update cart count on page load if needed
    const cartCountElement = document.querySelector('.badge');
    if (cartCountElement) {
        const count = parseInt(cartCountElement.textContent) || 0;
        if (count === 0) {
            cartCountElement.style.display = 'none';
        }
    }
}

// Search and Filter
function initializeSearchAndFilter() {
    const searchInput = document.querySelector('input[name="search"]');
    const categorySelect = document.querySelector('select[name="category"]');
    
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.value.length >= 3 || this.value.length === 0) {
                    // Auto-submit search after 500ms delay
                    // this.form.submit();
                }
            }, 500);
        });
        
        // Add search suggestions
        addSearchSuggestions(searchInput);
    }
}

function addSearchSuggestions(searchInput) {
    const suggestions = ['cotton t-shirt', 'formal shirt', 'denim jeans', 'winter hoodie', 'casual trousers'];
    
    searchInput.addEventListener('focus', function() {
        if (!this.value && !document.querySelector('.search-suggestions')) {
            const suggestionBox = document.createElement('div');
            suggestionBox.className = 'search-suggestions position-absolute bg-white border rounded shadow-sm';
            suggestionBox.style.cssText = `
                top: 100%;
                left: 0;
                right: 0;
                z-index: 1000;
                max-height: 200px;
                overflow-y: auto;
            `;
            
            suggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'suggestion-item p-2 cursor-pointer';
                item.textContent = suggestion;
                item.addEventListener('click', () => {
                    searchInput.value = suggestion;
                    suggestionBox.remove();
                    searchInput.form.submit();
                });
                item.addEventListener('mouseenter', () => item.classList.add('bg-light'));
                item.addEventListener('mouseleave', () => item.classList.remove('bg-light'));
                suggestionBox.appendChild(item);
            });
            
            searchInput.parentNode.style.position = 'relative';
            searchInput.parentNode.appendChild(suggestionBox);
            
            // Remove suggestions when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
                    suggestionBox.remove();
                }
            }, { once: true });
        }
    });
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy load images
    lazyLoadImages();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize animations
    optimizeAnimations();
}

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

function preloadCriticalResources() {
    // Preload checkout page for buy now buttons
    const buyNowButtons = document.querySelectorAll('[href*="buy-now"]');
    if (buyNowButtons.length > 0) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/checkout';
        document.head.appendChild(link);
    }
}

function optimizeAnimations() {
    // Reduce animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
}

// Notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} notification-toast position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border: none;
        animation: slideInRight 0.5s ease;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-triangle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Accessibility
function initializeAccessibility() {
    // Add keyboard navigation for product images
    const thumbnailImages = document.querySelectorAll('.thumbnail-img');
    thumbnailImages.forEach((img, index) => {
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `View product image ${index + 1}`);
        
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                changeMainImage(this.src, this);
            }
        });
    });

    // Add ARIA labels to quantity controls
    const quantityControls = document.querySelectorAll('.quantity-controls button');
    quantityControls.forEach(btn => {
        const isIncrease = btn.textContent === '+';
        btn.setAttribute('aria-label', isIncrease ? 'Increase quantity' : 'Decrease quantity');
    });

    // Focus management for modals and forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const firstInput = form.querySelector('input, textarea, select');
        if (firstInput && form.offsetHeight > 0) {
            firstInput.addEventListener('focus', function() {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes cart-bounce {
        0%, 20%, 60%, 100% { transform: translateY(0) scale(1); }
        40% { transform: translateY(-10px) scale(1.1); }
        80% { transform: translateY(-5px) scale(1.05); }
    }
    
    .cart-bounce {
        animation: cart-bounce 0.6s ease;
    }
    
    .animate-trust-badge {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .featured-testimonial {
        transform: scale(1.02);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        border-left-color: #ffc107 !important;
        transition: all 0.3s ease;
    }
    
    .urgency-pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Utility Functions
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

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Global error handler
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

// Handle form submission errors
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showNotification('Something went wrong. Please try again.', 'error');
});

// Export functions for use in other scripts
window.JethalClothing = {
    changeMainImage,
    changeQuantity,
    showNotification,
    updateCartCount,
    formatCurrency
};