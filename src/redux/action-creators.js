import { types } from "./action-types";
import { routes } from "./routes";
import axios from "axios";

const Cancel = axios.Cancel;
let cancel;

export const getNews = (params) => {
    return {
      type: types.GET_NEWS,
      payload: {
        request: {
          url: routes.GET_NEWS,
          method: "GET",
          params,
        },
      },
    };
  },
  getTab = ({ data }) => {
    return {
      type: types.GET_TAB,
      payload: {
        data,
      },
    };
  },
  getPageNr = ({ page }) => {
    return {
      type: types.GET_PAGENR,
      payload: {
        page,
      },
    };
  },
  getSearch = ({ data }) => {
    return {
      type: types.GET_SEARCH,
      payload: {
        data,
      },
    };
  },
  getBookmarks = ({ data }) => {
    return {
      type: types.GET_BOOKMARKS,
      payload: {
        data,
      },
    };
  };
