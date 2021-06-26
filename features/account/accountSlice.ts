import { createSlice } from "@reduxjs/toolkit";
import { user } from "reduxboot/global/datatype";

type fetchState = {
    status: "loading" | "idle",
    err: string | null,
    data: user,
}

const initialState = {
    status: "idle",
    err: null,
    data: {}
} as fetchState

const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {}
})

const { reducer, actions } = accountSlice
export const { } = actions
export default reducer