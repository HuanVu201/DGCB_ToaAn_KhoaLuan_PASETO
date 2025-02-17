import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CoCauToChuc, SearchCoCauToChuc } from '@/models/cocautochuc'
import { API_VERSION, HOST_PATH } from '@/data'
import { IPaginationResponse, IResult } from '@/models'

const reducerPath = "cocautochucs"
const BASEURL = reducerPath.PrefixWithBaseURL()

export const CoCauToChucApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({baseUrl: HOST_PATH}),
    endpoints: (builder) => ({
        SearchCoCauToChuc: builder.query<IPaginationResponse<CoCauToChuc>, SearchCoCauToChuc>({
            query: (params: SearchCoCauToChuc) => {
                return {
                    url: BASEURL,
                    params
                }
            }
        }),
        GetCoCauToChuc: builder.query<IResult<CoCauToChuc>, string>({
            query: (id) => BASEURL + "/" + id
        }),
        UpdateCoCauToChuc: builder.mutation<IResult<string>, Partial<CoCauToChuc>>({
            query: (data) => {
                const {id, ...body} = data
                return {
                    url: BASEURL + "/" + id,
                    method: "PUT",
                    body
                }
            }
        }),
        CreateCoCauToChuc: builder.mutation<IResult<string>, CoCauToChuc>({
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
export const { useSearchCoCauToChucQuery, useCreateCoCauToChucMutation, useGetCoCauToChucQuery, useUpdateCoCauToChucMutation } = CoCauToChucApi