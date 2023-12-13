import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AiFillPicture } from "react-icons/ai";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { dongNePost } from "../../redux/modules/dongNePost";
import TopDropdownMenu from '../../components/TopDropdownMenu';
import TopArrowLeft from '../../components/TopArrowLeft';
import PostInfo from "../../components/PostInfo";
import { getLoadDongNePost, deleteDongNePost } from '../../redux/modules/dongNePost';


function GetDongNePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDongNePost = useSelector((state) => state.dongNePost.dongNePost);
  const params = useParams();
  const postId = params.postid;
  const user = useSelector((state) => state.user); // 유저 정보

   // 모달.
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(getLoadDongNePost(postId));
  }, [dispatch, postId]);



return (
  <Wrap>
    <Header>
      <TopArrowLeft navigate={"/dongNeHome"}/>
      <TopDropdownMenu onEditClick={"/addDongNePost"} onDeleteClick={deleteDongNePost}/>
    </Header>

    <Container>
      <div>
        <PostInfo text={"홍보"} />
        <Img src={user.userImg} />
      </div>
      <div>
        <Title>
          <PostInfo text={"홍보"} />
        </Title>

        <Categorie>
          {/* <div>카테고리 선택</div> */}
          {/* <select name="category" id="category" onChange={changeCategory}>
            <option value="none">게시물 카테고리를 선택해주세요.</option>
            <option value="잡담">잡담</option>
            <option value="홍보">홍보</option>
          </select> */}
        </Categorie>
      </div>

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
padding: 30px 0px;
border-bottom: 1px solid #dadada;

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
  width: 50px;
  height: 50;
  margin-left: 10px;
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
const Categorie = styled(Title)`
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


export default GetDongNePost;