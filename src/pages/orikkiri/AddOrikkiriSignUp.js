import React, { useEffect, useRef, useState } from 'react';
import HeaderBack from '../../components/HeaderBack';
import styled from 'styled-components';
import { MDBBreadcrumb, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBTextArea, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOrikkiri = (props) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [ansQuestions, setAnsQuestions] = useState([]);
    const [answers, setAnswers] = useState([]); // 입력된 값을 저장할 상태
    const { orikkiriId } = props;
    const member = useSelector((state) => state.member);

    //질문 가져오는 함수
    useEffect(() => {
        const fetchAnsQuestions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/orikkiriManage/getAnsQuestionList/47`);
                // const response = await axios.get(`${BASE_URL}/orikkiriManage/getAnsQuestionList/${orikkiriId}`);
                setAnsQuestions(response.data);
            } catch (error) {
                console.error('Error fetching ansQuestions:', error);
            }
        };

        fetchAnsQuestions();
    }, [orikkiriId]);

    // 답변 값 저장
    const handleAnswerChange = (e, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    };
    // 가입 신청 버튼 클릭 시 처리
    const handleaddOrikkiriSignUp = async () => {
        try {
            // answers 배열에 있는 값들을 서버로 전송 또는 다른 로직 수행
            console.log('Answers:', answers);

            // 멤버, 오리끼리, 답변들을 갖는 DTO 객체 생성
            const oriSchMemChatFavDTO = {
                member: {
                    tag: member.tag,
                },
                orikkiri: {
                    orikkiriId: 47, // prop으로 처리해야함
                },
                ansQuestions: ansQuestions.map((question) => ({ ansQuestionId: question.ansQuestionId })),
            };
            console.log(oriSchMemChatFavDTO);
            // 서버로 DTO 객체를 전송하고, 반환된 ori_sche_mem_chat_fav_id 저장
            const response = await axios.post(`${BASE_URL}/orikkiri/addOrikkrirSignUp`, oriSchMemChatFavDTO);
            const oriScheMemChatFavId = response.data.oriScheMemChatFavId;

            // 추가로직: 작성한 답변을 등록하려면 아래와 같이 수행
            await Promise.all(
                answers.map(async (answer, index) => {
                    console.log(oriScheMemChatFavId);
                    const ansQuestionDTO = {
                        content: answer,
                        orikkiri: { orikkiriId: 47 }, //prop으로 처리해야함
                        oriScheMemChatFav: {
                            oriScheMemChatFavId: oriScheMemChatFavId,
                        },
                    };

                    // 작성한 답변을 서버에 등록
                    await axios.post(`${BASE_URL}/orikkiriManage/addAns`, ansQuestionDTO);
                })
            );

            navigate('/dongNeHome');
            // 추가적인 로직 또는 리다이렉션 등을 수행할 수 있음
        } catch (error) {
            console.error('Error creating orikkiri:', error);
        }
    };
    return (
        <section style={{ backgroundColor: '#eee', height: '100vh' }}>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <TMenuBar>
                                <HeaderBack />
                                <p>우리끼리 가입 신청</p>
                            </TMenuBar>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBTypography
                                    variant="h4"
                                    className="mb-3"
                                    style={{ textAlign: 'left' }}
                                >
                                    <span class="badge badge-primary p-1">우리끼리 이름</span>
                                </MDBTypography>
                                <MDBTypography
                                    tag="h6"
                                    className="p-1"
                                    style={{ textAlign: 'left' }}
                                >
                                    [우리끼리 이름]에 가입신청을 위한 아래 질문에 답해주세요.
                                    <br />
                                    <p
                                        className="mt-2"
                                        style={{ fontSize: '14px' }}
                                    >
                                        <strong>방장이 해당 신청을 승인하면 우리끼리에 가입됩니다.</strong>
                                    </p>
                                </MDBTypography>
                                <br />
                                {ansQuestions.map((question, index) => (
                                    <div key={index}>
                                        <MDBTypography
                                            tag="strong"
                                            style={{ textAlign: 'left', display: 'block', marginTop: '20px' }}
                                        >{`질문 ${index + 1}: ${question.content}`}</MDBTypography>
                                        <MDBTextArea
                                            value={answers[index] || ''} // 상태에서 값을 가져옴
                                            onChange={(e) => handleAnswerChange(e, index)}
                                        />
                                    </div>
                                ))}
                                <MDBBtn
                                    className="mt-5"
                                    onClick={handleaddOrikkiriSignUp}
                                >
                                    가입 신청
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default AddOrikkiri;
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
