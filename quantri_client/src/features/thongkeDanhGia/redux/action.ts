import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_ThongKeDanhGiaApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_ThongKeDanhGia, IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ, IDanhMuc_ThongKeDanhGia_GetTongHopCaNhan, ISearchDanhMuc_ThongKeDanhGia } from "../models";

export const SearchDanhMuc_ThongKeDanhGia =
    createAsyncThunk<IPaginationResponse<IDanhMuc_ThongKeDanhGia[]>, ISearchDanhMuc_ThongKeDanhGia>("SearchDanhMuc_ThongKeDanhGia", async (params, thunkApi) => {
        try {
            const res = await danhMuc_ThongKeDanhGiaApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_ThongKeDanhGiaTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_ThongKeDanhGia[]>, ISearchDanhMuc_ThongKeDanhGia>("SearchDanhMuc_ThongKeDanhGiaTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_ThongKeDanhGiaApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_ThongKeDanhGia =
    createAsyncThunk<IResult<IDanhMuc_ThongKeDanhGia>, string>("GetDanhMuc_ThongKeDanhGia", async (id, thunkApi) => {
        try {
            const res = await danhMuc_ThongKeDanhGiaApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_ThongKeDanhGia = createAsyncThunk("AddDanhMuc_ThongKeDanhGia", async (data: IDanhMuc_ThongKeDanhGia, thunkApi) => {
    try {
        const res = await danhMuc_ThongKeDanhGiaApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_ThongKeDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_ThongKeDanhGia = createAsyncThunk("UpdateDanhMuc_ThongKeDanhGia", async (data: IOmitUpdate<IDanhMuc_ThongKeDanhGia>, thunkApi) => {
    try {
        const res = await danhMuc_ThongKeDanhGiaApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_ThongKeDanhGia({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_ThongKeDanhGia = createAsyncThunk("DeleteDanhMuc_ThongKeDanhGia", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_ThongKeDanhGiaApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_ThongKeDanhGia({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 

export const SearchDanhMuc_ThongKeDanhGia_Mau09 =
    createAsyncThunk<IPaginationResponse<IDanhMuc_ThongKeDanhGia[]>, ISearchDanhMuc_ThongKeDanhGia>("SearchDanhMuc_ThongKeDanhGia", async (params, thunkApi) => {
        try {
            const res = await danhMuc_ThongKeDanhGiaApi.SearchThongKeDanhGia_XuatDanhGiaMau09(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
    export const SearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ =
    createAsyncThunk<IPaginationResponse<IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ[]>, ISearchDanhMuc_ThongKeDanhGia>("SearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ", async (params, thunkApi) => {
        try {
            const res = await danhMuc_ThongKeDanhGiaApi.SearchThongKeDanhGia_DuLieuPhieuCQ(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
    //GetTongHopCaNhan

    export const SearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan =
    createAsyncThunk<IPaginationResponse<IDanhMuc_ThongKeDanhGia_GetTongHopCaNhan[]>, ISearchDanhMuc_ThongKeDanhGia>("SearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan", async (params, thunkApi) => {
        try {
            const res = await danhMuc_ThongKeDanhGiaApi.SearchThongKeDanhGia_GetTongHopCaNhan(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })