import React from 'react';
import { useSelector } from 'react-redux';
import DongNePostList from '../../components/DongNePostList';
import BottomBar from '../../components/BottonBar';

function DongNeHome() {
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
