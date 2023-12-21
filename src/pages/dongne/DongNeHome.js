import React, { useState }from 'react';
import DongNePostList from '../../pages/DongNePostList';
import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottonBar';
import OrikkiriList from '../../pages/OrikkiriList';
function DongNeHome() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query); // 검색 쿼리 업데이트
  };

  return (
    <div className="Wrap">
      <TopBar onSearch={handleSearch} />
      <div className="MainListBox">
        <OrikkiriList/>
        <DongNePostList searchQuery={searchQuery}/>
      </div>
      <BottomBar />
    </div>
  );
}

export default DongNeHome;
