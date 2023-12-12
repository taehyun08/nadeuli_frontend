import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";
import post from "./modules/post";
import dongNePost from "./modules/dongNePost";

const store = configureStore({
  reducer: { user, post, dongNePost },
});

export default store;
