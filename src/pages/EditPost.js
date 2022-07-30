/* global kakao */
import React, { useRef, useState, useEffect } from "react";
import Divider from "../components/Divider";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 삭제시 client disconnect test

// import redux slice
import {
  getMyBungleList,
  editMyBungleList,
  deleteMyBungleList,
} from "../redux/modules/BungleSlice";

// slider 추가
import Slider from "rc-slider";
import "../styles/rc-slider/index.css";
// 다음 주소 검색 API 추가
import DaumPostCode from "react-daum-postcode";

// css styled
import {
  CreatePostWrap,
  PostTilteDiv,
  PostTitle,
  PostBody,
  PostUploadPictureWrap,
  // 파일 업로드
  UploadTitle,
  UploadPictureWrap,
  FileUploadWrap,
  FileInputLabel,
  FileInputImg,
  FileClearIcon,
  FileInput,
  DividerStyle,
  // 카테고리 설정
  PostCategoriesWrap,
  PostCategoriesItemWrap,
  PostCategoriesItem,
  // 채팅 설정
  SelectChatWrap,
  SelectChatBox,
  SelectChatBtnWrap,
  SelectChatLetterBtn,
  SelectChatVideoBtn,
  SelectChatBtnName,
  SelectChatBtnImg,
  // 해쉬태그
  HashTagWrap,
  HashTagInput,
  HashTagItemWrap,
  HashTagItem,
  // 주소 입력
  SearchAddressWrap,
  SearchAddressItemWrap,
  SearchAddressInput,
  SearhAddressBtn,
  SearhAddressCloseBtn,
  SearchCurrentPositionItemWrap,
  SearchCurrentPositionIcon,
  SearchCurrentPositionTitle,
  SearchCurrentPositionIconInput,
  // 시간 설정
  SetTimeWapper,
  TimeItemWapper,
  TimeSelectToday,
  TimeSelectTommrow,
  TimeInputWrapper,
  TimeInputHour,
  TimeInputMinute,
  // 인원수 설정
  PostPeopleCount,
  PostPeopleCountTitleWrap,
  PostPeopleTitle,
  PostPeopleCountTitle,
  // 게시글 작성 버튼
  PostCreateButton,
} from "../styles/StyledEditPost";
import {
  PostHeaderWrap,
  ChattingBackKey,
  PageTitle,
  EditHeadrIconsWrap,
} from "../styles/StyledHeader.js";

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
  ModalButton,
} from "../styles/StyledLogin";

//icon
import IconClear from "../assets/icon-clear.svg";
import IconUpload from "../assets/icon-upload.svg";
import IconMylocation from "../assets/icon-mylocation-gray.svg";
import IconBackKey from "../assets/icon-left-arrow.svg";

