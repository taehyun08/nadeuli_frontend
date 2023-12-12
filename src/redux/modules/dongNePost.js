import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../util/axios';

// 게시물 등록
// export const dongNePost = (newDongNePost, navigate) => {
//   return async function (dispatch) {
//     try {
//       const requestBody = {
//         gu: newDongNePost.gu,
//         category: newDongNePost.category,
//         title: newDongNePost.title,
//         content: newDongNePost.content,
//         writer: {
//           tag: "Bss3",
//           nickname: "엄준식"
//         }
//         // postImg: img_ref.current.url,
//         // postVideo: video_ref.current.url
//       };

//       const res = await axiosInstance.post('/dongNe/addPost', requestBody);
//       console.log(res); 
//       dispatch({ type: 'ADD_DONGNE_POST', payload: res.data });
//       navigate('/main');
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// 게시물 등록
export const dongNePost = (newDongNePost, navigate, imgFile, videoFile) => {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append('gu', newDongNePost.gu);
      formData.append('category', newDongNePost.category);
      formData.append('title', newDongNePost.title);
      formData.append('content', newDongNePost.content);
      formData.append('writer[tag]', 'Bss3');
      formData.append('writer[nickname]', '엄준식');
      formData.append('postImg', imgFile);
      formData.append('postVideo', videoFile);
      
      const res = await axiosInstance.post('/dongNe/addPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res); 
      dispatch({ type: 'ADD_DONGNE_POST', payload: res.data });
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

export const { loadDongNePosts, addDongNePost, getLoadDongNePost, deleteDongNePost } = dongNePostSlice.actions;

export default dongNePostSlice.reducer;
