import { getLoggedInUser } from './profile.js';

export const requestpresc = async (doctor, prescription, furtherInfo) => {
    const url = "http://127.0.0.1:3000/api/prescriptions/request";
    const patient = getLoggedInUser()._id
    console.log(patient)
    const docs = await getDoctors()
    const doc = docs.filter(doc => {
      if (doc.firstName === doctor){
        return true
      }
    })


    const docId = doc[0]._id
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ patient, doctor: docId, date: Date.now(),  medicationName: prescription, furtherInfo }),
    });
  
    const data = await res.json();
  
    return data;
  };

  async function getDoctors() {
    const res = await fetch('http://127.0.0.1:3000/api/users/doctors', {      
    method: 'GET', 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
  });
  
    const data = await res.json();
    return data.data.doctors;
    
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await populateDoctors(); 
  });

  async function populateDoctors() {
    const selectElement = document.getElementById('healthProfessional');
    
    // Check if the select element already has options, if so, clear them
    if (selectElement.options.length > 0) {
      selectElement.innerHTML = "";
    }
    
    const doctors = await getDoctors();

    console.log(doctors)
  
    // Create a new default option
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Select a Health Professional";
    selectElement.appendChild(defaultOption);
  
    // Populate the options with dynamic data
    doctors.forEach(doctor => {
      const optionElement = document.createElement('option');
      optionElement.value = doctor.firstName;
      optionElement.textContent = doctor.firstName;
      selectElement.appendChild(optionElement);
    });
  }