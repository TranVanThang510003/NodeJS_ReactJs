// features/movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMoviesApi } from "../util/api.js";
import type {Movie} from "../types/movie"

type ApiError = { status?: number; message: string };

// thunk fetch new movies
export const fetchNewMovies = createAsyncThunk<
    Movie[],   //  fulfilled payload type: mảng phim
    void,      // argument type: không truyền gì khi dispatch
    { rejectValue: ApiError }
>(
    "movies/fetchNew",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getMoviesApi({
                sortBy: "latestEpisodeDate",
                sortOrder: "desc",
                limit: 10
            }) ;
            return res.data || [];
        } catch (err: any) {
            return rejectWithValue(err.response?.data || { message: "Lỗi fetch new movies" });
        }
    }
);


// thunk fetch popular movies
export const fetchPopularMovies = createAsyncThunk <
    Movie[],
    void,
    {rejectValue: ApiError}
    >
(
  "movies/fetchPopular",
  async (_, { rejectWithValue }) => {
    try {
        const res = await getMoviesApi({
            sortBy: "totalViews",
            sortOrder: "desc",
            limit: 10
        })
      return res.data || [];
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Lỗi fetch popular movies");
    }
  }
);

// thunk fetch top rated movies
export const fetchTopRatedMovies = createAsyncThunk<
    Movie[],
    void,
    {rejectValue: ApiError}
>(
  "movies/fetchTopRated",
  async (_, { rejectWithValue }) => {
    try {
        const res = await getMoviesApi({
            sortBy: "rating",
            sortOrder: "desc",
            limit: 10
        })

      return res.data|| []
    } catch (err: any) {

      return rejectWithValue(err.response?.data || "Lỗi fetch top rated movies");
    }
  }
);

// ================= State type =================
export interface MovieState {
    new: Movie[];
    popular: Movie[];
    topRated: Movie[];
    loading: boolean;
    error: ApiError | null;
}

const initialState: MovieState = {
    new: [],
    popular: [],
    topRated: [],
    loading: false,
    error: null,
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
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
        state.error = action.payload || { message: "Unknown error" };
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
        state.error = action.payload|| { message: "Unknown error" };
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
        state.error = action.payload|| { message: "Unknown error" };
      });
  },
});

export default movieSlice.reducer;
