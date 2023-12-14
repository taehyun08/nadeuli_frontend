import React, { useState }from 'react';
import DongNePostList from '../../pages/DongNePostList';
import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottonBar';
import OrikkiriList from '../../pages/OrikkiriList';
import Promotion from '../promotion';
function DongNeHome() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query); // 검색 쿼리 업데이트
  };

  return (
    <div className="Wrap">
      <TopBar onSearch={handleSearch} />
        <OrikkiriList/>
      <div className="promotion">
        <Promotion />
      </div> 
      <div className="MainListBox">
        <DongNePostList searchQuery={searchQuery}/>
      </div>
      <BottomBar />
    </div>
  );
}

export default DongNeHome;
