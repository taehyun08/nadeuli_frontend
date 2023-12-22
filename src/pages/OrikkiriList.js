import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { allOrikkiriList } from '../redux/modules/orikkiri';
import '../style/css/postInfo.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function OrikkiriList() {
  const memberDongNe = useSelector((state) => state.member.dongNe);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(allOrikkiriList(memberDongNe));
  }, [dispatch]);


  const OrikkiriList = useSelector((state) => state.orikkiri.orikkiriList);

  const filteredOrikkiriList = OrikkiriList.filter(orikkiri => orikkiri.dongNe === memberDongNe);

  return (
    <div className="MainListBox">
      {filteredOrikkiriList.map((orikkiri, index) => {
        const hasPicture = orikkiri.orikkiriPicture;
        return (
          <div key={orikkiri.orikkiriId || index}>
            <CardBox className="card" onClick={() => navigate("/orikkiriHome/" + orikkiri.orikkiriId)}>
              {hasPicture && <Img src={orikkiri?.orikkiriPicture} alt="Orikkiri Image" />}
              <TextArea>
                <span>
                  {orikkiri.orikkiriName}
                </span>
              </TextArea>
              <div>
                {orikkiri.orikkiriIntroduction}
              </div>
            </CardBox>
          </div>
        );
      })}
    </div>
  );
}

const CardBox = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
`;

export default OrikkiriList;
