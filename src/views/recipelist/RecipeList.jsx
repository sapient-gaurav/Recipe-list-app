import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../cards/Card";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import LocalCard from "../cards/LocalCard";

export default function RecipeList() {
  const [searchItem, setSearchItem] = useState("");
  const navigator = useNavigate();
  const status = useSelector((state) => state.ActiveReducer.active);

  const active = status[status.length - 1]?.activestatus;
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  useEffect(() => {
    if (active === undefined) {
      navigator("/registration");
    }
  }, [active, navigator]);
  const [recipelist, setRecipelist] = useState([]);
  const Addeditem = useSelector((state) => state.AdditemReducer.additems);
  // console.log(Addeditem);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(url+searchItem);
        setRecipelist(response.data.meals);
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    };

    fetchRecipes();
  }, [searchItem]);

  function handleClick() {
    console.log(searchItem);
  }

  return (
    <div className="dark:bg-black dark:text-white bg-orange-200">
      <Navbar />
      <div className="flex justify-center mt-4  ">
        <input
          className="w-9/12 border-2 bg-orange-100 border-orange-200  px-2 py-3 rounded-s-lg dark:bg-white dark:text-black"
          type="text"
          placeholder="Search food item....."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <button
          className="text-2xl flex justify-center items-center w-1/12 bg-orange-400 text-white rounded-e-lg dark:bg-slate-500"
          onClick={handleClick}
        >
          <FaSearch />
        </button>
      </div>

      {recipelist && Addeditem ? (
        <div className="grid md:grid-cols-3  sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 mt-3   ">
          {Addeditem.map((recipe, id) => (
            // <div>
            //   <li key={recipe.idMeal}>{recipe.strMeal}</li>
            //   <img src={recipe.strMealThumb} alt="" />
            // </div>
            <LocalCard recipe={recipe} id={id} key={recipe.id} />
          ))}
          {recipelist.map((recipe, id) => (
            // <div>
            //   <li key={recipe.idMeal}>{recipe.strMeal}</li>
            //   <img src={recipe.strMealThumb} alt="" />
            // </div>
            <Card recipe={recipe} id={id} key={recipe.id} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
