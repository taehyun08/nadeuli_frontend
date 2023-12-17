import React, { useEffect, useRef, useState } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPosition } from '../../util/Location';
import HeaderBack from '../../components/HeaderBack';
import styled from 'styled-components';
import TopDropdownMenu from '../../components/TopDropdownMenu';
import { FaLocationDot } from 'react-icons/fa6';
import { checkAuthNum, getAuthNumCellphone, getAuthNumEmail, logout, updateDongNe, updateMember } from '../../shared/axios';
import { memberLogout, setMember } from '../../redux/modules/member';
import { removeToken } from '../../shared/localStorage';
import axios from 'axios';

export default function GetMyProfile() {
    //hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.member);
    // 환경 변수에서 기본 URL을 가져옵니다.
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    //useState
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState(member.cellphone);
    const [authNum, setAuthNum] = useState('');
    const [isAuthNumReceived, setIsAuthNumReceived] = useState(false);
    const [isAuthNumCheck, setIsAuthNumCheck] = useState(false);
    const [eamilAuthNum, setEmailAuthNum] = useState('');
    const [isEmailAuthNumReceived, setIsEmailAuthNumReceived] = useState(false);
    const [isEmailAuthNumCheck, setIsEmailAuthNumCheck] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const imageInput = useRef();

    //모달
    const [profileModal, setProfileModal] = useState(false);
    const [nicknameModal, setNicknameModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [cellphoneModal, setCellphoneModal] = useState(false);
    const profileToggleOpen = () => setProfileModal(!profileModal);
    const nicknameToggleOpen = () => setNicknameModal(!nicknameModal);
    const emailToggleOpen = () => setEmailModal(!emailModal);
    const cellphoneToggleOpen = () => setCellphoneModal(!cellphoneModal);

    //useEffect
    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 초기 휴대폰 번호 설정
        setCellphone(member.cellphone);
    }, [member.cellphone]);
    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 초기 이메일 설정
        setEmail(member.email);
    }, [member.email]);
    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 초기 닉네임 설정
        setNickname(member.nickname);
    }, [member.nickname]);

    //전화번호 형식 지정
    // member.cellphone 값이 '01000000000'라고 가정합니다.
    const rawPhoneNumber = member.cellphone;

    // 전화번호 형식으로 변환
    const formattedPhoneNumber = `${rawPhoneNumber.slice(0, 3)}-${rawPhoneNumber.slice(3, 7)}-${rawPhoneNumber.slice(7)}`;

    //위치정보 얻는 함수
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

    // 프로필사진 업로드 함수
    const selectFile = (e) => {
        const file = e.target.files[0];
        const fileType = file.type.split('/')[0];

        if (fileType === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                // 이미지를 선택하고 파일이 변경될 때마다 updateProfileImage 호출
                updateProfileImage();
            };
            reader.readAsDataURL(file);
        } else {
            alert('.jpg와 .png 파일만 업로드 가능합니다.');
            e.target.value = null;
        }
    };

    // 프로필 업데이트 함수
    const updateProfileImage = async () => {
        try {
            const formData = new FormData();

            // 이미지 파일 추가
            formData.append('image', imageInput.current.files[0]);

            // 기타 멤버 정보 추가 (예: 닉네임)
            formData.append('tag', member.tag);
            formData.append('picture', member.picture);

            // axios를 사용하여 이미지 업데이트 요청
            const response = await axios.post(`${BASE_URL}/nadeuli/member/updateProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 이미지 업데이트 성공 시 Redux의 상태를 업데이트
            dispatch(setMember(response.data));
            // 성공 메시지 등 추가적인 처리가 필요한 경우 여기에 작성
        } catch (error) {
            // 실패한 경우 에러 처리
            console.error('이미지 업데이트 실패:', error.message);
            // 실패 메시지 등 추가적인 처리가 필요한 경우 여기에 작성
        }
    };

    // 닉네임 수정 버튼 클릭 시
    const handleUpdateNickname = async () => {
        try {
            // 유효성 체크
            if (/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g.test(nickname) || nickname.length < 6 || nickname.length > 12) {
                // 영문자, 영어 대문자, 한글, 숫자가 아닐 경우 또는 닉네임이 6~12글자가 아닐 경우
                alert('닉네임은 숫자, 영문 대/소문자, 한글을 사용하여 6~12자를 입력해야 합니다. 특수문자는 사용할 수 없습니다');
                return;
            }

            const memberDTO = {
                tag: member.tag,
                nickname: nickname,
            };

            // 서버에 실제로 회원 정보를 업데이트하는 API 호출
            const updateResponse = await updateMember(memberDTO);

            // 회원 정보 업데이트 성공 시의 처리
            dispatch(setMember(updateResponse.data));

            alert('닉네임이 변경되었습니다.');
            nicknameToggleOpen(); // 모달 닫기
        } catch (error) {
            // 서버에서 에러가 발생한 경우
            console.error('서버에서 에러가 발생했습니다.', error);
            alert('서버에서 에러가 발생했습니다. 재시도해주세요');
        }
    };

    // 휴대폰 인증번호 받기 버튼 클릭 시
    const handleReceiveAuthNum = () => {
        //유효성체크
        if (/[^0-9]/g.test(cellphone) || cellphone.length < 11) {
            alert('휴대폰 번호는 숫자 11자리로 입력해야 합니다');
            return;
        }
        // 인증번호 받기 로직 추가 (예: API 호출 등)
        getAuthNumCellphone(cellphone)
            .then(() => {
                alert('인증번호가 발송되었습니다.');
                setIsAuthNumReceived(true);
            })
            .catch((err) => {
                alert('이미 존재하거나 올바르지 않은 번호입니다.');
            });
    };

    // 이메일 인증번호 받기 버튼 클릭 시
    const handleReceiveEmailAuthNum = () => {
        //유효성체크
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }
        // 인증번호 받기 로직 추가 (예: API 호출 등)
        getAuthNumEmail(email)
            .then(() => {
                alert('인증번호가 발송되었습니다.');
                setIsEmailAuthNumReceived(true);
            })
            .catch((err) => {
                alert('이미 존재하거나 올바르지 않은 번호입니다.');
            });
    };

    // 휴대폰 인증번호 확인 버튼 클릭 시
    const handleCheckAuthNum = async () => {
        if (!/^[a-zA-Z0-9!@#$%^*+=-]{5}$/.test(authNum)) {
            alert('인증번호는 숫자 5자리로 입력해야 합니다.');
            return;
        }

        try {
            const data = {
                authNumber: authNum,
                to: cellphone,
            };

            await checkAuthNum(data);
            setIsAuthNumCheck(true);
            alert('인증번호가 일치합니다.');
        } catch (error) {
            // 인증번호 확인이나 회원 정보 업데이트에 실패한 경우
            alert('인증번호 확인에 실패했습니다.');
        }
    };

    // 이메일 인증번호 확인 버튼 클릭 시
    const handleCheckEmailAuthNum = async () => {
        if (!/^[a-zA-Z0-9!@#$%^*+=-]{5}$/.test(eamilAuthNum)) {
            alert('인증번호는 숫자 5자리로 입력해야 합니다.');
            return;
        }

        try {
            const data = {
                authNumber: eamilAuthNum,
                to: email,
            };

            await checkAuthNum(data);
            setIsEmailAuthNumCheck(true);
            alert('인증번호가 일치합니다.');
        } catch (error) {
            // 인증번호 확인이나 회원 정보 업데이트에 실패한 경우
            alert('인증번호 확인에 실패했습니다.');
        }
    };

    // 휴대폰 수정하기 버튼 클릭 시
    const handleUpdateMember = async () => {
        // 수정하기 로직 추가
        try {
            const memberDTO = {
                tag: member.tag,
                cellphone: cellphone,
            };

            // 실제로 회원 정보를 업데이트하는 API 호출
            const updateResponse = await updateMember(memberDTO);

            // 회원 정보 업데이트 성공 시의 처리
            dispatch(setMember(updateResponse.data));
            alert('휴대폰 번호가 성공적으로 수정되었습니다.');
            setCellphone(member.cellphone); // 휴대폰 번호 초기값으로 설정
            setAuthNum(''); // 인증번호 초기값으로 설정
            setIsAuthNumReceived(false); // 인증번호 받은 여부 초기값으로 설정
            setIsAuthNumCheck(false);
            cellphoneToggleOpen(); // 모달 닫기
        } catch (error) {
            // 회원 정보 업데이트에 실패한 경우
            alert('휴대폰 번호 수정에 실패했습니다.');
        }
    };

    // 이메일 수정하기 버튼 클릭 시
    const handleUpdateMemberEmail = async () => {
        // 수정하기 로직 추가
        try {
            const memberDTO = {
                tag: member.tag,
                email: email,
            };

            // 실제로 회원 정보를 업데이트하는 API 호출
            const updateResponse = await updateMember(memberDTO);

            // 회원 정보 업데이트 성공 시의 처리
            dispatch(setMember(updateResponse.data));
            alert('이메일이 성공적으로 수정되었습니다.');
            setEmail(member.email); // 이메일 초기값으로 설정
            setEmailAuthNum(''); // 인증번호 초기값으로 설정
            setIsEmailAuthNumReceived(false); // 인증번호 받은 여부 초기값으로 설정
            setIsEmailAuthNumCheck(false);
            emailToggleOpen(); // 모달 닫기
        } catch (error) {
            // 회원 정보 업데이트에 실패한 경우
            alert('이메일 수정에 실패했습니다.');
        }
    };

    //휴대폰 모달 취소
    const handleCellphoneCancel = () => {
        setCellphone(member.cellphone); // 휴대폰 번호 초기값으로 설정
        setAuthNum(''); // 인증번호 초기값으로 설정
        setIsAuthNumReceived(false); // 인증번호 받은 여부 초기값으로 설정
        setIsAuthNumCheck(false);
        cellphoneToggleOpen(); // 모달 닫기
    };

    //이메일 모달 취소
    const handleEmailCancel = () => {
        setEmail(member.email); // 휴대폰 번호 초기값으로 설정
        setEmailAuthNum(''); // 인증번호 초기값으로 설정
        setIsEmailAuthNumReceived(false); // 인증번호 받은 여부 초기값으로 설정
        setIsEmailAuthNumCheck(false);
        emailToggleOpen(); // 모달 닫기
    };

    //닉네임 모달 취소
    const handleNicknameCancel = () => {
        setNickname(member.nickname); // 닉네임 초기값으로 설정
        nicknameToggleOpen(); // 모달 닫기
    };

    //동네 변경 함수
    const handleUpdateDongNeBtnClick = async () => {
        try {
            const { latitude, longitude } = await getCurrentPosition();
            console.log('현재 위치:', latitude, longitude);
            setLatitude(latitude);
            setLongitude(longitude);

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

    //로그아웃
    const handleLogout = () => {
        // Redux의 member와 localStorage의 token을 초기화
        dispatch(memberLogout()); // 로그아웃 액션을 디스패치하여 Redux 상태 업데이트

        // localStorage의 token을 초기화 (실제 코드에 따라 다를 수 있음)
        removeToken();

        // 쿠키에서 access-token과 refresh-token을 제거
        ['Authorization', 'Refresh-Token', 'JSESSIONID'].forEach((token) => {
            document.cookie = `${token}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        // 로그아웃 후 필요한 추가 작업 수행
        navigate('/');
    };

    //회원목록조회
    const handleGetMemberList = () => {
        // 로그아웃 후 필요한 추가 작업 수행
        navigate('/getMemberList');
    };

    const dropdownMenus = [
        { label: '회원 목록 조회', onClick: handleGetMemberList },
        { label: '주문 내역 목록', onClick: '' },
        { label: '배달 내역 목록', onClick: '' },
        { label: '비활성화', onClick: '' },
        { label: '로그아웃', onClick: handleLogout },
        // 원하는 만큼 추가
    ];
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <TMenuBar>
                                <HeaderBack />
                                <p>내 프로필</p>
                                <TopDropdownMenu dropdownMenus={dropdownMenus} />
                            </TMenuBar>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={imageSrc || member.picture}
                                    alt="picture"
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                                    fluid
                                    onClick={() => imageInput.current.click()} // 클릭 시 input 엘리먼트 클릭 이벤트 호출
                                />
                                {/* 사진 업로드 */}
                                <input
                                    type="file"
                                    id="image-file"
                                    ref={imageInput}
                                    onChange={selectFile}
                                    accept="image/*"
                                    style={{ display: 'none' }} // 화면에 보이지 않도록 스타일 설정
                                />
                                {/* <button onClick={updateProfileImage}>프로필 이미지 업데이트</button> */}
                                <p className="text-muted mb-1 mt-2">
                                    {member.nickname}
                                    <b style={{ fontSize: '14px', color: 'black' }}>#{member.tag}</b>
                                    <MDBIcon
                                        far
                                        icon="edit"
                                        style={{ fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}
                                        onClick={nicknameToggleOpen}
                                    />
                                </p>
                                <p className="text-muted mb-2">
                                    {member.dongNe}
                                    <FaLocationDot
                                        onClick={handleUpdateDongNeBtnClick}
                                        style={{ fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}
                                    />
                                </p>
                                <p className="text-muted mb-1">나드리페이 잔액 : {member.nadeuliPayBalance}원</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn>충전</MDBBtn>
                                    <MDBBtn
                                        outline
                                        className="ms-1"
                                    >
                                        출금
                                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>
                                            Email{' '}
                                            <MDBIcon
                                                far
                                                icon="edit"
                                                style={{ fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}
                                                onClick={emailToggleOpen}
                                            />
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{member.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>
                                            Phone
                                            <MDBIcon
                                                far
                                                icon="edit"
                                                style={{ fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}
                                                onClick={cellphoneToggleOpen}
                                            />
                                        </MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{formattedPhoneNumber}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup
                                    flush
                                    className="rounded-3"
                                >
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fas
                                            icon="envelope"
                                        />
                                        <MDBCardText>{member.email}</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="github fa-lg"
                                            style={{ color: '#333333' }}
                                        />
                                        <MDBCardText>mdbootstrap</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="twitter fa-lg"
                                            style={{ color: '#55acee' }}
                                        />
                                        <MDBCardText>@mdbootstrap</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="instagram fa-lg"
                                            style={{ color: '#ac2bac' }}
                                        />
                                        <MDBCardText>mdbootstrap</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="facebook fa-lg"
                                            style={{ color: '#3b5998' }}
                                        />
                                        <MDBCardText>mdbootstrap</MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4">
                                            <span className="text-primary font-italic me-1">assigment</span> Project Status
                                        </MDBCardText>
                                        <MDBCardText
                                            className="mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Web Design
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={80}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Website Markup
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={72}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            One Page
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={89}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Mobile Template
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={55}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Backend API
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={66}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4">
                                            <span className="text-primary font-italic me-1">assigment</span> Project Status
                                        </MDBCardText>
                                        <MDBCardText
                                            className="mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Web Design
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={80}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Website Markup
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={72}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            One Page
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={89}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Mobile Template
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={55}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Backend API
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={66}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
                {/* 모달 모음 */}
                {/* 휴대폰 모달 */}
                <MDBModal
                    tabIndex="-1"
                    open={cellphoneModal}
                    setOpen={setCellphoneModal}
                    className="cellphoneModal"
                >
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>휴대폰 번호 수정</MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody style={{ width: '300px' }}>
                                <MDBInput
                                    value={cellphone}
                                    defaultValue={member.cellphone}
                                    onChange={(e) => {
                                        // 입력된 값에 숫자만 추가하여 설정
                                        const inputValue = e.target.value;
                                        const numericValue = inputValue.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 모두 제거
                                        setCellphone(numericValue);
                                    }}
                                    label="휴대폰 번호 (- 없이 숫자만 입력)"
                                    id="cellphone"
                                    type="text"
                                    maxLength={11}
                                    minLength={11}
                                    style={{ position: 'relative' }}
                                    disabled={isAuthNumReceived || isAuthNumCheck} // 인증번호를 받거나 확인한 경우 비활성화
                                >
                                    <MDBBtn
                                        outline
                                        className="ms-1"
                                        style={{ position: 'absolute', top: '0', right: '-65%' }}
                                        onClick={handleReceiveAuthNum}
                                        disabled={isAuthNumReceived || isAuthNumCheck} // 인증번호를 받거나 확인한 경우 비활성화
                                    >
                                        인증번호 받기
                                    </MDBBtn>
                                </MDBInput>
                                <MDBInput
                                    value={authNum}
                                    onChange={(e) => {
                                        // 입력된 값에 숫자만 추가하여 설정
                                        const inputValue = e.target.value;
                                        const numericValue = inputValue.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 모두 제거
                                        setAuthNum(numericValue);
                                    }}
                                    label="인증번호 숫자 5자리"
                                    id="cellphone"
                                    type="text"
                                    maxLength={5}
                                    style={{ marginTop: '20px', position: 'relative' }}
                                    disabled={!isAuthNumReceived || isAuthNumCheck} // 인증번호를 받지 않았거나 이미 확인한 경우 비활성화
                                >
                                    <MDBBtn
                                        outline
                                        className="ms-1"
                                        style={{ position: 'absolute', top: '0', right: '-65%' }}
                                        disabled={!isAuthNumReceived || isAuthNumCheck} // 인증번호를 받지 않았거나 이미 확인한 경우 비활성화
                                        onClick={handleCheckAuthNum}
                                    >
                                        인증번호 확인
                                    </MDBBtn>
                                </MDBInput>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn
                                    color="secondary"
                                    onClick={handleCellphoneCancel}
                                >
                                    취소
                                </MDBBtn>
                                <MDBBtn
                                    onClick={handleUpdateMember}
                                    disabled={!isAuthNumCheck} // 인증번호 확인 전에는 비활성화
                                >
                                    수정하기
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                {/* 이메일 모달 */}
                <MDBModal
                    tabIndex="-1"
                    open={emailModal}
                    setOpen={setEmailModal}
                    className="emailModal"
                >
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>이메일 수정</MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody style={{ width: '300px' }}>
                                <MDBInput
                                    value={email}
                                    defaultValue={member.email}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setEmail(inputValue);
                                    }}
                                    label="이메일 입력"
                                    id="email"
                                    type="text"
                                    style={{ position: 'relative' }}
                                    disabled={isEmailAuthNumReceived || isEmailAuthNumCheck} // 인증번호를 받거나 확인한 경우 비활성화
                                >
                                    <MDBBtn
                                        outline
                                        className="ms-1"
                                        style={{ position: 'absolute', top: '0', right: '-65%' }}
                                        onClick={handleReceiveEmailAuthNum}
                                        disabled={isEmailAuthNumReceived || isEmailAuthNumCheck} // 인증번호를 받거나 확인한 경우 비활성화
                                    >
                                        인증번호 받기
                                    </MDBBtn>
                                </MDBInput>
                                <MDBInput
                                    value={eamilAuthNum}
                                    onChange={(e) => {
                                        // 입력된 값에 숫자만 추가하여 설정
                                        const inputValue = e.target.value;
                                        const numericValue = inputValue.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 모두 제거
                                        setEmailAuthNum(numericValue);
                                    }}
                                    label="인증번호 숫자 5자리"
                                    id="email"
                                    type="text"
                                    maxLength={5}
                                    style={{ marginTop: '20px', position: 'relative' }}
                                    disabled={!isEmailAuthNumReceived || isEmailAuthNumCheck} // 인증번호를 받지 않았거나 이미 확인한 경우 비활성화
                                >
                                    <MDBBtn
                                        outline
                                        className="ms-1"
                                        style={{ position: 'absolute', top: '0', right: '-65%' }}
                                        disabled={!isEmailAuthNumReceived || isEmailAuthNumCheck} // 인증번호를 받지 않았거나 이미 확인한 경우 비활성화
                                        onClick={handleCheckEmailAuthNum}
                                    >
                                        인증번호 확인
                                    </MDBBtn>
                                </MDBInput>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn
                                    color="secondary"
                                    onClick={handleEmailCancel}
                                >
                                    취소
                                </MDBBtn>
                                <MDBBtn
                                    onClick={handleUpdateMemberEmail}
                                    disabled={!isEmailAuthNumCheck} // 인증번호 확인 전에는 비활성화
                                >
                                    수정하기
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                {/* 닉네임 모달 */}
                <MDBModal
                    tabIndex="-1"
                    open={nicknameModal}
                    setOpen={setNicknameModal}
                    className="nicknameModal"
                >
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>닉네임 수정</MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput
                                    value={nickname}
                                    defaultValue={member.nickname}
                                    onChange={(e) => {
                                        // 입력된 값에 숫자만 추가하여 설정
                                        const inputValue = e.target.value;
                                        const nicknameValue = inputValue.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
                                        setNickname(nicknameValue);
                                    }}
                                    label="한글, 영문 대/소문자, 숫자 6~12자리 입력"
                                    id="nickname"
                                    type="text"
                                    maxLength={12}
                                    minLength={6}
                                    style={{ position: 'relative' }}
                                ></MDBInput>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn
                                    color="secondary"
                                    onClick={handleNicknameCancel}
                                >
                                    취소
                                </MDBBtn>
                                <MDBBtn onClick={handleUpdateNickname}>수정하기</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                {/* 프로필사진 모달 */}
                <MDBModal
                    tabIndex="-1"
                    open={profileModal}
                    setOpen={setProfileModal}
                    className="profileModal"
                >
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Modal title</MDBModalTitle>
                                <MDBBtn
                                    className="btn-close"
                                    color="none"
                                    onClick={profileToggleOpen}
                                ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <p>
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                </p>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn
                                    color="secondary"
                                    onClick={profileToggleOpen}
                                >
                                    Close
                                </MDBBtn>
                                <MDBBtn>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </MDBContainer>
        </section>
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
        margin: 0;
    }
`;
