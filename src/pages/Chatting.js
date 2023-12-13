// import "../public/css/chatting.css"
// import styled from "styled-components";

// import React, { useState, useEffect, useRef } from "react";
// import { changeTradeStateDB } from "../redux/modules/post";

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// import { AiOutlineArrowLeft } from "react-icons/ai";
// import {AiOutlineCaretRight} from "react-icons/ai";


// // import io from 'socket.io-client';

// // const socket = io.connect('http://54.180.121.151');

// //const socket = io.connect('http://localhost:4000');

// function Chatting(){
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user); // 유저 정보
//   const navigate = useNavigate();
//   const nickname = user.nickname;
//   const userImg = user.userImg;
//   const messageRef = useRef();
//   const scrollRef = useRef();
//   const params = useParams();
//   const state = params.trade;
//   const [sellState,setSellState] =useState(state)

// //   const [chat,setChat] =useState([])  // 데이터가 실시간으로 쌓여서 출력하는 스테이트 받아서 뿌리는 건 쳇이야 
// //   const sellPInfo = useSelector((state) => state.post.post);


// //   useEffect(()=>{    //데이터 실시간으로 받는 곳 
// //     socket.on('chatting',({nickname, userImg, msg, time})=>{
// //       const addChat = {
// //         nickname : nickname,
// //         msg : msg,
// //         userImg: userImg,
// //         time : time
// //       }
// //       setChat((chat)=> chat.concat(addChat));  
// //     })
// //   },[])

// //   useEffect(()=>{
// //     scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight); 
// //   },[chat]);


// //   const cleanInput = () => {let input = document.getElementById('inputBox'); input.value="";}
// //   const handleOnKeyPress = e => {
// //     if (e.key === 'Enter') {
// //       handleOnClick();
// //       cleanInput();
// //     }
// //   };


// //   const handleOnClick = () =>{
// //     const msg =  messageRef.current.value;
// //     socket.emit('chatting', {nickname, userImg, msg});
// //     cleanInput();
// //  }

// return (
//     <div className="wrapper">
      
//       <div className="userInfo"> 
//         <div className="arrow" onClick={()=>{
//           navigate(-1);
//         }}><AiOutlineArrowLeft /></div>
//         <label className="nickname">{user.nickname}</label>
//       </div>
      
//        <div className="saleList">
//         <img src={sellPInfo.postImg}/>
//         <span className="productInfo">
          
//           <p>{sellPInfo.title}</p>
//           <p>{Number(sellPInfo.price).toLocaleString("ko-KR")}원</p>
//           <span> {sellState === "1" ? ( <Book>예약중</Book>) : sellState === "2" ? ( <SoldOut>거래완료</SoldOut> ) 
//                                 : ( "" )} </span>
//         </span>
//         {sellState === "1" ? (  <button disabled >예약중</button>) : sellState === "2" ? ( <button disabled>거래완료</button> ) 
//          : sellState === "0" ? ( <button style={{background : '#FF7E36', color:'white'}} onClick={()=>{
//           dispatch(changeTradeStateDB(sellPInfo.postId, "1"))
//           alert("예약이 완료되었습니다. ")
//           setSellState("1");}}>예약하기</button>) : ""}
  
        
//       </div>
    
//       <div className="chattingBody" ref={scrollRef}>
//       {chat && chat.map((list, index) => (
//         <div key={index}>
//           {list.nickname === user.nickname ?

//             <div className="chattingList" style={{flexDirection : 'row-reverse', float:'right'}}>
//               <span className="profile">
//                 <span className="user">{list.nickname}</span>
//                 <img className="img" src={list.userImg} style={list.style} />
//               </span>

//               <span className="message" style={{background :'#FF7E36', color:'white'}}>
//                 {list.msg}</span>
//               <span className="time">{list.time}</span>

//             </div>
//             :
//             <div className="chattingList">

//               <span className="profile">
//                 <span className="user">{list.nickname}</span>
//                 <img className="img" src={list.userImg} style={list.style} />
//               </span>

//               <span className="message" style={{background :'lightgray'}}>{list.msg}</span>
//               <span className="time">{list.time}</span>

//             </div>
//           }
//           </div>
//         ))}

      
//       </div>

//       <div className="inputArea"> 
//         <span>
//           <input type="text" className="chattingInput" ref={messageRef} 
//                 onKeyPress={handleOnKeyPress} id='inputBox'/>
//           <AiOutlineCaretRight className="sendButton" onClick={handleOnClick}/>
//         </span>
//       </div> 
      
//     </div>

//   );

// }

// const SoldOut = styled.div`
  
//   padding: 6px 5px;
//   width: 65px;
//   border-radius: 5px;
//   background-color: #565656;
//   color: white;
//   font-size: 12px;
//   text-align: center;
// `;

// const Book = styled(SoldOut)`
//   width: 55px;
//   background-color: #34bf9e;
// `;


// export default Chatting;