document.addEventListener("DOMContentLoaded", function () {
    // Handle Image Slideshow
    document.querySelectorAll(".car-card").forEach(card => {
        let currentIndex = 0;
        const images = JSON.parse(card.getAttribute("data-images")) || [];
        const imageElement = card.querySelector(".car-image");
        const prevBtn = card.querySelector(".prev-btn");
        const nextBtn = card.querySelector(".next-btn");

        if (images.length > 0 && imageElement) {
            imageElement.src = images[currentIndex]; // Ensure the first image is loaded
        }

        prevBtn?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            imageElement.src = images[currentIndex];
        });

        nextBtn?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            imageElement.src = images[currentIndex];
        });
    });

    // Handle Booking Popup
    const bookingPopup = document.getElementById("booking-popup");
    const closeBookingPopup = document.querySelector(".close-popup");
    
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("book-now-btn")) {
            bookingPopup?.classList.add("active");
        } else if (event.target.classList.contains("close-popup")) {
            bookingPopup?.classList.remove("active");
        }
    });

    // Handle Form Submission
    const bookingForm = document.getElementById("booking-form");
    bookingForm?.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("🚗 Your vehicle is booked successfully! 🎉");
        bookingPopup?.classList.remove("active");
    });


});
