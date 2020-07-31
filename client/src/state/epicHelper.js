import { ajax } from "rxjs/ajax";

// Default content type of our data
const CONTENT_TYPE = "application/x-www-form-urlencoded";

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
const xhr = (method, url, body = null, contentType = CONTENT_TYPE) => {
  const options = {
    body,
    method,
    responseType: "json",
    url: `http://localhost:3102${url}`,
  };

  // Adding this so we can allow for undefined contentType to trigger default behavior
  // We will need this for avatars and any other file uploads later.
  if (contentType) {
    options.headers["Content-Type"] = contentType;
  }

  return ajax(options);
};

export default xhr;
