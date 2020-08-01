import { ajax } from "rxjs/ajax";

// NOTE: If we are hosting this on a site then the url in the options object will need to change

/**
 * Helper method to augment the XMLHttpRequest (xhr) RxJS call
 *
 * @param {String} method - The method of the http request (POST, GET, PUT, DELETE)
 * @param {String} url - The URL (without host/port prefix) of the request
 * @param {Object} body - Optional payload
 * @param {String} contentType - Optional content-type override
 *
 * @returns {Observable}
 */
const xhr = (method, url, body = null, creds = false) => {
  const options = {
    body,
    method,
    headers: {
      withCredentials: creds,
    },
    responseType: "json",
    url: `http://localhost:5000${url}`,
  };

  return ajax(options);
};

export default xhr;
