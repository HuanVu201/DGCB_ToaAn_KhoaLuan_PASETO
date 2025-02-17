import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogAuthenApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ILogAuthen, ISearchLogAuthenParams, IGetLogAuthenParams } from "../model";

export const SearchLogAuthen =
    createAsyncThunk<IPaginationResponse<ILogAuthen[]>, ISearchLogAuthenParams>("SearchLogAuthen", async (params, thunkApi) => {
        try {
            const res = await LogAuthenApi.SearchLogAuthen(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


    export const GetLogAuthenDetail =
    createAsyncThunk<ILogAuthen, IGetLogAuthenParams>("GetLogAuthenDetail", async (params, thunkApi) => {
        try {
            const res = await LogAuthenApi.GetLogAuthenDetail(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
    export const DeleteLogAuthenDetail = createAsyncThunk("DeleteDanhMuc_ChucDanh", async (data: ISoftDelete, thunkApi) => {
        try {
            const res = await LogAuthenApi.Delete(data);
            if (res.status === 200) {
                thunkApi.dispatch(SearchLogAuthen({ reFetch: true }))
            }
            return res.data
    
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }) 

