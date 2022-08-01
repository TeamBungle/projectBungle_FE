import React from 'react'
import { LoadingWrap, LoadingLogo, LoadingText } from "../styles/StyledLoading";

// icon
import IconLoadingLogo from "../assets/icon-splash-logo.svg";

function Loading() {
  return (
    <LoadingWrap>
        <LoadingLogo src={IconLoadingLogo}/>
        <LoadingText>잠시만 기다려주세요</LoadingText>
    </LoadingWrap>
  )
}

export default Loading