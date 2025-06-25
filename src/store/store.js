import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    //Add postSlice which will make your code clean and smooth website(compulsary)
  },
});

export default store;
