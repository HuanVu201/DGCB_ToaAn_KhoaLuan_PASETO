import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_ChucDanhApi } from "../services";
import { IPaginationResponse, IResult, IOmitUpdate, ISoftDelete } from "@/models";
import { ChucDanh, ISearchChucDanh } from "@/models/chucDanh";

export const SearchDanhMuc_ChucDanh =
    createAsyncThunk<IPaginationResponse<ChucDanh[]>, ISearchChucDanh>("SearchDanhMuc_ChucDanh", async (params, thunkApi) => {
        try {
            const res = await danhMuc_ChucDanhApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_ChucDanhTheoDonVi =
    createAsyncThunk<IPaginationResponse<ChucDanh[]>, ISearchChucDanh>("SearchDanhMuc_ChucDanhTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_ChucDanhApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_ChucDanh =
    createAsyncThunk<IResult<ChucDanh>, string>("GetDanhMuc_ChucDanh", async (id, thunkApi) => {
        try {
            const res = await danhMuc_ChucDanhApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_ChucDanh = createAsyncThunk("AddDanhMuc_ChucDanh", async (data: ChucDanh, thunkApi) => {
    try {
        const res = await danhMuc_ChucDanhApi.Create(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_ChucDanh = createAsyncThunk("UpdateDanhMuc_ChucDanh", async (data: IOmitUpdate<ChucDanh>, thunkApi) => {
    try {
        const res = await danhMuc_ChucDanhApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_ChucDanh = createAsyncThunk("DeleteDanhMuc_ChucDanh", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_ChucDanhApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_ChucDanh({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 