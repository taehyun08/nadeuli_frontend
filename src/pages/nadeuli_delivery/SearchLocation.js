import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledContainer,
} from "./NadeuliDeliveryStyledComponent";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";

const SearchLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData] = useState(location.state.orderData || {});
  const [selectedAddress, setSelectedAddress] = useState("");
  const [departureAddress, setDepartureAddress] = useState("");
  const [arrivalAddress, setArrivalAddress] = useState("");
  const mapContainer = useRef(null);

  useEffect(() => {
    // 카카오 지도 스크립트를 동적으로 로드합니다
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=adee71fb6cb02644a95cd86ef49eeaff&autoload=false&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      // 스크립트 로드 완료 후 지도 생성
      kakao.maps.load(() => {
        // 지도가 표시될 div의 참조
        const mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

        // 지도의 초기 옵션 설정
        // 지도 객체 생성
        const map = new kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new kakao.maps.services.Geocoder();

        // 클릭한 위치를 표시할 마커입니다
        const marker = new kakao.maps.Marker(),
          // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
          infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

        // 현재 위치를 가져오는 함수
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // 현재 위치를 기준으로 지도 중심을 재설정
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const newPos = new kakao.maps.LatLng(lat, lng);
              // 현재 위치에 마커 생성
              const currentPositionMarker = new kakao.maps.Marker({
                position: newPos,
              });

              // 마커를 지도에 표시
              currentPositionMarker.setMap(map);

              // 인포윈도우에 표시될 내용
              const message =
                '<div style="padding:5px; text-align: center; font-size: 14px;">현재 위치(목적지 아님)</div>';

              // 인포윈도우 생성
              const infowindow = new kakao.maps.InfoWindow({
                content: message,
              });

              // 인포윈도우를 마커 위에 표시
              infowindow.open(map, currentPositionMarker);

              // 지도 중심을 현재 위치로 이동
              map.setCenter(newPos);
            },
            () => {
              console.error("Geolocation failed or permission denied");
            }
          );
        } else {
          console.error("Browser does not support Geolocation");
        }

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          searchDetailAddrFromCoords(
            mouseEvent.latLng,
            function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                let detailAddr = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name;

                // 마커를 클릭한 위치에 표시합니다
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);

                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                infowindow.setContent(
                  '<div style="padding:5px;font-size:12px;">' +
                    detailAddr +
                    "</div>"
                );
                infowindow.open(map, marker);

                // 선택된 주소 상태 업데이트
                setSelectedAddress(detailAddr);
              }
            }
          );
        });

        function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
      });
    };

    // 컴포넌트 언마운트 시 스크립트 태그 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 출발지 설정 함수
  const handleSetDeparture = () => {
    setDepartureAddress(selectedAddress);
  };

  // 도착지 설정 함수
  const handleSetArrival = () => {
    setArrivalAddress(selectedAddress);
  };

  // 설정 확인 및 돌아가기 함수
  const handleConfirmSettings = () => {
    if (location.state) {
    }
    // orderData에 출발지, 도착지 및 selectedFiles 추가
    const updatedOrderData = {
      ...orderData,
      departure: departureAddress,
      arrival: arrivalAddress,
    };

    // 변경된 orderData를 상태로 전달하며 AddDeliveryOrder 페이지로 이동
    navigate("/addDeliveryOrder", { state: { orderData: updatedOrderData } });
  };

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setSelectedAddress(fullAddress);

    const geocoder = new kakao.maps.services.Geocoder();
    // 지도가 표시될 div의 참조
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도의 초기 옵션 설정
    // 지도 객체 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 클릭한 위치를 표시할 마커입니다
    const marker = new kakao.maps.Marker();

    // 주소를 좌표로 변환
    geocoder.addressSearch(fullAddress, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도 중심을 변경하고 마커를 표시
        map.setCenter(coords);
        marker.setPosition(coords);
        marker.setMap(map);
      }
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    // 지도 크기 설정
    <StyledContainer style={{ justifyContent: "center" }}>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "400px" }}
      ></div>
      <br />
      <p style={{ fontWeight: "bold" }}>선택된 주소 : {selectedAddress}</p>
      <p style={{ fontWeight: "bold" }}>출발지 : {departureAddress}</p>
      <p style={{ fontWeight: "bold" }}>도착지 : {arrivalAddress}</p>
      <div style={{ textAlign: "center", justifyContent: "center" }}>
        <StyledButton onClick={handleSetDeparture} style={{ width: "90%" }}>
          출발지 설정하기
        </StyledButton>

        <StyledButton onClick={handleSetArrival} style={{ width: "90%" }}>
          도착지 설정하기
        </StyledButton>

        <StyledButton
          type="button"
          onClick={handleClick}
          style={{ width: "90%" }}
        >
          주소 검색
        </StyledButton>

        <StyledButton
          onClick={handleConfirmSettings}
          style={{ width: "90%", fontWeight: "bold" }}
        >
          설정 확인
        </StyledButton>
      </div>
    </StyledContainer>
  );
};

export default SearchLocation;
