import { createAsyncThunk } from "@reduxjs/toolkit";
import { historyCallApiTichHopApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IHistoryCallApiTichHop, ISearchHistoryCallApiTichHop } from "../models";

export const SearchHistoryCallApiTichHop =
    createAsyncThunk<IPaginationResponse<IHistoryCallApiTichHop[]>, ISearchHistoryCallApiTichHop>("SearchHistoryCallApiTichHop", async (params, thunkApi) => {
        try {
            const res = await historyCallApiTichHopApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchHistoryCallApiTichHopTheoDonVi =
    createAsyncThunk<IPaginationResponse<IHistoryCallApiTichHop[]>, ISearchHistoryCallApiTichHop>("SearchHistoryCallApiTichHopTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await historyCallApiTichHopApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetHistoryCallApiTichHop =
    createAsyncThunk<IResult<IHistoryCallApiTichHop>, string>("GetHistoryCallApiTichHop", async (id, thunkApi) => {
        try {
            const res = await historyCallApiTichHopApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddHistoryCallApiTichHop = createAsyncThunk("AddHistoryCallApiTichHop", async (data: IHistoryCallApiTichHop, thunkApi) => {
    try {
        const res = await historyCallApiTichHopApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchHistoryCallApiTichHop({ tableName:"DanhGia"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateHistoryCallApiTichHop = createAsyncThunk("UpdateHistoryCallApiTichHop", async (data: IOmitUpdate<IHistoryCallApiTichHop>, thunkApi) => {
    try {
        const res = await historyCallApiTichHopApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHistoryCallApiTichHop({tableName:"DanhGia"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteHistoryCallApiTichHop = createAsyncThunk("DeleteHistoryCallApiTichHop", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await historyCallApiTichHopApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHistoryCallApiTichHop({ tableName:"DanhGia"}))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 