import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, {getState, rejectWithValue}) => {
        const token = getState().auth.token;

        try {
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    }
                });

            if(!response.ok) {
                if(response.status === 401) return rejectWithValue("Unauthorized");
                return rejectWithValue("Failed to fetch user profile");
            }

            const data = await response.json();
            return data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {

    },
    reducers: {

    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchUserProfile.pending, (state) => {

            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {

            })
            .addCase(fetchUserProfile.rejected, (state, action) => {

            })
    }
});

export default userSlice.reducer;