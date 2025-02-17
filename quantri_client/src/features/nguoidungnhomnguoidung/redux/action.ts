import { createAsyncThunk } from "@reduxjs/toolkit";
import { nguoiDungnhomNguoiDungApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { INguoiDungNhomNguoiDung, ISearchNguoiDungNhomNguoiDung, ISearchUserNotInNhom } from "../models";
import { IUser } from "@/features/user/models";

export const SearchNguoiDungNhomNguoiDung =
    createAsyncThunk<IPaginationResponse<INguoiDungNhomNguoiDung[]>, ISearchNguoiDungNhomNguoiDung>("SearchNguoiDungNhomNguoiDung", async (params, thunkApi) => {
        try {
            const res = await nguoiDungnhomNguoiDungApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const SearchUserNotInNhom =
createAsyncThunk<IPaginationResponse<IUser[]>, ISearchUserNotInNhom>("SearchUserNotInNhom", async (params, thunkApi) => {
    try {
        const res = await nguoiDungnhomNguoiDungApi.SearchUserNotInNhom(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const GetNguoiDungNhomNguoiDung =
    createAsyncThunk<IResult<INguoiDungNhomNguoiDung>, string>("GetNguoiDungNhomNguoiDung", async (id, thunkApi) => {
        try {
            const res = await nguoiDungnhomNguoiDungApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddNguoiDungNhomNguoiDung = createAsyncThunk("AddNguoiDungNhomNguoiDung", async (data: INguoiDungNhomNguoiDung, thunkApi) => {
    try {
        const res = await nguoiDungnhomNguoiDungApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchNguoiDungNhomNguoiDung({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const AddNguoiDungNhomNguoiDungs = createAsyncThunk("AddNguoiDungNhomNguoiDungs", async (data:{
    userIds: string[];
    nhomNguoiDungId: string;
}, thunkApi) => {
    try {
        const res = await nguoiDungnhomNguoiDungApi.CreateRange(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchNguoiDungNhomNguoiDung({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


// export const UpdateNguoiDungNhomNguoiDung = createAsyncThunk("UpdateNguoiDungNhomNguoiDung", async (data: IOmitUpdate<INguoiDungNhomNguoiDung>, thunkApi) => {
//     try {
//         const res = await nguoiDungnhomNguoiDungApi.Update(data);
//         if (res.status === 200) {
//             thunkApi.dispatch(SearchNguoiDungNhomNguoiDung({ reFetch: true }))
//         }
//         return res.data
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })

export const DeleteNguoiDungNhomNguoiDung = createAsyncThunk("DeleteNguoiDungNhomNguoiDung", async (data: {ids: string[]}, thunkApi) => {
    try {
        const res = await nguoiDungnhomNguoiDungApi.Delete(data);
       
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 