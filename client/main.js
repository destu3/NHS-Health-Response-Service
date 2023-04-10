import { login } from './js/login.js';
import { signup } from './js/signup.js';
import getLoggedInUser from './js/profile.js';

// dom selection
const loginBtn = document.querySelector('.loginBtn');
const signUpBtn = document.querySelector('.signUpBtn');

// login
if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await login(email, password);
  });
}

// Signup
if (signUpBtn) {
  signUpBtn.addEventListener('click', async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;

    const res = await signup(firstName, lastName, email, password, dob);
    console.log(res);
  });
}

// manage account profile
if (window.location.pathname.includes('/manageAccountDetail')) {
  const user = getLoggedInUser();
  console.log(getLoggedInUser());
}
