import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { ICredential, IParseUserToken } from "../../../models";
import { GetToken, RefreshToken } from "./Actions";
import {Slice as UserSlice} from '../../user/redux/Slice'
import { parseJwt } from "@/utils/common";
import { IUser } from "@/features/user/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserGroup } from "@/models/userGroup";

export interface IAuthState extends ExtendedState<ICredential, {
    parseToken?: IParseUserToken
}>{
}

const initialState: IAuthState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<ICredential>) => {
            state.data = action.payload
            state.parseToken = parseJwt(action.payload.token)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetToken.pending, (state) => {
            state.loading = true
        })
        .addCase(GetToken.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
            state.parseToken = parseJwt(action.payload.token)
        })
        .addCase(GetToken.rejected, (state, action) => {
            console.log(action);
            
            toast.error(action.payload?.response?.data.exception ?? "Tài khoản hoặc mật khẩu không chính xác")
            // state.error = action.payload?.message
            state.loading = false
        })
        .addCase(RefreshToken.fulfilled, (state, action) => {
            state.data = action.payload
        })
        // .addCase(GetUser.pending, (state) => {
        //     state.loading = true
        // })
        // .addCase(GetUser.fulfilled, (state, action) => {
        //     state.user = action.payload
        //     state.loading = false
        // })
        // .addCase(GetUser.rejected, (state, action) => {
        //     state.error = action.payload?.message
        //     state.loading = false
        // })
    }
})


export default Slice.reducer

export const {resetData, setAuth} = Slice.actions;