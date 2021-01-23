import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getBookmarks } from "../../redux/action-creators";

import "./styles.scss";

const Bookmarks = ({ data, getBookmarks, active }) => {
  return (
    <div
      className="bookmarks"
      onClick={(e) => {
        e.stopPropagation();
        getBookmarks({ data });
      }}
    >
      {active ? (
        <svg viewBox="0 0 414.824 414.824">
          <path
            d="M317.379,0H97.951C83.322,0,71.828,11.494,71.828,26.122v373.029c0,5.747,3.135,10.971,7.837,13.584
	c2.612,1.567,5.224,2.09,7.837,2.09s5.747-0.522,8.359-2.09l111.804-69.486l111.804,68.441c4.702,3.135,10.971,3.135,15.673,0.522
	c4.702-2.612,7.837-7.837,7.837-13.584V26.122C343.502,11.494,332.008,0,317.379,0z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 512 512">
          <path
            d="M391.416,0H120.584c-17.778,0-32.242,14.464-32.242,32.242v460.413c0,7.016,3.798,13.477,9.924,16.895
c2.934,1.638,6.178,2.45,9.421,2.45c3.534,0,7.055-0.961,10.169-2.882l138.182-85.312l138.163,84.693
c5.971,3.669,13.458,3.817,19.564,0.387c6.107-3.418,9.892-9.872,9.892-16.875V32.242C423.657,14.464,409.194,0,391.416,0z
M384.967,457.453l-118.85-72.86c-6.229-3.817-14.07-3.798-20.28,0.032l-118.805,73.35V38.69h257.935V457.453z"
          />
        </svg>
      )}
    </div>
  );
};

function mapStateToProps(rootReducer) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBookmarks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
