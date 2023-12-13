import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AiFillPicture } from "react-icons/ai";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { dongNePost } from "../../redux/modules/dongNePost";

function AddStreaming() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title_ref = useRef();
  const content_ref = useRef();
  const [category, setCategory] = useState();
  const img_ref = useRef();
  const video_ref = useRef();
  const fileInput = useRef();
  const [imageSrc, setImageSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);

  const dongNePostData = useSelector((state) => state.dongNePost.dongNePost);
  
  const location = useSelector((state) => state.user.userLocation);

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

    const newDongNePost = {
      gu: location,
      category: category === "잡담" ? 1 : 2,
      title: title_ref.current.value,
      content: content_ref.current.value,
      postImg: imageSrc,
      postVideo: videoSrc
    };

    dispatch(dongNePost(newDongNePost, navigate));
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
      <h4>스트리밍 홍보</h4>
      <h5 onClick={addDongNePost}>완료</h5>
    </Header>

    <Container>
      <div>
        <Title>
        <h4>스트리밍 제목을 입력해주세요.</h4>
          <input placeholder="제목을 입력해주세요." ref={title_ref} />
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
        <label htmlFor="file">
          <AiFillPicture className="camera" />
        </label>
        <input
          type="file"
          id="file"
          ref={fileInput}
          onChange={selectFile}
          accept="image/*"
          multiple
        />
        {imageSrc && <img src={imageSrc} alt="preview-img" />}

      {/* 영상 업로드 */}
        <label htmlFor="video-file">
          <MdOutlineVideoLibrary className="video" />
        </label>
        <input
          type="file"
          id="video-file"
          ref={fileInput}
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
}
h5 {
  color: #4da6ff;
  font-size: 16px;
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


export default AddStreaming;