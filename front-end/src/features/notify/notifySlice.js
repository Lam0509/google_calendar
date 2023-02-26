import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    number: 0,
    waitingEvents: []
}

export const notifySlice = createSlice({
    name: 'notify',
    initialState: initialState,
    reducers: {
        addNotify(state, action) {
            state.number = state.number + 1;
            state.waitingEvents = [...state.waitingEvents, action.payload]
            return state
        },
        acceptNotify(state, action) {
            state.number = state.number - 1
            state.waitingEvents = state.waitingEvents.filter((item) => item.title !== action.payload)
            return state
        },
        declineNotify(state, action) {
            state.number = state.number - 1
            state.waitingEvents = state.waitingEvents.filter((item) => item.title !== action.payload)
            return state
        }
    }
})

export const notifyActions = notifySlice.actions;
export default notifySlice;