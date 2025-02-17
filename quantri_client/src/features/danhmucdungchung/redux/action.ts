import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMucChungApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMucChung, ISearchDanhMucChung } from "@/features/danhmucdungchung/models"

export const SearchDanhMucChung =
    createAsyncThunk<IPaginationResponse<IDanhMucChung[]>,ISearchDanhMucChung>("SearchDanhMuc", async (params, thunkApi) => {
        try {
            const res = await danhMucChungApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetDanhMucChung =
    createAsyncThunk<IResult<IDanhMucChung>, string>("GetDanhMucChung", async (id, thunkApi) => {
        try {
            const res = await danhMucChungApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMucChung = createAsyncThunk("AddDanhMucChung", async (data: IDanhMucChung, thunkApi) => {
    try {
        const res = await danhMucChungApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMucChung({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMucChung = createAsyncThunk("UpdateDanhMucChung", async (data: IOmitUpdate<IDanhMucChung>, thunkApi) => {
    try {
        const res = await danhMucChungApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMucChung({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMucChung = createAsyncThunk("DeleteDanhMucChung", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMucChungApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMucChung({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 