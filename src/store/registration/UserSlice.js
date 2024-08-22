import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userData: [
   
  ],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
        const {fname,email,password}=action.payload
      const user = {
        id: nanoid(),
        fname:fname,
        email:email,
        password:password,
      };
      state.userData.push(user);
    },
    
    
  },
});

export const { addUser,} = UserSlice.actions;

export default UserSlice.reducer;
