import { createAsyncThunk } from "@reduxjs/toolkit";
import { NhomDonViApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { AxiosError } from "axios";
import { AddNhomDonViRequest } from "../services/params";
import { NhomDonVi, SearchNhomDonVi } from "@/models/nhomDonVi";

export const SearchNhomDonViAction =
    createAsyncThunk<IPaginationResponse<NhomDonVi[]>, SearchNhomDonVi, { rejectValue: IResult<any> }>("SearchNhomDonVi", async (params, thunkApi) => {
        try {
            const res = await NhomDonViApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
        }
    })

export const GetNhomDonVi =
    createAsyncThunk<IResult<NhomDonVi>, string, { rejectValue: IResult<any> }>("GetNhomDonVi", async (id, thunkApi) => {
        try {
            const res = await NhomDonViApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
        }
    })

export const AddNhomDonVi = createAsyncThunk<IResult<any>, AddNhomDonViRequest, { rejectValue: IResult<any> }>("AddNhomDonVi", async (data, thunkApi) => {
    try {
        const res = await NhomDonViApi.Create(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const UpdateNhomDonVi = createAsyncThunk<IResult<any>, IOmitUpdate<NhomDonVi>, { rejectValue: IResult<any> }>("UpdateNhomDonVi", async (data, thunkApi) => {
    try {
        const res = await NhomDonViApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const DeleteNhomDonVi = createAsyncThunk<IResult<any>, ISoftDelete, { rejectValue: IResult<any> }>("DeleteNhomDonVi", async (data, thunkApi) => {
    try {
        const res = await NhomDonViApi.Delete(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
}) 