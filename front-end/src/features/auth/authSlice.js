import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    isLoggedIn: false,
    currentUser: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.isLoggedIn = true;
            state.currentUser = action.payload
            return state
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;