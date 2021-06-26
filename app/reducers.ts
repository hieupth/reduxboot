import { combineReducers } from "@reduxjs/toolkit";
import accountSlice from '../features/account/accountSlice'
import notificationSlice from '../features/notification/notificationSlice'
import documentSlice from '../features/documents/documentSlice'
const rootReducer = combineReducers({
    accountSlice,
    notificationSlice,
    documentSlice,
})

export default rootReducer