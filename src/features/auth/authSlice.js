import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// helper function to set the token in the localStorage
const setToken = (token, rememberMe) => {
    if(rememberMe) {
        localStorage.setItem('token', token);
    } else {
        sessionStorage.setItem('token', token);
    }
};

// helper function to clear the token
const clearToken = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

export const login = createAsyncThunk(
    'auth/login',
    async({email, password, rememberMe}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if(!response.ok) {
                if(response.status === 400) return rejectWithValue("Invalid email or password");
                if(response.status === 500) return rejectWithValue("Internal Server Error. Please try again later.");
                return rejectWithValue("An error occurred. Please try again later.");
            }

            const data = await response.json();
            setToken(data.token, rememberMe);
            return { token: data.token, user: data.user };
        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: !!localStorage.getItem("token") || !!sessionStorage.getItem("token"),
        user: null,
        token: localStorage.getItem("token") || sessionStorage.getItem("token"),
        loading: false,
        error: null
    },
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            clearToken();
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
