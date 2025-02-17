import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IAction } from "../models";
import { AddAction, DeleteAction, GetAction, SearchAction, UpdateAction } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IActionState extends ExtendedState<IAction>{

}

const initialState : IActionState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Action",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchAction.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddAction.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateAction.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteAction.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchAction, GetAction, AddAction, UpdateAction, DeleteAction), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchAction, GetAction, AddAction, UpdateAction, DeleteAction), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer