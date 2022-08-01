import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMainBungleList,
  likeBungleList,
  moreBungleList,
  getIntervalNotification,
  LogOut,
  Withdrawal,
} from "../redux/modules/BungleSlice";

import { getCookie } from "../customapi/CustomCookie";

import Loading from "../components/Loading";

import Tag from "../components/Tag";
import Search from "../components/Search";
import Category from "../components/Category";

import {
  MainWrap,
  ContentDivide,
  MainContentWrap,
  MainContentTitle,
  MainContentItemWrap,
  MainContentItemFrame,
  MainContentItemDefalutWrap,
  MainContentItemImgDefault,
  MainContentItemImg,
  MainContentItemImgTemp,
  MainContentTextWrap,
  MainContentTitleWrap,
  MainContentItemTitle,
  MainContentItemLike,
  MainContentItemTimePeople,
  MainContentButton,
} from "../styles/StyledMain.js";

import {
  MainHeaderWrap,
  MainHeaderLogo,
  MainHeaderIconsWrap,
  IconMyLocation,
  IconSetting,
  IconNotification,
} from "../styles/StyledHeader";

// css
import "../styles/Setting.css";
import {
  FooterWrap,
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
  ModalButtonWrap,
  ModalCancelButton,
  ModalDeleteButton,
} from "../styles/StyledLogin";
import { MapPageTitle } from "../styles/StyledHeader";
import Divider from "../components/Divider";

import {
  PostHeaderWrap,
  ChattingBackKey,
  HeadrIconsWrap,
} from "../styles/StyledHeader.js";

//icons
import IconLike from "../assets/icon-like.svg";
import IconUnlike from "../assets/icon-unlike.svg";
import defaultCardImg from "../assets/icon-main-default.svg";
import IconHighTemp from "../assets/icon-manner-high.svg";
import IconMiddleTemp from "../assets/icon-manner-middle.svg";
import IconLowTemp from "../assets/icon-manner-low.svg";
import IconMainLogo from "../assets/icon-main-logo.svg";

import IconMyPoint from "../assets/icon-mylocation.svg";
import Notification from "../assets/icon-notification.svg";
import NotificationOn from "../assets/icon-notification-on.svg";
import Setting from "../assets/icon-setting.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";

// Footer Icons
import IconHomeCurrent from "../assets/icon-home-current.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungae from "../assets/icon-account.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";

