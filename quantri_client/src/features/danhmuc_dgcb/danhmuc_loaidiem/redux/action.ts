import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_LoaiDiemApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_LoaiDiem, ISearchDanhMuc_LoaiDiem } from "../models";

export const SearchDanhMuc_LoaiDiem =
    createAsyncThunk<IPaginationResponse<IDanhMuc_LoaiDiem[]>, ISearchDanhMuc_LoaiDiem>("SearchDanhMuc_LoaiDiem", async (params, thunkApi) => {
        try {
            const res = await danhMuc_LoaiDiemApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_LoaiDiemTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_LoaiDiem[]>, ISearchDanhMuc_LoaiDiem>("SearchDanhMuc_LoaiDiemTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_LoaiDiemApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_LoaiDiem =
    createAsyncThunk<IResult<IDanhMuc_LoaiDiem>, string>("GetDanhMuc_LoaiDiem", async (id, thunkApi) => {
        try {
            const res = await danhMuc_LoaiDiemApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_LoaiDiem = createAsyncThunk("AddDanhMuc_LoaiDiem", async (data: IDanhMuc_LoaiDiem, thunkApi) => {
    try {
        const res = await danhMuc_LoaiDiemApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_LoaiDiem({ type:"LoaiDiem"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_LoaiDiem = createAsyncThunk("UpdateDanhMuc_LoaiDiem", async (data: IOmitUpdate<IDanhMuc_LoaiDiem>, thunkApi) => {
    try {
        const res = await danhMuc_LoaiDiemApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_LoaiDiem({type:"LoaiDiem"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_LoaiDiem = createAsyncThunk("DeleteDanhMuc_LoaiDiem", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_LoaiDiemApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_LoaiDiem({ type:"LoaiDiem"}))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 