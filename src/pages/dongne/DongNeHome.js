import React from 'react';
import { useSelector } from 'react-redux';
import DongNePostList from '../../components/DongNePostList';
import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottonBar';


function DongNeHome() {
  const user = useSelector((state) => state.member);

  return (
    <div className="Wrap">
      <TopBar/>
      <div className="topView">
        <DongNePostList />
      </div>
      <BottomBar />
    </div>
  );
}

export default DongNeHome;
