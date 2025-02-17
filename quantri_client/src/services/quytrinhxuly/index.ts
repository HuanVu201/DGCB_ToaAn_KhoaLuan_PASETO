import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { QuyTrinhXuLy, SearchQuyTrinhXuLy } from '@/models/quytrinhxuly'
import { API_VERSION, HOST_PATH } from '@/data'
import { IPaginationResponse, IResult } from '@/models'

const reducerPath = "quytrinhxulys"
const BASEURL = reducerPath.PrefixWithBaseURL()

export const quyTrinhXuLyApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({baseUrl: HOST_PATH}),
    endpoints: (builder) => ({
        SearchQuyTrinhXuLy: builder.query<IPaginationResponse<QuyTrinhXuLy>, SearchQuyTrinhXuLy>({
            query: (params: SearchQuyTrinhXuLy) => {
                return {
                    url: BASEURL,
                    params
                }
            }
        }),
        GetQuyTrinhXuLy: builder.query<IResult<QuyTrinhXuLy>, string>({
            query: (id) => BASEURL + "/" + id
        }),
        UpdateQuyTrinhXuLy: builder.mutation<IResult<string>, Partial<QuyTrinhXuLy>>({
            query: (data) => {
                const {id, ...body} = data
                return {
                    url: BASEURL + "/" + id,
                    method: "PUT",
                    body
                }
            }
        }),
        CreateQuyTrinhXuLy: builder.mutation<IResult<string>, QuyTrinhXuLy>({
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
export const { useSearchQuyTrinhXuLyQuery, useCreateQuyTrinhXuLyMutation, useGetQuyTrinhXuLyQuery, useUpdateQuyTrinhXuLyMutation } = quyTrinhXuLyApi