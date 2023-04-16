import { login } from './js/login.js';
import { signup } from './js/signup.js';
import {
  getLoggedInUser,
  displayDetails,
  updateDetails,
} from './js/profile.js';
import { decideNavContent } from './js/nav.js';
import { bookAppointment } from './js/bookAppointment.js';
import { requestPrescription } from './js/requestPrescription.js';

// dom selection
const loginBtn = document.querySelector('.loginBtn');
const signUpBtn = document.querySelector('.signUpBtn');
const submit = document.querySelector('.submit');
const bookAppBtn = document.querySelector('.bookAppBtn');
const requestBtn = document.querySelector('.requestBtn');


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

//Book Appointment
if (bookAppBtn) {
  bookAppBtn.addEventListener('click', async () => {
    const healthProfessional = document.getElementById('healthProfessional').value;
    const services = document.getElementById('services').value;
    const facility = document.getElementById('facility').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const reason = document.getElementById('reason').value;

    const res = await bookAppointment(healthProfessional, services, facility, date, time, reason);
    console.log(res);    
  });
}

if (requestBtn) {
  requestBtn.addEventListener('click', async () => {
    const healthProfessional = document.getElementById('healthProfessional').value;
    const prescription = document.getElementById('prescription').value;
    const dosage = document.getElementById('dosage').value;
    const frequency = document.getElementById('frequency').value;
    const furtherInfo = document.getElementById('furtherInfo').value;

    const res = await requestPrescription(healthProfessional, prescription, dosage, frequency, furtherInfo);
    console.log(res);  
  });
}