import React from "react";
import { Button } from "@/components/ui/button";
import DestinationCard from "./components/destination-card/DestinationCard.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Destination from "./pages/Destination.jsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import SetupProfile from "./pages/SetupProfile.jsx";
import Recommendation from "./pages/Recommendation.jsx";
import Home from "./pages/Home.jsx";
import DestinationDetail from "./pages/DestinationDetail.jsx";

function App() {
  return (
    // <>
    //   <Navbar />
    //   <div className="flex flex-col bg-neutral-bg items-center justify-center gap-5">
    //     <SearchBar />
    //     <Button size="custom">Custom Default</Button>
    //     <Button size="custom" variant="lite">
    //       Custom Lite
    //     </Button>
    //     <DestinationCard variant="col" />
    //     <DestinationCard variant="row" />
    //   </div>
    // </>
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
        <Route path="login" element={<LoginPage />} />
        <Route path="setup-profile" element={<SetupProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
