// features/movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMoviesApi } from "../util/api.js";

// thunk fetch new movies
export const fetchNewMovies = createAsyncThunk(
  "movies/fetchNew",
  async (_, { rejectWithValue }) => {
    try {
      return await getMoviesApi({ sortBy: "latestEpisodeDate", sortOrder: "desc", limit: 10 });
    } catch (err) {
      return rejectWithValue(err.response?.data || "Lỗi fetch new movies");
    }
  }
);

// thunk fetch popular movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (_, { rejectWithValue }) => {
    try {
      return await getMoviesApi({ sortBy: "totalViews", sortOrder: "desc", limit: 10 });
    } catch (err) {
      return rejectWithValue(err.response?.data || "Lỗi fetch popular movies");
    }
  }
);

// thunk fetch top rated movies
export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRated",
  async (_, { rejectWithValue }) => {
    try {
      return await getMoviesApi({ sortBy: "averageRating", sortOrder: "desc", limit: 10 });
    } catch (err) {
      return rejectWithValue(err.response?.data || "Lỗi fetch top rated movies");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    new: [],
    popular: [],
    topRated: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // New Movies
    builder
      .addCase(fetchNewMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.new = action.payload;
      })
      .addCase(fetchNewMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Popular Movies
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Top Rated Movies
    builder
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topRated = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
