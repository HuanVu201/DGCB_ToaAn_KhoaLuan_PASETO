import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_PhieuDanhGiaApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_PhieuDanhGia, IDanhMuc_PhieuDanhGiaHistory, ISearchDanhMuc_PhieuDanhGia, ISearchDanhMuc_PhieuDanhGiaHistory } from "../models";

export const SearchDanhMuc_PhieuDanhGia =
    createAsyncThunk<IPaginationResponse<IDanhMuc_PhieuDanhGia[]>, ISearchDanhMuc_PhieuDanhGia>("SearchDanhMuc_PhieuDanhGia", async (params, thunkApi) => {
        try {
            const res = await danhMuc_PhieuDanhGiaApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_PhieuDanhGiaTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_PhieuDanhGia[]>, ISearchDanhMuc_PhieuDanhGia>("SearchDanhMuc_PhieuDanhGiaTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_PhieuDanhGiaApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_PhieuDanhGia =
    createAsyncThunk<IResult<IDanhMuc_PhieuDanhGia>, string>("GetDanhMuc_PhieuDanhGia", async (id, thunkApi) => {
        try {
            const res = await danhMuc_PhieuDanhGiaApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_PhieuDanhGia = createAsyncThunk("AddDanhMuc_PhieuDanhGia", async (data: IDanhMuc_PhieuDanhGia, thunkApi) => {
    try {
        const res = await danhMuc_PhieuDanhGiaApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_PhieuDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_PhieuDanhGia = createAsyncThunk("UpdateDanhMuc_PhieuDanhGia", async (data: IOmitUpdate<IDanhMuc_PhieuDanhGia>, thunkApi) => {
    try {
        const res = await danhMuc_PhieuDanhGiaApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_PhieuDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_PhieuDanhGia = createAsyncThunk("DeleteDanhMuc_PhieuDanhGia", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_PhieuDanhGiaApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_PhieuDanhGia({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 

export const SearchDanhMuc_PhieuDanhGiaHistory =
    createAsyncThunk<IPaginationResponse<IDanhMuc_PhieuDanhGiaHistory[]>, ISearchDanhMuc_PhieuDanhGiaHistory>("SearchDanhMuc_PhieuDanhGiaHistory", async (params, thunkApi) => {
        try {
            const res = await danhMuc_PhieuDanhGiaApi.SearchMauPhieuHistory(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })