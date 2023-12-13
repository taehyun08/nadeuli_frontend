import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../util/axios';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 게시물 등록
export const dongNePost = (formData, navigate) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_URL}/dongNe/addPost`, formData); // 헤더 제거

      console.log(res); 
      dispatch({ type: 'ADD_DONGNE_POST', payload: res.data });
      navigate('/dongNeHome');
    } catch (error) {
      if (error.response) {
        // 요청이 이루어졌으나 서버가 2xx 이외의 상태 코드로 응답
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어졌으나 응답을 받지 못함
        console.log(error.request);
      } else {
        // 요청을 만드는 중에 문제가 발생
        console.log('Error', error.message);
      }
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
export const GetDongNePostList= (currentPage, gu, searchKeyword) => {
  return async function (dispatch) {
    try {
      const res = await axiosInstance.get(`/dongNe/dongNeHome/${currentPage}?gu=${gu}&searchKeyword=${searchKeyword}`);
      dispatch(loadDongNePosts(res.data.dongNePosts));
      console.log(res.data.dongNePosts);
    } catch (error) {
      console.log(error);
    }
  };
};



const dongNePostSlice = createSlice({
  name: 'dongNePost',
  initialState: {
    dongNePostList: [],
    dongNePost: {
      postId: null,
      title: null,
      content: null,
      video: null,
      streaming: null,
      orikkiriName: null,
      orikkiriPicture: null,
      postCategory: null,
      gu: null,
      dongNe: null,
      timeAgo: null,
      writer: {
        tag: null,
        nickname: null,
      },
      orikkiri: {
        orikkiriId: null,
        orikkiriName: null,
        orikkiriPicture: null,
        masterTag: null,
      },
      images: [],
    },
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

export const { loadDongNePosts, addDongNePost, getLoadDongNePost, deleteDongNePost } = dongNePostSlice.actions;

export default dongNePostSlice.reducer;
