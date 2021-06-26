import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { document } from "reduxboot/global/datatype";

type fetchState = {
    status: "loading" | "idle",
    err: string | null,
    data: document,
}

const initialState = {
    status: "idle",
    err: null,
    data: {}
} as fetchState

const documentSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {}
})

const { reducer, actions } = documentSlice
export const { } = actions
export default reducer
