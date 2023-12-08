import styled from "styled-components";
import { IoIosClose, IoIosCamera } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "../shared/firebase";
import { carrotPost } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
// 이미지 업로드

function Add() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInput = useRef();
  const img_ref = useRef();
  const title_ref = useRef();
  const price_ref = useRef();
  const content_ref = useRef();
  const chk_ref = useRef();
  const [category, setCategory] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [enteredNum, setEnterdNum] = useState();
  const [price, setPrice] = useState(0);
  const post = useSelector((state) => state.post.postList)
  
  const location = useSelector((state) => state.user.userLocation);

  // const changeCategory = (e) => {
  //   setCategory(e.target.value);
  // };

  // useEffect(() => {
  //   if (price) {
  //     chk_ref.current.checked = true;
  //     chk_ref.current.disabled = false; // 비활성화
  //   } else {
  //     chk_ref.current.checked = false;
  //     chk_ref.current.disabled = true;
  //   }
  // }, [price]);

  // useEffect(() => {
  //   console.log(post)

  // },[post])

  // 파일 업로드
  // const selectFile = async (e) => {
  //   // const uploded_file = await uploadBytes(
  //   //   ref(storage, `images/${e.target.files[0].name}`),
  //   //   e.target.files[0] // 어떤 파일 저장 할건지
  //   // );

  //   // 스토리지로 url 다운로드
  //   const file_url = await getDownloadURL(uploded_file.ref);

  //   img_ref.current = { url: file_url };

  //   // 프리뷰
  //   const reader = new FileReader();
  //   const file = e.target.files[0];

  //   // 파일내용 읽어오기
  //   reader.readAsDataURL(file);

  //   //읽기가 끝나면 발생하는 이벤트 핸들러
  //   reader.onloadend = () => {
  //     //reader.result는 파일 내용물
  //     setImageSrc(reader.result);
  //   };
  // };

  // 금액 콤마(,) 찍기

  // const priceComma = (e) => {
  //   setPrice(e.target.value);
  //   let value = e.target.value;
  //   value = Number(value.replaceAll(",", ""));
  //   if (isNaN(value)) {
  //     //NaN인지 판별
  //     value = 0;
  //   } else {
  //     setEnterdNum(value.toLocaleString("ko-KR"));
  //   }
  // };

  // // 콤마제거
  // const commaRemovePrice = enteredNum?.replace(/,/g, ""); // g -> global
  // let numberPrice = parseInt(commaRemovePrice);
  //console.log(numberPrice);

  // const upload = () => {
  //   const newPost = {
  //     title: title_ref.current.value,
  //     postImg: img_ref.current.url,
  //     content: content_ref.current.value,
  //     category: category,
  //     price: numberPrice,
  //   };

  //   dispatch(carrotPost(newPost, navigate));
  // };

  return (
    <Wrap>
      <Header>
        <IoIosClose
          size="25"
          onClick={() => {
            navigate("/main");
          }}
        />
        <h4>중고거래 글쓰기</h4>
        {/* <h5 onClick={upload}>완료</h5> */}
      </Header>

      {/* 사진업로드 */}
      <Container>
        <File>
          <label htmlFor="file">
            <IoIosCamera className="camera" />
          </label>
          <input type="file" id="file" ref={fileInput} onChange={selectFile} />
          {imageSrc && <img src={imageSrc} alt="preview-img" />}
        </File>

        <div>
          <Title>
            <input placeholder="글 제목" ref={title_ref} />
          </Title>

          <Categorie>
            {/* <div>카테고리 선택</div> */}
            <select name="category" id="category" onChange={changeCategory}>
              <option value="none">카테고리 선택</option>
              <option value="디지털기기">디지털기기</option>
              <option value="생활가전">생활가전</option>
              <option value="가구&인테리어">가구/인테리어</option>
              <option value="유아동">유아동</option>
              <option value="생활&가공식품">생활/가공식품</option>
              <option value="유아도서">유아도서</option>
              <option value="스포츠/레저">스포츠/레저</option>
              <option value="여성패션">여성패션/잡화</option>
              <option value="남성패션">남성패션/잡화</option>
              <option value="게임&취미">게임/취미</option>
              <option value="뷰티&미용">뷰티/미용</option>
              <option value="반려동물용품">반려동물용품</option>
              <option value="도서&티켓&음반">도서/티켓/음반</option>
              <option value="기타">기타 중고물품</option>
              <option value="삽니다">삽니다</option>
            </select>
            {/* <IoIosArrowForward /> */}
          </Categorie>

          <Locate>
            <div>{location}</div>
            {/* <IoIosArrowForward /> */}
          </Locate>
        </div>

        <Price>
          <input
            type="text"
            placeholder="가격 [선택사항]"
            ref={price_ref}
            onChange={priceComma}
            value={enteredNum || ""}
          />
          <label htmlFor="price">
            <input type="checkbox" id="price" ref={chk_ref} />
            가격 제안받기
          </label>
        </Price>

        <textarea
          cols="40"
          rows="5"
          placeholder="올릴 게시글 내용을 작성해주세요. (가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
          ref={content_ref}
        />
      </Container>
    </Wrap>
  );
}
const Wrap = styled.div`
  box-sizing: border-box;
  font-size: 13px;

  input {
    font-size: 13px;
  }

  textarea {
    margin-top: 45px;
    border: none;
    outline: none;
    resize: none;
  }
  textarea::placeholder {
    color: #dadada;
    font-size: 13px;
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 15px;
  border-bottom: 1px solid #dadada;

  h4 {
    font-weight: 800;
  }
  h5 {
    color: #ff7e36;
  }
`;
const Container = styled.div`
  padding: 0 16px;
`;

const File = styled.div`
  padding: 30px 0px;
  border-bottom: 1px solid #dadada;

  .camera {
    font-size: 35px;
  }
  label {
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }

  img {
    width: 130px;
    height: 130px;
    margin-left: 10px;
    border-radius: 5px;
  }
`;

const Title = styled.div`
  padding: 20px 0px;
  border-bottom: 1px solid #dadada;

  outline: none;
  input {
    border: none;
    outline: none;
  }

  input::placeholder {
    color: #dadada;
  }
`;
const Categorie = styled(Title)`
  display: flex;
  justify-content: space-between;

  select {
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
  }
`;

const Locate = styled(Title)`
  display: flex;
  justify-content: space-between;
`;

const Price = styled(Title)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input[type="checkbox"] {
    accent-color: #ff7e36;
  }
`;

export default Add;
