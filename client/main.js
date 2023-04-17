import { login, logout } from './js/login.js';
import { signup } from './js/signup.js';
// import { requestpresc } from './js/prescription.js';
import { displayDetails, updateDetails } from './js/profile.js';
import { determineHref } from './js/home.js';
import { decideNavContent } from './js/nav.js';
// import { bookAppointment } from './js/bookAppointment.js';
// import { requestPrescription } from './js/requestPrescription.js';

// dom selection
const loginBtn = document.querySelector('.loginBtn');
const signUpBtn = document.querySelector('.signUpBtn');
const submit = document.querySelector('.submit');

// decide hrefValue
determineHref();

// render navigation bar
decideNavContent();

// login
if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await login(email, password);
  });
}

// logout
const logoutBtn = document.querySelector('.logout');
if (logoutBtn) logoutBtn.addEventListener('click', logout);

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
  displayDetails();
}

// update user info
if (submit) {
  submit.addEventListener('click', updateDetails);
}

// // prescriptions functionality
// if (reqPresBtn) {
//   // doctor, prescription, dosage, duration, frequency, furtherInfo
//   reqPresBtn.addEventListener('click', async () => {
//     const doctor = document.getElementById('healthProfessional').value;
//     const prescription = document.getElementById('prescription').value;
//     const furtherInfo = document.getElementById('furtherInfo').value;

//     const res = await requestpresc(doctor, prescription, furtherInfo);
//     console.log(res);
//   });
// }
