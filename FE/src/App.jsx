
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";
import Register from "./componets/auth/Register.jsx";
import HomePage from "./pages/Client/HomePage.tsx";
import UserPage from "./pages/Admin/UserPage.jsx";
import Login from "./componets/auth/Login.jsx";
import './index.css';
import MovieDetail from "./componets/MovieDetail/MovieDetail.tsx";
import AdminLayout from "./AdminLayout.jsx";
import EpisodeList from "./componets/Admin/MovieManagement/EpisodeList.jsx";
import FilterPage from './pages/Client/FilterPage.jsx'
import FavoritePage from './pages/Client/FavoritePage.jsx'
import UserProfile from './pages/Client/UserProfile.jsx'
import MovieManagementPage from './pages/Admin/MovieManagementPage.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'
import CreateMoviePage from './pages/Admin/CreateMoviePage.jsx'
import UserTable from './componets/Admin/UserManagement/UserTable.jsx'
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
                    <Route path="/favorite-list"
                           element={
                             <AnimatedRoute>
                               <FavoritePage />
                             </AnimatedRoute>
                           }
                    />
                    <Route
                      path="/user/me"
                      element={
                        <AnimatedRoute>
                          <UserProfile />
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

                <Route path="/admin" element={<AdminLayout />}>
                    <Route
                      path="dashboard"
                      element={
                        <AnimatedRoute>
                          <Dashboard/>
                        </AnimatedRoute>
                      }
                    />
                  <Route
                    path="test"
                    element={
                      <AnimatedRoute>
                        <UserTable/>
                      </AnimatedRoute>
                    }
                  />
                  <Route
                      path="users"
                      element={
                        <AnimatedRoute>
                          <UserPage />
                        </AnimatedRoute>
                      }
                    />
                    <Route
                        path="movies/create-movie"
                        element={
                            <AnimatedRoute>
                                <CreateMoviePage/>
                            </AnimatedRoute>
                        }
                    />

                    <Route
                        path="movies"
                        element={
                            <AnimatedRoute>
                                <MovieManagementPage/>
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
    );
}

