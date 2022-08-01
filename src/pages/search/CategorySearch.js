import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CategorySearchCard from "./CategorySearchCard";
import {
  getIntervalNotification,
  LogOut,
  Withdrawal,
} from "../../redux/modules/BungleSlice";
import { getCookie } from "../../customapi/CustomCookie";

//CSS
import "../../styles/TagCategorySearch.css";
import "../../styles/Setting.css";
//Components

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

// icon
import Notification from "../../assets/icon-notification.svg";
import NotificationOn from "../../assets/icon-notification-on.svg";
import Setting from "../../assets/icon-setting.svg";
import IconBackKey from "../../assets/icon-left-arrow.svg";

// Footer Icons
import IconHomeCurrent from "../../assets/icon-home-current.svg";
import IconLocation from "../../assets/icon-location.svg";
import IconChat from "../../assets/icon-chat.svg";
import IconMyBungae from "../../assets/icon-account.svg";
import IconCreate from "../../assets/icon-create-post.svg";
import IconEdit from "../../assets/icon-edit-footer.svg";

function CategorySearch() {
  let refreshToken = getCookie("refresh_token");
  let token = localStorage.getItem("login-token");

  const dispatch = useDispatch();
  const ownerCheck = useSelector((state) => state.Bungle.isOwner);
  // isLoad
  const [isLoad, setIsLaod] = useState(true);
  //
  const categoryList = useSelector((state) => state.Bungle.categoriesList);
  // console.log( categoryList );

  const navigate = useNavigate();
  const { category } = useParams();

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

  // 알림 interval
  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //검색 정렬 드롭박스
  const [selected, setSelected] = React.useState("최신순");
  const handleSelect = (e) => {
    // console.log(e.target.value);
    setSelected(e.target.value);
  };
  // console.log(selected);
  const searchOptions = [
    { key: 1, value: "최신순" },
    { key: 2, value: "인기순" },
  ];

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
    <div className="top-category-search-wrap">
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
                    {/* {notificationState ? (
                        <IconNotification
                          src={NotificationOn}
                          onClick={() => {
                            navigate("/notification");
                          }}
                        />
                      ) : (
                        <IconNotification src={Notification} />
                      )} */}
                    {/* <span className="material-icons"> clear </span> */}
                    {/* <IconSetting
                        style={{ visibility: "hidden" }}
                        src={Setting}
                      /> */}
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
      <div className="search-result-wrap">
        <div className="search-result-header">
          <p className="search-result-header-title">{category}</p>
        </div>
        <div className="search-result-card-wrap">
          {categoryList ? (
            categoryList.map((item, index) => {
              return <CategorySearchCard categoryList={item} />;
            })
          ) : (
            <LoadingWrap>
              <LoadingText style={{ marginTop: "80%", color: "#898989" }}>
                검색 결과 벙글이 없습니다.
              </LoadingText>
            </LoadingWrap>
          )}
        </div>
      </div>
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
    </div>
  );
}

export default CategorySearch;
