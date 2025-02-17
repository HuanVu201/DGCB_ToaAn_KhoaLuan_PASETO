import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_ChucVuApi } from "../services";
import { IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { ChucVu, ISearchChucVu } from "@/models/chucVu";

export const SearchDanhMuc_ChucVu =
    createAsyncThunk<IPaginationResponse<ChucVu[]>, ISearchChucVu>("SearchDanhMuc_ChucVu", async (params, thunkApi) => {
        try {
            const res = await danhMuc_ChucVuApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_ChucVu =
    createAsyncThunk<IResult<ChucVu>, string>("GetDanhMuc_ChucVu", async (id, thunkApi) => {
        try {
            const res = await danhMuc_ChucVuApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_ChucVu = createAsyncThunk("AddDanhMuc_ChucVu", async (data: ChucVu, thunkApi) => {
    try {
        const res = await danhMuc_ChucVuApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_ChucVu({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_ChucVu = createAsyncThunk("UpdateDanhMuc_ChucVu", async (data: IOmitUpdate<ChucVu>, thunkApi) => {
    try {
        const res = await danhMuc_ChucVuApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_ChucVu({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_ChucVu = createAsyncThunk("DeleteDanhMuc_ChucVu", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_ChucVuApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_ChucVu({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 