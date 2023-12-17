import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MDBBadge, MDBListGroup, MDBListGroupItem, MDBContainer, MDBNavbar, MDBBtn, MDBInputGroup } from 'mdb-react-ui-kit';
import TopArrowLeft from '../../components/TopArrowLeft';
import HeaderBack from '../../components/HeaderBack';
import { getMemberList } from '../../shared/axios';
import { useInView } from 'react-intersection-observer';

export default function GetMemberList() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchkeyword] = useState('');

    const [ref, inView] = useInView();

    // 서버에서 아이템을 가지고 오는 함수
    const getItems = useCallback(async () => {
        const searchDTO = {
            searchKeyword: searchKeyword,
            currentPage: page,
        };

        setLoading(true);
        const response = await getMemberList(searchDTO);
        console.log(response.data);

        // 서버 응답 결과가 빈 배열이 아닌 경우에만 setItems 호출
        if (response.data.length > 0) {
            setItems((prevItems) => [...prevItems, ...response.data]);
        }

        setLoading(false);
    }, [page, searchKeyword]);

    // `getItems` 가 바뀔 때 마다 함수 실행
    useEffect(() => {
        getItems();
    }, [getItems]);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage((prevState) => prevState + 1);
        }
    }, [inView, loading]);

    return (
        <div>
            <MDBNavbar
                light
                bgColor="light"
            >
                <MDBContainer fluid>
                    <HeaderBack />
                    <MDBInputGroup
                        tag="form"
                        className="d-flex w-auto mb-3"
                    >
                        <input
                            className="form-control"
                            placeholder="Type query"
                            aria-label="Search"
                            type="Search"
                            value={searchKeyword}
                            onChange={(e) => setSearchkeyword(e.target.value)}
                        />
                        <MDBBtn outline>
                            <i className="fas fa-magnifying-glass"></i>
                        </MDBBtn>
                    </MDBInputGroup>
                </MDBContainer>
            </MDBNavbar>
            <MDBListGroup
                style={{ minWidth: '22rem' }}
                light
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`list-item ${items.length - 1 === index ? 'last-item' : ''}`}
                        ref={index === items.length - 1 ? ref : null}
                    >
                        <MDBListGroupItem className="relative d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img
                                    src={item.picture}
                                    alt={`Profile ${index}`}
                                    style={{ width: '45px', height: '45px' }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-0">{item.nickname}</p>
                                    <p className="text-muted mb-0">{item.email}</p>
                                    <p className="text-muted mb-0">친화력 {item.affinity}점</p>
                                    <p className="text-muted mb-0">정지일수 {item.blockDay}일</p>
                                    <p className="text-muted mb-0">정지기간 {item.blockEnd}</p>
                                    <p className="text-muted mb-0">정지사유 {item.blockReason}</p>
                                </div>
                                <MDBBtn className="position-absolute top-50 end-0 translate-middle-y">충전</MDBBtn>
                            </div>
                        </MDBListGroupItem>
                    </div>
                ))}
            </MDBListGroup>
        </div>
    );
}
