import { createSlice } from "@reduxjs/toolkit";

const authorization = createSlice({
    name: "auth",
    initialState: {
        token: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        removeToken: (state, action) => {
            state.token = ""
        }
    }
})

export const { setToken, removeToken } = authorization.actions
export default authorization.reducer