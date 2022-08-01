import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { likeBungleList } from "../../redux/modules/BungleSlice";

//swipe-list
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
//CSS
import "../../styles/SearchCard.css";
import "react-swipeable-list/dist/styles.css";

//img
import defaultCardImg from "../../assets/icon-main-default.svg";
import likeImg from "../../assets/icon-like.svg";
import UnlikeImg from "../../assets/icon-unlike.svg";
import IconHighTemp from "../../assets/icon-manner-high.svg";
import IconMiddleTemp from "../../assets/icon-manner-middle.svg";
import IconLowTemp from "../../assets/icon-manner-low.svg";

function TagSearchCard(props) {
  const { moreList } = props;
  // 미터 예외처리
  const distancePrint = (distance) => {
    if (distance >= 0 && distance < 1) {
      return "1";
    } else {
      return String(distance);
    }
  };

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (isLoad) {
      setTimeout(() => {
        setIsLoad(false);
      }, 200);
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log( myLikeList );

  const moreTagLikeOnClick = (postId) => {
    // console.log(postId);
    dispatch(likeBungleList(postId));
  };

  // 게시물 상세 조회
  const showDetailBungle = (postId) => {
    navigate(`/detailpost/${postId}`);
  };
  return (
    <div className="search-card-wrap-map">
      <div className="search-card-img">
        {moreList.postUrl ? (
          <img
            className="search-card-img-thumbnail"
            src={moreList.postUrl}
            alt=""
            onClick={() => {
              showDetailBungle(moreList.postId);
            }}
          />
        ) : (
          <div
            className="search-card-img-thumbnail-default-wrap"
            onClick={() => {
              showDetailBungle(moreList.postId);
            }}
          >
            <img
              className="search-card-img-thumbnail-default"
              src={defaultCardImg}
              alt=""
            />
          </div>
        )}
        {/* {console.log(moreList.postId)} */}
        <img
          className="search-card-img-like"
          src={moreList.isLike ? likeImg : UnlikeImg}
          alt=""
          onClick={() => {
            moreTagLikeOnClick(moreList.postId);
          }}
        />
      </div>
      <div
        className="search-card-desc"
        onClick={() => {
          showDetailBungle(moreList.postId);
        }}
      >
        <div className="search-card-desc-title">{moreList.title}</div>
        <div className="search-card-desc-sub">
          {moreList.time}· ({moreList.joinCount}/{moreList.personnel}명)
        </div>
        <div className="search-card-desc-desc">
          <span>{moreList.content}</span>
        </div>
        <div className="search-card-desc-temp">
          <div style={{ color: " #898989" }}>
            {distancePrint(moreList.distance)}km{moreList.distance < 1 && " 내"}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                moreList.avgTemp >= 50
                  ? IconHighTemp
                  : moreList.avgTemp >= 25
                  ? IconMiddleTemp
                  : IconLowTemp
              }
              alt=""
            />
            <span>{moreList.avgTemp}°C</span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default TagSearchCard;
