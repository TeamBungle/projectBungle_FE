import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  NotificationWrap,
  NotificationContent,
  NotificationTitleWrap,
  NotificationTitle,
  NotificationDisplay,
  NofiticationDate,
} from "../styles/StyleNotification";
import { useNavigate } from "react-router-dom";

import { clearNotificationState } from "../redux/modules/BungleSlice";
import {
  LogOut,
  Withdrawal,
} from "../redux/modules/BungleSlice";
import { getCookie } from "../customapi/CustomCookie";

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
import Divider from "./Divider";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconSetting,
} from "../styles/StyledHeader";
import "../styles/Setting.css";

import { LoadingWrap, LoadingText } from "../styles/StyledLoading";

import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";
import IconBell from "../assets/icon-bell.svg";

function Notification() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const NotificationList = useSelector(
    (state) => state.Bungle.NoitficationList
  );
    
  const changeDateFormat = (date) => {
    if (date) {
      const dateList = date?.split("T");
      const newDate =
        dateList[0].substring(5, dateList[0].length).replace("-", "월 ") +
        "일, " +
        dateList[1].substring(0, 5);

      return newDate;
    }
  };
  // Back key 클릭 동작
  const BackkeyClickHandler = () => {
    dispatch(clearNotificationState());
    navigate(-1);
  };

  // 알림 list 클릭 동작
  const notificationListClickHandler = () => {
    dispatch(clearNotificationState());
    navigate("/chatlist");
  };

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

  return (
    <NotificationWrap>
      {/* 헤더 */}
      <PostHeaderWrap>
        <ChattingBackKey
          src={IconBackKey}
          onClick={() => {
            BackkeyClickHandler();
          }}
        />
        <HeadrIconsWrap>
          <IconSetting
            src={Setting}
            onClick={() => {
              setSettingModal(true);
            }}
          />
        </HeadrIconsWrap>
      </PostHeaderWrap>
      {settingModal && (
        <div className="setting-modal-wrapper">
          <div className="setting-modal-inner">
            <div className="setting-modal-content-wrap">
              <div className="modal-content-wrap-setting">
                <PostHeaderWrap>
                  <ChattingBackKey
                    src={IconBackKey}
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
                  <div className="mypage-selectbar-list">
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
      {/* body */}
      {NotificationList.length !== 0 ? (
        NotificationList.map((item, index) => {
          return (
            <NotificationContent
              key={index}
              onClick={() => {
                notificationListClickHandler();
              }}
            >
              <NotificationTitleWrap>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={IconBell}
                    alt=""
                  />
                  <NotificationTitle>{item.title}</NotificationTitle>
                </div>
                <NotificationDisplay>{item.nickname} : {item.message}</NotificationDisplay>
                <NofiticationDate>
                  {changeDateFormat(item.createdAt)}
                </NofiticationDate>
              </NotificationTitleWrap>
            </NotificationContent>
          );
        })
      ) : (
        <LoadingWrap>
          <LoadingText style={{ marginTop: "80%", color: "#898989" }}>
            알림이 없습니다.
          </LoadingText>
        </LoadingWrap>
      )}
    </NotificationWrap>
  );
}

export default Notification;
