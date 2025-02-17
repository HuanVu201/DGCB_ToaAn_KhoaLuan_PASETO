import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_KhoTieuChiApi } from "../services";
import { IDanhMuc_KhoTieuChi, ISearchDanhMuc_KhoTieuChi } from "../models";
import { IPaginationResponse, IResult, IOmitUpdate, ISoftDelete} from "@/models";

export const SearchDanhMuc_KhoTieuChi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_KhoTieuChi[]>, ISearchDanhMuc_KhoTieuChi>("SearchDanhMuc_KhoTieuChi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_KhoTieuChiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_KhoTieuChiTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_KhoTieuChi[]>, ISearchDanhMuc_KhoTieuChi>("SearchDanhMuc_KhoTieuChiTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_KhoTieuChiApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_KhoTieuChi =
    createAsyncThunk<IResult<IDanhMuc_KhoTieuChi>, string>("GetDanhMuc_KhoTieuChi", async (id, thunkApi) => {
        try {
            const res = await danhMuc_KhoTieuChiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_KhoTieuChi = createAsyncThunk("AddDanhMuc_KhoTieuChi", async (data: IDanhMuc_KhoTieuChi, thunkApi) => {
    try {
        const res = await danhMuc_KhoTieuChiApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_KhoTieuChi({ pageNumber: 1, pageSize: 10000,reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_KhoTieuChi = createAsyncThunk("UpdateDanhMuc_KhoTieuChi", async (data: IOmitUpdate<IDanhMuc_KhoTieuChi>, thunkApi) => {
    try {
        const res = await danhMuc_KhoTieuChiApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_KhoTieuChi({ pageNumber: 1, pageSize: 10000,reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_KhoTieuChi = createAsyncThunk("DeleteDanhMuc_KhoTieuChi", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_KhoTieuChiApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_KhoTieuChi({ pageNumber: 1, pageSize: 10000,reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 