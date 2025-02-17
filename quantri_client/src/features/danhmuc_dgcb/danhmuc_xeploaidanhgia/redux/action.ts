import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_XepLoaiDanhGiaApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_XepLoaiDanhGia, ISearchDanhMuc_XepLoaiDanhGia } from "../models";

export const SearchDanhMuc_XepLoaiDanhGia =
    createAsyncThunk<IPaginationResponse<IDanhMuc_XepLoaiDanhGia[]>, ISearchDanhMuc_XepLoaiDanhGia>("SearchDanhMuc_XepLoaiDanhGia", async (params, thunkApi) => {
        try {
            const res = await danhMuc_XepLoaiDanhGiaApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_XepLoaiDanhGiaTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_XepLoaiDanhGia[]>, ISearchDanhMuc_XepLoaiDanhGia>("SearchDanhMuc_XepLoaiDanhGiaTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_XepLoaiDanhGiaApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_XepLoaiDanhGia =
    createAsyncThunk<IResult<IDanhMuc_XepLoaiDanhGia>, string>("GetDanhMuc_XepLoaiDanhGia", async (id, thunkApi) => {
        try {
            const res = await danhMuc_XepLoaiDanhGiaApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_XepLoaiDanhGia = createAsyncThunk("AddDanhMuc_XepLoaiDanhGia", async (data: IDanhMuc_XepLoaiDanhGia, thunkApi) => {
    try {
        const res = await danhMuc_XepLoaiDanhGiaApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_XepLoaiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_XepLoaiDanhGia = createAsyncThunk("UpdateDanhMuc_XepLoaiDanhGia", async (data: IOmitUpdate<IDanhMuc_XepLoaiDanhGia>, thunkApi) => {
    try {
        const res = await danhMuc_XepLoaiDanhGiaApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_XepLoaiDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_XepLoaiDanhGia = createAsyncThunk("DeleteDanhMuc_XepLoaiDanhGia", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_XepLoaiDanhGiaApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_XepLoaiDanhGia({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 

export const AddDanhMuc_XepLoaiDanhGiaNotReset = createAsyncThunk("AddDanhMuc_XepLoaiDanhGia", async (data: IDanhMuc_XepLoaiDanhGia, thunkApi) => {
    try {
        const res = await danhMuc_XepLoaiDanhGiaApi.Create(data);
        if (res.status === 201) {
            
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_XepLoaiDanhGiaNotReset = createAsyncThunk("UpdateDanhMuc_XepLoaiDanhGia", async (data: IOmitUpdate<IDanhMuc_XepLoaiDanhGia>, thunkApi) => {
    try {
        const res = await danhMuc_XepLoaiDanhGiaApi.Update(data);
        if (res.status === 200) {

        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_XepLoaiDanhGiaNotReset = createAsyncThunk("DeleteDanhMuc_XepLoaiDanhGia", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_XepLoaiDanhGiaApi.Delete(data);
        if (res.status === 200) {

        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 