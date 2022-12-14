import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Components
import MyLikeBungleCard from "./MyLikeBungleCard";
import {
  LogOut,
  Withdrawal,
  myLikeBungleList,
} from "../../redux/modules/BungleSlice";
import { getCookie } from "../../customapi/CustomCookie";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting,
} from "../../styles/StyledHeader.js";

import {
  MapFooterWrap,
  FooterIconWrap,
  FooterIconImg,
  FooterIconText,
  FooterAddBungae,
} from "../../styles/StyledFooter.js";

import { LoadingWrap, LoadingText } from "../../styles/StyledLoading";

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
} from "../../styles/StyledLogin";
import { MapPageTitle } from "../../styles/StyledHeader";
import Divider from "../../components/Divider";

import IconHome from "../../assets/icon-home.svg";
import IconLocation from "../../assets/icon-location.svg";
import IconChat from "../../assets/icon-chat.svg";
import IconMyBungleCurrent from "../../assets/icon-mybungle-current.svg";
import IconCreate from "../../assets/icon-create-post.svg";
import IconEdit from "../../assets/icon-edit-footer.svg";

import IconBackKey from "../../assets/icon-left-arrow.svg";
import Setting from "../../assets/icon-setting.svg";
import Notification from "../../assets/icon-notification.svg";
import NotificationOn from "../../assets/icon-notification-on.svg";

function MyPageRecent() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  const isOwner = useSelector((state) => state.Bungle.isOwner);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(true);
  const myLikeList = useSelector((state) => state.Bungle.myLikeList);

  const [location, setLocation] = useState();
  // ?????? ????????? ??????
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
      alert("????????? ???????????? GPS ????????? ????????????");
    }
  };

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

  useEffect(() => {
    if (isLoad) {
      setTimeout(() => {
        setIsLoad(false);
      }, 200);
    }
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
      {myLikeList?.length > 0 ? (
        myLikeList.map((item, index) => {
          return <MyLikeBungleCard myLikeList={item} />;
        })
      ) : (
        <LoadingWrap>
          <LoadingText style={{ marginTop: "80%", color: "#898989" }}>
            ?????? ????????? ????????????.
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
    // </div>
  );
}

export default MyPageRecent;
