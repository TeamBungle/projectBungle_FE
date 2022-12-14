import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  myChattingList,
  LogOut,
  Withdrawal,
} from "../../redux/modules/BungleSlice";
import { useNavigate } from "react-router-dom";

import { getCookie } from "../../customapi/CustomCookie";

import {
  MapHeaderWrap,
  MapPageTitle,
  MapIconsWrap,
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

import {
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButton,
  ModalButtonWrap,
  ModalCancelButton,
  ModalDeleteButton,
} from "../../styles/StyledLogin";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
} from "../../styles/StyledHeader.js";

import { LoadingWrap, LoadingText } from "../../styles/StyledLoading";

import {
  // LeadingActions,
  SwipeableList,
  SwipeableListItem,
} from "react-swipeable-list";

import Divider from "../../components/Divider";
import "react-swipeable-list/dist/styles.css";

import "../../styles/ChatListSwiper.css";

//icon
import Setting from "../../assets/icon-setting.svg";
import Notification from "../../assets/icon-notification.svg";
import IconHome from "../../assets/icon-home.svg";
import IconLocation from "../../assets/icon-location.svg";
import IconEdit from "../../assets/icon-edit-footer.svg";
import IconCreate from "../../assets/icon-create-post.svg";
import IconChatCurrent from "../../assets/icon-chat-current.svg";
import IconMyBungae from "../../assets/icon-account.svg";
import IconDefaultChatList from "../../assets/icon-chatlist-default.png";
import IconBackKey from "../../assets/icon-left-arrow.svg";

function App() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  // disconnect modal state
  const [isDisconnectModal, setIsDisconnectModal] = useState(false);

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);

  const myChattingInfo = useSelector((state) => state.Bungle.myChatting);
  const dispatch = useDispatch();

  //postId ???????????? ??????
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

  //?????? ?????????
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
      returnTime = time + "??? ???";
    } else if (time > 60 && time < 3600) {
      returnTime = Math.floor(time / 60) + "??? ???";
    } else if (time > 3600) {
      returnTime = Math.floor(time / 3600) + "?????? ???";
    }
    return returnTime;
  };

  //?????? ?????? ?????? ?????? ?????????
  let realStartDate = [];
  let startDate;
  if (myChattingInfo) {
    for (let i = 0; i < myChattingInfo.length; i++) {
      startDate = myChattingInfo[i].postTime.split(" ")[0];

      if (startDate.split("-")[1][0] === 0) {
        realStartDate[i] =
          startDate.split("-")[1][1] +
          "???" +
          startDate.split("-")[2] +
          "??? ??????";
      } else {
        realStartDate[i] =
          startDate.split("-")[1][1] +
          "???" +
          startDate.split("-")[2] +
          "??? ??????";
      }
    }
  }

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
          <MapPageTitle>??????</MapPageTitle>
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
        <LoadingWrap>
          {/* <LoadingLogo src={IconLoadingLogo} />
           */}
          <LoadingText style={{ marginTop: "80%", color: "#898989" }}>
            ?????? ?????? ????????? ????????????.
          </LoadingText>
        </LoadingWrap>

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
            <FooterIconText style={{ color: "#FFC634" }}>??????</FooterIconText>
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
          <MapPageTitle>??????</MapPageTitle>
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
                      {/* ?????? */}
                    </div>

                    <div className="first_swipe_content">
                      <span>
                        {item.lastMessage}
                        {/* ????????? ????????? */}
                      </span>
                    </div>
                    <div className="first_swipe_sub">
                      {dateHandler(item.lastMessageTime)} ???{" "}
                      {realStartDate[index]}
                      {/* ????????? ?????? */}
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
                  <h3>????????? ??????!</h3>
                  <div>????????? ??????</div>
                </ModalContentWrap>
                <ModalDivider />
                <ModalButton
                  onClick={() => {
                    setIsDisconnectModal(false);
                  }}
                >
                  ??????
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
            <FooterIconText style={{ color: "#FFC634" }}>??????</FooterIconText>
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
        </MapFooterWrap>
      </div>
    </>
  );
}

export default App;
