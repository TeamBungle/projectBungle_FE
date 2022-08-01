import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { getChatClient } from "../../redux/modules/BungleSlice";

import _ from "lodash";

import AxiosAPI from "../../customapi/CustomAxios";

import "swiper/css";
import "swiper/css/pagination";

//styled-components
import {
  ChattingHeaderWrap,
  ChattingRoomBackKey,
  IconHamburger,
} from "../../styles/StyledHeader.js";
import {
  PostMemberCard,
  PostMemberPicture,
  PostMemberVideo,
} from "../../styles/StyledDetailPost";
import {
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButton,
} from "../../styles/StyledLogin";
//CSS
import "../../styles/ChatRoom.css";
//icons
import Hamburger from "../../assets/icon-hamburger.svg";
import IconBackKey from "../../assets/icon-left-arrow.svg";
import IconCamera from "../../assets/icon-camera-mono (1).svg";
import SendBtn from "../../assets/icon-sendbtn (1).svg";
import SendBtnActive from "../../assets/icon-sendbtn-active.svg";
import SendImgBtnActive from "../../assets/icon-img-sendbtn.svg";
import IconSiren from "../../assets/icon-siren.svg";
import IconMoon from "../../assets/icon-share-mono.svg";


import IconHighTemp from "../../assets/icon-manner-high.svg";
import IconMiddleTemp from "../../assets/icon-manner-middle.svg";
import IconLowTemp from "../../assets/icon-manner-low.svg";

import IconLightening from "../../assets/icon-lightening.svg";

