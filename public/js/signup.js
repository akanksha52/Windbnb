document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let formIsValid = true;

    if (!validateEmail()) formIsValid = false;
    if (!validatePassword()) formIsValid = false;

    const emailValue = document.getElementById("email").value.trim();
    const emailFeedback = document.getElementById("emailFeedback");

    if (formIsValid) {
        // AJAX Email Availability Check
        const response = await fetch(`/user/check-email?email=${encodeURIComponent(emailValue)}`);
        const result = await response.json();

        if (!result.available) {
            const emailField = document.getElementById("email");
            emailField.classList.add("is-invalid");
            emailFeedback.textContent = "*Email already registered";
            emailFeedback.style.display = "block";
            emailFeedback.style.opacity = "1";
            formIsValid = false;
        }
    }

    if (formIsValid) {
        this.submit();
    }
});

function validateEmail() {
    const email = document.getElementById("email");
    const emailFeedback = document.getElementById("emailFeedback");
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    email.classList.remove("is-invalid");

    if (!emailValue) {
        email.classList.add("is-invalid");
        emailFeedback.textContent = "*Email is required";
        emailFeedback.style.display = "block";
        emailFeedback.style.opacity = "1";
        return false;
    } else if (!emailRegex.test(emailValue)) {
        email.classList.add("is-invalid");
        emailFeedback.textContent = "*Invalid email format";
        emailFeedback.style.display = "block";
        emailFeedback.style.opacity = "1";
        return false;
    }

    emailFeedback.style.display = "none";
    emailFeedback.style.opacity = "0";
    return true;
}

function validatePassword() {
    const password = document.getElementById("password");
    const passwordFeedback = document.getElementById("passwordFeedback");
    const passwordValue = password.value.trim();

    password.classList.remove("is-invalid");

    if (!passwordValue) {
        password.classList.add("is-invalid");
        passwordFeedback.textContent = "*Password is required";
        passwordFeedback.style.display = "block";
        passwordFeedback.style.opacity = "1";
        return false;
    } else if (passwordValue.length < 6) {
        password.classList.add("is-invalid");
        passwordFeedback.textContent = "*Password must be at least 6 characters";
        passwordFeedback.style.display = "block";
        passwordFeedback.style.opacity = "1";
        return false;
    }

    passwordFeedback.style.display = "none";
    passwordFeedback.style.opacity = "0";
    return true;
}
