import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddVaiTro, DeleteVaiTro, GetPermissionVaiTro, GetVaiTro, SearchPermissionsVaiTro, SearchVaiTro, UpdateVaiTro } from "./action";
import { IVaiTro } from "../models";
import type { DataNode } from 'antd/es/tree';
import { isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";


export interface IVaiTroState extends ExtendedState<IVaiTro, { dataPermission: IVaiTro }, 'dataPermission'> {
}

const initialState: IVaiTroState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "vaitro",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchVaiTro.fulfilled, (state, action) => {

                state.datas = action.payload
                state.loading = false
            })
            .addCase(SearchPermissionsVaiTro.fulfilled, (state, action) => {
                state.datas = [...new Map(action.payload.map(item =>
                    [item.claimValue, item])).values()]
                state.loading = false
            })
            .addCase(GetVaiTro.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(GetPermissionVaiTro.fulfilled, (state, action) => {
                state.dataPermission = action.payload
                state.loading = false
            })
            .addCase(AddVaiTro.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateVaiTro.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteVaiTro.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addMatcher(isPending(SearchVaiTro, GetVaiTro, AddVaiTro, UpdateVaiTro, DeleteVaiTro), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchVaiTro, GetVaiTro, AddVaiTro, UpdateVaiTro, DeleteVaiTro), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})


export default Slice.reducer

export const { resetData, resetDatas } = Slice.actions;