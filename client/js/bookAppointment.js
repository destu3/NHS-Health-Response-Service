export const bookAppointment = async (patient = 'Bill', healthProfessional, service, reason, facility, status, date, time) => {
    const url = 'http://127.0.0.1:3000/api/appointments';
  
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ${localStorage.getItem('token')}",
      },
      body: JSON.stringify({ patient,healthProfessional, service, reason, facility, status, date, time }),
    });
  
    const data = await res.json();
  
    const token = data.token;
  
    if (res.ok) {
      alert('Appointment Successfully Booked!');
      window.location.href = '/pages/home.html';
      localStorage.setItem('token', token);
    } else {
      console.log(data);
    }
  
    return data;
  };
  