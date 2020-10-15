const request = require('request');
require('dotenv').config();

const browseUrl = process.env.HERE_PLACES_BROWSE_API_URL;
const lookupUrl = process.env.HERE_PLACES_LOOKUP_API_URL;
const apiKey = process.env.HERE_PLACES_API_KEY;
const category = process.env.HERE_PLACES_HOTEL_CAT;

const doRequest = async (url) => {
  return new Promise((resolve, reject) => {
    request({uri: url, json: true}, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        console.error(JSON.stringify(res.body));
        reject({status: res.statusCode, message: "Api provider error."});
      }
    });
  });
}

const makeRequest = async (url) => {
  const response = await doRequest(url);
  return Promise.resolve(response);
};

const findProperties = async (lat, lon) => {
  const {items} = await makeRequest(`${browseUrl}?at=${lat},${lon}&apiKey=${apiKey}&categories=${category}`);
  return Promise.resolve(items);
};

const find = async id => {
  return await makeRequest(`${lookupUrl}?id=${id}&apiKey=${apiKey}`);
};

module.exports = {
  findProperties,
  find,
};
