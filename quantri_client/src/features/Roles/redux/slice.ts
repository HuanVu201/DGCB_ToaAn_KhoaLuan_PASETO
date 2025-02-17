import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IPermisstion, IRoleClaim, IRoles } from "../models";
import { AddRoles, DeleteRoles, GetPermissionOfRole, GetRoleClaimDistinct, GetRoles, SearchRoles, UpdateRoles } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IRolesState extends ExtendedState<IRoles,
{
    listPermissionOfRole: IPermisstion[];
    listRoleClaimDistinct : IRoleClaim[];
},"listPermissionOfRole" | "listRoleClaimDistinct"
   
> {

}

const initialState: IRolesState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Roles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            
            .addCase(SearchRoles.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetRoles.fulfilled, (state, action) => {
                state.loading = false
                state.data= action.payload.data
            })
            .addCase(GetPermissionOfRole.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(GetRoleClaimDistinct.fulfilled, (state, action) => {
                state.loading = false
                state.listRoleClaimDistinct =action.payload;
            })


            .addCase(AddRoles.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateRoles.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteRoles.fulfilled, () => {
                toast.success("Thao tác thành công")
            })


            .addMatcher(isPending(SearchRoles, GetRoles, AddRoles, UpdateRoles, DeleteRoles,GetRoleClaimDistinct), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchRoles, GetRoles, AddRoles, UpdateRoles, DeleteRoles,GetRoleClaimDistinct), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer