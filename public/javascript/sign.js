const body = document.querySelector('body');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const formBox = document.getElementById('formBox');

signUpBtn.onclick = function() {
    formBox.classList.add('active');
    body.classList.add('active');
}

signInBtn.onclick = function() {
    formBox.classList.remove('active');
    body.classList.remove('active');
}

async function userLogin(event) {
    event.preventDefault();

    const formEl = document.getElementById('signInForm');
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    const params = `email=${data.logEmail}&password=${data.logPassword}`;

    const response = await fetch(`/users/login?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        window.location.href = `/users/${data.logEmail}`;
    } else {
        alert('Login failed');
    }
}

async function userRegister(event) {
    event.preventDefault();
    const formEl = document.getElementById('signUpForm');
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    if (data.registerPassword !== data.registerConfirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const params = {
        username: data.registerUsername,
        email: data.registerEmail,
        password: data.registerPassword
    };

    const response = await fetch('/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    if (response.ok) {
        alert('Registered succesfully');
    } else {
        alert('Sign up failed');
    }
}