import { login, logout } from './js/login.js';
import { signup } from './js/signup.js';
import { requestPrescription } from './js/prescription.js';
import { populateDoctors } from './js/doctor.js';
import { displayDetails, updateDetails } from './js/profile.js';
import { determineHref } from './js/home.js';
import { decideNavContent } from './js/nav.js';
import { populateFacilities } from './js/facilities.js';
import { bookAppointment } from './js/appointment.js';
// import { requestPrescription } from './js/requestPrescription.js';

// dom selection
const loginBtn = document.querySelector('.loginBtn');
const signUpBtn = document.querySelector('.signUpBtn');
const submit = document.querySelector('.submit');
const reqPresBtn = document.querySelector('.reqPresBtn');
const bookAppBtn = document.querySelector('.bookAppBtn');

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

// prescription functionality
if (reqPresBtn) {
  populateDoctors();
  reqPresBtn.addEventListener('click', async () => {
    const doctor = document.getElementById('healthProfessional').value;
    const prescription = document.getElementById('prescription').value;
    const reason = document.getElementById('furtherInfo').value;

    await requestPrescription(doctor, prescription, reason);
    alert('Prescription successfully registered');
  });
}

// appointment functionality
if (bookAppBtn) {
  populateDoctors();
  populateFacilities();

  bookAppBtn.addEventListener('click', async () => {
    const healthProfessional =
      document.getElementById('healthProfessional').value;
    const service = document.getElementById('services').value;
    const reason = document.getElementById('reason').value;
    const facility =
      document.getElementById('facility').selectedOptions[0].dataset.id;
    const date = new Date(document.getElementById('date').value);
    const time = document.getElementById('time').value;

    const res = await bookAppointment(
      healthProfessional,
      service,
      reason,
      facility,
      date,
      time
    );

    console.log(res);
  });
}
