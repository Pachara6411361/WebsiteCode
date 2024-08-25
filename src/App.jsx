import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import HighlightedCarPage from "./pages/HighlightedCarPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {
  return (
    <HashRouter basename="/WebsiteProject/dist">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/highlighted-cars" element={<HighlightedCarPage />} />
      </Routes>
      <Footer />
     
    </HashRouter>
  );
}

export default App;
