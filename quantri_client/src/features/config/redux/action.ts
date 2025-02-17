import { createAsyncThunk } from "@reduxjs/toolkit";
import { configApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IConfig, ISearchConfig } from "../models";

export const SearchConfig =
    createAsyncThunk<IPaginationResponse<IConfig[]>, ISearchConfig>("SearchConfig", async (params, thunkApi) => {
        try {
            const res = await configApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const SearchPublicConfig =
    createAsyncThunk<IPaginationResponse<IConfig[]>, undefined>("SearchPublicConfig", async (params, thunkApi) => {
        try {
            const res = await configApi.SearchPublicModule()
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetConfig =
    createAsyncThunk<IResult<IConfig>, string>("GetConfig", async (id, thunkApi) => {
        try {
            const res = await configApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddConfig = createAsyncThunk("AddConfig", async (data: IConfig, thunkApi) => {
    try {
        const res = await configApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchConfig({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateConfig = createAsyncThunk("UpdateConfig", async (data: IOmitUpdate<IConfig>, thunkApi) => {
    try {
        const res = await configApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchConfig({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteConfig = createAsyncThunk("DeleteConfig", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await configApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchConfig({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
