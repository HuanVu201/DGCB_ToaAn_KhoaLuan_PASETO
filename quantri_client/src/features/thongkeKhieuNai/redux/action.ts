import { createAsyncThunk } from "@reduxjs/toolkit";
import { thongKeKhieuNaiApi } from "../services";
import { IPaginationResponse, IResult, IOmitUpdate, ISoftDelete } from "@/models";
import { ChucDanh, ISearchChucDanh } from "@/models/chucDanh";
import { ISearchThongKeKhieuNai, IThongKeKhieuNai } from "../models";

export const SearchThongKeKhieuNai =
    createAsyncThunk<IPaginationResponse<IThongKeKhieuNai[]>, ISearchThongKeKhieuNai>("SearchThongKeKhieuNai", async (params, thunkApi) => {
        try {
            const res = await thongKeKhieuNaiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetThongKeKhieuNai =
    createAsyncThunk<IResult<IThongKeKhieuNai>, string>("GetThongKeKhieuNai", async (id, thunkApi) => {
        try {
            const res = await thongKeKhieuNaiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddThongKeKhieuNai = createAsyncThunk("AddThongKeKhieuNai", async (data: ChucDanh, thunkApi) => {
    try {
        const res = await thongKeKhieuNaiApi.Create(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateThongKeKhieuNai = createAsyncThunk("UpdateThongKeKhieuNai", async (data: IOmitUpdate<ChucDanh>, thunkApi) => {
    try {
        const res = await thongKeKhieuNaiApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteThongKeKhieuNai = createAsyncThunk("DeleteThongKeKhieuNai", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await thongKeKhieuNaiApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchThongKeKhieuNai({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 

export const GetDanhSachKhieuNaiDanhGiaTk =
    createAsyncThunk<IPaginationResponse<IThongKeKhieuNai[]>, ISearchThongKeKhieuNai>("GetDanhSachKhieuNaiDanhGiaTK", async (params, thunkApi) => {
        try {
            const res = await thongKeKhieuNaiApi.GetDanhSachKhieuNaiDanhGiaTk(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })