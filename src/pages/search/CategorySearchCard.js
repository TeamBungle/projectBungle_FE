import React from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { likeBungleList } from "../../redux/modules/BungleSlice";

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

function CategorySearchCard(props) {
  const { categoryList } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryListLikeClick = (postId) => {
    dispatch(likeBungleList(postId));
  };

  // 게시물 상세 조회
  const showDetailBungle = (postId) => {
    navigate(`/detailpost/${postId}`);
  };

  // 미터 예외처리
  const distancePrint = (distance) => {
    if (distance >= 0 && distance < 1) {
      return "1";
    } else {
      return String(distance);
    }
  };

  return (
    <>
      {categoryList && (
        <div className="search-card-wrap-map">
          <div className="search-card-img">
            {categoryList.postUrl ? (
              <img
                className="search-card-img-thumbnail"
                src={categoryList.postUrl}
                alt=""
                onClick={() => {
                  showDetailBungle(categoryList.postId);
                }}
              />
            ) : (
              <div
                className="search-card-img-thumbnail-default-wrap"
                onClick={() => {
                  showDetailBungle(categoryList.postId);
                }}
              >
                <img
                  className="search-card-img-thumbnail-default"
                  src={defaultCardImg}
                  alt=""
                />
              </div>
            )}
            <img
              className="search-card-img-like"
              src={categoryList.isLike ? likeImg : UnlikeImg}
              alt=""
              onClick={() => {
                categoryListLikeClick(categoryList.postId);
              }}
            />
          </div>
          <div
            className="search-card-desc"
            onClick={() => {
              showDetailBungle(categoryList.postId);
            }}
          >
            <div className="search-card-desc-title">{categoryList.title}</div>
            <div className="search-card-desc-sub">
              {categoryList.time}· ({categoryList.joinCount}/
              {categoryList.personnel}명)
            </div>
            <div className="search-card-desc-desc">
              <span>{categoryList.content}</span>
            </div>

            <div className="search-card-desc-temp">
              <div style={{ color: " #898989" }}>
                {distancePrint(categoryList.distance)}km
                {categoryList.distance < 1 && " 내"}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    categoryList.avgTemp >= 50
                      ? IconHighTemp
                      : categoryList.avgTemp >= 25
                      ? IconMiddleTemp
                      : IconLowTemp
                  }
                  alt=""
                />
                <span>{categoryList.avgTemp}°C</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategorySearchCard;
