import React, { useState, useEffect } from "react";
import classNames from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTab, getSearch, getPageNr } from "../../redux/action-creators";

import "./styles.scss";

const Header = ({ data, getTab, tab, getSearch, getPageNr, searchResults }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (searchResults.length && !text) {
      getSearch({ data: [] });
      getPageNr({ page: 0 });
    }
  }, [searchResults, text]);

  const search = (e) => {
    setText(e);
    let filter = [];

    if (e.length >= 2) {
      filter = _.filter(data, (o) => {
        if (o.headline.toLowerCase().indexOf(e.toLowerCase()) !== -1)
          return true;
        if (o.summary.toLowerCase().indexOf(e.toLowerCase()) !== -1)
          return true;
      });
    }

    if (filter.length) {
      getPageNr({ page: 0 });
      getSearch({ data: filter });
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__menu">
          {tabs.map((item, i) => {
            return (
              <button
                className={classNames("header__menuItem", {
                  header__menuItem_active: tab === item,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  tab !== item && getTab({ data: item });
                  setText("");
                }}
                key={i}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="header__search">
          <div
            className="header__searchIcon"
            // if need search only after click on searchIcon
            // onClick={() => search(text)}
          >
            <svg viewBox="0 0 515.558 515.558">
              <path d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z" />
            </svg>
          </div>
          <input
            type="text"
            className="header__searchInput"
            placeholder="Search"
            value={text}
            onChange={(e) => search(e.target.value)}
            // if need search only after press Enter

            // onChange={(e) => setText(e.target.value)}
            // onKeyDown={(e) => {
            //   !!e.target.value && e.key === "Enter" && search(text);
            // }}
          />
        </div>
      </div>
    </div>
  );
};

const tabs = ["News", "Bookmarks"];

function mapStateToProps(rootReducer) {
  return {
    data: rootReducer.data,
    tab: rootReducer.tab,
    searchResults: rootReducer.searchResults,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTab, getSearch, getPageNr }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
