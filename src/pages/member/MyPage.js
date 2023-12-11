import '../public/css/listForm.css';
import styled from 'styled-components';
import { CiMenuKebab } from 'react-icons/ci';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken, removeToken } from '../../shared/localStorage';
import HeaderBack from '../../components/HeaderBack';
import Modal from '../../components/Modal';

function MyPage() {
    // const [subMenu, setSubMenu] = useState(<SalesList/>);

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

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
    // useEffect(() => {
    //   const token = getToken();
    //   if (!token) {
    //     navigate("/");
    //   }
    // }, [navigate]);

    return (
        <div className="Wrap">
            <div className="TMenuBar">
                <TMenuBar>
                    <HeaderBack />
                    <p>내 프로필</p>
                    <CiMenuKebab
                        onClick={toggleMenu}
                        style={{ fontSize: '40px' }}
                    >
                        로그아웃
                    </CiMenuKebab>
                    {isMenuVisible && (
                        <SmallMenu>
                            <p>프로필 수정</p>
                            <p>로그아웃</p>
                            <p onClick={openModal}>비활성화</p>
                            <p>회원 목록 조회</p>
                            <p>주문 내역 목록</p>
                            <p>배달 내역 목록</p>
                        </SmallMenu>
                    )}
                    {isModalVisible && (
                        <Modal open={isModalVisible} close={closeModal} header="비활성화">
                            {/* 모달 내용을 추가하세요 */}
                            <p>모달 내용을 여기에 추가하세요.</p>
                        </Modal>
                    )}
                </TMenuBar>
            </div>
            <div
                className="topView"
                style={{ padding: '0' }}
            >
                <div className="ContentsBox">
                    <MyInfoBox>
                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '1.5' }}>
                            <Img src={user.userImg} />
                            <div style={{ paddingLeft: '20px' }}>
                                <p>
                                    엄준식<span>aaa</span>
                                </p>
                                <p>서울특별시 강서구 공항동</p>
                                <p>친화력 5점</p>
                            </div>
                        </div>
                    </MyInfoBox>
                    <MyMenuMiddle>
                        <p style={{ fontSize: '25px' }}>나드리페이 10,000원</p>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '30px' }}>
                            <Circle>
                                <p>충전</p>
                            </Circle>
                            <Circle>
                                <p>출금</p>
                            </Circle>
                        </div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '30px' }}>
                            <Button>
                                <p>내 상품 목록</p>
                            </Button>
                            <Button>
                                <p>거래 후기</p>
                            </Button>
                            <Button>
                                <p>나드리페이 내역</p>
                            </Button>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                justifyContent: 'space-around',
                                marginTop: '50px',
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
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Circle>
                                    <p>이메일</p>
                                </Circle>
                                <p>mayuaa001@gmail.com</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Circle>
                                    <p>휴대폰 번호</p>
                                </Circle>
                                <p>010-8989-8989</p>
                            </div>
                        </div>
                    </MyMenuMiddle>
                </div>
            </div>
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
`;

const MyInfoBox = styled.div`
    display: flex;
    width: 100%;
    height: 130px;
    margin-top: 20px;
`;

const MyMenuMiddle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 25px auto;
    margin-top: 50px;
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
const SmallMenu = styled.div`
    position: absolute;
    top: 105%;
    right: 1%;
    background-color: white;
    border: 1px solid #ddd;
    padding: 10px;
    z-index: 1;
    p {
        margin-bottom: 10px; // 간격 조정
    }
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #ddd;
    font-size: 20px;
    transition: background 0.3s;
    cursor: pointer;
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
export default MyPage;
