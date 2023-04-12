import jwt_decode from 'jwt-decode';

export function getLoggedInUser() {
  const token = localStorage.getItem('token');

  const decoded = jwt_decode(token);
  const user = decoded.user || decoded.doc;
  return user;
}

export function displayDetails() {
  const firstName = document.getElementById('f-name');
  const lastName = document.getElementById('l-name');
  const dob = document.getElementById('dob');
  const email = document.getElementById('email');

  const currentUser = getLoggedInUser();

  firstName.value = currentUser.firstName;
  lastName.value = currentUser.lastName;
  email.value = currentUser.email;

  const date = new Date(currentUser.dob);

  const formatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    daySuffix: 'ordinal',
  });

  const formattedDob = formatter.format(date);
  dob.value = formattedDob;
}

export async function updateDetails() {
  const currentUser = getLoggedInUser();
  const firstName = document.getElementById('f-name').value;
  const lastName = document.getElementById('l-name').value;
  const dob = document.getElementById('dob').value;

  const regex = /^\d{1,2}\s[A-Za-z]+\s\d{4}$/; // The regular expression pattern to match the format
  if (!regex.test(dob))
    return alert('Invalid Date of birth, must be DD Month YYYY');

  const rawDob = new Date(dob);
  const email = document.getElementById('email').value;

  const updatedInfo = JSON.stringify({
    firstName,
    lastName,
    email,
    dob: rawDob,
    role: 'patient',
  });

  const res = await fetch(
    `http://127.0.0.1:3000/api/users/${currentUser._id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: updatedInfo,
    }
  );

  if (res.ok) alert('Details updated successfully');

  const data = await res.json();
  const newToken = data.token;

  localStorage.setItem('token', newToken);
}
