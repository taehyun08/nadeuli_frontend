import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';
import HeaderBack from '../../components/HeaderBack';
import { carrotLoginStatus, getCarrotUserInfo } from '../../redux/modules/user';
import { login } from '../../shared/axios';
import { saveToken } from '../../shared/localStorage';

function UpdateCellphone() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [btnState, setBtnState] = useState(false);

    const ref = {
        phone: useRef(null),
        password: useRef(null),
    };

    const confirmLogin = (e) => {
        e.preventDefault();
        const phoneNum = ref.phone.current.value;
        const password = ref.password.current.value;

        const data = {
            phoneNum,
            password,
        };

        // validation 체크
        if (/[^0-9]/g.test(phoneNum) || phoneNum.length < 8) {
            // 안에 숫자가 아닌 값이 있을 경우
            alert('번호는 숫자만, 길이는 8자 이상 입력해주세요');
            return;
        }

        // 하기 코드는 테스트 및 분석해봐야 함
        if (!/^[a-zA-Z0-9!@#$%^*+=-]{4,16}$/.test(password)) {
            // 안에 소문자,대문자,숫자, 특수문자 '!' ~ '+' (괄호 제외)를 제외한 값이 있을 경우
            alert('비밀번호는 숫자와 영문자, 특수문자(!@#$%^&*+=-) 조합으로 사용할 수 있으며 4~16자리로 입력해야 합니다.');
            return;
        }

        login(data)
            .then((response) => {
                alert('휴대폰 번호 변경 완료!');
                saveToken(response.data.token);
                dispatch(carrotLoginStatus(true));
                dispatch(getCarrotUserInfo());
                navigate('/main');
            }) 
            .catch((err) => {
                alert('휴대폰 번호 변경 실패!');
            });
    };

    const onChange = (e) => {
        // 버튼 활성화
        const phoneNum = ref.phone.current.value;
        const password = ref.password.current.value;

        if (phoneNum.length > 0 && password.length > 0) {
            setBtnState(true);
        } else {
            setBtnState(false);
        }
    };

    return (
        <Box>
            <HeaderBack />
            <Content>
                <em>
                    휴대폰 번호를 입력해주세요
                </em>
                <p>휴대폰 번호 변경 후 다시 로그인 하셔야 합니다.</p>
                <Form onSubmit={confirmLogin}>
                    <div>
                        <input
                            className="authNumber"
                            type="text"
                            placeholder="휴대폰 번호 (- 없이 숫자만 입력)"
                            required
                            minLength={8}
                            autoComplete="phone"
                            ref={ref.phone}
                            onChange={onChange}
                        />
                        <Button className="authNumberBtn">인증번호 받기</Button>
                    </div>
                    <div>
                        <input
                            className="authNumber"
                            type="password"
                            placeholder="인증번호"
                            autoComplete="current-password"
                            maxLength={5}
                            required
                            ref={ref.password}
                            onChange={onChange}
                        />
                        <Button className="authNumberBtn">인증번호 확인</Button>
                    </div>
                    <Button isActive={btnState}>휴대폰 번호 변경</Button>
                </Form>
            </Content>
        </Box>
    );
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
        border: 1px solid #bbb;
        height: 50px;
        border-radius: 5px;
        padding: 0 10px;

        &::placeholder {
            color: #ccc;
        }
    }

    .authNumber {
        width: 50%;
    }
    .authNumberBtn {
        width: 40%;
        margin-left: 10%; /* 오른쪽에 여백 추가 */
        border: 1px solid #bbb;
        height: 50px;
        border-radius: 5px;
        padding: 0 10px;
    }

    input + input {
        margin-top: 10px;
    }

    p{
      margin-top:30px;
      text-align:center;
      font-size:18px;
    }
`;

const Button = styled.button`
    margin-top: 20px;
    height: 80px;
    border-radius: 5px;
    border: none;
    background-color: #ddd;
    font-size: 20px;
    color: #fff;
    transition: background 0.3s;
    cursor: pointer;
    ${(props) =>
        props.isActive
            ? css`
                  background-color: ${(props) => props.theme.color.orange};
                  &:hover {
                      background-color: ${(props) => props.theme.hoverColor.orange};
                  }
              `
            : css`
                  background-color: #ddd;
              `}
`;

export default UpdateCellphone;
