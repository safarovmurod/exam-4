import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios, saveToken, removeToken } from "../token/token";

export interface LoginPayload {
  userName: string;
  password: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export const loginUser = createAsyncThunk("auth/login", async (payload: LoginPayload) => {
  try {
    const { data } = await _axios.post("/Account/login", payload);
    saveToken(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const registerUser = createAsyncThunk("auth/register", async (payload: RegisterPayload) => {
  try {
    const { data } = await _axios.post("/Account/register", payload);
    return data;
  } catch (error) {
    console.error(error);
  }
});

interface AuthState {
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      removeToken();
      state.error = "";
    },
    clearError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ ҳангоми воридшавӣ";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ ҳангоми сабти ном";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
