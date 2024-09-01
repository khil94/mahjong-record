import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice";

export const userStore = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type UserRootState = ReturnType<typeof userStore.getState>;
export type UserAppDispatch = typeof userStore.dispatch;

export default userStore;
