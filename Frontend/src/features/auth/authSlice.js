import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthorized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setIsAuthorized: (state, action) => {
            state.isAuthorized = action.payload
        }
    }
})

export const { setUser, setIsAuthorized } = authSlice.actions
export default authSlice.reducer