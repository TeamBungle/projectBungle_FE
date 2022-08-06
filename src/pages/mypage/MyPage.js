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
  const [modalMessage, setModalMessage] = useState("서비스 예정 중입니다.");

  // 알림 call
  const interval = useRef(null);
  // 알림 state
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
  // 알림 interval
  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  // 설정 modal state
  const [settingModal, setSettingModal] = useState(false);
  //로그 아웃
  const LogOutApi = () => {
    dispatch(LogOut({ navigate, refreshToken, token }));
  };

  //회원 탈퇴
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const WithdrawalApi = () => {
    dispatch(Withdrawal({ navigate }));
  };

  //Setting Modal 밖 영역 클릭 시 닫기
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
                    <h3>서비스 준비 중</h3>
                    <div>{modalMessage}</div>
                  </ModalContentWrap>
                  <ModalDivider />
                  <ModalButton
                    onClick={() => {
                      setIsModal(false);
                    }}
                  >
                    확인
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
            <MapPageTitle>나의 벙글</MapPageTitle>
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
                      <MapPageTitle>설정</MapPageTitle>
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
                          로그 아웃
                        </div>
                      </div>
                      <div
                        className="mypage-selectbar-list"
                        onClick={() => {
                          navigate("/termsconditions");
                        }}
                      >
                        <div className="mypage-selectbar">이용 약관</div>
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
                          회원 탈퇴
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
                    <h3>벙글 탈퇴</h3>
                    <div style={{ fontSize: "14px" }}>
                      정말{" "}
                      <span
                        style={{
                          color: "red",
                          margin: "0px 3px 0px 3px",
                          fontWeight: "bold",
                        }}
                      >
                        탈퇴
                      </span>{" "}
                      하시겠습니까?
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      탈퇴 후
                      <span
                        style={{
                          color: "red",
                          margin: "0px 3px 0px 3px",
                          fontWeight: "bold",
                        }}
                      >
                        2일 동안
                      </span>{" "}
                      재가입할 수 없습니다.
                    </div>
                  </ModalContentWrap>
                  <ModalDivider />
                  <ModalButtonWrap>
                    <ModalCancelButton
                      onClick={() => {
                        setWithdrawalModal(false);
                      }}
                    >
                      취소
                    </ModalCancelButton>
                    <ModalDeleteButton
                      onClick={() => {
                        WithdrawalApi();
                      }}
                    >
                      탈퇴
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
                    : "닉네임"}
                </div>
                <div className="mypage-profile-desc">
                  {userProfileInfo.intro
                    ? userProfileInfo.intro
                    : "자기소개를 입력해주세요."}
                </div>
                <div className="mypage-profile-detail">
                  <img src={lighteningImg} alt="" />
                  <span>{userProfileInfo.bungCount}회 참여</span>
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
                  <span>{userProfileInfo.mannerTemp}°C</span>
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
              프로필 수정
            </button>
          </div>

          {/* 지용 리스트들 변경 */}
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
                내가 찜한 벙글
              </div>
              <div
                style={{ borderBottom: "0px" }}
                className="mypage-selectbar"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                내가 작성한 벙글
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
                비매너 유저 신고
              </div>
              <div
                className="mypage-selectbar"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                나의 신고 내역
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
              <FooterIconText>홈</FooterIconText>
            </FooterIconWrap>
            <FooterIconWrap
              onClick={() => {
                navigate("/map");
              }}
            >
              <FooterIconImg src={IconLocation} />
              <FooterIconText>벙글지도</FooterIconText>
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
              <FooterIconText>채팅</FooterIconText>
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
                  나의 벙글
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
