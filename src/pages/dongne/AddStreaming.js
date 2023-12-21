import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from '../../components/Modal';
import { createliveChannel, getChannelDetail, getChannelUrl } from '../../redux/modules/streaming';
import { getOrikkiriList } from '../../redux/modules/orikkiri';
import { dongNePost } from "../../redux/modules/dongNePost";

function AddStreaming() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title_ref = useRef();
  const [step, setStep] = useState(1);
  const [channelId, setChannelId] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [streamingUrl, setStreamingUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useSelector((state) => state.member.gu);
  const member = useSelector((state) => state.member);
  const [channelTitle, setChannelTitle] = useState('');

  const streaming = useSelector((state) => state.streaming.channel);
  const [justAdded, setJustAdded] = useState(false); // 추가한 채널 추적을 위한 새로운 상태 변수

  useEffect(() => {
    if (streaming && streaming.channelId) {
      setChannelId(streaming.channelId);
      setStreamKey(streaming.streamKey);
      setStreamingUrl(streaming.url);
    }
  
    // addStreaming 함수가 실행된 직후에는 경고 메시지를 표시하지 않습니다.
    if (streaming && streaming.channelStatus !== 'PUBLISHING' && step === 2 && !justAdded) {
      alert("스트림키 값을 입력 후 방송을 시작해 주세요.");
    }
  
    if (streaming && streaming.channelStatus === 'PUBLISHING' && step === 2) {
      setStep(3);
    }

  
    // 상태 초기화
    if (justAdded) {
      setJustAdded(false);
    }
  }, [streaming, step, justAdded]);
  

  const handleNextStep = () => {
    if (step === 1) {
      addStreaming();
    } else {
      // 다음 단계로 진행할 추가 로직
    }
  };

  const addDongNePost = () => {
    console.log(title_ref.current);
    const writer = {tag: member.tag};
    const title = channelTitle;
    const postCategory = 3;

    const formData = new FormData();
    const postDTOData = {
      title: title,
      postCategory: postCategory,
      gu: location,
      dongNe: member.dongNe,
      writer: writer,
      streaming : streamingUrl,
      video : streamingUrl
    };

    formData.append('postDTO', new Blob([JSON.stringify(postDTOData)], { type: "application/json" }));

    // 파일 추가
    const files = streamingUrl;
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    dispatch(dongNePost(formData, navigate));
  };


  const copyToClipboard = () => {
    if (streaming?.streamKey) {
      navigator.clipboard.writeText(streamKey)
        .then(() => {
          alert("스트림 키가 클립보드에 복사되었습니다.");
        })
        .catch(err => {
          console.error("복사 실패:", err);
        });
    }
  };

  const addStreaming = async () => {
    setIsSubmitting(true);
    try {
      const channelName = channelTitle.replace(/\s+/g, '_');
      const formData = new FormData();
      formData.append('channelName', channelName);
      await dispatch(createliveChannel(formData, navigate));
      setIsSubmitting(false);
      setStep(2);
      setJustAdded(true); // 채널 추가 후 상태 업데이트
    } catch (error) {
      console.error('Streaming 처리 중 에러 발생', error);
      setIsSubmitting(false);
    }
  };

  const checkStreaming = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(getChannelDetail(channelId));
      // 상태 업데이트는 useEffect에서 처리합니다.
    } catch (error) {
      console.error('Streaming 처리 중 에러 발생', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCreateChannel = () => (
    <div>
      <Title>
      <input
        placeholder="채널 제목을 입력해주세요."
        value={channelTitle}
        onChange={(e) => setChannelTitle(e.target.value)}
      />
      </Title>
      <Button onClick={handleNextStep}>
        {isSubmitting ? '처리 중...' : '다음'}
      </Button>
    </div>
  );

  const renderChannelDetails = () => (
    <div>
      <p>채널 ID: {streaming?.channelId}</p>
      <p>스트림 키: {streaming?.streamKey}
        <CopyButton onClick={copyToClipboard}>복사</CopyButton>
      </p>
      <Button onClick={checkStreaming}>다음</Button>
    </div>
  );

  const renderAddStreamingPost = () => (
    <div>
      <p>채널 ID: {channelId}</p>
      <p>스트림 키: {streamKey}</p>
      <p>URL: {streamingUrl}</p>
      <Button onClick={addDongNePost}>완료</Button>
    </div>
  );

  return (
    <Wrap>
      <Header>
        <IoIosClose size="30" onClick={() => navigate("/dongNeHome")} />
        <h4>스트리밍 생성</h4>
      </Header>

      <Container>
        {step === 1 && renderCreateChannel()}
        {step === 2 && renderChannelDetails()}
        {step === 3 && renderAddStreamingPost()}
      </Container>
    </Wrap>
  );
}

// Styled components
const Wrap = styled.div`
  box-sizing: border-box;
  font-size: 18px;
  max-width: 100%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 25px;
  border-bottom: 1px solid #dadada;

  h4 {
    font-weight: bold;
    font-size: 20px;
  }
`;

const Container = styled.div`
  padding: 0 16px;
`;

const Title = styled.div`
  padding: 25px 0px;
  border-bottom: 1px solid #dadada;

  input {
    border: none;
    outline: none;
    font-size: 25px;
    width: 100%;
    padding: 10px;

    ::placeholder {
      color: #dadada;
      font-size: 25px;
    }
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CopyButton = styled.button`
  margin-left: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
`;

export default AddStreaming;
