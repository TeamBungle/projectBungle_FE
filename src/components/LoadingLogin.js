import React from 'react'
import { useNavigate } from "react-router-dom";
import { setCookie } from "../customapi/CustomCookie";
import moment from "moment";
import axios from 'axios';

import { LoadingWrap, LoadingLogo, LoadingText } from "../styles/StyledLoading";

// icon
import IconLoadingLogo from "../assets/icon-splash-logo.svg";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 소셜 로그인 Redirection

function LoadingLogin() {
    const navigate = useNavigate();
    // 소셜 로그인 처리
    const code = new URL(window.location.href).searchParams.get("code");
    const url = new URL(window.location.href);
  
    // 네이버 소셜 로그인 시작
    // 네이버 소셜 로그인 시도 후, JWT 토큰 획득
    const getNaverLoginJWTtoken = async () => { 
      try {
        const response = await axios.get(`${SERVER_URL}/user/signin/naver`, {
          params: {
            code: code,
            state: createStateToken(code),
          },
        });
        // console.log(response);
        if (response.data.response) {
          localStorage.setItem("login-token", response.headers.authorization);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem(
            "expireAt",
            moment().add(30, "minute").format("yyyy-MM-DD HH:mm:ss")
          );
          setCookie("refresh_token", response.headers.refreshtoken, {
            path: "/",
            secure: true,
          });
          
          if( !response.data.agreedLbs ){
            navigate("/onboard");
          }else{
            navigate("/main");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const createStateToken = (code) => {
      const md5 = require("md5");
      return md5(code).slice(0, 16);
    };
    
    // 카카오 소셜 로그인 시작
    // 카카오 소셜 로그인 시도 후, JWT 토큰 획득
    const getKakaoLoginJWTtoken = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/user/signin/kakao`, {
          params: {
            code: code,
          },
        });
        // console.log(response);
        if (response.data.response) {
          localStorage.setItem("login-token", response.headers.authorization);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem(
            "expireAt",
            moment().add(30, "minute").format("yyyy-MM-DD HH:mm:ss")
          );
          setCookie("refresh_token", response.headers.refreshtoken, {
            path: "/",
            secure: true,
          });
          
          if( !response.data.agreedLbs ){
            navigate("/onboard");
          }else{
            navigate("/main");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // 구글 소셜 로그인 시작
    // 구글 소셜 로그인 시도 후, JWT 토큰 획득
    const getGoogleLoginJWTtoken = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/user/signin/google`, {
          params: {
            code: code,
          },
        });
        console.log(response);
        if (response.data.response) {
          localStorage.setItem("login-token", response.headers.authorization);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem(
            "expireAt",
            moment().add(30, "minute").format("yyyy-MM-DD HH:mm:ss")
          );
          setCookie("refresh_token", response.headers.refreshtoken, {
            path: "/",
            secure: true,
          });
          
          if( !response.data.agreedLbs ){
            navigate("/onboard");
          }else{
            navigate("/main");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    if (code !== null) {
      if (url.href.includes("state")) {
        getNaverLoginJWTtoken();
      } else if (url.href.includes("scope")) {
        getGoogleLoginJWTtoken();
      } else {
        getKakaoLoginJWTtoken();
      }
    }
  
  return (
    <LoadingWrap>
        <LoadingLogo src={IconLoadingLogo}/>
        <LoadingText>잠시만 기다려주세요</LoadingText>
    </LoadingWrap>
  )
}

export default LoadingLogin