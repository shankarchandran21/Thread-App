import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";


const API = axios.create({
    baseURL:"https://api.themoviedb.org"
})

API.interceptors.request.use(
  (request) => {
      request.headers['accept'] = 'application/json';
      request.headers["Authorization"] = `Bearer ${ENV_VARS.TMDB_API_KEY}`;
      return request;
  },
  (error) => {
      return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log('got response');
    return response;
  },
  (error) => {

    console.log(error.response);
    if (error.response.status === 404) {
      // do something
      console.log('NOT FOUND');
    }
    return Promise.reject(error);
  }
)

export default API