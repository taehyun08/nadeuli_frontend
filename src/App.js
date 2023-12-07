import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NadeuliPayList from "./page/nadeuli_pay/NadeuliPayList";
import NadeuliPayCharge from "./page/nadeuli_pay/NadeuliPayCharge";
import NadeuliPayWithdraw from "./page/nadeuli_pay/NadeuliPayWithdraw";
import NadeuliPayPay from "./page/nadeuli_pay/NadeuliPayPay";

import ProductList from "./page/product/ProductList";
import ProductDetail from "./page/product/ProductDetail";
import ProductUpdate from "./page/product/ProductUpdate";
import ProductAdd from "./page/product/ProductAdd";
import MyProductList from "./page/product/MyProductList";
import ProductDelete from "./page/product/ProductDelete";
import SaleCompleted from "./page/product/SaleCompleted";

import TradeReviewAdd from "./page/trade/TradeReviewAdd";
import TradeReviewUpdate from "./page/trade/TradeReviewUpdate";
import TradeReviewList from "./page/trade/TradeReviewList";
import TradeReviewDelete from "./page/trade/TradeReviewDelete";
import TradeScheduleAdd from "./page/trade/TradeScheduleAdd";
import TradeScheduleDetail from "./page/trade/TradeScheduleDetail";
import TradeScheduleUpdate from "./page/trade/TradeScheduleUpdate";
import TradeScheduleList from "./page/trade/TradeScheduleList";

import GetAddOrUpdateUsedDeliveryOrder from "./page/nadeuli_delivery/GetAddOrUpdateUsedDeliveryOrder";
import AddDeliveryOrder from "./page/nadeuli_delivery/AddDeliveryOrder";
import UpdateDeliveryOrder from "./page/nadeuli_delivery/UpdateDeliveryOrder";
import GetDeliveryOrder from "./page/nadeuli_delivery/GetDeliveryOrder";
import GetDeliveryOrderList from "./page/nadeuli_delivery/GetDeliveryOrderList";
import GetMyOrderHistoryList from "./page/nadeuli_delivery/GetMyOrderHistoryList";
import GetMyDeliveryHistoryList from "./page/nadeuli_delivery/GetMyDeliveryHistoryList";
import GetMyAcceptedDeliveryHistoryList from "./page/nadeuli_delivery/GetMyAcceptedDeliveryHistoryList";
import CancelDeliveryOrder from "./page/nadeuli_delivery/CancelDeliveryOrder";
import AcceptDeliveryOrder from "./page/nadeuli_delivery/AcceptDeliveryOrder";
import CancelDelivery from "./page/nadeuli_delivery/CancelDelivery";
import CompleteDelivery from "./page/nadeuli_delivery/CompleteDelivery";
import GetDeliveryNotificationList from "./page/nadeuli_delivery/GetDeliveryNotificationList";
import UpdateIsRead from "./page/nadeuli_delivery/UpdateIsRead";
import DeleteDeliveryNotification from "./page/nadeuli_delivery/DeleteDeliveryNotification";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/nadeuliPay/getNadeuliPayList/:currentPage/:tradeType/:tag"
          element={<NadeuliPayList />}
        />
        <Route
          path="/nadeuliPay/nadeuliPayCharge"
          element={<NadeuliPayCharge />}
        />
        <Route
          path="/nadeuliPay/nadeuliPayWithdraw"
          element={<NadeuliPayWithdraw />}
        />
        <Route path="/nadeuliPay/nadeuliPayPay" element={<NadeuliPayPay />} />

        <Route
          path="/product/home/:currentPage/:gu"
          element={<ProductList />}
        />
        <Route
          path="/product/getProduct/:productId"
          element={<ProductDetail />}
        />
        <Route path="/product/updateProduct" element={<ProductUpdate />} />
        <Route path="/product/addProduct" element={<ProductAdd />} />
        <Route
          path="/product/getMyProductList/:tag/:currentPage"
          element={<MyProductList />}
        />
        <Route
          path="/product/deleteProduct/:productId"
          element={<ProductDelete />}
        />
        <Route path="/product/saleCompleted" element={<SaleCompleted />} />

        <Route path="/trade/addTradeReview" element={<TradeReviewAdd />} />
        <Route
          path="/trade/updateTradeReview"
          element={<TradeReviewUpdate />}
        />
        <Route
          path="/trade/getTradeReviewList/:tag/:currentPage"
          element={<TradeReviewList />}
        />
        <Route
          path="/trade/deleteTradeReview/:tradeReviewId"
          element={<TradeReviewDelete />}
        />
        <Route
          path="/trade/addTradingSchedule"
          element={<TradeScheduleAdd />}
        />
        <Route
          path="/trade/getTradingSchedule/:tradeScheduleId"
          element={<TradeScheduleDetail />}
        />
        <Route
          path="/trade/updateTradingSchedule"
          element={<TradeScheduleUpdate />}
        />
        <Route
          path="/trade/getTradingScheduleList/:tag/:currentPage"
          element={<TradeScheduleList />}
        />

        {/* 다른 라우트에 맞게 컴포넌트와 경로를 추가해주세요 */}

        <Route
          path="/nadeulidelivery/getAddOrUpdateUsedDeliveryOrder/:tag"
          element={<GetAddOrUpdateUsedDeliveryOrder />}
        />
        <Route
          path="/nadeulidelivery/addDeliveryOrder"
          element={<AddDeliveryOrder />}
        />
        <Route
          path="/nadeulidelivery/updateDeliveryOrder"
          element={<UpdateDeliveryOrder />}
        />
        <Route
          path="/nadeulidelivery/getDeliveryOrder/:nadeuliDeliveryId"
          element={<GetDeliveryOrder />}
        />
        <Route
          path="/nadeulidelivery/getDeliveryOrderList"
          element={<GetDeliveryOrderList />}
        />
        <Route
          path="/nadeulidelivery/getMyOrderHistoryList"
          element={<GetMyOrderHistoryList />}
        />
        <Route
          path="/nadeulidelivery/getMyDeliveryHistoryList"
          element={<GetMyDeliveryHistoryList />}
        />
        <Route
          path="/nadeulidelivery/getMyAcceptedDeliveryHistoryList"
          element={<GetMyAcceptedDeliveryHistoryList />}
        />
        <Route
          path="/nadeulidelivery/cancelDeliveryOrder/:nadeuliDeliveryId"
          element={<CancelDeliveryOrder />}
        />
        <Route
          path="/nadeulidelivery/acceptDeliveryOrder"
          element={<AcceptDeliveryOrder />}
        />
        <Route
          path="/nadeulidelivery/cancelDelivery/:nadeuliDeliveryId"
          element={<CancelDelivery />}
        />
        <Route
          path="/nadeulidelivery/completeDelivery/:nadeuliDeliveryId"
          element={<CompleteDelivery />}
        />
        <Route
          path="/nadeulidelivery/getDeliveryNotificationList"
          element={<GetDeliveryNotificationList />}
        />
        <Route
          path="/nadeulidelivery/updateIsRead/:deliveryNotificationId"
          element={<UpdateIsRead />}
        />
        <Route
          path="/nadeulidelivery/deleteDeliveryNotification/:deliveryNotificationId"
          element={<DeleteDeliveryNotification />}
        />
      </Routes>
    </Router>
  );
}

export default App;
