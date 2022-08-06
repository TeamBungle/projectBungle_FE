import React, { useState, useRef, useEffect } from "react";
import "../../styles/SignUp.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

// styled css
import {
  SignUpWrapper,
  SignUpTitle,
  SiginUpEmailWrapper,
  SignUpEmailInput,
  SignUpInputClearBtn,
  SignUpPasswordWrapper,
  SignUpPasswordInput,
  SignUpPasswordClearBtn,
  SignUpPasswordConfirmClearBtn,
  SiginUpButton,
  ErrorMessage,
  // Moadl
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContentWrap,
  ModalDivider,
  ModalButton,
} from "../../styles/StyledSiginUp";

import {
  PostHeaderWrap,
  ChattingBackKey,
  PageTitle,
  HeadrIconsWrap,
  IconNotification,
  IconSetting,
} from "../../styles/StyledHeader.js";

// icon
// header icon
import Notification from "../../assets/icon-notification.svg";
import Setting from "../../assets/icon-setting.svg";
import IconBackKey from "../../assets/icon-left-arrow.svg";

import IconInputClear from "../../assets/icon-input-xbtn.svg";

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  //비밀번호 유효성 검사
  const checkPassword = (e) => {
    //  8 ~ 30자 영문, 숫자 조합, 문자 조합
    var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    // /^(?=.*\d)(?=.*[a-zA-Z~!@#$%";'^,&*()_+|</>=>`?:{[}])[0-9a-zA-Z~!@#$%";'^,&*()_+|</>=>`?:{[}]{8,30}$/;
    // 형식에 맞는 경우 true 리턴
    if (!regExp.test(e.target.value)) {
      setIsSetPassword(false);
      setPasswordMessage("*비밀번호 형식이 틀립니다.");
    } else {
      setIsSetPassword(true);
      setPasswordMessage("*비밀번호 형식이 올바릅니다.");
    }
  };

  // 이메일 유효성 검사
  const checkID = (e) => {
    var emailRegEx =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    // 형식에 맞는 경우 true 리턴
    if (!emailRegEx.test(e.target.value)) {
      setEmailMessage("*메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
      setDuplicateEmail(false);
    } else {
      setEmailMessage("*메일 형식이 올바릅니다.");
      setIsEmail(true);
    }
  };
  const navigate = useNavigate();

  const id_ref = useRef(null);
  const pw_ref = useRef(null);
  const pwcheck_ref = useRef(null);

  // 한글 입력 방지 email state
  const [notHangle, setNotHangle] = useState();
  // 비밀번호 State
  const [isPassword, setIsPassword] = useState();
  // 비밀번호 clear btn state
  const [isPasswordClear, setIsPasswordClear] = useState(false);
  // 비밀번호 state
  const [completeSingin, setCompleteSigin] = useState(false);
  // 비밀번호 확인 State
  const [isPasswordConfirm, setIsPasswordConfirm] = useState();
  // 비밀번호 확인 clear btn state
  const [isPasswordConfirmClear, setIsPasswordConfirmClear] = useState(false);
  // email clear btn state
  const [isEmailClear, setIsEmailClear] = useState(false);
  // Modal state
  const [isModal, setIsModal] = useState(false);

  // email error message
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  // password error message
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isSetPassword, setIsSetPassword] = useState(false);

  // 이메일 입력 한글 방지
  const notInputHangleInputHandler = (event) => {
    setNotHangle(event.target.value.replace(/[^a-zA-Z-_0-9@.]/g, ""));
    const RegEx = /[^a-zA-Z-_0-9@.]/g;

    if (RegEx.test(event.target.value)) {
      event.target.value = "";
    }
    
    if (event.target.value.length > 0) {
      checkID(event);
      setIsEmailClear(true);
    } else {
      setIsEmailClear(false);
    }
  };

  // modal onclick
  const ModalOnClickHandler = () => {
    setIsModal(false);
    navigate("/");
  };

  // 가입하기 onclick
  const SignUpClick = async () => {
    const SignUserInfo = {
      username: id_ref.current.value,
      password: pw_ref.current.value,
      passwordCheck: pwcheck_ref.current.value,
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/user/signup`,
        SignUserInfo
      );
      if (response.data.response) {
        setIsModal(true);
      } else {
        alert(response.data.message);
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  // email clear click
  const emailClearClickHanlder = () => {
    setNotHangle("");
    setDuplicateEmail(false);
    setIsEmail(false);
    setEmailMessage("");
    setIsEmailClear(false);
  };

  // password clear click
  const passwordClearClickHandler = () => {
    setIsPassword("");
    setIsSetPassword(false);
    setIsPasswordClear(false);
  };

  // password clear click
  const passwordConfirmClearClickHandler = () => {
    setIsPasswordConfirm("");
    setCompleteSigin(false);
    setIsPasswordConfirmClear(false);
  };

  // 비밀번호 입력시 clear 아이콘 보이기
  const appearPasswordClearBtnHandler = (event) => {
    if (event.target.value.length > 0) {
      setIsPassword(event.target.value);
      checkPassword(event);
      setIsPasswordClear(true);
    } else {
      setIsPassword("");
      setIsPasswordClear(false);
    }
  };

  const checkConfirmPassword = (event) => {
    if (event.target.value !== pw_ref.current.value) {
      setPasswordMessage("*비밀번호가 다릅니다.");
      setIsSetPassword(false);
      setCompleteSigin(false);
    } else {
      setPasswordMessage("*비밀번호가 동일합니다.");
      setIsSetPassword(true);
      setCompleteSigin(true);
    }
  };

  // 비밀번호 확인 입력시 clear 아이콘 보이기
  const appearPasswordConfirmClearBtnHandler = (event) => {
    if (event.target.value.length > 0) {
      setIsPasswordConfirm(event.target.value);
      checkConfirmPassword(event);
      setIsPasswordConfirmClear(true);
    } else {
      setIsPasswordConfirm("");
      setIsPasswordConfirmClear(false);
    }
  };

  const [duplicateEmail, setDuplicateEmail] = useState(false);

  // onKeyUp
  const onKeyUp = (event) => {
    let timer;
    // 메일 형식이 맞고, duplicate 가 체크되지 않으면 키가 떨어지고 1.2초 후에 서버에 요청
    if (isEmail) {
      if (!duplicateEmail) {
        timer = setTimeout(async () => {
          const response = await axios.post(
            `${SERVER_URL}/user/duplicate/username`,
            { username: event.target.value }
          );
          
          setIsEmail(false);
          setEmailMessage(response.data.message);
          setDuplicateEmail(response.data.response);
        }, 1200);
      } else {
        return () => {
          clearTimeout(timer);
        };
      }
    }
  };

  return (
    <SignUpWrapper>
      {/* 헤더 */}
      <PostHeaderWrap>
        <ChattingBackKey
          src={IconBackKey}
          onClick={() => {
            navigate("/");
          }}
        />
        <PageTitle>회원 가입</PageTitle>
        <HeadrIconsWrap>
          <IconNotification
            style={{ visibility: "hidden" }}
            src={Notification}
          />
          <IconSetting style={{ visibility: "hidden" }} src={Setting} />
        </HeadrIconsWrap>
      </PostHeaderWrap>
      <SiginUpEmailWrapper>
        <SignUpTitle>이메일</SignUpTitle>
        <SignUpEmailInput
          type="email"
          ref={id_ref}
          placeholder="email@example.com"
          maxLength={25}
          value={notHangle || ""}
          onChange={notInputHangleInputHandler}
          onKeyUp={onKeyUp}
        />
        <ErrorMessage style={{ visibility: isEmail ? "hidden" : "visible" }}>
          {emailMessage}
        </ErrorMessage>
        {isEmailClear && (
          <SignUpInputClearBtn
            src={IconInputClear}
            onClick={emailClearClickHanlder}
          />
        )}
      </SiginUpEmailWrapper>
      <SignUpPasswordWrapper>
        <SignUpTitle>비밀번호</SignUpTitle>
        <SignUpPasswordInput
          type="password"
          ref={pw_ref}
          placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
          maxLength={25}
          value={isPassword || ""}
          onChange={appearPasswordClearBtnHandler}
        />
        {isPasswordClear && (
          <SignUpPasswordClearBtn
            src={IconInputClear}
            onClick={passwordClearClickHandler}
          />
        )}
        <SignUpPasswordInput
          type="password"
          ref={pwcheck_ref}
          placeholder="비밀번호 확인"
          maxLength={25}
          value={isPasswordConfirm || ""}
          onChange={appearPasswordConfirmClearBtnHandler}
        />
        <ErrorMessage
          style={{ visibility: isSetPassword ? "hidden" : "visible" }}
        >
          {passwordMessage}
        </ErrorMessage>
        {isPasswordConfirmClear && (
          <SignUpPasswordConfirmClearBtn
            src={IconInputClear}
            onClick={passwordConfirmClearClickHandler}
          />
        )}
      </SignUpPasswordWrapper>

      {completeSingin && isSetPassword && duplicateEmail ? (
        <SiginUpButton
          style={{ backgroundColor: " #FFC634", color: "black" }}
          onClick={SignUpClick}
        >
          가입하기
        </SiginUpButton>
      ) : (
        <SiginUpButton>가입하기</SiginUpButton>
      )}
      {isModal && (
        <ModalWrapper>
          <ModalOverlay>
            <ModalInner>
              <ModalContentWrap>
                <h3>인증 메일을 발송했습니다.</h3>
                <span>
                  메일함에서 이메일 인증하기 버튼을
                  <br />
                  누르면 이메일 인증이 완료됩니다.
                </span>
              </ModalContentWrap>
              <ModalDivider />

              <ModalButton
                onClick={() => {
                  ModalOnClickHandler();
                }}
              >
                확인
              </ModalButton>
            </ModalInner>
          </ModalOverlay>
        </ModalWrapper>
      )}
    </SignUpWrapper>
  );
};

export default Signup;
