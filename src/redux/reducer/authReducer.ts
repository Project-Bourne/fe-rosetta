import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthStateProps {
  userInfo:  any;
  isLoggedIn: boolean;
  userAccessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthStateProps = {
  userInfo: null,
  isLoggedIn: false,
  userAccessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (
      state: any,
      action: PayloadAction<{ userInfo: any | null; isLoggedIn: boolean }>,
    ) => {
      state.userInfo = action?.payload;
      state.isLoggedIn = true;
    },
    setAccessToken: (state: any, action: PayloadAction<any>) => {
      const { accessToken, refreshToken } = action?.payload;
      state.userAccessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
    },
    setUpdatedData: (state: any, action: PayloadAction<any>) => {
      const { firstName, lastName, image } = action?.payload;
      if (firstName !== "" && firstName !== undefined) {
        state.userInfo.firstName = firstName;
      }
      if (lastName !== "" && lastName !== undefined) {
        state.userInfo.lastName = lastName;
      }
    if (image !== "" && image !== undefined) {
        state.userInfo.image = image;
      }
    },
    logout: (state: any) => {
      (state.userAcccessToken = null), (state.isLoggedIn = false);
    },
  },
});

export const { setUserInfo, setAccessToken, setUpdatedData, logout } =
  authSlice.actions;
export default authSlice.reducer;