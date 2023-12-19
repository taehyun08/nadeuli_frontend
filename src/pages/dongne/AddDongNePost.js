import React, { useState, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AiFillPicture } from "react-icons/ai";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { dongNePost } from "../../redux/modules/dongNePost";
import { getMember } from "../../redux/modules/member";
import Modal from '../../components/Modal';

function AddDongNePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title_ref = useRef();
  const content_ref = useRef();
  const [category, setCategory] = useState();
  const imageInput = useRef();
  const videoInput = useRef();
  const [imageSrc, setImageSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const getMember = useSelector((state) => state.member);
  const location = useSelector((state) => state.member.gu);
  

  // const location = useSelector((state) => state.user.userLocation);


  const changeCategory = (e) => {
    setCategory(e.target.value);
  };

  // 파일 업로드
  const selectFile = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split("/")[0];

    if (fileType === "image") {
      if (e.target.files.length <= 10) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("사진은 최대 10장까지 업로드 가능합니다.");
        e.target.value = null;
      }
    } else if (fileType === "video") {
      if (e.target.files.length === 1) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoSrc(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("영상은 1개까지 업로드 가능합니다.");
        e.target.value = null;
      }
    }
  }

  const addDongNePost = () => {
    if (!category || category === "none") {
      alert("게시물 카테고리를 선택해주세요!");
      return;
    }
  
    const formData = new FormData();
    const postDTO = {
      title: title_ref.current.value,
      content: content_ref.current.value,
      postCategory: category === "잡담" ? "1" : "2",
      gu: location,
      dongNe: getMember.dongNe,
      writer: { tag: getMember.tag }
    };
  
    // formData.append('postDTO', new Blob([JSON.stringify(postDTO)], { type: "application/json" }));
    formData.append('postDTO', postDTO);
  
    // 이미지 파일 추가
    if (imageInput.current && imageInput.current.files[0]) {
      for (const file of imageInput.current.files) {
        formData.append('images', file);
      }
    }

    // 비디오 파일 추가 (비디오 파일 필드가 별도로 존재한다면)
    if (videoInput.current && videoInput.current.files[0]) {
      formData.append('images', videoInput.current.files[0]);
    }

  dispatch(dongNePost(formData, navigate));
};


return (
  <Wrap>
    <Header>
      <IoIosClose
        size="30"
        onClick={() => {
          navigate("/dongNeHome");
        }}
      />
      <h4>동네나드리 글쓰기</h4>
      <h5 onClick={addDongNePost}>완료</h5>
    </Header>

    <Container>
      <div>
        <Title>
          <input placeholder="제목을 입력하세요" ref={title_ref} />
        </Title>

        <Categorie>
          {/* <div>카테고리 선택</div> */}
          <select name="category" id="category" onChange={changeCategory}>
            <option value="none">게시물 카테고리를 선택해주세요.</option>
            <option value="잡담">잡담</option>
            <option value="홍보">홍보</option>
          </select>
        </Categorie>
      </div>

      <textarea
        cols="40"
        rows="5"
        placeholder={`${location}와 관련된 질문이나 이야기를 해보세요.\n
        1. 사진은 최대 10장까지 가능합니다.\n
        2. 영상은 1개까지 가능합니다.`}
        ref={content_ref}
      />

       {/* 사진 업로드 */}
        <File>
          <label htmlFor="image-file">
            <AiFillPicture className="camera" />
          </label>
          <input
            type="file"
            id="image-file"
            ref={imageInput}
            onChange={selectFile}
            accept="image/*"
            multiple
          />
          {imageSrc && <img src={imageSrc} alt="preview-img" />}

        {/* 비디오 업로드 */}
          <label htmlFor="video-file">
            <MdOutlineVideoLibrary className="video" />
          </label>
          <input
            type="file"
            id="video-file"
            ref={videoInput}
            onChange={selectFile}
            accept="video/*"
          />
          {videoSrc && <video controls src={videoSrc} />}
      </File>
    </Container>
  </Wrap>
);
}
const Wrap = styled.div`
box-sizing: border-box;
font-size: 18px;
max-width: 100%; /* 최대 너비 설정 */

input {
  font-size: 13px;
}

textarea {
  margin-top: 45px;
  border: none;
  outline: none;
  resize: none;
  font-size: 20px;
  height: 400px; /* 높이 조절 */
  width: 100%; /* 너비 100% 설정 */
  padding: 10px; /* 내부 여백 추가 */
}
textarea::placeholder {
  color: #dadada;
  font-size: 20px;
}
`;
const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;

padding: 25px 25px;
border-bottom: 1px solid #dadada;

h4 {
  font-weight: bold;
  font-size: 20px; /* 원하는 크기로 수정 */
}
h5 {
  color: #4da6ff;
  font-size: 18px;
}
`;
const Container = styled.div`
padding: 0 16px;
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
  width: 100%; /* 너비 100% 설정 */
}

input::placeholder {
  color: #dadada;
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


export default AddDongNePost;