const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const phone = form.querySelectorAll('input[type="text"]')[1].value.trim();
    const message = form.querySelector("textarea").value.trim();

    // Empty Validation
    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill all the fields.");
        return;
    }

    // Email Validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Phone Validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phone.match(phonePattern)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Success
    alert("🎉 Thank you! Your message has been sent successfully.");

    form.reset();

});