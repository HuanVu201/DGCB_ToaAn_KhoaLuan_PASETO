import { createAsyncThunk } from "@reduxjs/toolkit";
import { lstUsersApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { ILstUsers, ISearchLstUsers} from "../models";

export const SearchLstUsers=
    createAsyncThunk<IPaginationResponse<ILstUsers[]>, ISearchLstUsers>("SearchLstUsers", async (params, thunkApi) => {
        try {
            const res = await lstUsersApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchListAUGOfGroupQuery =
    createAsyncThunk<IPaginationResponse<ILstUsers[]>, ISearchLstUsers>("SearchListAUGOfGroupQuery", async (params, thunkApi) => {
        try {
            const res = await lstUsersApi.SearchListAUGOfGroupQuery(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
    export const SearchListAUGNotPermissionDanhGia =
    createAsyncThunk<IPaginationResponse<ILstUsers[]>, ISearchLstUsers>("SearchListAUGNotPermissionDanhGia", async (params, thunkApi) => {
        try {
            const res = await lstUsersApi.SearchListAUGNotPermissionDanhGia(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
    export const SearchListAUGNotPermission =
    createAsyncThunk<IPaginationResponse<ILstUsers[]>, ISearchLstUsers>("SearchListAUGNotPermission", async (params, thunkApi) => {
        try {
            const res = await lstUsersApi.SearchListAUGNotPermission(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
    export const SearchUserNotBuocXuLy =
    createAsyncThunk<IPaginationResponse<ILstUsers[]>, ISearchLstUsers>("SearchUserNotBuocXuLy", async (params, thunkApi) => {
        try {
            const res = await lstUsersApi.SearchUserNotBuocXuLy(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetLstUsers=
    createAsyncThunk<IResult<ILstUsers>, string>("GetLstUsers", async (id, thunkApi) => {
        try {
            const res = await lstUsersApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddLstUsers= createAsyncThunk("AddLstUsers", async (data: ILstUsers, thunkApi) => {
    try {
        const res = await lstUsersApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchLstUsers({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateLstUsers= createAsyncThunk("UpdateLstUsers", async (data: IOmitUpdate<ILstUsers>, thunkApi) => {
    try {
        const res = await lstUsersApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLstUsers({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteLstUsers= createAsyncThunk("DeleteLstUsers", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await lstUsersApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLstUsers({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 