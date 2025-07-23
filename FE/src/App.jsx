import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages/Layout";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import Layout from "./Layout.jsx";
import  Login from "./pages/Login.jsx";
import './index.css'
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/user" element={<UserPage />} />
          </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}
