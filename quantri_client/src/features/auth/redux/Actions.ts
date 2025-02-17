import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services";
import { ICredential, IError, IException, ILogin, IParseUserToken } from "../../../models";
import { GetUser } from "../../user/redux/Actions";
import { parseJwt } from "@/utils/common";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { togglerLoginModalVisible } from "@/lib/redux/GlobalState";
import { AxiosError } from "axios";

export const GetToken = createAsyncThunk
    <ICredential, ILogin, { rejectValue: AxiosError<IException> }>("GetToken", async (params, thunkApi) => {
        try {
            const res = await authService.GetToken(params)
            if (res.status === 200 && res.data) { // fake api response with status 201
                thunkApi.dispatch(SearchPublicConfig())
                thunkApi.dispatch(SearchPublicConfig())
            }
            const userData: IParseUserToken = parseJwt(res.data.token)
            thunkApi.dispatch(GetUser({ token: res.data.token }))
            // thunkApi.dispatch(setUserData(userData))
            thunkApi.dispatch(togglerLoginModalVisible(false))
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as AxiosError<IException>)
        }
    })

export const RefreshToken = createAsyncThunk
    <ICredential, Omit<ICredential, "refreshTokenExpiryTime">, { rejectValue: IError }>("RefreshToken", async (params, thunkApi) => {
        try {
            const res = await authService.RefreshToken(params)
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

