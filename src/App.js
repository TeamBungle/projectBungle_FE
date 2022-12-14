//Libraries
import React from "react";
import { Routes, Route } from "react-router-dom";
//CSS
import "./App.css";
//Pages
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import TagSearch from "./pages/search/TagSearch";
import CategorySearch from "./pages/search/CategorySearch";
import Main from "./pages/Main";
import MyPage from "./pages/mypage/MyPage";

import DetailPost from "./pages/posts/DetailPost";
import CreatePost from "./pages/posts/CreatePost";
import EditPost from "./pages/posts/EditPost";

import ProfileSetting from "./pages/mypage/ProfileSetting";
import MyLikeBung from "./pages/mypage/MyLikeBung";
import ChatList from "./pages/chatting/ChatList";
import ChattingRoom from "./pages/chatting/ChattingRoom";
import Map from "./pages/map/Map";

import OpenViduSettings from "./components/videos/OpenViduSettings";

import LoadingLogin from "./components/LoadingLogin";
import Notification from "./components/Notification";

import OnBoarding from "./components/OnBoarding";

import TermsConditions from "./components/TermsConditions";
// 404 Not found
import NotFound from "./components/NotFound";
// Private Routes
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Private Routes Start */}
        <Route element={<PrivateRoutes />}>
          {/* Main */}
          <Route path="/main" element={<Main />} />

          {/* Search */}
          <Route path="/tagsearch" element={<TagSearch />} />
          <Route
            path="/categorysearch/:category"
            element={<CategorySearch />}
          />

          {/* MyPage */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mylikebung" element={<MyLikeBung />} />
          <Route path="/profilesetting" element={<ProfileSetting />} />

          {/* Chattings */}
          <Route path="/chat" element={<ChattingRoom />} />
          <Route path="/chat/:postId" element={<ChattingRoom />} />
          <Route path="/chatlist" element={<ChatList />} />

          {/* Map */}
          <Route path="/map/detailpost/:postId" element={<DetailPost />} />
          <Route path="/map" element={<Map />} />

          {/* onBoarding */}
          <Route path="/onboard" element={<OnBoarding />} />

          {/* Posts */}
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/detailpost/:postId" element={<DetailPost />} />
          <Route path="/editpost" element={<EditPost />} />

          {/* ?????? ?????? */}
          <Route path="/termsconditions" element={<TermsConditions />} />

          {/* ?????? */}
          <Route path="notification" element={<Notification />} />
        </Route>
        {/* Private Routes End */}

        {/* Public Routes Start */}
        {/* Login */}
        <Route path="/" element={<Login />} />
        {/* Social Rediection */}
        <Route path="/oauth" element={<LoadingLogin />} />
        {/* SignUp */}
        <Route path="/signup" element={<SignUp />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
        {/* Public Routes End */}
      </Routes>
    </div>
  );
}

export default App;
