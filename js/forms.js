// JK Paints - Forms JavaScript

$(document).ready(function() {
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize quote request form
    initQuoteForm();
    
    // Initialize dealer application form
    initDealerForm();
});

// Form Validation
function initFormValidation() {
    // Add validation to all forms with class 'needs-validation'
    $('.needs-validation').each(function() {
        $(this).on('submit', function(event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            $(this).addClass('was-validated');
        });
    });
    
    // Real-time validation for required fields
    $('input[required], select[required], textarea[required]').on('blur', function() {
        validateField($(this));
    });
}

function validateField(field) {
    const value = field.val().trim();
    const feedback = field.siblings('.invalid-feedback');
    
    if (!value) {
        field.addClass('is-invalid');
        if (feedback.length === 0) {
            field.after('<div class="invalid-feedback">This field is required.</div>');
        }
        return false;
    }
    
    // Email validation
    if (field.attr('type') === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.addClass('is-invalid');
            if (feedback.length === 0) {
                field.after('<div class="invalid-feedback">Please enter a valid email address.</div>');
            } else {
                feedback.text('Please enter a valid email address.');
            }
            return false;
        }
    }
    
    // Phone validation
    if (field.attr('type') === 'tel') {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) {
            field.addClass('is-invalid');
            if (feedback.length === 0) {
                field.after('<div class="invalid-feedback">Please enter a valid 10-digit phone number.</div>');
            } else {
                feedback.text('Please enter a valid 10-digit phone number.');
            }
            return false;
        }
    }
    
    // If validation passes
    field.removeClass('is-invalid');
    field.addClass('is-valid');
    feedback.remove();
    return true;
}

// Contact Form
function initContactForm() {
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: $('#contactName').val(),
            email: $('#contactEmail').val(),
            phone: $('#contactPhone').val(),
            subject: $('#contactSubject').val(),
            message: $('#contactMessage').val()
        };
        
        // Validate
        let isValid = true;
        $('#contactForm input, #contactForm textarea, #contactForm select').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showAlert('Please fill in all required fields correctly.', 'danger');
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...').prop('disabled', true);
        
        // Simulate API call
        setTimeout(() => {
            // In real implementation, send data to server
            console.log('Contact form submitted:', formData);
            
            // Show success message
            showAlert('Thank you for your message! We will contact you within 24 hours.', 'success');
            
            // Reset form
            $(this)[0].reset();
            $(this).removeClass('was-validated');
            $(this).find('.is-valid').removeClass('is-valid');
            
            // Reset button
            submitBtn.html(originalText).prop('disabled', false);
        }, 1500);
    });
}

// Quote Request Form
function initQuoteForm() {
    $('#quoteRequestForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            product: $('#quoteProduct').val(),
            quantity: $('#quoteQuantity').val(),
            name: $('#quoteName').val(),
            email: $('#quoteEmail').val(),
            phone: $('#quotePhone').val(),
            company: $('#quoteCompany').val(),
            requirements: $('#quoteRequirements').val()
        };
        
        // Validate
        let isValid = true;
        $('#quoteRequestForm input, #quoteRequestForm textarea, #quoteRequestForm select').each(function() {
            if ($(this).prop('required') && !validateField($(this))) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showAlert('Please fill in all required fields correctly.', 'danger');
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Processing...').prop('disabled', true);
        
        // Simulate API call
        setTimeout(() => {
            console.log('Quote request submitted:', formData);
            
            // Generate quote (simulated)
            const quote = generateQuote(formData);
            
            // Show quote
            showQuote(quote, formData);
            
            // Reset button
            submitBtn.html(originalText).prop('disabled', false);
        }, 2000);
    });
}

