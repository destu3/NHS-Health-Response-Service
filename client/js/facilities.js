async function getFacilities() {
  // get user longitude and latitude
  let lat, lng;

  if (navigator.geolocation) {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    lat = position.coords.latitude;
    lng = position.coords.longitude;
  } else {
    console.log('Geolocation is not supported by this browser.');
    return;
  }

  const res = await fetch('http://127.0.0.1:3000/api/facilities/nearby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ lng, lat, distance: 500 }),
  });

  const data = await res.json();

  return data.facilities;
}

export async function populateFacilities() {
  const selectElement = document.getElementById('facility');

  const facilities = await getFacilities();

  const facHtml = facilities
    .map(fac => {
      return `
      <option value="${fac.name}" data-id="${fac._id}">${fac.name}</option>
      `;
    })
    .join(' ');

  selectElement.insertAdjacentHTML('beforeend', facHtml);
}
