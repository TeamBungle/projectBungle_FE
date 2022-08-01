import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { editUserProfile } from "../redux/modules/BungleSlice";
import { useSelector } from "react-redux";
//Img
import profileSetImg from "../assets/icon-profilesetting.svg";
//CSS
import "../styles/ProfileSetting.css";
import {
  MapDetailHeaderWrap,
  ChattingBackKey,
  EditHeadrIconsWrap,
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

import IconHome from "../assets/icon-home.svg";
import IconLocation from "../assets/icon-location.svg";
import IconChat from "../assets/icon-chat.svg";
import IconMyBungleCurrent from "../assets/icon-mybungle-current.svg";
import IconCreate from "../assets/icon-create-post.svg";
import IconEdit from "../assets/icon-edit-footer.svg";

//icon
import IconBackKey from "../assets/icon-left-arrow.svg";

function MyPageSetting() {
  const isOwner = useSelector((state) => state.Bungle.isOwner);
  const userProfileInfo = useSelector((state) => state.Bungle.userProfile);
  //프로필 미리보기 state
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState(profileSetImg);
  //프로필 파일 객체
  const [file, setFile] = React.useState();
  const fileInput = React.useRef(null);

  const [isLoad, setIsLoad] = useState(true);
  const [receiveProfileUrl, setReceiveProfileUrl] = useState();

  // modal state
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (isLoad) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setIsLoad(false);
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (!isLoad) {
      setReceiveProfileUrl(userProfileInfo.profileUrl);
    }
  }, [isLoad]);

  //미리보기, 파일
  const onChange = (e) => {
    if (e.target.files[0]) {
      setReceiveProfileUrl("");
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setProfile(profileSetImg);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const nickName_Ref = useRef();
  const intro_Ref = useRef();

  const editUserProfileComplete = () => {
    const profileDto = {
      nickName: nickName_Ref.current.value.trim(),
      intro: intro_Ref.current.value.trim(),
    };

    const formData = new FormData();
    formData.append(
      "profileDto",
      new Blob(
        [JSON.stringify(profileDto, { contentType: "application/json" })],
        {
          type: "application/json",
        }
      )
    );
    if (file === undefined) {
      formData.append("profileImg ", "");
    } else {
      formData.append("profileImg ", file);
    }

    // 닉네임 예외 처리

    if( nickName_Ref.current.value.length < 2 || nickName_Ref.current.value.length > 15 ){
      setIsModal(true);
      setModalMessage("닉네임은 2자 이상 15자 이하입니다.");
      return null;
    }
    if (intro_Ref.current.value.length > 20) {
      setIsModal(true);
      setModalMessage("자기소개는 20자 이하입니다.");
      return null;
    }

    dispatch(editUserProfile({ formData, navigate }));
  };

  return (
    <div className="profile-setting-wrap">
      <MapDetailHeaderWrap>
        <ChattingBackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/mypage");
          }}
        />
        <EditHeadrIconsWrap
          onClick={() => {
            editUserProfileComplete();
          }}
        >
          완료
        </EditHeadrIconsWrap>
      </MapDetailHeaderWrap>
      <div className="profile-setting-profile">
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          name="profile_img"
          onChange={onChange}
          ref={fileInput}
        />
        <img
          src={receiveProfileUrl ? receiveProfileUrl : profile}
          alt=""
          style={{
            objectFit: "cover",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            fileInput.current.click();
          }}
        />
      </div>
      <div className="profile-setting-form">
        <div className="profile-setting-form-nickname">
          <label className="profile-setting-form-title">닉네임</label>
          <input
            ref={nickName_Ref}
            defaultValue={
              userProfileInfo.nickName ? userProfileInfo.nickName : ""
            }
            className="profile-setting-form-input"
            type="search"
            placeholder="닉네임을 입력해주세요."
          />
        </div>
        <div className="profile-setting-form-desc">
          <label className="profile-setting-form-title">자기소개</label>
          <input
            ref={intro_Ref}
            defaultValue={userProfileInfo.intro ? userProfileInfo.intro : ""}
            className="profile-setting-form-input"
            type="search"
            placeholder="자기소개를 입력해주세요."
          />
        </div>
      </div>
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
            <FooterIconImg src={IconMyBungleCurrent} />
            <FooterIconText style={{ color: "#FFC634" }}>
              나의 벙글
            </FooterIconText>
          </div>
        </FooterIconWrap>
      </MapFooterWrap>
      {isModal && (
        <ModalWrapper>
          <ModalOverlay>
            <ModalInner>
              <ModalContentWrap>
                <h3>프로필 수정 실패</h3>
                <div>{modalMessage}</div>
              </ModalContentWrap>
              <ModalDivider />
              <ModalButton
                onClick={() => {
                  setIsModal(false);
                }}
              >
                확인
              </ModalButton>
            </ModalInner>
          </ModalOverlay>
        </ModalWrapper>
      )}
    </div>
  );
}

export default MyPageSetting;
