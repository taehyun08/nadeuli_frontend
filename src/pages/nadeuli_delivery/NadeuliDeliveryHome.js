import React, { useEffect, useState } from "react";
import { post } from "../../util/axios";
import {
  Box,
  CardBox,
  DetailColumn,
  DetailLabel,
  DetailRow,
  GetMyAcceptedDeliveryHistoryListButton,
  OrderButton,
  OrderImage,
  OrderInfo,
} from "./NadeuliDeliveryStyledComponent";
import BottomBar from "../../components/BottonBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NadeuliDeliveryHomeTopBar from "./NadeuliDeliveryHomeTopBar";

const NadeuliDeliveryHome = () => {
  const [responseDTOList, setResponseDTOList] = useState([]);
  const navigate = useNavigate();
  const memberGu = useSelector((state) => state.member.gu);

  useEffect(() => {
    const requestData = {
      gu: memberGu,
    };

    post("/nadeuli/nadeulidelivery/getDeliveryOrderList", requestData, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        currentPage: 0,
      },
    })
      .then((response) => {
        console.log("getDeliveryOrderList 호출 완료!", response);
        setResponseDTOList(response);
      })
      .catch((error) => {
        console.log("getDeliveryOrderList 호출 에러!", error);
      });
  }, [memberGu]);

  const handleNavigateToOrder = (nadeuliDeliveryId) => {
    navigate(`/getDeliveryOrder/${nadeuliDeliveryId}`);
  };

  const handleAddDeliveryOrder = () => {
    navigate("/addDeliveryOrder");
  };

  const handleNavigateMyAcceptedDeliveryHistoryList = () => {
    navigate("/getMyAcceptedDeliveryHistoryList");
  };

  const maxLength = 10;

  const truncateTitle = (title) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`; // 길이가 maxLength보다 길면 잘라내고 "..." 추가
    }
    return title;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ko-KR", {
      minimumFractionDigits: 0, // 소수점 이하 자릿수 (0으로 설정하면 소수점 없음)
    }).format(value);
  };

  return (
    <div className="Wrap">
      <NadeuliDeliveryHomeTopBar />
      <Box></Box>

      {responseDTOList.map((responseDTO, index) => (
        <div className="MainListBox">
          <CardBox
            className="card"
            key={index}
            onClick={() => handleNavigateToOrder(responseDTO.nadeuliDeliveryId)}
          >
            <DetailRow>
              <DetailColumn>
                <OrderImage src={responseDTO.images[0]} alt="이미지" />
              </DetailColumn>
              <DetailColumn>
                <DetailLabel style={{ fontWeight: "bold" }}>
                  {truncateTitle(responseDTO.title)}
                </DetailLabel>
                <OrderInfo>
                  구매금액 {formatCurrency(responseDTO.productPrice)}원
                </OrderInfo>
                <OrderInfo>
                  부름비 {formatCurrency(responseDTO.deliveryFee)}원
                </OrderInfo>
                <OrderInfo>
                  보증금 {formatCurrency(responseDTO.deposit)}원
                </OrderInfo>
              </DetailColumn>
              <DetailColumn>
                <DetailLabel>주문 등록</DetailLabel>
                <DetailLabel style={{ marginLeft: "10px" }}>
                  {responseDTO.timeAgo}
                </DetailLabel>
              </DetailColumn>
            </DetailRow>
          </CardBox>
        </div>
      ))}
      <GetMyAcceptedDeliveryHistoryListButton
        onClick={handleNavigateMyAcceptedDeliveryHistoryList}
      >
        주문수락 목록
      </GetMyAcceptedDeliveryHistoryListButton>
      <OrderButton onClick={handleAddDeliveryOrder}>배달 주문하기</OrderButton>
      <BottomBar />
    </div>
  );
};

export default NadeuliDeliveryHome;
