import '../style/css/listForm.css';
import { AiFillHome } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';

import MainItemList from '../components/MainItemList';

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';


function Main () {
  const navigate = useNavigate();
  const [pageState, setState] = useState(<MainItemList/>);
  const member = useSelector((state) => state.member);
  console.log('유저 정보:', member);

  return (
    <div className="Wrap">
      <div className="TMenuBar"> 
        <span> 태그 : {member.tag} </span>
        <span> 휴대전화 : {member.cellphone} </span>
        <span> 동네 : {member.dongNe} </span>
        <span> 구 : {member.gu} </span>
        <span> 닉네임 : {member.nickname} </span>
      </div>
      <div className="topView">
        {pageState}
      </div>
      <div className="bottomView">
        <div className="BMenuBar"> 
          <div className="BMenuBox" onClick={() => { navigate("/main") }}>
            <AiFillHome size="30px" color={"black"}/>
            <p style={{color: "black"}}></p>HOME</div>
          <div className="BMenuBox" onClick={() => { navigate("/mypage") }}>
            <BiUser size="40px" color={"#AAAAAA"}/>
              <p style={{color: "#AAAAAA"}}>MY Carrot</p> 
          </div>        
        </div>
      </div>
    </div>
  )
}

export default Main;