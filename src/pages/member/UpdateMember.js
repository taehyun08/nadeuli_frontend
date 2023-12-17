import '../public/css/listForm.css';
import styled from 'styled-components';
import { CiMenuKebab } from 'react-icons/ci';
import React, { useEffect, useState } from 'react';
import { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, removeToken, saveToken } from '../../shared/localStorage';
import HeaderBack from '../../components/HeaderBack';
import Modal from '../../components/Modal';
import { FaLocationDot } from 'react-icons/fa6';
import { getCurrentPosition } from '../../util/Location';
import { addDongNe, addMember, checkAuthNum, getAuthNumCellphone, getAuthNumEmail, getMember, updateDongNe, updateMember } from '../../shared/axios';
import { setMember } from '../../redux/modules/member';

function UpdateMember() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [nickname, setNickname] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isAuthNumBtnDisabled, setIsAuthNumBtnDisabled] = useState(false);
    const [isCheckEmailAuthNumBtnDisabled, setIsEmailCheckAuthNumBtnDisabled] = useState(false);
    const [isCheckPhoneAuthNumBtnDisabled, setIsPhoneCheckAuthNumBtnDisabled] = useState(false);
    const [isCheckEmailAuthNumInputDisabled, setIsEmailCheckAuthNumInputDisabled] = useState(false);
    const [isCheckPhoneAuthNumInputDisabled, setIsPhoneCheckAuthNumInputDisabled] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailAuthNum, setEmailAuthNum] = useState('');
    const [phoneAuthNum, setPhoneAuthNum] = useState('');
    const [isEmailUpdateButtonVisible, setIsEmailUpdateButtonVisible] = useState(true);
    const [isPhoneUpdateButtonVisible, setIsPhoneUpdateButtonVisible] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.member);

    const fetchLocation = async () => {
        try {
            const { latitude, longitude } = await getCurrentPosition();
            console.log('현재 위치:', latitude, longitude);
            setLatitude(latitude);
            setLongitude(longitude);
        } catch (error) {
            if (error.code === 1) {
                console.error('사용자가 위치 정보를 거부했습니다.');
                navigate('/');
            } else {
                console.error('위치 정보를 가져오는 중 오류가 발생했습니다:', error);
            }
        }
    };

    const logout = (e) => {
        removeToken();
        navigate('/');
    };

    const accounts = [
        { type: '계좌1', number: '1234-5678-9012' },
        { type: '계좌2', number: '9876-5432-1098' },
        // 다른 계좌 정보들 추가
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    //이메일수정 요청
    const handleEmailEditClick = () => {
        setIsEmailEditable(true);
        setIsEmailUpdateButtonVisible(false);
        // 인증번호 받기 버튼 활성화 상태로 변경
        setIsAuthNumBtnDisabled(false);
        // 인증번호 확인 입력 창 비활성화 상태로 변경
        setIsEmailCheckAuthNumInputDisabled(true);
        // 인증번호 확인 버튼 비활성화 상태로 변경
        setIsEmailCheckAuthNumBtnDisabled(true);
        // 인증번호 초기화
        setEmailAuthNum('');
    };

    //이메일 입력 후 인증번호 요청
    const handleGetEmailAuthNumBtnClick = () => {
        const memberDTO = {
            email: email,
        };
        console.log("handleGetEmailAuthNumBtnClick의 memberDTO는 "+memberDTO)
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        getAuthNumEmail(email)
            .then(() => {
                alert('인증번호가 발송되었습니다.');
                // 인증번호 확인 입력 창 활성화 상태로 변경
                setIsEmailCheckAuthNumInputDisabled(false);
                setIsEmailCheckAuthNumBtnDisabled(false)
            })
            .catch((err) => {
                alert('이미 존재하거나 올바르지 않은 이메일입니다.');
            });
    };

    const handleCheckEmailAuthNumBtnClick = async () => {
        const showAlert = (message) => {
            alert(message);
        };

        try {
            if (!/^[a-zA-Z0-9!@#$%^*+=-]{5}$/.test(emailAuthNum)) {
                showAlert('인증번호는 숫자 5자리로 입력해야 합니다.');
                return;
            }

            const data = {
                authNumber: emailAuthNum,
                to: email,
            };

            // 이 부분을 추가하여 인증번호 확인
            const response = await checkAuthNum(data);

            if (response.data === 'success') {
                showAlert('이메일 인증번호가 일치합니다.');

                setIsEmailCheckAuthNumBtnDisabled(true);
                setIsEmailCheckAuthNumInputDisabled(true);
                setIsEmailEditable(false);
                setIsEmailUpdateButtonVisible(true);

                const memberDTO = {
                    tag: member.tag,
                    email: email,
                };

                const updateResponse = await updateMember(memberDTO);
                dispatch(setMember(updateResponse.data));
            } else {
                showAlert('이메일 인증번호가 일치하지 않습니다.');
                setIsEmailEditable(true);
            }
        } catch (error) {
            console.error('오류 발생:', error);
            showAlert('이메일 인증번호 확인 중 오류가 발생했습니다.');
            setIsEmailEditable(true);
        }
    };

    const handleCancelEmailEditClick = () => {
        setIsEmailEditable(false);
        // 인증번호 받기 버튼 비활성화 상태로 변경
        setIsAuthNumBtnDisabled(true);
        setEmail('');
        // 인증번호 확인 입력 창 비활성화 상태로 변경
        setIsEmailCheckAuthNumInputDisabled(true);
        // 인증번호 확인 버튼 비활성화 상태로 변경
        setIsEmailCheckAuthNumBtnDisabled(true);
        // 인증번호 초기화
        setEmailAuthNum('');
        setIsEmailUpdateButtonVisible(true);
    };

    const handlePhoneEditClick = () => {
        setIsPhoneEditable(true);
        setIsPhoneUpdateButtonVisible(false);
    };

    const handleGetPhoneAuthNumBtnClick = () => {
        if (/[^0-9]/g.test(phone) || phone.length < 8) {
            alert('번호는 숫자만, 길이는 8자 이상 입력해주세요');
            return;
        }

        getAuthNumCellphone(phone)
            .then(() => {
                alert('인증번호가 발송되었습니다.');
                setIsPhoneEditable(true);
                setIsPhoneCheckAuthNumInputDisabled(false);
            })
            .catch((err) => {
                alert('이미 존재하거나 올바르지 않은 번호입니다.');
            });
    };

    const handleCheckPhoneAuthNumBtnClick = async () => {
        const showAlert = (message) => {
            alert(message);
        };

        try {
            if (!/^[a-zA-Z0-9!@#$%^*+=-]{5}$/.test(phoneAuthNum)) {
                showAlert('인증번호는 숫자 5자리로 입력해야 합니다.');
                return;
            }

            const memberDTO = {
                tag: member.tag,
                cellphone: phone,
            };

            const data = {
                authNumber: phoneAuthNum,
                to: phone,
            };

            const response = await checkAuthNum(data);
            showAlert('휴대폰 인증번호가 일치합니다.');

            setIsPhoneCheckAuthNumBtnDisabled(true);
            setIsPhoneCheckAuthNumInputDisabled(true);
            setIsPhoneEditable(false);
            setIsPhoneUpdateButtonVisible(true);

            const updateResponse = await updateMember(memberDTO);
            dispatch(setMember(updateResponse.data));
        } catch (error) {
            console.error('오류 발생:', error);
            showAlert('휴대폰 인증번호 확인 중 오류가 발생했습니다.');
            setIsPhoneEditable(true);
        }
    };

    const handleCancelPhoneEditClick = () => {
        setIsPhoneEditable(false);
        setIsAuthNumBtnDisabled(true);
        setPhone('');
        setPhoneAuthNum('');
        setIsPhoneCheckAuthNumInputDisabled(true);
        setIsPhoneUpdateButtonVisible(true);
    };

    const handleUpdateDongNeBtnClick = async () => {
        try {
            await fetchLocation();

            const memberDTO = {
                tag: member.tag,
            };

            const gpsDTO = {
                y: latitude,
                x: longitude,
            };

            const response = await updateDongNe(memberDTO, gpsDTO);

            alert('동네 수정이 완료되었습니다.');
            dispatch(setMember(response.data));
        } catch (error) {
            console.error('동네 수정에 실패하였습니다. 재시도 해주세요', error);
            alert('동네 수정에 실패하였습니다. 재시도 해주세요');
        }
    };

    const onChange = (e) => {
        const updatedEmail = e.target.name === 'email' ? e.target.value : email;
        const updatedPhone = e.target.name === 'phone' ? e.target.value : phone;
        const updatedEmailAuthNum = e.target.name === 'emailAuthNum' ? e.target.value : emailAuthNum;
        const updatedPhoneAuthNum = e.target.name === 'phoneAuthNum' ? e.target.value : phoneAuthNum;
        setEmail(updatedEmail);
        setPhone(updatedPhone);
        setEmailAuthNum(updatedEmailAuthNum);
        setPhoneAuthNum(updatedPhoneAuthNum);
    };

    return (
        <div className="Wrap">
            <div className="TMenuBar">
                <TMenuBar>
                    <HeaderBack />
                    <p>내 프로필 수정</p>
                </TMenuBar>
            </div>
            <MyInfoBox>
                <div style={{ display: 'flex', alignItems: 'center', lineHeight: '1.5' }}>
                    <Img src={member.picture} />
                    <div style={{ paddingLeft: '20px' }}>
                        <input
                            className="nickname"
                            type="text"
                            required
                            maxLength={12}
                            onChange={onChange}
                            name="nickname"
                            defaultValue={member.nickname}
                        />
                    </div>
                </div>
            </MyInfoBox>
            <MyMenuMiddle>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'space-around',
                        height: '400px',
                        paddingLeft: '20px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Circle>
                            <p>계좌</p>
                        </Circle>
                        <StyledSelect
                            id="accountSelect"
                            name="account"
                        >
                            <option
                                value=""
                                disabled
                                selected
                            >
                                선택하세요
                            </option>
                            {accounts.map((account, index) => (
                                <option
                                    key={index}
                                    value={account.number}
                                >
                                    {account.type}: {account.number}
                                </option>
                            ))}
                        </StyledSelect>
                        <Button className="bankAccount">+</Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Circle>
                            <p>동네</p>
                        </Circle>
                        <p>{member.dongNe}</p>
                        <Button onClick={handleUpdateDongNeBtnClick}>
                            <FaLocationDot />
                        </Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Circle>
                            <p>이메일</p>
                        </Circle>
                        {isEmailUpdateButtonVisible && (
                            <div className="emailDiv">
                                <p>{member.email}</p>
                                <Button onClick={handleEmailEditClick}>수정</Button>
                            </div>
                        )}
                        {isEmailEditable && (
                            <div className="emailDiv">
                                <input
                                    className="to"
                                    type="text"
                                    placeholder="이메일 주소"
                                    required
                                    maxLength={100}
                                    disabled={!isEmailEditable}
                                    onChange={onChange}
                                    name="email"
                                />
                                <Button
                                    className="authNumberBtn"
                                    onClick={handleGetEmailAuthNumBtnClick}
                                    disabled={isAuthNumBtnDisabled}
                                >
                                    인증번호 받기
                                </Button>
                                <div>
                                    <input
                                        className="authNum"
                                        type="text"
                                        placeholder="인증번호"
                                        maxLength={5}
                                        required
                                        onChange={onChange}
                                        name="emailAuthNum"
                                        disabled={isCheckEmailAuthNumInputDisabled} // 인증번호 확인 입력 창의 활성화 여부 설정
                                    />
                                    <Button
                                        className="authNumberBtn2"
                                        onClick={handleCheckEmailAuthNumBtnClick}
                                        disabled={isCheckEmailAuthNumBtnDisabled}
                                    >
                                        인증번호 확인
                                    </Button>
                                </div>
                                <Button onClick={handleCancelEmailEditClick}>취소</Button>
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Circle>
                            <p>휴대폰 번호</p>
                        </Circle>
                        {isPhoneUpdateButtonVisible && (
                            <div>
                                <p>{member.cellphone}</p>
                                <Button onClick={handlePhoneEditClick}>수정</Button>
                            </div>
                        )}
                        {isPhoneEditable && (
                            <div>
                                <input
                                    className="to"
                                    type="text"
                                    placeholder="휴대폰 번호 (- 없이 숫자만 입력)"
                                    required
                                    maxLength={11}
                                    disabled={!isPhoneEditable}
                                    onChange={onChange}
                                    name="phone"
                                />
                                <Button
                                    className="authNumberBtn"
                                    onClick={handleGetPhoneAuthNumBtnClick}
                                    disabled={isAuthNumBtnDisabled}
                                >
                                    인증번호 받기
                                </Button>
                                <div>
                                    <input
                                        className="authNum"
                                        type="text"
                                        placeholder="인증번호"
                                        maxLength={5}
                                        required
                                        onChange={onChange}
                                        name="phoneAuthNum"
                                        disabled={isCheckPhoneAuthNumInputDisabled} // 인증번호 확인 입력 창의 활성화 여부 설정
                                    />
                                    <Button
                                        className="authNumberBtn"
                                        onClick={handleCheckPhoneAuthNumBtnClick}
                                        disabled={isCheckPhoneAuthNumBtnDisabled}
                                    >
                                        인증번호 확인
                                    </Button>
                                    <Button onClick={handleCancelPhoneEditClick}>취소</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* <Button>수정</Button> */}
            </MyMenuMiddle>
        </div>
    );
}

const TMenuBar = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    p {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const MyInfoBox = styled.div`
    display: flex;
    width: 100%;
    height: 130px;
    margin-top: 20px;
    input {
        border: 1px solid #bbb;
        height: 50px;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 16px;

        &::placeholder {
            color: #ccc;
        }
    }
`;

const MyMenuMiddle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
`;

const Circle = styled.div`
    background-color: rgb(254, 237, 229);
    width: 60px;
    height: 60px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    width: 50px;
    height: 40px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    color: #fff;
    transition: background 0.3s;
    cursor: pointer;

    &.bankAccount {
        width: 40px;
        height: 40px;
    }

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

const Img = styled.img`
    border-radius: 100px;
    width: 100px;
    border: 1px solid black;
    margin-left: 20px;
    height: 100px;
`;
const StyledSelect = styled.select`
    width: 250px;
    height: 40px;
    font-size: 16px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 10px;

    &:focus {
        outline: none;
        border: 2px solid #5f9ea0; /* 포커스 시 테두리 색상 변경 */
    }
`;

export default UpdateMember;
