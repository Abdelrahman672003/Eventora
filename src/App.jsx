import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import { useEffect } from "react";

function App() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
