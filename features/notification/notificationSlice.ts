import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "reduxboot/global/datatype";

type fetchState = {
    status: "loading" | "idle",
    err: string | null,
    data: notification,
}

const initialState = {
    status: "idle",
    err: null,
    data: {}
} as fetchState

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        readNotification: (state, action: PayloadAction<string>) => {
            state.data[action.payload].read = true
        },
    }
})

const { reducer, actions } = notificationSlice
export const { readNotification } = actions
export default reducer
