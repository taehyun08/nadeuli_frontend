import React, { useState } from 'react';
import { MDBBtn, MDBTextArea, MDBContainer, MDBRow, MDBCol, MDBBreadcrumb } from 'mdb-react-ui-kit';
import HeaderBack from '../../components/HeaderBack';
import styled from 'styled-components';
import { addReport } from '../../util/memberAxios';
import { useSelector } from 'react-redux';
import { post } from '../../util/axios';
import { useParams } from 'react-router-dom';
export default function Report() {
    const [content, setContent] = useState('');
    const member = useSelector((state) => state.member);
    const { type, id } = useParams();

    const handleReport = async () => {
        try {
            const reportData = {
                content: `${content}\nURL: ${window.location.href}`,
                reporter: {
                    tag: member.tag,
                },
                post: type && type === 'post' ? { postId: id } : null,
                product: type && type === 'product' ? { productId: id } : null,
                nadeuliDelivery: type && type === 'nadeuliDelivery' ? { nadeuliDeliveryId: id } : null,
            };

            // Report 생성 서비스 함수 호출
            await addReport(reportData);

            // 신고 내용을 관리자에게 채팅으로 전송
            const reportMessage = `[${member.tag}] ${member.nickname}님이 신고했습니다: ${content}`;
            const chatReq = {
                tag: member.tag,
                nickname: member.nickname,
                roomId: '6588a39c2a0ac9acb5556e0b', // 해당 부분을 채팅방의 고유한 ID로 변경
                message: reportMessage,
            };
            await post('/api/chatRoom/sendMessage', chatReq);

            alert('신고 접수가 완료되었습니다.');
            // Report 생성 후 추가적인 처리나 화면 전환 등을 할 수 있음
        } catch (error) {
            console.error('Error creating report:', error);
            // 에러 처리
        }
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol>
                    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                        <TMenuBar>
                            <HeaderBack />
                            <p>신고</p>
                        </TMenuBar>
                    </MDBBreadcrumb>
                </MDBCol>
            </MDBRow>
            <p className="fw-bold mb-0">[신고] 아래 신고 사유를 입력해주세요.</p>
            <MDBTextArea
                wrapperClass="mb-2 mt-4"
                label="신고 사유"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <MDBBtn
                color="primary"
                block
                className="my-4"
                onClick={handleReport} // 신고 버튼 클릭 시 handleReport 함수 호출
            >
                신고하기
            </MDBBtn>
        </MDBContainer>
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
