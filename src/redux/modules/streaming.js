import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../util/axios';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 스트리밍 채널 생성
export const CreateliveChannel= (formData, navigate) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_URL}/dongNe/addStreaming`, formData); // 헤더 제거
      console.log(res.data); 
      dispatch(addChannel(res.data));
    } catch (err) {
      console.log(err);
      }
    }
  };

// 스트리밍 채널 조회
export const GetChannelDetail = (channelId) => {
  return async function (dispatch) {
    try {
      const res = await axiosInstance.get(`/dongNe/getStreaming/${channelId}`);
      console.log(res.data);
      dispatch(getChannel(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// 스트리밍 채널 삭제
export const removeChannel = (postId, navigate) => {
  return async function (dispatch) {
    console.log('동네 게시물 삭제 실행 중');
    await axios.get(`${BASE_URL}/dongNe/deletePost/${postId}`)
      .then((res) => {
        dispatch(deleteChannel(res.data));
        navigate("/dongNeHome");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


// // 동네 게시물 삭제
// export const removeDongNePost = (postId, navigate) => {
//   return async function (dispatch) {
//     console.log('동네 게시물 삭제 실행 중');
//     await axios.get(`${BASE_URL}/dongNe/deletePost/${postId}`)
//       .then((res) => {
//         dispatch(deleteDongNePost(res.data));
//         navigate("/dongNeHome");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// 리덕스슬라이스
const liveChannelSlice = createSlice({
  name: 'channel',
  initialState: {
    channelList: [],
    channel: {},
  },
  reducers: {
    addChannel: (state, action) => {
      // action.payload로 새로운 게시물을 추가할 수 있음
      state.channelList.push(action.payload);
    },
    getChannelList: (state, action) => {
      // action.payload를 통해 서버로부터 받은 게시물 목록을 저장할 수 있음
      state.channelList = action.payload;
    },
    getChannel: (state, action) => {
      state.channel = action.payload;
    },
    deleteChannel: (state, action) => {
      // action.payload로 특정 게시물을 삭제할 수 있음
      state.channelList = state.streamingList.filter((channel) => channel.id !== action.payload);
    },
  },
});

export const { addChannel, getChannelList, getChannel, deleteChannel} = liveChannelSlice.actions;

export default liveChannelSlice.reducer;
