// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../util/api.js";


export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginApi(email, password);
      if (res.data && res.data.EC === 0 && res.data.accessToken) {
        const { accessToken, user } = res.data;

        // lưu localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        return { token: accessToken, user };
      }
      return rejectWithValue(res.data.EM || "Login error");
    } catch (err) {
      return rejectWithValue("Server error");
    }
  }
);


const initialState = {
  token: localStorage.getItem("accessToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isLoggedIn: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      state.token = localStorage.getItem("accessToken");
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    updateAccountType: (state, action) => {
      if (state.user) {
        state.user.accountType = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loadUserFromStorage,updateAccountType } = authSlice.actions;
export default authSlice.reducer;
