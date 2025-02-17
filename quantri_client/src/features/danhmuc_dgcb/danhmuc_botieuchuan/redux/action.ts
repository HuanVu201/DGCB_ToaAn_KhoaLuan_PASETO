import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_BoTieuChuanApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_BoTieuChuan, ISearchDanhMuc_BoTieuChuan } from "../models";

export const SearchDanhMuc_BoTieuChuan =
    createAsyncThunk<IPaginationResponse<IDanhMuc_BoTieuChuan[]>, ISearchDanhMuc_BoTieuChuan>("SearchDanhMuc_BoTieuChuan", async (params, thunkApi) => {
        try {
            const res = await danhMuc_BoTieuChuanApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_BoTieuChuanTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_BoTieuChuan[]>, ISearchDanhMuc_BoTieuChuan>("SearchDanhMuc_BoTieuChuanTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_BoTieuChuanApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_BoTieuChuan =
    createAsyncThunk<IResult<IDanhMuc_BoTieuChuan>, string>("GetDanhMuc_BoTieuChuan", async (id, thunkApi) => {
        try {
            const res = await danhMuc_BoTieuChuanApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_BoTieuChuan = createAsyncThunk("AddDanhMuc_BoTieuChuan", async (data: IDanhMuc_BoTieuChuan, thunkApi) => {
    try {
        const res = await danhMuc_BoTieuChuanApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_BoTieuChuan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_BoTieuChuan = createAsyncThunk("UpdateDanhMuc_BoTieuChuan", async (data: IOmitUpdate<IDanhMuc_BoTieuChuan>, thunkApi) => {
    try {
        const res = await danhMuc_BoTieuChuanApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_BoTieuChuan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_BoTieuChuan = createAsyncThunk("DeleteDanhMuc_BoTieuChuan", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_BoTieuChuanApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_BoTieuChuan({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 