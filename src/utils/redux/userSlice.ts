import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  fullName: string | null;
  email: string | null;
  profession: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  fullName: null,
  email: null,
  profession: null,
  isLoggedIn: false,
};

const userDetails = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<{ fName: string|null; email: string|null; profession: string|null; isLoggedIn: boolean }>) => {
      console.log(action);
      state.fullName = action.payload.fName;
      state.email = action.payload.email;
      state.profession = action.payload.profession;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logOutUser: (state) => {
      state.fullName = null;
      state.email = null;
      state.profession = null;
    },
  },
});

// Export actions
export const { setUserDetails, logOutUser } = userDetails.actions;

// Export reducer
export default userDetails.reducer;
