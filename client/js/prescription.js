import { getLoggedInUser } from './profile.js';
import { getDoctors } from './doctor.js';

export const requestPrescription = async (doctor, prescription, reason) => {
  const url = 'http://127.0.0.1:3000/api/prescriptions/request';
  const patient = getLoggedInUser()._id;

  const docs = await getDoctors();
  const doc = docs.filter(doc => {
    if (doc.firstName === doctor) {
      return true;
    }
  });

  const docId = doc[0]._id;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      patient,
      doctor: docId,
      date: Date.now(),
      medicationName: prescription,
      reason,
    }),
  });

  const data = await res.json();

  return data;
};
