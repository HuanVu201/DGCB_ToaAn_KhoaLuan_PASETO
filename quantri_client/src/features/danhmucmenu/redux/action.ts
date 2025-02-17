
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MenuApi } from "../services";
import { IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IMenu, ISearchMenu } from "../models";

export const SearchMenu = createAsyncThunk<IPaginationResponse<IMenu[]>, ISearchMenu>("SearchMenu", async (params, thunkApi) => {
    try {
        const res = await MenuApi.Search(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const SearchMenuAdmin = createAsyncThunk<IPaginationResponse<IMenu[]>, ISearchMenu>("SearchMenuAdmin", async (params, thunkApi) => {
    try {
        const res = await MenuApi.Search(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const GetMenu = createAsyncThunk<IResult<IMenu>, string>("GetMenu", async (id, thunkApi) => {
    try {
        const res = await MenuApi.Get(id)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const AddMenu = createAsyncThunk<IResult<string>, IMenu>("AddMenu", async (data, thunkApi) => {
    try {

        const res = await MenuApi.Create(data)
        if (res.status === 201) {
            thunkApi.dispatch(SearchMenu({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateMenu = createAsyncThunk("UpdateMenu", async (data: IOmitUpdate<IMenu>, thunkApi) => {
    try {
        const res = await MenuApi.Update(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchMenu({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteMenu = createAsyncThunk("DeleteMenu", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await MenuApi.Delete(params)
        if (res.status === 200) {
            thunkApi.dispatch(SearchMenu({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
