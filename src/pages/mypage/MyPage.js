import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  getUserProfile,
  myLikeBungleList,
  getIntervalNotification,
  LogOut,
  Withdrawal,
} from "../../redux/modules/BungleSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getCookie } from "../../customapi/CustomCookie";
// Library

//CSS
import "../../styles/MyPage.css";
//Components
import Divider from "../../components/Divider";

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
  ModalButton,
} from "../../styles/StyledLogin";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
} from "../../styles/StyledHeader.js";

// Header css
import {
  MapHeaderWrap,
  MapPageTitle,
  MapIconsWrap,
  IconNotification,
  IconSetting,
} from "../../styles/StyledHeader.js";
// Footer css
import {
  MapFooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../../styles/StyledFooter.js";

//img
import defaultImg from "../../assets/icon-main-default.svg";
import lighteningImg from "../../assets/icon-lightening.svg";

import Setting from "../../assets/icon-setting.svg";
import Notification from "../../assets/icon-notification.svg";
import NotificationOn from "../../assets/icon-notification-on.svg";
import IconHome from "../../assets/icon-home.svg";
import IconLocation from "../../assets/icon-location.svg";
import IconChat from "../../assets/icon-chat.svg";
import IconMyBungleCurrent from "../../assets/icon-mybungle-current.svg";
import IconCreate from "../../assets/icon-create-post.svg";
import IconEdit from "../../assets/icon-edit-footer.svg";
import IconHighTemp from "../../assets/icon-manner-high.svg";
import IconMiddleTemp from "../../assets/icon-manner-middle.svg";
import IconLowTemp from "../../assets/icon-manner-low.svg";
import IconBackKey from "../../assets/icon-left-arrow.svg";

function MyPage() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  const isOwner = useSelector((state) => state.Bungle.isOwner);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(true);
  const userProfileInfo = useSelector((state) => state.Bungle.userProfile);

  // modal state
  const [isModal, setIsModal] = useState(false);
  // modal message
  const [modalMessage, setModalMessage] = useState("????????? ?????? ????????????.");

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

  const myLikeBungleClickHandler = () => {
    dispatch(myLikeBungleList());
    navigate("/mylikebung");
  };

  useEffect(() => {
    if (isLoad) {
      dispatch(getUserProfile());
      setTimeout(() => {
        setIsLoad(false);
      }, 150);
    }
  }, []);
  // ?????? interval
  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  // ?????? modal state
  const [settingModal, setSettingModal] = useState(false);
  //?????? ??????
  const LogOutApi = () => {
    dispatch(LogOut({ navigate, refreshToken, token }));
  };

  //?????? ??????
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const WithdrawalApi = () => {
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

  return (
    <>
      {!isLoad && (
        <div className="top-mypage-wrap">
          {isModal && (
            <ModalWrapper>
              <ModalOverlay>
                <ModalInner>
                  <ModalContentWrap>
                    <h3>????????? ?????? ???</h3>
                    <div>{modalMessage}</div>
                  </ModalContentWrap>
                  <ModalDivider />
                  <ModalButton
                    onClick={() => {
                      setIsModal(false);
                    }}
                  >
                    ??????
                  </ModalButton>
                </ModalInner>
              </ModalOverlay>
            </ModalWrapper>
          )}
          <MapHeaderWrap>
            <MapIconsWrap>
              <IconNotification
                style={{ visibility: "hidden" }}
                src={Notification}
              />
              <IconSetting style={{ visibility: "hidden" }} src={Setting} />
            </MapIconsWrap>
            <MapPageTitle>?????? ??????</MapPageTitle>
            <MapIconsWrap>
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
                onClick={() => {
                  setSettingModal(true);
                }}
                src={Setting}
              />
            </MapIconsWrap>
          </MapHeaderWrap>
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
                      <HeadrIconsWrap>
                      </HeadrIconsWrap>
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
          <div className="mypage-content-wrap">
            <div className="mypage-profile-main">
              <div className="mypage-profile-img">
                <img
                  style={{ objectFit: "cover" }}
                  src={
                    userProfileInfo.profileUrl
                      ? userProfileInfo.profileUrl
                      : defaultImg
                  }
                  alt=""
                />
              </div>
              <div className="mypage-profile-content">
                <div className="mypage-profile-title">
                  {userProfileInfo.nickName
                    ? userProfileInfo.nickName
                    : "?????????"}
                </div>
                <div className="mypage-profile-desc">
                  {userProfileInfo.intro
                    ? userProfileInfo.intro
                    : "??????????????? ??????????????????."}
                </div>
                <div className="mypage-profile-detail">
                  <img src={lighteningImg} alt="" />
                  <span>{userProfileInfo.bungCount}??? ??????</span>
                  <img
                    src={
                      userProfileInfo.mannerTemp >= 50
                        ? IconHighTemp
                        : userProfileInfo.mannerTemp >= 25
                        ? IconMiddleTemp
                        : IconLowTemp
                    }
                    alt=""
                  />
                  <span>{userProfileInfo.mannerTemp}??C</span>
                </div>
              </div>
            </div>
            <button
              style={{ color: "black" }}
              className="mypage-profile-btn"
              onClick={() => {
                navigate("/profilesetting");
              }}
            >
              ????????? ??????
            </button>
          </div>

          {/* ?????? ???????????? ?????? */}
          <div
            style={{
              width: "89%",
              display: "flex",
              flexDirection: "column",
              margin: "auto",
            }}
          >
            <Divider />
            <div className="mypage-selectbar-list">
              <div
                className="mypage-selectbar"
                onClick={myLikeBungleClickHandler}
              >
                ?????? ?????? ??????
              </div>
              <div
                style={{ borderBottom: "0px" }}
                className="mypage-selectbar"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                ?????? ????????? ??????
              </div>
            </div>
            <Divider />
            <div className="mypage-selectbar-list">
              <div
                className="mypage-selectbar"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                ????????? ?????? ??????
              </div>
              <div
                className="mypage-selectbar"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                ?????? ?????? ??????
              </div>
            </div>
          </div>
          <MapFooterWrap>
            <FooterIconWrap
              onClick={() => {
                navigate("/main");
              }}
            >
              <FooterIconImg src={IconHome} />
              <FooterIconText>???</FooterIconText>
            </FooterIconWrap>
            <FooterIconWrap
              onClick={() => {
                navigate("/map");
              }}
            >
              <FooterIconImg src={IconLocation} />
              <FooterIconText>????????????</FooterIconText>
            </FooterIconWrap>
            {isOwner ? (
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
                <FooterIconImg src={IconMyBungleCurrent} />
                <FooterIconText style={{ color: "#FFC634" }}>
                  ?????? ??????
                </FooterIconText>
              </div>
            </FooterIconWrap>
          </MapFooterWrap>
        </div>
      )}
    </>
  );
}

export default MyPage;
