document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Progress Indicator Bar
    const scrollProgress = document.getElementById("page-scroll-indicator");
    window.addEventListener("scroll", () => {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollHeight > 0) {
            const percentage = (window.scrollY / totalScrollHeight) * 100;
            scrollProgress.style.width = `${percentage}%`;
        }
    });



    // 3. Load Entry Animations (Only for elements in initial viewport)
    const navbar = document.getElementById("navbar-pill-element");
    const heroCard = document.getElementById("hero-card-element");
    const stylistWrapper = document.getElementById("stylist-img-container");
    const heroTextReveals = document.querySelectorAll("#hero-card-element .reveal-text");
    const buttons = document.getElementById("anim-buttons");

    setTimeout(() => {
        if (navbar) navbar.parentElement.classList.add("active");
        if (heroCard) heroCard.classList.add("active");
        if (stylistWrapper) stylistWrapper.classList.add("active");
        
        heroTextReveals.forEach(reveal => {
            reveal.classList.add("active");
        });
        if (buttons) buttons.classList.add("active");
    }, 150);

    // 4. Mouse-Movement Parallax Effect on Background JPG Wrapper, Heart Glow, & Tools Section Image
    const parallaxElements = document.querySelectorAll("#hero-bg-img, #heart-glow-bg, #tools-bg-img");
    
    window.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX - window.innerWidth / 2;
        const mouseY = e.clientY - window.innerHeight / 2;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute("data-parallax-speed") || 0.02);
            const xOffset = mouseX * speed;
            const yOffset = mouseY * speed;
            el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // 5. 3D Hover Tilt Animation (Extended to Wellness Card, Designer Image, and Large Tool Cards)
    const tiltElements = [
        { el: document.getElementById("hero-card-element"), maxRotation: 4 },
        { el: document.getElementById("interactive-stylist-img"), maxRotation: 7 },
        { el: document.getElementById("wellness-card-bar"), maxRotation: 3 },
        { el: document.getElementById("interactive-designer-img"), maxRotation: 6 },
        { el: document.getElementById("food-tool-card"), maxRotation: 3 },
        { el: document.getElementById("drug-tool-card"), maxRotation: 3 }
    ];

    tiltElements.forEach(item => {
        const element = item.el;
        if (!element) return;

        element.addEventListener("mousemove", (e) => {
            const rect = element.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            
            // Get mouse position relative to element center
            const mouseX = e.clientX - rect.left - width / 2;
            const mouseY = e.clientY - rect.top - height / 2;
            
            // Calculate tilt angle based on mouse distance from center
            const rotateX = -(mouseY / (height / 2)) * item.maxRotation;
            const rotateY = (mouseX / (width / 2)) * item.maxRotation;
            
            // Apply style with perspective
            element.style.transition = "transform 0.1s ease-out";
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.012, 1.012, 1.012)`;
        });

        element.addEventListener("mouseleave", () => {
            // Smoothly reset rotation on mouse leave
            element.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });

    // 6. Intersection Observer for Scroll Reveals & Counters (Supports Right-to-Left Slide-Ins)
    const scrollRevealItems = document.querySelectorAll(".reveal-scroll-up, .reveal-right-to-left");
    
    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                
                // Stagger reveal text elements inside this container when it enters view
                const textRevealsInside = entry.target.querySelectorAll(".reveal-text");
                textRevealsInside.forEach(reveal => {
                    reveal.classList.add("active");
                });
                
                // If the stats bar is entering the viewport, start counting up
                if (entry.target.id === "statistics-card-bar") {
                    triggerCountUpAnimation();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    scrollRevealItems.forEach(item => {
        scrollRevealObserver.observe(item);
    });

    // 7. Dynamic Count Up Animation for Statistics
    function triggerCountUpAnimation() {
        const statCounters = document.querySelectorAll(".stat-number");
        
        statCounters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute("data-target"), 10);
            const duration = 1800; // Duration of count-up in milliseconds
            const startVal = 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function outQuad for natural slowdown
                const easeProgress = progress * (2 - progress);
                
                const currentValue = Math.floor(startVal + easeProgress * (targetValue - startVal));
                counter.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = targetValue;
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    // 8. Reads Section — Filter Tab Interaction with smooth card animations
    const readsTabs  = document.querySelectorAll(".reads-tab");
    const readsCards = document.querySelectorAll(".reads-card");

    // Show all cards on initial load with stagger
    readsCards.forEach((card, i) => {
        setTimeout(() => card.classList.add("card-visible"), 120 * i);
    });

    readsTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            readsTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-filter");

            // First hide all with fade-out
            readsCards.forEach(card => {
                card.classList.remove("card-visible");
            });

            setTimeout(() => {
                let visibleIndex = 0;
                readsCards.forEach(card => {
                    const cat = card.getAttribute("data-category");
                    if (filter === "all" || cat === filter) {
                        card.classList.remove("card-hidden");
                        // Stagger fade-in
                        setTimeout(() => card.classList.add("card-visible"), 80 * visibleIndex);
                        visibleIndex++;
                    } else {
                        card.classList.add("card-hidden");
                    }
                });
            }, 320);
        });
    });

    // 9. Reads Header — Custom scroll reveal for split word animation
    const readsHeader = document.getElementById("reads-header");
    if (readsHeader) {
        const readsHeaderObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        readsHeaderObserver.observe(readsHeader);
    }

    // 10. Achievements Section — Interactive hover/click list
    const achievData = [
        {
            year: "1999",
            photo: "assets/img_6.webp",
            desc: "Inception of our first auto parts distribution center, introducing performance styling and custom car components."
        },
        {
            year: "2005",
            photo: "assets/img_10.webp",
            desc: "Awarded 'Eco Parts Manufacturer of the Year' for integrating low-emission catalytic converters and sustainable auto recycling."
        },
        {
            year: "2012",
            photo: "assets/img_11.webp",
            desc: "Recognised for designing the most innovative Automotive Showroom concept in the car tuning industry."
        },
        {
            year: "2020",
            photo: "assets/img_15.webp",
            desc: "Launched our digital parts fitting tool, bridging premium styling and custom car configuration to global clients."
        }
    ];

    const achievItems    = document.querySelectorAll(".achiev-item");
    const achievDisplay  = document.getElementById("achievDisplay");
    const achievPhoto    = document.getElementById("achievPhoto");
    const achievYear     = document.getElementById("achievYear");
    const achievPillYear = document.getElementById("achievPillYear");
    const achievDesc     = document.getElementById("achievDesc");

    if (achievItems.length && achievDisplay) {
        achievItems.forEach((item) => {
            const activate = () => {
                const idx = parseInt(item.dataset.index, 10);
                if (item.classList.contains("active")) return;

                // Swap active state on list
                achievItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");

                // Fade the display panel
                achievDisplay.classList.add("is-fading");

                setTimeout(() => {
                    const d = achievData[idx];
                    if (!d) return;
                    if (achievPhoto)    { achievPhoto.src = d.photo; }
                    if (achievYear)     { achievYear.textContent = d.year; }
                    if (achievPillYear) { achievPillYear.textContent = d.year; }
                    if (achievDesc)     { achievDesc.textContent = d.desc; }
                    achievDisplay.classList.remove("is-fading");
                }, 350);
            };

            item.addEventListener("mouseenter", activate);
            item.addEventListener("click", activate);
        });
    }

    // 11. GreenSock (GSAP) & ScrollTrigger animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Section 1: Hero Entry Animation (Immediate load)
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from("#anim-headline", {
                duration: 1.2,
                y: 50,
                opacity: 0,
                ease: "power4.out"
            })
            .from("#anim-description", {
                duration: 1.0,
                y: 30,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.8")
            .from("#anim-buttons", {
                duration: 0.8,
                y: 20,
                opacity: 0,
                scale: 0.95,
                ease: "power2.out"
            }, "-=0.6")
            .from("#tuning-technician-img-container img", {
                duration: 1.5,
                x: 100,
                opacity: 0,
                scale: 0.95,
                ease: "power4.out"
            }, "-=1.2");

        // Section 2: Services Highlights Row
        gsap.from(".our-services-section .service-row-card", {
            scrollTrigger: {
                trigger: ".our-services-section",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Section 3: Category Grid Showcase
        gsap.from(".category-grid-section .cat-card", {
            scrollTrigger: {
                trigger: ".category-grid-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.5)"
        });

        // Section 4: Statistics Counter Row
        gsap.from(".stats-section-container #statistics-card-bar > div", {
            scrollTrigger: {
                trigger: ".stats-section-container",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            scale: 0.9,
            opacity: 0,
            stagger: 0.12,
            ease: "power3.out"
        });

        // Section 5: About Us Overview
        const aboutTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-us-hero-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
        aboutTimeline
            .from(".about-inner-container span", {
                duration: 0.6,
                y: 20,
                opacity: 0,
                ease: "power2.out"
            })
            .from(".about-inner-container h2", {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.4")
            .from(".about-inner-container p", {
                duration: 0.8,
                y: 20,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.6")
            .from(".about-features-list li", {
                duration: 0.6,
                x: -30,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.4")
            .from(".about-inner-container img", {
                duration: 1.2,
                scale: 0.95,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.8");

        // Section 6: Featured Products
        gsap.from(".featured-products-section .prod-card", {
            scrollTrigger: {
                trigger: ".featured-products-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Section 7: Dynamic CTA Offer Banner
        gsap.from(".offer-banner-section div > *", {
            scrollTrigger: {
                trigger: ".offer-banner-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.15,
            ease: "power2.out"
        });

        // Section 8: Promo Banners
        gsap.from(".promo-banners-section .promo-banner", {
            scrollTrigger: {
                trigger: ".promo-banners-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 1.0,
            y: 40,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Section 9: Interactive Custom Tuning Showcase
        const tuningTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".tuning-showcase-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
        tuningTimeline
            .from(".tuning-showcase-section img", {
                duration: 1.0,
                scale: 0.92,
                opacity: 0,
                ease: "power3.out"
            })
            .from(".tuning-showcase-section span", {
                duration: 0.6,
                scale: 0,
                opacity: 0,
                stagger: 0.2,
                ease: "back.out(2.0)"
            }, "-=0.5")
            .from(".tuning-showcase-section h3", {
                duration: 0.6,
                x: 30,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.8")
            .from(".tuning-showcase-section p", {
                duration: 0.6,
                x: 30,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.6")
            .from(".tuning-showcase-section li", {
                duration: 0.5,
                x: 20,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.4");

        // Section 10: Customer Testimonials Cards
        gsap.from(".testimonials-card-section div > div > div", {
            scrollTrigger: {
                trigger: ".testimonials-card-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        });

        // Section 11: Latest Blog Posts
        gsap.from(".latest-blog-section .blog-card", {
            scrollTrigger: {
                trigger: ".latest-blog-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            stagger: 0.15,
            ease: "power2.out"
        });

        // Section 12: Partner Brand Logos Strip
        gsap.from(".brand-partners-section .brand-partner-item", {
            scrollTrigger: {
                trigger: ".brand-partners-section",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            duration: 0.6,
            opacity: 0,
            y: 20,
            stagger: 0.08,
            ease: "power2.out"
        });

        // Section 13: Newsletter Signup Form
        gsap.from(".newsletter-signup-section div > *", {
            scrollTrigger: {
                trigger: ".newsletter-signup-section",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.15,
            ease: "power2.out"
        });
    }
});



