import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetDongNePostList } from '../redux/modules/dongNePost';
import '../style/css/postInfo.css';
import { FaRegComment } from "react-icons/fa";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../style/css/promotion.css';

function Promotion({searchQuery}) {
  const location = useSelector((state) => state.member.gu);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  // 데이터 구조 변경에 따라 필드 수정
  const dongNePostList = useSelector((state) => state.dongNePost.dongNePostList);

  // 이미지 확장자가 .mp4인 경우 필터링한 배열을 만듭니다.
  const filteredDongNePostList = dongNePostList.filter(dongNePost => {
    if (dongNePost.images && dongNePost.images.length > 0) {
      // 이미지 URL에서 확장자 추출
      const extension = dongNePost.images[0].split('.').pop().toLowerCase();
      
      // 이미지 확장자가 .mp4인 경우 필터링
      return extension === 'mp4' && dongNePost.gu === location;
    }
    
    return false; // 이미지가 없는 경우도 필터링에서 제외
  });

  useEffect(() => {
    dispatch(GetDongNePostList(currentPage, location, searchQuery));
  }, [currentPage, location, searchQuery, dispatch]);

  return (
    <div className="promotion-container">
      {filteredDongNePostList.map((dongNePost) => (

  <div className="promotion-scroll" key={dongNePost.postId}> {/* key prop 추가 */}
    <div className="video-card" style={{ display: "flex" }}
      onClick={() => {
        navigate("/getDongNePost/" + dongNePost.postId);
      }}>
      <video src={dongNePost.video} controls autoPlay muted/>
      <div className="video-overlay">
        <h3>{dongNePost.title}</h3>
      </div>
    </div>
  </div>
))}

    </div>
  );
}

export default Promotion;
