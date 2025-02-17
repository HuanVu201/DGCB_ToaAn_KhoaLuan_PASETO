import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ICredential, ILogin } from '@/models/auth'
import { HOST_PATH } from '@/data'

const reducerPath = "tokens"
const BASEURL = reducerPath.PrefixWithBaseURL("api")
export const AuthApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({baseUrl: HOST_PATH}),
    endpoints: (builder) => ({
        GetToken: builder.mutation<ICredential, ILogin>({
            query: (body) => {
                return {
                    url: BASEURL,
                    method: "POST",
                    body
                }
            }
        }),
        RefreshToken: builder.mutation<ICredential, Omit<ICredential, "refreshTokenExpiryTime">>({
            query: (body) => {
                return {
                    url: BASEURL + "/refresh",
                    method: "POST",
                    body
                }
            }
        }),
    })
})
export const { useGetTokenMutation, useRefreshTokenMutation } = AuthApi