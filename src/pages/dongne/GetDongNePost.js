import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TopDropdownMenu from '../../components/TopDropdownMenu';
import TopArrowLeft from '../../components/TopArrowLeft';
import PostInfo from "../../components/PostInfo";
import { GetDongNePostDetail, deleteDongNePost } from '../../redux/modules/dongNePost';


function GetDongNePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDongNePost = useSelector((state) => state.dongNePost.dongNePost);
  const params = useParams();
  const postId = params.postId;

  useEffect(() => {
      dispatch(GetDongNePostDetail(postId));
  }, [dispatch, postId]);


return (
  <Wrap>
    <Header>
      <TopArrowLeft navigate={"/dongNeHome"}/>
      <TopDropdownMenu onEditClick={"/addDongNePost"} onDeleteClick={deleteDongNePost}/>
    </Header>

    <Container>
      <div>
        <PostInfo
          text={getDongNePost.postCategory === 1 ? "잡담" : "홍보"}
          writerImg={getDongNePost.writerPicture}
          writerNickName={getDongNePost.writerNickname}
          writerDongNe={getDongNePost.writerDongNe}
          timeAgo={getDongNePost.timeAgo}
        />
      </div>
      <div>
        <Title>
          <p>{getDongNePost.title}</p>
        </Title>

        <File>
          <p>{getDongNePost.video}</p>
          <p>{getDongNePost.image}</p>
          <img src="https://kr.object.ncloudstorage.com/nadeuli/image/스크린샷 2023-12-11 오후 6.40.2320231212101949184.png"/>
          <img src="https://kr.object.ncloudstorage.com/nadeuli/image/스크린샷 2023-12-11 오후 6.40.2320231212101949184.png"/>
          <img src="https://kr.object.ncloudstorage.com/nadeuli/image/스크린샷 2023-12-11 오후 6.40.2320231212101949184.png"/>
          <img src="https://kr.object.ncloudstorage.com/nadeuli/image/스크린샷 2023-12-11 오후 6.40.2320231212101949184.png"/>
          <img src="https://kr.object.ncloudstorage.com/nadeuli/image/스크린샷 2023-12-11 오후 6.40.2320231212101949184.png"/>
        </File>

        <Content>
        <p>{getDongNePost.content}</p>
        </Content>
      </div>
      
      <Comment>
      <p>댓글 위치</p>

      </Comment>
      <textarea
        cols="40"
        rows="5"
        // placeholder={`${location}와 관련된 질문이나 이야기를 해보세요.\n
        // 1. 사진은 최대 10장까지 가능합니다.\n
        // 2. 영상은 1개까지 가능합니다.`}
        // ref={content_ref}
      />
    </Container>
  </Wrap>
);
}
const Wrap = styled.div`
box-sizing: border-box;
font-size: 18px;

input {
  font-size: 13px;
}

textarea {
  margin-top: 45px;
  border: none;
  outline: none;
  resize: none;
  font-size: 18px;
  height: 400px; /* 높이 조절 */
}
textarea::placeholder {
  color: #dadada;
  font-size: 18px;
}
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
  border-bottom: 1px solid #dadada;
  
  h4 {
    font-weight: 800;
    font-size: 20px; /* 원하는 크기로 수정 */
    margin: 0; /* 기본 마진 제거 */
  }

  h5 {
    color: #4da6ff;
    font-size: 16px;
    margin: 0; /* 기본 마진 제거 */
  }
`;

const Container = styled.div`
  padding: 10px 10px; /* 여백을 조정할 수 있습니다 */
`;

const File = styled.div`
padding: 30px 30px;
// border-bottom: 1px solid #dadada;

.camera {
  font-size: 50px;
  margin-right: 10px; 
}
.video {
  font-size: 50px;
}
label {
  cursor: pointer;
}
input[type="file"] {
  display: none;
}

img {
  max-width: 100%; /* 최대 너비를 100%로 설정 */
  max-height: 100%; /* 최대 높이를 100%로 설정 */
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
}
`;

const Title = styled.div`
padding: 25px 0px;
border-bottom: 1px solid #dadada;

outline: none;
input {
  border: none;
  outline: none;
  font-size: 25px;
}

input::placeholder {
  color: #dadada;
  border: none;
  font-size: 25px;
}
`;
const Content = styled(Title)`
display: flex;
justify-content: space-between;

select {
  width: 100%;
  border: none;
  outline: none;
  font-size: 20px;
}
`;

const Img = styled.img`
    border-radius: 100px;
    width: 100px;
    border: 1px solid black;
    margin-left: 20px;
    height: 100px;
`;

const Comment = styled.div`
padding: 25px 0px;
display: flex;
justify-content: space-between;

select {
  width: 100%;
  border: none;
  outline: none;
  font-size: 20px;
}
`;


export default GetDongNePost;