import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/user";
import chat from "../modules/chatSlice";

const store = configureStore({
  reducer: {
    user,
    chat,
  },
  devTools: false,
});

export default store;
