import { createAsyncThunk } from "@reduxjs/toolkit";
import { RolesApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { IPermisstion, IRoleClaim, IRoles, ISearchRoles, IUpdateRoleClaim } from "../models";
import { truncate } from "fs/promises";

export const SearchRoles =
    createAsyncThunk<IPaginationResponse<IRoles[]>, ISearchRoles>("SearchRoles", async (params, thunkApi) => {
        try {
            const res = await RolesApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetRoles =
    createAsyncThunk<IResult<IRoles>, string>("GetRoles", async (id, thunkApi) => {
        try {
            const res = await RolesApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddRoles = createAsyncThunk("AddRoles", async (data: IRoles, thunkApi) => {
    try {
        const res = await RolesApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchRoles({reFetch:true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateRoles = createAsyncThunk("UpdateRoles", async (data: IOmitUpdate<IRoles>, thunkApi) => {
    try {
        const res = await RolesApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchRoles({reFetch:true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteRoles = createAsyncThunk("DeleteRoles", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await RolesApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchRoles({reFetch:true}))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 

export const GetALlRoles =
    createAsyncThunk<IResult<IRoles>, string>("GetRoles", async (_, thunkApi) => {
        try {
            const res = await RolesApi.GetAll();
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

    export const GetPermissionOfRole =
    createAsyncThunk<IRoles, string>("GetPermissionOfRole", async (id, thunkApi) => {
        try {
            const res = await RolesApi.GetPermissionOfRole(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


    export const GetRoleClaimDistinct =
    createAsyncThunk<IRoleClaim[], string>("GetRoleClaimDistinct", async (id, thunkApi) => {
        try {
            const res = await RolesApi.GetRoleClaimDistinct(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

    export const UpdateRoleClaimDistinct = createAsyncThunk("UpdateRoleClaimDistinct", async (data: IUpdateRoleClaim, thunkApi) => {
        try {
            const res = await RolesApi.UpdateRoleClaimDistinct(data);
            if (res.status === 200) {
                thunkApi.dispatch(SearchRoles({reFetch:true}))
            }
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })