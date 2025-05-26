document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelector(".nav-links"); // Nav links container
    const menuToggle = document.querySelector(".menu-toggle"); // Hamburger icon

    function toggleMenu() {
        navLinks.classList.toggle("active"); // Show/hide nav links
        menuToggle.classList.toggle("active"); // Rotate icon
    }

    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents event bubbling
        toggleMenu();
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });

    // Ensure proper display when resizing screen
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("active"); // Ensure menu is always visible on large screens
            menuToggle.classList.remove("active");
        }
    });
});
