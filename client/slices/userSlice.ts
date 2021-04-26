import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoginMutation } from "../generated/graphql";

const userSlice = createSlice({
  name: "user",
  initialState: null as LoginMutation["login"],
  reducers: {
    updateUserInfo: (state, { payload }: PayloadAction<LoginMutation["login"]>) => payload,
  },
});

export default userSlice;
