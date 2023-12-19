import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../util/axios';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 게시물 댓글 생성
export const postComment = (formData, navigate) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_URL}/dongNe/addComment`, formData); // 헤더 제거

      console.log(res); 
      dispatch(addComment(formData));
      // navigate('/dongNeHome');
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

// 게시물 댓글 리드
export const GetDongNeCommentList= (postId) => {
  return async function (dispatch) {
    try {
      const res = await axiosInstance.get(`/dongNe/getCommentList/${postId}`);
      dispatch(loadComments(res.data));
      console.log(res.data);
      console.log("getCommentList:" + postId)
    } catch (error) {
      console.log(error);
    }
  };
};

// 게시물 댓글 수정
export const modifyDongNeComment = (formData, navigate) => {
  return async function (dispatch) {
    try {
      const res = await axios.orikkiri(`${BASE_URL}/dongNe/updateComment`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res)
      dispatch(updateComment(formData));
    navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeDongNeComment = (postId, navigate) => {
  return async function (dispatch) {
    console.log('동네 게시물 삭제 실행 중');
    await axios.get(`/dongNe/deletePost/${postId}`)
      .then((res) => {
        dispatch(deleteComment(res.data));
        navigate("/dongNeHome");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


// 리덕스슬라이스
const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    commentList: [],
    comment: {},
  },
  reducers: {
    addComment: (state, action) => {
      // action.payload로 새로운 댓글을 추가할 수 있음
      state.commentList.push(action.payload);
    },
    loadComments: (state, action) => {
      // action.payload를 통해 서버로부터 받은 댓글 목록을 저장할 수 있음
      state.commentList = action.payload;
    },
    getLoadComment: (state, action) => {
      state.comment = action.payload;
    },
    updateComment: (state, action) => {
      state.comment = action.payload;
    },
    deleteComment: (state, action) => {
      // action.payload로 특정 댓글을 삭제할 수 있음
      state.commentList = state.commentList.filter((comment) => comment.id !== action.payload);
    },
  },
});

export const { addComment, loadComments,  getLoadComment, updateComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
