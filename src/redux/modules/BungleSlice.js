import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosAPI from "../../customapi/CustomAxios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function resetCookie(cName) {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie =
    cName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

// 유저 온보딩 클릭
export const userAgreeLocation = createAsyncThunk(
  "GET/userAgreeLocation",
  async (data) => {
    try {
      const response = await AxiosAPI.get(`/user/onboardandlbs`);
      if (response.data.response) {
        window.location.href = "/main";
        return response.data.response;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 벙글 생성하기
export const createBungleList = createAsyncThunk(
  "CREATE/createBungleList",
  async (data) => {
    try {
      const response = await AxiosAPI.post(`/posts`, data.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 && response.data.response) {
        if (data.isLetter) {
          data.navigate(`/chat/${response.data.postId}`);
          return response.data.postId;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
// 벙글 수정페이지 이동 시 데이터 전달받기
export const getMyBungleList = createAsyncThunk(
  "GET/getMyBungleList",
  async () => {
    try {
      const response = await AxiosAPI.get(`/posts/mypost`);
      if (response.data.response) {
        return response.data.postResponseDto;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
// 벙글 수정하기
export const editMyBungleList = createAsyncThunk(
  "EDIT/editMyBungleList",
  async (data) => {
    try {
      const response = await AxiosAPI.put(
        `/posts/${data.postId}`,
        data.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.response) {
        window.location.href = "/main";
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 벙글 삭제하기
export const deleteMyBungleList = createAsyncThunk(
  "DELETE/deleteMyBungleList",
  async (rev) => {
    try {
      const response = await AxiosAPI.delete(`/posts/${rev.postId}`);

      if (response.data.response) {
        let data = {
          postId: rev.postId,
          isOwner: response.data.isOwner,
        };
        if (rev.client) {
          const PK = Number(localStorage.getItem("userId"));
          rev.client.send(
            "/pub/chat/message",
            { PK },
            JSON.stringify(rev.chatMessage)
          );
          rev.client.disconnect(function () {
            // console.log("disconnect 완료");
          });
        }
        rev.navigate("/main");
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);
// main 게시글 전체 조회
export const getMainBungleList = createAsyncThunk(
  "GET/getMainBungleList",
  async (position) => {
    try {
      const response = await AxiosAPI.get(`/posts`, {
        params: {
          latitude: position?.latitude,
          longitude: position?.longitude,
        },
      });
      if (response.status === 200) {
        const data = {
          latitude: position.latitude,
          longitude: position.longitude,
          list: response.data,
        };
        // end test
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);
// Main 더보기 클릭
export const moreBungleList = createAsyncThunk(
  "MORE/moreBungleList",
  async (data) => {
    try {
      const response = await AxiosAPI.get(`/posts/more`, {
        params: {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          status: data.status,
        },
      });
      if (response.data.response) {
        data.navigate("/tagsearch");
        return response.data.list;
      } else {
        data.navigate("/tagsearch");
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 지도 주변 벙글
export const getMapBungle = createAsyncThunk(
  "GET/getMapBungle",
  async (data) => {
    try {
      const response = await AxiosAPI.get(`/map`, {
        params: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
      });

      if (response.data.response) {
        return response.data;
      } else {
      }
    } catch (e) {
      console.log(e);

    }
  }
);

// 지도 상세 적용
export const getDetailMap = createAsyncThunk(
  "GET/getDetailMap",
  async (data) => {
    try {
      const response = await AxiosAPI.get(`/map/details`, {
        params: {
          categories: data.selectCategory,
          personnel: data.onlyNumber,
          distance: data.onlyDistance,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        },
      });

      if (response.data.response) {
        return response.data.mapListDtos;
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 찜하기
export const likeBungleList = createAsyncThunk(
  "LIKE/likeBungleList",
  async (postId) => {
    try {
      const response = await AxiosAPI.post(`/posts/like/${postId}`, {});

      if (response.data.response) {
        return postId;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 상세 조회
export const detailBungleList = createAsyncThunk(
  "DETAIL/detailBungleList",
  async (postId) => {
    try {
      const response = await AxiosAPI.get(`/posts/${postId}`);
      if (response.data.response) {
        return response.data.postDetailsResponseDto;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 상세 조회 like 클릭
export const detailLikeBungleList = createAsyncThunk(
  "LIKE/detailLikeBungleList",
  async (postId) => {
    try {
      const response = await AxiosAPI.post(
        `${SERVER_URL}/posts/like/${postId}`,
        {}
      );
      if (response.data.response) {
        return postId;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 단일 카테고리 조회
export const categoryBungleList = createAsyncThunk(
  "GET/categoryBungleList",
  async (item) => {
    try {
      const response = await AxiosAPI.get(`/posts/categories`, {
        params: {
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          categories: item.category,
        },
      });

      if (response.data.response) {
        item.navigate(`/categorysearch/${item.category}`);
        return response.data.list;
      } else {
        item.navigate(`/categorysearch/${item.category}`);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 게시글 단일 태그 조회
export const tagBungleList = createAsyncThunk(
  "GET/tagBungleList",
  async (item) => {
    try {
      const response = await AxiosAPI.get(`/posts/tags`, {
        params: {
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          tags: item.tag,
        },
      });

      if (response.data.response) {
        item.navigate("/tagsearch");
        return response.data.list;
      } else {
        item.navigate("/tagsearch");
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 지도 게시글 단일 태그 조회
export const mapTagSearch = createAsyncThunk(
  "GET/mapTagSearch",
  async (item) => {
    try {
      const response = await AxiosAPI.get(`/posts/tags`, {
        params: {
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          tags: item.tag,
        },
      });

      if (response.data.response) {
        return response.data.list;
      }
    } catch (e) {
      console.log(e);
    }
  }
);
// 유저 프로필 조회
export const getUserProfile = createAsyncThunk(
  "GET/getUserProfile",
  async () => {
    try {
      const response = await AxiosAPI.get(`/user/profile`, {});
      if (response.data.response) {
        return response.data.profileResponseDto;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 유저 프로필 수정
export const editUserProfile = createAsyncThunk(
  "EDIT/editUserProfile",
  async (data) => {
    try {
      const response = await AxiosAPI.post(`/user/profile`, data.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.response) {
        data.navigate("/mypage");
        return response.data.profileResponseDto;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 나의 찜 벙글 리스트
export const myLikeBungleList = createAsyncThunk(
  "GET/myLikeBungleList",
  async (location) => {
    console.log(location);
    try {
      const response = await AxiosAPI.get(`/posts/like`, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
      
      if (response.data.response) {
        return response.data.list;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 채팅 목록 조회
export const myChattingList = createAsyncThunk(
  "GET/myChattingList",
  async () => {
    try {
      const response = await AxiosAPI.get(`/chat/rooms`);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

// 실시간 알림
export const getIntervalNotification = createAsyncThunk(
  "GET/getIntervalNotification",
  async () => {
    try {
      const response = await AxiosAPI.get(`/notification`);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 로그 아웃
export const LogOut = createAsyncThunk("POST/LogOut", async (data) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/user/logout`,
      {},
      {
        headers: {
          Authorization: data.token,
          RefreshToken: data.refreshToken,
        },
      }
    );

    if (response.status === 200) {
      localStorage.clear();
      resetCookie("webid_ts");
      resetCookie("webid");
      resetCookie("refresh_token");
      data.navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
});

// 회원 탈퇴
export const Withdrawal = createAsyncThunk(
  "DELETE/Withdrawal",
  async (data) => {
    try {
      const response = await AxiosAPI.delete(`/user`);

      if (response.status === 200) {
        localStorage.clear();
        resetCookie("webid_ts");
        resetCookie("webid");
        resetCookie("refresh_token");
        data.navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const BungleSlice = createSlice({
  name: "Bungle",

  initialState: {
    // location gps
    userLocation: {
      latitude: 0,
      longitude: 0,
    },
    isOwner: false,
    // 유저 프로필
    userProfile: {},
    // 게시물 생성 하자마자 채팅룸 아이디 전달
    OnwerPostId: 0,
    // 채팅 참여 postId
    GuestPostId: 0,
    // 상세 조회
    detailBungle: {},
    // 마감 임박
    endTime: [{}],
    // 실시간
    realTime: [{}],
    // 더보기 및 태그
    moreList: [{}],
    // 카테고리
    categoriesList: [{}],
    // 내 찜 목록
    myLikeList: [{}],
    // 내가 작성한 게시물 조회
    myBunglePost: {},
    list: [{}],
    // 내 채팅 목록
    myChatting: [],
    // 문자 채팅 client
    ChatClient: {
      client: null,
      guest: 0,
    },
    // nofitication state
    isReadNotification: false,
    NoitficationList: [{}],
    // 화상 채팅 info
    VideoInfo: {},
    //지도 화면 렌더링 되자마자 보여줄 리스트
    mapList: [{}],
    //지도 화면 상세 검색 후 보여줄 리스트
    detailMapBungle: [{}],
  },
  reducers: {
    // 클라이언트 값 가져오기
    getChatClient: (state, action) => {
      state.ChatClient.client = action.payload.client;
      state.ChatClient.guest = action.payload.Guest;
    },
    // 알림 클리어
    clearNotificationState: (state, action) => {
      state.isReadNotification = false;
      state.NoitficationList.length = 0;
    },
  },
  extraReducers: {
    // 벙글 생성, post ID 전달
    [createBungleList.fulfilled]: (state, action) => {
      state.OnwerPostId = action.payload;
    },
    [createBungleList.rejected]: (state, action) => {
    },

    // Main 전체 게시글 조회
    [getMainBungleList.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userLocation.latitude = action.payload.latitude;
        state.userLocation.longitude = action.payload.longitude;
        state.isOwner = action.payload?.list.isOwner;

        state.endTime = action.payload.list.postListEndTime;
        state.realTime = action.payload.list.postListRealTime;
      }
    },
    [getMainBungleList.rejected]: (state, action) => {
    },

    // 게시글 찜하기
    [likeBungleList.fulfilled]: (state, action) => {
      // realTime Update

      const realTimeUpdate = state.realTime?.map((item) => {
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });
      state.realTime = realTimeUpdate;
      // endTimeUpdate
      const endTimeUpdate = state.endTime?.map((item) => {
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });
      state.endTime = endTimeUpdate;

      // more or Tag search Update
      const moreTempUpdate = state.moreList?.map((item) => {
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });

      state.moreList = moreTempUpdate;

      // 카테고리 update
      const CategoryUpdate = state.categoriesList?.map((item) => {
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });

      state.categoriesList = CategoryUpdate;

      // 지도 벙글 update
      const MapBungleUpdate = state.mapList?.map((item) => {
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });
      state.mapList = MapBungleUpdate;

      // 지도 상세 검색 벙글 update
      const MapDetailBungleUpdate = state.detailMapBungle?.map((item) => {
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });

      state.detailMapBungle = MapDetailBungleUpdate;

      const MyLikeBungleUpdate = state.myLikeList?.map((item) => {
        if (item.postId === action.payload) {
          if (item.isLike) {
            return { ...item, isLike: false };
          } else {
            return { ...item, isLike: true };
          }
        } else {
          return item;
        }
      });

      state.myLikeList = MyLikeBungleUpdate;
    },
    [likeBungleList.rejected]: (state, action) => {},
    // 더보기, 태그 검색 결과
    [moreBungleList.fulfilled]: (state, action) => {
      state.moreList = action.payload;
    },
    [moreBungleList.rejected]: (state, action) => {},

    // 지도태그 검색 결과
    [mapTagSearch.fulfilled]: (state, action) => {
      state.moreList = action.payload;
    },
    [mapTagSearch.rejected]: (state, action) => {},

    // 지도 리스트
    [getMapBungle.fulfilled]: (state, action) => {
      state.mapList = action.payload.mapListDtos;
      state.isOwner = action.payload.owner;
    },
    [getMapBungle.rejected]: (state, action) => {},

    // 지도 상세 검색 후리스트
    [getDetailMap.fulfilled]: (state, action) => {
      state.detailMapBungle = action.payload;
    },
    [getDetailMap.rejected]: (state, action) => {},

    // 상세 조회
    [detailBungleList.fulfilled]: (state, action) => {
      state.detailBungle = action.payload;
    },
    [detailBungleList.rejected]: (state, action) => {},
    // 상세 게시글 좋아요 클릭
    [detailLikeBungleList.fulfilled]: (state, action) => {
      if (state.detailBungle.isLike) {
        state.detailBungle.isLike = false;
      } else {
        state.detailBungle.isLike = true;
      }
    },
    // 카테고리 조회
    [categoryBungleList.fulfilled]: (state, action) => {
      state.categoriesList = action.payload;
    },
    [categoryBungleList.rejected]: (state, action) => {},
    // 태그 조회
    [tagBungleList.fulfilled]: (state, action) => {
      if (action.payload) {
        state.moreList = action.payload;
      } else {
        state.moreList = null;
      }
    },
    [tagBungleList.rejected]: (state, action) => {},

    // 유저 프로필 조회
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
    },
    [getUserProfile.rejected]: (state, action) => {},

    // 유저 프로필 수정
    [editUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
    },
    [editUserProfile.rejected]: (state, action) => {},
    [myLikeBungleList.fulfilled]: (state, action) => {
      state.myLikeList = action.payload;
    },
    // 채팅 목록 조회
    [myChattingList.fulfilled]: (state, action) => {
      state.myChatting = action.payload.messageDto;
      state.isOwner = action.payload.owner;
    },
    [myChattingList.rejected]: (state, action) => {},
    [getMyBungleList.fulfilled]: (state, action) => {
      state.myBunglePost = action.payload;
    },

    // 게시물 삭제
    [deleteMyBungleList.fulfilled]: (state, action) => {
      const isOwner = action.payload.isOwner;
      state.isOwner = isOwner;
    },
    [deleteMyBungleList.rejected]: (state, action) => {},
    // 알림
    [getIntervalNotification.fulfilled]: (state, action) => {
      if (action.payload.length > 0) {
        state.isReadNotification = true;
      } else {
        state.isReadNotification = false;
      }
      state.NoitficationList = action.payload;
    },
    [getIntervalNotification.rejected]: (state, action) => {},
    [userAgreeLocation.fulfilled]: (state, action) => {
      state.userAgree = action.payload;
    },
  },
});

export const { getChatClient, clearNotificationState } = BungleSlice.actions;
export default BungleSlice.reducer;
