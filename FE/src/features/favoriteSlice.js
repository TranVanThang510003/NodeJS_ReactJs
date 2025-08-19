// favoriteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFavoritesApi, addFavoriteApi, deleteFavoriteApi } from "../util/api";

// thunk để load danh sách favorites
export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getFavoritesApi();
      return res.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || "Lỗi fetch favorites");
    }
  }
);

// thunk để toggle
export const toggleFavorite = createAsyncThunk(
  "favorite/toggleFavorite",
  async (movieId, { getState, rejectWithValue }) => {
    const state = getState().favorite;
    const isFav = state.items.some(
      (f) => String(f.movieId || f._id) === String(movieId)
    );
    try {
      if (isFav) {
        const res = await deleteFavoriteApi({ movieId });
        if (res.success) return { type: "remove", movieId };
      } else {
        const res = await addFavoriteApi({ movieId });
        if (res.success) return { type: "add", movieId };
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Lỗi toggle favorite");
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // toggle favorite
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (action.payload.type === "add") {
          state.items.push({ movieId: action.payload.movieId });
        } else if (action.payload.type === "remove") {
          state.items = state.items.filter(
            (f) => String(f.movieId || f._id) !== String(action.payload.movieId)
          );
        }
      });
  },
});

export default favoriteSlice.reducer;
