import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRolesService } from "../services";
import { IError, IPaginationResponse, IPickSearch, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { ISearchUserRoles, IUserRoles } from "../models";


export const SearchUserRoles = createAsyncThunk
    <IPaginationResponse<IUserRoles[]>, ISearchUserRoles, { rejectValue: IError }>("SearchUserRoles", async (params, thunkApi) => {
        try {
            console.log(params);
            const res = await userRolesService.Search(params)

            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })
    
