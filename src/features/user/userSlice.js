import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, {getState, rejectWithValue}) => {
        const token = getState().auth.token;

        try {
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 400) return rejectWithValue("Invalid fields.");
                if (response.status === 500) return rejectWithValue("Internal Server Error. Please try again later.");
                return rejectWithValue("An error occurred. Please try again later.");
            }

            const {body: {id, email, firstName, lastName}} = await response.json();
            return {id, email, firstName, lastName};
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({firstName, lastName}, {getState, rejectWithValue}) => {
        const token = getState().auth.token;

        try {
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({firstName, lastName})
            });

            if (!response.ok) {
                if (response.status === 400) return rejectWithValue("Invalid fields.");
                if (response.status === 500) return rejectWithValue("Internal Server Error. Please try again later.");
                return rejectWithValue("An error occurred. Please try again later.");
            }

            const {body} = await response.json();
            return {firstName: body.firstName, lastName: body.lastName};
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

const initialState = {
    user: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchUserProfile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // updateUserProfile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {...state.user, ...action.payload};
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export { initialState as userInitialState };
export default userSlice.reducer;
