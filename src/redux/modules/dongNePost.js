import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../util/axios';

// 게시물 등록
export const dongNePost = (newDongNePost, navigate) => {
  return async function (dispatch) {
    try {
      const requestBody = {
        gu: "성동구",
        dongNe: "송정동",
        writer: {
          tag: "W4z7",
          nickname: "엄준식",
        },
        postCategory: 1,
        title: "우리끼리2 게시물1",
        content: "되면 진짜 내손에 장을 지진다",
        orikkiriName: "우리끼리2",
        orikkiriPicture: "우리끼리2 프로필사진.png",
        orikkiri: {
          orikkiriId: 2,
        },
        images: ["우리끼리사진1.png", "우리끼리사진2.png"],
      };

      const res = await axiosInstance.post('/dongNe/addPost', requestBody);
      console.log(res); // 실제 응답은 콘솔에 찍힐 것입니다.
      dispatch(addDongNePost(newDongNePost));
      navigate('/main');
    } catch (err) {
      console.log(err);
    }
  };
};


// 동네나드리 게시물 상세 조회
export const GetDongNePost = (postId) => {
  return async function (dispatch) {
    await axiosInstance
      .get(`/dongNe/getPost/${postId}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getLoadDongNePost(res.data.detailPost));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


// 동네나드리 홈 포스트 리드
export const loadDongNeHomePosts = (currentPage, gu, searchKeyword) => {
  return async function (dispatch) {
    try {
      const response = await axiosInstance.get(`/dongNe/dongNeHome/${currentPage}?gu=${gu}&searchKeyword=${searchKeyword}`);
      dispatch(loadDongNePosts(response.data.dongNePosts));
      console.log(response.data.dongNePosts)
    } catch (err) {
      console.log(err);
    }
  };
};







const dongNePostSlice = createSlice({
  name: 'dongNePost',
  initialState: {
    dongNePostList: [],
    dongNePost: {},
  },
  reducers: {
    addDongNePost: (state, action) => {
      // action.payload로 새로운 게시물을 추가할 수 있음
      state.dongNePostList.push(action.payload);
    },
    loadDongNePosts: (state, action) => {
      // action.payload를 통해 서버로부터 받은 게시물 목록을 저장할 수 있음
      state.dongNePostList = action.payload;
    },
    getLoadDongNePost: (state, action) => {
      state.dongNePost = action.payload;
    },
    deleteDongNePost: (state, action) => {
      // action.payload로 특정 게시물을 삭제할 수 있음
      state.dongNePostList = state.dongNePostList.filter((post) => post.id !== action.payload);
    },
  },
});

export const { loadDongNePosts, addDongNePost, getLoadDongNePost, deleteDongNePost, likeDongNePost } = dongNePostSlice.actions;

export default dongNePostSlice.reducer;
