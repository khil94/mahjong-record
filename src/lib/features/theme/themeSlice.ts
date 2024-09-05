import { ITheme } from "@/types/dataTypes";
import { createSlice } from "@reduxjs/toolkit";

export type IThemeState = {
  theme: ITheme;
};

const initialState = {
  theme: "light",
} as IThemeState;

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
