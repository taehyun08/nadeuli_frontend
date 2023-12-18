import React from 'react';
import ChatRoomList from './ChatRoomList';
import { useState, useEffect } from "react";
import { get, post } from "../../util/axios";
import { get as chatGet } from "../../util/chatAxios";
import { useSelector } from "react-redux";

const GetChatRoomList = () => {
  const member = useSelector((state) => state.member);

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      chatGet(`/api/chatRoom/${member.tag}`)
        .then((result) => {
            result.map((item) => {
                if (item.orikkiriId === 0) {
                    const filteredParticipants = item.participants.filter(item => item.tag !== member.tag);
                    const filteredParticipant = filteredParticipants[0];
                    get(`/member/getOtherMember/${filteredParticipant.tag}`)
                      .then((res) => {
                        console.log(res);
                        item.picture = res.picture;
                        item.roomName = res.nickname;
                      })
                      .catch((error) => {
                        console.error('Error fetching chat rooms:', error);
                      });
                } else {
                    get(`/orikkiriManage/getOrikkiri/${item.orikkiriId}`)
                      .then((res) => {
                        console.log(res);
                        item.picture = res.orikkiriPicture
                        item.roomName = res.orikkiriName;
                      })
                      .catch((error) => {
                        console.error('Error fetching chat rooms:', error);
                      })
                }
            });
          // 비동기 작업이 완료된 후에 실행될 코드
          setChatRooms(result);
          console.log(result);
        });
        
    }
        fetchData();
    }, []);



  return (
    <div>
      {/* 다른 컴포넌트들 추가 가능 */}
      <ChatRoomList chatRooms={chatRooms} />
    </div>
  );
};

export default GetChatRoomList;