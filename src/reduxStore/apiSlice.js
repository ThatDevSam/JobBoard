import { createSelector } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    //The name of the cache reducer.
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/v1'}),
    endpoints: builder => ({
        createUser: builder.mutation({
            query: userInfo => ({
                url: '/auth/register',
                method: 'POST',
                body: userInfo
            })
        }),
        loginUser: builder.mutation({
            query: userInfo => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo
            })
        }),
        getUser: builder.query({ query: (id) =>
            `/`
        })
    })
})
// export const selectCurrentUser = state => state.api.mutations:{data}

//I think the key here is to just pass the data obj returned from the query to a localStorage save and call it a day. Accessing it via the state.api.mutations is kinda messy.

// export const selectCurrentUser = createSelector(
//     apiSlice.endpoints.createUser.select(),
//     (state) => userState,
//     ({data: user}, userState) => {
//         return {user, userState}
//     }
// )

// export const currentUser = (state) => {
//     const data = apiSlice.endpoints.createUser.select()(state)
//     return data
// }

// export const createUserResult = apiSlice.endpoints.createUser.select()

// const selectUserResult = createSelector(
//     createUserResult,
//     userResult => userResult.data
// )

// export const us = createSelector(createUserResult, api => api.data)


export const {useCreateUserMutation, useLoginUserMutation} = apiSlice