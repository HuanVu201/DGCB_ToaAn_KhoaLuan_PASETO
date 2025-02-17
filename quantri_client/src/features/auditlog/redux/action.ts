import { createAsyncThunk } from "@reduxjs/toolkit";
import { auditLogApi } from "../services";
import { IAuditLog, ISearchAuditLog } from "../models";
import { IPaginationResponse, IResult, IOmitUpdate, ISoftDelete } from "@/models";

export const SearchAuditLog =
    createAsyncThunk<IPaginationResponse<IAuditLog[]>, ISearchAuditLog>("SearchAuditLog", async (params, thunkApi) => {
        try {
            const res = await auditLogApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchAuditLogTheoDonVi =
    createAsyncThunk<IPaginationResponse<IAuditLog[]>, ISearchAuditLog>("SearchAuditLogTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await auditLogApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetAuditLog =
    createAsyncThunk<IResult<IAuditLog>, string>("GetAuditLog", async (id, thunkApi) => {
        try {
            const res = await auditLogApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddAuditLog = createAsyncThunk("AddAuditLog", async (data: IAuditLog, thunkApi) => {
    try {
        const res = await auditLogApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchAuditLog({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateAuditLog = createAsyncThunk("UpdateAuditLog", async (data: IOmitUpdate<IAuditLog>, thunkApi) => {
    try {
        const res = await auditLogApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchAuditLog({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteAuditLog = createAsyncThunk("DeleteAuditLog", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await auditLogApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchAuditLog({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 