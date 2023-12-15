import React, { useState } from 'react';
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
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPosition } from '../../util/Location';
import HeaderBack from '../../components/HeaderBack';
import styled from 'styled-components';

export default function ProfilePage() {
    //useState
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.member);

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

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <TMenuBar>
                                <HeaderBack />
                                <p>내 프로필 수정</p>
                            </TMenuBar>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={member.picture}
                                    alt="picture"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid
                                />
                                <p className="text-muted mb-1">Full Stack Developer</p>
                                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn>Follow</MDBBtn>
                                    <MDBBtn
                                        outline
                                        className="ms-1"
                                    >
                                        Message
                                    </MDBBtn>
                                </div>
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
                                            icon="globe fa-lg text-warning"
                                        />
                                        <MDBCardText>https://mdbootstrap.com</MDBCardText>
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
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">example@example.com</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Mobile</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
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
    }
`;