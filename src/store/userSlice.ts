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

export interface UpdateUserProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob?: string;
  imageFile?: File | null;
}

function getUserIdFromToken(): string {
  const token = localStorage.getItem("token");
  if (!token) return "";
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    return payload.sid || payload.nameid || payload.sub || payload.id || "";
  } catch {
    return "";
  }
}

export const getUserProfile = createAsyncThunk("User/getProfile", async (id?: string) => {
  try {
    const targetId = id || getUserIdFromToken();
    if (!targetId) return null;
    const { data } = await _axios.get("/UserProfile/get-user-profile-by-id", {
      params: { id: targetId },
    });
    return data.data as UserProfile;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateUserProfile = createAsyncThunk(
  "User/updateProfile",
  async (payload: UpdateUserProfilePayload, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("FirstName", payload.firstName || "");
      formData.append("LastName", payload.lastName || "");
      formData.append("Email", payload.email || "");
      formData.append("PhoneNumber", payload.phoneNumber || "");
      formData.append("Dob", payload.dob || "2000-01-01");

      if (payload.imageFile) {
        formData.append("Image", payload.imageFile, payload.imageFile.name || "avatar.jpg");
      } else {
        const dummyBytes = new Uint8Array([
          137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1,
          0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 10, 73, 68, 65, 84,
          120, 156, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10, 45, 180, 0, 0, 0, 0, 73, 69,
          78, 68, 174, 66, 96, 130,
        ]);
        formData.append("Image", new Blob([dummyBytes], { type: "image/png" }), "avatar.png");
      }

      await _axios.put("/UserProfile/update-user-profile", formData);
      dispatch(getUserProfile());
      return true;
    } catch (error: any) {
      console.error(error);
      const serverMsg =
        error?.response?.data?.errors?.[0] || error?.message || "error";
      return rejectWithValue(serverMsg);
    }
  }
);

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string;
  successMessage: string;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  isSaving: false,
  error: "",
  successMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserStatus: (state) => {
      state.error = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "error";
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.isSaving = true;
      state.error = "";
      state.successMessage = "";
    });
    builder.addCase(updateUserProfile.fulfilled, (state) => {
      state.isSaving = false;
      state.successMessage = "Маълумоти профил бомуваффақият сабт шуд!";
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isSaving = false;
      state.error = (action.payload as string) || action.error.message || "error";
    });
  },
});

export const { clearUserStatus } = userSlice.actions;
export default userSlice.reducer;
