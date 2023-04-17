export async function getDoctors() {
  const res = await fetch('http://127.0.0.1:3000/api/users/doctors', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  return data.data.doctors;
}

export async function populateDoctors() {
  const selectElement = document.getElementById('healthProfessional');

  const doctors = await getDoctors();

  const docsHtml = doctors
    .map(doc => {
      return `
    <option value="${doc.firstName}">${doc.firstName}</option>
    `;
    })
    .join(' ');

  selectElement.insertAdjacentHTML('beforeend', docsHtml);
}
