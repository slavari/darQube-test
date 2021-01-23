import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PropTypes } from "prop-types";

import Header from "../Header";
import NewsTab from "../NewsTab";
import SearchResults from "../SearchResults";

import "./styles.scss";

import { getNews } from "../../redux/action-creators";
import BookmarksTab from "../BookmarksTab";

class App extends Component {
  state = {
    results: [],
  };

  componentDidMount() {
    const { getNews } = this.props;

    getNews({ symbol: "AAPL", from: "2020-01-01" });
  }

  getContent = () => {
    const { tab, searchResults } = this.props;

    if (searchResults.length) {
      return <SearchResults />;
    } else {
      switch (tab) {
        case "Bookmarks":
          return <BookmarksTab />;
        case "News":
          return <NewsTab />;
        default:
          return <NewsTab />;
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="main">{this.getContent()}</div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  news: PropTypes.array.isRequired,
  searchResults: PropTypes.array,
  tab: PropTypes.string,
};

function mapStateToProps(rootReducer) {
  return {
    news: rootReducer.news,
    tab: rootReducer.tab,
    searchResults: rootReducer.searchResults,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
