export function decideNavContent() {
  const navSection = document.querySelector('.nav-sect');
  const html = `
  <div class="navlogin">
    <a href="/pages/manageAccountDetail.html">
      <img src="/icons/user.png" alt="logo"/>
    </a>
    <button class="logout">
      <img src="/icons/logout.png" alt="logout" />
    </button>
  </div>
  `;

  const altHtml = `
  <div class="login-register">
    <a href="/pages/login.html"><p>Login</p></a>
    <a href="/pages/signup.html"><p>Sign up</p></a>
  </div>
  `;
  if (localStorage.getItem('token')) {
    navSection.insertAdjacentHTML('beforeend', html);
  } else {
    navSection.insertAdjacentHTML('beforeend', altHtml);
  }
}
