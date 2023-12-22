import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetDongNePostList } from '../redux/modules/dongNePost';
import '../style/css/postInfo.css';
import { FaRegComment } from "react-icons/fa";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function OrikkiriNoticeList({orikkiriId}, {masterTag}) {
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
      <MainListBox>
        {filteredDongNePostList.map((dongNePost) => (
          <CardBox key={dongNePost.postId}>
            <PostContainer onClick={() => navigate("/getDongNePost/" + dongNePost.postId)}>
              <Img src={dongNePost.images[0]} alt="Post Image" />
              <TextArea>
                <TitleSpan>{dongNePost.title}</TitleSpan>
                <DetailSpan>{dongNePost.gu}</DetailSpan>
              </TextArea>
            </PostContainer>
            <CommentSection>
              <FaRegComment size="20" />
              <span>{dongNePost.CommentNum}</span>
            </CommentSection>
          </CardBox>
        ))}
      </MainListBox>
      {selectedCategory == 1 && (
        <FixedButton2 onClick={() => navigate(`/addOrikkiriNotice/${orikkiriId}`)}>+ 글쓰기</FixedButton2>
      )}
    </div>
  );
}

// Styled Components
const MainListBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CardBox = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 10px;
`;

const TitleSpan = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  padding: 0 5px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const DetailSpan = styled.span`
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
  color: #AAAAAA;
`;

const CommentSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 35px;
  font-size: 16px;
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
  color: white;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 #999;
`;


export default OrikkiriNoticeList;
