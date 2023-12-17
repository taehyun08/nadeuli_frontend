import React, { useContext, useEffect, useRef, useState } from "react";
import AddressContext from "./AddressContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledContainer,
} from "./NadeuliDeliveryStyledComponent";

const SearchLocation = () => {
  const navigate = useNavigate();
  const { setAddressState } = useContext(AddressContext);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [departureAddress, setDepartureAddress] = useState("");
  const [arrivalAddress, setArrivalAddress] = useState("");
  const mapContainer = useRef(null);
  const location = useLocation();
  const locationType = location.state?.type; // 사용자가 선택한 위치 타입

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
            level: 1, // 지도의 확대 레벨
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

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          searchDetailAddrFromCoords(
            mouseEvent.latLng,
            function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                // let detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                // detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                let detailAddr = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name;
                // const content = '<div class="bAddr">' +
                //     '<span class="title">법정동 주소정보</span>' +
                //     detailAddr +
                //     '</div>';

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

  const handleSetDeparture = () => {
    setDepartureAddress(selectedAddress);
    setAddressState((prev) => ({ ...prev, departure: selectedAddress }));
  };

  const handleSetArrival = () => {
    setArrivalAddress(selectedAddress);
    setAddressState((prev) => ({ ...prev, arrival: selectedAddress }));
  };

  const handleConfirmSettings = () => {
    setAddressState({ departure: departureAddress, arrival: arrivalAddress });
    navigate("/addDeliveryOrder");
  };

  return (
    // 지도 크기 설정
    <StyledContainer>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "400px" }}
      ></div>
      <p>선택된 주소: {selectedAddress}</p>
      <p>출발지: {departureAddress}</p>
      <p>도착지: {arrivalAddress}</p>
      <div style={{ textAlign: "right" }}>
        <StyledButton onClick={handleSetDeparture}>
          출발지 설정하기
        </StyledButton>
        <br />
        <StyledButton onClick={handleSetArrival}>도착지 설정하기</StyledButton>
        <br />
        <StyledButton onClick={handleConfirmSettings}>설정 확인</StyledButton>
      </div>
    </StyledContainer>
  );
};

export default SearchLocation;
