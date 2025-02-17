import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IHistoryCallApiTichHop } from "../models";
import { AddHistoryCallApiTichHop, DeleteHistoryCallApiTichHop, GetHistoryCallApiTichHop, SearchHistoryCallApiTichHop, SearchHistoryCallApiTichHopTheoDonVi, UpdateHistoryCallApiTichHop } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IHistoryCallApiTichHopState extends ExtendedState<IHistoryCallApiTichHop> {

}

const initialState: IHistoryCallApiTichHopState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "HistoryCallApiTichHop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchHistoryCallApiTichHop.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchHistoryCallApiTichHopTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetHistoryCallApiTichHop.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddHistoryCallApiTichHop.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateHistoryCallApiTichHop.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteHistoryCallApiTichHop.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchHistoryCallApiTichHop, GetHistoryCallApiTichHop, AddHistoryCallApiTichHop, UpdateHistoryCallApiTichHop, DeleteHistoryCallApiTichHop, SearchHistoryCallApiTichHopTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchHistoryCallApiTichHop, GetHistoryCallApiTichHop, AddHistoryCallApiTichHop, UpdateHistoryCallApiTichHop, DeleteHistoryCallApiTichHop, SearchHistoryCallApiTichHopTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer