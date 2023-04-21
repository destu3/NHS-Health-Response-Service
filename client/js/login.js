export const login = async (email, password, role) => {
  const url = 'http://127.0.0.1:3000/api/users/login';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, role }),
  });

  const data = await res.json();

  const token = data.token;

  if (res.ok) {
    alert('successfully logged in');
    localStorage.setItem('token', token);
    window.location.href = '/pages/home.html';
  } else {
    alert('error logging in');
    console.log(data);
  }

  return data;
};

export const logout = () => {
  localStorage.setItem('token', '');
  alert('successfully logged out');
  window.location.href = '/pages/login.html';
};
