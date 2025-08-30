import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getFavoritesApi, addFavoriteApi, deleteFavoriteApi } from "../util/api";

// Định nghĩa type cho Favorite
export interface Favorite {
  movieId?: string;
  _id?: string;
}

// State type
export interface FavoriteState {
  items: Favorite[];
  loading: boolean;
  error: null | { status?: number; message?: string };
}

const initialState: FavoriteState = {
  items: [],
  loading: false,
  error: null,
};

// thunk để load danh sách favorites
export const fetchFavorites = createAsyncThunk<Favorite[], void, { rejectValue: { status?: number; message: string } }>(
  "favorite/fetchFavorites",
    async (_, { rejectWithValue }) => {
      try {
        const res = await getFavoritesApi();
        return res.data.data || [];
      } catch (err: any) {
        return rejectWithValue({
          status: err.response?.status,
          message: err.response?.data || "Lỗi fetch favorites",
        });
      }
    }
);

// thunk để toggle
export const toggleFavorite = createAsyncThunk<
    { type: "add" | "remove"; movieId: string },
  string,
  { state: { favorite: FavoriteState }; rejectValue: { status?: number; message: string } }
>(
  "favorite/toggleFavorite",
    async (movieId, { getState, rejectWithValue }) => {
      const state = getState().favorite;
      const isFav = state.items.some(
        (f) => String(f.movieId || f._id) === String(movieId)
      );

      try {
        if (isFav) {
          const res:any = await deleteFavoriteApi({ movieId }) ;
          if (res.data.success) return { type: "remove", movieId };

        } else {
          const res:any = await addFavoriteApi({ movieId });
          if (res.data.success) return { type: "add", movieId };
        }
        throw new Error("API không trả về success");
      } catch (err: any) {
        return rejectWithValue({
          status: err.response?.status,
          message: err.response?.data || "Lỗi toggle favorite",
        });
      }
    }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Favorite[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
        if (action.payload?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
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
