document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Initial Hero Animations
    // Remove 'hidden-element' from navbar so it fades in
    setTimeout(() => {
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);

    // 3. Scroll Reveal Animations (Intersection Observer)
    const scrollElements = document.querySelectorAll(".scroll-animate");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("animate");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    // Run on load to check if any elements are already in view
    handleScrollAnimation();

    // Run on scroll
    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // 4. Parallax Effect for Images
    const parallaxImages = document.querySelectorAll(".image-parallax");
    window.addEventListener("scroll", () => {
        let scrollValue = window.scrollY;
        parallaxImages.forEach(img => {
            const speed = 0.05;
            // Only apply parallax if element is roughly in view
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `translateY(${(rect.top - window.innerHeight/2) * speed}px)`;
            }
        });
    });
});
