document.getElementById('usResident').addEventListener('change', function() {
    const zipcodeSection = document.getElementById('zipcodeSection');
    if (this.checked) {
        zipcodeSection.style.display = 'block';
        document.getElementById('zipcode').setAttribute('required', true);
    } else {
        zipcodeSection.style.display = 'none';
        document.getElementById('zipcode').removeAttribute('required');
    }
});

document.getElementById('pizzaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let formIsValid = true;
    let errorMessages = [];
    
    const name = document.getElementById('name').value;
    const birthYear = document.getElementById('birthYear').value;
    const usResident = document.getElementById('usResident').checked;
    const zipcode = document.getElementById('zipcode').value;
    const password = document.getElementById('password').value;
    const pizza = document.querySelector('input[name="pizza"]:checked');

    if (name.length < 3) {
        formIsValid = false;
        errorMessages.push("Name must be at least 3 characters.");
    }

    const currentYear = new Date().getFullYear();
    if (birthYear < 1901 || birthYear > currentYear || isNaN(birthYear)) {
        formIsValid = false;
        errorMessages.push("Year of Birth must be between 1901 and the current year.");
    }

    if (usResident && !/^\d{5}$/.test(zipcode)) {
        formIsValid = false;
        errorMessages.push("Zipcode must be a 5-digit number.");
    }

    if (password.length < 8) {
        formIsValid = false;
        errorMessages.push("Password must be at least 8 characters long.");
    }

    if (!pizza) {
        formIsValid = false;
        errorMessages.push("You must select a preferred type of pizza.");
    }

    const formMessages = document.getElementById('formMessages');
    formMessages.innerHTML = '';

    if (formIsValid) {
        formMessages.innerHTML = '<p>Accepted</p>';
    } else {
        errorMessages.forEach(function(msg) {
            const error = document.createElement('p');
            error.textContent = msg;
            formMessages.appendChild(error);
        });
    }
});
