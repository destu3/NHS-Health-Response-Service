import { getLoggedInUser } from './profile';

const overlay = document.querySelector('.overlay');
const addOverlay = document.querySelector('.add-overlay');
const cardContainer = document.querySelector('.category-cards-container');
const nameField = document.getElementById('name');
const statusField = document.getElementById('status');
let id;

export const renderCards = async () => {
  const categories = await getCategories();

  cardContainer.innerHTML = '';

  cardContainer.innerHTML = categories
    .map(category => {
      return `
        <div class="category-card" data-id=${category._id}>
          <h2>${category.name}</h2>
          <p>${category.status}</p>
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

export const addEventListeners = () => {
  const editIcons = document.querySelectorAll('.edit-icon');
  const deleteIcons = document.querySelectorAll('.delete-icon');

  editIcons.forEach(editIcon => {
    editIcon.removeEventListener('click', toggleOverlay); // remove existing listener
    editIcon.addEventListener('click', toggleOverlay); // add new listener
  });

  deleteIcons.forEach(deleteIcon => {
    deleteIcon.removeEventListener('click', handleCategoryDeletion); // remove existing listener
    deleteIcon.addEventListener('click', handleCategoryDeletion);
  });
};

export async function getCategories() {
  const url = 'http://127.0.0.1:3000/api/categories';

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

function showInfo(name, status) {
  nameField.value = name;
  statusField.value = status;
}

export function toggleOverlay() {
  // if edit icon is clicked
  const card = this.parentElement.parentElement;
  const name = card.querySelector('h2').textContent;
  const status = card.querySelector('p').textContent;
  showInfo(name, status);
  overlay.classList.toggle('overlay-hidden');
  id = card.dataset.id;
}

export async function handleCategoryUpdate() {
  const url = `http://127.0.0.1:3000/api/categories/${id}`;

  const user = getLoggedInUser();

  if (user.role !== 'manager') {
    return alert('You must be a manager to modify this category');
  }

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: nameField.value,
      status: statusField.value,
    }),
  });

  if (res.ok) {
    alert('category updated successfully');
  }

  renderCards();
}

async function handleCategoryDeletion() {
  const card = this.parentElement.parentElement;
  id = card.dataset.id;
  const url = `http://127.0.0.1:3000/api/categories/${id}`;

  const user = getLoggedInUser();

  if (user.role !== 'manager') {
    return alert('You must be a manager to delete this category');
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
      alert('category deleted successfully');
    }

    renderCards();
  }
}

export async function addCategory() {
  const url = `http://127.0.0.1:3000/api/categories`;
  const name = document.getElementById('name-add').value;
  const user = getLoggedInUser();

  if (user.role !== 'manager') {
    return alert('You must be a manager to add a new category');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ name, proposedBy: user._id }),
  });

  if (res.ok) {
    alert('category created successfully');
  }

  renderCards();
  addOverlay.classList.add('overlay-hidden');
}

export function showAddOverlay() {
  addOverlay.classList.remove('overlay-hidden');
}

export function hideAddOverlay(e) {
  if (e.target == this) addOverlay.classList.add('overlay-hidden');
}
