
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import favoriteReducer from "../features/favoriteSlice";
import authReducer from "../features/authSlice";
import movieReducer from "../features/movieSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    favorite: favoriteReducer,
    auth: authReducer,
    movie: movieReducer,

  },
  devTools: process.env.NODE_ENV !== "production",
});
