import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetDongNePostList } from '../redux/modules/dongNePost';
import { FaRegComment } from "react-icons/fa";
import { BsHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import "../style/css/orikkiriList.css"; // CSS 파일을 임포트합니다.
import { FaUserGroup } from "react-icons/fa6";

function OrikkiriList({searchQuery}) {
  const location = useSelector((state) => state.member.gu);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  // 데이터 구조 변경에 따라 필드 수정
  const dongNePostList = useSelector((state) => state.dongNePost.dongNePostList);

  useEffect(() => {
    dispatch(GetDongNePostList(currentPage, location, searchQuery));
  }, [currentPage, location, searchQuery, dispatch]);

  console.log("dongNePostList:", dongNePostList);

  return (
    <div className="top-toolbar">
      <div className="image-container">
        <FaUserGroup className="orikkiri-image" />
        <div className="orikkiri-text">우리끼리 목록</div>
      </div>
      <div className="vertical-line"></div>
      
      <div className="image-container">
          <img className="circle-image" src="https://kr.object.ncloudstorage.com/nadeuli/image/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%288%2920231213085749026.png" />
          <div className="orikkiri-text">우리끼리 1</div>
      </div>

      <div className="image-container">
          <img className="circle-image" src="https://kr.object.ncloudstorage.com/nadeuli/image/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%288%2920231213085749026.png" />
          <div className="orikkiri-text">우리끼리 2</div>
      </div>

      <div className="image-container">
          <img className="circle-image" src="https://kr.object.ncloudstorage.com/nadeuli/image/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%288%2920231213085749026.png" />
          <div className="orikkiri-text">우리끼리 3</div>
      </div>

      <div className="image-container">
          <img className="circle-image" src="https://kr.object.ncloudstorage.com/nadeuli/image/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%288%2920231213085749026.png" />
          <div className="orikkiri-text">우리끼리 4</div>
      </div>
    </div>
  );
}

export default OrikkiriList;
