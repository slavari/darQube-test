import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import News from "../News";
import Pagination from "../Pagination";

import "./styles.scss";

const NewsTab = ({ news, newsLatest, pageNr, newsLength }) => {
  if (!news.length && !newsLatest.length)
    return <div className="newsTab container">Loading...</div>;

  return (
    <div className="newsTab container">
      <News latest={true} props={newsLatest} />
      <div className="newsTab__rightSide">
        {news[pageNr].map((item) => {
          return <News props={item} key={item.id} />;
        })}
        <Pagination newsLength={newsLength} />
      </div>
    </div>
  );
};
function mapStateToProps(rootReducer) {
  return {
    news: rootReducer.news,
    newsLatest: rootReducer.newsLatest,
    newsLength: rootReducer.newsLength,
    pageNr: rootReducer.pageNr,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsTab);
