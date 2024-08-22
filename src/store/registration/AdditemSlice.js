import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  additems: [], // Corrected the state name from userData to additems
};

export const AdditemSlice = createSlice({
  name: "additem",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const {
        strMeal,
        strMealThumb,
        strTags,
        strArea,
        strYoutube,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strInstructions,
      } = action.payload;

      const additem = {
        idMeal: nanoid(),
        strMeal,
        strMealThumb,
        strTags,
        strArea,
        strYoutube,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strInstructions,
      };

      state.additems.push(additem); // Corrected the push operation to add to the correct array
    },
    updateRecipe: (state, action) => {
      const {
        idMeal,
        strMeal,
        strMealThumb,
        strTags,
        strArea,
        strYoutube,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strInstructions,
      } = action.payload;
      const item = state.additems.find((additem) => additem.idMeal === idMeal);
      if (item) {
        item.strMeal = strMeal ?? item.strMeal;
        item.strMealThumb = strMealThumb ?? item.strMealThumb;
        item.strTags = strTags ?? item.strTags;
        item.strArea = strArea ?? item.strArea;
        item.strYoutube = strYoutube ?? item.strYoutube;
        item.strIngredient1 = strIngredient1 ?? item.strIngredient1;
        item.strIngredient2 = strIngredient2 ?? item.strIngredient2;
        item.strIngredient3 = strIngredient3 ?? item.strIngredient3;
        item.strIngredient4 = strIngredient4 ?? item.strIngredient4;
        item.strIngredient5 = strIngredient5 ?? item.strIngredient5;
        item.strIngredient6 = strIngredient6 ?? item.strIngredient6;
        item.strIngredient7 = strIngredient7 ?? item.strIngredient7;
        item.strIngredient8 = strIngredient8 ?? item.strIngredient8;
        item.strIngredient9 = strIngredient9 ?? item.strIngredient9;
        item.strIngredient10 = strIngredient10 ?? item.strIngredient10;
        item.strMeasure1 = strMeasure1 ?? item.strMeasure1;
        item.strMeasure2 = strMeasure2 ?? item.strMeasure2;
        item.strMeasure3 = strMeasure3 ?? item.strMeasure3;
        item.strMeasure4 = strMeasure4 ?? item.strMeasure4;
        item.strMeasure5 = strMeasure5 ?? item.strMeasure5;
        item.strMeasure6 = strMeasure6 ?? item.strMeasure6;
        item.strMeasure7 = strMeasure7 ?? item.strMeasure7;
        item.strMeasure8 = strMeasure8 ?? item.strMeasure8;
        item.strMeasure9 = strMeasure9 ?? item.strMeasure9;
        item.strMeasure10 = strMeasure10 ?? item.strMeasure10;
        item.strInstructions = strInstructions ?? item.strInstructions;
      }
    },
    deleteRecipe: (state, action) => {
      const{ idMeal} = action.payload;

      state.additems = state.additems.filter(
        (additem) => additem.idMeal !== idMeal
      );
    },
  },
});

export const { addRecipe, updateRecipe, deleteRecipe } = AdditemSlice.actions;

export default AdditemSlice.reducer;
