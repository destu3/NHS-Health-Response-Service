import { getLoggedInUser } from "./profile.js";

export async function displayHealthDetails() {
  const medicalConditions = document.getElementById("m-conditions");
  const allergies = document.getElementById("allergies");
  const medication = document.getElementById("medications");
  const medicalVaccinations = document.getElementById("m-vaccinations");
  const mentalConditions = document.getElementById("mentalConditions");

  const currentUser = getLoggedInUser()._id;
  console.log(currentUser);

  const url = `http://127.0.0.1:3000/api/HealthProfiles/${currentUser}`;
  console.log(url)

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(res);
}

export function updateHealthDetails() {}

/* <label for="m-conditions">Medical Condition</label>
<input id="m-conditions" class="acc-field" />

<label for="allergies">Allergies</label>
<input id="allergies" class="acc-field" />

<label for="medications">Medication</label>
<input id="medications" class="acc-field" />

<label for="m-vaccinations">Medical Vaccinations</label>
<input id="m-vaccinations" class="acc-field" />

<label for="m-conditions">Mental Condition</label>
<input id="m-conditions" class="acc-field" /> */
