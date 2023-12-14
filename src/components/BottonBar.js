import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoChatbubblesSharp } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";


const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <BottomBarContainer>
      <MenuBox onClick={() => navigate('/main')}>
        <AiFillHome size="30px" color={'black'} />
        <p style={{ color: 'black', fontSize: '12px' }}>HOME</p>
      </MenuBox>
      <MenuBox onClick={() => navigate('/dongNeHome')}>
        <HiClipboardDocumentList size="30px" color={'#black'} />
        <p style={{ color: '#black', fontSize: '12px' }}>동네나드리</p>
      </MenuBox>
      <MenuBox onClick={() => navigate('/mypage')}>
        <MdDeliveryDining size="30px" color={'#black'} />
        <p style={{ color: '#black', fontSize: '12px' }}>나드리부름</p>
      </MenuBox>
      <MenuBox onClick={() => navigate('/mypage')}>
        <IoChatbubblesSharp size="30px" color={'#black'} />
        <p style={{ color: '#black', fontSize: '12px' }}>채팅</p>
      </MenuBox>
      <MenuBox onClick={() => navigate('/mypage')}>
        <BiUser size="30px" color={'#black'} />
        <p style={{ color: '#black', fontSize: '12px' }}>내 나드리</p>
      </MenuBox>
    </BottomBarContainer>
  );
};

const BottomBarContainer = styled.div`
  background-color: #f8f8f8;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
`;

const MenuBox = styled.div`
  text-align: center;
  cursor: pointer;
`;

export default BottomBar;
