import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import { get, post } from "../../util/axios";
import {
  Box,
  ButtonContainer,
  DeliveryState,
  DetailColumn,
  DetailContainer,
  DetailInfo,
  DetailLabel,
  DetailRow,
  HeaderContainer,
  OrderTitle,
  SliderWrapper,
  StyledButton,
  StyledContainer,
} from "./NadeuliDeliveryStyledComponent";
import HeaderBack from "../../components/HeaderBack";
import { useSelector } from "react-redux";

const GetDeliveryOrder = () => {
  // 배달 주문을 조회한다.
  const { nadeuliDeliveryId } = useParams();
  const [nadeuliDeliveryDTO, setNadeuliDeliveryDTO] = useState({});
  const navigate = useNavigate();
  const memberTag = useSelector((state) => state.member.tag);
  const memberNickName = useSelector((state) => state.member.nickname);

  useEffect(() => {
    get(`/nadeulidelivery/getDeliveryOrder/${nadeuliDeliveryId}`)
      .then((response) => {
        console.log(response);
        setNadeuliDeliveryDTO(response);
      })
      .catch((error) => {
        console.log("배달 주문 에러", error);
      });
  }, [nadeuliDeliveryId]);

  const handleUpdateDeliveryOrder = () => {
    navigate(`/updateDeliveryOrder/${nadeuliDeliveryId}`);
  };

  const handleCancelDeliveryOrder = () => {
    get(`/nadeulidelivery/cancelDeliveryOrder/${nadeuliDeliveryId}`)
      .then((response) => {
        console.log(response);
        alert("주문 취소 완료!");
        navigate("/getMyOrderHistoryList");
      })
      .catch((error) => {
        console.error("주문 취소 처리 에러", error);
      });
  };

  const handleAcceptOrder = () => {
    // nadeuliDeliveryDTO의 복사본을 만듭니다.
    const updatedDeliveryDTO = {
      ...nadeuliDeliveryDTO,
      deliveryPerson: {
        tag: memberTag, // 전역 상태에서 가져온 tag
        nickname: memberNickName, // 전역 상태에서 가져온 nickname
      },
    };
    post(`/nadeulidelivery/acceptDeliveryOrder`, updatedDeliveryDTO)
      .then((response) => {
        console.log(response);
        alert("주문 수락 완료!");
        navigate("/nadeuliDeliveryHome");
      })
      .catch((error) => {
        console.error("주문 수락 처리 에러", error);
      });
  };

  const handleCancelDelivery = () => {
    get(`/nadeulidelivery/cancelDelivery/${nadeuliDeliveryId}`)
      .then((response) => {
        console.log(response);
        alert("배달 취소 완료!");
        navigate("/nadeuliDeliveryHome");
      })
      .catch((error) => {
        console.error("배달 취소 처리 에러", error);
      });
  };

  const handleCompleteDelivery = () => {
    get(`/nadeulidelivery/completeDelivery/${nadeuliDeliveryId}`)
      .then((response) => {
        console.log(response);
        alert("배달 완료!");
        navigate("/nadeuliDeliveryHome");
      })
      .catch((error) => {
        console.error("배달 완료 처리 에러", error);
      });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ko-KR", {
      minimumFractionDigits: 0, // 소수점 이하 자릿수 (0으로 설정하면 소수점 없음)
    }).format(value);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderBack />
        <Box style={{ paddingLeft: "100px" }}>
          <OrderTitle>배달 주문</OrderTitle>
        </Box>
      </HeaderContainer>
      <StyledContainer>
        <DetailContainer>
          <DetailLabel>{nadeuliDeliveryDTO.title}</DetailLabel>
        </DetailContainer>
        <SliderWrapper style={{ marginBottom: "20px", marginTop: "20px" }}>
          <ImageSlider style images={nadeuliDeliveryDTO.images || []} />
        </SliderWrapper>
        <DetailContainer>
          <DetailRow>
            <DetailColumn>
              <DetailLabel>구매자</DetailLabel>
            </DetailColumn>
            <DetailColumn>
              <DetailLabel>배송자</DetailLabel>
            </DetailColumn>
          </DetailRow>
          <DetailRow>
            <DetailColumn>
              {nadeuliDeliveryDTO.buyer && (
                <>
                  <DetailInfo>{nadeuliDeliveryDTO.buyer.tag}</DetailInfo>
                  <DetailInfo>{nadeuliDeliveryDTO.buyer.nickname}</DetailInfo>
                </>
              )}
            </DetailColumn>
            <DetailColumn>
              {nadeuliDeliveryDTO.deliveryPerson && (
                <>
                  <DetailInfo>
                    {nadeuliDeliveryDTO.deliveryPerson.tag}
                  </DetailInfo>
                  <DetailInfo>
                    {nadeuliDeliveryDTO.deliveryPerson.nickname}
                  </DetailInfo>
                </>
              )}
            </DetailColumn>
          </DetailRow>
        </DetailContainer>
        <DetailContainer>
          <DetailLabel>배달 내용</DetailLabel>
          <DetailRow>
            <DetailInfo>{nadeuliDeliveryDTO.content}</DetailInfo>
          </DetailRow>
        </DetailContainer>
        <DetailContainer>
          <DetailLabel>상품 구분</DetailLabel>

          {nadeuliDeliveryDTO.productNum ? (
            <DetailInfo>일반 상품</DetailInfo>
          ) : (
            <DetailInfo>중고 상품</DetailInfo>
          )}
        </DetailContainer>
        <DetailContainer>
          <DetailLabel>상품명</DetailLabel>
          <DetailInfo>{nadeuliDeliveryDTO.productName}</DetailInfo>
        </DetailContainer>
        <DetailContainer>
          <DetailLabel>구매 금액</DetailLabel>
          <DetailInfo>
            {formatCurrency(nadeuliDeliveryDTO.productPrice)} 원
          </DetailInfo>
        </DetailContainer>
        {nadeuliDeliveryDTO.productNum > 0 && (
          <DetailContainer>
            <DetailLabel>상품 수량</DetailLabel>
            <DetailInfo>
              {formatCurrency(nadeuliDeliveryDTO.productNum)} 개
            </DetailInfo>
          </DetailContainer>
        )}
        <DetailContainer>
          <DetailLabel>배달비</DetailLabel>
          <DetailInfo>
            {formatCurrency(nadeuliDeliveryDTO.deliveryFee)} 원
          </DetailInfo>
        </DetailContainer>
        <DetailContainer>
          <DetailLabel>나드리페이 보증금</DetailLabel>
          <DetailInfo>
            {formatCurrency(nadeuliDeliveryDTO.deposit)} 원
          </DetailInfo>
        </DetailContainer>
        <DetailContainer>
          <DetailLabel>출발지</DetailLabel>
          <DetailInfo>{nadeuliDeliveryDTO.departure}</DetailInfo>
        </DetailContainer>
        <DetailContainer>
          <DetailLabel>도착지</DetailLabel>
          <DetailInfo>{nadeuliDeliveryDTO.arrival}</DetailInfo>
        </DetailContainer>
        <DeliveryState>배달 현황</DeliveryState>
        <DetailContainer>
          <DetailLabel>주문 등록</DetailLabel>
          <DetailInfo>{nadeuliDeliveryDTO.regDate}</DetailInfo>
          {nadeuliDeliveryDTO.deliveryState === "CANCEL_ORDER" && (
            <>
              <DetailLabel>주문 취소</DetailLabel>
              <DetailInfo>{nadeuliDeliveryDTO.orderCancelDate}</DetailInfo>
            </>
          )}
          {(nadeuliDeliveryDTO.deliveryState === "ACCEPT_ORDER" ||
            nadeuliDeliveryDTO.orderAcceptDate) && (
            <>
              <DetailLabel>주문 수락</DetailLabel>
              <DetailInfo>{nadeuliDeliveryDTO.orderAcceptDate}</DetailInfo>
            </>
          )}
          {(nadeuliDeliveryDTO.deliveryState === "CANCEL_DELIVERY" ||
            nadeuliDeliveryDTO.deliveryCancelDate) && (
            <>
              <DetailLabel>배달 취소</DetailLabel>
              <DetailInfo>{nadeuliDeliveryDTO.deliveryCancelDate}</DetailInfo>
            </>
          )}
          {(nadeuliDeliveryDTO.deliveryState === "COMPLETE_DELIVERY" ||
            nadeuliDeliveryDTO.orderCancelDate) && (
            <>
              <DetailLabel>배달 완료</DetailLabel>
              <DetailInfo>{nadeuliDeliveryDTO.deliveryCompleteDate}</DetailInfo>
            </>
          )}
        </DetailContainer>
        <ButtonContainer>
          {memberTag === nadeuliDeliveryDTO.buyer?.tag &&
          nadeuliDeliveryDTO.deliveryState === "DELIVERY_ORDER" ? (
            <>
              <StyledButton onClick={handleUpdateDeliveryOrder}>
                주문 수정
              </StyledButton>
              <StyledButton onClick={handleCancelDeliveryOrder}>
                주문 취소
              </StyledButton>
            </>
          ) : memberTag !== nadeuliDeliveryDTO.buyer?.tag &&
            nadeuliDeliveryDTO.deliveryState === "DELIVERY_ORDER" ? (
            <StyledButton style={{ width: "100%" }} onClick={handleAcceptOrder}>
              주문 수락
            </StyledButton>
          ) : memberTag === nadeuliDeliveryDTO.deliveryPerson?.tag &&
            nadeuliDeliveryDTO.deliveryState === "ACCEPT_ORDER" ? (
            <>
              <StyledButton onClick={handleCancelDelivery}>
                배달 취소
              </StyledButton>
              <StyledButton onClick={handleCompleteDelivery}>
                배달 완료
              </StyledButton>
            </>
          ) : null}
        </ButtonContainer>
      </StyledContainer>
    </>
  );
};

export default GetDeliveryOrder;