function EditPost() {
  //delete modal state
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  // modal state
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // chat test
  const client = useSelector((state) => state.Bungle.ChatClient.client);
  const guest = useSelector((state) => state.Bungle.ChatClient.guest);
  const Owner = useSelector((state) => state.Bungle.OnwerPostId);
  // console.log( client, guest, Owner );
  // dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  // 현재 시간
  const getCurrentHour = new Date().getHours();
  const currentHour = ("0" + getCurrentHour).slice(-2);
  const getCurrentMinute = new Date().getMinutes();
  const currentMinute = ("0" + getCurrentMinute).slice(-2);
  // 게시물 수정 dispatch 시작
  // isLoad
  const [isLoad, setIsLoad] = useState(true);
  // 나의 벙글 가져오기
  const myBungle = useSelector((state) => state.Bungle.myBunglePost);
  // console.log(myBungle);
  // load
  useEffect(() => {
    if (isLoad) {
      dispatch(getMyBungleList());
      window.scrollTo(0, 0);
      setTimeout(() => {
        setIsLoad(false);
      }, 200);
    }
  }, []);

  //초기 세팅
  let CategoriesObjArray = [
    { category: "맛집", clicked: false },
    { category: "카페", clicked: false },
    { category: "노래방", clicked: false },
    { category: "운동", clicked: false },
    { category: "친목", clicked: false },
    { category: "전시", clicked: false },
    { category: "여행", clicked: false },
    { category: "쇼핑", clicked: false },
    { category: "스터디", clicked: false },
    { category: "게임", clicked: false },
  ];
  const [checkedCategory, setCheckedCategory] = useState([{}]);
  const [postUrls, setPostUrls] = useState([]);

  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  useEffect(() => {
    if (!isLoad) {
      setTagList(myBungle.tags);

      myBungle.categories?.forEach((Checkeditem) => {
        CategoriesObjArray.map((item) => {
          if (item.category === Checkeditem) {
            item.clicked = true;
            return item;
          } else {
            return item;
          }
        });
      });
      setCheckedCategory(CategoriesObjArray);

      const receivedTime = myBungle.time.split(" ");

      if (dateString === receivedTime[0]) {
        setIsToday(true);
        setIsTommorow(false);
      } else {
        setIsToday(false);
        setIsTommorow(true);
      }
      const times = receivedTime[1].split(":");
      setHour(times[0]);
      setMinute(times[1]);
      setIsAddress(myBungle.place);
      setOnlyNumber(myBungle.personnel);

      if (myBungle.isLetter) {
        setIsLetter(true);
        setIsVideo(false);
      } else {
        setIsLetter(false);
        setIsVideo(true);
      }
      // setPostUrls( myBungle.postUrls );
      setIsFirstFile(myBungle.postUrls[0]);
      setIsSecondFile(myBungle.postUrls[1]);
      setIsThirdFile(myBungle.postUrls[2]);
    }
  }, [isLoad]);

  // 인원 설정 숫자만
  const [onlyNumber, setOnlyNumber] = useState("2");
  // 문자, 화상 여부 판별
  const [isLetter, setIsLetter] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  // 채팅 버튼 클릭 여부 판별
  const [chatBtnState, setChatBtnState] = useState(false);

  // 첫번째 사진 업로드 state
  const [isFirstFile, setIsFirstFile] = useState();
  const [firstFile, setFirstFile] = useState();
  // 첫번째 사진 clear 버튼 state
  const [isFirstFileClear, setFirstFileClear] = useState(false);

  // 두번째 사진 업로드 state
  const [isSecondFile, setIsSecondFile] = useState();
  const [secondFile, setSecondFile] = useState();
  // 두번째 사진 clear 버튼 state
  const [isSecondFileClear, setSecondFileClear] = useState(false);

  // 세번째 사진 업로드
  const [isThirdFile, setIsThirdFile] = useState();
  const [thirdFile, setThirdFile] = useState();
  // 세번째 사진 clear 버튼 state
  const [isThirdFileClear, setThirdFileClear] = useState(false);

  // 해쉬 태그 관리용 state
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  // 해쉬 태그 3자 이상이면 처리할 state
  const [isReadOnly, setIsReadOnly] = useState(false);

  // 주소 입력 관리 State
  const [isAddress, setIsAddress] = useState("");
  // 우편번호 컴포넌트의 노출여부 상태 state
  const [visible, setVisible] = useState(false);

  // 지도 경도, 위도 State
  // location 정보 저장
  const [location, setLocation] = useState();
  // 에러 메세지 저장
  const [error, setError] = useState();

  // 지번 주소
  const [currentAddress, setCurrentAddress] = useState();
  // 도로명 주소
  const [currentRoadAddress, setCurrentRoadAddress] = useState();

  // GPS 옵션
  const options = {
    /*
    maximumAge
    : 캐시에 저장한 위치정보를 대신 반환할 수 있는 최대 시간을 나타내는 양의 long 값입니다. 0을 지정한 경우 장치가 위치정보 캐시를 사용할 수 없으며 반드시 실시간으로 위치를 알아내려 시도해야 한다는 뜻입니다. Infinity를 지정한 경우 지난 시간에 상관없이 항상 캐시에 저장된 위치정보를 반환해야 함을 나타냅니다. 기본 값은 0입니다.
    timeout
    : 기기가 위치를 반환할 때 소모할 수 있는 최대 시간(밀리초)을 나타내는 양의 long 값입니다. 기본 값은 Infinity로, 위치를 알아내기 전에는 getCurrentPosition()이 반환하지 않을 것임을 나타냅니다.
    enableHighAccuracy
    : 위치정보를 가장 높은 정확도로 수신하고 싶음을 나타내는 불리언 값입니다. true를 지정했으면, 지원하는 경우 장치가 더 정확한 위치를 제공합니다. 그러나 응답 속도가 느려지며 전력 소모량이 증가하는 점에 주의해야 합니다. 반면 false를 지정한 경우 기기가 더 빠르게 반응하고 전력 소모도 줄일 수 있는 대신 정확도가 떨어집니다. 기본 값은 false입니다.
    */
    enableHighAccuracy: true,
    // timeout
    timeout: 5000,
    maximumAge: 0,
  };

  // 첫번째 사진 clear 버튼
  const firstFileClearOnClickHandler = () => {
    setPostUrls(
      postUrls.map((item, index) => {
        if (index === 0) {
          // console.log("!!");
          return (item = "");
        }
      })
    );
    setIsFirstFile(null);
    setFirstFileClear(false);
  };

  // 두번째 사진 clear 버튼
  const secondFileClearOnClickHandler = () => {
    setIsSecondFile(null);
    setSecondFileClear(false);
  };

  // 세번째 사진 clear 버튼
  const thirdFileClearOnClickHandler = () => {
    setIsThirdFile(null);
    setThirdFileClear(false);
  };

  const onFistFileChange = (e) => {
    // console.log( e );
    if (e.target.files[0]) {
      // console.log("gg");
      setFirstFile(e.target.files[0]);
      uploadFiles(e, 0);
    } else {
      //업로드 취소할 시
      setIsFirstFile(IconUpload);
      deleteFiles(0);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log(reader.result);
        setIsFirstFile(reader.result);
        setFirstFileClear(true);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSecondFileChange = (e) => {
    if (e.target.files[0]) {
      setSecondFile(e.target.files[0]);
      uploadFiles(e, 1);
    } else {
      //업로드 취소할 시
      setIsSecondFile(IconUpload);
      deleteFiles(1);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIsSecondFile(reader.result);
        setSecondFileClear(true);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onThirdFileChange = (e) => {
    if (e.target.files[0]) {
      setThirdFile(e.target.files[0]);
      uploadFiles(e, 2);
    } else {
      //업로드 취소할 시
      setIsThirdFile(IconUpload);
      deleteFiles(2);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIsThirdFile(reader.result);
        setThirdFileClear(true);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const [isFile, setIsFile] = useState(["", "", ""]);

  const AddFileItem = (item, index) => {
    setIsFile(
      isFile.map((file, file_index) => {
        if (file_index === index) {
          return (file = item);
        } else {
          if (file === "") {
            return (file = "");
          } else {
            return file;
          }
        }
      })
    );
  };

  const RemoveFileItme = (number) => {
    setIsFile(isFile.filter((_, index) => index !== number));
  };

  const uploadFiles = (e, index) => {
    // console.log(e, index);
    AddFileItem(e.target.files[0], index);
  };

  const deleteFiles = (index) => {
    RemoveFileItme(index);
  };

  // ChatButton 클릭 함수
  const ChatButtonClickHandler = (text) => {
    // console.log("Chat : ", text);
    setChatBtnState(true);
    setOnlyNumber("2");
    if (text === "letter") {
      setIsLetter(true);
      setIsVideo(false);
    } else {
      setIsLetter(false);
      setIsVideo(true);
    }
  };

  // 카테고리 중복 선택 가능 함수
  const CategoryClickHandler = (selectCategory) => {
    // console.log(selectCategory);
    setCheckedCategory(
      checkedCategory.map((item) => {
        if (item.category === selectCategory) {
          item.clicked = !item.clicked;
          return item;
        } else {
          return item;
        }
      })
    );
  };
  // 엔터키 태그 입력
  const onKeyPress = (e) => {
    // console.log( e, e.target.value );
    if (e.target.value.length !== 0 && e.code === "Enter") {
      addHashTagItemHandler();
      e.target.value = "";
    }
  };

  // 해쉬 태그 Add
  const addHashTagItemHandler = () => {
    let updatedTagList = [...tagList];
    // 모든 공백 제거
    updatedTagList.push(tagItem.replace(/ /g, ""));
    setTagList([...tagList, tagItem.replace(/ /g, "")]);
    setTagItem("");

    if (updatedTagList.length >= 3) {
      setIsReadOnly(true);
    }
  };
  // 해쉬 태그 삭제
  const removeHashTagItemHandler = (TagItem) => {
    let updatedTagList = tagList.filter((item) => item !== TagItem);

    setTagList(tagList.filter((item) => item !== TagItem));
    setTagItem("");

    if (updatedTagList.length < 3) {
      setIsReadOnly(false);
    }
  };
  // 인원 수 설정 숫자만 들어가도록 하는 함수
  const InputTextOnChangeNumberHandler = (event) => {
    if (
      event.nativeEvent.data === "-" ||
      event.nativeEvent.data === "e" ||
      event.nativeEvent.data === "E"
    ) {
      event.preventDefault();
      return null;
    }

    let onlyNumber = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    if (Number(onlyNumber) >= 50) {
      onlyNumber = "50";
    }
    setOnlyNumber(onlyNumber);
  };
  // 글자수 제한, 10자 넘으면 10자만 남겨두기
  const onInput = (e) => {
    const maxLength = 10;
    if (e.target.value.length > maxLength) {
      //10글자 제한
      e.target.value = e.target.value.substr(0, maxLength);
    }
  };
  // 시간 관련 state
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  // 오늘 내일 여부 판별 state
  const [isToday, setIsToday] = useState(false);
  const [isTommorow, setIsTommorow] = useState(false);
  const [dates, setDates] = useState("");

  const isNotNumber = (value) => {
    const regExp = /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    return regExp.test(value);
  };
  // 시간 focus가 바뀌었을 떄
  const hourOnBlur = (event) => {
    // console.log(event.target.value, isToday);
    if (isToday) {
      if (Number(event.target.value) < Number(currentHour)) {
        setIsModal(true);
        setModalMessage(
          `시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`
        );
        // alert(
        //   `시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`
        // );
        const limitHour = Math.max(
          currentHour,
          Math.min(24, Number(event.target.value))
        );
        setHour(limitHour);
        setMinute(currentMinute);
      } else if (Number(event.target.value) >= 24) {
        setIsToday(false);
        // alert(`시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`);
        event.target.value -= 24;
        const limitHour = Math.max(
          0,
          Math.min(currentHour, Number(event.target.value))
        );

        setHour(("0" + limitHour).slice(-2));
      }
    } else {
      // console.log(event.target.value, currentHour);
      if (Number(event.target.value) > Number(currentHour)) {
        setIsModal(true);
        setModalMessage(
          `시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`
        );
        // alert(
        //   `시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`
        // );
        const limitHour = Math.max(
          0,
          Math.min(currentHour, Number(event.target.value))
        );
        setHour(limitHour);
      }
      if (event.target.value.length === 1) {
        setHour(("0" + event.target.value).slice(-2));
      }
    }
  };
  // 분 focus가 바뀌었을 떄
  const minuteOnBlur = (event) => {
    if (Number(event.target.value) >= 60) {
      setIsModal(true);
      setModalMessage(`분은 60분을 넘길 수 없습니다.`);
      // alert(`분은 60분을 넘길 수 없습니다.`);
      setMinute(("0" + currentMinute).slice(-2));
    }

    if (!isToday) {
      if (
        Number(currentHour + currentMinute) < Number(hour + event.target.value)
      ) {
        setIsModal(true);
        setModalMessage(
          `시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`
        );
        // alert(
        //   `시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`
        // );
        const limitMinute = Math.max(
          0,
          Math.min(currentMinute, Number(event.target.value))
        );
        setMinute(limitMinute);
      }
    } else {
      if (
        Number(currentHour + currentMinute) > Number(hour + event.target.value)
      ) {
        setIsModal(true);
        setModalMessage(
          `시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`
        );
        // alert(
        //   `시간 설정은 당일 ${currentHour}:${currentMinute}부터 다음 날 ${currentHour}:${currentMinute}까지입니다.`
        // );
        const limitMinute = Math.max(
          currentMinute,
          Math.min(currentMinute, Number(event.target.value))
        );
        // console.log("limit ", limitMinute);
        setMinute(limitMinute);
      }
    }
  };

  // 시간 숫자만 입력 ( 시 )
  const InputHourNumberChangeHandler = (event) => {
    if (
      event.nativeEvent.data === "-" ||
      event.nativeEvent.data === "e" ||
      event.nativeEvent.data === "E"
    ) {
      event.preventDefault();
      return null;
    }

    if (event.nativeEvent.data && isNotNumber(event.nativeEvent.data)) {
      event.preventDefault();
      return null;
    } else {
      setHour(("0" + event.target.value).slice(-2));
    }
  };

  // 시간 숫자만 입력 ( 분 )
  const InputMinuteNumberChangeHandler = (event) => {
    if (
      event.nativeEvent.data === "-" ||
      event.nativeEvent.data === "e" ||
      event.nativeEvent.data === "E"
    ) {
      event.preventDefault();
      return null;
    }

    if (event.nativeEvent.data && isNotNumber(event.nativeEvent.data)) {
      event.preventDefault();
      return null;
    } else {
      setMinute(("0" + event.target.value).slice(-2));
    }
  };
  const peopleOnBlur = (event) => {
    if (Number(event.target.value) < 2) {
      setIsModal(true);
      setModalMessage(`인원 설정은 최소 2명입니다.`);
      // alert(`인원 설정은 최소 2명입니다.`);
      setOnlyNumber(2);
    }
  };
  // 오늘인지 내일인지 체크
  const selectTodayOrTommorowClickHanlder = (text) => {
    if (text === "today") {
      setIsToday(true);
      setHour(currentHour);
      setMinute(currentMinute);
    } else {
      setIsToday(false);
      setHour(currentHour);
      setMinute(currentMinute);
    }
  };
  // 다음 주소 검색
  // 모바일용
  // const addressStyle = {
  //   display: "block",
  //   position: "absolute",
  //   top: "1120px",
  //   left:"10px",
  //   width: "375px",
  //   height: "470px",
  //   padding: "7px",
  //   zIndex: 1,
  // };
  // 웹용
  const addressStyle = {
    display: "block",
    position: "absolute",
    top: "150%",
    left: "50%",
    width: "375px",
    height: "470px",
    padding: "7px",
    // marginTop:"-95px",
    marginLeft: "-195px",
    // margin:"auto",
    zIndex: 5,
  };
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    // console.log( fullAddress );
    setVisible(false);
    setIsAddress(fullAddress);
  };

  // 현위치 찾아오기

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
    console.log(error);
  };

  const getCurrentLocationBtnClick = () => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, []);

  useEffect(() => {
    // let coord = new kakao.maps.LatLng(location?.latitude, location?.longitude);
    if (location) {
      let geocoder = new kakao.maps.services.Geocoder();
      let coord = new kakao.maps.LatLng(location.latitude, location.longitude);

      let callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const arr = { ...result };
          // console.log(arr[0]);
          const _arr = arr[0].address.address_name;
          const _arrLoad = arr[0].address.road_address;
          setCurrentRoadAddress(_arrLoad);
          setCurrentAddress(_arr);
        }
      };

      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }
  }, [location]);

  // 등록하기 버튼 클릭

  const Title_ref = useRef();
  const Content_ref = useRef();
  const hour_ref = useRef();
  const minute_ref = useRef();

  const editBungleOnClickHandler = (postId) => {
    const SelectedCategories = checkedCategory.filter((item) => {
      if (item.clicked) {
        return item.category;
      }
    });
    const extractCategory = SelectedCategories.map((item) => {
      return item.category;
    });

    let dates = "";
    if (isToday) {
      const today = new Date();

      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const day = ("0" + today.getDate()).slice(-2);

      dates = year + "-" + month + "-" + day;
    } else {
      const today = new Date();

      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const day = ("0" + (today.getDate() + 1)).slice(-2);

      dates = year + "-" + month + "-" + day;
    }

    // const sendCategory = extractCategory.join(",");
    const title = Title_ref.current.value.trim();
    const content = Content_ref.current.value.trim();
    const hour = hour_ref.current.value; //("0" + hour_ref.current.value).slice(-2);
    const minute = minute_ref.current.value; //("0" + minute_ref.current.value).slice(-2);
    if (title.length <= 0) {
      setIsModal(true);
      setModalMessage("벙글 이름을 입력해주세요.");
      return null;
    }
    // console.log("제목 길이:", title.length, "본문 길이:", content.length);
    if (content.length > 100 || content.length === 0) {
      setIsModal(true);
      setModalMessage("벙글 소개글은 0자 이상 100자 이하여야 합니다.");
      return null;
    }
    // 타이틀은 필수
    if (title !== "") {
      let address = "";

      if (isAddress !== "") {
        address = isAddress;
      } else {
        address = currentAddress;
      }
      if (address.includes("(")) {
        address = address.slice(0, address.indexOf("(") - 1); //, address.length - 1 ));
      }

      let postUrls = [];
      // console.log(
      //   isFirstFile?.includes("data"),
      //   isSecondFile?.includes("data"),
      //   isThirdFile?.includes("data")
      // );
      if (isFirstFile && !isFirstFile?.includes("data")) {
        postUrls.push(isFirstFile);
      }
      if (isSecondFile && !isSecondFile?.includes("data")) {
        postUrls.push(isSecondFile);
      }
      if (isThirdFile && !isThirdFile?.includes("data")) {
        // console.log("??");
        postUrls.push(isThirdFile);
      }

      const postDto = {
        title: title,
        content: content,
        time: dates + ` ${hour}:${minute}:00`, //yyyy-MM-dd HH:mm:ss
        personnel: Number(onlyNumber),
        place: address,
        tags: tagList,
        categories: extractCategory,
        isLetter: isLetter,
        postUrls: postUrls,
      };
      // console.log(postDto);
      const appendFile = isFile.filter((item) => {
        // console.log(item);
        if (item !== "") {
          return item;
        }
      });

      // console.log( isFirstFile, isSecondFile, isThirdFile );
      // console.log(postUrls);
      // console.log("append ", appendFile);
      // console.log("isFile ", isFile);
      const formData = new FormData();

      formData.append(
        "postDto",
        new Blob(
          [JSON.stringify(postDto, { contentType: "application/json" })],
          {
            type: "application/json",
          }
        )
      );
      if (appendFile.length <= 0) {
        // formData는 문자열만 받을 수 있기 때문에 null 을 넣으면 안된다
        // 빈 공백으로 처리
        formData.append("postImg", "");
      } else {
        appendFile.forEach((item) => {
          // console.log(item);
          formData.append("postImg", item);
        });
      }

      dispatch(editMyBungleList({ formData, postId }));
    }
  };
  // 벙글 삭제
  const deleteBunggleOnClickHandler = (postId) => {
    setIsDeleteModal(false);
    if (myBungle.isLetter) {
      chatDisconnect();
      //dispatch(deleteMyBungleList({ postId, navigate }));
    }
  };

  //Disconnect
  const chatDisconnect = () => {
    if (Owner) {
      var chatMessage = {
        type: "QUIT",
        roomId: `${Owner}`,
      };
    } else if (guest) {
      var chatMessage = {
        type: "QUIT",
        roomId: `${parseInt(guest)}`,
      };
    }

    const PK = Number(localStorage.getItem("userId"));
    // console.log("삭제 버튼 클릭", chatMessage);
    dispatch(
      deleteMyBungleList({
        postId: myBungle.postId,
        client,
        navigate,
        chatMessage,
      })
    );
    // client.send("/pub/chat/message", { PK }, JSON.stringify(chatMessage));
    // client.disconnect(function () {
    // });
  };

  const videoButtonClickHandler = () => {
    setIsModal(true);
    setModalMessage("서비스 예정 중입니다.");
  };

  return (
    <>
      {/* { !isLoad && <> */}
      <CreatePostWrap>
        {/* Title 부분 */}
        <PostTilteDiv>
          <PostHeaderWrap>
            <ChattingBackKey
              src={IconBackKey}
              onClick={() => {
                navigate("/main");
              }}
            />
            <PageTitle>벙글 수정</PageTitle>
            <EditHeadrIconsWrap
              onClick={() => {
                editBungleOnClickHandler(myBungle.postId);
              }}
            >
              완료
            </EditHeadrIconsWrap>
          </PostHeaderWrap>
          <PostTitle
            type="search"
            placeholder="벙글 이름을 입력해주세요."
            maxLength={36}
            defaultValue={myBungle.title ? myBungle.title : ""}
            ref={Title_ref}
            style={{ backgroundColor: "transparent" }}
          />
          {/* <DeleteButton src={IconClear} onClick={clearBtnOnClickHandler} /> */}
        </PostTilteDiv>
        {/* Body 저렇게 안 닫아주면 placeholder 안생김*/}
        <PostBody
          type="text"
          defaultValue={myBungle.content ? myBungle.content : ""}
          ref={Content_ref}
          placeholder="벙글 소개글을 작성해주세요."
        ></PostBody>
        <Divider />
        <PostUploadPictureWrap>
          <UploadTitle>사진</UploadTitle>
          <FileUploadWrap>
            <UploadPictureWrap>
              <FileInputLabel htmlFor="file-input-1">
                {/* 사진 1번 */}
                <FileInputImg src={isFirstFile ? isFirstFile : IconUpload} />
                {isFirstFile && (
                  <FileClearIcon
                    src={IconClear}
                    onClick={firstFileClearOnClickHandler}
                  />
                )}
              </FileInputLabel>
              <FileInput
                id="file-input-1"
                type="file"
                accept="image/jpg, image/png, image/jpeg, image/gif image/bmp image/jfif image/JPG image/PNG image/JPEG image/GIF iage/BMP image/img"
                onChange={onFistFileChange}
                // disabled={isFirstFileClear ? true : false}
                onClick={(event) => (event.target.value = null)}
              />
            </UploadPictureWrap>
            <UploadPictureWrap>
              <FileInputLabel htmlFor="file-input-2">
                {/* 사진 2번 */}
                <FileInputImg src={isSecondFile ? isSecondFile : IconUpload} />
                {isSecondFile && (
                  <FileClearIcon
                    src={IconClear}
                    onClick={secondFileClearOnClickHandler}
                  />
                )}
              </FileInputLabel>
              <FileInput
                id="file-input-2"
                type="file"
                accept="image/jpg, image/png, image/jpeg, image/gif image/bmp image/jfif image/JPG image/PNG image/JPEG image/GIF iage/BMP image/img"
                onChange={onSecondFileChange}
                onClick={(event) => (event.target.value = null)}
              />
            </UploadPictureWrap>
            <UploadPictureWrap>
              <FileInputLabel htmlFor="file-input-3">
                {/* 사진 3번 */}
                <FileInputImg src={isThirdFile ? isThirdFile : IconUpload} />
                {isThirdFile && (
                  <FileClearIcon
                    src={IconClear}
                    onClick={thirdFileClearOnClickHandler}
                  />
                )}
              </FileInputLabel>
              <FileInput
                id="file-input-3"
                type="file"
                accept="image/jpg, image/png, image/jpeg, image/gif image/bmp image/jfif image/JPG image/PNG image/JPEG image/GIF iage/BMP image/img"
                onChange={onThirdFileChange}
                onClick={(event) => (event.target.value = null)}
              />
            </UploadPictureWrap>
          </FileUploadWrap>
        </PostUploadPictureWrap>
        <DividerStyle />
        {/* 카테고리 설정 */}
        <PostCategoriesWrap>
          <UploadTitle>카테고리 설정</UploadTitle>
          <PostCategoriesItemWrap>
            {checkedCategory.map((item, index) => {
              // console.log( item, index )
              return (
                <PostCategoriesItem
                  isChecked={item.clicked}
                  key={index}
                  onClick={() => {
                    CategoryClickHandler(item.category);
                  }}
                >
                  {item.category}
                </PostCategoriesItem>
              );
            })}
          </PostCategoriesItemWrap>
        </PostCategoriesWrap>
        <DividerStyle />

        {/* 태그 설정 */}
        <HashTagWrap>
          <UploadTitle>태그 입력</UploadTitle>
          <HashTagInput
            type="text"
            placeholder="#태그입력 (최대 3개)"
            readOnly={tagList.length === 3 ? true : isReadOnly}
            onKeyPress={onKeyPress}
            onInput={onInput}
            onChange={(e) => setTagItem(e.target.value.replace(/ /g, ""))}
          />
          <HashTagItemWrap>
            {tagList.map((tagItem, index) => {
              return (
                <HashTagItem
                  onClick={() => removeHashTagItemHandler(tagItem)}
                  key={index}
                >
                  #{tagItem}
                </HashTagItem>
              );
            })}
          </HashTagItemWrap>
        </HashTagWrap>
        <DividerStyle />
        {/* 시간 설정 */}
        <SetTimeWapper>
          <UploadTitle>시간 설정</UploadTitle>
          <TimeItemWapper>
            <TimeSelectToday
              isToday={isToday}
              onClick={() => {
                selectTodayOrTommorowClickHanlder("today");
              }}
            >
              <span
                className="material-icons"
                style={{
                  fontWeight: "bold",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              >
                check
              </span>
              오늘
            </TimeSelectToday>
            <TimeSelectTommrow
              isToday={isToday}
              onClick={() => {
                selectTodayOrTommorowClickHanlder("tommorow");
              }}
            >
              <span
                className="material-icons"
                style={{
                  fontWeight: "bold",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              >
                check
              </span>
              내일
            </TimeSelectTommrow>
          </TimeItemWapper>
          <TimeInputWrapper>
            <TimeInputHour
              ref={hour_ref}
              type="number"
              maxLength={2}
              value={hour || ""}
              onChange={InputHourNumberChangeHandler}
              onBlur={hourOnBlur}
            />

            <span
              style={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "20px",
                marginLeft: "10px",
                marginRight: "16px",
              }}
            >
              시
            </span>
            <TimeInputMinute
              ref={minute_ref}
              type="number"
              value={minute || ""}
              onChange={InputMinuteNumberChangeHandler}
              onBlur={minuteOnBlur}
            />
            <span
              style={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "20px",
                marginLeft: "10px",
              }}
            >
              분
            </span>
          </TimeInputWrapper>
        </SetTimeWapper>
        <DividerStyle />
        {/* 주소 입력 */}
        <SearchAddressWrap>
          <UploadTitle>주소 입력</UploadTitle>
          <SearchAddressItemWrap>
            <SearchAddressInput
              type="text"
              readOnly={true}
              value={isAddress}
              placeholder="기본 주소"
            />
            <SearhAddressBtn onClick={() => setVisible(!visible)}>
              {visible ? "취소" : "주소찾기"}
            </SearhAddressBtn>

            {visible ? (
              <div>
                <DaumPostCode
                  onComplete={handleComplete}
                  style={addressStyle}
                  autoClose
                  height={700}
                />
              </div>
            ) : null}
          </SearchAddressItemWrap>
          <SearchCurrentPositionItemWrap onClick={getCurrentLocationBtnClick}>
            <SearchCurrentPositionIcon src={IconMylocation} />
            <SearchCurrentPositionTitle>
              현위치로 설정
            </SearchCurrentPositionTitle>
            <SearchCurrentPositionIconInput>
              · {currentAddress ? currentAddress : currentRoadAddress}
              {/* · 서울 서초구 서초대로 233 */}
            </SearchCurrentPositionIconInput>
          </SearchCurrentPositionItemWrap>
        </SearchAddressWrap>
        <DividerStyle />
        {/* 채팅 설정 */}
        <SelectChatWrap>
          <SelectChatBox>
            <UploadTitle>채팅 설정</UploadTitle>
            <SelectChatBtnWrap>
              <SelectChatLetterBtn
                CheckedState={isLetter}
                onClick={() => {
                  ChatButtonClickHandler("letter");
                }}
              >
                {/* <SelectChatBtnImg src={IconChatLetter} /> */}
                <span
                  style={{ marginRight: "7px", marginTop: "4px" }}
                  className="material-icons"
                >
                  chat_bubble_outline
                </span>
                일반채팅
              </SelectChatLetterBtn>
              <SelectChatVideoBtn
                CheckedState={isVideo}
                onClick={() => {
                  videoButtonClickHandler();
                }}
                // onClick={() => {
                //   ChatButtonClickHandler("video");
                // }}
              >
                {/* <SelectChatBtnImg src={IconChatVideo} /> */}
                <span
                  className="material-icons"
                  style={{ marginRight: "7px", marginTop: "2px" }}
                >
                  video_camera_front
                </span>
                화상채팅
              </SelectChatVideoBtn>
            </SelectChatBtnWrap>
          </SelectChatBox>
        </SelectChatWrap>
        <DividerStyle />
        {/* 인원 수 설정 */}
        <PostPeopleCount>
          <PostPeopleCountTitleWrap>
            <PostPeopleTitle>인원 수 설정</PostPeopleTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PostPeopleCountTitle
                style={{ textAlign: "right", paddingRight: "5px" }}
                type="number"
                value={onlyNumber}
                onChange={InputTextOnChangeNumberHandler}
                onBlur={peopleOnBlur}
                maxLength={2}
              />
              명
            </div>
          </PostPeopleCountTitleWrap>
          {/* rc slider   */}
          <Slider
            className="testName"
            style={{ marginTop: "15px" }}
            min={2}
            max={isLetter ? 50 : 4}
            value={onlyNumber}
            trackStyle={{
              backgroundColor: "#FFC634",
              border: "1px solid #898989",
              height: 11,
            }}
            inverted={false}
            handleStyle={{
              border: "3px solid #FFC634",
              height: 20,
              width: 20,
              marginLeft: 0,
              marginTop: -4.3,
              backgroundColor: "white",
              cursor: "pointer",
              opacity: 1,
              boxShadow: "none !imporatnt",
            }}
            handle={{ boxShadow: "none" }}
            onChange={setOnlyNumber}
            railStyle={{
              backgroundColor: "white",
              border: "1px solid #898989",
              height: 11,
            }}
          />
        </PostPeopleCount>
        <DividerStyle />
        <PostCreateButton
          onClick={() => {
            setIsDeleteModal(true);
          }}
        >
          삭제하기
        </PostCreateButton>
        {isDeleteModal && (
          <ModalWrapper>
            <ModalOverlay>
              <ModalInner>
                <ModalContentWrap>
                  <h3>벙글 삭제</h3>
                  <div>정말 삭제하시겠습니까?</div>
                </ModalContentWrap>
                <ModalDivider />
                <ModalButtonWrap>
                  <ModalCancelButton
                    onClick={() => {
                      setIsDeleteModal(false);
                    }}
                  >
                    취소
                  </ModalCancelButton>
                  <ModalDeleteButton
                    onClick={() => {
                      deleteBunggleOnClickHandler(myBungle.postId);
                    }}
                  >
                    삭제
                  </ModalDeleteButton>
                </ModalButtonWrap>
              </ModalInner>
            </ModalOverlay>
          </ModalWrapper>
        )}
        {isModal && (
          <ModalWrapper>
            <ModalOverlay>
              <ModalInner>
                <ModalContentWrap>
                  <h3>벙글 수정 실패</h3>
                  <div style={{ width: "100%" }}>{modalMessage}</div>
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
      </CreatePostWrap>
      {/* </> } */}
    </>
  );
}

export default EditPost;
