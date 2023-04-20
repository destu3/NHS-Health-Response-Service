import { login, logout } from './js/login.js';
import { signup } from './js/signup.js';
import { requestPrescription } from './js/prescription.js';
import { populateDoctors } from './js/doctor.js';
import { displayDetails, updateDetails } from './js/profile.js';
import { determineHref } from './js/home.js';
import { decideNavContent } from './js/nav.js';
import { populateFacilities } from './js/facilities.js';
import {
  initCalender,
  bookAppointment,
  toggleOverlay,
  handleUpdate,
} from './js/appointment.js';
import {
  addEventListeners,
  renderCards,
  handleCategoryUpdate,
  showAddOverlay,
  hideAddOverlay,
  addCategory,
} from './js/category.js';
// import { requestPrescription } from './js/requestPrescription.js';

// dom selection
const loginBtn = document.querySelector('.loginBtn');
const signUpBtn = document.querySelector('.signUpBtn');
const submit = document.querySelector('.submit');
const reqPresBtn = document.querySelector('.reqPresBtn');
const bookAppBtn = document.querySelector('.bookAppBtn');
const calendarEl = document.getElementById('calendar');
const overlay = document.querySelector('.overlay');
const addOverlay = document.querySelector('.add-overlay');
const updateBtn = document.querySelector('.updateBtn');
const addBtn = document.querySelector('.addBtn');
const createBtn = document.querySelector('.createBtn');
const checkboxes = document.getElementsByName('role');

// decide hrefValue
determineHref();

// render navigation bar
decideNavContent();

// login
if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let role;

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) role = checkbox.value;
    });

    const res = await login(email, password, role);
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
if (window.location.pathname.includes('/account')) {
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

// render calendar
if (calendarEl) {
  initCalender(calendarEl);
}

// toggle overlay
if (overlay) {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) {
      toggleOverlay(undefined);
    }
  });
}

// update appointment functionality
if (location.pathname.includes('appointment')) {
  updateBtn.addEventListener('click', () => {
    const service = document.getElementById('service').value;
    const date = new Date(document.getElementById('date')).value;
    const time = document.getElementById('time').value;

    const id = updateBtn.dataset.appointmentId;

    handleUpdate(service, date, time, id);
  });
}

// category page

if (location.pathname.includes('category')) {
  renderCards();

  addBtn.addEventListener('click', showAddOverlay);
  updateBtn.addEventListener('click', handleCategoryUpdate);
  addOverlay.addEventListener('click', hideAddOverlay);
  createBtn.addEventListener('click', addCategory);
}
