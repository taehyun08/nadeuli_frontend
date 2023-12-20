// import { useEffect, useState } from "react";
// import DongNePostList from '../../pages/DongNePostList';
// import TopBar from '../../components/TopBar';
// import BottomBar from '../../components/BottonBar';
// import OrikkiriList from '../../pages/OrikkiriList';
// import { BiLeftArrowAlt } from "react-icons/bi";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
// import { FaRegSmile } from "react-icons/fa";
// import { MdOutlineIosShare } from "react-icons/md";
// import { FiMoreVertical } from "react-icons/fi";
// import styled from "styled-components";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { GetOrikkiriDetail, deleteOrikkiri} from "../redux/modules/orikkiri";
// import Modal from "../components/Modal";


// function OrikkiriHome() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(0);
//   const orikkiriDetail = useSelector((state) => state.orikkiri.orikkiri);
//   const params = useParams();
//   const orikkiriId = params.orikkiriId;
//   const user = useSelector((state) => state.gu); // 유저 정보

//     // 모달.
//   const [modalOpen, setModalOpen] = useState(false);
//   const openModal = () => {
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   useEffect(() => {
//     dispatch(GetOrikkiriDetail(orikkiriId));
//   }, [dispatch, orikkiriId]);


//   return (
//     <Wrap>
//       <Header>
//         <div>
//           <BiLeftArrowAlt
//             size={30}
//             onClick={() => {
//               navigate("/dongNeHome");
//             }}
//           />
//         </div>
//         <div>
//           {/* <MdOutlineIosShare />
//           {/* 모달창 열기 */}
//           {/* <FiMoreVertical onClick={openModal} /> */}

//           {/* <Modal open={modalOpen} close={closeModal}>
//             {user?.tag === postDetail?.tag ? (
//               <ButtonWrap>
//                 <ButtonModify
//                   onClick={() => {
//                     navigate("/modify/" + postId);
//                   }}
//                 >
//                   수정
//                 </ButtonModify>
//                 <ButtonDelete
//                   onClick={() => {
//                     dispatch(deleteOrikkiri(orikkiriId, navigate));
//                     alert("삭제가 완료되었습니다. ");
//                   }}
//                 >
//                   삭제
//                 </ButtonDelete>
//               </ButtonWrap>
//             ) : (
//               <Claim>신고하기</Claim>
//             )}
//           </Modal> */}
//         </div>
//       </Header>

//       <div>
//         {orikkiriDetail && <img src={orikkiriDetail.picture?.[0]} alt="orikkiriImg" />}
//       </div>

//       <Container>
//         <ProfileBar>
//           <Profile>
//             <img src={orikkiriDetail?.picture} alt="orikkiriImg" />
//             <Nickname>
//               <p>{orikkiriDetail?.orikkriName}</p>
//               {/* <p>{postDetail?.userLocation}</p> */}
//             </Nickname>
//           </Profile>

//         </ProfileBar>

//         <Contents>
//           <p>우리끼리 소개</p>
//           {/* <p>{postDetail?.category}</p>
//           <p>{postDetail?.content}</p> */}
//         </Contents>
//       </Container>
//       <Footer>
        
//       </Footer>
//     </Wrap>
//   );
// }  

  

// const Wrap = styled.div`
//   box-sizing: border-box;
//   overflow-y:hidden;

//   img {
//     background-size: cover;
//     background-position: center;
//     height: 400px;
//     width: 100%;
//   }
// `;

// const Container = styled.div`
//   padding: 16px 16px;
//   position: relative;
// `;
// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   align-items: center;
//   padding: 16px 10px;
//   color: white;
//   font-size: 23px;
//   position: absolute;

//   svg {
//     filter: drop-shadow(0px 0px 1px rgb(0 0 0 / 0.4));
//   }
// `;
// // 모달 css
// const ButtonWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const ButtonModify = styled.button`
//   width: 100%;
//   height: 50px;
//   border-top-left-radius: 15px;
//   border-top-right-radius: 15px;
//   background-color: whitesmoke;
//   color: #6bb7e0;
//   font-size: 13px;
//   border:0;
//   border-bottom:1px solid #dadada;
// `;

// const ButtonDelete = styled.button`
//   width: 100%;
//   height: 50px;
//   border-bottom-left-radius: 15px;
//   border-bottom-right-radius: 15px;
//   background-color: whitesmoke;
//   color: red;
//   font-size: 13px;
//   border:0;
// `;

// const Claim = styled(ButtonModify)`
//   border-radius: 15px;
//   color: red;
// `;

// // 여기 까지 모달
// const ProfileBar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding-bottom: 16px;
//   border-bottom: 1px solid #dadada;

//   p {
//     font-size: 13px;
//   }
// `;

// const Profile = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   //width: 180px;
//   line-height: 20px;


//   img {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     object-fit: cover;
//   }

//   div > p:first-child {
//     font-weight: 600;
//     font-size: 16px;
//   }
// `;

// const Nickname = styled.div`
//   //width: 100px;
//   padding-left: 10px;

// `;

// const Ondo = styled.div`
//   line-height: 20px;
//   div {
//     display: flex;
//     justify-content: space-between;
//     width: 80px;
//     align-items: center;
//   }
//   & p:first-child {
//     color: #6bb7e0;
//     font-weight: 600;
//     font-size: 15px;
//   }
//   & p:last-child {
//     color: #aaa;
//     text-decoration: underline;
//   }
// `;

// const Contents = styled.div`
//   padding-top: 30px;
//   padding-bottom: 70px;
//   line-height: 30px;
//   position: relative;

//   & p:first-child {
//     font-weight: 600;
//   }
//   & p:nth-child(2) {
//     font-size: 13px;
//     text-decoration: underline;
//     color: #aaa;
//   }
//   & p:nth-child(3) {
//     font-size: 14px;
//     padding-bottom:15px;
//   }

//   & p:last-child {
//     font-size: 13px;
//     color: #aaa;
//   }
// `;

// const Footer = styled.div`
//   background-color: white;
//   display: flex;
//   align-items: center;
//   height: 70px;
//   position: fixed;
//   width: 100%;
//   bottom: 0;
//   border-top: 1px solid #dadada;
// `;

// const Heart = styled.div`
//   width: 20%;
//   text-align: center;
//   align-items: center;
// `;

// const Price = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 80%;
//   padding: 5px 16px;
//   border-left: 1px solid #dadada;
//   line-height: 25px;
//   align-items: center;

//   div :first-child {
//     font-weight: 600;
//   }
//   div > p:nth-child(2) {
//     color: #ff7e36;
//     font-size: 14px;
//   }
//   button {
//     background-color: #ff7e36;
//     border: none;
//     border-radius: 5px;
//     width: 90px;
//     height: 40px;
//     color: white;
//   }
// `;


// const TradeState = styled.div`
//   margin-top: 5px;
//   margin-left:10px;
//   display: flex;
//   align-items: center;
// `;

// const SoldOut = styled.div`
//   padding: 6px 5px;
//   width: 65px;
//   height:26px;
//   border-radius: 5px;
//   background-color: #565656;
//   color: white;
//   font-size: 12px;
//   text-align: center;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// `;

// const Book = styled(SoldOut)`
//   width: 55px;
//   height: 26px;
//   background-color: #34bf9e;
// `;

// export default OrikkiriHome;
