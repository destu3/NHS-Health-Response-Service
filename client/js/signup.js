export const signup = async (firstName, lastName, email, password, dob) => {
  const url = 'http://127.0.0.1:3000/api/users/sign-up';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password, dob }),
  });

  const data = await res.json();

  if (res.ok) {
    alert('You have successfully signed up');
  }

  return data;
};
