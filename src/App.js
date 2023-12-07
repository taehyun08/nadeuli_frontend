import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NadeuliPayList from '../page/nadeuli_pay/NadeuliPayList';
import NadeuliPayCharge from '../page/nadeuli_pay/NadeuliPayCharge';
import NadeuliPayWithdraw from '../page/nadeuli_pay/NadeuliPayWithdraw';
import NadeuliPayPay from '../page/nadeuli_pay/NadeuliPayPay';

import ProductList from '../page/product/ProductList';
import ProductDetail from '../page/product/ProductDetail';
import ProductUpdate from '../page/product/ProductUpdate';
import ProductAdd from '../page/product/ProductAdd';
import MyProductList from '../page/product/MyProductList';
import ProductDelete from '../page/product/ProductDelete';
import SaleCompleted from '../page/product/SaleCompleted';

import TradeReviewAdd from '../page/trade/TradeReviewAdd';
import TradeReviewUpdate from '../page/trade/TradeReviewUpdate';
import TradeReviewList from '../page/trade/TradeReviewList';
import TradeReviewDelete from '../page/trade/TradeReviewDelete';
import TradeScheduleAdd from '../page/trade/TradeScheduleAdd';
import TradeScheduleDetail from '../page/trade/TradeScheduleDetail';
import TradeScheduleUpdate from '../page/trade/TradeScheduleUpdate';
import TradeScheduleList from '../page/trade/TradeScheduleList';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/nadeuliPay/getNadeuliPayList/:currentPage/:tradeType/:tag" component={NadeuliPayList} />
        <Route path="/nadeuliPay/nadeuliPayCharge" component={NadeuliPayCharge} />
        <Route path="/nadeuliPay/nadeuliPayWithdraw" component={NadeuliPayWithdraw} />
        <Route path="/nadeuliPay/nadeuliPayPay" component={NadeuliPayPay} />

        <Route path="/product/home/:currentPage/:gu" component={ProductList} />
        <Route path="/product/getProduct/:productId" component={ProductDetail} />
        <Route path="/product/updateProduct" component={ProductUpdate} />
        <Route path="/product/addProduct" component={ProductAdd} />
        <Route path="/product/getMyProductList/:tag/:currentPage" component={MyProductList} />
        <Route path="/product/deleteProduct/:productId" component={ProductDelete} />
        <Route path="/product/saleCompleted" component={SaleCompleted} />

        <Route path="/trade/addTradeReview" component={TradeReviewAdd} />
        <Route path="/trade/updateTradeReview" component={TradeReviewUpdate} />
        <Route path="/trade/getTradeReviewList/:tag/:currentPage" component={TradeReviewList} />
        <Route path="/trade/deleteTradeReview/:tradeReviewId" component={TradeReviewDelete} />
        <Route path="/trade/addTradingSchedule" component={TradeScheduleAdd} />
        <Route path="/trade/getTradingSchedule/:tradeScheduleId" component={TradeScheduleDetail} />
        <Route path="/trade/updateTradingSchedule" component={TradeScheduleUpdate} />
        <Route path="/trade/getTradingScheduleList/:tag/:currentPage" component={TradeScheduleList} />

        {/* 다른 라우트에 맞게 컴포넌트와 경로를 추가해주세요 */}
      </Switch>
    </Router>
  );
}

export default App;