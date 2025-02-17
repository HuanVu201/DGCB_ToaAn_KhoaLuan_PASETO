

import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../services";
import { ICredential, IError, ILogin, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { GetCSDLDanCuResponse, ILogOut, ISearchUser, ThongTinCSDLDanCuSearchParams } from "../models";
import axiosInstance from "@/lib/axios";
import { IChangePassWord } from "../models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CreateUserWithDefaultPasswordRequest } from "../services/params";
import { User } from "@/models/user";
import { UserGroup, UserGroupResponse } from "@/models/userGroup";


export const GetUser = createAsyncThunk
    <User, Pick<ICredential, "token">, { rejectValue: IError }>("GetUser", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.GetUser(params)
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const SearchUser = createAsyncThunk
    <IPaginationResponse<UserGroupResponse[]>, ISearchUser, { rejectValue: IError }>("SearchUser", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.Search(params)

            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const GetUserById = createAsyncThunk
    <User, string, { rejectValue: IError }>("GetUserById", async (id, thunkApi) => {
        try {
            const res = await userService.GetById(id)
            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })
export const CreateUser = createAsyncThunk("CreateUser", async (data: User, thunkApi) => {
    try {

        const res = await userService.Create(data)
        if (res.status === 201) {
            thunkApi.dispatch(SearchUser({ reFetch: true }))
        }
        return res.data
    } catch (error) {

        return thunkApi.rejectWithValue(error)
    }
})
export const CreateUserWithDefaultPassword = createAsyncThunk("CreateUserWithDefaultPassword", async (data: CreateUserWithDefaultPasswordRequest, thunkApi) => {
    try {

        const res = await userService.CreateWithDefaultPassword(data)
        if (res.status === 200) {
            thunkApi.dispatch(SearchUser({ reFetch: true, groupCode: data.userGroupData?.groupCode }))
        }
        return res.data
    } catch (error) {

        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateUser = createAsyncThunk<IResult<any>, User>("UpdateUser", async (data, thunkApi) => {
    try {
        const res = await userService.UpdateUser(data)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const ChangeUserGroup = createAsyncThunk("ChangeUserGroup", async (data: User, thunkApi) => {
    try {
        const res = await userService.UpdateUser(data)
        if (res.status === 200) {
            // thunkApi.dispatch(SearchUser({ reFetch: true, groupCode: data?.oldGroupCode || "" }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

// export const AdminResetPassword = createAsyncThunk("AdminResetPassword", async (data: IChangePassWord, thunkApi) => {
//     try {
//         const res = await userService.AddminResetPassword(data)

//         return res.data
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })
export const AdminResetPassword = createAsyncThunk("AdminResetPassword", async (data: string, thunkApi) => {
    try {
        const res = await userService.AddminResetPassword(data)

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteUser = createAsyncThunk("DeleteUser", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await userService.Delete(params)

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const ChangePasswordUser = createAsyncThunk("ChangePasswordUser", async (data: IOmitUpdate<IChangePassWord>, thunkApi) => {
    try {
        const res = await userService.UpdatePassword(data)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const GetUserFromCSDLDanCu = createAsyncThunk<IResult<any>, ThongTinCSDLDanCuSearchParams, { rejectValue: IResult<any> }>("GetUserFromCSDLDanCu", async (data, thunkApi) => {
    try {
        const res = await userService.GetThongTinCSDLDanCu(data)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})

export const SearchUserByPermision = createAsyncThunk
    <IPaginationResponse<User[]>, ISearchUser, { rejectValue: IError }>("SearchUserByPermision", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.SearchByPermision(params)

            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

    export const SearchUserGruop = createAsyncThunk
    <IPaginationResponse<UserGroupResponse[]>, ISearchUser, { rejectValue: IError }>("SearchUserGruop", async (params, thunkApi) => {
        try {
            // const userService = new UserService(axiosInstance)
            const res = await userService.SearchUserGroup(params)

            return res.data;

        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

