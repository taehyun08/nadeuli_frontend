import React, { useState } from 'react';
import "../style/css/topBar.css";
import { ImSearch } from "react-icons/im";

const Topbar = () => {
  const location = "성동구";
  const [isSearchVisible, setSearchVisible] = useState(false);

  const handleSearchClick = () => {
    // 검색 아이콘 클릭 시 검색창 표시 토글
    setSearchVisible(!isSearchVisible);
  };

  return (
    <div className="TMenuBar">
      <span className="location">{location}</span>
      <div className={`search-container ${isSearchVisible ? 'active' : ''}`}>
        <ImSearch onClick={handleSearchClick} className="search-icon" />
        {isSearchVisible && (
          <input
            type="text"
            className="search-input"
            placeholder="검색어를 입력하세요"
          />
        )}
      </div>
    </div>
  );
};

export default Topbar;
