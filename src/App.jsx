import React from "react";
import Destination from "./pages/Destination.jsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Recommendation from "./pages/Recommendation.jsx";
import Home from "./pages/Home.jsx";
import DestinationDetail from "./pages/DestinationDetail.jsx";
import RegisterPage from "./pages/Register.jsx";
import GuestRoute from "./components/utils/GuestRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="destinations" element={<Destination />} />
        <Route path="destinations/:slug" element={<DestinationDetail />} />
        <Route path="recommendations" element={<Recommendation />} />
      </Route>

      {/* Auth Layout */}
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
