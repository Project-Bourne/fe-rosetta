// import { API_USER_URL } from '@env';

import { loadGetInitialProps } from "next/dist/shared/lib/utils";

/**
 * Object Request Header
 */
export const requestHeader = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  "deep-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkNjA0OTUzLTk0YzAtNGYzOC05N2I3LWFlYWEyYWI5YjRjMCIsInJvbGUiOiIxIiwiaWF0IjoxNjkzMjE2MTM1LCJleHAiOjE2OTMzMDI1MzV9.nqb9ArDYCXRfpF1IHGGvf0DEGieTYT__FwuJK_1FwRY',
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

let API_USER_URL = "http://192.81.213.226:83/";

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
        return err
        // throw new Error(err);
      });
  }
}
