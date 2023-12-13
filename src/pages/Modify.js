import styled from "styled-components";
import { IoIosClose, IoIosCamera } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "../shared/firebase";
// import { modyfyPost } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
// 이미지 업로드

function Modify(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  const postId = param.postid;
  console.log(postId)
  const fileInput = useRef();
  const img_ref = useRef();
  const title_ref = useRef();
  const price_ref = useRef();
  const content_ref = useRef();
  const [category, setCategory] = useState();
  const [imageSrc, setImageSrc] = useState(); // 프리뷰
  const [enteredNum, setEnterdNum] = useState();

  const location = useSelector((state) => state.user.userLocation);

  const changeCategory = (e) => { setCategory(e.target.value);};

  //파일처리
  // const selectFile = async (e) => {
  //   const uploded_file = await uploadBytes(
  //     ref(storage, `images/${e.target.files[0].name}`), e.target.files[0]);
  //   const file_url = await getDownloadURL(uploded_file.ref);
  //   img_ref.current = { url: file_url };
  //   const reader = new FileReader();
  //   const file = e.target.files[0];
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => { setImageSrc(reader.result); };
  // };

  // 가격표 콤마
  const priceComma = (e) => {
    let value = e.target.value;
    value = Number(value.replaceAll(",", ""));
    if (isNaN(value)) { value = 0;} 
    else { setEnterdNum(value.toLocaleString("ko-KR"));}
  };
  const commaRemovePrice = enteredNum?.replace(/,/g, "");
  let numberPrice = parseInt(commaRemovePrice);

  // 디스패치 업로드 
  const upload = () => {
    const newPost = {
      title: title_ref.current.value,
      postImg: img_ref.current.url,
      content: content_ref.current.value,
      category: category,
      price: numberPrice,
      postId : postId
    };
    // dispatch(modyfyPost(newPost, navigate));
  };

  return (
    <Wrap>
      <Header>
        <IoIosClose size="25" onClick={() => { navigate("/main"); }}/>
            <h4>수정하기</h4>
            <h5 onClick={upload}>완료</h5>
      </Header>

      {/* 사진업로드 */}
      <Container>
        <File> <label htmlFor="file">
            <IoIosCamera className="camera" />
          </label>
          {/* <input type="file" id="file" ref={fileInput} onChange={selectFile} /> */}
          {imageSrc && <img src={imageSrc} alt="preview-img" />}
        </File>

        <div>
          <Title>
            <input placeholder="글 제목" ref={title_ref} />
          </Title>

          <Categorie>
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
          </Categorie>

          <Locate> <div>{location}</div> </Locate>
        </div>

        <Price>
          <input type="text" placeholder="가격 [선택사항]"
            ref={price_ref}
            onChange={priceComma}
            value={enteredNum || ""} />
          <label htmlFor="price">
            <input type="radio" id="price" />
            가격 제안받기
          </label>
        </Price>

        <textarea cols="40" rows="5"
          placeholder="올릴 게시글 내용을 작성해주세요. (가품 및 판매금지품목은 게시가 제한될
          수 있어요.)"
          ref={content_ref} />
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
`;

export default Modify;
