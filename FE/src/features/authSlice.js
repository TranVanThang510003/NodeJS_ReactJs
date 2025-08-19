// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, } from "../util/api";

// --- thunk login ---
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginApi(credentials);
      // backend trả về token + user
      const { token, user } = res.data;

      // lưu vào localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Đăng nhập thất bại");
    }
  }
);

// // --- thunk getProfile (nếu cần load từ token) ---
// export const fetchProfile = createAsyncThunk(
//   "auth/fetchProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await getProfileApi();
//       return res.data; // trả về user info
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Không lấy được profile");
//     }
//   }
// );

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
    // Trường hợp cần load lại state từ localStorage (khi F5)
    loadUserFromStorage: (state) => {
      state.token = localStorage.getItem("accessToken");
      state.user = JSON.parse(localStorage.getItem("user"));
    },
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
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // .addCase(fetchProfile.fulfilled, (state, action) => {
      //   state.user = action.payload;
      //   localStorage.setItem("user", JSON.stringify(action.payload));
      // })
      // .addCase(fetchProfile.rejected, (state, action) => {
      //   state.error = action.payload;
      // });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
