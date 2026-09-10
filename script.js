
/* =========================================================
   WANDERLY TOUR & TRAVEL
   Global JavaScript
   Supports:
   1. index.html
   2. destinations.html
   3. tours.html
   4. about.html
   5. contact.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                if (mobileMenu.classList.contains("hidden")) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                } else {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }
            }
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }


    /* =====================================================
       2. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 30) {
                navbar.classList.add(
                    "shadow-lg",
                    "bg-white/95",
                    "backdrop-blur-md"
                );
            } else {
                navbar.classList.remove(
                    "shadow-lg",
                    "bg-white/95",
                    "backdrop-blur-md"
                );
            }
        };

        window.addEventListener("scroll", updateNavbar);

        updateNavbar();
    }


    /* =====================================================
       3. HERO CAROUSEL / SLIDER
       ===================================================== */

    const slides = document.querySelectorAll(".hero-slide");
    const nextSlideBtn = document.getElementById("nextSlide");
    const prevSlideBtn = document.getElementById("prevSlide");
    const dots = document.querySelectorAll(".hero-dot");

    if (slides.length > 0) {

        let currentSlide = 0;
        let autoSlide;

        const showSlide = (index) => {

            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            slides.forEach((slide, i) => {

                slide.classList.remove("opacity-100");
                slide.classList.add("opacity-0");

                if (i === currentSlide) {
                    slide.classList.remove("opacity-0");
                    slide.classList.add("opacity-100");
                }
            });

            dots.forEach((dot, i) => {

                dot.classList.remove(
                    "bg-white",
                    "scale-125"
                );

                dot.classList.add("bg-white/50");

                if (i === currentSlide) {
                    dot.classList.remove("bg-white/50");
                    dot.classList.add(
                        "bg-white",
                        "scale-125"
                    );
                }
            });
        };


        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };


        const previousSlide = () => {
            showSlide(currentSlide - 1);
        };


        if (nextSlideBtn) {
            nextSlideBtn.addEventListener("click", () => {
                nextSlide();
                restartAutoSlide();
            });
        }


        if (prevSlideBtn) {
            prevSlideBtn.addEventListener("click", () => {
                previousSlide();
                restartAutoSlide();
            });
        }


        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {
                showSlide(index);
                restartAutoSlide();
            });

        });


        const startAutoSlide = () => {

            autoSlide = setInterval(() => {
                nextSlide();
            }, 5000);

        };


        const restartAutoSlide = () => {

            clearInterval(autoSlide);
            startAutoSlide();

        };


        showSlide(0);
        startAutoSlide();
    }


    /* =====================================================
       4. DESTINATION SEARCH
       ===================================================== */

    const destinationSearch =
        document.getElementById("destinationSearch");

    const destinationCards =
        document.querySelectorAll(".destination-card");

    const noResults =
        document.getElementById("noResults");

    let activeCategory = "all";


    const filterDestinations = () => {

        if (destinationCards.length === 0) {
            return;
        }

        const searchValue =
            destinationSearch
                ? destinationSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        let visibleCount = 0;


        destinationCards.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            const category =
                card.dataset.category
                ? card.dataset.category.toLowerCase()
                : "all";


            const matchesSearch =
                text.includes(searchValue);

            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;


            if (matchesSearch && matchesCategory) {

                card.classList.remove("hidden");

                visibleCount++;

            } else {

                card.classList.add("hidden");

            }

        });


        if (noResults) {

            if (visibleCount === 0) {
                noResults.classList.remove("hidden");
            } else {
                noResults.classList.add("hidden");
            }

        }
    };


    if (destinationSearch) {

        destinationSearch.addEventListener(
            "input",
            filterDestinations
        );

    }


    /* =====================================================
       5. DESTINATION CATEGORY FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            activeCategory =
                button.dataset.category
                ? button.dataset.category.toLowerCase()
                : "all";


            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "bg-indigo-600",
                    "text-white"
                );

                btn.classList.add(
                    "bg-white",
                    "text-gray-700"
                );

            });


            button.classList.remove(
                "bg-white",
                "text-gray-700"
            );

            button.classList.add(
                "bg-indigo-600",
                "text-white"
            );


            filterDestinations();

        });

    });


    /* =====================================================
       6. DESTINATION FAVORITE / HEART BUTTON
       ===================================================== */

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");


    favoriteButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();
            event.stopPropagation();


            const icon =
                button.querySelector("i");


            const isFavorite =
                button.dataset.favorite === "true";


            if (isFavorite) {

                button.dataset.favorite = "false";

                button.classList.remove(
                    "text-red-500",
                    "bg-red-50"
                );


                if (icon) {

                    icon.classList.remove("fa-solid");
                    icon.classList.add("fa-regular");

                }

            } else {

                button.dataset.favorite = "true";

                button.classList.add(
                    "text-red-500",
                    "bg-red-50"
                );


                if (icon) {

                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid");

                }

            }

        });

    });


    /* =====================================================
       7. DESTINATION DETAILS MODAL
       ===================================================== */

    const destinationModal =
        document.getElementById("destinationModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalImage =
        document.getElementById("modalImage");


    const detailsButtons =
        document.querySelectorAll(".details-btn");


    const hideDestinationModal = () => {

        if (!destinationModal) {
            return;
        }

        destinationModal.classList.add("hidden");

        document.body.classList.remove(
            "overflow-hidden"
        );

    };


    const showDestinationModal = (button) => {

        if (!destinationModal) {
            return;
        }


        const card =
            button.closest(".destination-card");


        const title =
            button.dataset.title ||
            (
                card &&
                card.querySelector("h3")
                ? card.querySelector("h3").textContent.trim()
                : "Beautiful Destination"
            );


        const description =
            button.dataset.description ||
            (
                card &&
                card.dataset.description
                ? card.dataset.description
                : "Explore this amazing destination with Wanderly Tour & Travel."
            );


        const image =
            button.dataset.image ||
            (
                card &&
                card.querySelector("img")
                ? card.querySelector("img").src
                : ""
            );


        if (modalTitle) {
            modalTitle.textContent = title;
        }


        if (modalDescription) {
            modalDescription.textContent = description;
        }


        if (modalImage && image) {
            modalImage.src = image;
        }


        destinationModal.classList.remove("hidden");

        document.body.classList.add(
            "overflow-hidden"
        );

    };


    detailsButtons.forEach(button => {

        button.addEventListener("click", () => {

            showDestinationModal(button);

        });

    });


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            hideDestinationModal
        );

    }


    if (destinationModal) {

        destinationModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === destinationModal
                ) {

                    hideDestinationModal();

                }

            }
        );

    }


    /* =====================================================
       8. ESC KEY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            hideDestinationModal();

        }

    });


    /* =====================================================
       9. TOURS SEARCH
       ===================================================== */

    const tourSearch =
        document.getElementById("tourSearch");

    const tourCards =
        document.querySelectorAll(".tour-card");

    const tourNoResults =
        document.getElementById("tourNoResults");

    let activeTourCategory = "all";


    const filterTours = () => {

        if (tourCards.length === 0) {
            return;
        }


        const searchValue =
            tourSearch
                ? tourSearch.value.toLowerCase().trim()
                : "";


        let visibleTours = 0;


        tourCards.forEach(card => {

            const text =
                card.textContent.toLowerCase();


            const category =
                card.dataset.category
                ? card.dataset.category.toLowerCase()
                : "all";


            const matchesSearch =
                text.includes(searchValue);


            const matchesCategory =
                activeTourCategory === "all" ||
                category === activeTourCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.classList.remove("hidden");

                visibleTours++;

            } else {

                card.classList.add("hidden");

            }

        });


        if (tourNoResults) {

            if (visibleTours === 0) {

                tourNoResults.classList.remove(
                    "hidden"
                );

            } else {

                tourNoResults.classList.add(
                    "hidden"
                );

            }

        }

    };


    if (tourSearch) {

        tourSearch.addEventListener(
            "input",
            filterTours
        );

    }


    /* =====================================================
       10. TOUR CATEGORY FILTER
       ===================================================== */

    const tourFilterButtons =
        document.querySelectorAll(".tour-filter-btn");


    tourFilterButtons.forEach(button => {

        button.addEventListener("click", () => {

            activeTourCategory =
                button.dataset.category
                ? button.dataset.category.toLowerCase()
                : "all";


            tourFilterButtons.forEach(btn => {

                btn.classList.remove(
                    "bg-indigo-600",
                    "text-white"
                );

                btn.classList.add(
                    "bg-white",
                    "text-gray-700"
                );

            });


            button.classList.remove(
                "bg-white",
                "text-gray-700"
            );

            button.classList.add(
                "bg-indigo-600",
                "text-white"
            );


            filterTours();

        });

    });


    /* =====================================================
       11. TOUR BOOKING MODAL
       ===================================================== */

    const bookingModal =
        document.getElementById("bookingModal");

    const closeBookingModal =
        document.getElementById("closeBookingModal");

    const bookingForm =
        document.getElementById("bookingForm");

    const bookingTourName =
        document.getElementById("bookingTourName");

    const bookingTourInput =
        document.getElementById("bookingTour");


    const bookButtons =
        document.querySelectorAll(".book-tour-btn");


    const openBookingModal = (button) => {

        if (!bookingModal) {
            return;
        }


        const card =
            button.closest(".tour-card");


        const tourName =
            button.dataset.tour ||
            (
                card &&
                card.querySelector("h3")
                ? card.querySelector("h3").textContent.trim()
                : "Selected Tour"
            );


        if (bookingTourName) {
            bookingTourName.textContent = tourName;
        }


        if (bookingTourInput) {
            bookingTourInput.value = tourName;
        }


        bookingModal.classList.remove("hidden");

        document.body.classList.add(
            "overflow-hidden"
        );

    };


    const closeBooking = () => {

        if (!bookingModal) {
            return;
        }

        bookingModal.classList.add("hidden");

        document.body.classList.remove(
            "overflow-hidden"
        );

    };


    bookButtons.forEach(button => {

        button.addEventListener("click", () => {

            openBookingModal(button);

        });

    });


    if (closeBookingModal) {

        closeBookingModal.addEventListener(
            "click",
            closeBooking
        );

    }


    if (bookingModal) {

        bookingModal.addEventListener(
            "click",
            event => {

                if (event.target === bookingModal) {
                    closeBooking();
                }

            }
        );

    }


    /* =====================================================
       12. BOOKING FORM
       ===================================================== */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById("bookingName");

                const email =
                    document.getElementById("bookingEmail");

                const date =
                    document.getElementById("bookingDate");

                const guests =
                    document.getElementById("bookingGuests");

                const success =
                    document.getElementById("bookingSuccess");


                let valid = true;


                // Name
                if (
                    name &&
                    name.value.trim().length < 2
                ) {

                    name.classList.add(
                        "border-red-500"
                    );

                    valid = false;

                } else if (name) {

                    name.classList.remove(
                        "border-red-500"
                    );

                }


                // Email
                if (
                    email &&
                    !isValidEmail(email.value)
                ) {

                    email.classList.add(
                        "border-red-500"
                    );

                    valid = false;

                } else if (email) {

                    email.classList.remove(
                        "border-red-500"
                    );

                }


                // Date
                if (
                    date &&
                    !date.value
                ) {

                    date.classList.add(
                        "border-red-500"
                    );

                    valid = false;

                } else if (date) {

                    date.classList.remove(
                        "border-red-500"
                    );

                }


                // Guests
                if (
                    guests &&
                    (
                        !guests.value ||
                        Number(guests.value) < 1
                    )
                ) {

                    guests.classList.add(
                        "border-red-500"
                    );

                    valid = false;

                } else if (guests) {

                    guests.classList.remove(
                        "border-red-500"
                    );

                }


                if (!valid) {

                    showToast(
                        "Please complete all required fields.",
                        "error"
                    );

                    return;

                }


                if (success) {

                    success.classList.remove(
                        "hidden"
                    );

                }


                showToast(
                    "Booking request submitted successfully!",
                    "success"
                );


                setTimeout(() => {

                    bookingForm.reset();

                    if (success) {
                        success.classList.add(
                            "hidden"
                        );
                    }

                    closeBooking();

                }, 2500);

            }
        );

    }


    /* =====================================================
       13. CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById("contactName");

                const email =
                    document.getElementById("contactEmail");

                const message =
                    document.getElementById("contactMessage");


                const nameError =
                    document.getElementById("nameError");

                const emailError =
                    document.getElementById("emailError");

                const messageError =
                    document.getElementById("messageError");


                const success =
                    document.getElementById("contactSuccess");


                let valid = true;


                /* Name */

                if (
                    !name ||
                    name.value.trim().length < 2
                ) {

                    if (nameError) {
                        nameError.classList.remove(
                            "hidden"
                        );
                    }

                    valid = false;

                } else {

                    if (nameError) {
                        nameError.classList.add(
                            "hidden"
                        );
                    }

                }


                /* Email */

                if (
                    !email ||
                    !isValidEmail(email.value)
                ) {

                    if (emailError) {
                        emailError.classList.remove(
                            "hidden"
                        );
                    }

                    valid = false;

                } else {

                    if (emailError) {
                        emailError.classList.add(
                            "hidden"
                        );
                    }

                }


                /* Message */

                if (
                    !message ||
                    message.value.trim().length < 10
                ) {

                    if (messageError) {
                        messageError.classList.remove(
                            "hidden"
                        );
                    }

                    valid = false;

                } else {

                    if (messageError) {
                        messageError.classList.add(
                            "hidden"
                        );
                    }

                }


                if (!valid) {

                    showToast(
                        "Please fix the highlighted fields.",
                        "error"
                    );

                    return;

                }


                if (success) {

                    success.classList.remove(
                        "hidden"
                    );

                }


                showToast(
                    "Your message has been sent successfully!",
                    "success"
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       14. NEW CONTACT MESSAGE BUTTON
       ===================================================== */

    const newMessageBtn =
        document.getElementById("newMessageBtn");


    if (newMessageBtn) {

        newMessageBtn.addEventListener(
            "click",
            () => {

                if (contactForm) {
                    contactForm.reset();
                    contactForm.classList.remove(
                        "hidden"
                    );
                }


                const success =
                    document.getElementById(
                        "contactSuccess"
                    );


                if (success) {

                    success.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }


    /* =====================================================
       15. FAQ ACCORDION
       ===================================================== */

    const faqButtons =
        document.querySelectorAll(".faq-btn");


    faqButtons.forEach(button => {

        button.addEventListener("click", () => {

            const answer =
                button.nextElementSibling;


            if (!answer) {
                return;
            }


            const icon =
                button.querySelector("i");


            const isOpen =
                !answer.classList.contains(
                    "hidden"
                );


            // Close all FAQ answers
            document.querySelectorAll(
                ".faq-answer"
            ).forEach(item => {

                item.classList.add("hidden");

            });


            // Reset all icons
            document.querySelectorAll(
                ".faq-btn i"
            ).forEach(item => {

                item.classList.remove(
                    "fa-minus"
                );

                item.classList.add(
                    "fa-plus"
                );

            });


            // Open selected FAQ
            if (!isOpen) {

                answer.classList.remove(
                    "hidden"
                );


                if (icon) {

                    icon.classList.remove(
                        "fa-plus"
                    );

                    icon.classList.add(
                        "fa-minus"
                    );

                }

            }

        });

    });


    /* =====================================================
       16. BACK TO TOP
       ===================================================== */

    const backTop =
        document.getElementById("backTop");


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 400) {

                    backTop.classList.remove(
                        "opacity-0",
                        "pointer-events-none"
                    );

                    backTop.classList.add(
                        "opacity-100"
                    );

                } else {

                    backTop.classList.remove(
                        "opacity-100"
                    );

                    backTop.classList.add(
                        "opacity-0",
                        "pointer-events-none"
                    );

                }

            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       17. SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    /* =====================================================
       18. SET MINIMUM BOOKING DATE = TODAY
       ===================================================== */

    const bookingDate =
        document.getElementById("bookingDate");


    if (bookingDate) {

        const today =
            new Date().toISOString().split("T")[0];

        bookingDate.min = today;

    }


    /* =====================================================
       19. IMAGE ERROR FALLBACK
       ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.style.opacity = "0.5";

            }
        );

    });


    /* =====================================================
       20. HELPER FUNCTIONS
       ===================================================== */

    function isValidEmail(email) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(
            email.trim()
        );

    }


    function showToast(message, type = "success") {

        const oldToast =
            document.getElementById("siteToast");


        if (oldToast) {
            oldToast.remove();
        }


        const toast =
            document.createElement("div");


        toast.id = "siteToast";


        const icon =
            type === "success"
            ? "fa-circle-check"
            : "fa-circle-exclamation";


        const bg =
            type === "success"
            ? "bg-green-600"
            : "bg-red-600";


        toast.className = `
            fixed
            top-6
            right-6
            z-[9999]
            ${bg}
            text-white
            px-5
            py-4
            rounded-xl
            shadow-2xl
            flex
            items-center
            gap-3
            max-w-sm
            animate-pulse
        `;


        toast.innerHTML = `
            <i class="fa-solid ${icon} text-xl"></i>
            <span>${message}</span>
        `;


        document.body.appendChild(toast);


        setTimeout(() => {

            toast.style.opacity = "0";
            toast.style.transform =
                "translateY(-10px)";

            toast.style.transition =
                "all 0.3s ease";


            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }


    /* =====================================================
       21. CONSOLE SUCCESS MESSAGE
       ===================================================== */

    console.log(
        "%c Wanderly Tour & Travel ",
        "background:#4f46e5;color:white;font-size:16px;font-weight:bold;padding:8px;"
    );

    console.log(
        "Website JavaScript loaded successfully."
    );

});

