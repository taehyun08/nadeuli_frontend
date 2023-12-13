import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetDongNePostList } from '../redux/modules/dongNePost';

import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function DongNePostList() {
  const gu = "성동구";
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  // 데이터 구조 변경에 따라 필드 수정
  const dongNePostList = useSelector((state) => state.dongNePost.dongNePostList);

  useEffect(() => {
    dispatch(GetDongNePostList(currentPage, gu, ''));
  }, [currentPage, gu, dispatch]);

  const navigate = useNavigate();

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("dongNePostList:", dongNePostList);

  return (
    <div className="DongNePostListBox">
      {dongNePostList.map((post) => (
          <div key={post.postId}>
            <CardBox className="card">
              <div
                style={{ display: "flex" }}
                onClick={() => {
                  // navigate("/detail/" + list.postId+"/"+list.tradeState);
                }}
              >
                <Img src={post.images[0]} alt="Post Image" />
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
                    {post.title}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "5px",
                      color: "#AAAAAA",
                    }}
                  >
                    {post.dongNe}
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
                {post.likeNum}
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

export default DongNePostList;
