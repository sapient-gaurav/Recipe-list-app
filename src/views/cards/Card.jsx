import React from "react";
import { SiYoutubekids } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ recipe, id }) {
  const navigator = useNavigate();

  const status = useSelector((state) => state.ActiveReducer.active);
  // console.log(status[status.length - 1].activestatus);
  const active = status[status.length - 1].activestatus;

  function handelClick() {
    if (active) {
      localStorage.setItem("id", id);
      localStorage.setItem("idMeal", recipe.idMeal);
      navigator("/recipepage");
    } else {
      navigator("/");
    }
  }
  return (
    <div
      className="mx-3 my-4 col-span-1 hover:scale-105 transition duration-300 p-2 object-cover border-2 dark:border-white rounded-lg dark:bg-black dark:text-white shadow-2xl shadow-yellow-300 dark:shadow-gray-300 bg-orange-500"
      onClick={handelClick}
    >
      <div>
        <div>
          <img
            className="object-cover lg:h-[450px]"
            src={recipe.strMealThumb}
            alt=""
          />
        </div>

        <div className="text-2xl font-bold">{recipe.strMeal}</div>

        <div className="flex justify-between  matemasie-font">
          <div>{recipe.strArea} Dish</div>

          <div className="text-3xl text-red-700 mb-3 mx-4">
            <Link target="_blank" to={recipe.strYoutube}>
              <SiYoutubekids />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
