import { types } from "./action-types";
import * as action from "./actions";

const initialState = {
  news: [],
  data: [],
  searchResults: [],
  newsLatest: {},
  tab: "News",
  itemsInOnePage: 6,
  pageNr: 0,
  newsLength: 0,
  bookmarks: [],
};

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case types.GET_NEWS_SUCCESS:
      return action.getNews(state, payload);
    case types.GET_TAB:
      return action.getTab(state, payload);
    case types.GET_PAGENR:
      return action.getPageNr(state, payload);
    case types.GET_SEARCH:
      return action.getSearch(state, payload);
    case types.GET_BOOKMARKS:
      return action.getBookmarks(state, payload);
    default:
      return state;
  }
};
