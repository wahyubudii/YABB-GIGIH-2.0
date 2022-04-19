import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../features/accountSlice";
import authorization from "../features/authorization";

const store = configureStore({
    reducer: {
        token: authorization,
        account: accountSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store