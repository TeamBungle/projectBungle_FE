/* global kakao */
import React, { useEffect, useRef, useState } from "react";

import {
  detailBungleList,
  detailLikeBungleList,
  getIntervalNotification,
  LogOut,
  Withdrawal,
} from "../../redux/modules/BungleSlice";
import { getCookie } from "../../customapi/CustomCookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import {
  PostWrap,
  PostContent,
  PostImg,
  PostIconShared,
  PostLike,
  PostUserBox,
  PostUserBoxProfile,
  PostUserTexts,
  PostUserName,
  PostUserIntro,
  PostUserIcon,
  PostUserIconImg,
  PostUserIconText,
  PostBodyTextWrap,
  PostBodyTitle,
  PostBodyContent,
  PostInfoTextWrap,
  PostTagWrap,
  PostTag,
  PostMap,
  PostMapTitle,
  PostMapView,
  PostMemberWrap,
  PostMemberTitle,
  PostMemberCard,
  PostMemberPicture,
  PostMemberName,
  PostJoinButton,
  PostCategoriesWrapper,
  PostCategoriesItem,
  PostJoinButtonWrapper,
  PostJoinIcon,
} from "../../styles/StyledDetailPost";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
  IconNotification,
  IconSetting,
} from "../../styles/StyledHeader.js";

import {
  FooterWrap,
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
  ModalButtonWrap,
  ModalCancelButton,
  ModalDeleteButton,
} from "../../styles/StyledLogin";
import { MapPageTitle } from "../../styles/StyledHeader";
import Divider from "../../components/Divider";

// icons
import IconShared from "../../assets/icon-url-shared.svg";
import IconLightening from "../../assets/icon-lightening.svg";
import IconLike from "../../assets/icon-like.svg";
import IconUnlike from "../../assets/icon-unlike.svg";
import IconChat from "../../assets/icon-chat.svg";
import IconChatNo from "../../assets/icon-chat-join-no.svg";

import IconHighTemp from "../../assets/icon-manner-high.svg";
import IconMiddleTemp from "../../assets/icon-manner-middle.svg";
import IconLowTemp from "../../assets/icon-manner-low.svg";

import Notification from "../../assets/icon-notification.svg";
import NotificationOn from "../../assets/icon-notification-on.svg";
import Setting from "../../assets/icon-setting.svg";
import IconBackKey from "../../assets/icon-left-arrow.svg";

import IconCurrentMarker from "../../assets/icon-marker-current.svg";
import IconNoPost from "../../assets/icon-detail-no-post.svg";

// Footer Icons
import IconHome from "../../assets/icon-home.svg";
import IconLocation from "../../assets/icon-location.svg";

import IconMyBungae from "../../assets/icon-account.svg";
import IconCreate from "../../assets/icon-create-post.svg";
import IconEdit from "../../assets/icon-edit-footer.svg";

