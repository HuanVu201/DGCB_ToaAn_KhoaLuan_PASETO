import { createAsyncThunk } from "@reduxjs/toolkit";
import { vaiTroService } from "../services";
import { IError, IPaginationResponse, IPickSearch, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { IVaiTro } from "../models";


export const SearchVaiTro = createAsyncThunk
    <IVaiTro[], IPickSearch<IVaiTro, "permissions">, { rejectValue: IError }>("SearchVaiTro", async (params, thunkApi) => {
        try {
            const res = await vaiTroService.Search(params)

            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })
    
export const SearchPermissionsVaiTro = createAsyncThunk
<IVaiTro[], IPickSearch<IVaiTro, "permissions">, { rejectValue: IError }>("SearchPermissionsVaiTro", async (params, thunkApi) => {
    try {
        const res = await vaiTroService.SearchPermissions(params)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

// export const GetVaiTro = createAsyncThunk<IVaiTro, string, { rejectValue: IError }>("GetVaiTro", async (id, thunkApi) => {
//     try {
//         const res = await vaiTroService.Get(id)
//         return res.data;
//     } catch (error) {
//         return thunkApi.rejectWithValue(error as IError)
//     }
// })
export const GetVaiTro = createAsyncThunk<IVaiTro, string, { rejectValue: IError }>("GetVaiTro", async (id, thunkApi) => {
    try {
        const res = await vaiTroService.GetVaiTro(id)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})
export const GetPermissionVaiTro = createAsyncThunk<IVaiTro, string, { rejectValue: IError }>("GetPermissionVaiTro", async (id, thunkApi) => {
    try {
        const res = await vaiTroService.GetPermissions(id)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

export const UpdateVaiTro = createAsyncThunk("UpdateVaiTro", async (data: IOmitUpdate<IVaiTro>, thunkApi) => {
    try {
        const res = await vaiTroService.Update(data)
        if (res.status == 200) {
            thunkApi.dispatch(SearchVaiTro({ pageNumber: 1, pageSize: 10000, reFetch: true }))
            thunkApi.dispatch(GetVaiTro(data.id as string))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const AddVaiTro = createAsyncThunk("AddVaiTro", async (data: IVaiTro, thunkApi) => {
    try {
        const res = await vaiTroService.Create(data)
        if (res.status == 200) {
            thunkApi.dispatch(SearchVaiTro({ pageNumber: 1, pageSize: 10000, reFetch: true }))
        }
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})
export const DeleteVaiTro = createAsyncThunk("DeleteVaiTro", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await vaiTroService.Delete(params)
        if (res.status === 200) {
            thunkApi.dispatch(SearchVaiTro({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})