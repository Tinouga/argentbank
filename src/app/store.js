import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

const rootReducer = (state, action) => {
    // Letting reducers process the action first - notably auth/logout where we need to clear the token
    const newState = appReducer(state,action);

    if(action.type === 'auth/logout') {
        return {
            ...newState,
            auth: undefined,
            user: undefined,
        };
    }
    return newState;
}

export default configureStore({
    reducer: rootReducer
});
