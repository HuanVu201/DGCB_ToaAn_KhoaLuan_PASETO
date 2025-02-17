import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_CacCapApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_CacCap, ISearchDanhMuc_CacCap } from "../models";

export const SearchDanhMuc_CacCap =
    createAsyncThunk<IPaginationResponse<IDanhMuc_CacCap[]>, ISearchDanhMuc_CacCap>("SearchDanhMuc_CacCap", async (params, thunkApi) => {
        try {
            const res = await danhMuc_CacCapApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_CacCapTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_CacCap[]>, ISearchDanhMuc_CacCap>("SearchDanhMuc_CacCapTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_CacCapApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_CacCap =
    createAsyncThunk<IResult<IDanhMuc_CacCap>, string>("GetDanhMuc_CacCap", async (id, thunkApi) => {
        try {
            const res = await danhMuc_CacCapApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_CacCap = createAsyncThunk("AddDanhMuc_CacCap", async (data: IDanhMuc_CacCap, thunkApi) => {
    try {
        const res = await danhMuc_CacCapApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_CacCap({ type:"CapDanhGia"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_CacCap = createAsyncThunk("UpdateDanhMuc_CacCap", async (data: IOmitUpdate<IDanhMuc_CacCap>, thunkApi) => {
    try {
        const res = await danhMuc_CacCapApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_CacCap({type:"CapDanhGia"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_CacCap = createAsyncThunk("DeleteDanhMuc_CacCap", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_CacCapApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_CacCap({type:"CapDanhGia" }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 