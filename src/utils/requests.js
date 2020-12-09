const axios = require("axios");
export const APIURL = "https://api.thecatapi.com";
export const getPhotos = () => axios.get(`${APIURL}/v1/images`, {headers: { "Content-Type": "multipart/form-data", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f"}})
export const getVotes = () => axios.get(`${APIURL}/v1/votes`, {headers: { "Content-Type": "application/json", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f"}})

export const addPhoto = data =>
  axios({
    method: "post",
    url: `${APIURL}/v1/images/upload`,
    data,
    headers: { "Content-Type": "multipart/form-data", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f"}
  });
export const editPhoto = data =>
  axios({
    method: "put",
    url: `${APIURL}/photos/edit`,
    data,
        headers: { "Content-Type": "multipart/form-data", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f" }
  });

  export const favourite = data =>
  axios({
    method: "post",
    url: `${APIURL}/v1/favourite`,
    data,
    headers: { "Content-Type": "application/json", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f"}
  });

  export const unfavourite = data =>
  axios({
    method: "post",
    url: `${APIURL}/v1/unfavourite`,
    data,
        headers: { "Content-Type": "application/json", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f" }
  });
export const deletePhoto = id => axios.delete(`${APIURL}/photos/delete/${id}`);