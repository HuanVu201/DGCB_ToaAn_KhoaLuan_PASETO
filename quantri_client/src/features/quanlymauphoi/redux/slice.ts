import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IMauPhoi } from "../models/mauPhoi";
import { AddMauPhoi, DeleteMauPhoi, GetMauPhoi, SearchMauPhoi, UpdateMauPhoi } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IMauPhoiState extends ExtendedState<IMauPhoi>{

}

const initialState : IMauPhoiState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "MauPhoi",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchMauPhoi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetMauPhoi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddMauPhoi.fulfilled, () => {
                toast.success("Thêm mới thành công")
            })
            .addCase(UpdateMauPhoi.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteMauPhoi.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchMauPhoi, GetMauPhoi, AddMauPhoi, UpdateMauPhoi, DeleteMauPhoi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchMauPhoi, GetMauPhoi, AddMauPhoi, UpdateMauPhoi, DeleteMauPhoi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer