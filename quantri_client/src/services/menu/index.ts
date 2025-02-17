import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Menu, SearchMenu } from '@/models/menu'
import { HOST_PATH } from '@/data'
import { IPaginationResponse, IResult } from '@/models'

const reducerPath = "menus"
const BASEURL = reducerPath.PrefixWithBaseURL()

export const MenuApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({baseUrl: HOST_PATH}),
    endpoints: (builder) => ({
        SearchMenu: builder.query<IPaginationResponse<Menu>, SearchMenu>({
            query: (params: SearchMenu) => {
                return {
                    url: BASEURL,
                    params
                }
            }
        }),
        GetMenu: builder.query<IResult<Menu>, string>({
            query: (id) => BASEURL + "/" + id
        }),
        UpdateMenu: builder.mutation<IResult<string>, Partial<Menu>>({
            query: (data) => {
                const {id, ...body} = data
                return {
                    url: BASEURL + "/" + id,
                    method: "PUT",
                    body
                }
            }
        }),
        CreateMenu: builder.mutation<IResult<string>, Menu>({
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
export const { useSearchMenuQuery, useCreateMenuMutation, useGetMenuQuery, useUpdateMenuMutation } = MenuApi