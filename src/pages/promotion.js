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

  // dongNePost.video가 null이 아닌 항목만 필터링한 배열을 만듭니다.
  const filteredDongNePostList = dongNePostList.filter(dongNePost => dongNePost.video !== null && dongNePost.gu === location);

  useEffect(() => {
    dispatch(GetDongNePostList(currentPage, location, searchQuery));
  }, [currentPage, location, searchQuery, dispatch]);

  return (
    <div className="promotion-container">
      {filteredDongNePostList.map((dongNePost) => (
      <div className="promotion-scroll">
          <div className="video-card" key={dongNePost.postId} style={{ display: "flex" }}
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
