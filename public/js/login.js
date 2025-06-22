document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent default submit first

    let formIsValid = true;

    // Validate email
    if (!validateLoginEmail()) formIsValid = false;

    // Validate password
    if (!validateLoginPassword()) formIsValid = false;

    if (formIsValid) {
        this.submit();  // If all valid, submit form
    }
});

function validateLoginEmail() {
    const email = document.getElementById("email");
    const emailFeedback = document.getElementById("emailFeedback");
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    email.classList.remove("is-invalid");

    if (!emailValue) {
        email.classList.add("is-invalid");
        emailFeedback.textContent = "*Email is required";
        return false;
    } else if (!emailRegex.test(emailValue)) {
        email.classList.add("is-invalid");
        emailFeedback.textContent = "*Invalid email format";
        return false;
    }

    emailFeedback.textContent = "";
    return true;
}

function validateLoginPassword() {
    const password = document.getElementById("password");
    const passwordFeedback = document.getElementById("passwordFeedback");
    const passwordValue = password.value.trim();

    password.classList.remove("is-invalid");

    if (!passwordValue) {
        password.classList.add("is-invalid");
        passwordFeedback.textContent = "*Password is required";
        return false;
    }

    passwordFeedback.textContent = "";
    return true;
}
