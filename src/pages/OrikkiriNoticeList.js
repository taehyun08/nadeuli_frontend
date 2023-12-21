import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetDongNePostList } from '../redux/modules/dongNePost';
import '../style/css/postInfo.css';
import { FaRegComment } from "react-icons/fa";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Promotion from './promotion';

function OrikkiriNoticeList({searchQuery}) {
  const location = useSelector((state) => state.member.gu);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleChitChatClick = () => {
    setSelectedCategory(1);
  };

  const handlePromotionClick = () => {
    setSelectedCategory(2);
  };

  const dongNePostList = useSelector((state) => state.dongNePost.dongNePostList);

  const filteredDongNePostList = dongNePostList.filter(dongNePost => {
    if (selectedCategory !== null && dongNePost.postCategory !== selectedCategory) {
      return false;
    }
    if (dongNePost.images && dongNePost.images.length > 0) {
      const extension = dongNePost.images[0].split('.').pop().toLowerCase();
      if (extension === 'mp4') {
        return false;
      }
    }
    return dongNePost.gu === location;
  });
  
  useEffect(() => {
    dispatch(GetDongNePostList(currentPage, location, searchQuery));
  }, [currentPage, location, searchQuery, dispatch]);

  return (
    <div>
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
              </div>
            </CardBox>
          </div>
        ))}
      </div>
      {selectedCategory == 1 && (
        <div>
          <FixedButton2 onClick={() => navigate("/addOrikkiriNotice")}>+ 글쓰기</FixedButton2>
        </div>
      )}
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

const FixedButton = styled.div`
  display: flex;
  margin: 10px 0px; // 위 아래로 20px 여백 추가
  margin-left: 30px; // 왼쪽 여백 추가
  width: 100px;
  height: 45px;
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => props.theme.color.orange};
  color: ${(props) => props.theme.color.white};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 #999;
`;

const FixedButton1 = styled.div`
  display: flex;
  position: fixed;
  bottom: 160px;
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
  bottom: 100px;
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

export default OrikkiriNoticeList;
