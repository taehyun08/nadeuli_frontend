import { useEffect, useState } from "react";
import DongNePostList from '../../pages/DongNePostList';
import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottonBar';
import OrikkiriList from '../../pages/OrikkiriList';
import { BiLeftArrowAlt } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrikkiriDetail, modifyOrikkiri, deleteOrikkiri} from "../../redux/modules/orikkiri";
import Modal from "../../components/Modal";
import { FaMapMarkerAlt } from "react-icons/fa";
import OrikkiriPostList from "../../pages/OrikkiriPostList";
import OrikkiriNoticeList from "../../pages/OrikkiriNoticeList";
import OrikkiriAlbumList from "../../pages/OrikkiriAlbumList";


function OrikkiriHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const orikkiriDetail = useSelector((state) => state.orikkiri.orikkiri);
  const params = useParams();
  const orikkiriId = params.orikkiriId;
  const user = useSelector((state) => state.gu); // 유저 정보
  const [selectedContent, setSelectedContent] = useState('home');
  const handleOrikkiriHome = () => setSelectedContent('home');
  const handleOrikkirPost = () => setSelectedContent('post');
  const handleSchule = () => setSelectedContent('schedule');
  const handleAlbum = () => setSelectedContent('album');
  const handleNotice = () => setSelectedContent('notice');


    // 모달.
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(getOrikkiriDetail(orikkiriId));
  }, [dispatch, orikkiriId]);

  return (
    <Wrap>
      <Header>
        <div>
          <BiLeftArrowAlt
            size={30}
            onClick={() => {
              navigate("/dongNeHome");
            }}
          />
        </div>
        <div>
          {/* 모달창 열기 */}
          <FiMoreVertical onClick={openModal} />

           <Modal open={modalOpen} close={closeModal}>
            {user?.tag === orikkiriDetail?.tag ? (
              <ButtonWrap>
                <ButtonModify
                  onClick={() => {
                    navigate("/modify/" + orikkiriId);
                  }}
                >
                  수정
                </ButtonModify>
                <ButtonDelete
                  onClick={() => {
                    dispatch(deleteOrikkiri(orikkiriId, navigate));
                    alert("삭제가 완료되었습니다. ");
                  }}
                >
                  삭제
                </ButtonDelete>
              </ButtonWrap>
            ) : (
              <Claim>신고하기</Claim>
            )}
          </Modal>
        </div>
      </Header>

      <div>
        {orikkiriDetail && <SmallImage src={orikkiriDetail.orikkiriPicture}/>}
      </div>

      <Container>
        <ProfileBar>
          <Profile>
            <RoundedImage src={orikkiriDetail.orikkiriPicture} alt="orikkiriImg" />
            <Nickname>
              <p>{orikkiriDetail.orikkiriName}</p>
            </Nickname>
          </Profile>

        </ProfileBar>
          <StyledButton onClick={handleOrikkiriHome}>홈</StyledButton>
          <StyledButton onClick={handleOrikkirPost}>게시판</StyledButton>
          <StyledButton onClick={handleSchule}>일정</StyledButton>
          <StyledButton onClick={handleAlbum}>앨범</StyledButton>
          <StyledButton onClick={handleNotice}>공지사항</StyledButton>
        
        <Contents>
          
          {selectedContent === 'home' && (
            <>
              <p>우리끼리 소개</p>
              <OrikiriInfo>
                <OrikiriText>{orikkiriDetail?.orikkiriIntroduction}</OrikiriText>
                <FaMapMarkerAlt />
                <OrikiriText>{orikkiriDetail?.dongNe}</OrikiriText>
              </OrikiriInfo>
            </>
          )}
          {selectedContent === 'post' && <OrikkiriPostList />}
          {selectedContent === 'schedule' && <DongNePostList />}
          {selectedContent === 'album' && <OrikkiriAlbumList />}
          {selectedContent === 'notice' && <OrikkiriNoticeList />}
          {/* 여기에 다른 컨텐츠 조건부 렌더링 추가 */}
        
        </Contents>
      
      
      </Container>
      <Footer>
        <BottomBar />
      </Footer>
    </Wrap>
  );
}  

