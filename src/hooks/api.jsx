// import { API_USER_URL } from '@env';

/**
 * Object Request Header
 */
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
let access = '';
if (typeof window !== 'undefined') {
  access = cookies.get('deep-access');
}
export const requestHeader = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'deep-token': access
};

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 *
 */

import { getApiUrl } from '@/utils/config';

// Update API URLs to use the config utility
let API_USER_URL = getApiUrl('translator');
let API_USER_URL2 = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/80/`;

export async function request(url, method, payload, token, text, form) {
  requestHeader['Content-Type'] =
    form === true ? 'multipart/form-data' : 'application/json'

  requestHeader['deep-token'] = access || cookies.get('deep-access');

  console.log(requestHeader);

  if (method === 'GET') {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then(res => {
        if (res.status === 403) {
          // Clear the cookie
          cookies.remove('deep-access');
          cookies.remove('uuid');
          localStorage.clear();
          // Redirect to the login page
          // window.location.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);
          return 'Access forbidden. Redirecting to login page.';
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch(err => {
        console.error(`Request Error ${url}: `, err);
        return err;
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload)
    })
      .then(res => {
        if (res.status === 403) {
          // Clear the cookie
          cookies.remove('deep-access');
          cookies.remove('uuid');
          localStorage.clear();
          // Redirect to the login page
          // window.location.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);
          return 'Access forbidden. Redirecting to login page.';
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch(err => {
        console.error(`Request Error ${url}:`, err);
        return err;
      });
  }
}

export async function request2(url, method, payload, token, text, form) {
  if (form === true) {
    requestHeader['Content-Type'] = 'multipart/form-data';
  } else {
    requestHeader['Content-Type'] = 'application/json';
  }

  requestHeader['deep-token'] = access || cookies.get('deep-access');

  if (method === 'GET') {
    return fetch(API_USER_URL2 + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then(res => {
        if (res.status === 403) {
          // Clear the cookie
          cookies.remove('deep-access');
          cookies.remove('uuid');
          localStorage.clear();
          // Redirect to the login page
          // window.location.replace('http://192.81.213.226:30/auth/login');
          // window.location.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);
          return 'Access forbidden. Redirecting to login page.';
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch(err => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
      });
  } else {
    return fetch(API_USER_URL2 + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload)
    })
      .then(res => {
        if (res.status === 403) {
          // Clear the cookie
          cookies.remove('deep-access');
          cookies.remove('uuid');
          localStorage.clear();
          // Redirect to the login page
          //  window.location.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);
          return 'Access forbidden. Redirecting to login page.';
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch(err => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
      });
  }
}