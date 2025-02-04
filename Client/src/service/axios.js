import React from 'react';
import axios from 'axios';
import ErrorSnackbar from '../components/molecules/customsnackbar/errorSnackbar';

let navigateFunction;
let enqueueSnackbarFunction;

export const setNavigateFunction = (navigate) => {
  navigateFunction = navigate;
};
export const setEnqueueSnackbarFunction = (enqueueSnackbar) => {
  enqueueSnackbarFunction = enqueueSnackbar;
};

const Api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials:true
});

Api.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    console.log('ERROR IN');
    console.log(err);
    return Promise.reject(err);
  }
);

Api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {

    if (!err.response) {
      console.error('Network error:', err);
      if (enqueueSnackbarFunction) {
        enqueueSnackbarFunction('Network error', {
          variant: 'error',
          content: (key, message) =>
            React.createElement(ErrorSnackbar, {
              id: key,
              message: message,
              allowDownload: true,
            }),
        });
      }
    } else if (err.response.status === 500) {
      enqueueSnackbarFunction("500 server error", {
        variant: "error",
        content: (key, message) =>
          React.createElement(ErrorSnackbar, {
            id: key,
            message: message,
            allowDownload: true,
          }),
      });
    }
    if (err?.response?.status === 401) {
      navigateFunction('/auth');
    }
    return Promise.reject(err);
  }
);

export default Api;
