import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAgreeLocation } from "../redux/modules/BungleSlice";

import {
  OnBoardWrapper,
  OnBoardContentWrap,
  OnBoardPageText,
  OnBoardPageImg,
  OnBoardButton,
  OnBoardFinalText,
  OnBoardFinalImg,
  CheckBox,
  CheckLabel,
  OnBoardSubText,
} from "../styles/StyledOnBoarding";

import "../styles/swiperStyles.css";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import { Pagination } from "swiper";

//img
import onboardPageText1 from "../assets/img-onboard-page1-title.svg";
import onboardPageText2 from "../assets/img-onboard-page2-title.svg";
import onboardPageText3 from "../assets/img-onboard-page3-title.svg";
import onboardPageText4 from "../assets/img-onboard-page4-title.svg";
import onboardPageText5 from "../assets/img-onboard-page5-title.svg";

import onboardPageImg1 from "../assets/img-onboard-page1.svg";
import onboardPageImg2 from "../assets/img-onboard-page2.svg";
import onboardPageImg3 from "../assets/img-onboard-page3.svg";
import onboardPageImg4 from "../assets/img-onboard-page4.svg";
import onboardPageImg5 from "../assets/img-onboard-page5.svg";

import onboardPageText6 from "../assets/img-onboard-page6-logo.svg";
import onboardPageImg6 from "../assets/img-onboard-page6-ilu.svg";

import onboardSubText from "../assets/img-onboard-subtext.svg";

function OnBoarding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {}, []);

  const checkBoxOnClickHandler = (event) => {
    setIsChecked(event.target.checked);
  };
  const closeOnboarding = () => {
    dispatch(userAgreeLocation({ navigate }));
  };

  const exitOnboardingClickHanlder = () => {
    navigate("/");
  };
  
  
    return (
      <div>
        <OnBoardWrapper>
          <Swiper
            style={{ width: "375px" }}
            pagination={true}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <OnBoardContentWrap>
                <OnBoardPageText src={onboardPageText1} />
                <OnBoardPageImg src={onboardPageImg1} />
              </OnBoardContentWrap>
            </SwiperSlide>
            <SwiperSlide>
              <OnBoardContentWrap>
                <OnBoardPageText src={onboardPageText2} />
                <OnBoardPageImg src={onboardPageImg2} />
              </OnBoardContentWrap>
            </SwiperSlide>
            <SwiperSlide>
              <OnBoardContentWrap>
                <OnBoardPageText src={onboardPageText3} />
                <OnBoardPageImg src={onboardPageImg3} />
              </OnBoardContentWrap>
            </SwiperSlide>
            <SwiperSlide>
              <OnBoardContentWrap>
                <OnBoardPageText src={onboardPageText4} />
                <OnBoardPageImg src={onboardPageImg4} />
              </OnBoardContentWrap>
            </SwiperSlide>
            <SwiperSlide>
              <OnBoardContentWrap>
                <OnBoardPageText src={onboardPageText5} />
                <OnBoardPageImg src={onboardPageImg5} />
              </OnBoardContentWrap>
            </SwiperSlide>
            <SwiperSlide>
              <OnBoardContentWrap>
                {/* <span
                  style={{
                    fontSize: "16px",
                    position: "relative",
                    right: "-165px",
                    top: "15px",
                    cursor: "pointer",
                  }}
                  className="material-icons"
                  onClick={() => {
                    exitOnboardingClickHanlder();
                  }}
                >
                  {" "}
                  clear{" "}
                </span> */}
                <OnBoardFinalText src={onboardPageText6} />
                <OnBoardFinalImg src={onboardPageImg6} />
                <div style={{ display: "flex" }}>
                  <CheckBox
                    type="checkbox"
                    onChange={(event) => checkBoxOnClickHandler(event)}
                  />
                  <CheckLabel htmlFor="check">
                    벙글의 위치 기반 서비스 이용에 동의하십니까?
                  </CheckLabel>
                </div>
                <OnBoardSubText src={onboardSubText} />
              </OnBoardContentWrap>
            </SwiperSlide>
          </Swiper>
          {!isChecked ? (
            <OnBoardButton>시작하기</OnBoardButton>
          ) : (
            <OnBoardButton
              style={{ backgroundColor: "#FFC632" }}
              onClick={() => {
                closeOnboarding();
              }}
            >
              시작하기
            </OnBoardButton>
          )}
        </OnBoardWrapper>
      </div>
    );
  }


export default OnBoarding;
