import { createAsyncThunk } from "@reduxjs/toolkit";
import { DongBoDuLieuApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDongBoDuLieu, ISearchDongBoDuLieu } from "../models";

export const SearchDongBoDuLieu =
    createAsyncThunk<IPaginationResponse<IDongBoDuLieu[]>, ISearchDongBoDuLieu>("SearchDongBoDuLieu", async (params, thunkApi) => {
        try {
            const res = await DongBoDuLieuApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDongBoDuLieuTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDongBoDuLieu[]>, ISearchDongBoDuLieu>("SearchDongBoDuLieuTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await DongBoDuLieuApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDongBoDuLieu =
    createAsyncThunk<IResult<IDongBoDuLieu>, string>("GetDongBoDuLieu", async (id, thunkApi) => {
        try {
            const res = await DongBoDuLieuApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDongBoDuLieu = createAsyncThunk("AddDongBoDuLieu", async (data: IDongBoDuLieu, thunkApi) => {
    try {
        const res = await DongBoDuLieuApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDongBoDuLieu({ type:"DongBoDuLieu"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDongBoDuLieu = createAsyncThunk("UpdateDongBoDuLieu", async (data: IOmitUpdate<IDongBoDuLieu>, thunkApi) => {
    try {
        const res = await DongBoDuLieuApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDongBoDuLieu({type:"DongBoDuLieu"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDongBoDuLieu = createAsyncThunk("DeleteDongBoDuLieu", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await DongBoDuLieuApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDongBoDuLieu({ type:"DongBoDuLieu"}))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 