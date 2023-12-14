import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Button } from "@mui/material";
import HeaderBack from "../../components/HeaderBack";
import PayModal from "../../components/PayModal";


function NadeuliPayCharge() {
  const navigate = useNavigate();
  const member = useSelector((state) => state.member);
  const [inputNumber, setInputNumber] = useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [payMoney, setPayMoney] = useState(null);

  useEffect(() => {
    setPayMoney(inputNumber);
  }, [inputNumber]);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleChargeButton = () => {
    setOpen(true);
  };

  const requestPay = () => {
    const IMP  = window.IMP;
    IMP.init("imp32856038");

    const data = {
        pg: "kakaopay.TC0ONETIME", // PG사
        pay_method: "card", // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: 10, // 결제금액
        name: "test", // 주문명
        buyer_name: member.nickname, // 구매자 이름
        buyer_tel: member.cellphone, // 구매자 전화번호
        buyer_email: member.email, // 구매자 이메일
        buyer_addr: member.dongNe, // 구매자 주소
        buyer_postcode: member.postcode, // 구매자 우편번호
    };

    IMP.request_pay(data, (res) => {
        console.log(res);
    });
  }

  return (
    <div style={{ marginTop: '20px', marginLeft: '10px' }}>
      <HeaderBack title="나드리페이 충전" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // 중앙 정렬
        }}
      >
        <input
          type="number"
          placeholder="금액을 입력해주세요."
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          style={{
            marginTop: '90%',
            marginBottom: '60px',
            padding: '10px',
            width: '250px', // 좌우 길이 조절
          }}
        />
        <Button
          variant="contained"
          disableElevation
          style={{ backgroundColor: '#1976d2', color: 'white', marginBottom: '10px' }}
          onClick={handleChargeButton}
        >
          충전하기
        </Button>
        <PayModal
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            payMoney={payMoney}
        />
      </div>
    </div>
  );
}

export default NadeuliPayCharge;