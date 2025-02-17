import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_TrangThaiDanhGiaApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from  "@/models";
import { IDanhMuc_TrangThaiDanhGia, ISearchDanhMuc_TrangThaiDanhGia } from "../models";

export const SearchDanhMuc_TrangThaiDanhGia =
    createAsyncThunk<IPaginationResponse<IDanhMuc_TrangThaiDanhGia[]>, ISearchDanhMuc_TrangThaiDanhGia>("SearchDanhMuc_TrangThaiDanhGia", async (params, thunkApi) => {
        try {
            const res = await danhMuc_TrangThaiDanhGiaApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_TrangThaiDanhGiaTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_TrangThaiDanhGia[]>, ISearchDanhMuc_TrangThaiDanhGia>("SearchDanhMuc_TrangThaiDanhGiaTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_TrangThaiDanhGiaApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_TrangThaiDanhGia =
    createAsyncThunk<IResult<IDanhMuc_TrangThaiDanhGia>, string>("GetDanhMuc_TrangThaiDanhGia", async (id, thunkApi) => {
        try {
            const res = await danhMuc_TrangThaiDanhGiaApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_TrangThaiDanhGia = createAsyncThunk("AddDanhMuc_TrangThaiDanhGia", async (data: IDanhMuc_TrangThaiDanhGia, thunkApi) => {
    try {
        const res = await danhMuc_TrangThaiDanhGiaApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_TrangThaiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_TrangThaiDanhGia = createAsyncThunk("UpdateDanhMuc_TrangThaiDanhGia", async (data: IOmitUpdate<IDanhMuc_TrangThaiDanhGia>, thunkApi) => {
    try {
        const res = await danhMuc_TrangThaiDanhGiaApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_TrangThaiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_TrangThaiDanhGia = createAsyncThunk("DeleteDanhMuc_TrangThaiDanhGia", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_TrangThaiDanhGiaApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_TrangThaiDanhGia({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 