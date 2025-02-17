import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_TrangThaiCongViecApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_TrangThaiCongViec, ISearchDanhMuc_TrangThaiCongViec } from "../models";

export const SearchDanhMuc_TrangThaiCongViec =
    createAsyncThunk<IPaginationResponse<IDanhMuc_TrangThaiCongViec[]>, ISearchDanhMuc_TrangThaiCongViec>("SearchDanhMuc_TrangThaiCongViec", async (params, thunkApi) => {
        try {
            const res = await danhMuc_TrangThaiCongViecApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_TrangThaiCongViecTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_TrangThaiCongViec[]>, ISearchDanhMuc_TrangThaiCongViec>("SearchDanhMuc_TrangThaiCongViecTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_TrangThaiCongViecApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_TrangThaiCongViec =
    createAsyncThunk<IResult<IDanhMuc_TrangThaiCongViec>, string>("GetDanhMuc_TrangThaiCongViec", async (id, thunkApi) => {
        try {
            const res = await danhMuc_TrangThaiCongViecApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_TrangThaiCongViec = createAsyncThunk("AddDanhMuc_TrangThaiCongViec", async (data: IDanhMuc_TrangThaiCongViec, thunkApi) => {
    try {
        const res = await danhMuc_TrangThaiCongViecApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_TrangThaiCongViec({ type:"TrangThaiCongViec"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_TrangThaiCongViec = createAsyncThunk("UpdateDanhMuc_TrangThaiCongViec", async (data: IOmitUpdate<IDanhMuc_TrangThaiCongViec>, thunkApi) => {
    try {
        const res = await danhMuc_TrangThaiCongViecApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_TrangThaiCongViec({type:"TrangThaiCongViec"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_TrangThaiCongViec = createAsyncThunk("DeleteDanhMuc_TrangThaiCongViec", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_TrangThaiCongViecApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_TrangThaiCongViec({ type:"TrangThaiCongViec"}))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 