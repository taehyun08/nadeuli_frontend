import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/member/Start";
import RegisterLocation from "./pages/RegisterLocation";
import Register from "./pages/member/Register";
import Login from "./pages/member/Login";
import Main from "./pages/Main";
import GetMyProfile from "./pages/member/GetMyProfile";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Modify from "./pages/Modify";
import ProfileLocation from "./pages/ProfileLocation";
import FindAccount from "./pages/member/FindAccount";
import UpdateCellphone from "./pages/member/UpdateCellphone";
import OAuth2RedirectHandler from "./pages/member/OAuth2RedirectHandler";
import DongNeHome from "./pages/dongne/DongNeHome";
import AddDongNePost from "./pages/dongne/AddDongNePost";
import AddStreaming from "./pages/dongne/AddStreaming";
import GetDongNePost from "./pages/dongne/GetDongNePost";
import AddOrikkiri from "./pages/orikkiri/AddOrikkiri";
import OrikkiriHome from "./pages/orikkiri/OrikkiriHome";
import AddTradeReview from "./pages/trade/AddTradeReview";
import Test from "./pages/member/GetMyProfile";
import NadeuliPayCharge from "./pages/nadeuli_pay/NadeuliPayCharge";
import NadeuliPayPay from "./pages/nadeuli_pay/NadeuliPayPay";
import NadeuliPayWithdraw from "./pages/nadeuli_pay/NadeuliPayWithdraw";
import GetChatRoomList from "./pages/chat/GetChatRoomList";
import Chatting from "./pages/chat/Chatting";
import AddDeliveryOrder from "./pages/nadeuli_delivery/AddDeliveryOrder";
import UpdateDeliveryOrder from "./pages/nadeuli_delivery/UpdateDeliveryOrder";
import GetDeliveryOrder from "./pages/nadeuli_delivery/GetDeliveryOrder";
import NadeuliDeliveryHome from "./pages/nadeuli_delivery/NadeuliDeliveryHome";
import GetMyOrderHistoryList from "./pages/nadeuli_delivery/GetMyOrderHistoryList";
import SearchLocation from "./pages/nadeuli_delivery/SearchLocation";
import GetMyDeliveryHistoryList from "./pages/nadeuli_delivery/GetMyDeliveryHistoryList";
import GetMyAcceptedDeliveryHistoryList from "./pages/nadeuli_delivery/GetMyAcceptedDeliveryHistoryList";
import Oauth2Register from "./pages/member/Oauth2Register";
import GetOtherProfile from "./pages/member/GetOtherProfile";
import GetMemberList from "./pages/member/GetMemberList";
import Report from "./pages/member/Report";
import GetOrikkiriSignUpList from "./pages/orikkiri/GetOrikkiriSignUpList";
import AddOrikkiriSignUp from "./pages/orikkiri/AddOrikkiriSignUp";
import Bank from "./pages/member/Bank";
import GetShortestWay from "./pages/nadeuli_delivery/GetShortestWay";
import AddOrikkiriSchedule from "./pages/orikkiri/AddOrikkiriSchedule";
// import GetShortestWay from "./pages/nadeuli_delivery/GetShortestWay";
// import AddTradeReview from "./pages/trade/AddTradeReview";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dongNeHome" element={<DongNeHome />} />
        <Route path="/addDongNePost" element={<AddDongNePost />} />
        <Route path="/getDongNePost/:postId" element={<GetDongNePost />} />
        <Route path="/addStreaming" element={<AddStreaming />} />
        <Route path="/orikkiriHome/:orikkiriId" element={<OrikkiriHome />} />
        <Route path="/addOkkiri" element={<AddOrikkiri />} />
        <Route path="/getOrikkiriSignUpList" element={<GetOrikkiriSignUpList />} />
        <Route path="/addOrikkiriSignUp" element={<AddOrikkiriSignUp />} />
        <Route path="/addOrikkiriSchedule" element={<AddOrikkiriSchedule />} />

        <Route
          path="/nadeuliPay/nadeuliPayCharge"
          element={<NadeuliPayCharge />}
        />
        <Route
          path="/nadeuliPay/nadeuliPayPay/:productId"
          element={<NadeuliPayPay />}
        />
        <Route
          path="/nadeuliPay/nadeuliPayWithdraw"
          element={<NadeuliPayWithdraw />}
        />
        <Route
          path="/trade/addTradeReview/:productId"
          element={<AddTradeReview />}
        />

        <Route path="/chat/getChatRoomList" element={<GetChatRoomList />} />
        <Route
          path="/chat/chatting/:chatRoomId/:id/:isProduct"
          element={<Chatting />}
        />

        <Route path="/location" element={<RegisterLocation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findAccount" element={<FindAccount />} />
        <Route path="/updateCellphone" element={<UpdateCellphone />} />
        <Route path="/bank" element={<Bank />} />
        <Route
          path="/oAuth2RedirectHandler"
          element={<OAuth2RedirectHandler />}
        />
        <Route path="/oauth2Register" element={<Oauth2Register />} />
        <Route path="/add" element={<Add />} />
        <Route path="/test" element={<Test />} />
        <Route path="/getMyProfile" element={<GetMyProfile />} />
        <Route path="/getOtherProfile" element={<GetOtherProfile />} />
        <Route path="/getMemberList" element={<GetMemberList />} />
        <Route path="/report" element={<Report />} />
        <Route path="/addOrikkiri" element={<AddOrikkiri />} />
        <Route path="/modify/:postid" element={<Modify />} />
        <Route path="/detail/:postid" element={<Detail />} />
        <Route path="/profile/location" element={<ProfileLocation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Start />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/addDeliveryOrder" element={<AddDeliveryOrder />} />
        <Route path="/updateDeliveryOrder" element={<UpdateDeliveryOrder />} />
        <Route
          path="/getDeliveryOrder/:nadeuliDeliveryId"
          element={<GetDeliveryOrder />}
        />
        <Route path="/nadeuliDeliveryHome" element={<NadeuliDeliveryHome />} />
        <Route
          path="/getMyOrderHistoryList"
          element={<GetMyOrderHistoryList />}
        />
        <Route path="/searchLocation" element={<SearchLocation />} />
        <Route
          path="/getMyDeliveryHistoryList"
          element={<GetMyDeliveryHistoryList />}
        />
        <Route
          path="/getMyAcceptedDeliveryHistoryList"
          element={<GetMyAcceptedDeliveryHistoryList />}
        />
        <Route path="/getShortestWay" element={<GetShortestWay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
