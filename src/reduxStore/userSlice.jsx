import { createSlice, createSelector } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setCurrentUser: (state, action) => {
          state.currentUser = {...action.payload}
          console.log(state.currentUser)
        },
    }
})

export const {setCurrentUser} = userSlice.actions

export default userSlice.reducer