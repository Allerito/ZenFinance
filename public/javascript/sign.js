const body = document.querySelector('body');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const formBox = document.getElementById('formBox');
const passwordResetForm = document.getElementById('passwordResetForm');

signUpBtn.onclick = function() {
    formBox.classList.add('active');
    body.classList.add('active');
}

signInBtn.onclick = function() {
    formBox.classList.remove('active');
    body.classList.remove('active');
}

function logTogglePasswordVisibility() {
    const logPassword = document.getElementById("logPassword");
    const logTogglePassword = document.getElementById("logTogglePassword");

    if(logPassword.type === "password") {
        logPassword.type = "text";
        logTogglePassword.src = "/images/visibilityOff.svg";
    }
    else {
        logPassword.type = "password";
        logTogglePassword.src = "/images/visibility.svg";
    }
}

function registerTogglePasswordVisibility() {
    const registerPassword = document.getElementById("registerPassword");
    const registerConfirmPassword = document.getElementById("registerConfirmPassword");
    const registerTogglePassword = document.getElementById("registerTogglePassword");

    if(registerPassword.type === "password") {
        registerPassword.type = "text";
        registerConfirmPassword.type = "text";
        registerTogglePassword.src = "/images/redVisibilityOff.svg";
    }
    else {
        registerPassword.type = "password";
        registerConfirmPassword.type = "password";
        registerTogglePassword.src = "/images/redVisibility.svg";
    }
}

function openForgotPasswordForm() {
    if(passwordResetForm.style.display === "block") {
        passwordResetForm.style.display = 'none';
    }
    else {
        passwordResetForm.style.display = 'block';
    }
}

function resetPassword() {
    const email = document.querySelector('.email-input').value;

    alert("Email for reset password was sent");
    console.log('Richiesta di reset password inviata per:', email);
    passwordResetForm.style.display = 'none';
}

window.addEventListener('click', (event) => {
  if (!event.target.closest('.password-reset')) {
    passwordResetForm.style.display = 'none';
  }
});

async function userLogin(event) {
    event.preventDefault();

    const formEl = document.getElementById('signInForm');
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.logEmail,
            password: data.logPassword
        })
    });

    if (response.ok) {
        window.location.href = new URL(`/users/${data.logEmail}`, window.location.origin);
    } else {
        alert("Login failed");
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
        window.location.href = `/users/${params.email}`;
    } else {
        alert('Sign up failed');
    }
}