/*"patient": "642d9457e0cc5325030b88bf",
  "doctor": "60c94aa71013731a3db3a7b3",
  "date": "2023-04-05T12:30:00.000Z",
  "medicationName": "Ibuprofen",
  "routeOfAdministration": "Oral",
  "dosage": "400mg",
  "duration": "7 days",
  "frequency": "Three times daily",
  "refills": 1,
  "notes": "Take with food."*/ 

export const requestPrescription = async (patient = 'Bill', healthProfessional, date = Date.now(), prescription, routeOfAdministration, dosage, duration, frequency, refills, notes) => {
    const url = 'http://127.0.0.1:3000/api/prescriptions/request';
  
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ${localStorage.getItem('token')}",
      },
      body: JSON.stringify({ patient,healthProfessional, date, prescription, routeOfAdministration, dosage, duration, frequency, refills, notes }),
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
  