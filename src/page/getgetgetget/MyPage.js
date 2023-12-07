import { AiFillHome } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';

import "../public/css/listForm.css";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBasket2Fill } from "react-icons/bs";
import { BsReceipt } from "react-icons/bs";

import SalesList from "../components/SalesList";
import ConcernsList from "../components/ConcernsList";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getToken, removeToken } from '../shared/localStorage';

function MyPage () {
  const [subMenu, setSubMenu] = useState(<SalesList/>);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logout = (e) => {
    removeToken();
    navigate("/");
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
      <div className="Wrap">
      <div className="TMenuBar">
        <p>나의 당근</p>
        <p onClick={logout} style={{cursor: "pointer"}}> 로그아웃 </p> 
      </div>
        <div className="topView">
          <div className="ContentsBox">
            <MyInfoBox>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Img src={user.userImg} />
                <div style={{ padding: '40px' }}> {user.nickname} </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MdArrowForwardIos size="25" color='black' onClick={() => { navigate("/profile") }} />
              </div>
            </MyInfoBox>

            <MyMenuMiddle>
              <div><Circle onClick={() => { setSubMenu(<SalesList />); }}><BsReceipt size="25" color='#ff7E36' /></Circle>판매내역</div>
              <div><Circle onClick={() => { alert("미구현 상태입니다") }}><BsFillBasket2Fill size="25" color='#ff7E36' /></Circle>구매내역</div>
              <div><Circle onClick={() => { setSubMenu(<ConcernsList />); }}><AiFillHeart size="25" color='#ff7E36' /></Circle>관심목록</div>
            </MyMenuMiddle>
          </div>
          
          <div>
            {subMenu}
          </div>
        </div>

        <div className="bottomView">
          <div className="BMenuBar">
            <div className="BMenuBox" onClick={() => { navigate("/main") }}>
              <AiFillHome size="30px" color={"#AAAAAA"} />
              <p style={{ color: "#AAAAAA" }}></p>HOME</div>
            <div className="BMenuBox" onClick={() => { navigate("/mypage") }}>
              <BiUser size="40px" color={"black"} />
              <p style={{ color: "black" }}>MY Carrot</p>
            </div>
          </div>
        </div>
      
      </div>

  )
}

const MyInfoBox = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #DDDDDD;
  height: 130px;
`;

const MyMenuMiddle = styled.div`
  height: 120px;
  border-bottom: 1px solid #DDDDDD;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 25px auto;
`;

const Circle = styled.div`
  background-color: rgb(254, 237, 229);
  width: 60px;
  height: 60px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Img = styled.img`
  border-radius: 100px;
  width: 80px;
  height: 80px;
`;

export default MyPage;
