import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import GuestRoute from "./components/utils/GuestRoute.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";
import PageLoader from "./components/ui/PageLoader.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Destination = lazy(() => import("./pages/Destination.jsx"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail.jsx"));
const Recommendation = lazy(() => import("./pages/Recommendation.jsx"));
const LoginPage = lazy(() => import("./pages/Login.jsx"));
const RegisterPage = lazy(() => import("./pages/Register.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const AdminDestinations = lazy(
  () => import("./pages/Admin/AdminDestinations.jsx"),
);
const AdminList = lazy(() => import("./pages/Admin/AdminList.jsx"));
const AdminEdit = lazy(() => import("./pages/Admin/AdminEdit.jsx"));

function App() {
  return (
    <Suspense fallback={<PageLoader message="Loading page..." />}>
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="destinations" element={<Destination />} />
          <Route path="destinations/:slug" element={<DestinationDetail />} />
          <Route path="recommendations" element={<Recommendation />} />
          <Route
            path="admin/destinations"
            element={
              <ProtectedRoute requireAdmin>
                <AdminList />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/destinations/new"
            element={
              <ProtectedRoute requireSuperAdmin>
                <AdminDestinations />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/destinations/:uuid/edit"
            element={
              <ProtectedRoute requireSuperAdmin>
                <AdminEdit />
              </ProtectedRoute>
            }
          />
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

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
