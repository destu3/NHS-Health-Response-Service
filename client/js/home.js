export const determineHref = () => {
  if (
    location.pathname.includes('home') ||
    location.pathname.includes('login') ||
    location.pathname.includes('signup')
  ) {
    let link;
    if (localStorage.getItem('token')) {
      link = '/pages/home.html';
    } else {
      link = '/';
    }

    const el = document.querySelector('.nav-sect > a');
    el.href = link;
  }
};
