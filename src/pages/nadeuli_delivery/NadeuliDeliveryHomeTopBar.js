import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import "./nadeuliDeliveryListForm.css";
import { get, post } from "../../util/axios";

const NadeuliDeliveryHomeTopBar = ({ onSearch }) => {
  const location = useSelector((state) => state.member.gu);
  const memberTag = useSelector((state) => state.member.tag);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNadeuliDeliveryEnabled, setIsNadeuliDeliveryEnabled] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    get(`/nadeuli/member/getMember/${memberTag}`)
      .then((response) => {
        // API 응답에 따라 스위치 상태를 설정합니다.
        setIsNadeuliDeliveryEnabled(response.isNadeuliDelivery);
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
      });
  }, [memberTag]);

  const handleNotificationToggle = () => {
    const newStatus = !isNadeuliDeliveryEnabled;
    setIsNadeuliDeliveryEnabled(newStatus);
    get(`/nadeuli/member/handleNadeuliDelivery/${memberTag}`)
      .then((response) => {
        if (response) {
          console.log("NadeuliDelivery status updated successfully");
        } else {
          console.error("Failed to update NadeuliDelivery status");
          // API 호출이 실패했다면 스위치 상태를 원래대로 되돌립니다.
          setIsNadeuliDeliveryEnabled(!newStatus);
        }
      })
      .catch((error) => {
        console.error("Error updating NadeuliDelivery status:", error);
        // 에러가 발생했다면 스위치 상태를 원래대로 되돌립니다.
        setIsNadeuliDeliveryEnabled(!newStatus);
      });
  };

  const handleNotificationsClick = () => {
    // 스위치가 켜져 있을 때만 알림을 표시합니다.
    if (isNadeuliDeliveryEnabled) {
      setShowNotifications(!showNotifications);

      if (!showNotifications) {
        const deliveryNotificationDTO = {
          nadeuliDelivery: {
            buyer: {
              tag: memberTag,
            },
          },
        };

        post(
          "/nadeuli/nadeulidelivery/getDeliveryNotificationList",
          deliveryNotificationDTO,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              currentPage: 0,
            },
          }
        )
          .then((response) => {
            console.log(response);
            setNotifications(response);
          })
          .catch((error) => {
            console.error("Error fetching delivery notifications:", error);
          });
      }
    } else {
      // 스위치가 꺼져 있으면 알림을 숨깁니다.
      setShowNotifications(false);
    }
  };

  const handleSearchClick = () => {
    // 검색 입력 필드 확인용
    setSearchVisible(!isSearchVisible);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // 입력 값 업데이트
    onSearch(query); // 검색 쿼리를 상위 컴포넌트로 전달
  };

  const handleSearch = () => {
    // 검색 기능을 구현합니다.
    console.log("검색어:", searchQuery);
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    // Enter 키가 눌릴 때 검색을 트리거합니다.
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="deliveryTMenuBar">
      <div className="left-group">
        <span className="location">{location}</span>
      </div>
      <div className="right-group">
        <label className="switch" style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            checked={isNadeuliDeliveryEnabled}
            onChange={handleNotificationToggle}
          />
          <span className="slider"></span>
        </label>
        <IoIosNotifications
          style={{ fontSize: "30px", marginRight: "20px" }}
          onClick={handleNotificationsClick}
        />
        {showNotifications && (
          <div className="notifications-dropdown">
            {notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                <p>알림 내용: {notification.notificationContent}</p>
              </div>
            ))}
          </div>
        )}
        <div className={`search-container ${isSearchVisible ? "active" : ""}`}>
          <ImSearch onClick={handleSearchClick} className="search-icon" />
          {isSearchVisible && (
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NadeuliDeliveryHomeTopBar;
