import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IAuditLog } from "../models";
import { AddAuditLog, DeleteAuditLog, GetAuditLog, SearchAuditLog, SearchAuditLogTheoDonVi, UpdateAuditLog } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IAuditLogState extends ExtendedState<IAuditLog> {

}

const initialState: IAuditLogState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "AuditLog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchAuditLog.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchAuditLogTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetAuditLog.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddAuditLog.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateAuditLog.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteAuditLog.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchAuditLog, GetAuditLog, AddAuditLog, UpdateAuditLog, DeleteAuditLog, SearchAuditLogTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchAuditLog, GetAuditLog, AddAuditLog, UpdateAuditLog, DeleteAuditLog, SearchAuditLogTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer