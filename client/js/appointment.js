import moment from 'moment-timezone';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import { getLoggedInUser } from './profile.js';
import { getDoctors } from './doctor.js';

let calendar;
const overlay = document.querySelector('.overlay');

export const bookAppointment = async (
  healthProfessional,
  service,
  reason,
  facility,
  date,
  time
) => {
  const url = 'http://127.0.0.1:3000/api/appointments/book-appointment';

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

export const getAppointments = async () => {
  const url = 'http://127.0.0.1:3000/api/appointments';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      patient: getLoggedInUser()._id,
      status: { $ne: 'cancelled' },
    }),
  });
  const appointmentDocs = (await res.json()).data.docs;
  console.log(appointmentDocs);

  const appointmentEvents = appointmentDocs.map(appointment => {
    const appointmentDate = moment.utc(appointment.date); // create a moment object with the appointment date in UTC
    const appointmentTime = moment.duration(appointment.time); // create a moment duration object with the appointment time

    const formattedDate = appointmentDate
      .add(appointmentTime)
      .format('YYYY-MM-DDTHH:mm:ss'); // convert the appointment date to the user's local time zone, add the appointment time, and format as a string

    return {
      id: appointment._id,
      title:
        appointment.service[0].toUpperCase() + appointment.service.slice(1),
      start: formattedDate,
      extendedProps: {
        description: appointment.reason,
      },
    };
  });

  return appointmentEvents;
};

const getAppointmentInfo = async id => {
  const url = 'http://127.0.0.1:3000/api/appointments';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      _id: id,
    }),
  });
  const info = (await res.json()).data.docs;
  return info;
};

const handleDelete = async (calendar, eventId) => {
  const confirmed = confirm('Are you sure you want to cancel the appointment');

  if (confirmed) {
    await fetch(`http://127.0.0.1:3000/api/appointments/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    calendar.getEventById(eventId).remove();
  }
};

const renderInfo = async id => {
  const info = (await getAppointmentInfo(id))[0];

  const service = document.getElementById('service');
  const date = document.getElementById('date');
  const time = document.getElementById('time');

  const infoDate = new Date(info.date);
  // Formatting the date as a string in the format that a date input expects
  const dateString = infoDate.toISOString().substring(0, 10);
  date.value = dateString;
  service.value = info.service;
  time.value = info.time;
};

export const handleUpdate = async (service, date, time, id) => {
  const url = `http://127.0.0.1:3000/api/appointments/${id}`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      service,
      date,
      time,
    }),
  });

  if (res.ok) {
    alert('Appointments updated successfully');
    console.log(await res.json());
    calendar.render();
  } else {
    alert('Appointment update failed');
  }
};

const handleCancelationEvents = elements => {
  elements.forEach(element => {
    element.addEventListener('click', function () {
      handleDelete(calendar, this.dataset.id);
    });
  });
};

export const initCalender = async el => {
  const userAppointmentEvents = await getAppointments();

  calendar = new Calendar(el, {
    plugins: [listPlugin],
    initialView: 'listWeek',
    height: 'auto',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next',
    },

    // handler for event content rendering
    eventContent: function (info) {
      return {
        html: `
          <div class="fc-list-item-title">
            <strong>${info.event.title}</strong>
            <span class="event-icons">
              <i class="fa-solid fa-pencil edit-icon" data-id="${info.event.id}"></i>
              <i class="fa-solid fa-trash-can" data-id="${info.event.id}"></i>
            </span>
          </div>
          <div class="fc-list-item-description">
            ${info.event.extendedProps.description}
          </div>
        `,
      };
    },

    eventsSet: function (info) {
      const deleteIcons = document.querySelectorAll('.fa-trash-can');
      const editIcons = document.querySelectorAll('.edit-icon');

      handleCancelationEvents(deleteIcons);
      editIcons.forEach(editIcon => {
        editIcon.addEventListener('click', function (e) {
          toggleOverlay.bind(e.target)(this.dataset.id);
        });
        editIcon.addEventListener('click', async function (e) {
          await renderInfo(e.target.dataset.id);
        });
      });
    },
  });

  userAppointmentEvents.forEach(event => {
    calendar.addEvent(event);
  });

  calendar.render();
};

export function toggleOverlay(id) {
  // if edit icon is clicked
  if (this)
    if (this.classList.contains('edit-icon')) {
      const updateBtn = document.querySelector('.updateBtn');
      updateBtn.dataset.appointmentId = id;
    }

  overlay.classList.toggle('overlay-hidden');
}
