import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  active: [
   {
    activestatus:undefined
   }
  ],
};

export const ActiveSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    addStatus: (state, action) => {
        const {activestatus}=action.payload
      const userStatus = {
        id: nanoid(),
        activestatus:activestatus
      };
      state.active.push(userStatus);
    },
    
    
  },
});

export const { addStatus} = ActiveSlice.actions;

export default ActiveSlice.reducer;
