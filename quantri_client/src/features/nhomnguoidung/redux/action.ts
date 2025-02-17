import { createAsyncThunk } from "@reduxjs/toolkit";
import { nhomNguoiDungApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { INhomNguoiDung } from "../models";

export const SearchNhomNguoiDung =
    createAsyncThunk<IPaginationResponse<INhomNguoiDung[]>, IPickSearch<INhomNguoiDung, "ten" |"id">>("SearchNhomNguoiDung", async (params, thunkApi) => {
        try {
            const res = await nhomNguoiDungApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetNhomNguoiDung =
    createAsyncThunk<IResult<INhomNguoiDung>, string>("GetNhomNguoiDung", async (id, thunkApi) => {
        try {
            const res = await nhomNguoiDungApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddNhomNguoiDung = createAsyncThunk("AddNhomNguoiDung", async (data: INhomNguoiDung, thunkApi) => {
    try {
        const res = await nhomNguoiDungApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchNhomNguoiDung({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateNhomNguoiDung = createAsyncThunk("UpdateNhomNguoiDung", async (data: IOmitUpdate<INhomNguoiDung>, thunkApi) => {
    try {
        const res = await nhomNguoiDungApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchNhomNguoiDung({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteNhomNguoiDung = createAsyncThunk("DeleteNhomNguoiDung", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await nhomNguoiDungApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchNhomNguoiDung({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 