function Main() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

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

  const ownerCheck = useSelector((state) => state.Bungle.isOwner);

  // dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();

  const realTimeList = useSelector((state) => state.Bungle.realTime);
  const endTimeList = useSelector((state) => state.Bungle.endTime);

  // 벙글 리스트 전체 조회하기
  // 현위치 찾아오기
  // 지도 경도, 위도 State
  // location 정보 저장
  const [location, setLocation] = useState();
  // 에러 메세지 저장
  const [error, setError] = useState();
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

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
  const handleError = (error) => {
    setError(error.message);
    console.log(error.code);
    console.log(error.message);
    if (error.message === "User denied Geolocation") {
      alert("사이트 설정에서 GPS 설정을 켜주세요");
    }
  };

  // GPS 아이콘 클릭, update position
  const getCurrentLocationBtnClick = () => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
    dispatch(getMainBungleList(location));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(getMainBungleList(location));
    }
  }, [location]);

  // 실시간 벙글 하트 state
  const [isRealTimeHeart, setIsRealTimeHeart] = useState([
    false,
    false,
    false,
    false,
  ]);
  // 평균 매너 온도 하트 state
  const [isMannerHeart, setIsMannerHeart] = useState([
    false,
    false,
    false,
    false,
  ]);
  // 마감 임박순 하트 state
  const [isEndTimeHeart, setIsEndTimeHeart] = useState([
    false,
    false,
    false,
    false,
  ]);

  // 실시간 벙글 하트 클릭
  const HeartRealTimeClickHanlder = (realTimeIndex, postId) => {
    setIsRealTimeHeart(
      isRealTimeHeart.map((item, Checkedindex) => {
        if (Checkedindex === realTimeIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };
  // 평균 매너 온도 하트 클릭
  const HeartMannerClickHandler = (mannerIndex, postId) => {
    setIsMannerHeart(
      isMannerHeart.map((item, Checkedindex) => {
        if (Checkedindex === mannerIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };
  // 마감 임박순 벙글 하트 클릭
  const HeartEndTimeClickHandler = (endTimeIndex, postId) => {
    setIsEndTimeHeart(
      isEndTimeHeart.map((item, Checkedindex) => {
        if (Checkedindex === endTimeIndex) {
          return (item = !item);
        } else {
          return item;
        }
      })
    );
    dispatch(likeBungleList(postId));
  };

  // 더보기 클릭
  const MoreBtnClickHandler = (status) => {
    if (status === "realTime") {
      dispatch(moreBungleList({ status, location, navigate }));
    } else if (status === "manner") {
      // navigate("/tagsearch");
    } else {
      dispatch(moreBungleList({ status, location, navigate }));
    }
  };

  // 게시물 상세 조회
  const showDetailBungle = (postId) => {
    navigate(`/detailpost/${postId}`);
  };

  const researchOnClickHandler = () => {
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLSdYv_eLc3Bug9ZUUe6UVcbwQJXx98qfoMw_bCKaDX9Xerut2g/viewform?usp=sf_link";
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
    localStorage.removeItem("userAgree");
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

  if (!location || (!realTimeList && !endTimeList)) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  return (
    <>
      <MainWrap>
        <MainHeaderWrap>
          <MainHeaderLogo src={IconMainLogo} />
          <MainHeaderIconsWrap>
            <div
              style={{
                marginLeft: "20px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => {
                researchOnClickHandler();
              }}
            >
              ⭐이벤트 참여 Click!⭐
            </div>
            <IconMyLocation
              src={IconMyPoint}
              style={{ visibility: "hidden" }}
              onClick={() => {
                getCurrentLocationBtnClick();
              }}
            />
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
          </MainHeaderIconsWrap>
        </MainHeaderWrap>
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
                    <HeadrIconsWrap></HeadrIconsWrap>
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
        {/* <Tag /> 인기 태그 막기*/}
        <Search location={location} />
        <Category location={location} />
        <ContentDivide />
        {/* 실시간 벙글 */}
        <MainContentWrap>
          <MainContentTitle>실시간 벙글</MainContentTitle>
          <MainContentItemWrap>
            {realTimeList.map((item, index) => {
              return (
                <MainContentItemFrame key={index}>
                  {item.postUrl ? (
                    <MainContentItemImg
                      src={item.postUrl}
                      onClick={() => {
                        showDetailBungle(item.postId);
                      }}
                    />
                  ) : (
                    <MainContentItemDefalutWrap style={{ marginBottom: "7px" }}>
                      <MainContentItemImgDefault
                        src={defaultCardImg}
                        onClick={() => {
                          showDetailBungle(item.postId);
                        }}
                      />
                    </MainContentItemDefalutWrap>
                  )}
                  <MainContentItemImgTemp
                    src={
                      item.avgTemp >= 50
                        ? IconHighTemp
                        : item.avgTemp >= 25
                        ? IconMiddleTemp
                        : IconLowTemp
                    }
                  />
                  <MainContentTextWrap>
                    <MainContentTitleWrap>
                      <MainContentItemTitle
                        onClick={() => {
                          showDetailBungle(item.postId);
                        }}
                      >
                        {item.title}
                      </MainContentItemTitle>
                      <MainContentItemLike
                        src={item.isLike ? IconLike : IconUnlike}
                        onClick={() =>
                          HeartRealTimeClickHanlder(index, item.postId)
                        }
                      />
                    </MainContentTitleWrap>
                    <MainContentItemTimePeople>
                      {item.time} ({item.joinCount}/{item.personnel})
                    </MainContentItemTimePeople>
                  </MainContentTextWrap>
                </MainContentItemFrame>
              );
            })}
          </MainContentItemWrap>
          <MainContentButton onClick={() => MoreBtnClickHandler("realTime")}>
            더보기
          </MainContentButton>
        </MainContentWrap>
        {/* 평균 매너가 좋은 벙글 */}
        {/* <MainContentWrap>
        <MainContentTitle>평균 매너가 좋은 벙글</MainContentTitle>
        <MainContentItemWrap>
          {ContentArray.map((item, index) => {
            return (
              <MainContentItemFrame key={index}>
                <MainContentItemImg />
                <MainContentItemImgTemp src={IconTemp} />
                <MainContentTextWrap>
                  <MainContentTitleWrap>
                    <MainContentItemTitle>{item}</MainContentItemTitle>
                    <MainContentItemLike src={ isMannerHeart[ index ] ? IconLike : IconUnlike} onClick={ () => { HeartMannerClickHandler( index ) }}/>
                  </MainContentTitleWrap>
                  <MainContentItemTimePeople>
                    16시 시작 예정 (0/5)
                  </MainContentItemTimePeople>
                </MainContentTextWrap>
              </MainContentItemFrame>
            );
          })}
        </MainContentItemWrap>
        <MainContentButton onClick={ () => { MoreBtnClickHandler( "manner" ) } }>더보기</MainContentButton>
      </MainContentWrap> */}
        {/* 마감 임박순 벙글 */}
        <MainContentWrap>
          <MainContentTitle>마감 임박순 벙글</MainContentTitle>
          <MainContentItemWrap>
            {endTimeList.map((item, index) => {
              return (
                <MainContentItemFrame key={index}>
                  {item.postUrl ? (
                    <MainContentItemImg
                      src={item.postUrl}
                      onClick={() => {
                        showDetailBungle(item.postId);
                      }}
                    />
                  ) : (
                    <MainContentItemDefalutWrap style={{ marginBottom: "7px" }}>
                      <MainContentItemImgDefault
                        src={defaultCardImg}
                        onClick={() => {
                          showDetailBungle(item.postId);
                        }}
                      />
                    </MainContentItemDefalutWrap>
                  )}
                  <MainContentItemImgTemp
                    src={
                      item.avgTemp >= 50
                        ? IconHighTemp
                        : item.avgTemp >= 25
                        ? IconMiddleTemp
                        : IconLowTemp
                    }
                  />
                  <MainContentTextWrap>
                    <MainContentTitleWrap>
                      <MainContentItemTitle
                        onClick={() => {
                          showDetailBungle(item.postId);
                        }}
                      >
                        {item.title}
                      </MainContentItemTitle>
                      <MainContentItemLike
                        src={item.isLike ? IconLike : IconUnlike}
                        onClick={() => {
                          HeartEndTimeClickHandler(index, item.postId);
                        }}
                      />
                    </MainContentTitleWrap>
                    <MainContentItemTimePeople>
                      {item.time} ({item.joinCount}/{item.personnel})
                    </MainContentItemTimePeople>
                  </MainContentTextWrap>
                </MainContentItemFrame>
              );
            })}
          </MainContentItemWrap>
          <MainContentButton
            onClick={() => {
              MoreBtnClickHandler("endTime");
            }}
          >
            더보기
          </MainContentButton>
        </MainContentWrap>
        <FooterWrap>
          <FooterIconWrap
            onClick={() => {
              navigate("/main");
            }}
          >
            <FooterIconImg src={IconHomeCurrent} />
            <FooterIconText style={{ color: "#FFC632" }}>홈</FooterIconText>
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
      </MainWrap>
      {/* )} */}
    </>
  );
}
// }

export default Main;
