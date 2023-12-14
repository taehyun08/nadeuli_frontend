import React from 'react';
import { SlArrowLeft } from "react-icons/sl";
import '../style/css/dropdownMenu.css';

function TopArrowLeft({onBackClick}) {

  return (
    <div className="arrow-menu">
        <SlArrowLeft size="30" onClick={onBackClick} />
    </div>
  );
}

export default TopArrowLeft;