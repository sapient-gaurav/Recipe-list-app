import { useEffect, useState } from "react";
import "./App.css";
import Additem from "./views/additem/Additem";
import Login from "./views/login/Login";
import RecipeList from "./views/recipelist/RecipeList";
import RecipePage from "./views/RecipePage/RecipePage";
import Resigration from "./views/regitsration/Resigration";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Update from "./views/update/Update";

function App() {
  const [Active, setActive] = useState(false);

  useEffect(() => {
    const isActive = localStorage.getItem("Active");
    setActive(isActive);
  }, [Active]);

  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Resigration />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipepage" element={<RecipePage />} />
        <Route path="/Additem" element={<Additem />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
