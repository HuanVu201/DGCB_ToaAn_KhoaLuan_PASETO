import { createAsyncThunk } from "@reduxjs/toolkit";
import { quyTrinhXuLyApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { QuyTrinhXuLy, SearchQuyTrinhXuLy } from "@/models/quytrinhxuly";
import { AxiosError } from "axios";
import { AddQuyTrinhXuLyRequest, AddReactFlowQuyTrinhCommand, GetReactFlowQuyTrinhXuLyQuery, ReactFlowQuyTrinhXuLyDto, UpdateReactFlowQuyTrinhCommand } from "../services/params";

export const SearchQuyTrinhXuLyAction =
    createAsyncThunk<IPaginationResponse<QuyTrinhXuLy[]>, SearchQuyTrinhXuLy, { rejectValue: IResult<any> }>("SearchQuyTrinhXuLy", async (params, thunkApi) => {
        try {
            const res = await quyTrinhXuLyApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
        }
    })

export const GetQuyTrinhXuLy =
    createAsyncThunk<IResult<QuyTrinhXuLy>, string, { rejectValue: IResult<any> }>("GetQuyTrinhXuLy", async (id, thunkApi) => {
        try {
            const res = await quyTrinhXuLyApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
        }
    })

export const AddQuyTrinhXuLy = createAsyncThunk<IResult<any>, AddQuyTrinhXuLyRequest, { rejectValue: IResult<any> }>("AddQuyTrinhXuLy", async (data, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.Create(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const UpdateQuyTrinhXuLy = createAsyncThunk<IResult<any>, IOmitUpdate<QuyTrinhXuLy>, { rejectValue: IResult<any> }>("UpdateQuyTrinhXuLy", async (data, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const DeleteQuyTrinhXuLy = createAsyncThunk<IResult<any>, ISoftDelete, { rejectValue: IResult<any> }>("DeleteQuyTrinhXuLy", async (data, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.Delete(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
}) 

export const GetFlowQuyTrinhXuLy =
    createAsyncThunk<IResult<ReactFlowQuyTrinhXuLyDto>, GetReactFlowQuyTrinhXuLyQuery, { rejectValue: IResult<any> }>("GetFlowQuyTrinhXuLy", async (params, thunkApi) => {
        try {
            const res = await quyTrinhXuLyApi.GetFlow(params);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<ReactFlowQuyTrinhXuLyDto>)
        }
    })

export const AddFlowQuyTrinhXuLy = createAsyncThunk<IResult<any>, AddReactFlowQuyTrinhCommand, { rejectValue: IResult<any> }>("AddFlowQuyTrinhXuLy", async (data, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.AddFlow(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const UpdateFlowQuyTrinhXuLy = createAsyncThunk<IResult<any>, UpdateReactFlowQuyTrinhCommand, { rejectValue: IResult<any> }>("UpdateFlowQuyTrinhXuLy", async (data, thunkApi) => {
    try {
        const res = await quyTrinhXuLyApi.UpdateFlow(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})