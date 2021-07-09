import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type fetchState = {
    status: "loading" | "idle",
    err: string | null,
    data: {
        [_id: string]: {
            link: string,
            name: string,
            owner: string,
            score: string,
            updated: Date,
        }
    },
}

const initialState = {
    status: "idle",
    err: null,
    data: {}
} as fetchState

const FileList = createSlice({
    name: 'files',
    initialState: initialState,
    reducers: {},
})

const { reducer, actions } = FileList
export const { } = actions
export default reducer
