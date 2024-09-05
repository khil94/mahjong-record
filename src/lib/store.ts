import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./features/theme/themeSlice";
import userReducer from "./features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
