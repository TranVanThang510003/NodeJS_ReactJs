import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import Login from "./pages/Login.jsx";
import './index.css';
import MovieDetail from "./componets/movieDetail/MovieDetail.jsx";

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
                        path="/phim/tenphim"
                        element={
                            <AnimatedRoute>
                                <MovieDetail />
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
            </Routes>
        </BrowserRouter>
    );
}

