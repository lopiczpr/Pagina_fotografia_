// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", (event) => {
    
    // Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (menuToggle && menuClose && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Video cycling logic
    const heroVideo = document.getElementById('hero-video');
    const prevBtn = document.getElementById('prev-video');
    const nextBtn = document.getElementById('next-video');
    
    if (heroVideo) {
        const videos = ["vid1.mp4", "vid2.mp4", "vid3.mp4", "vid4.mp4"];
        let currentVideoIndex = 0;
        
        const playVideo = (index) => {
            heroVideo.src = `assets/vid/${videos[index]}`;
            heroVideo.play().catch(e => console.log("Autoplay prevented", e));
        };

        heroVideo.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            playVideo(currentVideoIndex);
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
                playVideo(currentVideoIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentVideoIndex = (currentVideoIndex + 1) % videos.length;
                playVideo(currentVideoIndex);
            });
        }
    }
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Populate Masonry Grid from JSON
    const grid = document.getElementById('gallery-grid');
    if (grid) {
        fetch('assets/data/portfolio.json')
            .then(response => response.json())
            .then(data => {
                data.images.forEach((imgSrc, index) => {
                    const item = document.createElement('div');
                    item.className = 'masonry-item';
                    
                    const img = document.createElement('img');
                    img.src = `assets/img/gallery/${imgSrc}`;
                    img.alt = `Boda capturada por Carlos López ${index + 1}`;
                    img.loading = "lazy";
                    
                    item.appendChild(img);
                    grid.appendChild(item);
                });
                
                // Initialize ScrollTrigger for new items
                gsap.utils.toArray('.masonry-item').forEach((item, i) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out"
                    });
                });
                ScrollTrigger.refresh();
            })
            .catch(error => console.error("Error loading portfolio:", error));
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initial Hero Animation
    const heroTl = gsap.timeline();
    heroTl.to('.hero-title', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
    })
    .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 1
    }, "-=0.5");

    // Fade out hero content after 4 seconds to avoid conflicting with video text
    gsap.to(['.hero-title', '.hero-subtitle', '.scroll-indicator'], {
        opacity: 0,
        duration: 2,
        delay: 4,
        ease: "power2.inOut"
    });

    // Scroll Animations
    // Intro text
    gsap.from('.intro-quote', {
        scrollTrigger: {
            trigger: '.intro',
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });

    // About text
    gsap.from('.about-text > *', {
        scrollTrigger: {
            trigger: '.about',
            start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    // About image parallax
    gsap.fromTo('.about-image img', 
        { scale: 1.2, y: -20 },
        {
            scale: 1,
            y: 20,
            ease: "none",
            scrollTrigger: {
                trigger: '.about-image',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );

    // Portfolio items reveal is now handled after fetch in the JSON promise.

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
