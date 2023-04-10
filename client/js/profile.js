import jwt_decode from 'jwt-decode';

export default function getLoggedInUser() {
  const token = localStorage.getItem('token');

  const decoded = jwt_decode(token);
  const user = decoded.user;
  return user;
}
