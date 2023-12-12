import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadDongNePosts } from '../redux/modules/dongNePost';

import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function DongNePostList() {
  const { currentPage, gu } = useParams();
  const dispatch = useDispatch();

  const dongNePostList = useSelector((state) => state.dongNePost.dongNePostList);
  const user = useSelector((state) => state.user);

  console.log(dongNePostList)

  React.useEffect(() => {
    dispatch(loadDongNePosts(currentPage, gu, ''));
  }, [currentPage, gu, dispatch]);

  const navigate = useNavigate();

  return (
    <div className="MainListBox">
      {dongNePostList &&
        dongNePostList.map((list, index) => (
          <div key={index}>
              <CardBox className="card">
                <div
                  style={{ display: "flex" }}
                  onClick={() => {
                    // navigate("/detail/" + list.postId+"/"+list.tradeState);
                  }}
                >
                  <Img src={list.postImg} />
                  <TextArea>
                    <span
                      style={{
                        fontSize: "15px",
                        marginBottom: "5px",
                        padding: "0 5px",

                        width: "200px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {list.title}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        padding: "5px",
                        color: "#AAAAAA",
                      }}
                    >
                      {list.userLocation}
                    </span>
                  </TextArea>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    width: "30px",
                    fontSize: "14px",
                  }}
                >
                  <BsHeart size="15" />
                  {list.likeNum}
                </div>
              </CardBox>
          </div>
        ))}

      <FixedButton>
        <FaPlus
          onClick={() => {
            navigate("/addDongNePost");
          }}
        />
      </FixedButton>
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
  width: 180px;
  padding: 10px;
`;

const FixedButton = styled.div`
  display: flex;
  position: fixed;
  bottom: 120px;
  right: 30px;
  width: 70px;
  height: 70px;
  font-size: 30px;
  background-color: ${(props) => props.theme.color.orange};
  color: ${(props) => props.theme.color.white};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 #999;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
`;

// const TradeState = styled.div`
//   margin-top: 5px;
//   display: flex;
//   align-items: center;
// `;

// const SoldOut = styled.div`
//   padding: 6px 5px;
//   width: 65px;
//   border-radius: 5px;
//   background-color: #565656;
//   color: white;
//   font-size: 12px;
//   text-align: center;
// `;

// const Book = styled(SoldOut)`
//   width: 55px;
//   background-color: #34bf9e;
// `;

export default DongNePostList;
