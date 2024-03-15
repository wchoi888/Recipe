// auth.js
const secret = 'secretkey'; 
const expiration = '8h';

export const setToken = (token) => {
  // Store the token in localStorage or a similar persistent store
  localStorage.setItem('jwtToken', token);
};

export const getToken = () => {
  // Retrieve the token from localStorage
  return localStorage.getItem('jwtToken');
};

export const decodeToken = () => {
  // Decode the token to get user data
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    // Decode token and return user data
    const decoded = jwt.decode(token, secret);
    return decoded;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

export const isLoggedIn = () => {
  // Check if the user is logged in
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.decode(token, secret);
    const now = Date.now().valueOf() / 1000;
    // Check if the token has expired
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      console.warn('Access token has expired, logging out');
      logout();
      return false;
    }
    return true;
  } catch (e) {
    console.error('Error checking token validity:', e);
    return false;
  }
};

export const logout = () => {
  // Clear the token from localStorage
  localStorage.removeItem('jwtToken');
};

import jwt from 'jwt-decode';
