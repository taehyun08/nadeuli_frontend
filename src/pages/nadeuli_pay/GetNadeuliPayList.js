import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { get } from "../../util/axios"
import HeaderBack from "../../components/HeaderBack";
import NadeuliButton from "../../components/NadeuliButton";
import NadeuliList from "../../components/NadeuliList";

function NadeuliPayPay() {
    const navigate = useNavigate();
    const {itemList, setItemList} = useState(null);
    const {tradeType, setTradeType} = useState(null);
    const member = useSelector((state) => state.member);
    const title = '나드리페이 내역조회';

    useEffect(() => {
        console.log(itemList);
        getList(null);
      },[])

    const getList = async () => {
        await get(`/nadeuliPay/getNadeuliPayList/0/${tradeType || ''}/${member.tag}`)
        .then((res) => {
            console.log(res);
            setItemList(res);
        })
    }

    const handleAll = () => {
        console.log('전체 버튼 클릭');
        setTradeType(null);
        getList();
      };
    
      const handleCharge = () => {
        console.log('충전 버튼 클릭');
        setTradeType(0);
        getList();
      };
    
      const handleWithdraw = () => {
        console.log('출금 버튼 클릭');
        setTradeType(1);
        getList();
      };
    
      const handlePayment = () => {
        console.log('결제 버튼 클릭');
        setTradeType(2);
        getList();
      };

    return (
        <div style={{ marginTop: '20px', marginLeft: '10px' }}>
        <HeaderBack title={title} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center align
          }}
        >
        </div>
        <NadeuliButton 
          handleAll={handleAll}
          handleCharge={handleCharge}
          handleWithdraw={handleWithdraw}
          handlePayment={handlePayment}
        />
        <NadeuliList items={itemList} />
      </div>
    );
}

export default NadeuliPayPay;