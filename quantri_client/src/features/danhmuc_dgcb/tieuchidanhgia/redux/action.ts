
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TieuChiDanhGiaApi } from "../services";
import { IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { ITieuChiDanhGia, ISearchTieuChiDanhGia } from "../models";

export const SearchTieuChiDanhGia = createAsyncThunk<IPaginationResponse<ITieuChiDanhGia[]>, ISearchTieuChiDanhGia>("SearchTieuChiDanhGia", async (params, thunkApi) => {
    try {
        const res = await TieuChiDanhGiaApi.Search(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const SearchTieuChiDanhGiaAdmin = createAsyncThunk<IPaginationResponse<ITieuChiDanhGia[]>, ISearchTieuChiDanhGia>("SearchTieuChiDanhGiaAdmin", async (params, thunkApi) => {
    try {
        const res = await TieuChiDanhGiaApi.Search(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const GetTieuChiDanhGia = createAsyncThunk<IResult<ITieuChiDanhGia>, string>("GetTieuChiDanhGia", async (id, thunkApi) => {
    try {
        const res = await TieuChiDanhGiaApi.Get(id)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const AddTieuChiDanhGia = createAsyncThunk<IResult<string>, ITieuChiDanhGia>("AddTieuChiDanhGia", async (data, thunkApi) => {
    try {

        const res = await TieuChiDanhGiaApi.Create(data)
        if (res.status === 201) {
            thunkApi.dispatch(SearchTieuChiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateTieuChiDanhGia = createAsyncThunk("UpdateTieuChiDanhGia", async (data: IOmitUpdate<ITieuChiDanhGia>, thunkApi) => {
    try {
        const res = await TieuChiDanhGiaApi.Update(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchTieuChiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTieuChiDanhGia = createAsyncThunk("DeleteTieuChiDanhGia", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await TieuChiDanhGiaApi.Delete(params)
        if (res.status === 200) {
            thunkApi.dispatch(SearchTieuChiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateTieuChiDanhGiaOld = createAsyncThunk("UpdateTieuChiDanhGiaOld", async (data: IOmitUpdate<ITieuChiDanhGia>, thunkApi) => {
    try {
        const res = await TieuChiDanhGiaApi.UpdateOld(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchTieuChiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const DeleteTieuChiDanhGiaOld = createAsyncThunk("DeleteTieuChiDanhGia", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await TieuChiDanhGiaApi.DeleteOld(params)
        if (res.status === 200) {
            thunkApi.dispatch(SearchTieuChiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})