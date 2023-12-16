import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetDongNePostList } from '../redux/modules/dongNePost';
import '../style/css/postInfo.css';
import { FaRegComment } from "react-icons/fa";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Promotion from './promotion';

function DongNePostList({searchQuery}) {
  const location = useSelector((state) => state.member.gu);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);


  // 데이터 구조 변경에 따라 필드 수정
  const dongNePostList = useSelector((state) => state.dongNePost.dongNePostList);

  // 이미지 확장자 필터링을 적용한 배열 생성
  const filteredDongNePostList = dongNePostList.filter(dongNePost => {
    if (dongNePost.images && dongNePost.images.length > 0) {
      // 이미지 URL에서 확장자 추출
      const extension = dongNePost.images[0].split('.').pop().toLowerCase();
      
      // 이미지 확장자가 .mp4인 경우 필터링
      return extension !== 'mp4' && dongNePost.gu === location;
    }
    
    return dongNePost.gu === location;
  });
  useEffect(() => {
    if (searchQuery !== undefined) {
      dispatch(GetDongNePostList(currentPage, location, searchQuery));
    }
  }, [currentPage, location, searchQuery, dispatch]);


  return (
    <div>
    <Promotion/>
    <div className="MainListBox">
      {filteredDongNePostList.map((dongNePost) => (
          <div key={dongNePost.postId}>
            <CardBox className="card">
              <div
                style={{ display: "flex" }}
                onClick={() => {
                  navigate("/getDongNePost/" + dongNePost.postId);
                }}
              >
                <Img src={dongNePost.images[0]} alt="Post Image" />
                <TextArea>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                      padding: "0 5px",
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {dongNePost.title}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      padding: "5px",
                      color: "#AAAAAA",
                    }}
                  >
                    {dongNePost.gu}
                  </span>
                  
                </TextArea>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  width: "35px",
                  fontSize: "16px",
                }}
              >
                <FaRegComment size="20" />
                {dongNePost.CommentNum}
                3
              </div>
              
            </CardBox>
          </div>
        ))}
      <div>
        <FixedButton1
          onClick={() => {
            navigate("/addDongNePost");
          }}
        >
          + 우리끼리
        </FixedButton1>
      </div>
      <div>
        <FixedButton2
          onClick={() => {
            navigate("/addDongNePost");
          }}
        >
          + 글쓰기
        </FixedButton2>
      </div>
    
    </div>
    </div>
  );
}

const CardBox = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const FixedButton1 = styled.div`
  display: flex;
  position: fixed;
  bottom: 140px;
  right: 30px;
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => props.theme.color.orange};
  color: ${(props) => props.theme.color.white};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 #999;
`;

const FixedButton2 = styled.div`
  display: flex;
  position: fixed;
  bottom: 80px;
  right: 30px;
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => props.theme.color.orange};
  color: ${(props) => props.theme.color.white};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 #999;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
`;

export default DongNePostList;
