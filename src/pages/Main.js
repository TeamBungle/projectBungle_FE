import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMainBungleList,
  likeBungleList,
  moreBungleList,
  getIntervalNotification,
  LogOut,
  Withdrawal,
} from "../redux/modules/BungleSlice";

import { getCookie } from "../customapi/CustomCookie";

import Loading from "../components/Loading";

import Tag from "../components/Tag";
import Search from "../components/Search";
import Category from "../components/Category";

import {
  MainWrap,
  ContentDivide,
  MainContentWrap,
  MainContentTitle,
  MainContentItemWrap,
  MainContentItemFrame,
  MainContentItemDefalutWrap,
  MainContentItemImgDefault,
  MainContentItemImg,
  MainContentItemImgTemp,
  MainContentTextWrap,
  MainContentTitleWrap,
  MainContentItemTitle,
  MainContentItemLike,
  MainContentItemTimePeople,
  MainContentButton,
} from "../styles/StyledMain.js";

import {
  MainHeaderWrap,
  MainHeaderLogo,
  MainHeaderIconsWrap,
  IconMyLocation,
  IconSetting,
  IconNotification,
} from "../styles/StyledHeader";

// css
import "../styles/Setting.css";
import {
  FooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

import {
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButtonWrap,
  ModalCancelButton,
  ModalDeleteButton,
} from "../styles/StyledLogin";
import { MapPageTitle } from "../styles/StyledHeader";
import Divider from "../components/Divider";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
} from "../styles/StyledHeader.js";

//icons
import IconLike from "../assets/icon-like.svg";
import IconUnlike from "../assets/icon-unlike.svg";
import defaultCardImg from "../assets/icon-main-default.svg";
import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";
import IconMainLogo from "../assets/icon-main-logo.svg";

import IconMyPoint from "../assets/icon-mylocation.svg";
import Notification from "../assets/icon-notification.svg";
import NotificationOn from "../assets/icon-notification-on.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";

// Footer Icons
import IconHomeCurrent from "../assets/icon-home-current.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";

