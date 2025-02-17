import { createAsyncThunk } from "@reduxjs/toolkit";
import { kyDanhGiaApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IKyDanhGia, ISearchKyDanhGia } from "../models";

export const SearchKyDanhGia =
    createAsyncThunk<IPaginationResponse<IKyDanhGia[]>, ISearchKyDanhGia>("SearchKyDanhGia", async (params, thunkApi) => {
        try {
            const res = await kyDanhGiaApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchKyDanhGiaTheoDonVi =
    createAsyncThunk<IPaginationResponse<IKyDanhGia[]>, ISearchKyDanhGia>("SearchKyDanhGiaTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await kyDanhGiaApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetKyDanhGia =
    createAsyncThunk<IResult<IKyDanhGia>, string>("GetKyDanhGia", async (id, thunkApi) => {
        try {
            const res = await kyDanhGiaApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddKyDanhGia = createAsyncThunk("AddKyDanhGia", async (data: IKyDanhGia, thunkApi) => {
    try {
        const res = await kyDanhGiaApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchKyDanhGia({ reFetch:true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateKyDanhGia = createAsyncThunk("UpdateKyDanhGia", async (data: IOmitUpdate<IKyDanhGia>, thunkApi) => {
    try {
        const res = await kyDanhGiaApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchKyDanhGia({reFetch:true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteKyDanhGia = createAsyncThunk("DeleteKyDanhGia", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await kyDanhGiaApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchKyDanhGia({ reFetch:true}))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 