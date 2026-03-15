import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TechnologyPage from "./pages/TechnologyPage";
import ResearchPage from "./pages/ResearchPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
