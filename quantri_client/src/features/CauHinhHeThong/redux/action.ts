
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CauHinhHeThongApi } from "../services";
import { IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ICauHinhHeThong} from "../models";

export const SearchCauHinhHeThong = createAsyncThunk<IPaginationResponse<ICauHinhHeThong[]>, IPickSearch<ICauHinhHeThong, "ten">>("SearchCauHinhHeThong", async (params, thunkApi) => {
    try{
        const res = await CauHinhHeThongApi.Search(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const GetCauHinhHeThong = createAsyncThunk<IResult<ICauHinhHeThong>, string>("GetCauHinhHeThong", async (id, thunkApi) => {
    try{
        const res = await CauHinhHeThongApi.Get(id)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const AddCauHinhHeThong = createAsyncThunk("AddCauHinhHeThong", async (data : ICauHinhHeThong, thunkApi) => {
    try {
        const res = await CauHinhHeThongApi.Create(data)
        if(res.status === 201){
            thunkApi.dispatch(SearchCauHinhHeThong({reFetch: true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateCauHinhHeThong = createAsyncThunk("UpdateCauHinhHeThong", async (data : IOmitUpdate<ICauHinhHeThong>, thunkApi) => {
    try {
        const res = await CauHinhHeThongApi.Update(data)
        if(res.status === 200){
            thunkApi.dispatch(SearchCauHinhHeThong({reFetch: true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteCauHinhHeThong = createAsyncThunk("DeleteCauHinhHeThong", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await CauHinhHeThongApi.Delete(params)
        if(res.status === 200){
            thunkApi.dispatch(SearchCauHinhHeThong({reFetch: true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
// export const UpdateSelectedTreeKeys = (key: string,data: React.Key[])=>{
//     return createAsyncThunk(`UpdateSelectedTreeKeys_${key}`, (thunkApi)=>{
//         try{
//            return data;
//         }catch(error){
//             return thunkApi.rejectWithValue(error)
//         }
//     }) 
// } 
