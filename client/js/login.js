export const login = async (email, password, role = "patient") => {
  const url = "http://127.0.0.1:3000/api/users/login";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }),
  });

  const data = await res.json();

  const token = data.token;

  if (res.ok) {
    alert("successfully logged in");
    window.location.href = "/client/pages/home.html";
    localStorage.setItem("token", token);
  }

  return data;
};
