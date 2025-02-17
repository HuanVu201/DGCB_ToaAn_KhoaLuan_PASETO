import { createAsyncThunk } from "@reduxjs/toolkit";
import { danhMuc_DonViTinhApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IDanhMuc_DonViTinh, ISearchDanhMuc_DonViTinh } from "../models";

export const SearchDanhMuc_DonViTinh =
    createAsyncThunk<IPaginationResponse<IDanhMuc_DonViTinh[]>, ISearchDanhMuc_DonViTinh>("SearchDanhMuc_DonViTinh", async (params, thunkApi) => {
        try {
            const res = await danhMuc_DonViTinhApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchDanhMuc_DonViTinhTheoDonVi =
    createAsyncThunk<IPaginationResponse<IDanhMuc_DonViTinh[]>, ISearchDanhMuc_DonViTinh>("SearchDanhMuc_DonViTinhTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await danhMuc_DonViTinhApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDanhMuc_DonViTinh =
    createAsyncThunk<IResult<IDanhMuc_DonViTinh>, string>("GetDanhMuc_DonViTinh", async (id, thunkApi) => {
        try {
            const res = await danhMuc_DonViTinhApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMuc_DonViTinh = createAsyncThunk("AddDanhMuc_DonViTinh", async (data: IDanhMuc_DonViTinh, thunkApi) => {
    try {
        const res = await danhMuc_DonViTinhApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMuc_DonViTinh({ type:"DonViTinh"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMuc_DonViTinh = createAsyncThunk("UpdateDanhMuc_DonViTinh", async (data: IOmitUpdate<IDanhMuc_DonViTinh>, thunkApi) => {
    try {
        const res = await danhMuc_DonViTinhApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_DonViTinh({type:"DonViTinh"}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMuc_DonViTinh = createAsyncThunk("DeleteDanhMuc_DonViTinh", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await danhMuc_DonViTinhApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMuc_DonViTinh({type:"DonViTinh" }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 