const Wrap = styled.div`
  box-sizing: border-box;
  overflow-y:hidden;

  img {
    background-size: cover;
    background-position: center;
    height: 300px;
    width: 100%;
  }
`;

const Container = styled.div`
  padding: 16px 16px;
  position: relative;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 16px 10px;
  color: white;
  font-size: 23px;
  position: absolute;

  svg {
    filter: drop-shadow(0px 0px 1px rgb(0 0 0 / 0.4));
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

// 여기 까지 모달
const ProfileBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #dadada;

  p {
    font-size: 13px;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  //width: 180px;
  line-height: 20px;


  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  div > p:first-child {
    font-weight: 600;
    font-size: 16px;
  }
`;

const Nickname = styled.div`
  //width: 100px;
  padding-left: 10px;

`;

const Ondo = styled.div`
  line-height: 20px;
  div {
    display: flex;
    justify-content: space-between;
    width: 80px;
    align-items: center;
  }
  & p:first-child {
    color: #6bb7e0;
    font-weight: 600;
    font-size: 15px;
  }
  & p:last-child {
    color: #aaa;
    text-decoration: underline;
  }
`;

const Contents = styled.div`
  padding-top: 30px;
  padding-bottom: 70px;
  line-height: 30px;
  position: relative;

  & p:first-child {
    font-weight: 600;
  }
  & p:nth-child(2) {
    font-size: 13px;
    text-decoration: underline;
    color: #aaa;
  }
  & p:nth-child(3) {
    font-size: 14px;
    padding-bottom:15px;
  }

  & p:last-child {
    font-size: 13px;
    color: #aaa;
  }
`;

const Footer = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  height: 70px;
  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #dadada;
`;

const Heart = styled.div`
  width: 20%;
  text-align: center;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 5px 16px;
  border-left: 1px solid #dadada;
  line-height: 25px;
  align-items: center;

  div :first-child {
    font-weight: 600;
  }
  div > p:nth-child(2) {
    color: #ff7e36;
    font-size: 14px;
  }
  button {
    background-color: #ff7e36;
    border: none;
    border-radius: 5px;
    width: 90px;
    height: 40px;
    color: white;
  }
`;


const TradeState = styled.div`
  margin-top: 5px;
  margin-left:10px;
  display: flex;
  align-items: center;
`;

const SoldOut = styled.div`
  padding: 6px 5px;
  width: 65px;
  height:26px;
  border-radius: 5px;
  background-color: #565656;
  color: white;
  font-size: 12px;
  text-align: center;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const Book = styled(SoldOut)`
  width: 55px;
  height: 26px;
  background-color: #34bf9e;
`;

const SmallImage = styled.img`
  height: 50px; /* 원하는 높이 값으로 설정 */
`;

const RoundedImage = styled.img`
  border-radius: 50%; /* 원형 이미지 */
  border: 1px solid black; /* 검은색 구분선 */
  width: 100px; /* 원하는 너비 */
  height: 100px; /* 원하는 높이 */
`;


const StyledButton = styled.button`
  width: 60px; /* 버튼의 너비 */
  height: 30px; /* 버튼의 높이 */
  background-color: #34bf9e; /* 버튼의 배경색 */
  color: white; /* 텍스트 색상 */
  font-size: 13px; /* 글꼴 크기 */
  border: none; /* 테두리 없애기 */
  border-radius: 25px; /* 모서리 둥글게 */
  cursor: pointer; /* 마우스 커서 스타일 */
  outline: none; /* 아웃라인 없애기 */
  margin-top: 10px;
  margin-right: 10px;
  transition: background-color 0.3s; /* 배경색 변경시 애니메이션 효과 */

  &:hover {
    background-color: #28a08d; /* 호버 시 배경색 변경 */
  }
`;

const OrikiriInfo = styled.div`
  // 기존 스타일
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  
  display: flex;
  flex-direction: column; /* 세로 방향으로 변경 */
  align-items: flex-start; /* 왼쪽 정렬 */
  gap: 10px; /* 요소들 사이의 간격 */
`;

const OrikiriText = styled.p`
  word-wrap: break-word; /* 단어가 길어도 줄바꿈 */
`;


export default OrikkiriHome;
