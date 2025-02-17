import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_CongViecChuyenMonApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_CongViecChuyenMon, ISearchDanhMuc_CongViecChuyenMon } from "../models";

export const SearchDanhMuc_CongViecChuyenMon =
    createAsyncThunk<IPaginationResponse<IDanhMuc_CongViecChuyenMon[]>, ISearchDanhMuc_CongViecChuyenMon>("SearchDanhMuc_CongViecChuyenMon", async (params, thunkApi) => {
        try {
            const res = await danhMuc_CongViecChuyenMonApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_CongViecChuyenMonTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_CongViecChuyenMon[]>, ISearchDanhMuc_CongViecChuyenMon>("SearchDanhMuc_CongViecChuyenMonTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_CongViecChuyenMonApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_CongViecChuyenMon =
    createAsyncThunk<IResult<IDanhMuc_CongViecChuyenMon>, string>("GetDanhMuc_CongViecChuyenMon", async (id, thunkApi) => {
        try {
            const res = await danhMuc_CongViecChuyenMonApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_CongViecChuyenMon = createAsyncThunk("AddDanhMuc_CongViecChuyenMon", async (data: IDanhMuc_CongViecChuyenMon, thunkApi) => {
    try {
        const res = await danhMuc_CongViecChuyenMonApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_CongViecChuyenMon({ type:"CongViecChuyenMon"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_CongViecChuyenMon = createAsyncThunk("UpdateDanhMuc_CongViecChuyenMon", async (data: IOmitUpdate<IDanhMuc_CongViecChuyenMon>, thunkApi) => {
    try {
        const res = await danhMuc_CongViecChuyenMonApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_CongViecChuyenMon({type:"CongViecChuyenMon"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_CongViecChuyenMon = createAsyncThunk("DeleteDanhMuc_CongViecChuyenMon", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_CongViecChuyenMonApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_CongViecChuyenMon({ type:"CongViecChuyenMon"}))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 