let client = null;
function ChattingRoom({ setRealTimeChat }) {
  // SERVER URL
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();

  // 내가 만든 채팅 룸 ID
  const Bungle = useSelector((state) => state.Bungle.OnwerPostId);
  // 참여자 채팅 룸 ID
  const params = useParams();
  const token = localStorage.getItem("login-token");
  const PK = Number(localStorage.getItem("userId"));

  const Guest = params.postId;
  let postId = String(Guest);

  const userPersonalId = Number(localStorage.getItem("userId"));

  // disconnect modal state
  const [isDisconnectModal, setIsDisconnectModal] = useState(false);

  // console.log(token);
  const [publicChats, setPublicChats] = useState([]);
  const [notiChats, setNotiChats] = useState({});
  const [userData, setUserData] = useState({
    type: "",
    nickName: "",
    receivername: "",
    roomId: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    if (postId > 0 || Number(postId) > 0) {
      connect();
    }
  }, [postId]);

  const connect = () => {
    console.log("Connect 시작");
    let sock = new SockJS(`${SERVER_URL}/wss/chat`);
    client = over(sock);
    client.connect({ token }, onConnected, onError);
  };

  const onError = (err) => {
    console.log("Test ", err);
  };

  const onConnected = () => {
    dispatch(getChatClient({ client, Guest }));
    setUserData({ ...userData, connected: true });

    if (Bungle) {
      client.subscribe(`/sub/chat/room/${parseInt(postId)}`, onMessageReceived);
    } else if (Guest) {
      client.subscribe(`/sub/chat/room/${parseInt(postId)}`, onMessageReceived);
    }
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      type: "ENTER",
      nickName: "seowoo",
      roomId: `${postId}`,
      status: "JOIN",
    };

    client.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = async () => {
    if ((client && userData.message) || (client && fileUrl)) {
    let chatMessage = {
        type: "TALK",
        message: userData.message,
        roomId: `${postId}`,
        fileUrl: fileUrl,
      };

      client.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
      setFileUrl(null);
      setIsFile(null);
    }
  };
  
  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
  
    if (
      payloadData.type === "TALK" ||
      payloadData.type === "ENTER" ||
      payloadData.type === "QUIT"
    ) {
      publicChats.push(payloadData);
      setNotiChats(() => payloadData);
      setPublicChats([...publicChats]);
    }
  };

  //날짜 커스텀
  let chattingDate = [];

  let ampm = "";
  let hour;
  let minutes;

  for (let i = 0; i < publicChats.length; i++) {
    hour = publicChats[i].createdAt.split(",")[3];
    minutes = publicChats[i].createdAt.split(",")[4];
    if (hour > 12) {
      ampm = "오후";
      hour = hour - 12;
      chattingDate.push(ampm + " " + hour + ":" + minutes);
    } else {
      ampm = "오전";
      hour = hour;
      chattingDate.push(ampm + " " + hour + ":" + minutes);
    }
  }
  
  //Disconnect
  const chatDisconnect = () => {
  
  let chatMessage = {
    type: "QUIT",
    roomId: `${postId}`,
  };
  
  client.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
  client.disconnect(function () {
    setIsDisconnectModal(true);
  });
  };

  //엔터키
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      sendValue();
    }
  };

  //이미지 업로드
  const [isFile, setIsFile] = useState("");
  const [fileUrl, setFileUrl] = useState();

  const imageUpload = (e) => {
    if (e.target.files[0]) {
      setIsFile(e.target.files[0]);
    } else {
      setIsFile("");
      return;
    }
  };
  
  const chatImg = async () => {
    if (fileUrl) {
      setFileUrl("");
    } else {
      const formData = new FormData();
      formData.append("file ", isFile);
      const response = await AxiosAPI.post(`/chat/message/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFileUrl(response.data);
    }
  };
  
  useEffect(() => {

    if (isFile) {
      chatImg();
    }
  }, [isFile]);

  //채팅 상세 Modal Members Array
  const MembersArray = [];

  //채팅 상세 Modal Report Array
  const ReportArray = [
    { key: 1, value: "상업적 광고 및 판매" },
    { key: 2, value: "게시판 성격에 부적절함" },
    { key: 3, value: "음란물/불건전한 만남 및 대화" },
    { key: 4, value: "유출/사칭/사기" },
    { key: 5, value: "욕설/비하" },
    { key: 6, value: "낚시/놀람/도배" },
    { key: 7, value: "정당/정치인 비하 및 선거운동" },
  ];

  //토클 클릭시 회원 정보, 사진/동영상 정보 불러오기
  const [chatPeople, setChatPeople] = useState([]);
  const [chatFiles, setChatFiles] = useState([]);

  const chatPerson = () => {
    AxiosAPI({
      method: "get",
      url: `/chat/message/userinfo/${postId}`,
    })
    .then((response) => {
      setChatPeople(() => response.data);
      MembersArray.push(chatPeople);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const chatFile = () => {
    AxiosAPI({
      method: "get",
      url: `/chat/message/files/${postId}`,
    })
      .then((response) => {
        setChatFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Modal state

  //채팅 상세 모달 state
  const [chatModal, setChatModal] = useState(false);
  //신고하기 모달 state
  const [isModal, setIsModal] = useState(false);
  //신고 모달에서 해당 사항클릭 후 버튼 state
  const [isBtn, setIsBtn] = useState(false);
  //유저 상세 프로필 모달 state
  const [profileModal, setProfileModal] = useState(false);

  //신고하기 모달 state 관리
  const ModalOnClickHandler = () => {
    setIsModal(true);
  };
  //상세 프로필 모달 state 관리
  const ModalProfileOnClickHandler = () => {
    setProfileModal(() => true);
  };

  //Chatting Detail Modal 밖 영역 클릭 시 닫기
  const handleModal = (e) => {
    const clicked = e.target.closest(".modal-chat-content-wrap");
    if (clicked) return;
    else {
      setChatModal(false);
    }
  };

  //Report Modal 밖 영역 클릭 시 닫기
  const handleReportModal = (e) => {
    const clicked = e.target.closest(".modal-content-wrap");
    if (clicked) return;
    else {
      setIsModal(false);
    }
  };

  //Detail Profile Modal 밖 영역 클릭 시 닫기
  const handleDetailProfile = (e) => {
    const clicked = e.target.closest(".modal-content-wrap-profile");
    if (clicked) return;
    else {
      setProfileModal(false);
    }
  };

  //신고하기
  const [report, setReport] = useState("");
  const [reportUserId, setReportUserId] = useState();

  const chatReportPerson = () => {
    AxiosAPI({
      method: "post",
      url: `/user/report/${reportUserId}`,
      data: {
        history: report,
      },
    })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  //유저 아이디 바로 가져오는 변수

  //userId 가져오는 함수
  function getInnerHTML(id) {
    setReportUserId(() => id);
  }

  //프로필 상세 정보
  const [chatProfile, setChatProfile] = useState({});
  const detailProfile = () => {
    AxiosAPI({
      method: "get",
      url: `/chat/details/${postId}/${reportUserId}`,
    })
      .then((response) => {
        setChatProfile(() => response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (reportUserId) {
      detailProfile();
    }
  }, [reportUserId]);

  //이전 메세지 불러오기
  const [beforeChat, setBeforeChat] = useState([]);

  //이전 메세지 시간
  let beforeChattingDate = [];
  let beforeAmpm = "";
  let beforeHour;
  let beforeMinutes;
  for (let i = 0; i < beforeChat.length; i++) {
    beforeHour = beforeChat[i].createdAt.split(",")[3];
    beforeMinutes = beforeChat[i].createdAt.split(",")[4];
    if (beforeHour > 12) {
      beforeAmpm = "오후";
      beforeHour = beforeHour - 12;
      beforeChattingDate.push(
        beforeAmpm + " " + beforeHour + ":" + beforeMinutes
      );
    } else {
      beforeAmpm = "오전";
      beforeHour = beforeHour;
      beforeChattingDate.push(
        beforeAmpm + " " + beforeHour + ":" + beforeMinutes
      );
    }
  }

  const getMessage = () => {
    AxiosAPI({
      method: "get",
      url: `/chat/message/${postId}`,
    })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].type === "TALK") {
            setBeforeChat(response.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (postId > 0) {
      getMessage();
    }
  }, [postId]);

  //방장 나가는 지 확인
  const [outOwner, setOutOwner] = useState(false);

  const handleOutOwner = () => {
    for (let i = 0; i < publicChats.length; i++) {
      if (publicChats[i].quitOwner === true) {
        setOutOwner(() => true);
      }
    }
  };

  useEffect(() => {
    handleOutOwner();
  }, [publicChats]);

  //스크롤 맨 밑에서 작성 시에만 scrollBottom
  const scrollRef = useRef();
  const boxRef = useRef(null);

  const [scrollState, setScrollState] = useState(true); // 자동 스크롤 여부

  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

    // 스크롤이 맨 아래에 있을때
    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false
    );
  }, 100);
  const scroll = React.useCallback(scrollEvent, []);

  useEffect(() => {
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      // scrollRef의 element위치로 스크롤 이동 behavior는 전환 에니메이션의 정의
    }
  }, [publicChats]);

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll);
  });

  //QR 코드 받기
  const getQR = () => {
    AxiosAPI({
      method: "get",
      url: `/qrcode`,
      params: {
        roomId: postId,
      },
    })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <>
      <div id="chat-app">
        <div id="page-wrap">
          <ChattingHeaderWrap>
            <ChattingRoomBackKey
              src={IconBackKey}
              onClick={() => {
                navigate("/chatlist");
                setOutOwner(() => false);
              }}
            />
            <IconHamburger
              src={Hamburger}
              onClick={() => {
                setChatModal(!chatModal);
                chatPerson();
                chatFile();
              }}
            />
          </ChattingHeaderWrap>
          {chatModal && (
            <div className="modal-chat-wrapper">
              <div
                className="modal-chat-overlay"
                onClick={(e) => {
                  handleModal(e);
                }}
              >
                <div className="modal-chat-inner">
                  <div className="modal-chat-content-wrap">
                    <div className="modal-chat-content-file">
                      <div className="modal-chat-content-title">
                        <p>사진, 동영상</p>
                        {/* <img src={IconForwardKey} alt="" /> */}
                      </div>
                      <Swiper
                        style={{ marginLeft: "20px" }}
                        spaceBetween={10}
                        slidesPerView={3}
                      >
                        {chatFiles.map((item, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <PostMemberCard>
                                {item.fileUrl.slice(-3) === "jpg" ||
                                item.fileUrl.slice(-3) === "png" ||
                                item.fileUrl.slice(-4) === "jpeg" ||
                                item.fileUrl.slice(-3) === "gif" ||
                                item.fileUrl.slice(-3) === "bmp" ||
                                item.fileUrl.slice(-3) === "img" ||
                                item.fileUrl.slice(-4) === "jfif" ||
                                item.fileUrl.slice(-3) === "JPG" ||
                                item.fileUrl.slice(-3) === "PNG" ||
                                item.fileUrl.slice(-4) === "JPEG" ||
                                item.fileUrl.slice(-3) === "GIF" ||
                                item.fileUrl.slice(-3) === "BMP" ||
                                item.fileUrl.slice(-3) === "IMG" ? (
                                  <>
                                    <PostMemberPicture src={item.fileUrl} />
                                  </>
                                ) : (
                                  <>
                                    <PostMemberVideo>
                                      <source src={item.fileUrl} />
                                    </PostMemberVideo>
                                  </>
                                )}
                              </PostMemberCard>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                    <div className="modal-divider"></div>
                    <div className="modal-member-list">
                      <p>벙글 멤버</p>
                      {chatPeople.map((item, index) => {
                        return (
                          <div
                            className="modal-member"
                            key={index}
                            onClick={() => {
                              getInnerHTML(item.userId);
                            }}
                          >
                            <div className="modal-member-profile-img">
                              <img
                                className="modal-member-img"
                                src={item.profileUrl}
                                alt=""
                                onClick={() => {
                                  ModalProfileOnClickHandler();
                                }}
                              />
                            </div>
                            <div className="modal-member-profile-content">
                              <p
                                onClick={() => {
                                  ModalProfileOnClickHandler();
                                }}
                              >
                                {item.nickname}
                              </p>
                              <img
                                className="modal-member-siren"
                                src={IconSiren}
                                alt=""
                                onClick={() => {
                                  ModalOnClickHandler();
                                }}
                              />
                              <p id="userId" style={{ visibility: "hidden" }}>
                                {item.userId}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="modal-divider"></div>
                    <div className="modal-footer">
                      <div
                        className="modal-footer-exit"
                        onClick={() => {
                          chatDisconnect();
                          navigate("/main");
                        }}
                      >
                        <img
                          className="modal-footer-moon"
                          src={IconMoon}
                          alt=""
                        />
                        <p>나가기</p>
                      </div>
                      <div className="modal-footer-">
                        {/* <img
                          className="modal-footer-noti"
                          src={Notification}
                          alt=""
                        /> */}
                      </div>
                    </div>
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
                    {profileModal && (
                      <div className="modal-wrapper-profile">
                        <div
                          className="modal-overlay-profile"
                          onClick={(e) => {
                            handleDetailProfile(e);
                          }}
                        >
                          <div className="modal-inner-profile">
                            <div className="modal-content-wrap-profile">
                              <div className="modal-content-title-profile">
                                <img src={chatProfile.profileUrl} alt="" />
                                <p>{chatProfile.nickname}</p>
                                <div className="modal-content-profile-detail">
                                  <img
                                    src={IconLightening}
                                    alt=""
                                    className="icon-ligtening"
                                  ></img>
                                  <span>{chatProfile.bungCount} 참여</span>
                                  <img
                                    src={
                                      chatProfile.mannerTemp >= 50
                                        ? IconHighTemp
                                        : chatProfile.mannerTemp >= 25
                                        ? IconMiddleTemp
                                        : IconLowTemp
                                    }
                                    alt=""
                                  ></img>
                                  <span>{chatProfile.mannerTemp}°C</span>
                                </div>
                                <div className="modal-content-profile-intro">
                                  <p>{chatProfile.intro}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {isModal && (
                      <div className="modal-wrapper">
                        <div
                          className="modal-overlay"
                          onClick={(e) => {
                            handleReportModal(e);
                          }}
                        >
                          <div className="modal-inner">
                            <div className="modal-content-wrap">
                              <div className="modal-content-title">
                                <p>신고내역</p>
                              </div>
                              {ReportArray.map((item, index) => {
                                return (
                                  <>
                                    <div className="modal-content-divider"></div>
                                    <div
                                      className="modal-content-report"
                                      key={index}
                                      onClick={() => {
                                        setReport(() => item.value);
                                        setIsBtn(true);
                                      }}
                                    >
                                      {item.value}
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            {isBtn && (
                              <div className="modal-wrapper-btn">
                                <div className="modal-inner-btn">
                                  <div className="modal-content-wrap-btn">
                                    <div
                                      className="modal-content-wrap-report"
                                      onClick={() => {
                                        chatReportPerson();
                                        setIsModal(!isModal);
                                        setIsBtn(!isBtn);
                                      }}
                                    >
                                      신고하기
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="chat-wrap" ref={boxRef}>
            {beforeChat.map((chat, index) => (
              <div key={index}>
                {chat.type === "TALK" ? (
                  <>
                    {userPersonalId !== chat.userId ? (
                      <>
                        <div className="item">
                          <div className="profile">
                            <img src={chat.profileUrl} alt="" />
                          </div>
                          <div className="box-wrapper">
                            <span className="nickname">{chat.sender}</span>
                            <div className="box">
                              {chat.message && chat.message !== "" ? (
                                <>
                                  <p className="msg">{chat.message}</p>
                                </>
                              ) : (
                                <>
                                  {chat.fileUrl.slice(-3) === "jpg" ||
                                  chat.fileUrl.slice(-3) === "png" ||
                                  chat.fileUrl.slice(-4) === "jpeg" ||
                                  chat.fileUrl.slice(-4) === "jfif" ||
                                  chat.fileUrl.slice(-3) === "gif" ||
                                  chat.fileUrl.slice(-3) === "bmp" ||
                                  chat.fileUrl.slice(-3) === "img" ||
                                  chat.fileUrl.slice(-3) === "JPG" ||
                                  chat.fileUrl.slice(-3) === "PNG" ||
                                  chat.fileUrl.slice(-4) === "JPEG" ||
                                  chat.fileUrl.slice(-3) === "GIF" ||
                                  chat.fileUrl.slice(-3) === "BMP" ||
                                  chat.fileUrl.slice(-3) === "IMG" ? (
                                    <>
                                      <p className="mymsg-file">
                                        <img src={chat.fileUrl} alt="" />
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="mymsg-file">
                                        <video controls name="media">
                                          <source
                                            src={chat.fileUrl}
                                            type="video/*"
                                          />
                                        </video>
                                      </p>
                                    </>
                                  )}
                                </>
                              )}
                              <span className="time" key={index}>
                                {beforeChattingDate[index]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="myitem">
                          <div className="mybox">
                            {chat.message && chat.message !== "" ? (
                              <>
                                <p className="mymsg">{chat.message}</p>
                              </>
                            ) : (
                              <>
                                {chat.fileUrl.slice(-3) === "jpg" ||
                                chat.fileUrl.slice(-3) === "png" ||
                                chat.fileUrl.slice(-4) === "jpeg" ||
                                chat.fileUrl.slice(-4) === "jfif" ||
                                chat.fileUrl.slice(-3) === "gif" ||
                                chat.fileUrl.slice(-3) === "bmp" ||
                                chat.fileUrl.slice(-3) === "img" ||
                                chat.fileUrl.slice(-3) === "JPG" ||
                                chat.fileUrl.slice(-3) === "PNG" ||
                                chat.fileUrl.slice(-4) === "JPEG" ||
                                chat.fileUrl.slice(-3) === "GIF" ||
                                chat.fileUrl.slice(-3) === "BMP" ||
                                chat.fileUrl.slice(-3) === "IMG" ? (
                                  <>
                                    <p className="mymsg-file">
                                      <img src={chat.fileUrl} alt="" />
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="mymsg-file">
                                      <video controls name="media">
                                        <source
                                          src={chat.fileUrl}
                                          type="video/mp4"
                                        />
                                      </video>
                                    </p>
                                  </>
                                )}
                              </>
                            )}
                            <span className="mytime" key={index}>
                              {beforeChattingDate[index]}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : null}
              </div>
            ))}
            {publicChats.map((chat, index) => (
              <div key={index}>
                {chat.type === "TALK" ? (
                  <>
                    {userPersonalId !== chat.userId ? (
                      <>
                        <div className="item">
                          <div className="profile">
                            <img src={chat.profileUrl} alt="" />
                          </div>
                          <div className="box-wrapper">
                            <span className="nickname">{chat.sender}</span>
                            <div className="box">
                              {chat.message && chat.message !== "" ? (
                                <>
                                  <p className="msg">{chat.message}</p>
                                </>
                              ) : (
                                <>
                                  {chat.fileUrl.slice(-3) === "jpg" ||
                                  chat.fileUrl.slice(-3) === "png" ||
                                  chat.fileUrl.slice(-4) === "jpeg" ||
                                  chat.fileUrl.slice(-4) === "jfif" ||
                                  chat.fileUrl.slice(-3) === "gif" ||
                                  chat.fileUrl.slice(-3) === "bmp" ||
                                  chat.fileUrl.slice(-3) === "img" ||
                                  chat.fileUrl.slice(-3) === "JPG" ||
                                  chat.fileUrl.slice(-3) === "PNG" ||
                                  chat.fileUrl.slice(-4) === "JPEG" ||
                                  chat.fileUrl.slice(-3) === "GIF" ||
                                  chat.fileUrl.slice(-3) === "BMP" ||
                                  chat.fileUrl.slice(-3) === "IMG" ? (
                                    <>
                                      <p className="mymsg-file">
                                        <img src={chat.fileUrl} alt="" />
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="mymsg-file">
                                        <video controls name="media">
                                          <source
                                            src={chat.fileUrl}
                                            type="video/*"
                                          />
                                        </video>
                                      </p>
                                    </>
                                  )}
                                </>
                              )}
                              <span className="time" key={index}>
                                {beforeChattingDate[index]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="myitem">
                          <div className="mybox">
                            {chat.message && chat.message !== "" ? (
                              <>
                                <p className="mymsg">{chat.message}</p>
                              </>
                            ) : (
                              <>
                                {chat.fileUrl.slice(-3) === "jpg" ||
                                chat.fileUrl.slice(-3) === "png" ||
                                chat.fileUrl.slice(-4) === "jpeg" ||
                                chat.fileUrl.slice(-4) === "jfif" ||
                                chat.fileUrl.slice(-3) === "gif" ||
                                chat.fileUrl.slice(-3) === "bmp" ||
                                chat.fileUrl.slice(-3) === "img" ||
                                chat.fileUrl.slice(-3) === "JPG" ||
                                chat.fileUrl.slice(-3) === "PNG" ||
                                chat.fileUrl.slice(-4) === "JPEG" ||
                                chat.fileUrl.slice(-3) === "GIF" ||
                                chat.fileUrl.slice(-3) === "BMP" ||
                                chat.fileUrl.slice(-3) === "IMG" ? (
                                  <>
                                    <p className="mymsg-file">
                                      <img src={chat.fileUrl} alt="" />
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="mymsg-file">
                                      <video controls name="media">
                                        <source
                                          src={chat.fileUrl}
                                          type="video/mp4"
                                        />
                                      </video>
                                    </p>
                                  </>
                                )}
                              </>
                            )}
                            <span className="mytime" key={index}>
                              {chattingDate[index]}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="msg-noti">{chat.message}</p>
                  </>
                )}
                <div></div>
              </div>
            ))}
            <div ref={scrollRef}></div>
          </div>
          <div className="chatting-footer-wrap">
            {outOwner === true ? null : (
              <>
                <div className="chatting-footer">
                  <div className="chatting-footer-icon">
                    <label className="input-file-button" htmlFor="fileUpload">
                      <img src={IconCamera} alt="" />
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      accept="image/*, video/*"
                      name="chat_img"
                      onChange={imageUpload}
                    />
                  </div>
                  <div className="chatting-footer-input">
                    {fileUrl ? (
                      <>
                        <img
                          className="chatting-img-sendbtn"
                          src={SendImgBtnActive}
                          alt=""
                        />
                        <input
                          type="text"
                          value={userData.message}
                          onChange={handleMessage}
                          onKeyDown={onKeyPress}
                          disabled
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={userData.message}
                          onChange={handleMessage}
                          onKeyDown={onKeyPress}
                        />
                      </>
                    )}

                    {userData.message || fileUrl ? (
                      <>
                        <img
                          className="chatting-sendbtn"
                          src={SendBtnActive}
                          alt=""
                          onClick={() => {
                            sendValue();
                          }}
                        ></img>
                      </>
                    ) : (
                      <>
                        <img
                          className="chatting-sendbtn"
                          src={SendBtn}
                          alt=""
                          onClick={sendValue}
                        ></img>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChattingRoom;
