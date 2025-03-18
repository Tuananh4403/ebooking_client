import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
const accessTokenKey = 'access_token';

const userId = 'user_id';
const userName = 'user_name';
const roleTitle = 'role_title';
const fullName = 'full_name';

const objCookies = {
  path: '/',
  expires: 3,
};

export const saveToken = (access_token, refresh_token) => {
  if (access_token || refresh_token) {
    var token = {
      accessToken: access_token,
      refreshToken: refresh_token
    }
    Cookies.set(accessTokenKey, JSON.stringify(token), objCookies);
  } else {
    Cookies.remove(accessTokenKey, objCookies);
  }
};

export const saveUserId = (id) => {
  if (id) {
    Cookies.set(userId, id.toString(), objCookies);
  } else {
    Cookies.remove(userId, objCookies);
  }
};

export const saveUserFullName = (fullname) => {
  if (fullname) {
    Cookies.set(fullName, fullname, objCookies);
  } else {
    Cookies.remove(fullName, objCookies);
  }
};
export const saveUserName = (name) => {
  if (name) {
    Cookies.set(userName, name, objCookies);
  } else {
    Cookies.remove(userName, objCookies);
  }
};

export const saveUserRole = (roles) => {
  if (roles) {
    const dataSave = roles;
    Cookies.set(roleTitle, dataSave, objCookies);
  } else {
    Cookies.remove(roleTitle, objCookies);
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds

  return decodedToken.exp < currentTime; // Check if the token is expired
};

export const getToken = () => {
  if(Cookies.get(accessTokenKey))
  {
    return JSON.parse(Cookies.get(accessTokenKey));
  }
  return null
}

export const getUserId = () => {
  const id = Cookies.get(userId);
  return id ?? null;
};

export const getUserName = () => Cookies.get(userName);

export const getUserFullName = () => Cookies.get(fullName);

export const getUserRole = () => Cookies.get(roleTitle);