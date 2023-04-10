import { login } from "./login.js";
import { signup } from "./signup.js";
import { getProfile } from "./profile.js";

// dom selection
const loginBtn = document.querySelector(".loginBtn");
const signUpBtn = document.querySelector(".signUpBtn");

// login
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await login(email, password);
  });
}

// Signup
if (signUpBtn) {
  console.log(signUpBtn);
  signUpBtn.addEventListener("click", async () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("emailAddress").value;
    const password = document.getElementById("password").value;

    console.log(dob);

    const res = await signup(firstName, lastName, email, password, dob);
    console.log(res);
  });
}

getProfile();
