import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { dateFormattedFun } from "../../js/utils";
import Bookmarks from "../Bookmarks";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./styles.scss";

const News = ({ props, latest, bookmarks, data }) => {
  const {
    related,
    image,
    headline,
    summary,
    source,
    url,
    datetime,
    id,
  } = props;
  const [dateFormatted, setDateFormatted] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const date = new Date(datetime);
    const month = date.getMonth();
    const day = date.getDate();

    setDateFormatted(`${dateFormattedFun(day, 2, 0)} ${months[month]}`);
  }, []);

  useEffect(() => {
    if (bookmarks?.length) {
      const find = _.find(bookmarks, ["id", id]);

      find ? setActive(true) : setActive(false);
    } else {
      setActive(false);
    }
  }, [bookmarks]);

  return (
    <div
      className={classNames("news", { news__latest: latest })}
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() => !latest && window.open(url, "_blank")}
    >
      <div className="news__top">
        <div className="news__related">
          <p className="ellipsis">{related}</p>
        </div>
        {latest && <div className="news__latestMark">Latest research</div>}
      </div>
      <div className="news__bottom">
        <div className="news__headline">{headline}</div>
        <div className="news__summary ellipsis">{summary}</div>
        <div className="news__sourceItems">
          <div className="news__sourceInfo">
            {latest && (
              <div
                className="news__read"
                onClick={() => window.open(url, "_blank")}
              >
                <svg viewBox="0 0 330 330">
                  <path
                    d="M165,0C74.019,0,0,74.02,0,165.001C0,255.981,74.019,330,165,330s165-74.019,165-164.999C330,74.02,255.981,0,165,0z
		 M165,300c-74.44,0-135-60.561-135-134.999C30,90.562,90.56,30,165,30s135,60.562,135,135.001C300,239.439,239.439,300,165,300z"
                  />
                  <path
                    d="M185.606,94.395c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.857-5.858,15.355,0,21.213l34.395,34.395l-103.79,0.006
		c-8.284,0-15,6.717-14.999,15.001c0,8.284,6.717,14.999,15.001,14.999l103.784-0.006l-34.392,34.393
		c-5.858,5.857-5.858,15.355,0,21.213c2.929,2.929,6.767,4.394,10.606,4.394c3.839,0,7.678-1.465,10.606-4.394l60-60.001
		C248.42,172.793,250,168.979,250,165s-1.581-7.794-4.394-10.606L185.606,94.395z"
                  />
                </svg>

                <p>Read the research</p>
              </div>
            )}
            <p className="news__source ellipsis" title={source}>
              {source}
            </p>
            <p className="news__date">{dateFormatted}</p>
          </div>
          <Bookmarks data={props} active={active} />
        </div>
      </div>
    </div>
  );
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function mapStateToProps(rootReducer) {
  return {
    bookmarks: rootReducer.bookmarks,
    data: rootReducer.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
