import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import HighlightedCarPage from "./pages/HighlightedCarPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/highlighted-cars" element={<HighlightedCarPage />} />
      </Routes>
      <Footer />
     
    </Router>
  );
}

export default App;
