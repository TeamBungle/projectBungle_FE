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

//채팅 입장 client
const Post = () => {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);
  const navigate = useNavigate();
  // 알림 interval
  const interval = useRef(null);
  // 알람 추가
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

  // 알림 setInterval
  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    // postId가 있을 경우, dispatch 실행
    dispatch(detailBungleList(postId));
    window.scrollTo(0, 0);
  }, [postId]);

  useEffect(() => {
    if (detailBungleInfo.latitude) {
      // latitude 값이 들어왔을 경우 실행
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        center: new kakao.maps.LatLng(
          detailBungleInfo.latitude,
          detailBungleInfo.longitude
        ), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
      // 마커 생성
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

  //참여하기 버튼 클릭 시 해당 채팅방으로 이동
  const goToChatRoom = () => {
    navigate(`/chat/${postId}`);
  };

  const goToVideoRoom = () => {
    navigate(`/videochat/${postId}`);
  };

  // 좋아요 클릭

  const isLikeClick = (postId) => {
    dispatch(detailLikeBungleList(postId));
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
      {/* Urls가 있으면 렌더링 */}
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
                      {detailBungleInfo.bungCount}회 참여
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
                      {detailBungleInfo.mannerTemp}°C
                    </PostUserIconText>
                  </PostUserIcon>
                </PostUserTexts>
              </PostUserBox>
              <PostBodyTextWrap>
                <PostBodyTitle>{detailBungleInfo.title}</PostBodyTitle>
                <PostBodyContent>{detailBungleInfo.content}</PostBodyContent>
                <PostCategoriesWrapper>
                  <PostCategoriesItem>
                    {detailBungleInfo.categories.join(" · ")}
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
                <PostMapTitle>번개 위치</PostMapTitle>
                <PostInfoTextWrap>{detailBungleInfo.place}</PostInfoTextWrap>
              </div>
              <PostMapView className="map" id="map" ref={container} />
            </PostMap>
            <Divider />
            <PostMemberWrap>
              <PostMemberTitle>
                참여 인원 ({detailBungleInfo.joinCount}/
                {detailBungleInfo.personnel}명)
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
                      <span style={{ marginLeft: "3px" }}>참여하기</span>
                    </PostJoinButton>
                  </>
                ) : (
                  <>
                    <PostJoinIcon src={IconChat} style={{ marginTop: "2px" }} />
                    <PostJoinButton onClick={goToChatRoom}>
                      <span>참여하기</span>
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
                      참여하기
                    </PostJoinButton>
                  </>
                ) : (
                  <>
                    <PostJoinButton>참여하기</PostJoinButton>
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
                  <FooterIconImg src={IconMyBungae} />
                  <FooterIconText>나의 벙글</FooterIconText>
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
