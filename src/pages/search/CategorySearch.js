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

  // ?????? interval
  useEffect(() => {
    interval.current = setInterval(async () => {
      dispatch(getIntervalNotification());
    }, 5000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //?????? ?????? ????????????
  const [selected, setSelected] = React.useState("?????????");
  const handleSelect = (e) => {
    // console.log(e.target.value);
    setSelected(e.target.value);
  };
  // console.log(selected);
  const searchOptions = [
    { key: 1, value: "?????????" },
    { key: 2, value: "?????????" },
  ];

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
                  <MapPageTitle>??????</MapPageTitle>
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
                ?????? ?????? ????????? ????????????.
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
          <FooterIconText style={{ color: "#FFC632" }}>???</FooterIconText>
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
    </div>
  );
}

export default CategorySearch;
