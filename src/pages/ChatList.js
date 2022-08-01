import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  myChattingList,
  LogOut,
  Withdrawal,
} from "../redux/modules/BungleSlice";
import { useNavigate } from "react-router-dom";

import { getCookie } from "../customapi/CustomCookie";

import {
  MapHeaderWrap,
  MapPageTitle,
  MapIconsWrap,
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

import {
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButton,
} from "../styles/StyledLogin";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
} from "../styles/StyledHeader.js";

import { LoadingWrap, LoadingText } from "../styles/StyledLoading";

import {
  // LeadingActions,
  SwipeableList,
  SwipeableListItem,
} from "react-swipeable-list";
import {
  // Moadl
  ModalButtonWrap,
  ModalCancelButton,
  ModalDeleteButton,
} from "../styles/StyledLogin";
import Divider from "../components/Divider";
import "react-swipeable-list/dist/styles.css";

import "../styles/ChatListSwiper.css";

//icon
import Setting from "../assets/icon-setting.svg";
import Notification from "../assets/icon-notification.svg";
import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconEdit from "../assets/icon-edit-footer.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconChatCurrent from "../assets/icon-chat-current.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconDefaultChatList from "../assets/icon-chatlist-default.png";
import IconBackKey from "../assets/icon-left-arrow.svg";

function App() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  // disconnect modal state
  const [isDisconnectModal, setIsDisconnectModal] = useState(false);

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);

  const myChattingInfo = useSelector((state) => state.Bungle.myChatting);
  const dispatch = useDispatch();

  //postId 가져오는 함수
  const [getPostId, setGetPostId] = useState();
  function getInnerHTML(id) {
    setGetPostId(() => id);
    enterChat(id);
  }

  const navigate = useNavigate();
  const enterChat = (id) => {
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    dispatch(myChattingList());
  }, []);

  //시간 커스텀
  const dateHandler = (lastMessageTime) => {
    let a = lastMessageTime;
    const now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    let currentSecond = now.getSeconds();

    const dateList = a.split(",");
    // console.log(dateList);
    let hour = (Number(currentHour) - Number(dateList[3])) * 3600;
    let minute = (Number(currentMinute) - Number(dateList[4])) * 60;
    let second = Number(currentSecond) - Number(dateList[5]);

    let time = hour + minute + second;

    let returnTime = "";

    if (time < 60) {
      returnTime = time + "초 전";
    } else if (time > 60 && time < 3600) {
      returnTime = Math.floor(time / 60) + "분 전";
    } else if (time > 3600) {
      returnTime = Math.floor(time / 3600) + "시간 전";
    }
    return returnTime;
  };

  //벙글 시작 예정 날짜 커스텀
  let realStartDate = [];
  let startDate;
  if (myChattingInfo) {
    for (let i = 0; i < myChattingInfo.length; i++) {
      startDate = myChattingInfo[i].postTime.split(" ")[0];

      if (startDate.split("-")[1][0] === 0) {
        realStartDate[i] =
          startDate.split("-")[1][1] +
          "월" +
          startDate.split("-")[2] +
          "일 벙글";
      } else {
        realStartDate[i] =
          startDate.split("-")[1][1] +
          "월" +
          startDate.split("-")[2] +
          "일 벙글";
      }
    }
  }

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

  if (myChattingInfo?.length === 0) {
    return (
      <div className="top-chatlist-wrap">
        <MapHeaderWrap>
          <MapIconsWrap>
            <IconNotification
              style={{ visibility: "hidden" }}
              src={Notification}
            />
            <IconSetting style={{ visibility: "hidden" }} src={Setting} />
          </MapIconsWrap>
          <MapPageTitle>채팅</MapPageTitle>
          <MapIconsWrap>
            <IconNotification
              style={{ visibility: "hidden" }}
              src={Notification}
            />
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
        <LoadingWrap>
          {/* <LoadingLogo src={IconLoadingLogo} />
           */}
          <LoadingText style={{ marginTop: "80%", color: "#898989" }}>
            진행 중인 채팅이 없습니다.
          </LoadingText>
        </LoadingWrap>

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
              src={IconChatCurrent}
              onClick={() => {
                navigate("/chatlist");
              }}
            />
            <FooterIconText style={{ color: "#FFC634" }}>채팅</FooterIconText>
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
              <FooterIconText>나의 벙글</FooterIconText>
            </div>
          </FooterIconWrap>
        </MapFooterWrap>
      </div>
    );
  }

  return (
    <>
      <div className="top-chatlist-wrap">
        <MapHeaderWrap>
          <MapIconsWrap>
            <IconNotification
              style={{ visibility: "hidden" }}
              src={Notification}
            />
            <IconSetting
              style={{ visibility: "hidden" }}
              onClick={() => {
                setSettingModal(true);
              }}
              src={Setting}
            />
          </MapIconsWrap>
          <MapPageTitle>채팅</MapPageTitle>
          <MapIconsWrap>
            <IconNotification
              style={{ visibility: "hidden" }}
              src={Notification}
            />
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
        {myChattingInfo.map((item, index) => {
          return (
            <SwipeableList key={index}>
              <SwipeableListItem
              >
                <div className="first_swiper_main">
                  <div className="first_swiper_img">
                    <img
                      src={item.postUrl ? item.postUrl : IconDefaultChatList}
                      alt=""
                    />
                  </div>
                  <div
                    className="first_swipe"
                    onClick={() => {
                      getInnerHTML(item.postId);
                    }}
                  >
                    <div className="first_swipe_title">
                      {item.postTitle}
                      {/* 제목 */}
                    </div>

                    <div className="first_swipe_content">
                      <span>
                        {item.lastMessage}
                        {/* 마지막 메세지 */}
                      </span>
                    </div>
                    <div className="first_swipe_sub">
                      {dateHandler(item.lastMessageTime)} ∙{" "}
                      {realStartDate[index]}
                      {/* 마지막 시간 */}
                    </div>
                    <p id="postId" style={{ display: "none" }}>
                      {item.postId}
                    </p>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
          );
        })}
        {isDisconnectModal && (
          <ModalWrapper>
            <ModalOverlay>
              <ModalInner>
                <ModalContentWrap>
                  <h3>다음에 봐요!</h3>
                  <div>즐거운 벙글</div>
                </ModalContentWrap>
                <ModalDivider />
                <ModalButton
                  onClick={() => {
                    setIsDisconnectModal(false);
                  }}
                >
                  확인
                </ModalButton>
              </ModalInner>
            </ModalOverlay>
          </ModalWrapper>
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
              src={IconChatCurrent}
              onClick={() => {
                navigate("/chatlist");
              }}
            />
            <FooterIconText style={{ color: "#FFC634" }}>채팅</FooterIconText>
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
              <FooterIconText>나의 벙글</FooterIconText>
            </div>
          </FooterIconWrap>
        </MapFooterWrap>
      </div>
    </>
  );
}

export default App;
