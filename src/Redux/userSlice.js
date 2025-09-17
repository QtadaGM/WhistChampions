import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    login: false,
    favProducts: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setFavProducts: (state, action) => {
      state.favProducts = action.payload;
    },
  },
});

export const { setLogin, setFavProducts } = userSlice.actions;
export default userSlice.reducer;