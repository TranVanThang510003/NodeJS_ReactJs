import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages/Layout";
import Register from "./pages/Register";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Register />} />
            <Route path="/register" element={<Register />} />

          </Route>
        </Routes>
      </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);