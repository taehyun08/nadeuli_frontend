import "../public/css/chatting.css"
import styled from "styled-components";

import React, { useState, useEffect, useRef } from "react";
// import { changeTradeStateDB } from "../redux/modules/post";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "../../util/axios";
import { get as chatGet } from "../../util/chatAxios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {AiOutlineCaretRight} from "react-icons/ai";
import socket from "../../util/socket";

// // // const socket = io.connect('http://54.180.121.151');

// const socket = io.connect('http://localhost:3001');
// const socket = io.connect('https://localhost:4000');

function Chatting(){
// //   const dispatch = useDispatch();
  const member = useSelector((state) => state.member); // 유저 정보
  const navigate = useNavigate();
  const messageRef = useRef();
  const scrollRef = useRef();
  const params = useParams();
  const roomId = params.chatRoomId;
  const nickname = member.nickname;
// //   const state = params.trade;
// //   const [sellState,setSellState] =useState(state)

  const [chat,setChat] =useState([]);  // 데이터가 실시간으로 쌓여서 출력하는 스테이트 받아서 뿌리는 건 쳇이야 
  const [product,setProduct] =useState([]);




  useEffect(()=>{    //데이터 실시간으로 받는 곳 
    socket.on('sendMessage', async ({sender, message, createdAt})=>{
      const res = await get(`/member/getOtherMember/${sender.tag}`);
      const picture = res.picture;
      const addChat = {
        sender : sender,
        message : message,
        picture: picture,
        createdAt : createdAt
      }
      setChat((chat)=> chat.concat(addChat));  
      console.log('메세지 받아옴');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  },[])

  useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await chatGet(`/api/chatRoom/${params.chatRoomId}/${member.tag}`);
          if(params.isProduct === '1'){
            const res = await get(`/product/getProduct/${params.id}`);
            result.roomName = res.title;
            result.price = res.price;
            result.picture = res.images;
            result.isSole = res.isSold;
            console.log(res);
          } else{
            const res = await get(`/orikkiriManage/getOrikkiri/${params.id}`);
            result.roomName = res.orikkiriName;
          }
          const updatedChat = await Promise.all(
            result.map(async (item) => {
                const res = await get(`/member/getOtherMember/${item.sender.tag}`);
                item.picture = res.picture;
                item.nickname = res.nickname;
                return item;
            })
          );
    
          // 모든 비동기 작업이 완료된 후에 상태 업데이트를 수행합니다.
          setChat(result);
          console.log(chat);
        } catch (error) {
          console.error('채팅방을 불러오는 중 오류가 발생했습니다:', error);
        }
      };
  
    fetchData();
  }, []);

  useEffect(()=>{
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight); 
  },[chat]);


  const cleanInput = () => {let input = document.getElementById('inputBox'); input.value="";}
  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      handleOnClick();
      cleanInput();
    }
  };

// tag, roomId, message
  const handleOnClick = () =>{
    const message =  messageRef.current.value;
    const tag = member.tag;
    console.log('소켓에 데이터 전송');
    socket.emit('sendMessage', {tag, nickname, roomId, message});
    cleanInput();
 }

return (
    <div className="wrapper">
      
      <div className="userInfo"> 
        <div className="arrow" onClick={()=>{
          navigate(-1);
        }}><AiOutlineArrowLeft /></div>
        <label className="nickname">{chat.roomName}</label>
      </div>
      
       {params.isProduct === "1" && (<div className="saleList">
        <img src={chat?.picture?.[0]}/>
        <span className="productInfo">
          
          <p>{chat?.title}</p>
          <p>{Number(chat.price).toLocaleString("ko-KR")}원</p>
          <span> {!chat?.isSold ? ( <Book>판매중</Book>) : chat?.isSold ? ( <SoldOut>판매완료</SoldOut> ) 
                                : ( "" )} </span>
        </span>
        {/* {sellState === "1" ? (  <button disabled >예약중</button>) : sellState === "2" ? ( <button disabled>거래완료</button> ) 
         : sellState === "0" ? ( <button style={{background : '#FF7E36', color:'white'}} onClick={()=>{
          dispatch(changeTradeStateDB(sellPInfo.postId, "1"))
          alert("예약이 완료되었습니다. ")
          setSellState("1");}}>예약하기</button>) : ""} */}
  
        
      </div>
)}
    
      <div className="chattingBody" ref={scrollRef}>
      {chat && chat.map((list, index) => (
        <div key={index}>
          {list.sender.tag === member.tag ?

            <div className="chattingList" style={{flexDirection : 'row-reverse', float:'right'}}>
              {/* <span className="profile">
                <span className="user">{list.nickname}</span>
                <img className="img" src={list.picture} style={list.style} />
              </span> */}

              <span className="message" style={{background :'#FF7E36', color:'white'}}>
                {list.message}</span>
              <span className="time">{list.createdAt}</span>

            </div>
            :
            <div className="chattingList">

              <span className="profile">
                <span className="user">{list.sender.nickname}</span>
                <img className="img" src={list.picture} style={list.style} />
              </span>

              <span className="message" style={{background :'lightgray'}}>{list.message}</span>
              <span className="time">{list.createdAt}</span>

            </div>
          }
          </div>
        ))}

      
      </div>

      <div className="inputArea"> 
        <span>
          <input type="text" className="chattingInput" ref={messageRef} 
                onKeyPress={handleOnKeyPress} id='inputBox'/>
          <AiOutlineCaretRight className="sendButton" onClick={handleOnClick}/>
        </span>
      </div> 
      
    </div>

  );

}

const SoldOut = styled.div`
  
  padding: 6px 5px;
  width: 65px;
  border-radius: 5px;
  background-color: #565656;
  color: white;
  font-size: 12px;
  text-align: center;
`;

const Book = styled(SoldOut)`
  width: 55px;
  background-color: #34bf9e;
`;


export default Chatting;