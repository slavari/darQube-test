import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getPageNr } from "../../redux/action-creators";

import "./styles.scss";

const Pagination = ({ newsLength, pageNr, getPageNr, itemsInOnePage }) => {
  const [itemsNr, setItemsNr] = useState(pageNr);

  const goToThePage = (e, page) => {
    e.preventDefault();

    getPageNr({ page: page ? pageNr + 1 : pageNr - 1 });
    setItemsNr(page ? itemsNr + itemsInOnePage : itemsNr - itemsInOnePage);
  };

  return (
    <div className="pagination container">
      <div className="pagination__number">
        <p>
          {itemsNr + 1}-{itemsNr + itemsInOnePage}{" "}
          <span>out of {newsLength || 0}</span>
        </p>
      </div>
      <div>
        <button
          onClick={(e) => goToThePage(e, false)}
          className="pagination__button"
        >
          Previous
        </button>
        <button
          onClick={(e) => goToThePage(e, true)}
          className="pagination__button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(rootReducer) {
  return {
    pageNr: rootReducer.pageNr,
    itemsInOnePage: rootReducer.itemsInOnePage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPageNr }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
