import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImBackward } from "react-icons/im";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecipePage() {
  const [recipelist, setRecipelist] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const navigator = useNavigate();
  const Addeditem = useSelector((state) => state.AdditemReducer.additems);

  const Rid = localStorage.getItem("idMeal");

 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (Rid.length < 6) {
          const response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/search.php?s="
          );
          setRecipelist(response.data.meals);
        } else {
          setRecipelist(Addeditem);
        }
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    };

    fetchRecipes();
  }, [Rid, Addeditem]);

  useEffect(() => {
    if (recipelist.length > 0 && Rid) {
      const selectedRecipe = recipelist.find((recipe) => recipe.idMeal === Rid);
      setRecipe(selectedRecipe);
    }
  }, [recipelist, Rid]);

  function handelClick() {
    navigator("/");
  }

  return (
    <div>
      {recipe ? (
        <div>
          {" "}
          <div className="flex mt-10 ">
            <div
              className="text-4xl  ms-10 hover:scale-110 transition"
              onClick={handelClick}
            >
              <ImBackward />
            </div>
            <h1 className="text-4xl ms-10 md:ms-28">{recipe.strMeal}</h1>
          </div>
          <div className="grid lg:grid-cols-2  lg:mx-64 mt-7 ">
            <div className="md:col-span-1 row-span-1 object-cover m-auto">
              <img
                className="object-cover "
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
            </div>
            <div className="md:col-span-1 row-span-1 text-center pt-20">
              <h1 className="text-5xl">
                {" "}
                Ingredient required for {recipe.strMeal}
              </h1>
              <table className="border border-black w-10/12 text-center mx-10 md:mx-10 mt-10">
                <thead>
                  <tr className="text-2xl ">
                    <td className="p-4">Ingredients</td>
                    <td className="p-4">Mesurement</td>
                  </tr>
                </thead>
                <tbody className="text-xl">
                  <tr className="border border-black">
                    <td>{recipe.strIngredient1}</td>
                    <td>{recipe.strMeasure1}</td>
                  </tr>
                  <tr className="border border-black">
                    <td>{recipe.strIngredient2}</td>
                    <td>{recipe.strMeasure2}</td>
                  </tr>
                  <tr className="border border-black">
                    <td>{recipe.strIngredient3}</td>
                    <td>{recipe.strMeasure3}</td>
                  </tr>
                  <tr className="border border-black">
                    <td>{recipe.strIngredient4}</td>
                    <td>{recipe.strMeasure4}</td>
                  </tr>
                  <tr className="border border-black">
                    <td>{recipe.strIngredient5}</td>
                    <td>{recipe.strMeasure5}</td>
                  </tr>
                  {recipe.strIngredient6 && (
                    <tr className="border border-black">
                      <td>{recipe.strIngredient6}</td>
                      <td>{recipe.strMeasure6}</td>
                    </tr>
                  )}
                  {recipe.strIngredient7 && (
                    <tr className="border border-black">
                      <td>{recipe.strIngredient7}</td>
                      <td>{recipe.strMeasure7}</td>
                    </tr>
                  )}
                  {recipe.strIngredient8 && (
                    <tr className="border border-black">
                      <td>{recipe.strIngredient8}</td>
                      <td>{recipe.strMeasure8}</td>
                    </tr>
                  )}
                  {recipe.strIngredient9 && (
                    <tr className="border border-black">
                      <td>{recipe.strIngredient9}</td>
                      <td>{recipe.strMeasure9}</td>
                    </tr>
                  )}
                  {recipe.strIngredient10 && (
                    <tr>
                      <td>{recipe.strIngredient10}</td>
                      <td>{recipe.strMeasure10}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className=" mx-10 md:mx-64 space-y-4 mt-4 mb-20">
            <h1 className="text-3xl"> Process :-</h1>
            <p className="text-xl ">{recipe.strInstructions}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
