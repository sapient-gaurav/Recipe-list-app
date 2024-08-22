import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserSlice'
import AdditemReducer from "./AdditemSlice"
import ActiveReducer from "./ActiveSlice"

export const store = configureStore({
  reducer: { UserReducer,AdditemReducer,ActiveReducer },
});