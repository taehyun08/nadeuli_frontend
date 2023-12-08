import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";
import post from "./modules/post";

const store = configureStore({
  reducer: { user, post },
});

export default store;
