import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import StaticPage from "../pages/StaticPage";
import NavBar from "../components/NavBar/NavBar";

const RouterConfig = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/blog" element={<StaticPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
