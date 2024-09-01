import { getUserData } from "@/api/firebase";
import { IUser } from "@/types/dataTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  console.log("fetcher has been called");
  const resp = await getUserData();
  return resp.docs.map((v) => v.data());
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // setUsers(state, action: PayloadAction<IUser[]>) {
    //   state.users = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

// export const { setUsers } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
