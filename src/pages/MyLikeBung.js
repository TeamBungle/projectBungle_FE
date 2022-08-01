import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Components
import MyLikeBungleCard from "../components/MyLikeBungleCard";
import {
  LogOut,
  Withdrawal,
  myLikeBungleList,
} from "../redux/modules/BungleSlice";
import { getCookie } from "../customapi/CustomCookie";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting,
} from "../styles/StyledHeader.js";

import {
  MapFooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../styles/StyledFooter.js";

import { LoadingWrap, LoadingText } from "../styles/StyledLoading";

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

import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungleCurrent from "../assets/icon-mybungle-current.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";

import IconBackKey from "../assets/icon-left-arrow.svg";
import Setting from "../assets/icon-setting.svg";
import Notification from "../assets/icon-notification.svg";
import NotificationOn from "../assets/icon-notification-on.svg";

function MyPageRecent() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  const isOwner = useSelector((state) => state.Bungle.isOwner);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(true);
  const myLikeList = useSelector((state) => state.Bungle.myLikeList);

  const [location, setLocation] = useState();
  // 에러 메세지 저장
  const [error, setError] = useState();

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (error) => {
    setError(error.message);
    console.log(error.code);
    console.log(error.message);
    if (error.message === "User denied Geolocation") {
      alert("사이트 설정에서 GPS 설정을 켜주세요");
    }
  };

  // GPS 옵션
  const options = {
    /*
    maximumAge
    : 캐시에 저장한 위치정보를 대신 반환할 수 있는 최대 시간을 나타내는 양의 long 값. 
    0을 지정한 경우 장치가 위치정보 캐시를 사용할 수 없으며 반드시 실시간으로 위치를 알아내려 시도해야 한다는 뜻. 
    Infinity를 지정한 경우 지난 시간에 상관없이 항상 캐시에 저장된 위치정보를 반환해야 함. 기본 값은 0입니다.
    timeout
    : 기기가 위치를 반환할 때 소모할 수 있는 최대 시간(밀리초)을 나타내는 양의 long 값. 
    기본 값은 Infinity로, 위치를 알아내기 전에는 getCurrentPosition()이 반환하지 않을 것임을 나타냄.
    enableHighAccuracy
    : 위치정보를 가장 높은 정확도로 수신하고 싶음을 나타내는 불리언 값. true를 지정했으면, 지원하는 경우 장치가 더 정확한 위치를 제공. 
     그러나 응답 속도가 느려지며 전력 소모량이 증가. 
     반면 false를 지정한 경우 기기가 더 빠르게 반응하고 전력 소모도 줄일 수 있는 대신 정확도가 떨어짐. 기본 값은 false.
    */
    enableHighAccuracy: true,
    // timeout
    timeout: 10000, // 10000
    maximumAge: 0,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
    window.scrollTo(0, 0);
  }, []);

  const getMyLikeList = (location) => {
    dispatch(myLikeBungleList(location));
  };

  useEffect(() => {
    getMyLikeList(location);
  }, [location]);

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

  useEffect(() => {
    if (isLoad) {
      setTimeout(() => {
        setIsLoad(false);
      }, 200);
    }
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "90px",
        width: "100%",
      }}
    >
      <PostHeaderWrap>
        <ChattingBackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/mypage");
          }}
        />

        <HeadrIconsWrap>
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
        </HeadrIconsWrap>
      </PostHeaderWrap>
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
      {myLikeList?.length > 0 ? (
        myLikeList.map((item, index) => {
          return <MyLikeBungleCard myLikeList={item} />;
        })
      ) : (
        <LoadingWrap>
          <LoadingText style={{ marginTop: "80%", color: "#898989" }}>
            찜한 벙글이 없습니다.
          </LoadingText>
        </LoadingWrap>
      )}
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
    // </div>
  );
}

export default MyPageRecent;
