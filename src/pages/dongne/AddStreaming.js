import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from '../../components/Modal';
import { CreateliveChannel, GetChannelDetail } from '../../redux/modules/streaming';
import { getMember } from '../../redux/modules/member';
import { getOrikkiriList } from '../../redux/modules/orikkiri';
import { }
import { dongNePost } from "../../redux/modules/dongNePost";
import { MdOutlineIosShare } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";

function AddStreaming() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title_ref = useRef();
  const content_ref = useRef();
  const location = useSelector((state) => state.member.gu);
  const member = useSelector((state) => state.member);
  const tag = useSelector((state) => state.member.tag);
  const orikkiriList = useSelector((state) => state.orikkiri.orikkiriList);
  const streaming = useSelector((state) => state.streaming.streamingList);
  const [channelId, setChannelId] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [streamKeyModalOpen, setStreamKeyModalOpen] = useState(false); // 추가
  
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(GetOrikkiriList(tag));
  }, [tag, dispatch]);
  
  const handleAddStreamingClick = () => {
    if (!title_ref.current.value) {
      alert('제목을 입력해주세요.');
      return;
    }
    openModal();
  };

  const confirmAddStreaming = async () => {
    setIsSubmitting(true);
    try {
      await addStreaming();
      setModalOpen(false);
      setChannelId(streaming.channelId);
      setStreamKey(streaming.streamKey);
      setStreamKeyModalOpen(true); // 추가: streamKey 모달 열기
    } catch (error) {
      console.error('Streaming 처리 중 에러 발생', error);
    }
    setIsSubmitting(false);
  };

  const addStreaming = async () => {
    const streamingDTO = {
      channelName: title_ref.current.value,
      // channelName: null,
    };
    await dispatch(CreateliveChannel(streamingDTO, navigate));
  };

  const getStreaming = async () => {
    const streamingDTO = {
      channelId: streaming.channelId,
    };
    await dispatch(GetChannelDetail(streamingDTO, navigate));
  };

  const addDongNePost = () => {
    const postDTO = {
      title: title_ref.current.value,
      postCategory: "3",
      gu: location,
      dongNe: getMember.dongNe,
      writer: { tag: getMember.tag }
    };
    dispatch(dongNePost(postDTO, navigate));
  };


  return (
    <Wrap>
      <Header>
        <IoIosClose size="30" onClick={() => navigate("/dongNeHome")} />
        <h4>스트리밍 홍보</h4>
        <h5 onClick={!isSubmitting ? addDongNePost : null}>
          {isSubmitting ? '처리 중...' : '완료'}
        </h5>
      </Header>

      <Container>
        <Title>
          <input placeholder="제목을 입력해주세요." ref={title_ref} />
        </Title>

        {orikkiriList && orikkiriList.map((list, index) => (
          <div key={index}>
            <div onClick={() => {
              // ... (리스트 클릭 시 로직)
            }}>
              <div className="image-container">
                <img className="circle-image" src={list?.orikkiri.orikkiriPicture } alt="orikkiri Image" />
                <div className="orikkiri-text">{list.orikkiri.orikkiriName}</div>
              </div>
            </div>
          </div>
        ))}

        <button onClick={handleAddStreamingClick}>스트리밍 시작</button>

        <Modal open={modalOpen} close={closeModal}>
          <p>스트리밍을 시작하시겠습니까?</p>
          <button onClick={confirmAddStreaming}>확인</button>
          <button onClick={closeModal}>취소</button>
        </Modal>

        {streaming.streamKey && (
          <div style={{border: '1px solid #ccc', borderRadius: '5px', padding: '10px'}}>
            Stream Key: {streaming.streamKey}
          </div>
        )}
      </Container>

      {/* Stream Key 모달 */}
      {streamKeyModalOpen && (
        <Modal open={streamKeyModalOpen} close={() => setStreamKeyModalOpen(false)}>
          <p>Stream Key: {streamKey}</p>
          <button onClick={() => setStreamKeyModalOpen(false)}>확인</button>
          <button onClick={() => setStreamKeyModalOpen(false)}>취소</button>
        </Modal>
      )}
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

// 모달 css
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonModify = styled.button`
  width: 100%;
  height: 50px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: whitesmoke;
  color: #6bb7e0;
  font-size: 13px;
  border:0;
  border-bottom:1px solid #dadada;
`;

const ButtonDelete = styled.button`
  width: 100%;
  height: 50px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: whitesmoke;
  color: red;
  font-size: 13px;
  border:0;
`;

const Claim = styled(ButtonModify)`
  border-radius: 15px;
  color: red;
`;


export default AddStreaming;