import React, { useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import '../style/css/dropdownMenu.css';

function TopDropdownMenu({ onEditClick, onDeleteClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-menu">
      <div className="icons">
        <div className="divider" />
        <SlOptionsVertical size="30" onClick={toggleDropdown} />
        </div>
      {isOpen && (
        <ul className="dropdown-list">
          <li onClick={onEditClick}>수정</li>
          <li onClick={onDeleteClick}>삭제</li>
        </ul>
      )}
    </div>
  );
}

export default TopDropdownMenu;