import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";

export interface UserProfile {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  image: string;
}

export const getCurrentUserProfile = createAsyncThunk("user/getCurrentProfile", async () => {
  try {
    const { data } = await _axios.get("/UserProfile/get-user-profiles");
    return (data.data?.[0] || null) as UserProfile | null;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const getUserProfiles = createAsyncThunk("user/getProfiles", async () => {
  try {
    const { data } = await _axios.get("/UserProfile/get-user-profiles", {
      params: { PageNumber: 1, PageSize: 100 },
    });
    return (data.data || []) as UserProfile[];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const deleteUser = createAsyncThunk("user/delete", async (id: string, { dispatch }) => {
  try {
    await _axios.delete("/UserProfile/delete-user", { params: { id } });
    dispatch(getUserProfiles());
    return id;
  } catch (error) {
    console.error(error);
  }
});

interface UserState {
  profile: UserProfile | null;
  users: UserProfile[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  profile: null,
  users: [],
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getCurrentUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getCurrentUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(getUserProfiles.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUserProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload || [];
      })
      .addCase(getUserProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      });
  },
});

export default userSlice.reducer;
