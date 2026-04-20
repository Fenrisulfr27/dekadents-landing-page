import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import RulesPage from "./pages/RulesPage";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </LanguageProvider>
    </HelmetProvider>
  );
}
