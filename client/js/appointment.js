import { getLoggedInUser } from './profile.js';
import { getDoctors } from './doctor.js';

export const bookAppointment = async (
  healthProfessional,
  service,
  reason,
  facility,
  date,
  time
) => {
  const url = 'http://127.0.0.1:3000/api/appointments';

  const hps = await getDoctors();
  const hp = hps.filter(hp => {
    if (hp.firstName === healthProfessional) {
      return true;
    }
  });

  const hpId = hp[0]._id;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      patient: getLoggedInUser()._id,
      healthProfessional: hpId,
      service,
      reason,
      facility,
      date,
      time,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    alert('Appointment Successfully Booked!');
  }
  return data;
};
