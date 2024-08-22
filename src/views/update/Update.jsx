import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, updateRecipe } from "../../store/registration/AdditemSlice";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const idMeal = localStorage.getItem("idMeal");
  // console.log( idMeal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.ActiveReducer.active);
  const recipe = useSelector((state) =>
    state.AdditemReducer.additems.find((item) => item.idMeal === idMeal)
  );
  // console.log(recipe);

  const active = status[status.length - 1]?.activestatus;

  useEffect(() => {
    if (!active) {
      navigate("/");
    }
  }, [active, navigate]);

  const formik = useFormik({
    initialValues: recipe || {
      strMeal: "",
      strMealThumb: "",
      strTags: "",
      strArea: "",
      strYoutube: "",
      strIngredient1: "",
      strIngredient2: "",
      strIngredient3: "",
      strIngredient4: "",
      strIngredient5: "",
      strIngredient6: "",
      strIngredient7: "",
      strIngredient8: "",
      strIngredient9: "",
      strIngredient10: "",
      strMeasure1: "",
      strMeasure2: "",
      strMeasure3: "",
      strMeasure4: "",
      strMeasure5: "",
      strMeasure6: "",
      strMeasure7: "",
      strMeasure8: "",
      strMeasure9: "",
      strMeasure10: "",
      strInstructions: "",
    },
    enableReinitialize: true, // This will reinitialize the form if the recipe data changes
    validationSchema: Yup.object({
      strMeal: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("* FOOD name Required"),
      strMealThumb: Yup.string().required("* Image is REQUIRED"),
      strTags: Yup.string().required("*category is REQUIRED"),
      strArea: Yup.string().required("*region is  REQUIRED"),
      strYoutube: Yup.string().required("*link is REQUIRED"),
      strInstructions: Yup.string().required("*required"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      if (idMeal) {
        // Updating existing recipe
        dispatch(updateRecipe({ idMeal, ...values }));
      } else {
        // Adding a new recipe
        dispatch(addRecipe(values));
      }
      navigate("/");
    },
  });

  return (
    <div className="dark:bg-black min-h-screen dark:text-white  bg-orange-200">
      <div className="min-w-full">
        <div>
          <Navbar />
        </div>
        <div className="text-3xl mt-6 mb-3 flex justify-center">
          <span className="text-4xl  text-orange-500 dark:text-white">
            <MdOutlineAddCircleOutline />
          </span>{" "}
          <div className="font-semibold text-orange-500 dark:text-white lobster-font">{idMeal ? "Update Food Item" : "Add Food Item"}</div>
        </div>
        <form
          className="border-4  max-w-full md:mx-32 mx-2 px-2 min-h-80 dark:text-black dark:border-white border-orange-500 text-orange-500 font-semibold rounded-lg"
          onSubmit={formik.handleSubmit}
        >
          <div className="md:flex justify-evenly my-7">
            <div className="md:w-5/12">
              <input
                type="text"
                placeholder="Name of Food "
                className="border-2  w-full  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                id="strMeal"
                name="strMeal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.strMeal}
              />{" "}
              {formik.touched.strMeal && formik.errors.strMeal ? (
                <div className="text-red-600 text-sm font-semibold">
                  {formik.errors.strMeal}
                </div>
              ) : null}
            </div>
            <div className="md:w-3/12">
              <input
                type="text"
                placeholder="Image URL of food "
                className="border-2 w-full  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                id="strMealThumb"
                name="strMealThumb"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.strMealThumb}
              />{" "}
              {formik.touched.strMealThumb && formik.errors.strMealThumb ? (
                <div className="text-red-600 text-sm font-semibold">
                  {formik.errors.strMealThumb}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex justify-evenly my-7">
            <div className="md:w-2/12">
              <input
                type="text"
                placeholder="Cetagory  "
                className="border-2 w-full  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                id="strTags"
                name="strTags"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.strTags}
              />{" "}
              {formik.touched.strTags && formik.errors.strTags ? (
                <div className="text-red-600 text-sm font-semibold">
                  {formik.errors.strTags}
                </div>
              ) : null}
            </div>
            <div className="md:w-2/12">
              <input
                type="text"
                placeholder="Region"
                className="border-2 w-full   py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                id="strArea"
                name="strArea"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.strArea}
              />
              {formik.touched.strArea && formik.errors.strArea ? (
                <div className="text-red-600 text-sm font-semibold">
                  {formik.errors.strArea}
                </div>
              ) : null}
            </div>
            <div className="md:w-4/12">
              <input
                type="text"
                placeholder="Video (YouTube link)"
                className="border-2 w-full  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                id="strYoutube"
                name="strYoutube"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.strYoutube}
              />
              {formik.touched.strYoutube && formik.errors.strYoutube ? (
                <div className="text-red-600 text-sm font-semibold">
                  {formik.errors.strYoutube}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex justify-evenly my-7">
            <div className="flex">
              <div className="md:w-8/12">
                <input
                  type="text"
                  className="border-2   py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 1"
                  id="strIngredient1"
                  name="strIngredient1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient1}
                />
                <br />
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 2"
                  id="strIngredient2"
                  name="strIngredient2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient2}
                />

                <br />
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 3"
                  id="strIngredient3"
                  name="strIngredient3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient3}
                />
                <br />
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 4"
                  id="strIngredient4"
                  name="strIngredient4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient4}
                />
                <br />
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 5"
                  id="strIngredient5"
                  name="strIngredient5"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient5}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="border-2 w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure1"
                  name="strMeasure1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure1}
                />
                <br />
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure2"
                  name="strMeasure2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure2}
                />
                <br />
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure3"
                  name="strMeasure3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure3}
                />
                <br />
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure4"
                  name="strMeasure4"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure4}
                />
                <br />
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure5"
                  name="strMeasure5"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure5}
                />
              </div>
            </div>
            <div className="flex">
              <div className=" md:w-8/12">
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 6"
                  id="strIngredient6"
                  name="strIngredient6"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient6}
                />
                <br />
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 7"
                  id="strIngredient7"
                  name="strIngredient7"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient7}
                />

                <br />
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 8"
                  id="strIngredient8"
                  name="strIngredient8"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient8}
                />
                <br />
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 9"
                  id="strIngredient9"
                  name="strIngredient9"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient9}
                />
                <br />
                <input
                  type="text"
                  className="border-2  py-2 px-4 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="Ingredient 10"
                  id="strIngredient10"
                  name="strIngredient10"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strIngredient10}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure6"
                  name="strMeasure6"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure6}
                />
                <br />
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure7"
                  name="strMeasure7"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure7}
                />
                <br />
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure8"
                  name="strMeasure8"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure8}
                />
                <br />
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white  dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure9"
                  name="strMeasure9"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure9}
                />
                <br />
                <input
                  type="text"
                  className="border-2  w-5/6 md:w-3/12 py-2 px-2 dark:bg-black text-lg dark:text-white  dark:border-white  border-orange-500 text-orange-500 font-semibold rounded-lg"
                  placeholder="qty"
                  id="strMeasure10"
                  name="strMeasure10"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strMeasure10}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center my-10 ">
            <textarea
              cols={10}
              rows={5}
              className="border-4 md:w-7/12 w-11/12 px-7 py-7 dark:bg-black text-lg dark:text-white dark:border-white border-orange-500 text-orange-500 font-semibold rounded-lg"
              placeholder="Steps to make the given food item............"
              id="strInstructions"
              name="strInstructions"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.strInstructions}
            ></textarea>
            {formik.touched.strInstructions && formik.errors.strInstructions ? (
              <div className="text-red-600 text-sm font-semibold">
                {formik.errors.strInstructions}
              </div>
            ) : null}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-orange-600 text-white dark:bg-white dark:text-black  flex items-center text-2xl px-4 py-2 rounded-lg hover:scale-105 transition my-10"
              type="submit"
            >
              <MdOutlineAddCircleOutline />
              Add item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