//?????? ?????? client
const Post = () => {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);
  const navigate = useNavigate();
  // ?????? interval
  const interval = useRef(null);
  // ?????? ??????
  const NotificationState = useSelector(
    (state) => state.Bungle.isReadNotification
  );
  const [notificationState, setNotificationState] = useState(NotificationState);
  useEffect(() => {
    setNotificationState(NotificationState);
  }, [NotificationState]);

  const detailBungleInfo = useSelector((state) => state.Bungle.detailBungle);
  // console.log( detailBungleInfo, detailBungleInfo.length );
  const { postId } = useParams();

  const dispatch = useDispatch();

  const container = useRef(null);

  // ?????? setInterval
  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    // postId??? ?????? ??????, dispatch ??????
    dispatch(detailBungleList(postId));
    window.scrollTo(0, 0);
  }, [postId]);

  useEffect(() => {
    if (detailBungleInfo.latitude) {
      // latitude ?????? ???????????? ?????? ??????
      const options = {
        //????????? ????????? ??? ????????? ?????? ??????
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //????????? ????????????.
        center: new kakao.maps.LatLng(
          detailBungleInfo.latitude,
          detailBungleInfo.longitude
        ), //????????? ????????????.
        level: 3, //????????? ??????(??????, ?????? ??????)
      };

      const map = new kakao.maps.Map(container.current, options); //?????? ?????? ??? ?????? ??????
      // ?????? ??????
      const imageSrc = IconCurrentMarker;
      const imageSize = new kakao.maps.Size(10, 10);
      const imageOption = "";
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const markerPosition = new kakao.maps.LatLng(
        detailBungleInfo.latitude,
        detailBungleInfo.longitude
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);
    }
  }, [detailBungleInfo.latitude]);

  //???????????? ?????? ?????? ??? ?????? ??????????????? ??????
  const goToChatRoom = () => {
    navigate(`/chat/${postId}`);
  };

  const goToVideoRoom = () => {
    navigate(`/videochat/${postId}`);
  };

  // ????????? ??????

  const isLikeClick = (postId) => {
    dispatch(detailLikeBungleList(postId));
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
      {/* Urls??? ????????? ????????? */}
      {detailBungleInfo.postUrls && (
        <>
          <PostWrap>
            <PostHeaderWrap>
              <ChattingBackKey
                src={IconBackKey}
                onClick={() => {
                  navigate("/main");
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
            <PostContent>
              <PostIconShared src={IconShared} />
              <PostLike
                src={detailBungleInfo.isLike ? IconLike : IconUnlike}
                onClick={() => {
                  isLikeClick(detailBungleInfo.postId);
                }}
              />
              {detailBungleInfo.postUrls[0] !== null ? (
                <Swiper
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "207px",
                  }}
                >
                  {detailBungleInfo.postUrls.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <PostImg src={item} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <PostImg src={IconNoPost} />
              )}

              <PostUserBox>
                <PostUserBoxProfile
                  src={
                    detailBungleInfo.joinPeopleUrl[0]
                      ? detailBungleInfo.joinPeopleUrl[0]
                      : ""
                  }
                />
                <PostUserTexts>
                  <PostUserName>
                    {detailBungleInfo.joinPeopleNickname[0]}
                  </PostUserName>
                  <PostUserIntro>
                    {detailBungleInfo.joinPeopleIntro[0]}
                  </PostUserIntro>
                  <PostUserIcon>
                    <PostUserIconImg src={IconLightening} />
                    <PostUserIconText>
                      {detailBungleInfo.bungCount}??? ??????
                    </PostUserIconText>
                    <PostUserIconImg
                      src={
                        detailBungleInfo.mannerTemp >= 50
                          ? IconHighTemp
                          : detailBungleInfo.mannerTemp >= 25
                          ? IconMiddleTemp
                          : IconLowTemp
                      }
                    />
                    <PostUserIconText>
                      {detailBungleInfo.mannerTemp}??C
                    </PostUserIconText>
                  </PostUserIcon>
                </PostUserTexts>
              </PostUserBox>
              <PostBodyTextWrap>
                <PostBodyTitle>{detailBungleInfo.title}</PostBodyTitle>
                <PostBodyContent>{detailBungleInfo.content}</PostBodyContent>
                <PostCategoriesWrapper>
                  <PostCategoriesItem>
                    {detailBungleInfo.categories.join(" ?? ")}
                  </PostCategoriesItem>
                </PostCategoriesWrapper>
                <PostTagWrap>
                  {detailBungleInfo.tags.map((item, index) => {
                    return <PostTag key={item}>#{item}</PostTag>;
                  })}
                </PostTagWrap>
              </PostBodyTextWrap>
            </PostContent>
            <Divider />
            <PostMap>
              <div style={{ display: "flex" }}>
                <PostMapTitle>?????? ??????</PostMapTitle>
                <PostInfoTextWrap>{detailBungleInfo.place}</PostInfoTextWrap>
              </div>
              <PostMapView className="map" id="map" ref={container} />
            </PostMap>
            <Divider />
            <PostMemberWrap>
              <PostMemberTitle>
                ?????? ?????? ({detailBungleInfo.joinCount}/
                {detailBungleInfo.personnel}???)
              </PostMemberTitle>
              <Swiper
                style={{ marginLeft: "20px" }}
                spaceBetween={5}
                slidesPerView={3}
              >
                {detailBungleInfo.joinPeopleUrl.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <PostMemberCard>
                        <PostMemberPicture src={item} />
                        <PostMemberName>
                          {detailBungleInfo.joinPeopleNickname[index]}
                        </PostMemberName>
                      </PostMemberCard>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </PostMemberWrap>
            {detailBungleInfo.isLetter ? (
              <PostJoinButtonWrapper>
                {detailBungleInfo.joinCount === detailBungleInfo.personnel ? (
                  <>
                    <PostJoinIcon src={IconChatNo} />
                    <PostJoinButton
                      style={{
                        border: "none",
                        pointerEvents: "none",
                        backgroundColor: "#D9D9D9",
                        color: "#898989",
                      }}
                    >
                      <span style={{ marginLeft: "3px" }}>????????????</span>
                    </PostJoinButton>
                  </>
                ) : (
                  <>
                    <PostJoinIcon src={IconChat} style={{ marginTop: "2px" }} />
                    <PostJoinButton onClick={goToChatRoom}>
                      <span>????????????</span>
                    </PostJoinButton>
                  </>
                )}
              </PostJoinButtonWrapper>
            ) : (
              <PostJoinButtonWrapper>
                <span
                  className="material-icons-outlined"
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                    left: "128px",
                    top: "16px",
                  }}
                >
                  video_camera_front
                </span>
                {detailBungleInfo.joinCount === detailBungleInfo.personnel ? (
                  <>
                    <PostJoinButton
                      style={{
                        pointerEvents: "none",
                        backgroundColor: "#D9D9D9",
                        color: "#898989",
                      }}
                    >
                      ????????????
                    </PostJoinButton>
                  </>
                ) : (
                  <>
                    <PostJoinButton>????????????</PostJoinButton>
                  </>
                )}
              </PostJoinButtonWrapper>
            )}

            {/* Footer */}
            <FooterWrap>
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
          </PostWrap>
        </>
      )}
    </>
  );
};

export default Post;
