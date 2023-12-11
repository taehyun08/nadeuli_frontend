import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';
import HeaderBack from '../../components/HeaderBack';
import { carrotLoginStatus, getCarrotUserInfo } from '../../redux/modules/user';
import { login } from '../../shared/axios';
import { saveToken } from '../../shared/localStorage';

function FindAccount() {
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
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(password)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        login(data)
            .then((response) => {
                alert('로그인 성공!');
                saveToken(response.data.token);
                dispatch(carrotLoginStatus(true));
                dispatch(getCarrotUserInfo());
                navigate('/main');
            })
            .catch((err) => {
                alert('로그인 실패!');
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
                    이메일을 입력 해주세요.
                </em>
                <p>등록된 이메일이 아닐경우 계정을 찾을 수 없습니다.</p>
                <p>이메일 인증 완료 후 휴대폰 번호를 변경해서 로그인을 진행하셔야합니다.</p>
                <Form onSubmit={confirmLogin}>
                    <div>
                        <input
                            className="authNumber"
                            type="text"
                            placeholder="이메일"
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
                    {/* <input
                        type="password"
                        placeholder="비밀번호 확인"
                        autoComplete="current-password"
                        minLength={4}
                        maxLength={16}
                        required
                        ref={ref.passwordConfirm}
                        onChange={onChange}
                    /> */}
                    <Button isActive={btnState}>이메일로 계정 찾기</Button>
                    <p><span><Link to="/updateCellphone">aaa</Link></span></p>
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

export default FindAccount;
