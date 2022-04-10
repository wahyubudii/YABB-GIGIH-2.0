import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../features/accountSlice";
import authorization from "../features/authorization";

export const store = configureStore({
    reducer: {
        token: authorization,
        account: accountSlice
    }
})