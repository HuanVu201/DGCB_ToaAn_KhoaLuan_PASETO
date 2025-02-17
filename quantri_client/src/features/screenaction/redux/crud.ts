import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearchScreenActionCanBo, screenActionService } from "../services";
import { IError, IPaginationResponse, IPickSearch, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { IScreenAction, ISearchScreenAction } from "../models";
import { IAction } from "@/features/action/models";


export const SearchScreenAction = createAsyncThunk
    <IPaginationResponse<IScreenAction[]>, ISearchScreenAction, { rejectValue: IError }>("SearchScreenAction", async (params, thunkApi) => {
        try {
            const res = await screenActionService.Search(params)
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
})

export const SearchScreenActionCanBo = createAsyncThunk
    <IPaginationResponse<IScreenAction[]>, ISearchScreenActionCanBo, { rejectValue: IError }>("SearchScreenActionCanBo", async (params, thunkApi) => {
        try {
            const res = await screenActionService.SearchCanBo(params)
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
})


export const SearchActionNotInScreenModal = createAsyncThunk
<IPaginationResponse<IAction[]>, Omit<ISearchScreenAction, "maScreen">, { rejectValue: IError }>("SearchActionNotInScreenModal", async (params, thunkApi) => {
    try {
        const res = await screenActionService.SearchActionNotInScreen(params)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})


export const GetScreenAction = createAsyncThunk<IResult<IScreenAction>, string, { rejectValue: IError }>("GetScreenAction", async (id, thunkApi) => {
    try {
        const res = await screenActionService.Get(id)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

export const AddScreenActions = createAsyncThunk("AddScreenActions", async (
    data:{
    screenActions: Pick<IScreenAction, "actionId" | "screenId">[];
    searchParams: ISearchScreenAction;
}, thunkApi) => {
    try {
        const res = await screenActionService.CreateRange(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchScreenAction({ reFetch: true, ...data.searchParams }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

// export const UpdateScreenAction = createAsyncThunk("UpdateScreenAction", async (data: IOmitUpdate<IScreenAction>, thunkApi) => {
//     try {
//         const res = await screenActionService.Update(data)
//         if (res.status == 200) {
//             thunkApi.dispatch(SearchScreenAction({pageNumber:1, pageSize: 10000, reFetch: true }))
//             thunkApi.dispatch(GetScreenAction(data.id as string))
//         }
//         return res.data
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })


export const AddScreenAction = createAsyncThunk("AddScreenAction", async (data: IScreenAction, thunkApi) => {
    try {
        const res = await screenActionService.Create(data)
        if (res.status == 201) {
            thunkApi.dispatch(SearchScreenAction({pageNumber:1, pageSize: 10000, reFetch: true }))
        }
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})
export const DeleteScreenAction = createAsyncThunk("DeleteScreenAction", async (params: ISoftDelete &{searchParams: ISearchScreenAction}, thunkApi) => {
    try {
        const res = await screenActionService.Delete(params)
        if (res.status === 200) {
            thunkApi.dispatch(SearchScreenAction({ reFetch: true, ...params.searchParams }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})