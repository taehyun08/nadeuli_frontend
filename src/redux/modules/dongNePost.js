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
export const GetDongNePostDetail = (postId) => {
  return async function (dispatch) {
    try {
      const res = await axiosInstance.get(`/dongNe/getPost/${postId}`);
      console.log(res.data);
      dispatch(getLoadDongNePost(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};


// 동네나드리 홈 포스트 리드
export const GetDongNePostList= (currentPage, gu, searchKeyword) => {
  return async function (dispatch) {
    try {
      const res = await axiosInstance.get(`/dongNe/dongNeHome/${currentPage}?gu=${gu}&searchKeyword=${searchKeyword}`);
      dispatch(loadDongNePosts(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
      const {
      postId,
      title,
      content,
      video,
      streaming,
      orikkiriId,
      orikkiriName,
      orikkiriPicture,
      postCategory,
      gu,
      dongNe,
      timeAgo,
      writer:{
        tag,
        picture,
        nickname,
        dongNe: writerDongNe
      },
      images
      } = action.payload;

      state.dongNePost.postId = postId;
      state.dongNePost.title = title;
      state.dongNePost.content = content;
      state.dongNePost.video = video;
      state.dongNePost.streaming = streaming;
      state.dongNePost.orikkiriId = orikkiriId;
      state.dongNePost.orikkiriName = orikkiriName;
      state.dongNePost.orikkiriPicture = orikkiriPicture;
      state.dongNePost.postCategory = postCategory;
      state.dongNePost.gu = gu;
      state.dongNePost.dongNe = dongNe;
      state.dongNePost.timeAgo = timeAgo;
      state.dongNePost.writerTag = tag;
      state.dongNePost.writerPicture = picture;
      state.dongNePost.writerNickname = nickname;
      state.dongNePost.writerDongNe = writerDongNe;
      state.dongNePost.images = images;
    },
    deleteDongNePost: (state, action) => {
      // action.payload로 특정 게시물을 삭제할 수 있음
      state.dongNePostList = state.dongNePostList.filter((post) => post.id !== action.payload);
    },
  },
});

export const { loadDongNePosts, addDongNePost, getLoadDongNePost, deleteDongNePost } = dongNePostSlice.actions;

export default dongNePostSlice.reducer;
