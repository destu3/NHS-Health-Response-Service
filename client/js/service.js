import { getCategories } from './category';
import { getLoggedInUser } from './profile';

const cardContainer = document.querySelector('.category-cards-container');
const nameField = document.getElementById('name');
const statusField = document.getElementById('status');
const categoriesField = document.getElementById('category');
const overlay = document.querySelector('.overlay');
const addOverlay = document.querySelector('.add-overlay');

let id;

export const populateCategories = async () => {
  const categories = await getCategories();
  const html = categories
    .map(category => {
      return `
        <option value="${category._id}">${category.name}</option>
    `;
    })
    .join(' ');
  const categoryEls = document.querySelectorAll('.category');
  categoryEls.forEach(categoryEl => {
    categoryEl.insertAdjacentHTML('beforeend', html);
  });
};

async function getServices() {
  const url = 'http://127.0.0.1:3000/api/services';

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = (await res.json()).data.docs;
  return data;
}

export const addEventListeners = () => {
  const editIcons = document.querySelectorAll('.edit-icon');
  const deleteIcons = document.querySelectorAll('.delete-icon');

  editIcons.forEach(editIcon => {
    editIcon.removeEventListener('click', toggleOverlay); // remove existing listener
    editIcon.addEventListener('click', toggleOverlay); // add new listener
  });

  deleteIcons.forEach(deleteIcon => {
    deleteIcon.removeEventListener('click', handleDeletion); // remove existing listener
    deleteIcon.addEventListener('click', handleDeletion);
  });
};

export function toggleOverlay() {
  // if edit icon is clicked
  const card = this.parentElement.parentElement;
  const name = card.querySelector('h2').textContent;
  const status = card.querySelector('p').textContent;
  showInfo(name, status);
  overlay.classList.toggle('overlay-hidden');
  id = card.dataset.id;
}

export const renderServices = async () => {
  const services = await getServices();

  cardContainer.innerHTML = '';

  cardContainer.innerHTML = services
    .map(service => {
      return `
        <div class="category-card" data-id=${service._id}>
          <h2>${service.name}</h2>
          <p>${service.status}</p>
          <div class="card-icons">
            <i class="fa-solid fa-pencil edit-icon"></i>
            <i class="fa-solid fa-trash-can delete-icon"></i>
          </div>
        </div>
        `;
    })
    .join(' ');

  addEventListeners();
};

function showInfo(name, status) {
  nameField.value = name;
  statusField.value = status;
}

async function handleDeletion() {
  const card = this.parentElement.parentElement;
  id = card.dataset.id;

  const url = `http://127.0.0.1:3000/api/services/${id}`;

  const user = getLoggedInUser();

  if (user.role !== 'manager') {
    return alert('You must be a manager to delete this service.');
  }

  const confirmed = confirm('are you sure you want to delete');

  if (confirmed) {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      alert('service deleted successfully');
    }

    renderServices();
  }
}

export async function handleServiceUpdate() {
  const url = `http://127.0.0.1:3000/api/services/${id}`;

  const user = getLoggedInUser();

  if (user.role !== 'manager') {
    return alert('You must be a manager to modify this service');
  }

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      category: categoriesField.value,
      name: nameField.value,
      status: statusField.value,
    }),
  });

  if (res.ok) {
    alert('service updated successfully');
  }

  renderServices();
}

export async function addService() {
  const url = `http://127.0.0.1:3000/api/services`;
  const name = document.getElementById('name-add').value;
  const category = document.getElementById('category-add').value;
  const user = getLoggedInUser();

  if (user.role !== 'manager') {
    return alert('You must be a manager to add a new service.');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ name, proposedBy: user._id, category }),
  });

  if (res.ok) {
    alert('service created successfully');
  }

  renderServices();
  addOverlay.classList.add('overlay-hidden');
}
