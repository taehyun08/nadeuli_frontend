import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TopDropdownMenu from '../../components/TopDropdownMenu';
import TopArrowLeft from '../../components/TopArrowLeft';
import PostInfo from "../../components/PostInfo";
import { GetDongNePostDetail, deleteDongNePost } from '../../redux/modules/dongNePost';
import Comment from "../Comment";
import Hls from 'hls.js';

function GetDongNePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDongNePost = useSelector((state) => state.dongNePost.dongNePost);
  const params = useParams();
  const postId = params.postId;
  const videoRef = useRef([]);

  useEffect(() => {
    dispatch(GetDongNePostDetail(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (getDongNePost.streaming) {
      const videoElement = videoRef.current[0];
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(getDongNePost.streaming);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play();
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = getDongNePost.streaming;
      }
    }
  }, [getDongNePost.streaming]);

  const handleEditClick = () => {
    navigate('/addDongNePost');
  };
  
  const handleDeleteClick = () => {
    deleteDongNePost();
  };

  return (
    <Wrap>
      <Header>
        <TopArrowLeft/>
        <TopDropdownMenu onEditClick={handleEditClick} onDeleteClick={handleDeleteClick}/>
      </Header>

      <Container>
        <div>
          <PostInfo
            text={getDongNePost.postCategory === 1}
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
            {/* HLS 스트리밍 비디오 처리 */}
            {getDongNePost.streaming && (
              <video ref={(el) => (videoRef.current[0] = el)} src={getDongNePost.streaming} controls autoPlay />
            )}

            {/* .mp4 이미지 비디오 처리 */}
            {getDongNePost.images && getDongNePost.images.map((image, index) => {
              if (image.endsWith('.mp4')) {
                return (
                  <video key={index} ref={(el) => (videoRef.current[index] = el)} src={image} controls autoPlay />
                );
              } else {
                return (
                  <img key={index} src={image} alt={`Image ${index}`} />
                );
              }
            })}
          </File>


          <Content>
            <p>{getDongNePost.content}</p>
          </Content>
        </div>
        
        <Comment postId={getDongNePost.postId}>
        </Comment>
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

video {
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



export default GetDongNePost;