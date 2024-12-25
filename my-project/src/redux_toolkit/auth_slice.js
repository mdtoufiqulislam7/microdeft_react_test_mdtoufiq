import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "https://react-interview.crd4lc.easypanel.host";

const initialState = {
    status: 'idle', 
    token: localStorage.getItem('token') || null, 
    error: null,
};

// Register user
export const registeruser = createAsyncThunk('user/register', async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${base_url}/api/register`, { name, email, password });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.detail || "Register Failed");
    }
});

// Login user
export const loginuser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${base_url}/api/login`, { email, password });
        console.log("Login response:", response.data); 
        return response.data.data.token; 
    } catch (error) {
        if (!error.response) {
            throw error; 
        }
        return rejectWithValue(error.response.data.message || 'Failed to login');
    }
});

const authslice = createSlice({
    name: 'authslice',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('token'); 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registeruser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(registeruser.fulfilled, (state) => {
            state.status = 'succeeded';
            state.error = null;
        })
        .addCase(registeruser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error;
        })
        .addCase(loginuser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginuser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload; 
            localStorage.setItem('token', action.payload); 
            console.log("Token stored in Redux and localStorage:", action.payload); 
            state.error = null;
        })
        .addCase(loginuser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; 
        });
    }
});

export const { logout } = authslice.actions;
export default authslice.reducer;
