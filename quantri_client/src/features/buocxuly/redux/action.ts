import { createAsyncThunk } from "@reduxjs/toolkit";
import { buocXuLyApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { BuocXuLy, SearchBuocXuLy } from "@/models/buocXuLy";
import { AxiosError } from "axios";
import { AddBuocXuLyCommand, GetBuocXuLyQuery, UpdateBuocXuLyCommand } from "../services/params";
import { Node } from "reactflow"

export const SearchBuocXuLyAction =
    createAsyncThunk<IPaginationResponse<BuocXuLy[]>, SearchBuocXuLy, { rejectValue: IResult<any> }>("SearchBuocXuLy", async (params, thunkApi) => {
        try {
            const res = await buocXuLyApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
        }
    })

export const GetBuocXuLy =
    createAsyncThunk<IResult<Node<BuocXuLy>>, GetBuocXuLyQuery, { rejectValue: IResult<any> }>("GetBuocXuLy", async (params, thunkApi) => {
        try {
            const res = await buocXuLyApi.Get(params);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
        }
    })

export const AddBuocXuLy = createAsyncThunk<IResult<any>, AddBuocXuLyCommand, { rejectValue: IResult<any> }>("AddBuocXuLy", async (data, thunkApi) => {
    try {
        const res = await buocXuLyApi.Create(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const UpdateBuocXuLy = createAsyncThunk<IResult<any>, UpdateBuocXuLyCommand, { rejectValue: IResult<any> }>("UpdateBuocXuLy", async (data, thunkApi) => {
    try {
        const res = await buocXuLyApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const DeleteBuocXuLy = createAsyncThunk<IResult<any>, ISoftDelete, { rejectValue: IResult<any> }>("DeleteBuocXuLy", async (data, thunkApi) => {
    try {
        const res = await buocXuLyApi.Delete(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
}) 