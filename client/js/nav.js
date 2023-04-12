export function decideNavContent() {
  const navSection = document.querySelector('.nav-sect');
  const html = `
  <a href="/pages/manageAccountDetail.html"><div class="navlogin">
    <img src="/icons/account.png" alt="logo"/>
  </div></a>
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
