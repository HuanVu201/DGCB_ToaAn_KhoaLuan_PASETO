import { createAsyncThunk } from "@reduxjs/toolkit";
import { shareDuLieuDanhGiaApi } from "../services";
import { IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { ISearchShareDuLieuDanhGia, IShareDuLieuDanhGia } from "../models";

export const SearchShareDuLieuDanhGia =
    createAsyncThunk<IPaginationResponse<IShareDuLieuDanhGia[]>, ISearchShareDuLieuDanhGia>("SearchShareDuLieuDanhGia", async (params, thunkApi) => {
        try {
            const res = await shareDuLieuDanhGiaApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetShareDuLieuDanhGia =
    createAsyncThunk<IResult<IShareDuLieuDanhGia>, string>("GetShareDuLieuDanhGia", async (id, thunkApi) => {
        try {
            const res = await shareDuLieuDanhGiaApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddShareDuLieuDanhGia = createAsyncThunk("AddShareDuLieuDanhGia", async (data: IShareDuLieuDanhGia, thunkApi) => {
    try {
        const res = await shareDuLieuDanhGiaApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchShareDuLieuDanhGia({ reFetch: true ,loaiDichVu: data.loaiDichVu}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateShareDuLieuDanhGia = createAsyncThunk("UpdateShareDuLieuDanhGia", async (data: IOmitUpdate<IShareDuLieuDanhGia>, thunkApi) => {
    try {
        const res = await shareDuLieuDanhGiaApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchShareDuLieuDanhGia({ reFetch: true,loaiDichVu: data.data.loaiDichVu }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteShareDuLieuDanhGia = createAsyncThunk("DeleteShareDuLieuDanhGia", async (data: ISoftDelete, thunkApi) => {
    try {
        var xinchao = " ngu"
        const res = await shareDuLieuDanhGiaApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchShareDuLieuDanhGia({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
export const DeleteReFetchLoaiDichVu= createAsyncThunk("DeleteShareDuLieuDanhGia", async (params: { data: ISoftDelete, LoaiDichVu: string | undefined }, thunkApi) => {
    try {
        const res = await shareDuLieuDanhGiaApi.Delete(params.data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchShareDuLieuDanhGia({ reFetch: true,loaiDichVu:params.LoaiDichVu }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 