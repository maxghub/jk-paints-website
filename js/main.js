// JK Paints - Main JavaScript

$(document).ready(function() {
    
    // Initialize carousel
    initBestsellerCarousel();
    
    // Initialize animations
    initAnimations();
    
    // Initialize form handling
    initForms();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize quick view
    initQuickView();
    
    // Handle exit intent popup
    initExitIntent();
    
    // Initialize counters
    initCounters();
});

// Bestseller Carousel
function initBestsellerCarousel() {
    const products = [
        {
            name: "Auto Silver Paint",
            desc: "Premium metallic finish",
            price: "₹2,499",
            image: "linear-gradient(135deg, #667eea, #764ba2)"
        },
        {
            name: "PPG Bilux Thinner",
            desc: "High-performance thinner",
            price: "₹899",
            image: "linear-gradient(135deg, #f093fb, #f5576c)"
        },
        {
            name: "RPI Supreme Paint",
            desc: "Professional top coat",
            price: "₹3,199",
            image: "linear-gradient(135deg, #4facfe, #00f2fe)"
        },
        {
            name: "Nexa Autocolor ZK",
            desc: "Advanced thinner formula",
            price: "₹1,099",
            image: "linear-gradient(135deg, #43e97b, #38f9d7)"
        },
        {
            name: "Rallision Top Coat",
            desc: "Premium finishing coat",
            price: "₹2,899",
            image: "linear-gradient(135deg, #fa709a, #fee140)"
        },
        {
            name: "Vanto NC Black",
            desc: "Deep black finish",
            price: "₹2,699",
            image: "linear-gradient(135deg, #2c3e50, #4a6491)"
        }
    ];
    
    const track = $('.carousel-track');
    let currentIndex = 0;
    const itemsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
    
    // Populate carousel items
    products.forEach(product => {
        const item = `
            <div class="carousel-item">
                <div class="product-image" style="background: ${product.image}; height: 150px; border-radius: 8px; margin-bottom: 15px;"></div>
                <h5 style="font-size: 16px; margin-bottom: 10px;">${product.name}</h5>
                <p style="font-size: 14px; color: #666; margin-bottom: 10px;">${product.desc}</p>
                <div class="product-price" style="font-size: 18px; font-weight: 600; color: #111;">${product.price}</div>
                <button class="btn-quick-view" style="margin-top: 10px; width: 100%; padding: 8px;">Quick View</button>
            </div>
        `;
        track.append(item);
    });
    
    // Carousel navigation
    $('.next-btn').click(function() {
        if (currentIndex < products.length - itemsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    $('.prev-btn').click(function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    function updateCarousel() {
        const itemWidth = 280 + 20; // 280px width + 20px margin
        const translateX = -currentIndex * itemWidth;
        track.css('transform', `translateX(${translateX}px)`);
    }
    
    // Auto slide
    let autoSlide = setInterval(() => {
        if (currentIndex < products.length - itemsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);
    
    // Pause on hover
    $('.bestseller-carousel').hover(
        function() {
            clearInterval(autoSlide);
        },
        function() {
            autoSlide = setInterval(() => {
                if (currentIndex < products.length - itemsPerView) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            }, 5000);
        }
    );
    
    // Update on resize
    $(window).resize(function() {
        updateCarousel();
    });
}

// Animations
function initAnimations() {
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = $('.category-card, .product-card, .feature-card, .testimonial-card, .step-card, .industry-card');
        
        elements.each(function() {
            const element = $(this);
            const position = element.offset().top;
            const windowHeight = $(window).height();
            const scrollPosition = $(window).scrollTop();
            
            if (position < scrollPosition + windowHeight - 100) {
                element.addClass('animated');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    $(window).scroll(function() {
        animateOnScroll();
    });
}

// Form Handling
function initForms() {
    // Lead form submission
    $('.lead-form').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: $(this).find('input[placeholder="Your Name"]').val(),
            email: $(this).find('input[placeholder="Email Address"]').val(),
            phone: $(this).find('input[placeholder="Phone Number"]').val(),
            company: $(this).find('input[placeholder="Company Name"]').val(),
            product: $(this).find('select').val(),
            message: $(this).find('textarea').val()
        };
        
        // Validate
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real implementation, you would send this to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you! Your quote request has been submitted. We will contact you within 24 hours.');
        
        // Reset form
        $(this)[0].reset();
        
        // Send WhatsApp notification (simulated)
        sendWhatsAppNotification(formData);
    });
    
    // Newsletter form
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        
        if (validateEmail(email)) {
            // In real implementation, send to server
            alert('Thank you for subscribing to JK Paints newsletter!');
            $(this)[0].reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
    
    // Quick quote modal form
    $('#quoteForm').submit(function(e) {
        e.preventDefault();
        
        const quoteData = {
            product: $(this).find('input[placeholder="Product Name"]').val(),
            quantity: $(this).find('input[placeholder="Quantity"]').val(),
            name: $(this).find('input[placeholder="Your Name"]').val(),
            phone: $(this).find('input[placeholder="Phone Number"]').val()
        };
        
        console.log('Quick quote request:', quoteData);
        
        $('#quickQuoteModal').modal('hide');
        alert('Your quote request has been received. We will WhatsApp you the pricing shortly.');
        $(this)[0].reset();
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        if (target === '#') return;
        
        const $target = $(target);
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 100
            }, 800);
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const $backToTop = $('.back-to-top');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $backToTop.addClass('show');
        } else {
            $backToTop.removeClass('show');
        }
    });
    
    $backToTop.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
}

// Quick View Functionality
function initQuickView() {
    $(document).on('click', '.btn-quick-view', function() {
        const productCard = $(this).closest('.product-card, .carousel-item');
        const productName = productCard.find('h4, h5').text();
        
        // Create quick view modal
        const modalHtml = `
            <div class="modal fade" id="quickViewModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${productName}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); height: 300px; border-radius: 8px;"></div>
                                </div>
                                <div class="col-md-6">
                                    <h4>${productName}</h4>
                                    <p>Premium automotive paint with exceptional durability and finish quality.</p>
                                    <div class="product-price" style="font-size: 24px; font-weight: 600; color: #111; margin: 20px 0;">₹2,499</div>
                                    <p><strong>MOQ:</strong> 1 Liter</p>
                                    <p><strong>Key Features:</strong></p>
                                    <ul>
                                        <li>High gloss finish</li>
                                        <li>UV resistant</li>
                                        <li>Weather proof</li>
                                        <li>Fast drying</li>
                                        <li>Easy application</li>
                                    </ul>
                                    <div class="d-flex gap-2 mt-3 flex-wrap">
                                        <a href="https://wa.me/911234567890?text=Hello%20JK%20Paints,%20I%20want%20details%20for:%20Product%20Name:%20${encodeURIComponent(productName)}%20Please%20share%20price%20and%20availability." class="btn btn-success">
                                            <i class="fab fa-whatsapp"></i> WhatsApp
                                        </a>
                                        <a href="tel:+911234567890" class="btn btn-primary">
                                            <i class="fas fa-phone"></i> Call Now
                                        </a>
                                        <a href="product-detail.html" class="btn btn-outline-primary">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        $('#quickViewModal').remove();
        
        // Append new modal
        $('body').append(modalHtml);
        
        // Show modal
        const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
        quickViewModal.show();
    });
}

// Exit Intent Popup
function initExitIntent() {
    let exitIntentShown = localStorage.getItem('exitIntentShown') === 'true';
    
    $(document).on('mouseleave', function(e) {
        if (e.clientY < 0 && !exitIntentShown) {
            setTimeout(() => {
                $('#quickQuoteModal').modal('show');
                localStorage.setItem('exitIntentShown', 'true');
                exitIntentShown = true;
            }, 500);
        }
    });
}

// Counters Animation
function initCounters() {
    const counters = $('.trust-item h3');
    let started = false;
    
    $(window).scroll(function() {
        if ($('.trust-strip').isInViewport() && !started) {
            started = true;
            counters.each(function() {
                const $this = $(this);
                const countTo = parseInt($this.text().replace('+', ''));
                
                if (!isNaN(countTo)) {
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum) + '+');
                        },
                        complete: function() {
                            $this.text(countTo + '+');
                        }
                    });
                }
            });
        }
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Send WhatsApp Notification (Simulated)
function sendWhatsAppNotification(formData) {
    const message = `New Lead from JK Paints Website:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Product Interest: ${formData.product}
Message: ${formData.message}`;
    
    console.log('WhatsApp notification would be sent:', message);
    
    // For demo purposes, we'll log it
    console.log('To send actual WhatsApp: https://wa.me/911234567890?text=' + encodeURIComponent(message));
}

// jQuery plugin to check if element is in viewport
$.fn.isInViewport = function() {
    const elementTop = $(this).offset().top;
    const elementBottom = elementTop + $(this).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    
    return elementBottom > viewportTop && elementTop < viewportBottom;
};