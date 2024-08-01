import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [
    {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addSignupUser: (state, action) => {
      let signupUser = { data: action.payload };
      state.user.push(signupUser);
    },
  },
});
export const { addSignupUser } = userSlice.actions;
export default userSlice.reducer;
