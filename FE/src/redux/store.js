
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import favoriteReducer from "../features/favoriteSlice";
import authReducer from "../features/authSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    favorite: favoriteReducer,
    auth: authReducer,

  },
});
