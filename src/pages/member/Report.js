import React from 'react';
import { MDBBtn, MDBTextArea, MDBContainer, MDBRow, MDBCol, MDBBreadcrumb } from 'mdb-react-ui-kit';
import HeaderBack from '../../components/HeaderBack';
import styled from 'styled-components';
export default function Report() {
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
            />

            <MDBBtn
                color="primary"
                block
                className="my-4"
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
