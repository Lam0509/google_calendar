import {createSlice} from "@reduxjs/toolkit";

let initialState = []

export const eventSlice = createSlice({
    name: 'event',
    initialState: initialState,
    reducers: {
        getAllEvents: (state, action) => {
            state = action.payload
            return state
        }
    }
})

export const eventActions = eventSlice.actions;
export default eventSlice;