import { createAsyncThunk } from "@reduxjs/toolkit";
import { MauPhoiApi } from "../services/mauPhoi";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IGetUrlPhoi, IMauPhoi, ISearchMauPhoi } from "../models/mauPhoi";

export const SearchMauPhoi =
    createAsyncThunk<IPaginationResponse<IMauPhoi[]>, ISearchMauPhoi>("SearchMauPhoi", async (params, thunkApi) => {
        try {
            const res = await MauPhoiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetUrlPhoi =
    createAsyncThunk<string, IGetUrlPhoi>("GetUrlPhoi", async (params, thunkApi) => {
        try {
            const res = await MauPhoiApi.GetUrlPhoi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetMauPhoi =
    createAsyncThunk<IResult<IMauPhoi>, string>("GetMauPhoi", async (id, thunkApi) => {
        try {
            const res = await MauPhoiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddMauPhoi = createAsyncThunk("AddMauPhoi", async (data: IMauPhoi, thunkApi) => {
    try {
        const res = await MauPhoiApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchMauPhoi({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateMauPhoi = createAsyncThunk("UpdateMauPhoi", async (data: IOmitUpdate<IMauPhoi>, thunkApi) => {
    try {
        const res = await MauPhoiApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchMauPhoi({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteMauPhoi = createAsyncThunk("DeleteMauPhoi", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await MauPhoiApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchMauPhoi({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 