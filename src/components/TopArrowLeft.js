import React from 'react';
import { SlArrowLeft } from "react-icons/sl";
import '../style/css/dropdownMenu.css';

function TopArrowLeft({navigate }) {

  const handleArrowClick = () => {
    navigate({navigate});
  };

  return (
    <div className="arrow-menu">
        <SlArrowLeft size="30" onClick={handleArrowClick} />
    </div>
  );
}

export default TopArrowLeft;