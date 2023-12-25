import React, { useState } from "react";
import {
  StyledInput,
  StyledLabel,
  StyledQueryButton,
} from "./NadeuliDeliveryStyledComponent";
import "../public/css/nadeuliDeliveryListForm.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <>
      <br />
      <StyledLabel style={{ textAlign: "right" }}>보증금 견적받기</StyledLabel>
      <form className="query-container" onClick={handleSearch}>
        <StyledInput
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
        />
        <StyledQueryButton type="submit">검색</StyledQueryButton>
      </form>
      <p>상품 키워드를 검색하면 구매 금액을 정해줍니다.</p>
    </>
  );
};

export default SearchBar;
