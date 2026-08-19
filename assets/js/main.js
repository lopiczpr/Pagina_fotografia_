// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", (event) => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // List of optimized images from the gallery
    const images = [
        "DSC00045.jpg", "DSC00064.jpg", "DSC00097.jpg", "DSC09526.jpg", "DSC09534.jpg",
        "DSC09543.jpg", "DSC09551.jpg", "DSC09589.jpg", "DSC09866.jpg", "DSC09895.jpg",
        "DSC09953.jpg", "DSC09990.jpg", "LTS06866.jpg", "LTS06873.jpg", "LTS06895.jpg",
        "LTS06947.jpg", "LTS07039.jpg", "LTS07105.jpg", "LTS07238.jpg", "LTS07325.jpg",
        "LTS07343.jpg", "LTS07373.jpg", "_DSC1392.jpg", "_DSC1431.jpg", "_DSC1454.jpg",
        "_DSC1511.jpg", "_DSC1516.jpg", "_DSC1520.jpg", "_DSC1740.jpg", "_DSC2076.jpg",
        "_DSC2885.jpg", "_DSC2906.jpg", "_DSC3051.jpg", "_DSC3062.jpg", "_DSC3463.jpg",
        "_DSC3495.jpg", "_DSC3685.jpg", "_DSC4432.jpg", "_DSC4559.jpg", "_DSC6018.jpg",
        "_DSC6020.jpg", "_DSC6376.jpg", "_DSC6854.jpg", "_DSC6856.jpg", "_DSC7016.jpg",
        "_DSC7034.jpg"
    ];

    // Populate Masonry Grid
    const grid = document.getElementById('gallery-grid');
    if (grid) {
        images.forEach((imgSrc, index) => {
            // Exclude the hero image used in about section if we want, or just include all.
            const item = document.createElement('div');
            item.className = 'masonry-item';
            
            const img = document.createElement('img');
            img.src = `assets/img/gallery/${imgSrc}`;
            img.alt = `Boda capturada por Carlos López ${index + 1}`;
            img.loading = "lazy";
            
            item.appendChild(img);
            grid.appendChild(item);
        });
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

    // Portfolio items reveal
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