function Main() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  // ?????? call
  const interval = useRef(null);
  // ?????? state
  const NotificationState = useSelector(
    (state) => state.Bungle.isReadNotification
  );
  const [notificationState, setNotificationState] = useState(NotificationState);
  useEffect(() => {
    setNotificationState(NotificationState);
  }, [NotificationState]);

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);

  // dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();

  const realTimeList = useSelector((state) => state.Bungle.realTime);
  const endTimeList = useSelector((state) => state.Bungle.endTime);

  // ?????? ????????? ?????? ????????????
  // ????????? ????????????
  // ?????? ??????, ?????? State
  // location ?????? ??????
  const [location, setLocation] = useState();
  // ?????? ????????? ??????
  const [error, setError] = useState();
  // GPS ??????
  const options = {
    /*
    maximumAge
    : ????????? ????????? ??????????????? ?????? ????????? ??? ?????? ?????? ????????? ???????????? ?????? long ???. 
    0??? ????????? ?????? ????????? ???????????? ????????? ????????? ??? ????????? ????????? ??????????????? ????????? ???????????? ???????????? ????????? ???. 
    Infinity??? ????????? ?????? ?????? ????????? ???????????? ?????? ????????? ????????? ??????????????? ???????????? ???. ?????? ?????? 0?????????.
    timeout
    : ????????? ????????? ????????? ??? ????????? ??? ?????? ?????? ??????(?????????)??? ???????????? ?????? long ???. 
    ?????? ?????? Infinity???, ????????? ???????????? ????????? getCurrentPosition()??? ???????????? ?????? ????????? ?????????.
    enableHighAccuracy
    : ??????????????? ?????? ?????? ???????????? ???????????? ????????? ???????????? ????????? ???. true??? ???????????????, ???????????? ?????? ????????? ??? ????????? ????????? ??????. 
     ????????? ?????? ????????? ???????????? ?????? ???????????? ??????. 
     ?????? false??? ????????? ?????? ????????? ??? ????????? ???????????? ?????? ????????? ?????? ??? ?????? ?????? ???????????? ?????????. ?????? ?????? false.
    */
    enableHighAccuracy: true,
    // timeout
    timeout: 10000, // 10000
    maximumAge: 0,
  };

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Geolocation??? `getCurrentPosition` ???????????? ?????? ?????? callback ?????????
  const handleError = (error) => {
    setError(error.message);
    console.log(error.code);
    console.log(error.message);
    if (error.message === "User denied Geolocation") {
      alert("????????? ???????????? GPS ????????? ????????????");
    }
  };

  // GPS ????????? ??????, update position
  const getCurrentLocationBtnClick = () => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
    dispatch(getMainBungleList(location));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(getMainBungleList(location));
    }
  }, [location]);

  // ????????? ?????? ?????? state
  const [isRealTimeHeart, setIsRealTimeHeart] = useState([
    false,
    false,
    false,
    false,
  ]);
  // ?????? ?????? ?????? ?????? state
  const [isMannerHeart, setIsMannerHeart] = useState([
    false,
    false,
    false,
    false,
  ]);
  // ?????? ????????? ?????? state
  const [isEndTimeHeart, setIsEndTimeHeart] = useState([
    false,
    false,
    false,
    false,
  ]);

  // ????????? ?????? ?????? ??????
  const HeartRealTimeClickHanlder = (realTimeIndex, postId) => {
    setIsRealTimeHeart(
      isRealTimeHeart.map((item, Checkedindex) => {
        if (Checkedindex === realTimeIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };
  // ?????? ?????? ?????? ?????? ??????
  const HeartMannerClickHandler = (mannerIndex, postId) => {
    setIsMannerHeart(
      isMannerHeart.map((item, Checkedindex) => {
        if (Checkedindex === mannerIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };
  // ?????? ????????? ?????? ?????? ??????
  const HeartEndTimeClickHandler = (endTimeIndex, postId) => {
    setIsEndTimeHeart(
      isEndTimeHeart.map((item, Checkedindex) => {
        if (Checkedindex === endTimeIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };

  // ????????? ??????
  const MoreBtnClickHandler = (status) => {
    if (status === "realTime") {
      dispatch(moreBungleList({ status, location, navigate }));
    } else if (status === "manner") {
      // navigate("/tagsearch");
    } else {
      dispatch(moreBungleList({ status, location, navigate }));
    }
  };

  // ????????? ?????? ??????
  const showDetailBungle = (postId) => {
    navigate(`/detailpost/${postId}`);
  };

  const researchOnClickHandler = () => {
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLSdYv_eLc3Bug9ZUUe6UVcbwQJXx98qfoMw_bCKaDX9Xerut2g/viewform?usp=sf_link";
  };

  // ?????? modal state
  const [settingModal, setSettingModal] = useState(false);
  //?????? ??????
  const LogOutApi = () => {
    dispatch(LogOut({ navigate, refreshToken, token }));
  };

  //?????? ??????
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const WithdrawalApi = () => {
    localStorage.removeItem("userAgree");
    dispatch(Withdrawal({ navigate }));
  };
  //Setting Modal ??? ?????? ?????? ??? ??????
  const handleModal = (e) => {
    const clicked = e.target.closest(".setting-modal-content-wrap");
    if (clicked) return;
    else {
      setSettingModal(false);
    }
  };

  if (!location || (!realTimeList && !endTimeList)) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  return (
    <>
      <MainWrap>
        <MainHeaderWrap>
          <MainHeaderLogo src={IconMainLogo} />
          <MainHeaderIconsWrap>
            <div
              style={{
                marginLeft: "20px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => {
                researchOnClickHandler();
              }}
            >
              ???????????? ?????? Click!???
            </div>
            <IconMyLocation
              src={IconMyPoint}
              style={{ visibility: "hidden" }}
              onClick={() => {
                getCurrentLocationBtnClick();
              }}
            />
            {notificationState ? (
              <IconNotification
                src={NotificationOn}
                onClick={() => {
                  navigate("/notification");
                }}
              />
            ) : (
              <IconNotification
                src={Notification}
                onClick={() => {
                  navigate("/notification");
                }}
              />
            )}
            <IconSetting
              src={Setting}
              onClick={() => {
                setSettingModal(true);
              }}
            />
          </MainHeaderIconsWrap>
        </MainHeaderWrap>
        {settingModal && (
          <div
            className="setting-modal-wrapper"
            onClick={(e) => {
              handleModal(e);
            }}
          >
            <div className="setting-modal-inner">
              <div className="setting-modal-content-wrap">
                <div className="modal-content-wrap-setting">
                  <PostHeaderWrap>
                    <ChattingBackKey
                      src={IconBackKey}
                      style={{ visibility: "hidden" }}
                      onClick={() => {
                        setSettingModal(false);
                      }}
                    />
                    <MapPageTitle>??????</MapPageTitle>
                    <HeadrIconsWrap></HeadrIconsWrap>
                  </PostHeaderWrap>
                  <div
                    style={{
                      width: "89%",
                      display: "flex",
                      flexDirection: "column",
                      margin: "auto",
                    }}
                  >
                    <div className="mypage-selectbar-list">
                      <div
                        className="mypage-selectbar"
                        onClick={() => {
                          LogOutApi();
                        }}
                      >
                        ?????? ??????
                      </div>
                    </div>
                    <div
                      className="mypage-selectbar-list"
                      onClick={() => {
                        navigate("/termsconditions");
                      }}
                    >
                      <div className="mypage-selectbar">?????? ??????</div>
                    </div>
                    <Divider />
                    <div className="mypage-selectbar-list">
                      <div
                        className="mypage-selectbar"
                        onClick={() => {
                          setWithdrawalModal(true);
                          setSettingModal(false);
                        }}
                      >
                        ?????? ??????
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {withdrawalModal && (
          <ModalWrapper>
            <ModalOverlay>
              <ModalInner>
                <ModalContentWrap>
                  <h3>?????? ??????</h3>
                  <div style={{ fontSize: "14px" }}>
                    ??????{" "}
                    <span
                      style={{
                        color: "red",
                        margin: "0px 3px 0px 3px",
                        fontWeight: "bold",
                      }}
                    >
                      ??????
                    </span>{" "}
                    ???????????????????
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    ?????? ???
                    <span
                      style={{
                        color: "red",
                        margin: "0px 3px 0px 3px",
                        fontWeight: "bold",
                      }}
                    >
                      2??? ??????
                    </span>{" "}
                    ???????????? ??? ????????????.
                  </div>
                </ModalContentWrap>
                <ModalDivider />
                <ModalButtonWrap>
                  <ModalCancelButton
                    onClick={() => {
                      setWithdrawalModal(false);
                    }}
                  >
                    ??????
                  </ModalCancelButton>
                  <ModalDeleteButton
                    onClick={() => {
                      WithdrawalApi();
                    }}
                  >
                    ??????
                  </ModalDeleteButton>
                </ModalButtonWrap>
              </ModalInner>
            </ModalOverlay>
          </ModalWrapper>
        )}
        {/* <Tag /> ?????? ?????? ??????*/}
        <Search location={location} />
        <Category location={location} />
        <ContentDivide />
        {/* ????????? ?????? */}
        <MainContentWrap>
          <MainContentTitle>????????? ??????</MainContentTitle>
          <MainContentItemWrap>
            {realTimeList.map((item, index) => {
              return (
                <MainContentItemFrame key={index}>
                  {item.postUrl ? (
                    <MainContentItemImg
                      src={item.postUrl}
                      onClick={() => {
                        showDetailBungle(item.postId);
                      }}
                    />
                  ) : (
                    <MainContentItemDefalutWrap style={{ marginBottom: "7px" }}>
                      <MainContentItemImgDefault
                        src={defaultCardImg}
                        onClick={() => {
                          showDetailBungle(item.postId);
                        }}
                      />
                    </MainContentItemDefalutWrap>
                  )}
                  <MainContentItemImgTemp
                    src={
                      item.avgTemp >= 50
                        ? IconHighTemp
                        : item.avgTemp >= 25
                        ? IconMiddleTemp
                        : IconLowTemp
                    }
                  />
                  <MainContentTextWrap>
                    <MainContentTitleWrap>
                      <MainContentItemTitle
                        onClick={() => {
                          showDetailBungle(item.postId);
                        }}
                      >
                        {item.title}
                      </MainContentItemTitle>
                      <MainContentItemLike
                        src={item.isLike ? IconLike : IconUnlike}
                        onClick={() =>
                          HeartRealTimeClickHanlder(index, item.postId)
                        }
                      />
                    </MainContentTitleWrap>
                    <MainContentItemTimePeople>
                      {item.time} ({item.joinCount}/{item.personnel})
                    </MainContentItemTimePeople>
                  </MainContentTextWrap>
                </MainContentItemFrame>
              );
            })}
          </MainContentItemWrap>
          <MainContentButton onClick={() => MoreBtnClickHandler("realTime")}>
            ?????????
          </MainContentButton>
        </MainContentWrap>
        {/* ?????? ????????? ?????? ?????? */}
        {/* <MainContentWrap>
        <MainContentTitle>?????? ????????? ?????? ??????</MainContentTitle>
        <MainContentItemWrap>
          {ContentArray.map((item, index) => {
            return (
              <MainContentItemFrame key={index}>
                <MainContentItemImg />
                <MainContentItemImgTemp src={IconTemp} />
                <MainContentTextWrap>
                  <MainContentTitleWrap>
                    <MainContentItemTitle>{item}</MainContentItemTitle>
                    <MainContentItemLike src={ isMannerHeart[ index ] ? IconLike : IconUnlike} onClick={ () => { HeartMannerClickHandler( index ) }}/>
                  </MainContentTitleWrap>
                  <MainContentItemTimePeople>
                    16??? ?????? ?????? (0/5)
                  </MainContentItemTimePeople>
                </MainContentTextWrap>
              </MainContentItemFrame>
            );
          })}
        </MainContentItemWrap>
        <MainContentButton onClick={ () => { MoreBtnClickHandler( "manner" ) } }>?????????</MainContentButton>
      </MainContentWrap> */}
        {/* ?????? ????????? ?????? */}
        <MainContentWrap>
          <MainContentTitle>?????? ????????? ??????</MainContentTitle>
          <MainContentItemWrap>
            {endTimeList.map((item, index) => {
              return (
                <MainContentItemFrame key={index}>
                  {item.postUrl ? (
                    <MainContentItemImg
                      src={item.postUrl}
                      onClick={() => {
                        showDetailBungle(item.postId);
                      }}
                    />
                  ) : (
                    <MainContentItemDefalutWrap style={{ marginBottom: "7px" }}>
                      <MainContentItemImgDefault
                        src={defaultCardImg}
                        onClick={() => {
                          showDetailBungle(item.postId);
                        }}
                      />
                    </MainContentItemDefalutWrap>
                  )}
                  <MainContentItemImgTemp
                    src={
                      item.avgTemp >= 50
                        ? IconHighTemp
                        : item.avgTemp >= 25
                        ? IconMiddleTemp
                        : IconLowTemp
                    }
                  />
                  <MainContentTextWrap>
                    <MainContentTitleWrap>
                      <MainContentItemTitle
                        onClick={() => {
                          showDetailBungle(item.postId);
                        }}
                      >
                        {item.title}
                      </MainContentItemTitle>
                      <MainContentItemLike
                        src={item.isLike ? IconLike : IconUnlike}
                        onClick={() => {
                          HeartEndTimeClickHandler(index, item.postId);
                        }}
                      />
                    </MainContentTitleWrap>
                    <MainContentItemTimePeople>
                      {item.time} ({item.joinCount}/{item.personnel})
                    </MainContentItemTimePeople>
                  </MainContentTextWrap>
                </MainContentItemFrame>
              );
            })}
          </MainContentItemWrap>
          <MainContentButton
            onClick={() => {
              MoreBtnClickHandler("endTime");
            }}
          >
            ?????????
          </MainContentButton>
        </MainContentWrap>
        <FooterWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/main");
            }}
          >
            <FooterIconImg src={IconHomeCurrent} />
            <FooterIconText style={{ color: "#FFC632" }}>???</FooterIconText>
          </FooterIconWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/map");
            }}
          >
            <FooterIconImg src={IconLocation} />
            <FooterIconText>????????????</FooterIconText>
          </FooterIconWrap>
          {ownerCheck ? (
            <FooterAddBungae
              src={IconEdit}
              onClick={() => {
                navigate("/editpost");
              }}
            />
          ) : (
            <FooterAddBungae
              src={IconCreate}
              onClick={() => {
                navigate("/createpost");
              }}
            />
          )}
          <FooterIconWrap>
            <FooterIconImg
              src={IconChat}
              onClick={() => {
                navigate("/chatlist");
              }}
            />
            <FooterIconText>??????</FooterIconText>
          </FooterIconWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <FooterIconImg src={IconMyBungae} />
              <FooterIconText>?????? ??????</FooterIconText>
            </div>
          </FooterIconWrap>
        </FooterWrap>
      </MainWrap>
      {/* )} */}
    </>
  );
}
// }

export default Main;
