import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetDongNePostList } from '../redux/modules/dongNePost';
import '../style/css/postInfo.css';
import { FaRegComment } from "react-icons/fa";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function OrikkiriAlbumList({orikkiriId}) {
  const location = useSelector((state) => state.member.gu);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(1);

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
    dispatch(GetDongNePostList(currentPage, location));
  }, [currentPage, location, dispatch]);

  return (
    <div>
      <GridContainer>
        {filteredDongNePostList.map((dongNePost) => (
          <CardBox key={dongNePost.postId} onClick={() => navigate("/getDongNePost/" + dongNePost.postId)}>
            <Img src={dongNePost.images[0]} alt="Post Image" />
            <TextArea>
              <span style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>
                {dongNePost.title}
              </span>
              <span style={{ fontSize: "12px", color: "#AAAAAA" }}>
                {dongNePost.gu}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                <FaRegComment size="20" />
                <span>{dongNePost.CommentNum}</span>
              </div>
            </TextArea>
          </CardBox>
        ))}
      </GridContainer>
        <FixedButton2 onClick={() => navigate(`/addOrikkiriAlbum/${orikkiriId}`)}>+ 앨범 등록</FixedButton2>
    </div>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const CardBox = styled.div`
  border: 1px solid #dddddd;
  border-radius: 10px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 300px; // 이미지 높이 조정
  object-fit: cover;
`;

const TextArea = styled.div`
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
  background-color: #508BFC;
  color: ${(props) => props.theme.color.white};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 #999;
`;



export default OrikkiriAlbumList;
