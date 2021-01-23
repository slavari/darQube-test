import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from "../Pagination";
import News from "../News";

import "./styles.scss";

const SearchResults = ({ searchResults, pageNr }) => {
  return (
    <React.Fragment>
      <div className="searchResults container">
        {searchResults[pageNr].map((item) => {
          return <News props={item} key={item.id} />;
        })}
      </div>
      <Pagination newsLength={searchResults.length} />
    </React.Fragment>
  );
};

function mapStateToProps(rootReducer) {
  return {
    searchResults: rootReducer.searchResults,
    pageNr: rootReducer.pageNr,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
