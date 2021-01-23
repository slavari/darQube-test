import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import rootReducer from "./reducers";

const apiUrl = "https://finnhub.io/api/v1";

// Remove limit request
const token = "c05sh0f48v6uiu31hk30";

const client = axios.create({
  baseURL: apiUrl,
  responseType: "json",
  // withCredentials: true,
  crossDomain: true,
});

const apiClientsOptions = {
  interceptors: {
    request: [
      (res, req) => {
        req.params = { ...req.params, token };

        return req;
      },
    ],
    response: [
      {
        error: ({ getState, dispatch, getSourceAction }, error) => {
          return Promise.reject(error);
        },
      },
    ],
  },
};

const store = createStore(
  rootReducer,
  applyMiddleware(axiosMiddleware(client, apiClientsOptions))
);

export default store;
