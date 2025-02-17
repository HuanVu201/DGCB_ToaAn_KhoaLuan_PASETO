import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhmuc_TaiLieuHuongDanSuDungApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhmuc_TaiLieuHuongDanSuDung, ISearchDanhmuc_TaiLieuHuongDanSuDung } from "../models";

export const SearchDanhmuc_TaiLieuHuongDanSuDung =
    createAsyncThunk<IPaginationResponse<IDanhmuc_TaiLieuHuongDanSuDung[]>, ISearchDanhmuc_TaiLieuHuongDanSuDung>("SearchDanhmuc_TaiLieuHuongDanSuDung", async (params, thunkApi) => {
        try {
            const res = await danhmuc_TaiLieuHuongDanSuDungApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhmuc_TaiLieuHuongDanSuDungTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhmuc_TaiLieuHuongDanSuDung[]>, ISearchDanhmuc_TaiLieuHuongDanSuDung>("SearchDanhmuc_TaiLieuHuongDanSuDungTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhmuc_TaiLieuHuongDanSuDungApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhmuc_TaiLieuHuongDanSuDung =
    createAsyncThunk<IResult<IDanhmuc_TaiLieuHuongDanSuDung>, string>("GetDanhmuc_TaiLieuHuongDanSuDung", async (id, thunkApi) => {
        try {
            const res = await danhmuc_TaiLieuHuongDanSuDungApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhmuc_TaiLieuHuongDanSuDung = createAsyncThunk("AddDanhmuc_TaiLieuHuongDanSuDung", async (data: IDanhmuc_TaiLieuHuongDanSuDung, thunkApi) => {
    try {
        const res = await danhmuc_TaiLieuHuongDanSuDungApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhmuc_TaiLieuHuongDanSuDung({ type:"TaiLieuHuongDanSuDung"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhmuc_TaiLieuHuongDanSuDung = createAsyncThunk("UpdateDanhmuc_TaiLieuHuongDanSuDung", async (data: IOmitUpdate<IDanhmuc_TaiLieuHuongDanSuDung>, thunkApi) => {
    try {
        const res = await danhmuc_TaiLieuHuongDanSuDungApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhmuc_TaiLieuHuongDanSuDung({type:"TaiLieuHuongDanSuDung"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhmuc_TaiLieuHuongDanSuDung = createAsyncThunk("DeleteDanhmuc_TaiLieuHuongDanSuDung", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhmuc_TaiLieuHuongDanSuDungApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhmuc_TaiLieuHuongDanSuDung({ type:"TaiLieuHuongDanSuDung"}))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 