import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Config, SearchConfig } from '@/models/config'
import { API_VERSION, HOST_PATH } from '@/data'
import { IPaginationResponse, IResult } from '@/models'

const reducerPath = "configs"
const BASEURL = reducerPath.PrefixWithBaseURL()

export const ConfigApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({baseUrl: HOST_PATH}),
    endpoints: (builder) => ({
        SearchConfig: builder.query<IPaginationResponse<Config>, SearchConfig>({
            query: (params: SearchConfig) => {
                return {
                    url: BASEURL,
                    params
                }
            }
        }),
        GetConfig: builder.query<IResult<Config>, string>({
            query: (id) => BASEURL + "/" + id
        }),
        UpdateConfig: builder.mutation<IResult<string>, Partial<Config>>({
            query: (data) => {
                const {id, ...body} = data
                return {
                    url: BASEURL + "/" + id,
                    method: "PUT",
                    body
                }
            }
        }),
        CreateConfig: builder.mutation<IResult<string>, Config>({
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
export const { useSearchConfigQuery, useCreateConfigMutation, useGetConfigQuery, useUpdateConfigMutation } = ConfigApi