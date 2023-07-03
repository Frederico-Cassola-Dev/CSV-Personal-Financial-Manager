import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import List from "./pages/List";
import Uploads from "./pages/Uploads";

import "./styles.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/transactions" element={<List />} />
            <Route path="/uploads" element={<Uploads />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
