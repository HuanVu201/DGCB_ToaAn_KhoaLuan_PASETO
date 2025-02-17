import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddBuocXuLy, DeleteBuocXuLy, GetBuocXuLy, SearchBuocXuLyAction, UpdateBuocXuLy } from "./action";
import { BuocXuLy } from "@/models/buocXuLy";
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { Node } from "reactflow";

export interface BuocXuLyState extends ExtendedState<BuocXuLy>{
    nodeData?: Node<BuocXuLy>
}

const initialState : BuocXuLyState = {
    loading: false,
    nodeData: undefined
}

const Slice = createGenericSlice({
    name: "buocXuLys",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(SearchBuocXuLyAction.pending, (state) => {
            state.loading = true;
            state.datas = undefined;
            state.count = undefined;
        })
        .addCase(SearchBuocXuLyAction.fulfilled, (state, action) => {
            state.loading = false
            state.datas = action.payload.data
            state.count = action.payload.totalCount
        })
        .addCase(GetBuocXuLy.pending, (state) => {
            state.loading = true;
            state.data = undefined;
            state.count = undefined;
        })
        .addCase(GetBuocXuLy.fulfilled, (state, action) => {
            state.loading = false
            state.nodeData = action.payload.data
        })
        .addCase(AddBuocXuLy.fulfilled, () => {
            toast.success("Thêm thành công")
        })
        .addCase(UpdateBuocXuLy.fulfilled, () => {
            toast.success("Cập nhật thành công")
        })
        .addCase(DeleteBuocXuLy.fulfilled, () => {
            toast.success("Xóa thành công")
        })
       
        .addMatcher(isPending( GetBuocXuLy, AddBuocXuLy, UpdateBuocXuLy, DeleteBuocXuLy), (state) => {
            state.loading = true
        })
        .addMatcher(isRejectedWithValue(GetBuocXuLy, AddBuocXuLy, UpdateBuocXuLy, DeleteBuocXuLy), (state, action) => {
            state.loading = false
            toast.error(action.payload.message ?? "Thao tác thất bại")
        })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer