import {createSlice} from "@reduxjs/toolkit";

let initialState = []

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        getOtherUsers: (state, action) => {
            state = action.payload
            return state
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;