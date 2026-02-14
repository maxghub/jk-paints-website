// JK Paints - Products JavaScript

$(document).ready(function() {
    
    // Initialize product filters
    initProductFilters();
    
    // Initialize product sorting
    initProductSorting();
    
    // Initialize quantity selectors
    initQuantitySelectors();
    
    // Initialize image gallery
    initImageGallery();
});

// Product Filters
function initProductFilters() {
    $('.filter-category').click(function(e) {
        e.preventDefault();
        
        const category = $(this).data('category');
        
        // Remove active class from all filters
        $('.filter-category').removeClass('active');
        // Add active class to clicked filter
        $(this).addClass('active');
        
        // Filter products
        filterProductsByCategory(category);
    });
    
    $('.filter-price').click(function(e) {
        e.preventDefault();
        
        const priceRange = $(this).data('price');
        
        // Remove active class from all price filters
        $('.filter-price').removeClass('active');
        // Add active class to clicked filter
        $(this).addClass('active');
        
        // Filter products by price
        filterProductsByPrice(priceRange);
    });
}

function filterProductsByCategory(category) {
    if (category === 'all') {
        $('.product-item').show();
    } else {
        $('.product-item').each(function() {
            if ($(this).data('category') === category) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
    // Update product count
    updateProductCount();
}

function filterProductsByPrice(priceRange) {
    $('.product-item').each(function() {
        const price = parseFloat($(this).data('price'));
        
        switch (priceRange) {
            case 'under-1000':
                if (price < 1000) $(this).show();
                else $(this).hide();
                break;
            case '1000-2000':
                if (price >= 1000 && price <= 2000) $(this).show();
                else $(this).hide();
                break;
            case '2000-3000':
                if (price >= 2000 && price <= 3000) $(this).show();
                else $(this).hide();
                break;
            case 'above-3000':
                if (price > 3000) $(this).show();
                else $(this).hide();
                break;
            default:
                $(this).show();
        }
    });
    
    // Update product count
    updateProductCount();
}

function updateProductCount() {
    const visibleCount = $('.product-item:visible').length;
    const totalCount = $('.product-item').length;
    
    $('#product-count').text(`${visibleCount} of ${totalCount} products`);
}

// Product Sorting
function initProductSorting() {
    $('#sort-products').change(function() {
        const sortBy = $(this).val();
        sortProducts(sortBy);
    });
}

function sortProducts(sortBy) {
    const container = $('.products-container');
    const items = container.find('.product-item').get();
    
    items.sort(function(a, b) {
        const priceA = parseFloat($(a).data('price'));
        const priceB = parseFloat($(b).data('price'));
        const nameA = $(a).find('.product-name').text().toLowerCase();
        const nameB = $(b).find('.product-name').text().toLowerCase();
        
        switch (sortBy) {
            case 'price-low-high':
                return priceA - priceB;
            case 'price-high-low':
                return priceB - priceA;
            case 'name-a-z':
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            case 'name-z-a':
                if (nameA > nameB) return -1;
                if (nameA < nameB) return 1;
                return 0;
            default:
                return 0;
        }
    });
    
    $.each(items, function(i, item) {
        container.append(item);
    });
}

// Quantity Selectors
function initQuantitySelectors() {
    $('.quantity-minus').click(function() {
        const input = $(this).siblings('.quantity-input');
        let value = parseInt(input.val());
        if (value > 1) {
            input.val(value - 1);
        }
    });
    
    $('.quantity-plus').click(function() {
        const input = $(this).siblings('.quantity-input');
        let value = parseInt(input.val());
        input.val(value + 1);
    });
    
    $('.quantity-input').change(function() {
        let value = parseInt($(this).val());
        if (isNaN(value) || value < 1) {
            $(this).val(1);
        }
    });
}

// Image Gallery
function initImageGallery() {
    // Main image click to open modal
    $('.main-product-image').click(function() {
        const src = $(this).attr('src');
        openImageModal(src);
    });
    
    // Thumbnail click
    $('.thumbnail').click(function() {
        const src = $(this).attr('src');
        $('.main-product-image').attr('src', src);
        
        // Update active thumbnail
        $('.thumbnail').removeClass('active');
        $(this).addClass('active');
    });
    
    // Image modal
    function openImageModal(src) {
        const modalHtml = `
            <div class="modal fade" id="imageModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img src="${src}" class="img-fluid" alt="Product Image">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#imageModal').remove();
        $('body').append(modalHtml);
        
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
    }
}

// Add to Cart Functionality
function addToCart(productId, quantity) {
    const product = {
        id: productId,
        name: $(`#product-${productId} .product-name`).text(),
        price: $(`#product-${productId} .product-price`).data('price'),
        quantity: quantity || 1
    };
    
    // Get existing cart or initialize
    let cart = JSON.parse(localStorage.getItem('jkpaints-cart')) || [];
    
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        // Update quantity
        cart[existingIndex].quantity += product.quantity;
    } else {
        // Add new product
        cart.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('jkpaints-cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showToast('Product added to cart!');
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('jkpaints-cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    $('.cart-count').text(totalItems);
}

// Show Toast Notification
function showToast(message) {
    // Create toast element
    const toastHtml = `
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div class="toast align-items-center text-bg-success border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        </div>
    `;
    
    $('.toast-container').remove();
    $('body').append(toastHtml);
    
    // Show toast
    const toastEl = document.querySelector('.toast');
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
}

// Initialize cart count on page load
$(document).ready(function() {
    updateCartCount();
});