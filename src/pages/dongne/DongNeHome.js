import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DongNePostList from '../../components/DongNePostList';
import BottomBar from '../../components/BottonBar';
import { AiFillHome } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';

function DongNeHome() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div className="Wrap">
      <div className="TMenuBar">
        <span> {user.userLocation} </span>
      </div>
      <div className="topView">
        <DongNePostList />
      </div>
      <BottomBar />
    </div>
  );
}

export default DongNeHome;