function generateQuote(formData) {
    // Simulated quote generation
    const basePrice = 2499; // Base price for the product
    const quantity = parseInt(formData.quantity) || 1;
    let total = basePrice * quantity;
    
    // Apply bulk discount
    let discount = 0;
    if (quantity >= 50 && quantity < 100) {
        discount = 0.10; // 10% discount
    } else if (quantity >= 100 && quantity < 500) {
        discount = 0.15; // 15% discount
    } else if (quantity >= 500) {
        discount = 0.20; // 20% discount
    }
    
    const discountAmount = total * discount;
    const discountedTotal = total - discountAmount;
    
    // Add GST (18%)
    const gst = discountedTotal * 0.18;
    const finalTotal = discountedTotal + gst;
    
    return {
        product: formData.product,
        quantity: quantity,
        unitPrice: basePrice,
        subtotal: total,
        discount: discount * 100,
        discountAmount: discountAmount,
        gst: 18,
        gstAmount: gst,
        total: finalTotal,
        delivery: '3-5 business days',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
}

function showQuote(quote, formData) {
    const quoteHtml = `
        <div class="quote-result mt-4">
            <h4>Your Quote</h4>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>Product:</strong> ${quote.product}</p>
                            <p><strong>Quantity:</strong> ${quote.quantity}</p>
                            <p><strong>Unit Price:</strong> ₹${quote.unitPrice.toFixed(2)}</p>
                            <p><strong>Subtotal:</strong> ₹${quote.subtotal.toFixed(2)}</p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>Discount (${quote.discount}%):</strong> -₹${quote.discountAmount.toFixed(2)}</p>
                            <p><strong>GST (${quote.gst}%):</strong> +₹${quote.gstAmount.toFixed(2)}</p>
                            <hr>
                            <h5 class="text-primary">Total: ₹${quote.total.toFixed(2)}</h5>
                            <p><small class="text-muted">Delivery: ${quote.delivery}</small></p>
                            <p><small class="text-muted">Quote valid until: ${quote.validUntil}</small></p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-success me-2" onclick="downloadQuote()">
                            <i class="fas fa-download"></i> Download Quote
                        </button>
                        <a href="https://wa.me/911234567890?text=Hello%20JK%20Paints,%20I%20want%20to%20confirm%20this%20quote:%20Product:%20${encodeURIComponent(quote.product)}%20Quantity:%20${quote.quantity}%20Total:%20₹${quote.total.toFixed(2)}" 
                           class="btn btn-primary" target="_blank">
                            <i class="fab fa-whatsapp"></i> Confirm via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing quote if any
    $('.quote-result').remove();
    
    // Append new quote
    $('#quoteRequestForm').after(quoteHtml);
}

function downloadQuote() {
    // Simulated download
    alert('Quote downloaded! In a real implementation, this would generate a PDF.');
}

// Dealer Application Form
function initDealerForm() {
    $('#dealerForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: $('#dealerName').val(),
            email: $('#dealerEmail').val(),
            phone: $('#dealerPhone').val(),
            company: $('#dealerCompany').val(),
            address: $('#dealerAddress').val(),
            city: $('#dealerCity').val(),
            state: $('#dealerState').val(),
            pincode: $('#dealerPincode').val(),
            experience: $('#dealerExperience').val(),
            annualTurnover: $('#dealerTurnover').val(),
            existingBusiness: $('#dealerBusiness').val(),
            message: $('#dealerMessage').val()
        };
        
        // Validate
        let isValid = true;
        $('#dealerForm input, #dealerForm textarea, #dealerForm select').each(function() {
            if ($(this).prop('required') && !validateField($(this))) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showAlert('Please fill in all required fields correctly.', 'danger');
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Submitting...').prop('disabled', true);
        
        // Simulate API call
        setTimeout(() => {
            console.log('Dealer application submitted:', formData);
            
            // Show success message
            showAlert('Thank you for your application! Our dealer team will contact you within 48 hours.', 'success');
            
            // Reset form
            $(this)[0].reset();
            $(this).removeClass('was-validated');
            $(this).find('.is-valid').removeClass('is-valid');
            
            // Reset button
            submitBtn.html(originalText).prop('disabled', false);
            
            // Send confirmation email (simulated)
            sendDealerConfirmation(formData);
        }, 2000);
    });
}

function sendDealerConfirmation(formData) {
    // Simulated email sending
    console.log('Dealer confirmation email would be sent to:', formData.email);
}

// Show Alert
function showAlert(message, type) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Remove existing alerts
    $('.alert').remove();
    
    // Add new alert at the top of the form
    $('form').before(alertHtml);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        $('.alert').alert('close');
    }, 5000);
}

// Phone number formatting
$(document).ready(function() {
    $('input[type="tel"]').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        $(this).val(value);
    });
});