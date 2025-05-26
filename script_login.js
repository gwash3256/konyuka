// Toggle between login & signup form
function toggleForm() {
    document.getElementById("loginForm").classList.toggle("hidden");
    document.getElementById("signupForm").classList.toggle("hidden");
}

// Login Functionality
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("Please fill in all fields!");
        return;
    }

    alert("Login Successful!");
    window.location.href = "script.html"; // Redirect to another page
}

// Signup Functionality
function signup() {
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let phone = document.getElementById("signupPhone").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (name === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    alert("Account Created Successfully!");
    window.location.href = "script.html"; // Redirect to another page
}
