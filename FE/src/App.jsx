import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";
import Register from "./componets/auth/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import Login from "./componets/auth/Login.jsx";
import './index.css';
import MovieDetail from "./componets/movieDetail/MovieDetail.jsx";
import CreateMovieForm from "./componets/Admin/MovieManagement/CreateMovieForm.jsx";
import AdminLayout from "./AdminLayout.jsx";
import MovieList from "./componets/Admin/MovieManagement/MovieList.jsx";
import EpisodeList from "./componets/Admin/MovieManagement/EpisodeList.jsx";
import FilterPage from './pages/FilterPage.jsx'
const AnimatedRoute = ({ children }) => {
    const location = useLocation();

    return (
        <div
            className={`route-animation ${location.state?.isExiting ? 'route-animation-exit' : ''}`}
            style={{ position: 'relative' }}
            key={location.pathname}
        >
            {children}
        </div>
    );
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <AnimatedRoute>
                                <HomePage />
                            </AnimatedRoute>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <AnimatedRoute>
                                <UserPage />
                            </AnimatedRoute>
                        }
                    />
                    <Route
                        path="/phim/:movieId"
                        element={
                            <AnimatedRoute>
                                <MovieDetail />
                            </AnimatedRoute>
                        }
                    />
                    <Route path="/filter"
                           element={
                             <AnimatedRoute>
                               <FilterPage />
                             </AnimatedRoute>
                    }
                    />

                </Route>
                <Route
                    path="/register"
                    element={
                        <AnimatedRoute>
                            <Register />
                        </AnimatedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <AnimatedRoute>
                            <Login />
                        </AnimatedRoute>
                    }
                />

                <Route path="/dashboard" element={<AdminLayout />}>
                    <Route
                        path="create-movie"
                        element={
                            <AnimatedRoute>
                                <CreateMovieForm/>
                            </AnimatedRoute>
                        }
                    />

                    <Route
                        path="movies"
                        element={
                            <AnimatedRoute>
                                <MovieList/>
                            </AnimatedRoute>
                        }
                    />
                    <Route
                        path="movies/:movieId"
                        element={
                            <AnimatedRoute>
                                <EpisodeList/>
                            </AnimatedRoute>
                        }
                    />
                </Route>

            </Routes>

        </BrowserRouter>
    );
}

