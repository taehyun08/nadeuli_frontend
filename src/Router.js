import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import RegisterLocation from "./pages/RegisterLocation";
import Register from "./pages/member/Register";
import Login from "./pages/member/Login";
import Main from "./pages/Main";
import MyPage from "./pages/member/MyPage";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Modify from "./pages/Modify";
import ProfileLocation from "./pages/ProfileLocation";
import Chatting from "./pages/Chatting";
import FindAccount from "./pages/member/FindAccount";
import UpdateCellphone from "./pages/member/UpdateCellphone";
import OAuth2RedirectHandler from "./pages/member/OAuth2RedirectHandler";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/location" element={<RegisterLocation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findAccount" element={<FindAccount />} />
        <Route path="/updateCellphone" element={<UpdateCellphone />} />
        <Route path="/login/oauth2/code/kakao" element={<OAuth2RedirectHandler />} />
        <Route path="/add" element={<Add />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/modify/:postid" element={<Modify />} />
        <Route path="/detail/:postid/:trade" element={<Detail />} />
        <Route path="/chatting/:postid/:trade" element={<Chatting />} />
        <Route path="/profile/location" element={<ProfileLocation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Start />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
