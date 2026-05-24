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

    // 5. Rooms Rendering and Filtering
    const roomsContainer = document.getElementById('rooms-container');
    if (roomsContainer && typeof roomsData !== 'undefined') {
        const searchInput = document.getElementById('searchInput');
        const capacityFilter = document.getElementById('capacityFilter');
        const priceFilter = document.getElementById('priceFilter');
        const noResults = document.getElementById('no-results');

        const renderRooms = (rooms) => {
            roomsContainer.innerHTML = '';
            if (rooms.length === 0) {
                noResults.style.display = 'block';
                return;
            }
            noResults.style.display = 'none';
            
            rooms.forEach((room, index) => {
                const delayClass = index % 2 !== 0 ? 'delay-1' : '';
                const badgeHtml = room.badge ? `<span class="badge ${room.badge === 'Cao cấp' ? 'premium' : ''}">${room.badge}</span>` : '';
                
                const roomCard = `
                <div class="room-card animate fade-up ${delayClass}">
                    <div class="room-img-wrapper">
                        <img src="${room.image}" alt="${room.name}">
                        ${badgeHtml}
                    </div>
                    <div class="room-info">
                        <h3>${room.name}</h3>
                        <p>${room.description.substring(0, 80)}...</p>
                        <div class="room-meta">
                            <span>🛏️ ${room.beds}</span>
                            <span>👥 ${room.capacity} Khách</span>
                        </div>
                        <div class="room-footer">
                            <div class="price">${room.priceFormatted}<span>/đêm</span></div>
                            <a href="room-detail.html?id=${room.id}" class="btn-outline">Chi Tiết</a>
                        </div>
                    </div>
                </div>`;
                roomsContainer.innerHTML += roomCard;
            });
            
            // Note: Since we use 'animate' class directly above, they appear immediately without scroll trigger, which is better for filtering UX.
        };

        const filterRooms = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const capacity = capacityFilter.value;
            const price = priceFilter.value;

            const filteredRooms = roomsData.filter(room => {
                const matchName = room.name.toLowerCase().includes(searchTerm);
                
                let matchCapacity = true;
                if (capacity !== 'all') {
                    if (capacity === '4') {
                        matchCapacity = room.capacity >= 4;
                    } else {
                        matchCapacity = room.capacity === parseInt(capacity);
                    }
                }

                let matchPrice = true;
                if (price !== 'all') {
                    if (price === 'under500') {
                        matchPrice = room.price < 500000;
                    } else if (price === '500-1000') {
                        matchPrice = room.price >= 500000 && room.price <= 1000000;
                    } else if (price === 'over1000') {
                        matchPrice = room.price > 1000000;
                    }
                }

                return matchName && matchCapacity && matchPrice;
            });

            renderRooms(filteredRooms);
        };

        searchInput.addEventListener('input', filterRooms);
        capacityFilter.addEventListener('change', filterRooms);
        priceFilter.addEventListener('change', filterRooms);

        renderRooms(roomsData);
    }
});
