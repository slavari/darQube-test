import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import News from "../News";
import Pagination from "../Pagination";

import "./styles.scss";

const BookmarksTab = ({ pageNr, bookmarks }) => {
  return (
    <React.Fragment>
      <div className="bookmarksTab container">
        {bookmarks.map((item) => {
          return <News props={item} key={item.id} />;
        })}
      </div>
    </React.Fragment>
  );
};
function mapStateToProps(rootReducer) {
  return {
    bookmarks: rootReducer.bookmarks,
    pageNr: rootReducer.pageNr,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksTab);
