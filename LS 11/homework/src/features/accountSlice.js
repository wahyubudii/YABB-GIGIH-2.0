import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getAccount = createAsyncThunk("account/getAccount", async (token) => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return { data }
})

const accountEntity = createEntityAdapter({
    selectId: (account) => account.id
})

const accountSlice = createSlice({
    name: "account",
    initialState: accountEntity.getInitialState(),
    extraReducers: {
        [getAccount.fulfilled]: (state, action) => {
            accountEntity.setAll(state, action.payload)
        }
    }
})

export const accountSelectors = accountEntity.getSelectors(state => state.account)
export default accountSlice.reducer