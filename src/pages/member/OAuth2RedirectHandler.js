import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // useHistory 추가
import { kakaoLogin } from '../../shared/axios';
import { saveToken } from '../../shared/localStorage';

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

//   useEffect(() => {
//     const handleOAuthLogin = async () => {
//       try {
//         const res = await kakaoLogin(code);
//         // console.log(res); // 토큰이 넘어올 것임

//         // const ACCESS_TOKEN = res.data.accessToken;

//         // saveToken(ACCESS_TOKEN); // 예시로 로컬에 저장함

//         navigate('/main'); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
//       } catch (err) {
//         console.log('소셜로그인 에러', err);
//         window.alert('로그인에 실패하였습니다.');
//         // navigate('/login'); // 로그인 실패하면 로그인 화면으로 돌려보냄
//       }
//     };

//     if (code) {
//       handleOAuthLogin();
//     }
//   }, [code]);

  return <>sdfsdf</>;
};

export default OAuth2RedirectHandler;
