import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/index";

import PricingPage from "./pages/pricing";
import AboutPage from "./pages/about";
import ResumeBuilderPage from "./pages/resume";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ResumeBuilderPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      {/* <Route element={<BlogPage />} path="/blog" /> */}
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
