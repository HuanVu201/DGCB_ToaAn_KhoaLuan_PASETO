import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IAction } from "../models";

export const SearchAction =
    createAsyncThunk<IPaginationResponse<IAction[]>, IPickSearch<IAction, "ten">>("SearchAction", async (params, thunkApi) => {
        try {
            const res = await actionApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetAction =
    createAsyncThunk<IResult<IAction>, string>("GetAction", async (id, thunkApi) => {
        try {
            const res = await actionApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddAction = createAsyncThunk("AddAction", async (data: IAction, thunkApi) => {
    try {
        const res = await actionApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchAction({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateAction = createAsyncThunk("UpdateAction", async (data: IOmitUpdate<IAction>, thunkApi) => {
    try {
        const res = await actionApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchAction({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteAction = createAsyncThunk("DeleteAction", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await actionApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchAction({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 