import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likeBungleList } from "../redux/modules/BungleSlice";
//CSS
import "../styles/BottomSheet.css";
import "../styles/SearchCard.css";

import { LoadingWrap, LoadingLogo, LoadingText } from "../styles/StyledLoading";

//img
import defaultCardImg from "../assets/icon-main-default.svg";
import likeImg from "../assets/icon-like.svg";
import UnlikeImg from "../assets/icon-unlike.svg";
import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";

//icon
import IconLoadingLogo from "../assets/icon-splash-logo.svg";

function BottomSheet({ aroundLocation }) {
  // 미터 예외처리
  const distancePrint = (distance) => {
    if (distance >= 0 && distance < 1) {
      return "1";
    } else {
      return String(distance);
    }
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // 주변 위치 Bottom Sheet modal state
  const [isBottom, setIsBottom] = useState(false);

  //Detail Modal 밖 영역 클릭 시 닫기
  const handleMapModal = (e) => {
    const clicked = e.target.closest(".search-card-wrap-map");
    if (clicked) return;
    else {
      setIsBottom(false);
    }
  };

  const moreTagLikeOnClick = (postId) => {
    dispatch(likeBungleList(postId));
  };

  return (
    <>
      <div
        id="bottomSheetController"
        onClick={() => {
          setIsBottom(true);
        }}
      >
        <div id="bottomSheetControllerHeader"></div>
      </div>
      {isBottom ? (
        <>
          <div className="map-bungle-modal-wrapper">
            <div
              className="map-bungle-modal-overlay"
              onClick={(e) => {
                handleMapModal(e);
              }}
            >
              <div className="map-bungle-modal-inner">
                <div className="map-bungle-modal-header">
                  <div className="map-bungle-modal-header-divider"></div>
                </div>
                <div className="map-detail-modal-content-wrap">
                  <div className="search-result-card-wrap-map">
                    {aroundLocation && aroundLocation[0]?.postId ? (
                      <>
                        {aroundLocation.map((item, index) => {
                          return (
                            <div className="search-card-wrap-map" key={index}>
                              <div className="search-card-img">
                                {item.postUrl ? (
                                  <img
                                    className="search-card-img-thumbnail"
                                    src={item.postUrl}
                                    alt=""
                                    onClick={() => {
                                      navigate(`detailpost/${item.postId}`);
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="search-card-img-thumbnail-default-wrap"
                                    onClick={() => {
                                      navigate(`detailpost/${item.postId}`);
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
                                  src={item.isLike ? likeImg : UnlikeImg}
                                  alt=""
                                  onClick={() => {
                                    moreTagLikeOnClick(item.postId);
                                  }}
                                />
                              </div>
                              <div
                                className="search-card-desc"
                                onClick={() => {
                                  navigate(`detailpost/${item.postId}`);
                                }}
                              >
                                <div className="search-card-desc-title">
                                  {item.title}
                                </div>
                                <div className="search-card-desc-sub">
                                  {item.time}· ({item.joinCount}/
                                  {item.personnel}명)
                                </div>
                                <div className="search-card-desc-desc">
                                  <span>{item.content}</span>
                                </div>
                                <div className="search-card-desc-temp">
                                  <div style={{ color: " #898989" }}>
                                    {distancePrint(item.distance)}km
                                    {item.distance < 1 && " 내"}
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={
                                        item.avgTemp >= 50
                                          ? IconHighTemp
                                          : item.avgTemp >= 25
                                          ? IconMiddleTemp
                                          : IconLowTemp
                                      }
                                      alt=""
                                    />
                                    <span>{item.avgTemp}°C</span>
                                  </div>
                                </div>
                                <div></div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {" "}
                        <LoadingWrap>
                          <LoadingLogo src={IconLoadingLogo} />
                          <LoadingText>
                            검색한 조건의 벙글이 없습니다.
                          </LoadingText>
                        </LoadingWrap>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default BottomSheet;
