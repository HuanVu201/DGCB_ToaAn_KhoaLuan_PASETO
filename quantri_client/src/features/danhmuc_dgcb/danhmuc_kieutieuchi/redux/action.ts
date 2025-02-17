import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_KieuTieuChiApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_KieuTieuChi, ISearchDanhMuc_KieuTieuChi } from "../models";

export const SearchDanhMuc_KieuTieuChi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_KieuTieuChi[]>, ISearchDanhMuc_KieuTieuChi>("SearchDanhMuc_KieuTieuChi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_KieuTieuChiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_KieuTieuChiTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_KieuTieuChi[]>, ISearchDanhMuc_KieuTieuChi>("SearchDanhMuc_KieuTieuChiTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_KieuTieuChiApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_KieuTieuChi =
    createAsyncThunk<IResult<IDanhMuc_KieuTieuChi>, string>("GetDanhMuc_KieuTieuChi", async (id, thunkApi) => {
        try {
            const res = await danhMuc_KieuTieuChiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_KieuTieuChi = createAsyncThunk("AddDanhMuc_KieuTieuChi", async (data: IDanhMuc_KieuTieuChi, thunkApi) => {
    try {
        const res = await danhMuc_KieuTieuChiApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_KieuTieuChi({ type:"KieuTieuChi" }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_KieuTieuChi = createAsyncThunk("UpdateDanhMuc_KieuTieuChi", async (data: IOmitUpdate<IDanhMuc_KieuTieuChi>, thunkApi) => {
    try {
        const res = await danhMuc_KieuTieuChiApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_KieuTieuChi({ type:"KieuTieuChi"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_KieuTieuChi = createAsyncThunk("DeleteDanhMuc_KieuTieuChi", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_KieuTieuChiApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_KieuTieuChi({type:"KieuTieuChi" }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 