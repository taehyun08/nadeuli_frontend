import React, { useEffect, useState } from "react";
import {
  Box,
  FormRow,
  HeaderContainer,
  HiddenInput,
  InfoText,
  OrderTitle,
  SliderWrapper,
  StyledButton,
  StyledContainer,
  StyledDeliveryFeeInput,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledSelect,
  StyledTextArea,
  UploadButton,
} from "./NadeuliDeliveryStyledComponent";
import ImageSlider from "./ImageSlider";
import { post } from "../../util/axios";
import HeaderBack from "../../components/HeaderBack";
import { useSelector } from "react-redux";
import { postMultipart } from "../../util/postMultipart";
import { useNavigate } from "react-router-dom";

const AddDeliveryOrder = () => {
  // const { memberDTO } = useContext(null); // 이후 memberDTO 로 받은 값을 여기에 저장
  const [orderData, setOrderData] = useState({});
  const [productType, setProductType] = useState(null);
  const [files, setFiles] = useState([]);
  const [tradingOptions, setTradingOptions] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const member = useSelector((state) => state.member);
  const navigate = useNavigate();
  // const tag = "WVU3";
  // const memberTag = useSelector((state) => state.member.tag);
  // const addressState = useSelector((state) => state.address); // Redux 스토어에서 주소 상태 가져오기
  // const reduxProductType = useSelector((state) => state.productType.value);
  // const dispatch = useDispatch();

  // // Redux 상태 업데이트 함수
  // const handleSelectProductType = (type) => {
  //   dispatch(setProductType(type));
  // };

  // // 출발지 주소 설정 함수
  // const handleSetDeparture = (newAddress) => {
  //   dispatch(setDeparture(newAddress));
  // };

  // // 도착지 주소 설정 함수
  // const handleSetArrival = (newAddress) => {
  //   dispatch(setArrival(newAddress));
  // };

  // // 주소 상태 업데이트
  // useEffect(() => {
  //   setOrderData((prevData) => ({
  //     ...prevData,
  //     departure: addressState.departure,
  //     arrival: addressState.arrival,
  //   }));
  // }, [addressState.departure, addressState.arrival]);

  const handleChange = (e) => {
    setOrderData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductTypeClick = (type) => {
    setProductType(type);

    if (type === "new") {
      // "일반상품" 선택 시 구매 금액, 상품 수량, 부름비 초기화
      setOrderData((prev) => ({
        ...prev,
        productPrice: "", // 구매 금액 초기화
        productNum: "", // 상품 수량 초기화
        deliveryFee: "", // 부름비 초기화
      }));
    } else if (type === "used") {
      // "중고상품" 선택 시 productDetails 초기화
      setProductDetails(null);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);

    // FileReader를 사용하여 각 파일에 대한 미리보기 생성
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        });
      })
    )
      .then((images) => {
        setPreviewImage(images);
      })
      .catch((error) => console.error("미리보기 생성 오류", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 나드리페이 보증금 계산
    const deposit = calculatedDeposit().replace(/,/g, ""); // 모든 쉼표 제거

    // orderData 객체에 buyer.tag와 buyer.nickname 추가
    const updatedOrderData = {
      ...orderData,
      buyer: {
        tag: member.tag,
        nickname: member.nickname,
      },
      deliveryState: "DELIVERY_ORDER",
      deposit: parseInt(deposit, 10),
    };

    // 전달할 양식 데이터 준비
    const formData = new FormData();

    // 'nadeuliDeliveryDTO'라는 파트에 JSON 문자열로 변환된 데이터 추가
    formData.append(
      "nadeuliDeliveryDTO",
      new Blob([JSON.stringify(updatedOrderData)], {
        type: "application/json",
      })
    );

    // 파일을 formData에 추가
    for (const file of files) {
      formData.append("images", file);
    }

    // axios를 사용하여 데이터 전송
    postMultipart("/nadeulidelivery/addDeliveryOrder", formData)
      .then((response) => {
        console.log("배달 주문 완료!", response);
        alert("배달 주문 완료!!");
        navigate("/nadeuliDeliveryHome");
      })
      .catch((error) => console.log("주문 등록 실패", error));
  };

  // useEffect(() => {
  //   if (productType === 'used') {
  //     // memberDTO의 tag를 사용하여 거래 옵션 가져오기
  //     axios.post(`/nadeulidelivery/getAddOrUpdateUsedDeliveryOrder/${memberDTO.tag}`, { currentPage: 0 })
  //         .then(response => {
  //           setTradingOptions(response.data.map(item => ({
  //             ...item,
  //             productId: item.product.productId
  //           })));
  //         })
  //         .catch(error => {
  //           console.error("Error fetching trading options", error);
  //         });
  //   }
  // }, [productType, memberDTO.tag]);

  useEffect(() => {
    if (productType === "used") {
      // member 의 tag를 사용하여 거래 옵션 가져오기
      post(`/nadeulidelivery/getAddOrUpdateUsedDeliveryOrder/${member.tag}`, {
        currentPage: 0,
      })
        .then((response) => {
          setTradingOptions(
            response.map((item) => ({
              ...item,
              productId: item.product.productId,
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching trading options", error);
        });
    }
  }, [productType, member.tag]);

  const maxLength = 15; // 최대 표시 길이

  const truncateTitle = (title) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`; // 길이가 maxLength보다 길면 잘라내고 "..." 추가
    }
    return title;
  };

  const handleTradeScheduleChange = (e) => {
    const selectedTradeOption = tradingOptions.find(
      (option) => option.productId.toString() === e.target.value
    );

    if (selectedTradeOption) {
      setProductDetails(selectedTradeOption.product);
    }
  };

  // 받아온 거래 일정에서 시간 포맷을 한국 기준으로 변경(연월일시분)
  const formatTradingTime = (timeString) => {
    const date = new Date(timeString);
    const formatter = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formatter.format(date);
  };

  useEffect(() => {
    if (productType === "used" && productDetails) {
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        productName: productDetails.title,
        productPrice: productDetails.price,
      }));
    }
  }, [productType, productDetails]);

  // 나드리페이 보증금 계산
  const calculatedDeposit = () => {
    const productPrice = parseInt(orderData.productPrice, 10) || 0;
    const productNum = parseInt(orderData.productNum, 10) || 0;
    const deliveryFee = parseInt(orderData.deliveryFee, 10) || 0;

    let total;
    if (productType === "new" && productNum) {
      // 일반상품은 (구매 금액 * 상품 수량) + 부름비
      total = productPrice * productNum + deliveryFee;
    } else {
      // 중고상품은 구매 금액 + 부름비
      total = productPrice + deliveryFee;
    }
    return total.toLocaleString();
  };

  return (
    <>
      <HeaderContainer>
        <HeaderBack />
        <Box>
          <OrderTitle>배달 주문 등록</OrderTitle>
        </Box>
        <Box style={{ marginLeft: "20px" }}></Box>
      </HeaderContainer>
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit}>
          <FormRow>
            <StyledLabel htmlFor="title">제목</StyledLabel>
          </FormRow>
          <FormRow>
            <StyledInput
              type="text"
              id="title"
              name="title"
              placeholder="제목을 작성해 주세요."
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <StyledButton
              type="button"
              onClick={() => handleProductTypeClick("used")}
            >
              중고상품
            </StyledButton>
            <StyledButton
              type="button"
              onClick={() => handleProductTypeClick("new")}
            >
              일반상품
            </StyledButton>
          </FormRow>
          {productType ? (
            <>
              {productType === "used" && (
                <FormRow>
                  <StyledSelect
                    id="tradeSchedule"
                    name="tradeSchedule"
                    onChange={handleTradeScheduleChange}
                  >
                    <option value="">거래 일정 선택</option>
                    {tradingOptions.map((option, index) => (
                      <option key={index} value={option.productId}>
                        {`${formatTradingTime(
                          option.tradingTime
                        )} - ${truncateTitle(option.product.title)}`}
                      </option>
                    ))}
                  </StyledSelect>
                </FormRow>
              )}
              {productType === "used" && productDetails ? (
                <>
                  <SliderWrapper>
                    {previewImage && previewImage.length > 0 ? (
                      <ImageSlider images={previewImage} />
                    ) : productDetails && productDetails.images ? (
                      <ImageSlider images={productDetails.images} />
                    ) : null}
                  </SliderWrapper>
                  <FormRow>
                    <HiddenInput
                      type="file"
                      id="images"
                      name="images"
                      multiple
                      onChange={handleFileChange}
                    />
                    <UploadButton htmlFor="images">사진 업로드</UploadButton>
                  </FormRow>
                </>
              ) : (
                <>
                  {(previewImage && previewImage.length > 0) ||
                  (productDetails && productDetails.images) ? (
                    <SliderWrapper>
                      {previewImage && previewImage.length > 0 ? (
                        <ImageSlider images={previewImage} />
                      ) : productDetails && productDetails.images ? (
                        <ImageSlider images={productDetails.images} />
                      ) : null}
                    </SliderWrapper>
                  ) : null}
                  <FormRow>
                    <HiddenInput
                      type="file"
                      id="images"
                      name="images"
                      multiple
                      onChange={handleFileChange}
                    />
                    <UploadButton htmlFor="images">사진 업로드</UploadButton>
                  </FormRow>
                </>
              )}
              <FormRow>
                <StyledLabel htmlFor="content">내용</StyledLabel>
              </FormRow>
              <FormRow>
                <StyledTextArea
                  type="text"
                  id="content"
                  name="content"
                  placeholder="게시물 내용을 작성해 주세요."
                  rows={6}
                  onChange={handleChange}
                />
              </FormRow>
              {productType === "used" && productDetails ? (
                <>
                  <FormRow>
                    <StyledLabel
                      style={{ textAlign: "right" }}
                      htmlFor="productName"
                    >
                      상품 게시물 제목
                    </StyledLabel>
                  </FormRow>
                  <FormRow style={{ justifyContent: "right" }}>
                    {productDetails.title}
                    <HiddenInput
                      type="text"
                      id="productName"
                      name="productName"
                      value={productDetails.title}
                      onChange={handleChange}
                    />
                  </FormRow>
                </>
              ) : (
                <>
                  <FormRow>
                    <StyledLabel
                      style={{ textAlign: "right" }}
                      htmlFor="productName"
                    >
                      상품 이름
                    </StyledLabel>
                  </FormRow>
                  <FormRow
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <StyledInput
                      type="text"
                      id="productName"
                      name="productName"
                      placeholder="상품 이름"
                      onChange={handleChange}
                    />
                  </FormRow>
                </>
              )}
              {productType === "used" && productDetails ? (
                <>
                  <FormRow>
                    <StyledLabel
                      style={{ textAlign: "right" }}
                      htmlFor="productPrice"
                    >
                      구매 금액
                    </StyledLabel>
                  </FormRow>
                  <FormRow
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {productDetails.price.toLocaleString()}
                    <span style={{ alignSelf: "center" }}>원</span>
                    <HiddenInput
                      type="number"
                      id="productPrice"
                      name="productPrice"
                      value={productDetails.price}
                      onChange={handleChange}
                    />
                  </FormRow>
                </>
              ) : (
                <>
                  <FormRow>
                    <StyledLabel
                      style={{ textAlign: "right" }}
                      htmlFor="productPrice"
                    >
                      구매 금액
                    </StyledLabel>
                  </FormRow>
                  <FormRow
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <StyledInput
                      type="number"
                      id="productPrice"
                      name="productPrice"
                      placeholder="구매 금액"
                      onChange={handleChange}
                    />
                    <span style={{ alignSelf: "center" }}>원</span>
                  </FormRow>
                </>
              )}
              {productType === "new" && (
                <>
                  <FormRow>
                    <StyledLabel
                      style={{ textAlign: "right" }}
                      htmlFor="productNum"
                    >
                      상품 수량
                    </StyledLabel>
                  </FormRow>
                  <FormRow
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <StyledInput
                      type="number"
                      id="productNum"
                      name="productNum"
                      placeholder="상품 수량"
                      onChange={handleChange}
                    />
                    <span style={{ alignSelf: "center" }}>개</span>
                  </FormRow>
                </>
              )}
              <FormRow>
                <StyledLabel
                  style={{ textAlign: "right" }}
                  htmlFor="deliveryFee"
                >
                  부름비
                </StyledLabel>
              </FormRow>
              <FormRow
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <StyledDeliveryFeeInput
                  type="number"
                  id="deliveryFee"
                  name="deliveryFee"
                  placeholder="부름비를 입력해 주세요."
                  onChange={handleChange}
                  style={{ marginRight: "10px" }}
                />
                <span style={{ alignSelf: "center" }}>원</span>
              </FormRow>

              <FormRow>
                <StyledLabel style={{ textAlign: "right" }} htmlFor="deposit">
                  나드리페이 보증금
                </StyledLabel>
              </FormRow>
              <FormRow style={{ justifyContent: "right" }}>
                {calculatedDeposit()}&nbsp;&nbsp;&nbsp;원
                <HiddenInput
                  type="number"
                  id="deposit"
                  name="deposit"
                  onChange={handleChange}
                />
              </FormRow>
              <FormRow>
                {/* onClick={handleSetDeparture} */}
                <StyledButton type="button">출발지 설정</StyledButton>
                {/* onClick={handleSetArrival} */}
                <StyledButton type="button">도착지 설정</StyledButton>
              </FormRow>
              <FormRow>
                <StyledLabel htmlFor="departure">출발지</StyledLabel>
              </FormRow>
              {/* id="departure" name="departure" */}
              <FormRow>
                {/* {orderData.departure} */}
                <StyledInput
                  type="text"
                  id="departure"
                  name="departure"
                  placeholder="출발지 주소를 입력해 주세요."
                  onChange={handleChange}
                />
              </FormRow>
              <FormRow>
                <StyledLabel htmlFor="arrival">도착지</StyledLabel>
              </FormRow>
              {/* id="arrival" name="arrival" */}
              <FormRow>
                <StyledInput
                  type="text"
                  id="arrival"
                  name="arrival"
                  placeholder="도착지 주소를 입력해 주세요."
                  onChange={handleChange}
                />
                {/* {orderData.arrival} */}
              </FormRow>
              <FormRow>
                <StyledButton type="submit">작성 완료</StyledButton>
              </FormRow>
            </>
          ) : (
            <InfoText>중고 상품/일반 상품 버튼을 눌러주세요.</InfoText>
          )}
        </StyledForm>
      </StyledContainer>
    </>
  );
};

export default AddDeliveryOrder;
