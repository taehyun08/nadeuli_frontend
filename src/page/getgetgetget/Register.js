import HeaderBack from "../components/HeaderBack";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { register } from "../shared/axios";
import { css } from "styled-components";


function Register () {
  const location = useLocation();
  const navigate = useNavigate();
  const [btnState, setBtnState] = useState(false);
  const ref = {
    phone: useRef(null),
    password: useRef(null),
    passwordConfirm: useRef(null),
    nickname: useRef(null)
  }

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, []);

  const confirmRegister = (e) => {
    e.preventDefault();

    const phoneNum = ref.phone.current.value;
    const password = ref.password.current.value;
    const passwordCheck = ref.passwordConfirm.current.value;
    const nickname = ref.nickname.current.value;
    const userLocation = location.state;

    const data = {
      phoneNum,
      password,
      passwordCheck,
      nickname,
      userLocation
    };

    // validation 체크
    if (/[^0-9]/g.test(phoneNum) || phoneNum.length < 8) { // 안에 숫자가 아닌 값이 있을 경우
      alert("번호는 숫자만, 길이는 8자 이상 입력해주세요");
      return;
    }

    if (data.password !== data.passwordCheck) { // 비밀번호와 비밀번호 확인이 일치하지 않는 경우
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 하기 코드는 테스트 및 분석해봐야 함
    if(!/^[a-zA-Z0-9!@#$%^*+=-]{4,16}$/.test(password)){ // 안에 소문자,대문자,숫자, 특수문자 '!' ~ '+' (괄호 제외)를 제외한 값이 있을 경우
      alert("비밀번호는 숫자와 영문자, 특수문자(!@#$%^&*+=-) 조합으로 사용할 수 있으며 4~16자리로 입력해야 합니다.");
      return;
    }

    if (/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g.test(nickname) || nickname.length < 3) { // 영문자 영어대문자 한글 숫자가 아닐 경우, 문자가 3글자 이하인 경우
      alert("닉네임은 숫자, 영문, 한글을 사용하여 3자 이상 입력해야 합니다. 특수문자는 사용할 수 없습니다");
      return;
    }

    register(data).then((response) => {
      if (response.data.result) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      }
    }).catch((err) => {
      const json = JSON.parse(err.request.response);
      alert(json.message);
    });
  }

  const onChange = (e) => { // 버튼 활성화
    const phoneNum = ref.phone.current.value;
    const password = ref.password.current.value;
    const passwordCheck = ref.passwordConfirm.current.value;
    const nickname = ref.nickname.current.value;
    const userLocation = location.state;

    if (phoneNum.length > 0 && password.length > 0 && passwordCheck.length > 0 && nickname.length > 0 && userLocation.length > 0) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }

  return (
    <Box>
      <HeaderBack />
      <Content>
        <em>안녕하세요!<br/>휴대폰 번호로 가입 해주세요.</em>
        <p>휴대폰 번호는 안전하게 보관되며 이웃들에게 공개되지 않아요</p>
        <Form onSubmit={confirmRegister}>
          <input type="text" placeholder="휴대폰 번호 (- 없이 숫자만 입력)" required minLength={8} autoComplete="phone" ref={ref.phone} onChange={onChange} />
          <input type="password" placeholder="비밀번호" autoComplete="current-password" minLength={4} maxLength={16} required ref={ref.password} onChange={onChange} />
          <input type="password" placeholder="비밀번호 확인" autoComplete="current-password" minLength={4} maxLength={16} required ref={ref.passwordConfirm} onChange={onChange} />
          <input type="nickname" placeholder="닉네임" autoComplete="nickname" required minLength={3} ref={ref.nickname} onChange={onChange} />
          <Button isActive={btnState}>회원가입</Button>
        </Form>
      </Content>
    </Box>
  )
}

const Box = styled.div``;

const Content = styled.div`
  padding: 40px 20px 0;

  em {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.4;
  }

  p {
    font-size: 12px;
    margin-top: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  input {
    border: 1px solid #BBB;
    height: 50px;
    border-radius: 5px;
    padding: 0 10px;

    &::placeholder {
      color: #ccc;
    }
  }

  input + input {
    margin-top: 10px;
  }

`;

const Button = styled.button`
  margin-top: 20px;
  height: 80px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  color: #FFF;
  transition: background .3s;
  cursor: pointer;
  ${props => props.isActive ? css`
    background-color: ${props => props.theme.color.orange};
    &:hover {
      background-color: ${props => props.theme.hoverColor.orange};
    }
  `: css`
    background-color: #DDD;
  `}
`;

export default Register;