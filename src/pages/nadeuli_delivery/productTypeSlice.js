// src/features/productType/productTypeSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const productTypeSlice = createSlice({
  name: "productType",
  initialState: {
    value: "", // 초기값은 빈 문자열 또는 null로 설정
  },
  reducers: {
    setProductType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProductType } = productTypeSlice.actions;

export default productTypeSlice.reducer;
