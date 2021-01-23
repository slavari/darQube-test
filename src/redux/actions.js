import update from "immutability-helper";
import _ from "lodash";

export const getNews = (state, { data }) => {
  // First version sort
  const filterData = _.sortBy(data, "datetime");

  // Second version sort

  // let filterData = [];
  // filterData = data.sort(function (a, b) {
  //   if (a.datetime > b.datetime) {
  //     return 1;
  //   }
  //   if (a.datetime < b.datetime) {
  //     return -1;
  //   }
  //   return 0;
  // });
  let news = [];
  let newsLatest = {};

  filterData.forEach((item, i, array) => {
    if (array.length - 1 === i) {
      newsLatest = item;
    } else {
      if (
        news[news.length - 1]?.length == state.itemsInOnePage ||
        !news.length
      ) {
        news.push([]);
      }

      news[news.length - 1]?.push(item);
      return news;
    }
  });

  return update(state, {
    data: { $set: filterData },
    news: { $set: news },
    newsLatest: { $set: newsLatest },
    newsLength: { $set: filterData.length - 1 },
  });
};

export const getTab = (state, { data }) => {
  return update(state, { tab: { $set: data } });
};

export const getPageNr = (state, { page }) => {
  return update(state, { pageNr: { $set: page } });
};

export const getSearch = (state, { data }) => {
  let searchResults = [];

  data.forEach((item, i) => {
    if (
      searchResults[searchResults.length - 1]?.length == state.itemsInOnePage ||
      !searchResults.length
    ) {
      searchResults.push([]);
    }

    searchResults[searchResults.length - 1]?.push(item);
    return searchResults;
  });

  return update(state, { searchResults: { $set: searchResults } });
};
export const getBookmarks = (state, { data }) => {
  if (!state.data.length) return state;
  let filterById = [];

  if (state.bookmarks.length) {
    filterById = _.remove(state.bookmarks, ["id", data.id]);
  }

  return update(state, {
    bookmarks: {
      $set: filterById?.length
        ? [...state.bookmarks]
        : [...state.bookmarks, data],
    },
  });
};
