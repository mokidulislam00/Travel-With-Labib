
/* =========================================================
   TRAVEL WITH LABIB
   GLOBAL JAVASCRIPT
   Works with:
   - index.html
   - destinations.html
   - tours.html
   - about.html
   - contact.html

   Place this file at:
   js/script.js

   Then use on ALL HTML pages:
   <script src="js/script.js"></script>
========================================================= */

"use strict";

/* =========================================================
   GLOBAL HELPERS
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return Array.from(parent.querySelectorAll(selector));
};

const on = (element, event, handler, options = false) => {
    if (element) {
        element.addEventListener(event, handler, options);
    }
};

const showElement = (element) => {
    if (!element) return;

    element.classList.remove("hidden");
    element.classList.add("show");

    if (element.id === "backTop") {
        element.classList.add("show");
    }
};

const hideElement = (element) => {
    if (!element) return;

    element.classList.remove("show");

    if (
        element.id !== "mobileMenu" &&
        element.id !== "destinationModal" &&
        element.id !== "bookingModal"
    ) {
        element.classList.add("hidden");
    }
};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initNavbar();
    initBackToTop();

    initHomeCarousel();
    initHomeSearch();

    initDestinationPage();

    initToursPage();

    initAboutPage();

    initContactPage();

    initGlobalButtons();

    console.log("Travel With Labib JS loaded successfully.");

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuBtn = $("#menuBtn");
    const mobileMenu = $("#mobileMenu");

    if (!menuBtn || !mobileMenu) return;

    let isOpen = false;

    on(menuBtn, "click", () => {

        isOpen = !isOpen;

        if (isOpen) {

            mobileMenu.classList.add("show");
            mobileMenu.classList.remove("hidden");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else {

            mobileMenu.classList.remove("show");

            /*
             * Some HTML versions use the custom
             * .mobile-menu class while others may
             * use Tailwind hidden.
             */
            if (mobileMenu.classList.contains("mobile-menu")) {
                mobileMenu.classList.remove("hidden");
            } else {
                mobileMenu.classList.add("hidden");
            }

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

    });


    /* Close menu after clicking a link */

    $$("#mobileMenu a").forEach(link => {

        on(link, "click", () => {

            isOpen = false;

            mobileMenu.classList.remove("show");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    /* Close when clicking outside */

    on(document, "click", (event) => {

        if (
            isOpen &&
            !mobileMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            isOpen = false;

            mobileMenu.classList.remove("show");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

    });

}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const navbar = $(".navbar");

    const handleScroll = () => {

        if (navbar) {

            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        }

    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const backTop = $("#backTop");

    if (!backTop) return;

    const updateButton = () => {

        if (window.scrollY > 400) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    };

    window.addEventListener("scroll", updateButton);

    updateButton();


    on(backTop, "click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   HOMEPAGE HERO CAROUSEL
========================================================= */

function initHomeCarousel() {

    const slides = $$(".slide");
    const indicators = $$(".indicator");

    const prevBtn = $("#prevBtn");
    const nextBtn = $("#nextBtn");

    if (!slides.length) return;

    let currentSlide = 0;
    let autoPlay = null;

    const heroData = [

        {
            small: "Discover The World",

            title:
                'Explore The World, <span class="text-[#D98A78]">Create Memories.</span>',

            text:
                "Discover beautiful destinations, exciting adventures and unforgettable experiences."
        },

        {
            small: "Beautiful Beaches",

            title:
                'Escape To <span class="text-[#D98A78]">Paradise.</span>',

            text:
                "Relax on beautiful beaches and experience unforgettable tropical adventures."
        },

        {
            small: "Unforgettable Adventures",

            title:
                'Travel More, <span class="text-[#D98A78]">Live More.</span>',

            text:
                "Explore new cultures, meet amazing people and create memories that last forever."
        }

    ];


    const heroSmall = $("#heroSmall");
    const heroTitle = $("#heroTitle");
    const heroText = $("#heroText");
    const heroContent = $("#heroContent");


    function updateHeroText(index) {

        const data = heroData[index];

        if (!data) return;

        if (heroSmall) {
            heroSmall.textContent = data.small;
        }

        if (heroTitle) {
            heroTitle.innerHTML = data.title;
        }

        if (heroText) {
            heroText.textContent = data.text;
        }

    }


    function showSlide(index) {

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

        currentSlide = index;


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        indicators.forEach((indicator, i) => {

            indicator.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        updateHeroText(currentSlide);


        /* Restart content animation */

        if (heroContent) {

            heroContent.style.animation = "none";

            void heroContent.offsetWidth;

            heroContent.style.animation =
                "fadeUp 0.8s ease";

        }

    }


    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    function startAutoPlay() {

        stopAutoPlay();

        autoPlay = setInterval(() => {

            nextSlide();

        }, 5000);

    }


    function stopAutoPlay() {

        if (autoPlay) {

            clearInterval(autoPlay);

            autoPlay = null;

        }

    }


    on(nextBtn, "click", () => {

        nextSlide();
        startAutoPlay();

    });


    on(prevBtn, "click", () => {

        previousSlide();
        startAutoPlay();

    });


    indicators.forEach((indicator, index) => {

        on(indicator, "click", () => {

            showSlide(index);
            startAutoPlay();

        });

    });


    /* Pause while mouse is over hero */

    const hero = $(".hero");

    if (hero) {

        on(hero, "mouseenter", stopAutoPlay);

        on(hero, "mouseleave", startAutoPlay);

    }


    /* Keyboard controls */

    on(document, "keydown", (event) => {

        if (!slides.length) return;

        if (event.key === "ArrowRight") {

            nextSlide();
            startAutoPlay();

        }

        if (event.key === "ArrowLeft") {

            previousSlide();
            startAutoPlay();

        }

    });


    /* Touch swipe */

    let touchStartX = 0;
    let touchEndX = 0;

    if (hero) {

        on(hero, "touchstart", (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        }, { passive: true });


        on(hero, "touchend", (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchEndX - touchStartX;

            if (Math.abs(distance) < 50) return;

            if (distance < 0) {
                nextSlide();
            } else {
                previousSlide();
            }

            startAutoPlay();

        }, { passive: true });

    }


    showSlide(0);

    startAutoPlay();

}


/* =========================================================
   HOMEPAGE SEARCH
========================================================= */

function initHomeSearch() {

    const searchBtn = $("#searchBtn");

    const destinationInput = $("#destination");
    const dateInput = $("#date");
    const travelersInput = $("#travelers");

    if (!searchBtn) return;


    /* Prevent selecting a past travel date */

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.min = today;

    }


    on(searchBtn, "click", () => {

        const destination =
            destinationInput ?
                destinationInput.value.trim() :
                "";

        const date =
            dateInput ?
                dateInput.value :
                "";

        const travelers =
            travelersInput ?
                travelersInput.value :
                "1 Traveler";


        if (!destination) {

            showToast(
                "Please enter a destination.",
                "error"
            );

            if (destinationInput) {
                destinationInput.focus();
            }

            return;
        }


        if (!date) {

            showToast(
                "Please select your travel date.",
                "error"
            );

            if (dateInput) {
                dateInput.focus();
            }

            return;
        }


        /*
         * Save search information so the tours page
         * can use it.
         */

        localStorage.setItem(
            "travelSearch",
            JSON.stringify({
                destination,
                date,
                travelers
            })
        );


        /*
         * Redirect to tours page.
         */

        window.location.href =
            `tours.html?destination=${encodeURIComponent(destination)}`;

    });

}


/* =========================================================
   DESTINATIONS PAGE
========================================================= */

function initDestinationPage() {

    const grid = $("#destinationGrid");

    /*
     * If the destination page doesn't exist,
     * safely stop here.
     */

    if (!grid) return;


    const cards =
        $$(".destination-card", grid);

    const filterButtons =
        $$(".filter-btn");

    const searchInput =
        $("#destinationSearch");

    const noResults =
        $("#noResults");


    let activeCategory = "all";


    /* -----------------------------------------------------
       FILTER + SEARCH
    ----------------------------------------------------- */

    function filterDestinations() {

        const searchTerm =
            searchInput ?
                searchInput.value
                    .trim()
                    .toLowerCase() :
                "";


        let visibleCount = 0;


        cards.forEach(card => {

            const category =
                (
                    card.dataset.category || ""
                ).toLowerCase();


            const name =
                (
                    card.dataset.name ||
                    $(".text-2xl", card)?.textContent ||
                    ""
                ).toLowerCase();


            const categoryMatch =
                activeCategory === "all" ||
                category === activeCategory;


            const searchMatch =
                !searchTerm ||
                name.includes(searchTerm) ||
                category.includes(searchTerm);


            const shouldShow =
                categoryMatch &&
                searchMatch;


            if (shouldShow) {

                card.classList.remove("hidden-card");
                card.classList.remove("hidden");

                visibleCount++;

            } else {

                card.classList.add("hidden-card");

            }

        });


        if (noResults) {

            if (visibleCount === 0) {

                noResults.classList.remove("hidden");

            } else {

                noResults.classList.add("hidden");

            }

        }

    }


    /* -----------------------------------------------------
       FILTER BUTTONS
    ----------------------------------------------------- */

    filterButtons.forEach(button => {

        on(button, "click", () => {

            activeCategory =
                (
                    button.dataset.category ||
                    "all"
                ).toLowerCase();


            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");

            filterDestinations();

        });

    });


    /* -----------------------------------------------------
       SEARCH
    ----------------------------------------------------- */

    on(searchInput, "input", () => {

        filterDestinations();

    });


    /* -----------------------------------------------------
       FAVORITES
    ----------------------------------------------------- */

    initDestinationFavorites();


    /* -----------------------------------------------------
       DESTINATION DETAILS MODAL
    ----------------------------------------------------- */

    initDestinationModal();

}


/* =========================================================
   DESTINATION FAVORITES
========================================================= */

function initDestinationFavorites() {

    const buttons =
        $$(".favorite-btn");

    if (!buttons.length) return;


    let favorites = [];

    try {

        favorites =
            JSON.parse(
                localStorage.getItem(
                    "favoriteDestinations"
                )
            ) || [];

    } catch (error) {

        favorites = [];

    }


    buttons.forEach(button => {

        const card =
            button.closest(".destination-card");

        if (!card) return;


        const name =
            card.dataset.name ||
            $(".text-2xl", card)?.textContent.trim() ||
            "Destination";


        const icon =
            $("i", button);


        /* Restore saved state */

        if (favorites.includes(name)) {

            button.classList.add("active");

            if (icon) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

            }

        }


        on(button, "click", (event) => {

            event.preventDefault();
            event.stopPropagation();


            const index =
                favorites.indexOf(name);


            if (index === -1) {

                favorites.push(name);

                button.classList.add("active");

                if (icon) {

                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid");

                }

                showToast(
                    `${name} added to favorites.`,
                    "success"
                );

            } else {

                favorites.splice(index, 1);

                button.classList.remove("active");

                if (icon) {

                    icon.classList.remove("fa-solid");
                    icon.classList.add("fa-regular");

                }

                showToast(
                    `${name} removed from favorites.`,
                    "success"
                );

            }


            localStorage.setItem(
                "favoriteDestinations",
                JSON.stringify(favorites)
            );

        });

    });

}


/* =========================================================
   DESTINATION DETAILS MODAL
========================================================= */

function initDestinationModal() {

    const modal =
        $("#destinationModal");

    const closeModal =
        $("#closeModal");

    const modalImage =
        $("#modalImage");

    const modalTitle =
        $("#modalTitle");

    const modalDescription =
        $("#modalDescription");

    const detailButtons =
        $$(".details-btn");


    if (!modal || !detailButtons.length) return;


    function openModal(data) {

        if (modalImage) {

            modalImage.src =
                data.image || "";

            modalImage.alt =
                data.name || "Destination";

        }


        if (modalTitle) {

            modalTitle.textContent =
                data.name || "Destination";

        }


        if (modalDescription) {

            modalDescription.textContent =
                data.description ||
                "Discover this amazing destination.";

        }


        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeDestinationModal() {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }


    detailButtons.forEach(button => {

        on(button, "click", () => {

            openModal({

                name:
                    button.dataset.name,

                description:
                    button.dataset.description,

                image:
                    button.dataset.image

            });

        });

    });


    on(closeModal, "click", closeDestinationModal);


    /* Click outside modal box */

    on(modal, "click", (event) => {

        if (event.target === modal) {

            closeDestinationModal();

        }

    });


    /* ESC */

    on(document, "keydown", (event) => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeDestinationModal();

        }

    });

}


/* =========================================================
   TOURS PAGE
========================================================= */

function initToursPage() {

    const tourCards =
        $$(".tour-card");

    const tourSearch =
        $("#tourSearch");

    const filterButtons =
        $$(".filter-btn");


    /*
     * If there are no tour elements,
     * this page simply doesn't need this section.
     */

    if (
        !tourCards.length &&
        !tourSearch &&
        !filterButtons.length
    ) {
        return;
    }


    let activeCategory = "all";


    /* -----------------------------------------------------
       TOUR FILTERING
    ----------------------------------------------------- */

    function filterTours() {

        const term =
            tourSearch ?
                tourSearch.value
                    .trim()
                    .toLowerCase() :
                "";


        let visibleCount = 0;


        tourCards.forEach(card => {

            const category =
                (
                    card.dataset.category || ""
                ).toLowerCase();


            const name =
                (
                    card.dataset.name ||
                    $(".tour-title", card)?.textContent ||
                    $(".text-2xl", card)?.textContent ||
                    ""
                ).toLowerCase();


            const location =
                (
                    card.dataset.location || ""
                ).toLowerCase();


            const categoryMatch =
                activeCategory === "all" ||
                category === activeCategory;


            const searchMatch =
                !term ||
                name.includes(term) ||
                location.includes(term) ||
                category.includes(term);


            const visible =
                categoryMatch &&
                searchMatch;


            if (visible) {

                card.classList.remove("hidden");
                card.classList.remove("hidden-card");

                visibleCount++;

            } else {

                card.classList.add("hidden");

            }

        });


        const noResults =
            $("#tourNoResults") ||
            $("#noTourResults") ||
            $("#noResults");


        if (noResults) {

            noResults.classList.toggle(
                "hidden",
                visibleCount !== 0
            );

        }

    }


    /* -----------------------------------------------------
       FILTER BUTTONS
    ----------------------------------------------------- */

    filterButtons.forEach(button => {

        on(button, "click", () => {

            /*
             * Only use filter buttons that belong
             * to the tours page.
             */

            const category =
                button.dataset.category;

            if (!category) return;


            activeCategory =
                category.toLowerCase();


            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");

            filterTours();

        });

    });


    /* -----------------------------------------------------
       SEARCH
    ----------------------------------------------------- */

    on(tourSearch, "input", filterTours);


    /* -----------------------------------------------------
       LOAD SEARCH FROM HOMEPAGE
    ----------------------------------------------------- */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const destinationFromURL =
        params.get("destination");


    let savedSearch = null;

    try {

        savedSearch =
            JSON.parse(
                localStorage.getItem(
                    "travelSearch"
                )
            );

    } catch (error) {

        savedSearch = null;

    }


    const searchDestination =
        destinationFromURL ||
        savedSearch?.destination ||
        "";


    if (
        searchDestination &&
        tourSearch
    ) {

        tourSearch.value =
            searchDestination;

        filterTours();

    }


    /* -----------------------------------------------------
       BOOKING SYSTEM
    ----------------------------------------------------- */

    initBookingModal();

}


/* =========================================================
   BOOKING MODAL
========================================================= */

function initBookingModal() {

    const bookingModal =
        $("#bookingModal");

    const bookingForm =
        $("#bookingForm");


    /*
     * Support multiple possible close button IDs.
     */

    const closeBooking =
        $("#closeBookingModal") ||
        $("#closeBooking") ||
        $(".close-booking");


    const bookingButtons =
        $(
            ".book-tour-btn, " +
            ".book-btn, " +
            "[data-book-tour]"
        );


    if (!bookingModal && !bookingForm) return;


    const tourNameInput =
        $("#bookingTour") ||
        $("#selectedTour") ||
        $("#tourName");


    const bookingName =
        $("#bookingName") ||
        $("#name");


    const bookingEmail =
        $("#bookingEmail") ||
        $("#email");


    const bookingPhone =
        $("#bookingPhone") ||
        $("#phone");


    const bookingDate =
        $("#bookingDate") ||
        $("#date");


    const bookingGuests =
        $("#bookingGuests") ||
        $("#guests") ||
        $("#travelers");


    const bookingMessage =
        $("#bookingMessage") ||
        $("#message");


    function openBookingModal(tourName = "") {

        if (!bookingModal) return;


        if (tourNameInput && tourName) {

            if (
                tourNameInput.tagName === "INPUT" ||
                tourNameInput.tagName === "SELECT"
            ) {

                tourNameInput.value =
                    tourName;

            } else {

                tourNameInput.textContent =
                    tourName;

            }

        }


        bookingModal.classList.add("show");
        bookingModal.classList.remove("hidden");

        document.body.style.overflow =
            "hidden";

    }


    function closeBookingModal() {

        if (!bookingModal) return;

        bookingModal.classList.remove("show");

        /*
         * If the HTML uses Tailwind hidden,
         * keep it hidden.
         */

        if (
            bookingModal.classList.contains("modal") ||
            bookingModal.classList.contains("booking-modal")
        ) {

            /* opacity/visibility handled by CSS */

        } else {

            bookingModal.classList.add("hidden");

        }


        document.body.style.overflow = "";

    }


    /* -----------------------------------------------------
       BOOK BUTTONS
    ----------------------------------------------------- */

    bookingButtons.forEach(button => {

        on(button, "click", (event) => {

            event.preventDefault();


            const card =
                button.closest(".tour-card");


            let tourName =
                button.dataset.tour ||
                button.dataset.name ||
                "";


            if (!tourName && card) {

                tourName =
                    card.dataset.name ||
                    card.dataset.tour ||
                    $(".tour-title", card)?.textContent.trim() ||
                    $(".text-2xl", card)?.textContent.trim() ||
                    "Selected Tour";

            }


            openBookingModal(tourName);

        });

    });


    /* -----------------------------------------------------
       CLOSE
    ----------------------------------------------------- */

    on(
        closeBooking,
        "click",
        closeBookingModal
    );


    on(
        bookingModal,
        "click",
        (event) => {

            if (event.target === bookingModal) {

                closeBookingModal();

            }

        }
    );


    on(document, "keydown", (event) => {

        if (
            event.key === "Escape" &&
            bookingModal?.classList.contains("show")
        ) {

            closeBookingModal();

        }

    });


    /* -----------------------------------------------------
       DATE
    ----------------------------------------------------- */

    if (bookingDate) {

        const today =
            new Date().toISOString().split("T")[0];

        bookingDate.min = today;

    }


    /* -----------------------------------------------------
       BOOKING FORM
    ----------------------------------------------------- */

    on(bookingForm, "submit", (event) => {

        event.preventDefault();


        const name =
            bookingName?.value.trim() || "";


        const email =
            bookingEmail?.value.trim() || "";


        const phone =
            bookingPhone?.value.trim() || "";


        const date =
            bookingDate?.value || "";


        const guests =
            bookingGuests?.value || "";


        /* Required fields */

        if (!name) {

            showToast(
                "Please enter your name.",
                "error"
            );

            bookingName?.focus();

            return;

        }


        if (!isValidEmail(email)) {

            showToast(
                "Please enter a valid email address.",
                "error"
            );

            bookingEmail?.focus();

            return;

        }


        if (!phone) {

            showToast(
                "Please enter your phone number.",
                "error"
            );

            bookingPhone?.focus();

            return;

        }


        if (!date) {

            showToast(
                "Please select a travel date.",
                "error"
            );

            bookingDate?.focus();

            return;

        }


        const selectedDate =
            new Date(date);


        const today =
            new Date();

        today.setHours(0, 0, 0, 0);


        if (selectedDate < today) {

            showToast(
                "Travel date cannot be in the past.",
                "error"
            );

            bookingDate?.focus();

            return;

        }


        /* Create booking object */

        const booking = {

            id:
                "booking-" +
                Date.now(),

            tour:
                getInputValue(
                    tourNameInput
                ) || "Selected Tour",

            name,

            email,

            phone,

            date,

            guests,

            message:
                bookingMessage?.value.trim() || "",

            createdAt:
                new Date().toISOString()

        };


        let bookings = [];

        try {

            bookings =
                JSON.parse(
                    localStorage.getItem(
                        "travelBookings"
                    )
                ) || [];

        } catch (error) {

            bookings = [];

        }


        bookings.push(booking);


        localStorage.setItem(
            "travelBookings",
            JSON.stringify(bookings)
        );


        /* Success */

        showBookingSuccess(
            bookingModal,
            booking
        );


        if (bookingForm) {

            bookingForm.reset();

        }

    });

}


/* =========================================================
   BOOKING SUCCESS
========================================================= */

function showBookingSuccess(modal, booking) {

    if (!modal) return;


    const existing =
        $("#bookingSuccess");


    if (existing) {

        existing.innerHTML = `

            <div class="text-center py-6">

                <div
                    class="w-16 h-16 mx-auto
                           rounded-full
                           bg-green-100
                           text-green-600
                           flex items-center
                           justify-center
                           text-3xl">

                    <i class="fa-solid fa-check"></i>

                </div>

                <h3
                    class="text-2xl
                           font-extrabold
                           mt-5">

                    Booking Request Sent!

                </h3>

                <p
                    class="text-gray-500
                           mt-3">

                    Thank you, ${escapeHTML(booking.name)}.
                    We received your booking request.

                </p>

                <button
                    type="button"
                    id="successCloseBtn"
                    class="mt-6
                           bg-[#B85C4A]
                           text-white
                           px-6 py-3
                           rounded-full
                           font-semibold">

                    Done

                </button>

            </div>
        `;


        existing.classList.remove("hidden");

        on(
            $("#successCloseBtn"),
            "click",
            () => {
                modal.classList.remove("show");
                document.body.style.overflow = "";
            }
        );

        return;

    }


    /*
     * If no success container exists,
     * use a toast instead.
     */

    showToast(
        "Booking request submitted successfully!",
        "success"
    );


    setTimeout(() => {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }, 1200);

}


/* =========================================================
   ABOUT PAGE
========================================================= */

function initAboutPage() {

    initCounters();

    initFAQ();

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        $$("[data-counter], .counter");

    if (!counters.length) return;


    let started = false;


    const animateCounters = () => {

        if (started) return;

        const first =
            counters[0];


        if (!first) return;


        const rect =
            first.getBoundingClientRect();


        if (rect.top > window.innerHeight) {
            return;
        }


        started = true;


        counters.forEach(counter => {

            const target =
                parseInt(
                    counter.dataset.counter ||
                    counter.dataset.target ||
                    counter.textContent.replace(/\D/g, "") ||
                    "0",
                    10
                );


            const suffix =
                counter.dataset.suffix ||
                "";


            const duration = 1500;

            const startTime =
                performance.now();


            function update(time) {

                const progress =
                    Math.min(
                        (time - startTime) /
                        duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const current =
                    Math.floor(
                        target * eased
                    );


                counter.textContent =
                    current + suffix;


                if (progress < 1) {

                    requestAnimationFrame(update);

                } else {

                    counter.textContent =
                        target + suffix;

                }

            }


            requestAnimationFrame(update);

        });

    };


    window.addEventListener(
        "scroll",
        animateCounters
    );


    animateCounters();

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const faqButtons =
        $$(
            ".faq-question, " +
            ".faq-btn, " +
            "[data-faq]"
        );


    if (!faqButtons.length) return;


    faqButtons.forEach(button => {

        on(button, "click", () => {

            const item =
                button.closest(
                    ".faq-item"
                );


            if (!item) return;


            const answer =
                $(".faq-answer", item);


            if (!answer) return;


            const isOpen =
                answer.classList.contains("show") ||
                !answer.classList.contains("hidden");


            /*
             * Close other FAQ items.
             */

            $$(".faq-item").forEach(other => {

                if (other === item) return;


                const otherAnswer =
                    $(".faq-answer", other);


                if (otherAnswer) {

                    otherAnswer.classList.remove(
                        "show"
                    );

                    otherAnswer.classList.add(
                        "hidden"
                    );

                }


                const otherIcon =
                    $(".faq-icon", other) ||
                    $("i", $(".faq-question", other) || {});


                if (otherIcon) {

                    otherIcon.style.transform =
                        "rotate(0deg)";

                }

            });


            if (isOpen) {

                answer.classList.remove("show");
                answer.classList.add("hidden");

            } else {

                answer.classList.remove("hidden");
                answer.classList.add("show");

            }


            const icon =
                $(".faq-icon", item);


            if (icon) {

                icon.style.transform =
                    isOpen ?
                        "rotate(0deg)" :
                        "rotate(180deg)";

            }

        });

    });

}


/* =========================================================
   CONTACT PAGE
========================================================= */

function initContactPage() {

    const contactForm =
        $("#contactForm");


    if (!contactForm) return;


    const nameInput =
        $("#contactName") ||
        $("#name");


    const emailInput =
        $("#contactEmail") ||
        $("#email");


    const phoneInput =
        $("#contactPhone") ||
        $("#phone");


    const subjectInput =
        $("#contactSubject") ||
        $("#subject");


    const messageInput =
        $("#contactMessage") ||
        $("#message");


    /* -----------------------------------------------------
       EMAIL VALIDATION
    ----------------------------------------------------- */

    on(
        emailInput,
        "blur",
        () => {

            if (
                emailInput.value.trim() &&
                !isValidEmail(
                    emailInput.value.trim()
                )
            ) {

                setFieldError(
                    emailInput,
                    "Please enter a valid email."
                );

            } else {

                clearFieldError(emailInput);

            }

        }
    );


    /* -----------------------------------------------------
       FORM SUBMIT
    ----------------------------------------------------- */

    on(contactForm, "submit", (event) => {

        event.preventDefault();


        const name =
            nameInput?.value.trim() || "";


        const email =
            emailInput?.value.trim() || "";


        const phone =
            phoneInput?.value.trim() || "";


        const subject =
            subjectInput?.value.trim() || "";


        const message =
            messageInput?.value.trim() || "";


        /* Clear old errors */

        [
            nameInput,
            emailInput,
            phoneInput,
            subjectInput,
            messageInput
        ].forEach(clearFieldError);


        let valid = true;


        if (!name) {

            setFieldError(
                nameInput,
                "Please enter your name."
            );

            valid = false;

        }


        if (!isValidEmail(email)) {

            setFieldError(
                emailInput,
                "Please enter a valid email."
            );

            valid = false;

        }


        if (
            phoneInput &&
            !phone
        ) {

            setFieldError(
                phoneInput,
                "Please enter your phone number."
            );

            valid = false;

        }


        if (
            subjectInput &&
            !subject
        ) {

            setFieldError(
                subjectInput,
                "Please enter a subject."
            );

            valid = false;

        }


        if (!message) {

            setFieldError(
                messageInput,
                "Please enter your message."
            );

            valid = false;

        }


        if (!valid) {

            showToast(
                "Please fix the highlighted fields.",
                "error"
            );

            return;

        }


        /* Save message locally */

        const contactMessage = {

            id:
                "message-" +
                Date.now(),

            name,

            email,

            phone,

            subject,

            message,

            createdAt:
                new Date().toISOString()

        };


        let messages = [];

        try {

            messages =
                JSON.parse(
                    localStorage.getItem(
                        "contactMessages"
                    )
                ) || [];

        } catch (error) {

            messages = [];

        }


        messages.push(contactMessage);


        localStorage.setItem(
            "contactMessages",
            JSON.stringify(messages)
        );


        /* Success UI */

        showContactSuccess(
            contactForm
        );


        contactForm.reset();

    });

}


/* =========================================================
   CONTACT SUCCESS
========================================================= */

function showContactSuccess(form) {

    if (!form) return;


    const successBox =
        $("#contactSuccess");


    if (successBox) {

        successBox.classList.remove("hidden");

        successBox.innerHTML = `

            <div
                class="rounded-xl
                       bg-green-50
                       border border-green-200
                       p-5">

                <div class="flex gap-3">

                    <div
                        class="text-green-600
                               text-xl">

                        <i class="fa-solid fa-circle-check"></i>

                    </div>

                    <div>

                        <h3
                            class="font-bold
                                   text-green-800">

                            Message Sent Successfully!

                        </h3>

                        <p
                            class="text-green-700
                                   text-sm
                                   mt-1">

                            Thank you for contacting us.
                            We will get back to you soon.

                        </p>

                    </div>

                </div>

            </div>

        `;


        setTimeout(() => {

            successBox.classList.add("hidden");

        }, 6000);


        return;

    }


    showToast(
        "Your message has been sent successfully!",
        "success"
    );

}


/* =========================================================
   GLOBAL BUTTON EFFECTS
========================================================= */

function initGlobalButtons() {

    /*
     * Add a small click feedback to buttons
     * without interfering with navigation,
     * forms, modals or links.
     */

    $$("button").forEach(button => {

        on(button, "mousedown", () => {

            button.classList.add(
                "scale-[0.98]"
            );

        });


        on(button, "mouseup", () => {

            button.classList.remove(
                "scale-[0.98]"
            );

        });


        on(button, "mouseleave", () => {

            button.classList.remove(
                "scale-[0.98]"
            );

        });

    });


    /*
     * Smooth scrolling for internal anchors.
     */

    $$('a[href^="#"]').forEach(link => {

        on(link, "click", (event) => {

            const targetID =
                link.getAttribute("href");


            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                $(targetID);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   TOAST NOTIFICATION
========================================================= */

function showToast(
    message,
    type = "success"
) {

    let container =
        $("#toastContainer");


    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "toastContainer";

        container.className =
            "fixed top-24 right-5 z-[9999] flex flex-col gap-3";

        document.body.appendChild(container);

    }


    const toast =
        document.createElement("div");


    const isError =
        type === "error";


    toast.className = `
        flex items-center gap-3
        min-w-[280px]
        max-w-[380px]
        px-5 py-4
        rounded-xl
        shadow-xl
        text-white
        ${isError ? "bg-red-600" : "bg-green-600"}
        translate-x-[120%]
        transition-all
        duration-300
    `;


    toast.innerHTML = `

        <i class="fa-solid
            ${isError ? "fa-circle-exclamation" : "fa-circle-check"}
            text-xl">
        </i>

        <span class="font-medium">
            ${escapeHTML(message)}
        </span>

    `;


    container.appendChild(toast);


    requestAnimationFrame(() => {

        toast.classList.remove(
            "translate-x-[120%]"
        );

    });


    setTimeout(() => {

        toast.classList.add(
            "translate-x-[120%]"
        );


        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   FIELD ERROR
========================================================= */

function setFieldError(
    input,
    message
) {

    if (!input) return;


    input.classList.add(
        "border-red-500"
    );


    input.classList.remove(
        "border-gray-200"
    );


    let error =
        input.parentElement?.querySelector(
            ".field-error"
        );


    if (!error) {

        error =
            document.createElement("p");

        error.className =
            "field-error text-red-500 text-sm mt-1";

        input.parentElement?.appendChild(
            error
        );

    }


    error.textContent =
        message;

}


/* =========================================================
   CLEAR FIELD ERROR
========================================================= */

function clearFieldError(input) {

    if (!input) return;


    input.classList.remove(
        "border-red-500"
    );


    const error =
        input.parentElement?.querySelector(
            ".field-error"
        );


    if (error) {

        error.remove();

    }

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   GET INPUT VALUE
========================================================= */

function getInputValue(element) {

    if (!element) return "";


    if (
        element.tagName === "INPUT" ||
        element.tagName === "SELECT" ||
        element.tagName === "TEXTAREA"
    ) {

        return element.value;

    }


    return element.textContent.trim();

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   LOCAL STORAGE HELPERS
========================================================= */

window.TravelLabib = {

    getBookings() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "travelBookings"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    },


    getFavorites() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "favoriteDestinations"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    },


    getMessages() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "contactMessages"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    },


    clearBookings() {

        localStorage.removeItem(
            "travelBookings"
        );

    },


    clearFavorites() {

        localStorage.removeItem(
            "favoriteDestinations"
        );

    },


    clearMessages() {

        localStorage.removeItem(
            "contactMessages"
        );

    }

};


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
         * Close mobile menu when switching
         * to desktop.
         */

        if (window.innerWidth >= 768) {

            const menu =
                $("#mobileMenu");

            const button =
                $("#menuBtn");


            if (menu) {

                menu.classList.remove(
                    "show"
                );

            }


            if (button) {

                button.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }

    }
);


/* =========================================================
   FINAL STATUS
========================================================= */

console.log(
    "Travel With Labib — Global script initialized."
);

