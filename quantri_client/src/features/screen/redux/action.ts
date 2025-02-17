import { createAsyncThunk } from "@reduxjs/toolkit";
import { screenApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IScreen } from "../models";

export const SearchScreen =
    createAsyncThunk<IPaginationResponse<IScreen[]>, IPickSearch<IScreen, "ma">>("SearchScreen", async (params, thunkApi) => {
        try {
            const res = await screenApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetScreen =
    createAsyncThunk<IResult<IScreen>, string>("GetScreen", async (id, thunkApi) => {
        try {
            const res = await screenApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddScreen = createAsyncThunk<IResult<any>, IScreen>("AddScreen", async (data, thunkApi) => {
    try {
        const res = await screenApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchScreen({ reFetch: true, pageNumber: 1, pageSize: 200 }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateScreen = createAsyncThunk<IResult<any>, IOmitUpdate<IScreen>>("UpdateScreen", async (data, thunkApi) => {
    try {
        const res = await screenApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchScreen({ reFetch: true, pageNumber: 1, pageSize: 200 }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteScreen = createAsyncThunk("DeleteScreen", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await screenApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchScreen({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 