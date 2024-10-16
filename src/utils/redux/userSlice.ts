import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  fullName: string | null;
  email: string | null;
  profileImage: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  fullName: null,
  email: null,
  profileImage: null,
  isLoggedIn: false,
};

const userDetails = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<{ fName: string; email: string; profileImage: string; isLoggedIn: boolean }>) => {
      console.log(action);
      debugger
      state.fullName = action.payload.fName;
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logOutUser: (state) => {
      state.fullName = null;
      state.email = null;
      state.profileImage = null;
    },
  },
});

// Export actions
export const { setUserDetails, logOutUser } = userDetails.actions;

// Export reducer
export default userDetails.reducer;
