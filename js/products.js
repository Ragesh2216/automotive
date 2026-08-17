// STACKLY - products.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Products Database (35 unique premium items)
    const PRODUCTS_DB = [
        { id: "p1", title: "Carbon Ceramic Brake Rotors (Pair)", price: 1250, category: "Suspension", image: "assets/parts/img_1.webp", rating: 4.9, likes: 124 },
        { id: "p2", title: "Adjustable Sport Coilovers", price: 890, category: "Suspension", image: "assets/parts/img_8.webp", rating: 4.8, likes: 89 },
        { id: "p3", title: "Stage 3 Turbocharger Kit", price: 2450, category: "Engine", image: "assets/parts/img_10.webp", rating: 5.0, likes: 205 },
        { id: "p4", title: "High-Flow Performance Exhaust", price: 780, category: "Engine", image: "assets/parts/img_11.webp", rating: 4.7, likes: 110 },
        { id: "p5", title: "Custom Forged Alloy Wheels (Set of 4)", price: 1850, category: "Exterior", image: "assets/parts/img_12.webp", rating: 4.9, likes: 184 },
        { id: "p6", title: "Carbon Fiber Rear Wing Spoilers", price: 580, category: "Exterior", image: "assets/parts/img_13.webp", rating: 4.6, likes: 72 },
        { id: "p7", title: "Dual Cold Air Intake System", price: 390, category: "Engine", image: "assets/parts/img_14.webp", rating: 4.7, likes: 98 },
        { id: "p8", title: "Track-Ready Ceramic Brake Pads", price: 180, category: "Suspension", image: "assets/parts/img_15.webp", rating: 4.5, likes: 140 },
        { id: "p9", title: "Short Throw Shifter Kit", price: 220, category: "Interior", image: "assets/parts/img_16.webp", rating: 4.8, likes: 112 },
        { id: "p10", title: "Digital OBD2 Gauge & Scanner", price: 150, category: "Tools", image: "assets/parts/img_17.webp", rating: 4.9, likes: 64 },
        { id: "p11", title: "Alcantara Sport Steering Wheel", price: 480, category: "Interior", image: "assets/parts/img_18.webp", rating: 4.6, likes: 83 },
        { id: "p12", title: "Heavy-Duty Performance Clutch", price: 720, category: "Engine", image: "assets/parts/img_19.webp", rating: 4.8, likes: 151 },
        { id: "p13", title: "Performance Anti-Roll Sway Bars", price: 340, category: "Suspension", image: "assets/parts/img_20.webp", rating: 4.5, likes: 92 },
        { id: "p14", title: "Carbon Fiber Front Splitter", price: 620, category: "Exterior", image: "assets/parts/img_21.webp", rating: 5.0, likes: 230 },
        { id: "p15", title: "High-Performance Spark Plugs (4-Pack)", price: 85, category: "Engine", image: "assets/parts/img_22.webp", rating: 4.7, likes: 79 },
        { id: "p16", title: "High-Output Alternator (250A)", price: 290, category: "Engine", image: "assets/parts/img_23.webp", rating: 4.9, likes: 45 },
        { id: "p17", title: "Racing Harness & Seat Belt Kit", price: 160, category: "Interior", image: "assets/parts/img_24.webp", rating: 4.8, likes: 58 },
        { id: "p18", title: "Sequential LED Tail Lights", price: 450, category: "Lighting", image: "assets/parts/img_25.webp", rating: 4.6, likes: 104 },
        { id: "p19", title: "Adjustable Rear Camber Arms", price: 320, category: "Suspension", image: "assets/parts/img_26.webp", rating: 4.7, likes: 118 },
        { id: "p20", title: "Stage 2 Performance ECU Remap", price: 590, category: "Engine", image: "assets/parts/img_29.webp", rating: 4.9, likes: 167 },
        { id: "p21", title: "Performance Fuel Injectors (Set)", price: 420, category: "Engine", image: "assets/parts/img_30.webp", rating: 4.4, likes: 61 },
        { id: "p22", title: "Custom Carbon Fiber Hood", price: 1150, category: "Exterior", image: "assets/parts/img_31.webp", rating: 4.9, likes: 145 },
        { id: "p23", title: "Suede Racing Bucket Seat", price: 790, category: "Interior", image: "assets/parts/img_32.webp", rating: 5.0, likes: 211 },
        { id: "p24", title: "Chrome Wheel Lug Nuts (Set of 20)", price: 65, category: "Exterior", image: "assets/parts/img_33.webp", rating: 4.6, likes: 88 },
        { id: "p25", title: "Digital Tire Pressure Gauge", price: 45, category: "Tools", image: "assets/parts/img_34.webp", rating: 4.8, likes: 37 },
        { id: "p26", title: "LED Headlight Bulbs Conversion Kit", price: 120, category: "Lighting", image: "assets/parts/img_35.webp", rating: 4.7, likes: 49 },
        { id: "p27", title: "Aluminum Performance Radiator", price: 350, category: "Engine", image: "assets/parts/img_36.webp", rating: 4.9, likes: 132 },
        { id: "p28", title: "High-Flow Fuel Pump (340 LPH)", price: 190, category: "Engine", image: "assets/parts/img_37.webp", rating: 4.5, likes: 76 },
        { id: "p29", title: "Bespoke Carbon Dashboard Trim", price: 280, category: "Interior", image: "assets/parts/img_38.webp", rating: 4.6, likes: 69 },
        { id: "p30", title: "Performance Silicone Coolant Hoses", price: 140, category: "Engine", image: "assets/parts/img_40.webp", rating: 4.8, likes: 119 },
        { id: "p31", title: "Hydraulic Floor Jack (3-Ton)", price: 165, category: "Tools", image: "assets/parts/img_41.webp", rating: 4.7, likes: 94 },
        { id: "p32", title: "Dual Dash Cam System (Front/Rear)", price: 220, category: "Tools", image: "assets/parts/img_42.webp", rating: 4.6, likes: 53 },
        { id: "p33", title: "Custom Interior Ambient Lighting", price: 95, category: "Lighting", image: "assets/parts/img_43.webp", rating: 5.0, likes: 198 },
        { id: "p34", title: "Synthetic Racing Motor Oil (5L)", price: 80, category: "Tools", image: "assets/parts/img_1.webp", rating: 4.7, likes: 85 },
        { id: "p35", title: "Heavy Duty Car Battery (800 CCA)", price: 175, category: "Tools", image: "assets/parts/img_3.webp", rating: 4.9, likes: 172 }
    ];

    // State Variables
    let currentCategory = "all";
    let searchQuery = "";
    let currentSort = "default";
    let likedProducts = JSON.parse(localStorage.getItem("stacklyLikedProducts") || "[]");

    const grid = document.getElementById("products-grid");
    const emptyState = document.getElementById("products-empty-state");
    const searchInput = document.getElementById("search-input");
    const categoryFilters = document.getElementById("category-filters");
    const sortSelect = document.getElementById("sort-select");

    // 2. Render Products
    function renderProducts() {
        // Clear previous cards (keeping empty state block)
        const cards = grid.querySelectorAll(".product-card");
        cards.forEach(c => c.remove());

        // Filter database
        let filtered = PRODUCTS_DB.filter(p => {
            const matchesCategory = (currentCategory === "all" || p.category === currentCategory);
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  p.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Sort database
        if (currentSort === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === "likes-desc") {
            filtered.sort((a, b) => b.likes - a.likes);
        }

        // Show/Hide Empty State
        if (filtered.length === 0) {
            emptyState.style.display = "flex";
        } else {
            emptyState.style.display = "none";
        }

        // Generate Cards
        filtered.forEach((p, idx) => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.style.setProperty("--bl-delay", `${idx * 0.04}s`);
            
            const isLiked = likedProducts.includes(p.id);
            const stars = getStarsHtml(p.rating);

            card.innerHTML = `
                <div class="prod-img-wrap">
                    <img src="${p.image}" alt="${p.title}" class="prod-img" loading="lazy">
                    <button class="prod-like-btn ${isLiked ? 'liked' : ''}" data-id="${p.id}" aria-label="Add to favorites">
                        <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>
                <div class="prod-info">
                    <span class="prod-category">${p.category}</span>
                    <a href="404.html" class="prod-title">${p.title}</a>
                    <div class="prod-rating">
                        <div class="prod-rating-stars">${stars}</div>
                        <span class="prod-likes-text">(${p.likes} likes)</span>
                    </div>
                    <div class="prod-footer">
                        <span class="prod-price">$${p.price}</span>
                        <button class="prod-btn-add" data-id="${p.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            grid.insertBefore(card, emptyState);

            // Trigger stagger entry reveal
            setTimeout(() => {
                card.classList.add("card-in");
            }, 50);
        });

        // Re-attach listeners to dynamically created elements
        attachCardListeners();
    }

    // Helper: generate star ratings HTML
    function getStarsHtml(rating) {
        let html = '';
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                html += '<i class="fa-solid fa-star"></i>';
            } else if (i === fullStars && hasHalf) {
                html += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                html += '<i class="fa-regular fa-star"></i>';
            }
        }
        return html;
    }

    // 3. Attach Likes and Cart handlers
    function attachCardListeners() {
        // Likes Click
        grid.querySelectorAll(".prod-like-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const id = btn.getAttribute("data-id");
                const product = PRODUCTS_DB.find(p => p.id === id);
                if (!product) return;

                const icon = btn.querySelector("i");
                if (likedProducts.includes(id)) {
                    likedProducts = likedProducts.filter(item => item !== id);
                    btn.classList.remove("liked");
                    icon.className = "fa-regular fa-heart";
                    product.likes -= 1;
                } else {
                    likedProducts.push(id);
                    btn.classList.add("liked");
                    icon.className = "fa-solid fa-heart";
                    product.likes += 1;
                    if (window.StacklyCart) window.StacklyCart.showToast("Added to your favorites!");
                }
                
                // Update local storage and re-render count text on card
                localStorage.setItem("stacklyLikedProducts", JSON.stringify(likedProducts));
                const countText = btn.closest(".product-card").querySelector(".prod-likes-text");
                if (countText) {
                    countText.textContent = `(${product.likes} likes)`;
                }
            });
        });

        // Add to Cart Click
        grid.querySelectorAll(".prod-btn-add").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const product = PRODUCTS_DB.find(p => p.id === id);
                if (product && window.StacklyCart) {
                    window.StacklyCart.add({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        category: product.category
                    });
                }
            });
        });
    }

    // 4. Set Controls Listeners
    // Search input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }

    // Category Filter pills
    if (categoryFilters) {
        categoryFilters.querySelectorAll(".filter-pill").forEach(pill => {
            pill.addEventListener("click", () => {
                categoryFilters.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                currentCategory = pill.getAttribute("data-category");
                renderProducts();
            });
        });
    }

    // Sort dropdown
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    // 5. Navbar Scrolled transition
    const navbar = document.getElementById("products-navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 30);
        });
    }

    // Initial render
    renderProducts();
});
