import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User, SearchUser } from '@/models/user'
import { API_VERSION, HOST_PATH } from '@/data'
import { IPaginationResponse, IResult } from '@/models'

const reducerPath = "users"
const BASEURL = reducerPath.PrefixWithBaseURL()

export const UserApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({baseUrl: HOST_PATH}),
    endpoints: (builder) => ({
        SearchUser: builder.query<IPaginationResponse<User>, SearchUser>({
            query: (params: SearchUser) => {
                return {
                    url: BASEURL,
                    params
                }
            }
        }),
        GetUser: builder.query<IResult<User>, string>({
            query: (id) => BASEURL + "/" + id
        }),
        UpdateUser: builder.mutation<IResult<string>, Partial<User>>({
            query: (data) => {
                const {id, ...body} = data
                return {
                    url: BASEURL + "/" + id,
                    method: "PUT",
                    body
                }
            }
        }),
        CreateUser: builder.mutation<IResult<string>, User>({
            query: (body) => {
                return {
                    url: BASEURL,
                    method: "POST",
                    body
                }
            }
        })
    })
})
export const { useSearchUserQuery, useCreateUserMutation, useGetUserQuery, useUpdateUserMutation } = UserApi