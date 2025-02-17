import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { SearchUserRoles } from "./action";
import { IUserRoles } from "../models";
import type { DataNode } from 'antd/es/tree';
import { isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";


export interface IUserRolesState extends ExtendedState<IUserRoles, { dataPermission: IUserRoles }, 'dataPermission'> {
}

const initialState: IUserRolesState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "userroles",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchUserRoles.fulfilled, (state, action) => {

                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
            })
            .addMatcher(isPending(SearchUserRoles), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchUserRoles), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})


export default Slice.reducer

export const { resetData, resetDatas } = Slice.actions;