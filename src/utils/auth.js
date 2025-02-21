import Cookies from 'js-cookie';
import { COOKIE_DOMAIN } from '../constants/global';

const accessTokenKey = 'access_token';
const userId = 'user_id';
const userName = 'user_name';
const roleTitle = "role_title";

const objCookies = {
    path  : "/",
    expires : 365,
    domain: COOKIE_DOMAIN
};

export const saveToken = (access_token) => {
  if(access_token){
    Cookies.set(accessTokenKey, access_token, {
      ...objCookies,
    });
  } else{
    Cookies.remove(accessTokenKey, {
      ...objCookies,
      path: "/",
      domain: COOKIE_DOMAIN,
    });
  }
};

export const saveUserId = (id) =>{
  if(id){
    Cookies.set(userId, id.toString(), {
      ...objCookies,
    });
  } else {
    Cookies.remove(userId, {
      ...objCookies,
      path: "/",
      domain: COOKIE_DOMAIN,
    });
  }
};

export const saveUserName = (name) => {
  if(name){
    Cookies.set(userName, name, {
      ...objCookies,
    });
  } else { 
    Cookies.remove(userName, {
      ...objCookies,
      path: "/",
      domain: COOKIE_DOMAIN,
    })
  };
};
export const saveUserRole = (roles) => {
  if(roles){
    var dataSave = [];
    console.log(roles)
    roles.forEach(role => {
      dataSave.push(role.name);
      
    });
    Cookies.set(roleTitle, dataSave, {
      ...objCookies,
    });
  } else { 
    Cookies.remove(roleTitle, {
      ...objCookies,
      path: "/",
      domain: COOKIE_DOMAIN,
    })
  };
};
export const getToken = () => {
  const access_token = Cookies.get(accessTokenKey);
  return access_token;
};

export const getUserId = () => {
  const id = Cookies.get(userId);
  return id ? parseInt(userId, 10) : null;
};

export const getUserName = () => {
  const name = Cookies.get(userName);
  return name;
};

export const getUserRole = () => {
  const role = Cookies.get(roleTitle);
  return role
}
