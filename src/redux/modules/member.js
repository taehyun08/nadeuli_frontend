import { createSlice } from "@reduxjs/toolkit";
import { loadProfile } from "../../shared/axios";

// 회원의 상태를 관리하는 reducer
// 각 컴포넌트에서 reducer에 정의 된 함수를 호출하면된다.
// 각 컴포넌트에서는 dispathch를 통해 호출한다
/*
const dispatch = useDispatch()
<button onClick()={()=>{dispatch({type: 타입명})}}</button>
*/

export const carrotLoginStatus = (status) => {
  return async function (dispatch) {
    // dispatch(updateLogin(status));
  }
};

export const getCarrotUserInfo = () => {
  return async function (dispatch) {
    try {
      const response = await loadProfile();
      dispatch(setMember(response.data.user));
    } catch (err) {
      console.log(err);
    }
  }
}

export const getMember = (data) => {
  return async function (dispatch,getState) {
    try {
      console.log("data는",data)
      dispatch(setMember(data));
      const currentState = getState();
      console.log('get이후 Current state:', currentState);
    } catch (err) {
      console.log(err);
    }
  }
}

export const backupCarrotUserProfile = (data) => {
  return async function (dispatch) {
    try {
      // dispatch(backupUser(data));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}

//Reducer
//createSlice는 리듀서 함수와 액션 생성자를 함께 생성하는 유틸리티 함수 
const memberSlice = createSlice({
  // createSlice 함수에서 name 속성은 리듀서의 이름을 지정  
  // createSlice로 생성된 객체는 리듀서와 액션을 모두 포함하며 그 객체를 슬라이스 라고한다.
  // 슬라이스는 일종의 모듈화된 Redux 리듀서와 액션을 담고 있는 단위
  // 각각의 리듀서 함수는 reducers 객체 내에 정의된다

  //1. 슬라이스의 이름을 정의한다.
  name: "member",
  //2. 초기상태를 정의함으로써 현재상태를 set
  initialState: {
    tag: "ABs1",
    cellphone: "010-1111-1111",
    nickname: "독감환자",
    affinity: null,
    email: "guest@gmail.com",
    dongNe: "서울특별시 강서구 공항동",
    picture: "empty.jpg",
    nadeuliPayBalance: null, 
    isActivate: false,
    isNadeuliDelivery: false,
    role: null,
    gu: "강서구",
    bankName: "",
    bankAccountNum: "",
    blockReason: "",
    blockEnd: null,
    blockDay: null,
    socialId: "",
  },
  //3. 리듀서 함수의 첫 번째 매개변수 state는 현재의 상태를 나타내며, 
  //   두 번째 매개변수 action은 디스패치된 액션 객체
  reducers: {
    setMember: (state, action) => {
      const {
        nickname,
        tag,
        cellphone,
        affinity,
        email,
        dongNe,
        picture,
        nadeuliPayBalance,
        isActivate,
        isNadeuliDelivery,
        role,
        gu,
        bankName,
        bankAccountNum,
        blockReason,
        blockEnd,
        blockDay,
        socialId,
      } = action.payload;

      state.tag = tag;
      state.cellphone = cellphone;
      state.nickname = nickname;
      state.affinity = affinity;
      state.email = email;
      state.dongNe = dongNe;
      state.picture = picture;
      state.nadeuliPayBalance = nadeuliPayBalance;
      state.isActivate = isActivate;
      state.isNadeuliDelivery = isNadeuliDelivery;
      state.role = role;
      state.gu = gu;
      state.bankName = bankName;
      state.bankAccountNum = bankAccountNum;
      state.blockReason = blockReason;
      state.blockEnd = blockEnd;
      state.blockDay = blockDay;
      state.socialId = socialId;
    },
    updateLogin: (state, action) => {
      
    },
    backupUser: (state, action) => {
      const {
        nickname,
        userLocation,
        userImg,
      } = action.payload;

      if (nickname) {
        state.save.nickname = nickname;
      }
      if (userLocation) {
        state.save.userLocation = userLocation;
      }
      if (userImg) {
        state.save.userImg = userImg;
      }
    },
    resetSavedUser: (state, action) => {
      state.save.nickname = null;
      state.save.userLocation = null;
      state.save.userImg = null;
    },
  },
});

const { setMember } = memberSlice.actions;
export default memberSlice.reducer;