import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_VERSION, HOST_PATH, HOST_PATH_FILE } from '@/data'
import { IPaginationResponse, IResult } from '@/models'
import axiosInstanceFile from '@/lib/axios/fileInstance'

const reducerPath = "files"
const BASEURL = reducerPath.PrefixWithBaseURL()

export const ConfigApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({baseUrl: HOST_PATH_FILE}),
    endpoints: (builder) => ({
        GetFileStream: builder.query<Blob, { params: Record<string, string | number> }>({
            queryFn: async ({ params }) => {
              try {
                const response = await axiosInstanceFile.get('/GetFileStream', { params });
                return { data: response.data }; // Trả về Blob từ response
              } catch (error) {
                return { error: { status: 500, data: error } };
              }
            },
          }),
        UploadFileBucket: builder.mutation<IResult<string>, { files: FormData, folderName?: string }>({
            queryFn: async (params) => {
                try {
                  const response = await axiosInstanceFile.post("/uploadfilebucket", params)
                  return { data: response.data }; // Trả về Blob từ response
                } catch (error) {
                  return { error: { status: 500, data: error } };
                }
              },
        }),
    })
})
export const { useUploadFileBucketMutation } = ConfigApi