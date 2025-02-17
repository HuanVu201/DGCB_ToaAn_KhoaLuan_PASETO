import { createAsyncThunk } from "@reduxjs/toolkit";
import { cauHinhKySoApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { ICauHinhKySo, ISearchCauHinhKySo } from "../models";

export const SearchCauHinhKySo =
    createAsyncThunk<IPaginationResponse<ICauHinhKySo[]>, ISearchCauHinhKySo>("SearchCauHinhKySo", async (params, thunkApi) => {
        try {
            const res = await cauHinhKySoApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchCauHinhKySoTheoDonVi =
    createAsyncThunk<IPaginationResponse<ICauHinhKySo[]>, ISearchCauHinhKySo>("SearchCauHinhKySoTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await cauHinhKySoApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetCauHinhKySo =
    createAsyncThunk<IResult<ICauHinhKySo>, string>("GetCauHinhKySo", async (id, thunkApi) => {
        try {
            const res = await cauHinhKySoApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddCauHinhKySo = createAsyncThunk("AddCauHinhKySo", async (data: ICauHinhKySo, thunkApi) => {
    try {
        const res = await cauHinhKySoApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchCauHinhKySo({ type:"CauHinhKySo"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateCauHinhKySo = createAsyncThunk("UpdateCauHinhKySo", async (data: IOmitUpdate<ICauHinhKySo>, thunkApi) => {
    try {
        const res = await cauHinhKySoApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchCauHinhKySo({type:"CauHinhKySo"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteCauHinhKySo = createAsyncThunk("DeleteCauHinhKySo", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await cauHinhKySoApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchCauHinhKySo({type:"CauHinhKySo" }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 