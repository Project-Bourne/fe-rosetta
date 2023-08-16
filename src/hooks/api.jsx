// import { API_USER_URL } from '@env';

import { loadGetInitialProps } from "next/dist/shared/lib/utils";

/**
 * Object Request Header
 */
export const requestHeader = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  "x-token": "",
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
 */

//deepsoul = "http://192.168.0.142:4040/"
//deepsoul2 = "http://192.168.88.99:4000/"
//micheals Iphone = "http://172.20.10.9:4000/api/v1/"
let API_USER_URL = "http://localhost:3060/";

export async function request(url, method, payload, token, text, form) {
  requestHeader["Content-Type"] =
    form === true ? "multipart/form-data" : "application/json";

  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then((res) => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
        // return err;
      });
  } else {
    console.log({payload, API_USER_URL, url })
    return fetch(`${API_USER_URL}` + `${url}`, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then((res) => {
        // console.log
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        // throw new Error(err);
      });
  }
}
