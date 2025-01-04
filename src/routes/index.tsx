import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PAGES } from "./constants";

import Home from "../pages/Home/Home";
import StaticPage from "../pages/StaticPage";
import NavBar from "../components/NavBar/NavBar";

const RouterConfig = () => {
  return (
    <Router>
      <NavBar pages={PAGES} />
      <main>
        <Routes>
          <Route path="/blog" element={<StaticPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
};

export default RouterConfig;
