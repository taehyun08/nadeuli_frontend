import styled from "styled-components";
import logo from "../public/images/logo.png";
import kakao from "../public/images/kakao.png"
import google from "../public/images/google.png"
import naver from "../public/images/naver.png"
import { Link } from "react-router-dom";
import { useState } from "react";


function Start () {
  
  // console.log(process.env.REACT_APP_KAKAO_AUTH_URL)
  
  const kakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
}
  return (
    <Box>
      <Intro>
        <h1><img src={logo} alt="당근마켓 로고" /></h1>
        <h2>당신 근처의 당근 마켓</h2>
      </Intro>
      <Select>
        <WrapBottom>S
          <button className="signUp"><Link to="/register">나드리 회원가입</Link></button>
          <button><Link to="/login">나드리 로그인</Link></button>
          {/* <button className="google"><Link to="/location"><img src={google} alt="구글로그인 아이콘"/></Link></button> */}
          <button className="google" onClick={kakaoLogin}><img src={google} alt="구글로그인 아이콘"/></button>
          <button className="kakao" onClick={kakaoLogin}><img src={kakao} alt="카카오로그인 아이콘"/></button>
          <button className="naver"><Link to="/location"><img src={naver} alt="네이버로그인 아이콘"/></Link></button>
        </WrapBottom>
      </Select>
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Intro = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    display: flex;
    justify-content: center;
    img {
      width: 40%;
    }
  }

  h2 {
    font-weight: bold;
    margin-top: 10px;
  }

  p {
    text-align: center;
    margin-top: 20px;
  }
`

const Select = styled.div`
  position: relative;
  height:50%
`;

const WrapBottom = styled.div`



  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .signUp{
    width: 40%;
  }

  button {
    width: 75%;
    height: 13%;
    border-radius: 5px;
    margin-top: 10px;
    color: ${props => props.theme.color.white};
    overflow:hidden;
    font-weight: bold;

    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${props => props.theme.color.orange};
      transition: background .3s;

      &:hover {
        background-color: ${props => props.theme.hoverColor.orange};
      }
    }

    img{
      width:100%;

    }

  }

  p {
    margin-top: 30px;
    span {
      color:black;
      font-weight:bold;
    }
  }
`;

export default Start;